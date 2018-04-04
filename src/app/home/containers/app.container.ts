import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Product } from './../../products/models/product.model';

@Component({
  selector: 'app-content',
  template: `
    <!--<app-hero></app-hero>-->
    <app-product-list 
        [products]='products'
        (handleRemoveProduct)="removeProduct($event)"></app-product-list>
  `
})
export class ContentComponent {
    @Input() products : any[];
    @Output() onRemoveProduct : EventEmitter<any> = new EventEmitter();

    public removeProduct(product:any) {
        this.onRemoveProduct.emit(product);
    }

}
