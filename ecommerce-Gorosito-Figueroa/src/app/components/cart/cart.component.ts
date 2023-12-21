import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  
  products: any[]=[]
  total:any=0;
  
  ngOnInit(): void {
    this.products= this.getStorage();
    this.calculateTotal();
  }

  addProduct(id:number){
    const existingProductIndex = this.products.findIndex(product => product.id == id);
    this.products[existingProductIndex].quantity += 1;
    this.setStorage("listaCarrito", this.products);
    this.ngOnInit();
  }
  subProduct(id: any) {
    const existingProductIndex = this.products.findIndex(product => product.id == id);
    if(this.products[existingProductIndex].quantity>0){
      this.products[existingProductIndex].quantity -= 1;
    }
    this.setStorage("listaCarrito", this.products);
    this.ngOnInit();
  }

  getStorage(key="listaCarrito") {
    const storedData = localStorage.getItem(key);
    const storage = storedData ? JSON.parse(storedData) : [];
    return storage;
  }

 calculateTotal() {
    this.total = this.products.reduce((acc, product) => {
      return acc + (product.price * product.quantity || 0);
    }, 0);
  }
  
  setStorage(key: string, array: any[] = []) {
    localStorage.setItem(key, JSON.stringify(array));
  }

  pay(){
    if(this.getStorage().length!=0){
      localStorage.clear();
      this.ngOnInit();
      alert("Pago Exitoso");
    }else{
      alert("No se puede pagar, si no agrego productos al carrito!");
    }
  }

  deletProd(id:number){
    let listStorage:any[] = this.getStorage();
    const copyList = listStorage.filter(product => product.id != id);
    this.setStorage("listaCarrito", copyList);
    this.ngOnInit();
  }
}
