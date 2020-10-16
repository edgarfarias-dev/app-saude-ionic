import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../model/lancamento.model';
import { LANCAMENTOS } from '../mock/lancamentos.mock';
import { ToastController } from '@ionic/angular';
import { CLIENTES } from '../mock/clientes.mock';
import { PRODUTOS } from '../mock/produtos.mock';

@Component({
  selector: 'app-lancamento',
  templateUrl: 'lancamento.page.html',
  styleUrls: ['lancamento.page.scss']
})
export class LancamentoPage implements OnInit{
  
  listaLancamento = LANCAMENTOS;
  selectedLancamento: Lancamento;

  //select - Cliente
  listaClientes = CLIENTES;
  clienteId: number;

  //select - Produto
  listaProdutos = PRODUTOS;
  produtoId: number;

  constructor(public toastController: ToastController) {}

  ngOnInit(): void {}

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
  
  //get nomeCliente
   getNomeCliente(idCliente: number): string {    
    for (var i=0; i<CLIENTES.length; i++) {
      if (idCliente == CLIENTES[i].id) {
        return CLIENTES[i].nome
      }
    }
  }
  
  abrir(lancamento: Lancamento): void {
    this.selectedLancamento = lancamento;    
    this.clienteId = this.selectedLancamento.idCliente;
    this.produtoId = this.selectedLancamento.idProduto;
  }

  novo(): void {
    this.selectedLancamento = <any>[];
    this.clienteId = null;
    this.produtoId = null;
  }

  salvar(lancamento: Lancamento): void {
    if (lancamento.id) {
      for (var i=0; i<LANCAMENTOS.length; i++) {      
        if (LANCAMENTOS[i].id == lancamento.id) {        
          LANCAMENTOS[i].idCliente = parseInt(document.querySelector<HTMLInputElement>('ion-select#cliente').value);
          LANCAMENTOS[i].idProduto = parseInt(document.querySelector<HTMLInputElement>('ion-select#produto').value);
          LANCAMENTOS[i].valorContrato = parseInt(document.querySelector<HTMLInputElement>('ion-input#valorContrato').value);
          break;
        }
      }    
    } else {      
      let data = {
        id: LANCAMENTOS.length+1,
        idCliente: parseInt(document.querySelector<HTMLInputElement>('ion-select#cliente').value),
        idProduto: parseInt(document.querySelector<HTMLInputElement>('ion-select#produto').value),
        valorContrato: parseInt(document.querySelector<HTMLInputElement>('ion-input#valorContrato').value)
      };
      LANCAMENTOS.push(data);
    }
    
    this.selectedLancamento = null;
    this.presentToast('As alterações foram efetuadas.','success');
  }

  excluir(lancamento: Lancamento): void {
    for (var i=0; i<LANCAMENTOS.length; i++) {      
      if (LANCAMENTOS[i].id == lancamento.id) {          
        LANCAMENTOS.splice(i, 1)
        break;
      }
    }
    this.selectedLancamento = null;
    this.presentToast('Lançamento excluído.','danger');
  }

  voltar(): void {
    this.selectedLancamento = null;
  }

}


