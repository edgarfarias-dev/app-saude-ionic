import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosPage } from './produtos.page';

import { ProdutosPageRoutingModule } from './produtos-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProdutosPageRoutingModule
  ],
  declarations: [ProdutosPage]
})
export class ProdutosPageModule {}
