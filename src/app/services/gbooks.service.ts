import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GbooksService {

  constructor(public http: HttpClient) { }

  getBookByISBN(isbn): any { 
    let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    this.http.get(url + isbn).subscribe((response) => {
      console.log(response);
    });
  }
}
