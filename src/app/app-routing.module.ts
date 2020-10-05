import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthLayoutComponent } from './layouts/containers/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/containers/main-layout/main-layout.component';
import { NavbarOnlyLayoutComponent } from './layouts/containers/navbar-only-layout/navbar-only-layout.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarOnlyLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feature-modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'tutoriels',
        loadChildren: () => import('./feature-modules/posts/post.module').then(m => m.PostModule)
      }
    ]
  },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       loadChildren: () => import('./features-modules/login/login.module').then(m => m.LoginModule)
  //     }
  //   ],
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: environment.useHash,
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
