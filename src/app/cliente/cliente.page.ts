import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Cliente } from '../shared/cliente.interface';
import { ClienteService } from '../services/cliente.service';
import { Subscription } from 'rxjs';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: 'cliente.page.html',
  styleUrls: ['cliente.page.scss']
})
export class ClientePage implements OnDestroy{
  
  private clientes = new Array<Cliente>();
  private clienteSubscription: Subscription;  

  nome: string = '';  
  clientesFiltrados: any;

  showCard = false;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private toastController: ToastController, 
    private actionSheetController: ActionSheetController,    
    private router: Router) {

    //user check    
    if (!this.authService.checkUser()) this.router.navigate(['login'])

    this.clienteSubscription = this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
      this.clientesFiltrados = data;
      if (!this.clientes.length) this.showCard = true;
    })    

  }  

  ngOnDestroy(): void {
    if (this.clienteSubscription) this.clienteSubscription.unsubscribe();
  }

  limparItens(){    
    this.clientesFiltrados = this.clientes;    
    return this.clientes
  }

  filtrarItens(){
    this.clientesFiltrados = this.filtrarPessoas(this.nome);    
  }

  filtrarPessoas(nome){            
    this.clientesFiltrados = this.clientes;    
    console.log(this.clientesFiltrados);
    
    return this.clientesFiltrados.filter((item)=>{
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
  
  async deleteCliente(id: string) {
    let actionSheet = await this.actionSheetController.create({
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',          
          handler: async () => {
            try {
              await this.clienteService.deleteCliente(id);
            } catch (error) {
              this.presentToast('Erro ao tentar excluir.','danger');
            }
            this.presentToast('Cliente excluído.','danger');
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


