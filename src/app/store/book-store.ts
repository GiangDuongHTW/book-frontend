import {BaseStore} from "./base-store";
import {BookDto, BookState, initialBookState} from "../model";
import {Injectable} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  tap
} from "rxjs";
import {BookService} from "../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class BookStore extends BaseStore<BookState> {
  constructor(
    private bookService: BookService,
  ) {
    super(initialBookState);
  }
  get book$(): Observable<BookDto | null> {
    return this.state$.pipe(
      map(({book}) => book),
      distinctUntilChanged(),
    );
  }

  get books$(): Observable<BookDto[] | null> {
    return this.state$.pipe(
      map(({books}) => books),
      distinctUntilChanged(),
    );
  }

  get booksBySearch$(): Observable<BookDto[] | null> {
    return this.state$.pipe(
      map(({booksBySearch}) => booksBySearch),
      distinctUntilChanged(),
    );
  }

  getAllBooksFromService() {
    this.bookService.getAllBooks().pipe(
      tap(() => this.setLoading(true)),
      take(1),
      distinctUntilChanged(),
      tap(() => this.setLoading(false)),
    ).subscribe((books) => {
      this.set('books', books);
    });
  }

  getBook(bookId: string) {
    this.setLoading(true);

    this.bookService.getBookByBookID(bookId).pipe(
      finalize(() => this.setLoading(false)),
    ).subscribe((book: BookDto) => {
      this.set('book', book);
    });
  }

  setSearchParam(search: string) {
    this.state.searchParam$.next(search);
  }

  getBooksBySearchFromService() {
    this.state.searchParam$.pipe(
      tap(() => this.setLoading(true)),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((search)  => {
        return this.bookService.getBooksBySearchedTitle(search).pipe(
          take(1),
          finalize(() => this.setLoading(false)),
        );
      }),
    ).subscribe({
      next: (books) => {
        this.set('booksBySearch', books);
      },
      error: error => {
        console.error('An Error In Subscribe From BookStore: Data Not Found! ');
      }
    });
  }
}
