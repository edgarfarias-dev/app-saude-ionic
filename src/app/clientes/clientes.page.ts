import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { CLIENTES } from '../mock/clientes.mock';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss']
})
export class ClientesPage{
  
  listaClientes = CLIENTES;
  selectedCliente: Cliente;

  nome: string = '';
  clientes: any;
  clientesFiltrados: any;

  constructor(
    public toastController: ToastController, 
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router) {   
    //user check
    if (!this.authService.checkUser()) this.router.navigate(['login'])    

    this.clientesFiltrados = this.listaClientes;   
  }  

  limparItens(){    
    this.clientesFiltrados = this.listaClientes;    
    return this.listaClientes
  }

  filtrarItens(){            
    this.clientesFiltrados = this.filtrarPessoas(this.nome);
  }

  filtrarPessoas(nome){        
    this.clientesFiltrados = this.listaClientes;    
    
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
  
  abrir(cliente: Cliente): void {
    this.selectedCliente = cliente;    
  }

  novo(): void {
    this.selectedCliente = <any>[];
  }

  async salvar(cliente: Cliente) {

    const nome = document.querySelector<HTMLInputElement>('ion-input#nome').value;        
    const titular = document.querySelector<HTMLInputElement>('ion-input#titular').value;
    const telefone = document.querySelector<HTMLInputElement>('ion-input#telefone').value;

    if(nome == "" || titular == "") {
      const alert = await this.alertController.create({
        message: 'Preencha todos os campos obrigatórios!',
        buttons: ['Entendi']
      })
      return alert.present();      
    } 

    if (cliente.id) {
      for (var i=0; i<CLIENTES.length; i++) {      
        if (CLIENTES[i].id == cliente.id) {        
          CLIENTES[i].nome = document.querySelector<HTMLInputElement>('ion-input#nome').value;
          CLIENTES[i].titular = document.querySelector<HTMLInputElement>('ion-input#titular').value;
          CLIENTES[i].telefone = document.querySelector<HTMLInputElement>('ion-input#telefone').value;
          break;
        }
      }    
    } else {
      let data = {
        id: CLIENTES.length+1,
        nome: nome,
        titular: titular,
        telefone: telefone
      };

      CLIENTES.push(data);
    }
    
    this.selectedCliente = null;
    if (cliente.id) this.presentToast('As alterações foram efetuadas.','success');
  }

  async excluir(clienteId) {    
    let actionSheet = await this.actionSheetController.create({
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',          
          handler: () => {
            for (var i=0; i<CLIENTES.length; i++) {      
              if (CLIENTES[i].id == clienteId) {          
                CLIENTES.splice(i, 1)
                break;
              }
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

    this.selectedCliente = null;
    await actionSheet.present();    
  }

  voltar(): void {
    this.selectedCliente = null;
  }

}


