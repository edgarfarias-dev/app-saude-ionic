import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LancamentoPage } from './lancamentos.page';

import { LancamentoPageRoutingModule } from './lancamentos-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LancamentoPageRoutingModule
  ],
  declarations: [LancamentoPage]
})
export class LancamentoPageModule {}