import {CategoryDto, initialCategory} from "./category";
import {BaseState} from "./base-state";

export interface CategoryState extends BaseState  {
  category: CategoryDto;
  categories: CategoryDto[];
}

export const initialCategoryState: CategoryState = {
  loading: false,
  category: initialCategory,
  categories: [],
}
