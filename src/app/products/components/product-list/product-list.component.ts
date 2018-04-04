import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Product } from './../../../products/models/product.model';

import { environment } from './../../../../environments/environment';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products : Product[];
  @Output() handleRemoveProduct: EventEmitter<any> = new EventEmitter
  constructor() {

   }


  public onClickRemove(product) {
    this.handleRemoveProduct.emit(product);
  }

  trackByFn(index : any, item : any) {
    return index;
  }

}
