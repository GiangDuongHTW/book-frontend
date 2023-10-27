import { BaseStore } from "./base-store";
import {BookDto, BookState, initialBookState } from "../model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookService } from "../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class BookStore extends BaseStore<BookState> {
  constructor(
    private bookService: BookService,
  ) {
    super(initialBookState);
  }
  
  get books$(): Observable<BookDto[]> {
    return this.get$('books');
  }
  
  get book$(): Observable<BookDto> {
    return this.get$('book');
  }
  
  subscribeToSearchBook(search?: string){
    
    //try with param behavior after check to deal with switchmAP FOR FILTER FUNCTION
    this.bookService.getAllBooks(search).pipe(
      ).subscribe((books) => {
        this.set('books', books);
      });
  }
}
