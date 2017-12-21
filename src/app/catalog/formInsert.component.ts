import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogService } from './catalog.service';
import { Catalog } from './Catalog';

@Component({
  selector: 'form-insert-catalog',
  templateUrl: './catalogInsert.component.html'
})
export class FormInsertComponent implements OnInit{

  ngOnInit():void{}

  constructor(private catservices: CatalogService){}

  titleForm = "Form Insert Catalog";
  requestProcessing =false;
  IdCatalogToUpdate = null;
  statusCode: number;
  processValidation = false;

  catalogForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  preProcessConfigurations(){
      this.statusCode = null;
      this.requestProcessing = true;
  }

  getLoadById(idcatalog: string){
    this.preProcessConfigurations()
    this.catservices.getServicesGetCatalog(idcatalog)
    .subscribe( catalog => {
      this.IdCatalogToUpdate = catalog.idcatalog;
      this.catalogForm.setValue({name: catalog.name});
      this.processValidation = true;
      this.requestProcessing = false;
    }, errorCode => this.statusCode = errorCode)
  }

  onSubmitedCatalog(){
    this.processValidation = true;
    if(this.catalogForm.invalid){
       return;
    }
    this.preProcessConfigurations();
    let name = this.catalogForm.get('name').value.trim();
    if(this.IdCatalogToUpdate === null){
      let catalog = new Catalog(null, name);
      this.catservices.getServicesPostCatalog(catalog)
      .subscribe(successCode => {
        this.statusCode = successCode;
        window.location.href = "/catalog";
      }, errorCode => this.statusCode = errorCode);
    }
  }

}
