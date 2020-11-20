import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoDetailsPage } from './produto-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoDetailsPageRoutingModule {}
