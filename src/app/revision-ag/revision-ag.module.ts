import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertaagComponent } from '../alertaag/alertaag.component';
import { RevisionAgPage } from './revision-ag.page';

const routes: Routes = [
  {
    path: '',
    component: RevisionAgPage
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
  declarations: [RevisionAgPage, AlertaagComponent],
  entryComponents: [AlertaagComponent]
})
export class RevisionAgPageModule {}
