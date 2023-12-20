import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';

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


  // public getIdCategory(id: any): Observable<any> {
  //   categories
  //   return
  // }

  public getAllProductsByCategory(id: any): Observable<any> {
        const products = this.http.get(this.API_URL+"/categories/"+id+"/products");
        return products;
  }

  public getAllCategories():Observable<any>{
    return this.http.get(this.API_URL+"/categories");
  }
}
