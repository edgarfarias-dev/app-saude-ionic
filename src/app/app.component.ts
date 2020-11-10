import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSvc: AuthService, 
    private router: Router
  ) {
    this.initializeApp();
  }

  async sair() {
    if (this.authSvc.logout()) this.router.navigate(['login'])
  }

  async sobre() {
    this.router.navigate(['sobre'])
  }

  async home() {
    this.router.navigate(['tabs'])
  }

  isLogged() {    
    return this.authSvc.checkUser()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
