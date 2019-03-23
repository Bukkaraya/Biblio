import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { Book } from '../book';

@Component({
  selector: 'app-book-popup',
  templateUrl: './book-popup.component.html',
  styleUrls: ['./book-popup.component.scss'],
})
export class BookPopupComponent implements OnInit {
  book: Book;
  
  constructor(navParams: NavParams) {
    this.book = navParams.get('book');
  }

  ngOnInit() {}

}
