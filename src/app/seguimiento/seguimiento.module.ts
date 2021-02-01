import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeguimientoPage } from './seguimiento.page';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeguimientoPage]
})
export class SeguimientoPageModule {}
