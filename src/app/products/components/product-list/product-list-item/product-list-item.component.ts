import { Component, Input , Output, EventEmitter} from '@angular/core';

import { environment } from './../../../../../environments/environment';
import { Product } from './../../../../products/models/product.model';

import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';

// Services
import { ProductsService } from './../../../services';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {

  @Input() product: any = null;
  @Input() image;

  @Output() handleRemoveProduct : EventEmitter<any> = new EventEmitter();

  constructor (
    public ps : ProductsService,
    public af : AngularFireStorage) {}

  get id() {
    return this.product['id'];
  }

  get title() {
    return this.product['title'];
  }

  get fileUrl() {
    return this.product['fileUrl'];
  }


  public remove(product : any) {
    this.handleRemoveProduct.emit(product);
  } 

}
