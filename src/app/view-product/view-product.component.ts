import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  Products;
  processing:Boolean = false;

  constructor(private productservice: ProductService) { }

  GetProduct(){
    this.processing = true;
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
