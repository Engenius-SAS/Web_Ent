import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListAgPage } from './list-ag.page';
import { ImagesviewAgComponent } from '../imagesview-ag/imagesview-ag.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: ListAgPage
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
  declarations: [ListAgPage, ImagesviewAgComponent],
  entryComponents: [ImagesviewAgComponent]
})
export class ListAgPageModule {}
