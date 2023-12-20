import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
  { path: 'home/:category', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'detail/:id', component: DetailProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
