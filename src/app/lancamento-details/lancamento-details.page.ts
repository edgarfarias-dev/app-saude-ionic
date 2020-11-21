import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Lancamento } from '../shared/lancamento.interface';
import { Cliente } from '../shared/cliente.interface';
import { Produto } from '../shared/produto.interface';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lancamento-details',
  templateUrl: './lancamento-details.page.html',
  styleUrls: ['./lancamento-details.page.scss'],
})
export class LancamentoDetailsPage implements OnInit {
  private lancamento: Lancamento = {};
  private loading: any;
  private lancamentoId: string = null;
  private lancamentoSubscription: Subscription;  

  private clientes = new Array<Cliente>();
  private clienteSubscription: Subscription;

  private produtos = new Array<Produto>();
  private produtoSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,    
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private lancamentoService: LancamentoService,
    private NavCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.lancamentoId = this.activeRoute.snapshot.params.id;

    this.clienteSubscription = this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    })
    this.produtoSubscription = this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    })    
    
    setTimeout(()=> {
      if (!this.clientes.length || !this.produtos.length) {
        console.log(this.clientes.length)
        this.alertLancamento();
      }
      if (this.lancamentoId) { 
        this.loadLancamento(); 
      }
    },1500)        
  }

  async alertLancamento() {
    const alert = await this.alertCtrl.create({
      message: 'Cadastre clientes e produtos para efetuar o lançamento!',
      buttons: ['Entendi']
    });
    return alert.present()
  }

  ngOnInit() {   
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.lancamentoSubscription.unsubscribe();
    this.clienteSubscription.unsubscribe();
    this.produtoSubscription.unsubscribe();
  }

  loadLancamento() {
    this.lancamentoSubscription = this.lancamentoService.getLancamento(this.lancamentoId).subscribe(data => {
      this.lancamento = data;
    });    
  }

  async saveLancamento() {    
    //validation
    if(!this.lancamento.idCliente || !this.lancamento.idProduto || !this.lancamento.valorContrato) {
      const alert = await this.alertCtrl.create({
        message: 'Preencha todos os campos obrigatórios!',
        buttons: ['Entendi']
      })      
      return alert.present();      
    } 

    await this.presentLoading();
    this.lancamento.userId = this.authService.getAuth().currentUser.uid;

    if (this.lancamentoId) {

      try {
        await this.lancamentoService.updateLancamento(this.lancamentoId, this.lancamento);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/lancamentos');        
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.','danger');
        this.loading.dismiss();
        console.error(error);
      }

    } else {
      this.lancamento.createdAt = new Date().getTime();

      try {
        await this.lancamentoService.addLancamento(this.lancamento);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/lancamentos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.','danger');
        this.loading.dismiss();
      }
    }

  }  

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
      spinner: 'lines',
      translucent: true
     });
    return this.loading.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      translucent: false,
      position: 'top'      
    });
    toast.present();
  }
}
