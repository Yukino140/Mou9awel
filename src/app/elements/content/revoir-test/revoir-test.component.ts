import { Component } from '@angular/core';
import { TestServiceService } from '../../../Services/test-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import {QRCodeModule} from 'angularx-qrcode'


@Component({
  selector: 'app-revoir-test',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,HttpClientModule,QRCodeModule],
  providers : [TestServiceService,HttpClient],
  templateUrl: './revoir-test.component.html',
  styleUrl: './revoir-test.component.css'
})
export class RevoirTestComponent {

  constructor(private testService:TestServiceService){

  }

  result:FormGroup=new FormGroup({
    'idTest':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required)
  })

  get idTest(){
    return this.result.get('idTest')?.value
  }
  get email(){
    return this.result.get('email')?.value
  }
  rd:boolean=true
  html!:any
  generateResult() {
    // Start the spinner immediately
    this.showDialog = false;
  
    // Call your service (assuming this returns observable)
    this.testService.revoirTest(this.idTest, this.email).subscribe(res => {
      
      // After service completes, wait for 3 seconds to show the dialog
      setTimeout(() => {
        this.showDialog = true;  // After 3 seconds, show dialog
      }, 3000);  // 3 seconds delay
    });
  }
  
  showDialog: boolean = false;
}
