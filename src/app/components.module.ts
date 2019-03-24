import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BookFormComponent } from './book-form/book-form.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    BookFormComponent
  ],
  exports: [
    BookFormComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}