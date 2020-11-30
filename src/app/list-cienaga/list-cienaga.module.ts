import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCienagaPage } from './list-cienaga.page';
//import { ImageviewComponent } from '../imageview/imageview.component';

const routes: Routes = [
  {
    path: '',
    component: ListCienagaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCienagaPage]
})
export class ListCienagaPageModule {}
