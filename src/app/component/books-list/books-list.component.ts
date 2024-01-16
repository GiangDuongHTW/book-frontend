import {Component, inject, OnInit} from '@angular/core';
import {BookStore} from "../../store";
import {Observable} from "rxjs";
import {BookDto} from "../../model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  bookStore = inject(BookStore);
  router = inject(Router);

  books$: Observable<BookDto[] | null> | undefined;

  ngOnInit() {
    this.books$ = this.bookStore.books$;
    this.bookStore.getAllBooksFromService();
  }
  goToDetailPage(bookId: string) {
    this.router.navigate(['/books', bookId]);
  }
}
