import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { SharedModule } from './../shared';

// Components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// Routes
import { HomeRoutes as routes } from './home.routes';

// Services
import { ProductsService } from './../products/services';


@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    TagInputModule,
    RouterModule.forChild(routes),

  ],
  providers: [
    ProductsService
  ]
})
export class HomeModule {}
