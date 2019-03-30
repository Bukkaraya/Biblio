import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class GbooksService {

  constructor(public http: HttpClient) { }

  getBookByISBN(isbn) { 
    let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    return this.http.get(url + isbn);
  }
}
