import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from './category.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Category } from './Category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title = "Data Category";
  categorys = [];
  statusCode: number;
  requestProcessing = false;
  IdCategoryToUpdate = null;
  processValidation = false;
  modalref: BsModalRef;

  p: number =1;

  constructor(private categoryService: CategoryService, private modalService:BsModalService){
    for(let i=0; i<=100; i++){
        this.categorys.push();
    }
  }

  ngOnInit():void {
    this.getListComponentCategory()
  }

  //open modal template
  openModal(template: TemplateRef<any>){
      this.modalref = this.modalService.show(template);
      this.categoryForm.reset();
  }

  //field category
  categoryForm = new FormGroup({
        name : new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        active: new FormControl('', Validators.required)
  });

  //component konfig form angular form Validators
  preProcessConfigurations(){
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //component untuk mereset form setelah update maupun insert
  backToCreateCategory(){
    this.IdCategoryToUpdate = null;
    this.categoryForm.reset();
    this.processValidation = false;
  }

  //component menampilkan data
  getListComponentCategory(){
    this.categoryService.getAllCategory()
    .subscribe(data => this.categorys = data,
    errorCode => this.statusCode = errorCode);
  }

  //handling submit
  onHandlingSubmit(){
    this.processValidation = true;
    if(this.categoryForm.invalid){
      return;
    }
    this.preProcessConfigurations();
    let name = this.categoryForm.get('name').value.trim();
    let description = this.categoryForm.get('description').value.trim();
    let active = this.categoryForm.get('active').value;

    if(this.IdCategoryToUpdate === null){
      let category = new Category(null, name, description, active);
      this.categoryService.getInsertCategory(category)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListComponentCategory();
        this.modalref.hide();
        this.backToCreateCategory();
      }, errorCode => this.statusCode = errorCode);
    }else{
      let category = new Category(this.IdCategoryToUpdate, name, description, active);
      this.categoryService.getUpdateCategory(category)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListComponentCategory();
        this.modalref.hide();
        this.backToCreateCategory();
      }, errorCode => this.statusCode = errorCode);
    }
  }

  //delete
  getDeleteCategory(idcategory: string){
    if(confirm('are you sure ?')){
        this.categoryService.getDeleteCategory(idcategory)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getListComponentCategory();
          this.backToCreateCategory();
        }, errorCode => this.statusCode = errorCode);
    }
  }

  //edit
  getEditCategory(idcategory: string){
    this.preProcessConfigurations();
    this.categoryService.getFindOneId(idcategory)
    .subscribe(category => {
      this.IdCategoryToUpdate = category.idcategory;
      this.categoryForm.setValue({
          name: category.name,
          description: category.description,
          active: category.active
      });
      this.processValidation = true;
      this.requestProcessing = false;
    }, errorCode => this.statusCode = errorCode);
  }

}
