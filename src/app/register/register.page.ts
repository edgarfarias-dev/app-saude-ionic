import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(
    private authSvc: AuthService, 
    private router: Router, 
    public toastController: ToastController
    ) {}  

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      this.toast(error)
    }
  }

  async toast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      translucent: false,
      position: 'bottom'      
    });
    toast.present();      
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['tabs']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
