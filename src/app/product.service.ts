import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(obj) {
    const uri = 'http://localhost:4000/Product/add';
    return this.http.post(uri, obj).map(res => {return res;});
  }

  getProduct(){
    const uri = 'http://localhost:4000/Product/view';
    return this.http.post(uri,{}).map(res => {return res;});
  }

  updateProduct(obj){
    const uri = 'http://localhost:4000/Product/update';
    return this.http.post(uri,obj).map(res => {return res;});
  }

  deleteProduct(id){
    const uri = 'http://localhost:4000/Product/delete';
    return this.http.post(uri,{id:id}).map(res => {return res;});
  }

  updateImage(id,publicid,arr){
    const uri = 'http://localhost:4000/Product/imageupdate';
    return this.http.post(uri,{id:id,publicid:publicid,toUpload:arr}).map(res => {return res;});
  }

}
