import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {
  private apiUrl = 'https://api.preprod.konnect.network/api/v2'; // Replace with the actual Konnect API base URL
  private apiKey = '6706af35cdc0e74e5ab444fb:knf398la0WiYzdsZdveEGqKjPiD';
  private apiKey2 = '6706b08e0d21eb0194727cad:4luM5dTVT0sXPMSEBu'

  constructor(private http: HttpClient) {}

  // Initiate a payment
  // initiatePayment(amount: number, currency: string, userId: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     // Authorization: `Bearer ${this.apiKey2}`,
  //     'Content-Type': 'application/json',
  //     "x-api-key" : this.apiKey2
  //   });

  //   const body = JSON.stringify(
  //     {
  //       "receiverWalletId": userId,
  //       "token": currency,
  //       "amount": amount,
  //       "type": "immediate",
  //       "description": "payment description",
  //       "acceptedPaymentMethods": [
  //         "wallet",
  //         "bank_card",
  //         "e-DINAR"
  //       ],
  //       "lifespan": 10,
  //       "checkoutForm": true,
  //       "addPaymentFeesToAmount": true,
  //       "firstName": "John",
  //       "lastName": "Doe",
  //       "phoneNumber": "22777777",
  //       "email": "john.doe@gmail.com",
  //       "orderId": "1234657",
  //       "webhook": "https://merchant.tech/api/notification_payment",
  //       "silentWebhook": true,
  //       "successUrl": "https://gateway.sandbox.konnect.network/payment-success",
  //       "failUrl": "https://gateway.sandbox.konnect.network/payment-failure",
  //       "theme": "light"
      
  //   })

  //   // const body = {
  //   //   amount,
  //   //   currency,
  //   //   userId,
  //   // };

  //   return this.http.post(`${this.apiUrl}/payments/init-payment`, body, {
  //     headers : headers
  //   });
  // }

  initPayment(amount: number, currency: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey2,
      'Content-Type': 'application/json'
    });

    const body = {
      receiverWalletId: userId,
      token: currency,
      amount: amount,
      type: "immediate",
      description: "payment description",
      acceptedPaymentMethods: [
        "wallet",
        "bank_card",
        "e-DINAR"
      ],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: true,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "22777777",
      email: "john.doe@gmail.com",
      orderId: "1234657",
      webhook: "https://merchant.tech/api/notification_payment",
      silentWebhook: true,
      successUrl: "https://gateway.sandbox.konnect.network/payment-success",
      failUrl: "https://gateway.sandbox.konnect.network/payment-failure",
      theme: "light"
    };

    console.log('Request body:', JSON.stringify(body, null, 2));

    return this.http.post<any>(this.apiUrl+"/payments/init-payment", body, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error details:', error);
        return throwError(() => new Error(`Error: ${error.message}`));
      })
    );

    // return this.http.post<any>(this.apiUrl+"/payments/init-payment", body, { headers });
  }

  // Verify payment status
  verifyPayment(transactionId: string): Observable<any> {
   

    const body = {
      payment: {
          id: "6706e72b0d21eb019472b963",
          receiverWallet: {
              id: "6706b08e0d21eb0194727cb3",
              owner: {
                  name: "konnect",
                  phoneNumber: "+21652613031",
                  email: "konnect.sandbox@gmail.com",
                  imageURL: "https://sandbox.amazonaws.com/com.tledger.digicash/1638806088198",
                  owner: {
                      email: "Jack@gmail.com",
                      firstName: "Jack",
                      lastName: "Sparrow",
                      phoneNumber: "+2165261303"
                  }
              },
              participants: [
                  "6138cfb9f734a8544049f5ba",
                  "6138cfb9f734a85440495872"
              ],
              type: "Organisation",
              name: "Jack",
              phoneNumber: "+21652613031"
          },
          transactions: [
              {
                  _id: "61387bf70c181c5eb44a7fce",
                  receiverWallet: {
                      id: "5ca4c597cb3c15311bdbd6a7",
                      participants: [
                          "6138cfb9f734a8544049f5ba",
                          "6138cfb9f734a85440495872"
                      ],
                      type: "user",
                      name: "Jack",
                      phoneNumber: "+21652613031"
                  },
                  senderWallet: {
                      id: "5ca4c597cb3c15311bdbd6b1",
                      participants: [],
                      type: "user",
                      name: "Sparrow",
                      phoneNumber: "+21652613033"
                  },
                  token: "TND",
                  amount: 1000,
                  type: "ePayment",
                  status: "success",
                  payment: "613878a7b6cac342ac8f9583",
                  method: "bank_card",
                  extSenderInfo: {}
              }
          ],
          amountDue: 2000,
          reachedAmount: 1000,
          amount: 1000,
          token: "TND",
          convertedAmount: 15000,
          exchangeRate: 1,
          expirationDate: "2020-10-15",
          shortId: "-PJfSz90m",
          link: "https://api.dev.konnect.network/WSlQUtBF8",
          webhook: "merchant.tech/api/notification_payment",
          successUrl: "https://dev.konnect.network/gateway/payment-success",
          failUrl: "https://dev.konnect.network/gateway/payment-failure",
          orderId: "123456",
          type: "immediate",
          status: "pending",
          details: "t-shirts payments",
          acceptedPaymentMethods: [
              "wallet",
              "bank_card",
              "bank_card",
              "e-DINAR",
              "flouci"
          ]
      }
  };
  
    return this.http.get(`${this.apiUrl}/payments/${transactionId}`);
  }
}
