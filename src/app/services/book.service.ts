import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from '../model'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080';
  
  httpClient = inject(HttpClient);

   getAllBooks(partialTitle? : string): Observable<BookDto[]> {
     return this.httpClient.get<BookDto[]>(`${this.apiUrl}/books/searchByPartialTitle?partialTitle=${partialTitle}`);
  }
}
