import { Injectable } from '@angular/core';

import { Book } from '../book';

import { Storage } from '@ionic/storage';

const BOOK_KEY = "books";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  _db: any;
  

  constructor(public storage: Storage) {
    this.initDb();
  }

  initDb(): void {
    this.storage.get(BOOK_KEY).then((val) => {
      if(!val) {
        this.storage.set(BOOK_KEY, new Map<number, any>());
      } else {
        console.log("Data is present");
      }
    });
  }

  
  addBook(book: Book): Promise<any> {
    return this.storage.get(BOOK_KEY).then((val) => {
      val.set(book.id, book);
      return this.storage.set(BOOK_KEY, val);
    });
  }

  getBooks(): Promise<any> {
    return this.storage.get(BOOK_KEY);
  }

  deleteBook(book: Book): Promise<any> {
    return this.storage.get(BOOK_KEY).then((val) => {
      if(val.has(book.id)) {
        val.delete(book.id);
        return this.storage.set(BOOK_KEY, val);
      }
    });
  }

}
