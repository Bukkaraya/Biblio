import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { BookPopupComponent } from './../book-popup/book-popup.component';

import { AddBookPage } from './../add-book/add-book.page';

import { Book } from '../book';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  books: Book[] = [
    {
      name: "Memory of Light",
      authors: ["Robert Jordan"],
      isbn: "XXXXXXXXXX",
      startDate: new Date(),
      finishDate: new Date(),
      isFinished: true,
      thumbnailUrl: "/assets/mol.jpg",
      pageCount: 900
    },
    {
      name: "Mistborn",
      authors: ["Brandon Sanderson"],
      isbn: "XXXXXXXXXX",
      startDate: new Date(),
      finishDate: new Date(),
      isFinished: false,
      thumbnailUrl: "/assets/hoa.jpg",
      pageCount: 700
    }
  ]

  constructor(public modalController: ModalController) {}

  async showBookModal(book) {
    const modal = await this.modalController.create({
      component: BookPopupComponent,
      cssClass: "book-modal",
      componentProps: {
        book: book
      }
    });

    return await modal.present()
  }
  


  ngOnInit() {
  }

}
