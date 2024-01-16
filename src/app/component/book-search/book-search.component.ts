import {Component, inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil
} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookDto} from "../../model";
import {BookStore} from "../../store";
import {BookService} from "../../services/book.service";
import {CleanUpComponent} from "../cleanUp/clean-up.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class BookSearchComponent extends CleanUpComponent implements OnInit{
  searchForm = new FormGroup({
    search : new FormControl(''),
  })

  isLoading$ : Observable<boolean> |undefined;
  booksBySearch$: Observable<BookDto[]| null> | undefined;
  books: BookDto[] | undefined;

  bookStore = inject(BookStore);
  ngOnInit(): void {
    this.isLoading$ = this.bookStore.isLoading$;

    this.booksBySearch$ = this.bookStore.booksBySearch$;

    this.searchForm.get('search')!.valueChanges.pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        filter(value => !! value),
        takeUntil(this.$destroy),
    ).subscribe((value)  => {
        this.bookStore.setSearchParam(value!);
        this.bookStore.getBooksBySearchFromService();
    });
  }
}
