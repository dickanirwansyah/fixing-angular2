import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './Category';

@Injectable()
export class CategoryService{

    URI_LIST = "http://localhost:8080/data/api/category";
    URI_INSERT = "http://localhost:8080/data/api/insertCategory";
    URI_UPDATE = "http://localhost:8080/data/api/updateCategory";
    URI_DELETE = "http://localhost:8080/data/api/deleteCategory/";
    URI_FIND = "http://localhost:8080/data/api/category/";

    constructor(private http:Http){}

    private getExtractDataJSON(responses: Response){
        let body = responses.json();
        return body;
    }

    private getHandlingError(error: Response | any){
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

    public getAllCategory():Observable<Category[]>{
      return this.http.get(this.URI_LIST)
      .map(this.getExtractDataJSON);
    }

    public getFindOneId(idcategory: string):Observable<Category>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let cpParams = new URLSearchParams();
      cpParams.set('idcategory', idcategory);
      let options = new RequestOptions({headers: cpHeaders, params:cpParams});
      return this.http.get(this.URI_FIND+idcategory, options)
      .map(this.getExtractDataJSON).catch(this.getHandlingError);
    }

    public getDeleteCategory(idcategory:string):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let cpParams = new URLSearchParams();
      cpParams.set('idcategory', idcategory);
      let options = new RequestOptions({headers: cpHeaders, params: cpParams});
      return this.http.delete(this.URI_DELETE+idcategory, options)
      .map(success => success.status).catch(this.getHandlingError);
    }

    public getInsertCategory(category: Category):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: cpHeaders});
      return this.http.post(this.URI_INSERT, category, options)
      .map(success => success.status)
      .catch(this.getHandlingError);
    }

    public getUpdateCategory(category: Category):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: cpHeaders});
      return this.http.put(this.URI_UPDATE, category, options)
      .map(success => success.status).catch(this.getHandlingError);
    }
}
