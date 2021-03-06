import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { Book } from '../book';

@Component({
  selector: 'app-book-popup',
  templateUrl: './book-popup.component.html',
  styleUrls: ['./book-popup.component.scss'],
})

export class BookPopupComponent implements OnInit {
  book: Book;
  
  constructor(navParams: NavParams, 
    private modalCtrl: ModalController) {
    this.book = navParams.get('book');
  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

  ngOnInit() {}

}
