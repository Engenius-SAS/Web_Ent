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
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'verencuesta', loadChildren: './verencuesta/verencuesta.module#VerencuestaPageModule' },
  { path: 'revision', loadChildren: './revision/revision.module#RevisionPageModule' },
  { path: 'listverifi', loadChildren: './listverifi/listverifi.module#ListverifiPageModule' },
  { path: 'listverifi', loadChildren: './listverifi/listverifi.module#ListverifiPageModule' },
  { path: 'transporte', loadChildren: './transporte/transporte.module#TransportePageModule' },
  { path: 'seguimiento', loadChildren: './seguimiento/seguimiento.module#SeguimientoPageModule' },
  { path: 'list-cienaga', loadChildren: './list-cienaga/list-cienaga.module#ListCienagaPageModule' },
  { path: 'listalerta', loadChildren: './listalerta/listalerta.module#ListalertaPageModule' },
  { path: 'revision-alerta', loadChildren: './revision-alerta/revision-alerta.module#RevisionAlertaPageModule' },  { path: 'seguimiento-municipios', loadChildren: './seguimiento-municipios/seguimiento-municipios.module#SeguimientoMunicipiosPageModule' },
  { path: 'list-ag', loadChildren: './list-ag/list-ag.module#ListAgPageModule' },
  { path: 'listalerta-ag', loadChildren: './listalerta-ag/listalerta-ag.module#ListalertaAgPageModule' },
  { path: 'listverifi-ag', loadChildren: './listverifi-ag/listverifi-ag.module#ListverifiAgPageModule' },
  { path: 'verencuesta-ag', loadChildren: './verencuesta-ag/verencuesta-ag.module#VerencuestaAgPageModule' },
  { path: 'revision-ag', loadChildren: './revision-ag/revision-ag.module#RevisionAgPageModule' },
  { path: 'revision-alerta-ag', loadChildren: './revision-alerta-ag/revision-alerta-ag.module#RevisionAlertaAgPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
