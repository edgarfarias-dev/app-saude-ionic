import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../cliente/cliente.module').then(m => m.ClientePageModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('../produto/produto.module').then(m => m.ProdutoPageModule)
      },
      {
        path: 'lancamentos',
        loadChildren: () => import('../lancamento/lancamento.module').then(m => m.LancamentoPageModule)
      },
      {
        path: 'relatorio',
        loadChildren: () => import('../relatorio/relatorio.module').then(m => m.RelatorioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/clientes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/clientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
