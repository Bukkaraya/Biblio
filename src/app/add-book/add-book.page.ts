import { Component, OnInit } from '@angular/core';

import { Book } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  book: Book = new Book();
  
  constructor() { }

  ngOnInit() {
  }

}
