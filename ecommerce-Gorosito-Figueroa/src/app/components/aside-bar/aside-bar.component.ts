import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/Product";
import { NgForm } from '@angular/forms';
import { HomeServiceService } from '../../services/home-service.service';
import { HomeComponent } from "../home/home.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.css'
})
export class AsideBarComponent implements OnInit {
  
  rangePrice:{min:number |null,max:number|null}={
    min: null,
    max:null
  };

  categories: any;

  prodFilter:any = {
    title: undefined,
    price: null,
    category:{
      id:undefined,
      name:'',
  }
  }

  constructor(public homeService: HomeServiceService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.homeService.getAllCategories().subscribe((res)=>{
      this.categories=res;
    })
  }

  applyFilters(): void {
    // Construir el objeto queryParams con todos los filtros
    const queryParams: any = {};

    if (this.prodFilter.title !== null && this.prodFilter.title !== undefined) {
      queryParams.title = this.prodFilter.title;
    }

    if (this.prodFilter.price !== null && this.prodFilter.price !== undefined) {
      queryParams.price = this.prodFilter.price;
    }

    if (this.rangePrice.min !== null && this.rangePrice.min !== undefined) {
      queryParams.priceMin = this.rangePrice.min;
    }

    if (this.rangePrice.max !== null && this.rangePrice.max !== undefined) {
      queryParams.priceMax = this.rangePrice.max;
    }

    if (this.prodFilter.category.id !== null && this.prodFilter.category.id !== undefined) {
      queryParams.categoryId = this.prodFilter.category.id;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
  
}

