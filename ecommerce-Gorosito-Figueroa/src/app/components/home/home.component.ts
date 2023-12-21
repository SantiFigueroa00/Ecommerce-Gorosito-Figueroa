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

  private titleSubscription!: Subscription;
  private priceSubscription!: Subscription;
  private rangeSubscription!: Subscription;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catURL = params['category'] || undefined;
      this.listProducts();
    });
    this.titleSubscription = this.homseService.getTitleObservable().subscribe((title) => {
      this.filterTitle(title);
    });
    this.priceSubscription = this.homseService.getPriceObservable().subscribe((price) => {
      this.filterPrice(price);
    });
    this.rangeSubscription = this.homseService.getRangeObservable().subscribe((range) => {
      
      this.filterRange(range.min, range.max);
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

  filterTitle(title:string): void{
    this.homseService.getProductsByTitle(title).subscribe((res) => {
      this.products=res;
    });
  }

  filterPrice(price:number): void{
    this.homseService.getProductsByPrice(price).subscribe((res) => {
      this.products=res;
    });
  }
  filterRange(min:number,max:number): void{
    this.homseService.getProductsByRange(min,max).subscribe((res) => {
      console.log(res)
      this.products=res;
    });
  }
}
