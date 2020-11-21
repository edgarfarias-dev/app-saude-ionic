import { Component, OnDestroy} from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Produto } from '../shared/produto.interface';
import { ProdutoService } from '../services/produto.service';
import { Subscription } from 'rxjs';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: 'produto.page.html',
  styleUrls: ['produto.page.scss']
})
export class ProdutoPage implements OnDestroy{
  
  private produtos = new Array<Produto>();
  private produtoSubscription: Subscription;  

  nome: string = '';  
  produtosFiltrados: any;

  showCard = false;

  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService,
    private toastController: ToastController, 
    private actionSheetController: ActionSheetController,    
    private router: Router) {   
    //user check    
    if (!this.authService.checkUser()) this.router.navigate(['login'])    

    this.produtoSubscription = this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
      this.produtosFiltrados = data;
      if (!this.produtos.length) this.showCard = true;
    })    

  }  

  ngOnDestroy(): void {
    this.produtoSubscription.unsubscribe();
  }

  limparItens(){    
    this.produtosFiltrados = this.produtos;    
    return this.produtos
  }

  filtrarItens(){
    this.produtosFiltrados = this.filtrarProdutos(this.nome);    
  }

  filtrarProdutos(nome){            
    this.produtosFiltrados = this.produtos;    
    console.log(this.produtosFiltrados);
    
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
  
  async deleteProduto(id: string) {
    let actionSheet = await this.actionSheetController.create({
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',          
          handler: async () => {
            try {
              await this.produtoService.deleteProduto(id);
            } catch (error) {
              this.presentToast('Erro ao tentar excluir.','danger');
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
    await actionSheet.present();      
  }
}


