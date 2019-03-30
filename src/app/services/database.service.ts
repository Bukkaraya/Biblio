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

  getNumBooks(): Promise<any> {
    return new Promise<any>((resolve) => {
      var numBooks = 0;
      this.storage.get(BOOK_KEY).then((val) => {
        numBooks = val.size;
        resolve(numBooks);
      });
    });
  }


  getPercentFinished(): Promise<any> {
    return new Promise<any>((resolve) => {
      let numBooks = 0;
      let books = [];
      let finishCount = 0;
      this.getBooks().then((val) => {
        numBooks = val.size;

        if(numBooks === 0) {
          resolve(0);
        }

        let books = Array.from(val.values()).map(Book.clone);
        books.forEach(element => {
          if(element.isFinished) {
            finishCount++;
          }
        });

        console.log(finishCount);
        console.log(finishCount / numBooks);

        resolve(finishCount / numBooks);
      });
    });
  }

  getFormatsCount(): Promise<any> {
    return new Promise<any>((resolve) => {
      let ebookCount = 0;
      let audioCount = 0;
      let physicalCount = 0;

      this.getBooks().then((val) => {
        let books = Array.from(val.values()).map(Book.clone);
        
        books.forEach(book => {
          if(book.formatOwned === "ebook"){
            ebookCount++;
          } else if(book.formatOwned === "audiobook"){
            audioCount++;
          } else if(book.formatOwned === "physical"){
            physicalCount++;
          }
        });

        resolve([physicalCount, ebookCount, audioCount]);

      });
    });
  }

  getYearlyCount(): Promise<any> {

    return new Promise<any>((resolve) => {
      this.getBooks().then((val) => {
        let books = Array.from(val.values()).map(Book.clone);
        let yearlyCount = new Map<any, number>();
  
        books.forEach(book => {
          if(book.finishDate === null) {
            return;
          }
  
          let year = book.finishDate.getFullYear();
  
          let result = yearlyCount.get(year);
  
          if(result === undefined) {
            yearlyCount.set(year, 0);
          }
  
          result = yearlyCount.get(year);
          yearlyCount.set(year, ++result);
        });
  
        console.log(yearlyCount);
  
        resolve(yearlyCount);
      });
    });
    
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
