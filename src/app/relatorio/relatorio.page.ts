import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/cliente.interface';
import { ClienteService } from '../services/cliente.service';
import { Produto } from '../shared/produto.interface';
import { ProdutoService } from '../services/produto.service';
import { Lancamento } from '../shared/lancamento.interface';
import { LancamentoService } from '../services/lancamento.service';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: 'relatorio.page.html',
  styleUrls: ['relatorio.page.scss']
})
export class RelatorioPage implements OnInit{  

  private clientes = new Array<Cliente>();
  private clienteSubscription: Subscription;   

  private produtos = new Array<Produto>();
  private produtoSubscription: Subscription;   

  private lancamentos = new Array<Lancamento>();
  private lancamentoSubscription: Subscription;  

  relatorio: any[] = [];
  totalComissao = 0;
  apuracao = false;
  loading = null;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    private authService: AuthService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private lancamentoService: LancamentoService,
    private router: Router) {
      //user check
      if (!this.authService.checkUser()) this.router.navigate(['login'])
      
      this.clienteSubscription = this.clienteService.getClientes().subscribe(data => {
        this.clientes = data;        
      })
      this.produtoSubscription = this.produtoService.getProdutos().subscribe(data => {
        this.produtos = data;        
      })
      this.lancamentoSubscription = this.lancamentoService.getLancamentos().subscribe(data => {
        this.lancamentos = data;        
      })
    }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.lancamentoSubscription.unsubscribe();
    if (this.clienteSubscription) this.clienteSubscription.unsubscribe();
    if (this.produtoSubscription) this.produtoSubscription.unsubscribe();
  }

  async apurar() {
    this.presentLoading();

    await this.delay(2000);

    this.relatorio = [];
      this.totalComissao = 0;

      if (this.lancamentos.length) {
        this.lancamentos.forEach((val) => {

          let data = [];
          
          this.clientes.forEach((value)=> {
            if(val.idCliente == value.id) {
              data['nomeCliente'] = value.nome
            }
          })

          this.produtos.forEach((value)=> {
            if(val.idProduto == value.id) {
              data['percentual'] = value.percentual
            }
          })
        
          data['valorContrato'] = val.valorContrato;
    
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
        })
      } else {
        this.loading.dismiss();
        this.toast('Nenhum lançamento efetuado. Efetue lançamentos para poder fazer a apuração.')
      }
      
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'lines',
      translucent: true
    });
    await this.loading.present();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async toast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      translucent: false,
      position: 'middle'      
    });
    toast.present();      
  }

}


