import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
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

  p: number =1;

  constructor(private categoryService: CategoryService){
    for(let i=0; i<=100; i++){
        this.categorys.push();
    }
  }

  ngOnInit():void {
    this.getListComponentCategory()
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
    let active = this.categoryForm.get('active') == null;

    if(this.IdCategoryToUpdate === null){
      let category = new Category(null, name, description, active);
      this.categoryService.getInsertCategory(category)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListComponentCategory();
        this.backToCreateCategory();
      }, errorCode => this.statusCode = errorCode);
    }else{
      let category = new Category(this.IdCategoryToUpdate, name, description, active);
      this.categoryService.getUpdateCategory(category)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListComponentCategory();
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
