import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public dialog: MatDialog){}

  openLogin(){
   let loginDialog = this.dialog.open(LoginComponent,{
     width:'600px'
   })
  }

}
