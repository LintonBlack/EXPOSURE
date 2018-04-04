import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/index';

import { RouterModule } from '@angular/router';



// Components
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { ProductDetailsComponent } from './components/product-detail-page/product-details/product-details.component';
import { ProductDescriptionComponent } from './components/product-detail-page/product-description/product-description.component';
import { ProductImagesComponent } from './components/product-detail-page/product-images/product-images.component';
import { ProductPriceInfoComponent } from './components/product-detail-page/product-price-info/product-price-info.component';
import { ProductVariantsComponent } from './components/product-detail-page/product-variants/product-variants.component';
import { ProductComponent } from './product.component';


// Routes
import { ProductRoutes as routes } from './product.routes';



// Guards

// Services
import { ProductsService } from './services';

@NgModule({
  declarations: [
    // components
    ProductDetailPageComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductPriceInfoComponent,
    ProductDescriptionComponent,
    ProductVariantsComponent
    // pipes
  ],
  exports: [
    // components
    ProductDetailPageComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductPriceInfoComponent,
    ProductDescriptionComponent,
    ProductVariantsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductsService
  ]
})
export class ProductModule {}
