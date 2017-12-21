import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Catalog } from './Catalog';



@Injectable()
export class CatalogService {

  //java api backend catalog
  URI_LIST_CATALOG = "http://localhost:8080/data/api/catalogs";
  URI_INSERT_CATALOG = "http://localhost:8080/data/api/insertCatalog";
  URI_GET_BYID = "http://localhost:8080/data/api/catalogs/";
  URI_UPDATE_CATALOG = "http://localhost:8080/data/api/updateCatalog";

  constructor(
    private http:Http
  ){}

  //extract data json
  getExtractDataJSON(responses: Response){
    let body = responses.json();
    return body;
  }

  //handling error
  getHandlingError(error: Response | any){
      console.error(error.message || error);
      return Observable.throw(error.status);
  }

  //services list catalogs
  getServicesListCatalog():Observable<Catalog[]>{
    return this.http.get(this.URI_LIST_CATALOG)
    .map(this.getExtractDataJSON);
  }

  //services process byid catalog
  getServicesGetCatalog(idcatalog: string):Observable<Catalog>{
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('idcatalog', idcatalog);
    let options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.URI_GET_BYID + idcatalog, options)
    .map(this.getExtractDataJSON).catch(this.getHandlingError);
  }

  //services insert catalogs
  getServicesPostCatalog(catalog: Catalog):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: cpHeaders});
      return this.http.post(this.URI_INSERT_CATALOG, catalog, options)
      .map(success => success.status).catch(this.getHandlingError);
  }

  getServicesPostForUpdateCatalog(catalog: Catalog):Observable<number>{
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.URI_UPDATE_CATALOG, catalog, options)
    .map(successCode => successCode.status).catch(this.getHandlingError);
  }

}
