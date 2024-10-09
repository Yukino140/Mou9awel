import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RevoirTestComponent } from '../revoir-test/revoir-test.component';
import { NgFor, NgIf } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TestServiceService } from '../../../Services/test-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { PayementService } from '../../../Services/payement.service';
import {  NgModel, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {QRCodeModule} from 'angularx-qrcode'
import { Test } from '../../../Models/test';

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [NgIf,HttpClientModule,NgFor,MatIcon,ReactiveFormsModule,QRCodeModule],
  providers : [TestServiceService,HttpClient,PayementService ],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
})
export class TakeTestComponent implements OnInit {

  @ViewChild('content', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
isSubmitted: any;
paymentForm: any;

  constructor(private resolver:ComponentFactoryResolver,private test1:TestServiceService,private router:Router,private paymentService: PayementService){}
  ngOnInit(): void {
   this.getData()
   this.getAllTests()
   
  }

   show3=false
   show2=true
   show1=true
  loadComponent() {
    
    this.show1=false

    setInterval(()=>{
      this.show2=false
      this.show3=true
    },1000)
    console.log("cleared")

    


   /* // Resolve the component factory
    const componentFactory = this.resolver.resolveComponentFactory(RevoirTestComponent);

    // Create the component and add it to the container
    this.container.createComponent(componentFactory);*/


    this.updateTimeDisplay(); // Initialize the minutes and seconds display

    // Emit value every second (1000 milliseconds)
    this.subscription = interval(1000).subscribe(() => {
      if (this.totalTimeLeft > 0) {
        this.totalTimeLeft--;
        this.updateTimeDisplay();
      } else {
        this.stopTimer();
      }
    });
  }
  totalTimeLeft: number = 1200;
    minutes: number = 0;
  seconds: number = 0;
  private subscription!: Subscription;

  updateTimeDisplay() {
    this.minutes = Math.floor(this.totalTimeLeft / 60);
    this.seconds = this.totalTimeLeft % 60;
  }

  stopTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  fillLevel: number = 100/30; // Initialize fill level (0% filled)
  de:boolean=false
  fillBar(s:boolean|null) {
    if (this.fillLevel < 100) {
      this.fillLevel += 100/30; // Increase fill level by 20%
      this.getNextElement(s)
    }
   
  }

  Question:any=[]
  Responce:any=[]
  QA:any=[]
  getData() {
    // Fetch all questions
    this.test1.getAllQuestions().subscribe(res => {
      this.Question = res;
  
      // Loop through each question and fetch its responses
      this.Question.forEach((q: any) => {
        this.QA.push(q); // Assuming QA is a Set or some collection
  
        // Fetch responses for each question and add to the question object
        
      });
      console.log(this.QA)
      /*this.currentItem=this.QA[0]
      this.test.getResponsesOFQuestion(1).subscribe(response => {
        this.currentA=response
      });*/
      this.getNextElement(null)//needs more testing and algorithme callibration 
      console.log(this.currentA)
     
    
    });
  }

  currentIndex: number = -1; // To track the current element (-1 to start before the first element)
  currentItem: any = null;   // To store the current item
  currentA:any=[]
  answers:any=[]
  // Method to get the next element on button click
  testf:boolean=false
  dn:boolean=true
  getNextElement(s:boolean|null) {
    if(this.totalTimeLeft>0){
    if (this.currentIndex < this.QA.length - 1) {
      this.currentIndex++;
      this.currentItem = this.QA[this.currentIndex];
      this.getAnswers(this.currentIndex,s)
      this.test1.getResponsesOFQuestion(this.currentItem.id).subscribe(res=>{
        this.currentA=res
        console.log("HI"+this.currentA.name)
      })
      console.log("hello"+this.currentItem.name)
    } else {
      this.de=true
      this.dn=false
    }}else{
      alert("Le Temps du test est finis")
      this.router.navigate([this.router.url])
    .then(() => {
      window.location.reload();  
    });
    }
  }

  getAnswers(i:number,status:boolean|null){
    if(status!=null){
    this.answers.push({qn:i,qs:status})
    }else{
      this.answers.push({qn:i,qs:null})

    }
    console.log(this.answers)
  }

scoreT:number=0
  setAge(s:String){
    
  }
  
  payement:boolean=false

  step1:boolean=false
  step2:boolean=true


  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    
    return result;
  }

  next(){
    if (this.credentials.valid) {
      // Si le formulaire est valide, procéder à l'étape suivante
      console.log('Form is valid:', this.credentials.value);
      this.step1=true
    this.step2=false
    const baseIQL = 68;
console.log(this.answers);
console.log(this.totalTimeLeft);

let point = 0;
this.scoreT = 0; // Initialize scoreT if not already done

// Calculate score based on answers
this.answers.forEach((a: any) => {
  if (a.qs === true) { // Use strict equality for comparison
    this.scoreT += 2; // Increment score by 2
    point += 2; // Increment point by 2
  }
});

// Add base IQL score if needed
this.scoreT += baseIQL;

// Assuming 's' is defined somewhere in your code, it should be passed or available
/*if (s === '6-14' || s === '60-90') {
  this.scoreT += 10;
}*/

// Calculate additional points based on time taken
const seconds = 1200 - this.totalTimeLeft; // Assuming totalTimeLeft is in seconds
let secondPoints = 0;

if (seconds > 15) {
  secondPoints = Math.round(seconds / 15); // Points for time taken
}

const maxP = this.answers.length * 2 - 2; // Maximum possible points (assuming 2 points per correct answer)
const allTestCorrect = this.answers.length * 2; // Total points possible

// Add time-based points if conditions are met
if (point >= maxP) {
  this.scoreT += secondPoints;
}

// Add bonus points if all answers are correct
if (point >= allTestCorrect) {
  this.scoreT += 20;
}

    console.log(this.scoreT)
    if(this.scoreT<90){
      this.class="Faible"
    }else if((this.scoreT>90)&&(this.scoreT<109)){
      this.class="Moyenne"
    }else if((this.scoreT>110)&&(this.scoreT<119)){
      this.class="Moyen élevé"
    }else if((this.scoreT>120)&&(this.scoreT<129)){
      this.class="Supérieur"
    }else if((this.scoreT>130)&&(this.scoreT<140)){
      this.class="Surdoué"
    }
    //this.resultat=true
    this.resultat=true
    this.idTest=this.generateRandomString(10)
    this.t=new Test(this.idTest,this.credentials.get('nom')?.value,this.credentials.get('email')?.value,this.credentials.get('genre')?.value,this.credentials.get('annee')?.value,this.scoreT)
    this.test1.newTest(this.t).subscribe(()=>{
      console.log("test Registered")
      console.log("Mail sent")

    })
  
    } else {
      // Si non valide, afficher un message ou empêcher l'étape suivante
      console.log('Form is invalid');
    }
    
  }
  idTest!:string
  t!:Test
  previous(){
    this.step1=false
    this.step2=true
  }




  amount!: number;
  currency: string = 'TND';
  userId: number = 1; // Replace with actual user ID
  transactionId!: string;
  paymentStatus!: string;



  /*initiatePayment(): void {
    this.paymentService.initiatePayment(this.amount, this.currency, this.userId)
      .subscribe(response => {
        this.transactionId = response.transactionId;
        this.paymentStatus = 'Payment initiated. Transaction ID: ' + this.transactionId;
      }, error => {
        console.error('Error initiating payment:', error);
        this.paymentStatus = 'Payment initiation failed.';
      });
  }

  verifyPayment(): void {
    this.paymentService.verifyPayment(this.transactionId)
      .subscribe(response => {
        this.paymentStatus = 'Payment status: ' + response.status;
      }, error => {
        console.error('Error verifying payment:', error);
        this.paymentStatus = 'Payment verification failed.';
      });
  }
  payements:Boolean=true
  payer(){
    this.payements=false
  }*/

    credentials: FormGroup = new FormGroup({
      'nom': new FormControl('', Validators.required),
     
      'email': new FormControl('', [Validators.required, Validators.email]),
      'genre': new FormControl('', Validators.required),
      'annee': new FormControl('', Validators.required)
    });
    class!:String
    resultat:boolean=false
    
    getResult(){
     
    this.step2=true
    
    this.show1=false
    this.show2=false
    this.show3=false
    
    }
Best10Tests:any=[]
num:any=[]
    getAllTests(){
      this.test1.getAllTests().subscribe(res=>{
        this.Best10Tests=res
    })
  }

  initPayement(){
    this.paymentService.initiatePayment(15,"TND",25413).subscribe(res=>{
      console.log("Success")
    })
  }
}
