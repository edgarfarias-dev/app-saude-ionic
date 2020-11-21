import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',    
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'maps/:place',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente-details',
    loadChildren: () => import('./cliente-details/cliente-details.module').then( m => m.ClienteDetailsPageModule)
  },
  {
    path: 'cliente-details/:id',
    loadChildren: () => import('./cliente-details/cliente-details.module').then( m => m.ClienteDetailsPageModule)
  },  
  {
    path: 'produto',
    loadChildren: () => import('./produto/produto.module').then( m => m.ProdutoPageModule)
  },
  {
    path: 'produto-details',
    loadChildren: () => import('./produto-details/produto-details.module').then( m => m.ProdutoDetailsPageModule)
  },
  {
    path: 'produto-details/:id',
    loadChildren: () => import('./produto-details/produto-details.module').then( m => m.ProdutoDetailsPageModule)
  },
  {
    path: 'lancamento',
    loadChildren: () => import('./lancamento/lancamento.module').then( m => m.LancamentoPageModule)
  },
  {
    path: 'lancamento-details',
    loadChildren: () => import('./lancamento-details/lancamento-details.module').then( m => m.LancamentoDetailsPageModule)
  },
  {
    path: 'lancamento-details/:id',
    loadChildren: () => import('./lancamento-details/lancamento-details.module').then( m => m.LancamentoDetailsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
