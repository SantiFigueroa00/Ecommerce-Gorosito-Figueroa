import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from '../../services/detail.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  products: any [] = [];
  productSelected: any = {};
  constructor(public homeservice : HomeServiceService, private route: ActivatedRoute, public detailservice: DetailService) {}

  ngOnInit(): void {
    this.homeservice.getProducts().subscribe((res)=>{
      this.products = res
      const idURL = this.route.snapshot.params['id'];
      const product = this.products.filter((p)=> p.id == idURL)[0]
      console.log(product);
      this.detailservice.getGetProductById(product.id).subscribe((res) => {
        this.productSelected = res;
      })
    })
}
}
  
