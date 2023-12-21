import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private titleSubject = new Subject<string>();
  private priceSubject = new Subject<number>();
  private rangeSubject = new Subject<{min:number,max:number}>();

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

  public getProductsByTitle(title:string):Observable<any>{
    return this.http.get(this.API_URL+"/products/?title="+title);
  } 

  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }

  
  public getTitleObservable(): Observable<string> {
    return this.titleSubject.asObservable();
  }
  public setPrice(price: number): void {
    this.priceSubject.next(price);
  }
  public getPriceObservable(): Observable<number> {
    return this.priceSubject.asObservable();
  }

  public getProductsByPrice(price:number):Observable<any>{
    return this.http.get(this.API_URL+"/products/?price="+price);
  } 
  public setRange(min: number,max:number): void {
    this.rangeSubject.next({min,max});
  }
  public getRangeObservable(): Observable<{min:number,max:number}> {
    return this.rangeSubject.asObservable();
  }

  public getProductsByRange(min: number,max:number):Observable<any>{
    console.log(this.API_URL+"/products/?price_min="+min+"&price_max="+max)
    return this.http.get(this.API_URL+"/products/?price_min="+min+"&price_max="+max);
  } 
}

