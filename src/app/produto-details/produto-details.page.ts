import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Produto } from '../shared/produto.interface';
import { ProdutoService } from 'src/app/services/produto.service';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.page.html',
  styleUrls: ['./produto-details.page.scss'],
})
export class ProdutoDetailsPage implements OnInit {
  private produto: Produto = {};
  private loading: any;
  private produtoId: string = null;
  private produtoSubscription: Subscription;  

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private produtoService: ProdutoService,
    private NavCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.produtoId = this.activeRoute.snapshot.params.id;
    if (this.produtoId) { this.loadProduto(); }
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.produtoSubscription) { this.produtoSubscription.unsubscribe(); }
  }

  loadProduto() {
    this.produtoSubscription = this.produtoService.getProduto(this.produtoId).subscribe(data => {
      this.produto = data;
    });
  }

  async saveProduto() {    
    //validation
    if(!this.produto.nome || !this.produto.percentual) {
      const alert = await this.alertCtrl.create({
        message: 'Preencha todos os campos obrigatórios!',
        buttons: ['Entendi']
      })      
      return alert.present();      
    } 

    await this.presentLoading();
    this.produto.userId = this.authService.getAuth().currentUser.uid;

    if (this.produtoId) {

      try {
        await this.produtoService.updateProduto(this.produtoId, this.produto);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/produtos');        
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.','danger');
        this.loading.dismiss();
        console.error(error);
      }

    } else {
      this.produto.createdAt = new Date().getTime();

      try {
        await this.produtoService.addProduto(this.produto);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/produtos');
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
