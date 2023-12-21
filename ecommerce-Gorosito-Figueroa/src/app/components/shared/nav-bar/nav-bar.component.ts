import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeServiceService } from '../../../services/home-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

categories: any;

constructor(public homeService :HomeServiceService){
}

ngOnInit(): void {
  this.listCategories();
}


listCategories(){
  this.homeService.getAllCategories().subscribe((res)=>{
    this.categories=res;
  })
}

}
