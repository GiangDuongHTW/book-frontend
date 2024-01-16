import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import { BookDto } from '../model'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/books';

  httpClient = inject(HttpClient);

  getAllBooks(): Observable<BookDto[]> {
    return this.httpClient.get<BookDto[]>(`${this.apiUrl}`);
  }

  getBookByBookID(bookId: string): Observable<BookDto> {
    return this.httpClient.get<BookDto>(`${this.apiUrl}/${bookId}`);
  }

   getBooksBySearchedTitle(title? : string): Observable<BookDto[]> {
     return this.httpClient.
        get<BookDto[]>(`${this.apiUrl}/searchByPartialTitle?partialTitle=${title}`)
          .pipe(
            map((response) => response),
            catchError((error) => {
              if (error.status === 404) {
                return throwError(() =>  console.error('An Error From Service: Data not found.'));
              }
            return throwError(() =>  console.error('An Error From Service: An unknown error occurred.'));
        })
     );
  }
}
