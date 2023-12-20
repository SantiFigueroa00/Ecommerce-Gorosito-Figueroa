import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http:HttpClient) { }

  API_URL ="https://api.escuelajs.co/api/v1/categories";

  public getAllCategories():Observable<any>{
    return this.http.get(this.API_URL);
  }
}
