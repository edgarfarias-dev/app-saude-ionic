import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { CLIENTES } from '../mock/clientes.mock';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss']
})
export class ClientesPage implements OnInit{
  
  listaClientes = CLIENTES;
  selectedCliente: Cliente;

  constructor(public toastController: ToastController) {}

  ngOnInit(): void {
    
    setTimeout( () => {
      const searchbar = document.querySelector('ion-searchbar');
      const items = Array.from(document.querySelector('ion-list').children);   

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
      translucent: true,
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

  salvar(cliente: Cliente): void {
    if (cliente.id) {
      for (var i=0; i<CLIENTES.length; i++) {      
        if (CLIENTES[i].id == cliente.id) {        
          CLIENTES[i].nome = document.querySelector<HTMLInputElement>('ion-input#nome').value;
          CLIENTES[i].titular = document.querySelector<HTMLInputElement>('ion-input#titular').value;
          CLIENTES[i].telefone = parseInt(document.querySelector<HTMLInputElement>('ion-input#telefone').value);
          break;
        }
      }    
    } else {
      let data = {
        id: CLIENTES.length+1,
        nome: document.querySelector<HTMLInputElement>('ion-input#nome').value,
        titular: document.querySelector<HTMLInputElement>('ion-input#titular').value,
        telefone: parseInt(document.querySelector<HTMLInputElement>('ion-input#telefone').value)
      };

      CLIENTES.push(data);
    }
    
    this.selectedCliente = null;
    this.presentToast('As alterações foram efetuadas.','success');
  }

  excluir(cliente: Cliente): void {
    for (var i=0; i<CLIENTES.length; i++) {      
      if (CLIENTES[i].id == cliente.id) {          
        CLIENTES.splice(i, 1)
        break;
      }
    }
    this.selectedCliente = null;
    this.presentToast('Cliente excluído.','danger');
  }

  voltar(): void {
    this.selectedCliente = null;
  }

}


