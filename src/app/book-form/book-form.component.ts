import { Component, OnInit, Input, SimpleChange } from '@angular/core';

import { NavController, ModalController, ToastController } from '@ionic/angular';

import { Router } from '@angular/router'

import { DatabaseService } from '../services/database.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  _book: Book;
  bookForm: any;


  constructor(public navCtrl: NavController,
    public toastController: ToastController,
    private dbService: DatabaseService,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public router: Router) {
  }

  @Input() set book(val: Book) {
    this._book = (val !== undefined && val !== null) ? <Book> val : new Book();
    
    console.log(this._book);

    this.buildForm();
    
  }


  buildForm() {
    this.bookForm = this.formBuilder.group({
      name: [this._book.name, Validators.required],
      authors: [this._book.authors, Validators.required],
      startDate: [this._book.getStartDate()],
      finishDate: [this._book.getFinishDate()],
      isFinished: [this._book.isFinished],
      isbn: [this._book.isbn, Validators.required],
      pageCount: [this._book.pageCount, Validators.required],
      formatOwned: [this._book.formatOwned, Validators.required]
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });

    toast.present();
  }

  saveBook() {
    if (this.bookForm.valid) {
      console.log("Form is valid");
      this._book.name = this.bookForm.value.name;
      this._book.authors = this.bookForm.value.authors.toString().split(",");
      console.log(this.bookForm.value.finishDate);
      
      if (this.bookForm.value.startDate !== null) {
        this._book.startDate = new Date(this.bookForm.value.startDate);
      }

      if (this.bookForm.value.finishDate !== null) {
        this._book.finishDate = new Date(this.bookForm.value.finishDate);
      } 
      
      this._book.isFinished = this.bookForm.value.isFinished;
      this._book.isbn = this.bookForm.value.isbn;

      this._book.pageCount = this.bookForm.value.pageCount;
      this._book.formatOwned = this.bookForm.value.formatOwned;

      this.dbService.addBook(this._book).then(() => {
        this.presentToast("Book has been saved");

        this.bookForm = this.formBuilder.group({
          name: ['', Validators.required],
          authors: ['', Validators.required],
          startDate: [''],
          finishDate: [''],
          isFinished: [false],
          isbn: ['', Validators.required],
          pageCount: ['', Validators.required],
          formatOwned: ['', Validators.required]
        });

        this.modalCtrl.dismiss().catch((err) => {
          console.log(err);
        });

        this.navCtrl.navigateForward('/library');


      });




    } else {
      this.presentToast("Invalid entry, please try again.");
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }

    this.buildForm();

    console.log(log);

  }

}
