import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { AddBook, AddBookFailure, AddBookSuccess, RemoveBook } from "./book.actions";

export const initialState: Book[] = [];

export const bookReducer = createReducer(
    initialState,
    on(AddBook,  (state) => { return state}),
    on(AddBookSuccess,  (state, {id, title, author}) => [...state, {id, title, author}]),
    on(AddBookFailure, (state, {error}) => {
        console.error(error)
        return state
    }),

    on(RemoveBook, (state, {id}) => state.filter(book => book.id !== id))
)