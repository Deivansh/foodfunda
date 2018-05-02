import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  Products;
  processing:Boolean = false;
  processing2:Boolean = false;

  imageArr = [];

  constructor(private productservice: ProductService) { }

  openFileChooser() {
    document.getElementById('filechooser').click();
  }

  onchange($event){
    this.imageArr = [];
    for(var i=0;i<$event.target.files.length;i++){
      this.readThis($event.target.files[i]);
    }
  }

  readThis(inputValue: any): void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.imageArr.push(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

  UpdateImage(id,publicid){
    this.processing2 = true;
    this.productservice.updateImage(id,publicid,this.imageArr).subscribe(res => {
      console.log(res);
      this.processing2 = false;
      this.GetProduct();
    })
  }

  UpdateProduct(obj){
    this.processing2 = true;
    this.productservice.updateProduct(obj).subscribe(res => {
      console.log(res);
      this.processing2 = false;
      if(res != "Error")
      alert("Done");
    })
  }

  DeleteProduct(id){
    this.processing2 = true;
    this.productservice.deleteProduct(id).subscribe(res => {
      console.log(res);
      this.processing2 = false;
      this.GetProduct();
      if(res != "Error")
      alert("Done!");
    })
  }

  emptyImageArr(){
    this.imageArr = [];
  }

  GetProduct(){
    this.processing = true;
    this.imageArr = [];
    this.productservice.getProduct().subscribe(res=>{
      console.log(res);
      this.Products = res;
      this.processing = false;
    })
  }

  ngOnInit() {
    this.GetProduct();
  }

}
