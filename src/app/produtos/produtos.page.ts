import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto.model';
import { PRODUTOS } from '../mock/produtos.mock';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: 'produtos.page.html',
  styleUrls: ['produtos.page.scss']
})
export class ProdutosPage {
  
  listaProdutos = PRODUTOS;
  selectedProduto: Produto;

  nome: string = '';
  produtos: any;
  produtosFiltrados: any;

  constructor(
    public toastController: ToastController, 
    private actionSheetController: ActionSheetController,
    private alertController: AlertController) {
    this.produtosFiltrados = this.listaProdutos;
  }  

  limparItens(){    
    this.produtosFiltrados = this.listaProdutos;    
    return this.listaProdutos
  }

  filtrarItens(){            
    this.produtosFiltrados = this.filtrarProdutos(this.nome);
  }

  filtrarProdutos(nome){        
    this.produtosFiltrados = this.listaProdutos;    
    
    return this.produtosFiltrados.filter((item)=>{
      return item.nome.toLowerCase().includes(nome.toLowerCase());
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      translucent: false,
      position: 'top'      
    });
    toast.present();
  }  
  
  abrir(produto: Produto): void {
    this.selectedProduto = produto;    
  }

  novo(): void {
    this.selectedProduto = <any>[];
  }

  async salvar(produto: Produto) {    
    
    const nome = document.querySelector<HTMLInputElement>('ion-input#nome').value;        
    const percentual = parseInt(document.querySelector<HTMLInputElement>('ion-input#percentual').value);

    if(nome == "" || isNaN(percentual)) {
      const alert = await this.alertController.create({
        message: 'Preencha todos os campos!',
        buttons: ['Entendi']
      })
      return alert.present();      
    } 

    if (produto.id) {
      for (var i=0; i<PRODUTOS.length; i++) {      
        if (PRODUTOS[i].id == produto.id) {        
          PRODUTOS[i].nome = document.querySelector<HTMLInputElement>('ion-input#nome').value;          
          PRODUTOS[i].percentual = parseInt(document.querySelector<HTMLInputElement>('ion-input#percentual').value);
          break;
        }
      }    
    } else {
      let data = {
        id: PRODUTOS.length+1,
        nome: nome,        
        percentual: percentual
      };

      PRODUTOS.push(data);
    }
    
    this.selectedProduto = null;
    if (produto.id) this.presentToast('As alterações foram efetuadas.','success');
  }

  async excluir(produtoId) {
    let actionSheet = await this.actionSheetController.create({
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',          
          handler: () => {
            for (var i=0; i<PRODUTOS.length; i++) {      
              if (PRODUTOS[i].id == produtoId) {          
                PRODUTOS.splice(i, 1)
                break;
              }
            }            
            this.presentToast('Produto excluído.','danger');
          }
        },        
        {
          text: 'Cancelar',
          icon: 'close',
          role : 'cancel',          
        }
      ]
    });

    this.selectedProduto = null;
    await actionSheet.present();    
  }

  voltar(): void {
    this.selectedProduto = null;
  }

}