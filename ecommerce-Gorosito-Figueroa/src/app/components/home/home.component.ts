import { Component, Input, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    public homseService: HomeServiceService,
    private route: ActivatedRoute
  ) {}

  products: any = [];
  categories: any[] = [];
  catURL: string | undefined;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catURL = params['category'] || undefined;
      this.listProducts();
    });
    

    this.route.queryParams.subscribe((queryParams) => {
      // Pasar los queryParams al servicio para obtener productos
      this.homseService.getProductsFilters(queryParams).subscribe((res) => {
        this.products = res;
      });
    });

  }

  listProducts() {
    if (this.catURL) {
      this.homseService.getAllCategories().subscribe((res) => {
        this.categories = res;
        let catFilter = this.categories.filter(
          (category) => category.name === this.catURL
        )[0];
        this.homseService
          .getAllProductsByCategory(catFilter.id)
          .subscribe((res) => {
            if (res.length == 0) {
              alert('Esta categoria no tiene producto!');
            } else {
              this.products = res;
            }
          });
      });
    } else {
      this.homseService.getProducts().subscribe((res) => {
        this.products = res;
      });
    }
  }

}
