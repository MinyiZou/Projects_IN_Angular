import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as bookActions from './book.actions';
import { BookService } from "./book.service";

@Injectable()
export class BookEffects {

    // This is an NgRx effect that listens for the AddBook action and then calls the addBook method of the BookService.
    addBook$ = createEffect(() => this.action$.pipe(
        // Listen for the AddBook action
        ofType(bookActions.AddBook),

        // For each AddBook action, call the addBook method of the BookService
        // 'mergemap' allows multiple concurrent 'addBook' calls
        mergeMap((action) => this.bookService.addBook(action)
        .pipe(
            // If the addBook method returns a successful result, dispatch the AddBookSuccess action
            map(book => bookActions.AddBookSuccess(book)),
            // if the addBook method returns an error, dispatch the AddBookFailure action
            catchError((error) => of(bookActions.AddBookFailure({error})))
        ))
    ));
    
    constructor(private action$: Actions, private bookService:BookService) {}

    
}