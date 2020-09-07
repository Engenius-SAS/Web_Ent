import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'ruser', loadChildren: './ruser/ruser.module#RuserPageModule' },
  { path: 'encuesta', loadChildren: './encuesta/encuesta.module#EncuestaPageModule' },
  { path: 'comunidad', loadChildren: './comunidad/comunidad.module#ComunidadPageModule' },
  { path: 'selectcomu', loadChildren: './selectcomu/selectcomu.module#SelectcomuPageModule' },
  { path: 'selectrans', loadChildren: './selectrans/selectrans.module#SelectransPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
