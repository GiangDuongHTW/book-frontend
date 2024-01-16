import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookSearchComponent} from "./component/book-search/book-search.component";
import {BookCategoryComponent} from "./component/book-category/book-category.component";
import {BooksListComponent} from "./component/books-list/books-list.component";
import {BookDetailPageComponent} from "./component/book-detail-page/book-detail-page.component";
import {ErrorComponent} from "./component/error";

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
  {
    path: 'search',
    component: BookSearchComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailPageComponent,
  },
  {
    path: 'category',
    component: BookCategoryComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
