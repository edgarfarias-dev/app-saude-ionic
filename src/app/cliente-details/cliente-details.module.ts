import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteDetailsPageRoutingModule } from './cliente-details-routing.module';

import { ClienteDetailsPage } from './cliente-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDetailsPageRoutingModule
  ],
  declarations: [ClienteDetailsPage]
})
export class ClienteDetailsPageModule {}
