import { BaseStore } from "./base-store";
import { CategoryDto } from "../model/category";
import {CategoryService} from "../services/category.service";
import {CategoryState, initialCategoryState} from "../model/category-state";
import {distinctUntilChanged, map, Observable, take, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CategoryStore extends BaseStore<CategoryState> {

  constructor( private categoryService: CategoryService) {
    super(initialCategoryState);
  }

  get category$(): Observable<CategoryDto> {
    return this.get$('category');
  }

  get categories$(): Observable<CategoryDto[] | null> {
    return this.state$.pipe(
        map(({ categories }) => categories),
        distinctUntilChanged(),
    );
  }

  getCategoriesFromService() {
    this.categoryService.getAllCategories().pipe(
        tap(() => this.setLoading(true)),
        take(1),
        tap(() => this.setLoading(false))
    ).subscribe(  (categories) => {
         this.set('categories', categories);
    });
  }
}

