import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ListalertaAgPage } from './listalerta-ag.page';

const routes: Routes = [
  {
    path: '',
    component: ListalertaAgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListalertaAgPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListalertaAgPageModule {}
