import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from './../products/models/product.model';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { AngularFireList} from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Services
import { ProductsService } from './../products/services';
import { AngularFireStorage } from 'angularfire2/storage';
//
import { Categorie } from './../products/models/categorie.model';
import { Subject } from 'rxjs/Subject';



@Component({
  selector: 'app-home',
  template: `
  
  <app-content 
      [products]="products$ | async"
      (onRemoveProduct)="remove($event)">
  </app-content>

  <!-- add -->
  <div class="container">
  <h1>Book Form:</h1>
  <div class="preview">
    <img [src]="previewURL | async" />
  </div>
  <form  (ngSubmit)="uploadFile()" [formGroup]="add" novalidate>
    <div>
    <tag-input class="form-control" [formControl]="add.controls['tags']" theme='bootstrap' [editable]='true' (onTagEdited)="onTagEdited($event)"></tag-input>
    </div>

  <div>
    <label for="file">File</label>
    <app-progress-bar 
      [percentage]="uploadPercent | async">
    </app-progress-bar>
       <input type="file"  (change)="fileChangeEvent($event)" class="form-control" id="file"  [formControl]="add.controls['file']" placeholder="Product Title" name="file">
  </div>

    <div>
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title"  [formControl]="add.controls['title']" placeholder="Product Title" required name="title">
    </div>
    <div>
      <label for="description">Description</label>
      <input type="text" class="form-control" id="description"  [formControl]="add.controls['description']" placeholder="Description" required name="description">
    </div>
    <div>
      <label for="price">Prix</label>
      <input type="number" class="form-control"  id="price"  [formControl]="add.controls['price']" placeholder="Price" required name="price">
    </div>
    <div>
    <label for="price">Categories</label>
    {{allCategory}}
    <select name="category"  class="form-control" [formControl]="add.controls['category']" required>
      <option *ngFor="let item of allCategory" [ngValue]="item?.catId">
          {{ item.catName }}
      </option>
  </select> 
  </div>
  {{add.value | json  }}
  {{add.valid}}
    <p>
      <button  [disabled]="!add.valid" type="submit" class="btn btn-default btn-primary">Submit</button>
    </p>
  </form>
</div>

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public add: FormGroup;
  public previewURL: Observable<any>;
  public uploadState: Observable<string>;
  public file: Blob;
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  public uploadURL: Observable<string> = Observable.of('');;

  public products$ : Observable<any[]>;
  public selectPlaceholder = '--select--';
  public allCategory = [
    new Categorie(null, '--Select a category--'),
    new Categorie(100, 'Homme'),
    new Categorie(101, 'Femme'),
    new Categorie(102, 'Absctract')
] 

  constructor(
    public fb: FormBuilder,
    public ps : ProductsService,
    private storage: AngularFireStorage) {



    this.add = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      category: [null, Validators.required],
      file: [''],
      tags : [[]]
    });
  }

/////////////////////////
  public addToDb() {
    this.add.value['id'] = `REF${Number(new Date())}`;
    this.add.value['available'] = true;
    this.add.value['sold'] = false;
    this.ps.addProducts(this.add.value);
    this.previewURL = null;
    this.add.reset();
   }

   public remove(product : any) {
    this.ps.deleteProducts(product);  
   }
/////////////////////////

   public fileChangeEvent(event: any) {
    const reader = new FileReader();
    this.file = event.target.files[0];
    this.previewURL = fromEvent(reader, 'load').pipe(map(e => reader.result));
    reader.readAsDataURL(this.file);
   }


   public uploadFile() {
    const randomId = Math.random().toString(36).substring(7);
    const task = this.storage.upload(randomId, this.file);
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // Client-side validation example
    if (this.file.type.split('/')[0] !== 'image') { 
        alert('wrong type')
        return;
      }

    this.add.value['image'] = randomId;    

    this.downloadURL = task.downloadURL();

    this.downloadURL.subscribe(url=>{
        if(url){
            this.add.value['fileUrl'] = url;
            this.addToDb();
        }
     })

    this.uploadState = task.snapshotChanges()
      .pipe(
        map(s => s.state)
      );

    this.uploadPercent = task.snapshotChanges()
      .pipe(
        map(s => {
          return s.bytesTransferred / s.totalBytes * 100
        })
      );

    this.uploadURL = task.snapshotChanges()
      .pipe(
        filter(s => s.bytesTransferred === s.totalBytes),
        map(s => s.downloadURL),
        tap(console.log)
      )

    
  }

  public getProduct():void {

  }

  ngOnInit() {
    let self = this;
    this.products$ = this.ps.getProducts()
    // to get the key use snapshot otherwise .valueChanges(['child_added'])
    .snapshotChanges()
    .map(changes => {
        return changes.map(c => {        
            return ({ $key: c.payload.key, ...c.payload.val() });
            
        });
      });
  
   }

}
