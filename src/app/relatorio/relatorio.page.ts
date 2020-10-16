import { Component, OnInit } from '@angular/core';
import { CLIENTES } from '../mock/clientes.mock';
import { PRODUTOS } from '../mock/produtos.mock';
import { LANCAMENTOS } from '../mock/lancamentos.mock';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: 'relatorio.page.html',
  styleUrls: ['relatorio.page.scss']
})
export class RelatorioPage implements OnInit{  

  relatorio: any[] = [];
  totalComissao: number = 0;

  apuracao: boolean = false;

  loading = null;

  constructor(public loadingController: LoadingController) {}

  ngOnInit(): void {}    

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde ...'      
    });
    await this.loading.present();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async apurar() {
    this.presentLoading();

    await this.delay(2000);

    this.relatorio = [];
      this.totalComissao = 0;

      for (let i=0; i<LANCAMENTOS.length; i++) {

        let data = [];  
  
        for (let j=0; j<CLIENTES.length; j++) {
          if (LANCAMENTOS[i].idCliente == CLIENTES[j].id) {
            data['nomeCliente'] = (CLIENTES[j].nome)          
          }
        }
        for (let k=0; k<PRODUTOS.length; k++) {
          if (LANCAMENTOS[i].idProduto == PRODUTOS[k].id) {
            data['percentual'] = (PRODUTOS[k].percentual)
          }
        }
  
        data['valorContrato'] = LANCAMENTOS[i].valorContrato;
  
        let valorComissao = data['valorContrato'] * data['percentual'] / 100;
  
        data['valorComissao'] = valorComissao;      
  
        //Total Comissão
        this.totalComissao += data['valorComissao']
  
        //Relatório
        this.relatorio.push(data);        

        //loading
        this.loading.dismiss();  

        //apuracao
        this.apuracao = true;
      }
  }

}

