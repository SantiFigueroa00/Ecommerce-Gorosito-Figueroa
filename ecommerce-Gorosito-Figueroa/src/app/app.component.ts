import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-Gorosito-Figueroa';

  idChild:number=-1;
  recId(id: number) {
    this.idChild=id;
  }
}

