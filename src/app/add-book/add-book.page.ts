import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookFormComponent } from '../book-form/book-form.component';
import { GbooksService } from '../services/gbooks.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  book: Book = null;
  
      
constructor(public toastController: ToastController,
    public alertController: AlertController,
    private gbooksService: GbooksService) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });

    toast.present();
  }
    
  async getFromISBN() {
    let alert = await this.alertController.create({
      header: 'Enter ISBN',
      message: 'Add a book by the ISBN Code',
      inputs: [
        {
          name: 'isbn',
          type: 'text',
          placeholder: 'Enter ISBN'
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
            console.log(data.isbn);
            if (data.isbn === "") {
              this.presentToast("Invalid ISBN. Please try again.");
              return;
            }
            this.gbooksService.getBookByISBN(data.isbn).subscribe((response) => {
              let result = <any> response;

              console.log(result);

              if(result.totalItems === 0) {
                this.presentToast("Book was not found. Please add manually.");
                return;
              }

              let foundBook = result.items[0].volumeInfo;
              let thumbUrl = "/assets/shapes.svg";

              if (foundBook.imageLinks !== undefined) {
                thumbUrl = foundBook.imageLinks.thumbnail;
              }
              
              let isbn = "No ISBN";

              if (foundBook.industryIdentifiers !== undefined) {
                let identifiers = foundBook.industryIdentifiers;

                for (const element of identifiers) {
                  if (element.type.toLowerCase().includes("isbn")) {
                    isbn = element.identifier;
                    break;
                  }
                }
              }

              this.book = new Book(foundBook.title, isbn, 
                foundBook.authors, foundBook.pageCount, 
                null, null, thumbUrl, 
                false, "physical");

            });
          }
        }
      ]
    });

    await alert.present();

  }

  ngOnInit() {
  }

}
