import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { FormInsertComponent } from './catalog/formInsert.component';

export const router: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full'},
    { path: 'category', component: CategoryComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'catalog/insertcatalog', component: FormInsertComponent },
    { path: 'product', component: ProductComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
