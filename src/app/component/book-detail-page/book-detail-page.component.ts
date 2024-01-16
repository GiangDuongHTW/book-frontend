import {Component, inject, OnInit} from '@angular/core';
import {BookStore} from "../../store";
import {Observable, skip, takeUntil} from "rxjs";
import {BookDto} from "../../model";
import {ActivatedRoute} from "@angular/router";
import {CleanUpComponent} from "../cleanUp/clean-up.component";

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.scss']
})
export class BookDetailPageComponent extends CleanUpComponent implements OnInit{
  bookStore = inject(BookStore);
  activatedRouter = inject(ActivatedRoute);

  book$: Observable<BookDto |null > | undefined;
  ngOnInit() {
    this.book$ = this.bookStore.book$;

    this.subscribeBookToRouterParams();
  }
  private subscribeBookToRouterParams() {
    this.activatedRouter.paramMap.pipe(
      takeUntil(this.$destroy),
    ).subscribe(param => {
      const bookId: string | null = param.get('id');

      if (bookId) {
        this.bookStore.getBook(bookId);
      }
    });
  }
}
