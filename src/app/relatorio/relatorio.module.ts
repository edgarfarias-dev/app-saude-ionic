import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelatorioPage } from './relatorio.page';

import { RelatorioPageRoutingModule } from './relatorio-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RelatorioPageRoutingModule
  ],
  declarations: [RelatorioPage]
})
export class RelatorioPageModule {}
