import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {

  productObj = {
    name: '',
    price: 1,
    serving: 1,
    stock:10,
    description: '',
    images: []
  };

  reinitialiseObject(){
    this.productObj = {
      name: '',
      price: 1,
      serving: 1,
      stock:10,
      description: '',
      images: []
    };
  }

  processing:Boolean = false;

  constructor(private productservice: ProductService) { }

  openFileChooser() {
    document.getElementById('filechooser').click();
  }

  onchange($event){
    for(var i=0;i<$event.target.files.length;i++){
      this.readThis($event.target.files[i]);
    }
  }

  readThis(inputValue: any): void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.productObj.images.push(myReader.result);
    }
    myReader.readAsDataURL(file);
  }


  SaveProduct(){
    this.processing = true;
    if(this.productObj.name === "" || this.productObj.price < 1 || this.productObj.price == null || this.productObj.serving < 1 ||
    this.productObj.serving == null || this.productObj.description === "" || this.productObj.images.length == 0)
    {alert("Incomplete Form");this.processing = false;}
    else{
      this.productservice.addProduct(this.productObj).subscribe(res => {
        this.processing = false;
        console.log(res);
        alert("Added!")
        this.reinitialiseObject();
      });
    } 
  }

  ngOnInit() {
  }

}
