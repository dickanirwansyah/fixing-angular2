import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { CategoryService } from './category/category.service';
import { CatalogService } from './catalog/catalog.service';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FormInsertComponent } from './catalog/formInsert.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    CatalogComponent,
    FormInsertComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routes,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxPaginationModule
  ],
  providers: [
    CategoryService,
    CatalogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
