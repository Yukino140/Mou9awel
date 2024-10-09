import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestServiceService } from '../../../Services/test-service.service';
import { Reponce } from '../../../Models/reponce';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-responce',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  providers : [TestServiceService,HttpClient],  
  templateUrl: './add-responce.component.html',
  styleUrl: './add-responce.component.css'
})
export class AddResponceComponent implements OnInit {

  constructor(private testService:TestServiceService,private router:ActivatedRoute,private route:Router){}
  id!:number
  ngOnInit(): void {
    this.router.params.subscribe((params: { [x: string]: string | number; }) => {
      this.id = +params['id']; // Get the user ID from the route parameters
      console.log(this.id);
    });
  }


  rep:FormGroup=new FormGroup({
    'rep1':new FormControl('',Validators.required),
    'rep2':new FormControl('',Validators.required),
    'rep3':new FormControl('',Validators.required),
    'rep4':new FormControl('',Validators.required),
    'rep5':new FormControl('',Validators.required),
    'rep6':new FormControl('',Validators.required),
  })


im:any=[]
  uploadReponse(){
    const p1=this.rep.get('rep1')?.value.slice(12,this.rep.get('rep1')?.value.length);
    const p2=this.rep.get('rep2')?.value.slice(12,this.rep.get('rep2')?.value.length);
    const p3=this.rep.get('rep3')?.value.slice(12,this.rep.get('rep3')?.value.length);
    const p4=this.rep.get('rep4')?.value.slice(12,this.rep.get('rep4')?.value.length);
    const p5=this.rep.get('rep5')?.value.slice(12,this.rep.get('rep5')?.value.length);
    const p6=this.rep.get('rep6')?.value.slice(12,this.rep.get('rep6')?.value.length);
      this.testService.addResponse(new Reponce(this.id,p1,p1,true)).subscribe()
      this.testService.addResponse(new Reponce(this.id,p2,p2,false)).subscribe()
      this.testService.addResponse(new Reponce(this.id,p3,p3,false)).subscribe()
      this.testService.addResponse(new Reponce(this.id,p4,p4,false)).subscribe()
      this.testService.addResponse(new Reponce(this.id,p5,p5,false)).subscribe()
      this.testService.addResponse(new Reponce(this.id,p6,p6,false)).subscribe()
      this.testService.getOneQuestion(this.id).subscribe(res=>{
        this.im=res
        this.im[0].hasResponce=true
        console.log(this.im[0].hasResponce)
        this.testService.updateQuestion(this.id,this.im[0]).subscribe()
        //this.route.navigate(["/Dashboard/reports"])
      })
      

  }
}
