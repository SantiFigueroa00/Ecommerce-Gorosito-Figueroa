import { Component, Input, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
import { ActivatedRoute } from '@angular/router';

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
  }

  listProducts() {
    console.log(this.catURL);
    if (this.catURL) {
      this.homseService.getAllCategories().subscribe((res) => {
        this.categories = res;
        let catFilter = this.categories.filter(
          (category) => category.name === this.catURL
        )[0];
        console.log(catFilter.id);
        this.homseService
          .getAllProductsByCategory(catFilter.id)
          .subscribe((res) => {
            if (res.length == 0) {
              alert('Esta categoria no tiene producto!');
            } else {
              this.products = res;
              console.log(res);
            }
          });
      });
    } else {
      this.homseService.getProducts().subscribe((res) => {
        console.log(res);
        this.products = res;
      });
    }
  }
}
