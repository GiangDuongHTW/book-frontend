export interface BookDto {
    id: string;
    title: string;
    subtitle: string;
    isbn?: string;
    authors: Array<string>;
    description: string;
    edition?: string;
    publisher: string;
    categoryId: string;
}

export const initialBook: BookDto = {
  id: '',
  title: '',
  subtitle: '',
  isbn:'',
  authors: [],
  description: '',
  edition: '',
  publisher: '',
  categoryId: '',
}
