import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    //user check
    if (!this.authService.checkUser()) this.router.navigate(['login'])    
  }

  ngOnInit() {
  }

}
