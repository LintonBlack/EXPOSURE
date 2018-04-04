import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import { Product } from '../models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    private af: AngularFireDatabase,
    private st: AngularFireStorage ) {}

  getProducts() { 
    return this.af.list('/products')
  }

  addProducts(payload: any) {
    return this.af.list(`/products`).push(payload)
  }

  updateProducts(payload: any) {
    return this.af.object(`/products/${payload.$key}`)
    .update(payload.product)
  }

  deleteProducts(payload: any) {
    return this.af.list(`/products/${payload.$key}`).remove()
  }

  uploadImage(payload: any) {
    let file = payload.target.files[0];
    // Create a storage ref
    let storageRef = this.st.storage.ref(`images/${file.name}`);
    storageRef.put(file); 
  }

  getImageUrl(image: any) {
    // Create a storage ref
    let storageRef = this.st.storage.ref(`${image}`);
    return storageRef.getDownloadURL();
    
  }

}
