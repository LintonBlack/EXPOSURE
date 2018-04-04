import { environment } from './../../../../../environments/environment';
import { Product } from './../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() images: any = null;
  @Input() selectedImage: any = null;
  constructor() { }

  ngOnInit() { }

  getProductImageUrl(url : any) {
    return  url;
  }

  onMouseOver(image: any) {
    this.selectedImage = image;
  }
}
