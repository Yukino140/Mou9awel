import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {
  private apiUrl = 'https://api.preprod.konnect.network/api/v2'; // Replace with the actual Konnect API base URL
  private apiKey = '658c0f3fe6f7f3f57583c4fe'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  // Initiate a payment
  initiatePayment(amount: number, currency: string, userId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      amount,
      currency,
      userId,
    };

    return this.http.post(`${this.apiUrl}/payments/init-payment`, body, { headers });
  }

  // Verify payment status
  verifyPayment(transactionId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.apiUrl}/payments/${transactionId}`, { headers });
  }
}
