import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  products: any[] = [];
  productSelected: any = {};
  constructor(
    public homeservice: HomeServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.homeservice.getProducts().subscribe((res) => {
      this.products = res;
      const idURL = this.route.snapshot.params['id'];
      const product = this.products.filter((p) => p.id == idURL)[0];
      console.log(product);
      this.homeservice.getGetProductById(product.id).subscribe((res) => {
        this.productSelected = res;
      });
    });
  }

  
  saveProduct(){
    let listStorage:any[] = this.getStorage();
    const existingProductIndex = listStorage.findIndex(product => product.id === this.productSelected.id);

    if (existingProductIndex !== -1) {
      listStorage[existingProductIndex].quantity += 1;
    } else {
      this.productSelected.quantity = 1;
      listStorage.push(this.productSelected);
    }
  
    this.setStorage("listaCarrito", listStorage);
  }

  getStorage(key="listaCarrito") {
    const storedData = localStorage.getItem(key);
    const storage = storedData ? JSON.parse(storedData) : [];
    return storage;
  }
  setStorage(key: string, array: any[] = []) {
    localStorage.setItem(key, JSON.stringify(array));
  }
}
