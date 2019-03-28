import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookFormComponent } from '../book-form/book-form.component';
import { GbooksService } from '../services/gbooks.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  book: Book = new Book();
  test = "hello";
  
      
  constructor(public alertController: AlertController,
    private gbooksService: GbooksService) { }

  async getFromISBN() {
    let alert = await this.alertController.create({
      header: 'Enter ISBN',
      message: 'Add a book by the ISBN Code',
      inputs: [
        {
          name: 'isbn',
          type: 'text',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (data) => {
            this.gbooksService.getBookByISBN(data.isbn);
          }
        }
      ]
    });

    await alert.present();

  }

  ngOnInit() {
  }

}
