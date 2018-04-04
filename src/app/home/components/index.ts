import { HomeComponent } from './../home.component';
import { HeroComponent } from './hero/hero.component';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ProductListComponent } from './../../products/components/product-list/product-list.component';
import { ProductListItemComponent } from './../../products/components/product-list/product-list-item/product-list-item.component';


export const components: any[] = [
    HomeComponent,
    HeroComponent,
    ProgressBarComponent,
    ProductListComponent,
    ProductListItemComponent
];

export * from './../home.component';
export * from './hero/hero.component';
export * from './progress-bar/progress-bar';
export * from './../../products/components/product-list/product-list.component';
export * from  './../../products/components/product-list/product-list-item/product-list-item.component';