import { Component, OnInit, Input } from '@angular/core';

import { NavParams, ModalController } from '@ionic/angular';

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


  constructor(private dbService: DatabaseService,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public router: Router) {
  }

  @Input() set book(val: Book) {
    this._book = (val !== undefined && val !== null) ? <Book> val : new Book();
    
    this.bookForm = this.formBuilder.group({
      name: [this._book.name, Validators.required],
      authors: [this._book.authors, Validators.required],
      startDate: [this._book.getStartDate()],
      finishDate: [this._book.getFinishDate()],
      isFinished: [this._book.isFinished],
      isbn: [this._book.isbn, Validators.required]
    });
  }


  saveBook() {
    if (this.bookForm.valid) {
      console.log("Form is valid");
      this._book.name = this.bookForm.value.name;
      this._book.authors = this.bookForm.value.authors.split(",");
      console.log(this.bookForm.value.finishDate);
      
      if (this.bookForm.value.startDate !== null) {
        this._book.startDate = new Date(this.bookForm.value.startDate);
      }

      if (this.bookForm.value.finishDate !== null) {
        this._book.finishDate = new Date(this.bookForm.value.finishDate);
      } 
      
      this._book.isFinished = this.bookForm.value.isFinished;
      this._book.isbn = this.bookForm.value.isbn;

      this.dbService.addBook(this._book).then(() => {
        console.log("Editted the book");
        this.router.navigateByUrl('/library');
      });


    } else {
      console.log("Form is not Valid");
    }
  }

  ngOnInit() {}

}
