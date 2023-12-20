import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

categories: any;

constructor(public navBarService :NavbarService){
}

ngOnInit(): void {
  this.listCategories();
}


listCategories(){
  this.navBarService.getAllCategories().subscribe((res)=>{
    this.categories=res;
  })
}

}
