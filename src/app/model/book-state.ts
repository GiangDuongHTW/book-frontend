import { BookDto, initialBook } from './book';
import {BehaviorSubject} from "rxjs";
import {BaseState} from "./base-state";
export interface BookState extends BaseState  {
  book: BookDto;
  books: BookDto[];
  booksBySearch: BookDto[];
  searchParam$: BehaviorSubject<string>;
}

export const initialBookState: BookState = {
  loading: false,
  book: initialBook,
  books: [],
  booksBySearch: [],
  searchParam$: new BehaviorSubject<string>(''),
}
