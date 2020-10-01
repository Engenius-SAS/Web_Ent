import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransportePage } from './transporte.page';
import { ImagestviewComponent } from '../imagestview/imagestview.component';

const routes: Routes = [
  {
    path: '',
    component: TransportePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransportePage, ImagestviewComponent],
  entryComponents: [ImagestviewComponent]
})
export class TransportePageModule {}
