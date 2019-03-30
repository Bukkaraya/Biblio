import { Component, OnInit } from '@angular/core';

import { NavParams, ModalController, ToastController } from '@ionic/angular';


import { Book } from '../book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  
})
export class EditBookComponent implements OnInit {
  book: Book;


  constructor(navParams: NavParams, 
    private modalCtrl: ModalController) {
    this.book = navParams.get('book');
  }

  ngOnInit() {}



  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
