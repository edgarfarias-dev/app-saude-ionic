import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from '../shared/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-details',
  templateUrl: './cliente-details.page.html',
  styleUrls: ['./cliente-details.page.scss'],
})
export class ClienteDetailsPage implements OnInit {
  private cliente: Cliente = {};
  private loading: any;
  private clienteId: string = null;
  private clienteSubscription: Subscription;  

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private NavCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.clienteId = this.activeRoute.snapshot.params.id;
    if (this.clienteId) { this.loadCliente(); }
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.clienteSubscription) { this.clienteSubscription.unsubscribe(); }
  }

  loadCliente() {
    this.clienteSubscription = this.clienteService.getCliente(this.clienteId).subscribe(data => {
      this.cliente = data;
    });
  }

  async saveCliente() {    
    //validation
    if(!this.cliente.nome || !this.cliente.titular) {
      const alert = await this.alertCtrl.create({
        message: 'Preencha todos os campos obrigatórios!',
        buttons: ['Entendi']
      })      
      return alert.present();      
    } 

    await this.presentLoading();
    this.cliente.userId = this.authService.getAuth().currentUser.uid;

    if (this.clienteId) {

      try {
        await this.clienteService.updateCliente(this.clienteId, this.cliente);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/clientes');        
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.','danger');
        this.loading.dismiss();
        console.error(error);
      }

    } else {
      this.cliente.createdAt = new Date().getTime();

      try {
        await this.clienteService.addCliente(this.cliente);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/clientes');
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
