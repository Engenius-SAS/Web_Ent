import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeguimientoMunicipiosPage } from './seguimiento-municipios.page';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoMunicipiosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ],
  declarations: [SeguimientoMunicipiosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SeguimientoMunicipiosPageModule {}
