import { Component, OnInit, TemplateRef } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Catalog } from './Catalog';
import { Router } from '@angular/router';
import { FormInsertComponent } from './formInsert.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs = [];
  statusCode: number;
  requestProcessing = false;
  IdCatalogToUpdate = null;
  processValidation = false;
  title = "Data Catalog";
  collection = [];
  modalref: BsModalRef;

  //paging
  p: number = 1;

  //form catalog
  catalForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })


  preProcessConfiguration(){
    this.statusCode = null;
    this.requestProcessing = true;
  }

  constructor(private modalservice: BsModalService, private catalogservices: CatalogService, private router: Router){
    //paging
    for (let i = 1; i<=100; i++){
      this.catalogs.push();
    }
  }

  //open for modal add catalog
  openModal(template: TemplateRef<any>, catalog: Catalog){
      this.modalref = this.modalservice.show(template);
      this.IdCatalogToUpdate = null;
      this.catalForm.reset();
  }

  //open for modal edit catalog
  openEdit(template: TemplateRef<any>){
      this.modalref = this.modalservice.show(template);
  }

  ngOnInit():void {
    this.findAllCatalogs()
  }

  findAllCatalogs(){
    this.catalogservices.getServicesListCatalog()
    .subscribe(data => this.catalogs = data,
    errorCode => this.statusCode = errorCode);
  }

  /*
  findOneCatalogById(idcatalog:string, template: TemplateRef<any>){
    this.preProcessConfiguration();
    this.catalogservices.getServicesGetCatalog(idcatalog)
    .subscribe(catalog => {
      this.IdCatalogToUpdate = catalog.idcatalog;
      this.catalForm.setValue({name : catalog.name});
      this.processValidation = true;
      this.requestProcessing = false;
      this.modalref = this.modalservice.show(template);
    }, errorCode => this.statusCode = errorCode)
  }
  */

  findOneCatalogById(idcatalog:string, template: TemplateRef<any>){
    this.catalogservices.getServicesGetCatalog(idcatalog)
    .subscribe(catalog => {
      this.IdCatalogToUpdate = catalog.idcatalog;
      this.catalForm.setValue({name: catalog.name});
      this.processValidation = true;
      this.requestProcessing = false;
    }, errorCode => this.statusCode = errorCode)
  }
  
}
