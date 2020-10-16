import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto.model';
import { PRODUTOS } from '../mock/produtos.mock';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: 'produtos.page.html',
  styleUrls: ['produtos.page.scss']
})
export class ProdutosPage implements OnInit{
  
  listaProdutos = PRODUTOS;
  selectedProduto: Produto;

  constructor(public toastController: ToastController) {}

  ngOnInit(): void {
    
    setTimeout( () => {
      const searchbar = document.querySelector('ion-searchbar');
      const items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);   

      searchbar.addEventListener('ionInput', handleInput);

      function handleInput(event) {        
          const query = event.target.value.toLowerCase();
          requestAnimationFrame(() => {
              items.forEach(item => {
                  const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                  item.style.display = shouldShow ? 'block' : 'none';
              });
          });
      }
    }, 1500)        
    
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      translucent: false,
      position: 'bottom'      
    });
    toast.present();
  }  
  
  abrir(produto: Produto): void {
    this.selectedProduto = produto;    
  }

  novo(): void {
    this.selectedProduto = <any>[];
  }

  salvar(produto: Produto): void {
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
        nome: document.querySelector<HTMLInputElement>('ion-input#nome').value,        
        percentual: parseInt(document.querySelector<HTMLInputElement>('ion-input#percentual').value)
      };

      PRODUTOS.push(data);
    }
    
    this.selectedProduto = null;
    this.presentToast('As alterações foram efetuadas.','success');
  }

  excluir(produto: Produto): void {
    for (var i=0; i<PRODUTOS.length; i++) {      
      if (PRODUTOS[i].id == produto.id) {          
        PRODUTOS.splice(i, 1)
        break;
      }
    }
    this.selectedProduto = null;
    this.presentToast('Produto excluído.','danger');
  }

  voltar(): void {
    this.selectedProduto = null;
  }

}