import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RevisionAlertaPage } from './revision-alerta.page';

const routes: Routes = [
  {
    path: '',
    component: RevisionAlertaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RevisionAlertaPage]
})
export class RevisionAlertaPageModule {}
