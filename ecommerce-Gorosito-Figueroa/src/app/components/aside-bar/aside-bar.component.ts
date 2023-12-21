import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/Product";
import { NgForm } from '@angular/forms';
import { HomeServiceService } from '../../services/home-service.service';
import { HomeComponent } from "../home/home.component";

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

  prodFilter:Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category:{
      id:0,
      name:'',
      image:'', 
  },
  images:[]
  }

  constructor(public homeService: HomeServiceService){}

  ngOnInit(): void {
  }

  filterByTitle(myForm:NgForm){
    console.log(myForm.value.title);
    this.homeService.setTitle(myForm.value.title);
  }

  filterByPrice(price:number){
    console.log(price);
    this.homeService.setPrice(price);
  }

  filterByRange(min:number|null,max:number|null){
    if(min==null || max==null){
      alert("No puede ingresar valores nulos")
    }else{
      const auxMin=min,auxMax=max;
      console.log(auxMin,auxMax);
      this.homeService.setRange(auxMin,auxMax);
    }
  }
}

