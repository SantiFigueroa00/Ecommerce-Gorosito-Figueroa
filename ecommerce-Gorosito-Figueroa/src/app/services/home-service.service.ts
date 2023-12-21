import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http : HttpClient) { }

  API_URL = 'https://api.escuelajs.co/api/v1'

  public getProducts():Observable<any>{ 
    console.log("HTTP GET");
    return this.http.get(this.API_URL+"/products");
  }


  public getGetProductById(productId: string): Observable<any>{
    return this.http.get(this.API_URL+"/products/"+productId);
  }

  public getAllProductsByCategory(id: any): Observable<any> {
        const products = this.http.get(this.API_URL+"/categories/"+id+"/products");
        return products;
  }

  public getAllCategories():Observable<any>{
    return this.http.get(this.API_URL+"/categories");
  }

  getProductsFilters(queryParams: any): Observable<any> {
    // Construir los parámetros de consulta usando HttpParams
    let params = new HttpParams();

    if (queryParams.title) {
      params = params.set('title', queryParams.title);
    }

    if (queryParams.price) {
      params = params.set('price', queryParams.price);
    }

    if (queryParams.priceMin) {
      params = params.set('price_min', queryParams.priceMin);
    }

    if (queryParams.priceMax) {
      params = params.set('price_max', queryParams.priceMax);
    }

    if (queryParams.categoryId) {
      params = params.set('categoryId', queryParams.categoryId);
    }

    // Construir la URL completa
    const url = `${this.API_URL}/products/`;
    return this.http.get(url, { params: params });
  }
} 

