import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../model/lancamento.model';
import { LANCAMENTOS } from '../mock/lancamentos.mock';
import { AlertController, ToastController } from '@ionic/angular';
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

  constructor(public toastController: ToastController, private alertController: AlertController) {}

  ngOnInit(): void {}

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

  async novo() {
    if (PRODUTOS.length < 1 || CLIENTES.length < 1) {
      const alert = await this.alertController.create({
        message: 'Cadastre clientes e produtos para efetuar o lançamento!',
        buttons: ['Entendi']
      });
      return alert.present()
    }
    this.selectedLancamento = <any>[];
    this.clienteId = null;
    this.produtoId = null;
  }

  async salvar(lancamento: Lancamento) {

    const idCliente = parseInt(document.querySelector<HTMLInputElement>('ion-select#cliente').value);
    const idProduto = parseInt(document.querySelector<HTMLInputElement>('ion-select#produto').value);
    const valorContrato = parseInt(document.querySelector<HTMLInputElement>('ion-input#valorContrato').value);

    if(isNaN(idCliente) || isNaN(idProduto) || isNaN(valorContrato)) {
      const alert = await this.alertController.create({
        message: 'Preencha todos os campos obrigatórios!',
        buttons: ['Entendi']
      })
      return alert.present();      
    } 

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
        idCliente: idCliente,
        idProduto: idProduto,
        valorContrato: valorContrato
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


