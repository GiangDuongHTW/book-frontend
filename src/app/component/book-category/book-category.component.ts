import {Component, inject, OnInit} from '@angular/core';
import {combineLatestWith, Observable} from "rxjs";
import {CategoryDto} from "../../model/category";
import {CategoryStore} from "../../store/category-store";
import {MatTableDataSource} from "@angular/material/table";
import {BookStore} from "../../store";
import {BookDto} from "../../model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit{
  bookStore = inject(BookStore);
  categoryStore = inject(CategoryStore);

  displayedColumns: string[] = ['title', 'authors', 'category', 'isbn'];
  dataSource = new MatTableDataSource<BookDto>();

  ngOnInit() {
    this.categoryStore.getCategoriesFromService();

    this.bookStore.books$.pipe(
        combineLatestWith(this.categoryStore.categories$),
    ).subscribe(([books,categories]) => {
      const items = [];

      if(books){
        for (const book of books) {
          const category = categories!.find((item) =>
              item.categoryId === book.categoryId
          );

          items.push({
            ...book,
            category: category!.name
          })
        }
      }
      this.dataSource.data = items;
    });
  }
}
/* if (!books) return;

     const items = books.map(book => {
       const category = categories.find(item => item.categoryId === book.categoryId);

       return {
         ...book,
         categoryName: category!.name,
       };
     });*/
