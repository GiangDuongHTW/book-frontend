import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {CategoryDto} from "../model/category";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080';

  httpClient = inject(HttpClient);
  getAllCategories(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(`${this.apiUrl}/categories`).pipe(
      map((response) => response),
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() =>  console.error('Data not found.'));
        }
        return throwError(() =>  console.error('An unknown error occurred.'));
      })
    );
  }
}
