import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  addBook(book: Book): Observable<Book> {
    // mock error
    const err = new Error('Failed to add book');
    return throwError(() => err);

    // return of(book);
  }
}
