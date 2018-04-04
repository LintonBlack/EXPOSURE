import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../models/product.model';

@Component({
  selector: 'app-product-price-info',
  templateUrl: './product-price-info.component.html',
  styleUrls: ['./product-price-info.component.scss']
})
export class ProductPriceInfoComponent implements OnInit {
  @Input() product : Product;
  constructor() { }

  ngOnInit() {}

}
