import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RevisionAlertaPage } from './revision-alerta.page';
import { Add2Component } from '../add2/add2.component';

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
  declarations: [RevisionAlertaPage, Add2Component],
  entryComponents: [Add2Component]
})
export class RevisionAlertaPageModule {}
