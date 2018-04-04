import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  { 
    path: '',
    loadChildren: './home/index#HomeModule' },
  {
    path: 'products',
    loadChildren: './products/index#ProductModule' },

];
