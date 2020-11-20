import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Lancamento } from '../shared/lancamento.interface';
import { LancamentoService } from '../services/lancamento.service';
import { Subscription } from 'rxjs';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos',
  templateUrl: 'lancamento.page.html',
  styleUrls: ['lancamento.page.scss']
})
export class LancamentoPage implements OnDestroy{
  
  private lancamentos = new Array<Lancamento>();
  private lancamentoSubscription: Subscription;  

  nome: string = '';  
  lancamentosFiltrados: any;

  showCard = false;

  constructor(
    private authService: AuthService,
    private lancamentoService: LancamentoService,
    private toastController: ToastController, 
    private actionSheetController: ActionSheetController,    
    private router: Router) {   
    //user check    
    if (!this.authService.checkUser()) this.router.navigate(['login'])    

    this.lancamentoSubscription = this.lancamentoService.getLancamentos().subscribe(data => {
      this.lancamentos = data;
      this.lancamentosFiltrados = data;
      if (!this.lancamentos.length) this.showCard = true;
    })    

  }  

  ngOnDestroy(): void {
    this.lancamentoSubscription.unsubscribe();
  }

  limparItens(){    
    this.lancamentosFiltrados = this.lancamentos;    
    return this.lancamentos
  }

  filtrarItens(){
    this.lancamentosFiltrados = this.filtrarPessoas(this.nome);    
  }

  filtrarPessoas(nome){            
    this.lancamentosFiltrados = this.lancamentos;    
    console.log(this.lancamentosFiltrados);
    
    return this.lancamentosFiltrados.filter((item)=>{
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
  
  async deleteLancamento(id: string) {
    let actionSheet = await this.actionSheetController.create({
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',          
          handler: async () => {
            try {
              await this.lancamentoService.deleteLancamento(id);
            } catch (error) {
              this.presentToast('Erro ao tentar excluir.','danger');
            }
            this.presentToast('Lancamento excluído.','danger');
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


