import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Lancamento } from '../shared/lancamento.interface';
import { LancamentoService } from '../services/lancamento.service';
import { Cliente } from  '../shared/cliente.interface';
import { ClienteService } from './../services/cliente.service';
import { Subscription } from 'rxjs';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos',
  templateUrl: 'lancamento.page.html',
  styleUrls: ['lancamento.page.scss']
})
export class LancamentoPage implements OnDestroy{
  
  public lancamentos = new Array<Lancamento>();
  private lancamentoSubscription: Subscription;  

  private clientes = new Array<Cliente>();
  private clienteSubscription: Subscription;  

  showCard = false;

  constructor(
    private authService: AuthService,
    private lancamentoService: LancamentoService,
    private clienteService: ClienteService,
    private toastController: ToastController, 
    private actionSheetController: ActionSheetController,   
    private router: Router) {   
    //user check    
    if (!this.authService.checkUser()) this.router.navigate(['login']) 
    
    //clientes
    this.clienteSubscription = this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;   
    });

    //lancamentos 
    this.lancamentoSubscription = this.lancamentoService.getLancamentos().subscribe(data => {
      this.lancamentos = data;
      if (!this.lancamentos.length) this.showCard = true;
    })    

  }  

  ngOnDestroy(): void {
    if (this.lancamentoSubscription) this.lancamentoSubscription.unsubscribe();
    if (this.clienteSubscription) this.clienteSubscription.unsubscribe();
  }

  //get nomeCliente
  getNomeCliente(clienteId: string): string{  
    let nomeCliente = '';  
    this.clientes.forEach((value)=> {
      if(value.id == clienteId) nomeCliente = value.nome;
    })
    return nomeCliente;
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
            this.presentToast('Lançamento excluído.','danger');
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


