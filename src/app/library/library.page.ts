import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { BookPopupComponent } from './../book-popup/book-popup.component';

import { AddBookPage } from './../add-book/add-book.page';

import { DatabaseService } from '../services/database.service';

import { Book } from '../book';
import { BookFormComponent } from '../book-form/book-form.component';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})

export class LibraryPage implements OnInit {

  books: Book[] = [];

  constructor(public dbService: DatabaseService, public modalController: ModalController) {}

  async showBookModal(book) {
    const modal = await this.modalController.create({
      component: BookPopupComponent,
      cssClass: "book-modal",
      componentProps: {
        book: book
      }
    });

    return await modal.present();
  }
  
  async deleteBook(book: Book) {
    this.dbService.deleteBook(book).then(() => {
      console.log("Deleted book");
      this.obtainBooks();
    })
  }

  obtainBooks() {
    this.dbService.getBooks().then((val) => {
      this.books = Array.from(val.values()).map(Book.clone);
      console.log(this.books)
    })
  }

  async editBook(book: Book) {
    const modal = await this.modalController.create({
      component: EditBookComponent,
      componentProps: {
        book: book
      }
    });

    return await modal.present();
  }

  ngOnInit() {
    this.obtainBooks();
  }

}
