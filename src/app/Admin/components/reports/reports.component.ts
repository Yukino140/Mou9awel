import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TestServiceService } from '../../../Services/test-service.service';
import { Image } from '../../../Models/image';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Route, Router } from '@angular/router';
import { Reponce } from '../../../Models/reponce';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatIcon,ReactiveFormsModule,HttpClientModule,NgFor,NgIf,NgTemplateOutlet],
  providers : [TestServiceService,HttpClient],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
open(id:number) {

  
//  this.dialog.open(this.addReponse);
this.router.navigate(['/Dashboard/newReponces',id])

}

  @ViewChild('addQuestion') addQuestion!: TemplateRef<any>;
  @ViewChild('addReponse') addReponse!: TemplateRef<any>;
  @ViewChild('infoQuestion') infoQuestion!: TemplateRef<any>

  constructor(private dialog:MatDialog,private testService:TestServiceService,private router:Router ){}
  ngOnInit(): void {
    this.fetchAllImages()
  }
  
  file:FormGroup=new FormGroup({
    'image':new FormControl('',Validators.required),
    'description' :new FormControl('',Validators.required)
  });

  

  add(){

  }

  openInfo(){
    this.dialog.open(this.addQuestion);
    
  }
  pathname!: String;

  get image(){
    return this.file.get('image')?.value
  }
  get description(){
    return this.file.get('description')?.value
  }
des:boolean=false
ima:boolean=false

  upload() {
    if(this.file.valid){
    this.pathname=this.file.get('image')?.value
    const p=this.pathname.slice(12,this.pathname.length);
    console.log(this.file.get('description')?.value)
  
   this.testService.addImage(new Image(p,p,this.file.get('description')?.value)).subscribe(response=>{
      console.log(response)
      this.router.navigate(['/reports'])
    })
   
  }else{
    this.des=true
    this.ima=true
  }
    }
    questions:any=[]

    fetchAllImages(): void {
      this.testService.getAllQuestions().subscribe(
        (data) => {
          this.questions=data
          console.log(data)
         
        },
        error => {
          console.error('Error fetching images:', error);
        }
      );
    
    }
    im!:any
     
   
    AAOOQ:any=[]
    openI(id:number){
      this.dialog.open(this.infoQuestion)
      this.testService.getAllResponscesofOneQuestion(id).subscribe((res)=>{
        this.AAOOQ=res
      })
     
    }


    selectedQuestion: number | null = null;

    onClose(){
      this.dialog.closeAll()
    }
}
