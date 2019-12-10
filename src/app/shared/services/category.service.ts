import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedData } from '../sharedClass';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAllcategory(offset,type, include_options) {
    let URL = `${SharedData.BASE_URL}/category`;
    return this.http.get(URL, { params: { offset,type,include_options } });
  }
  createNewProductCategory(CategoryData) {
    let URL = `${SharedData.BASE_URL}/category/create`;
    return this.http.post(URL, CategoryData);
  }
  editProductCategory(categoryData) {
    let URL = `${SharedData.BASE_URL}/category/edit`;
    return this.http.post(URL, categoryData);
  }
  removeProductCategory(category_id) {
    let URL = `${SharedData.BASE_URL}/category/remove`;
    return this.http.post(URL, { id: category_id });
  }
  getCategoryById(id) {
    let URL = `${SharedData.BASE_URL}/category/${id}`;
    return this.http.get(URL);
  }
}
