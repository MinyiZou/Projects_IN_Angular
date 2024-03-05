import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { AddBook, RemoveBook } from '../books/book.actions';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books$: Observable<Book[]>;
  
  constructor(private store: Store<AppState>) {
    this.books$ = store.select('book')
  }

  addBook(id : string, title: string, author: string) {
    this.store.dispatch(AddBook({id, title, author}))
  }

  removeBook(id: string) {
    this.store.dispatch(RemoveBook({id}))
  }
}
