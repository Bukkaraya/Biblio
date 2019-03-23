import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibraryPage } from './library.page';
import { BookPopupComponent } from './../book-popup/book-popup.component'


const routes: Routes = [
  {
    path: '',
    component: LibraryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [BookPopupComponent],
  declarations: [LibraryPage, BookPopupComponent]
})
export class LibraryPageModule {}
