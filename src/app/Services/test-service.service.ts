import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../Models/image';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponce } from '../Models/reponce';
import { Test } from '../Models/test';

const URL = 'http://localhost:3001'

@Injectable({
  providedIn: 'root',
  
})
export class TestServiceService {

  
  constructor(private httpClient:HttpClient) {
    
   }

  addImage(im:Image){
    return this.httpClient.post(URL+'/image/nouveauImage',im);
  }

  getAllQuestions(){
    return this.httpClient.get(URL+'/image/getAll')
  }

  getImage(imageId: number): Observable<{ imageData: string }> {
    return this.httpClient.get<{ imageData: string }>( `${URL}/image/getOne/?id=${imageId}`);
  }

  addResponse(rep:Reponce){
    return this.httpClient.post(URL+'/reponse/nouveauImage',rep)

  }

  deleteQuestion(id:number){
    return this.httpClient.delete( `${URL}/image/delete/?id=${id}`)
  }

  getResponsesOFQuestion(idq:number){
    return this.httpClient.get( `${URL}/reponse/${idq}`)

  }

  updateQuestion(id:number,im:Image){
    return this.httpClient.put(`${URL}/image/${id}`,im)
  }

  getOneQuestion(id:number){
    return this.httpClient.get(`${URL}/image/getOne/${id}`)
  }

  newTest(t:Test){
    return this.httpClient.post(URL+'/test/register',t)
  }

  getAllResponscesofOneQuestion(id:number){
    return this.httpClient.get(`${URL}/reponse/${id}`)

  }

  generateResultPage(idTest:String){
    return this.httpClient.get(`${URL}/test/generate/${idTest}`)

  }
  
  getAllTests(){
    return this.httpClient.get(URL+'/test/getAll')
  }

  revoirTest(idTest:number,email:string){
    return this.httpClient.post(URL+'/test/RevoirTest',{idTest,email})

  }

}
