import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RevisionPage } from './revision.page';
import { PopoverviewComponent } from '../popoverview/popoverview.component';

const routes: Routes = [
  {
    path: '',
    component: RevisionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RevisionPage, PopoverviewComponent],
  entryComponents: [PopoverviewComponent]
})
export class RevisionPageModule {}
