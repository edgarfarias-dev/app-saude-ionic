import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoDetailsPageRoutingModule } from './produto-details-routing.module';

import { ProdutoDetailsPage } from './produto-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoDetailsPageRoutingModule
  ],
  declarations: [ProdutoDetailsPage]
})
export class ProdutoDetailsPageModule {}
