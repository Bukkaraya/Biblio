import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';  
import { ReactiveFormsModule } from '@angular/forms';


import { BookFormComponent } from './book-form/book-form.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BookFormComponent,
    EditBookComponent
  ],
  exports: [
    BookFormComponent,
    EditBookComponent
  ],
  entryComponents: [BookFormComponent, EditBookComponent],
})
export class ComponentsModule {}