import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentoDetailsPageRoutingModule } from './lancamento-details-routing.module';

import { LancamentoDetailsPage } from './lancamento-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentoDetailsPageRoutingModule
  ],
  declarations: [LancamentoDetailsPage]
})
export class LancamentoDetailsPageModule {}
