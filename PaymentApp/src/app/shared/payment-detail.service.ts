import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from '../../environments/environment';
import { PaymentDetail } from './payment-detail.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  paymentDetails: PaymentDetail[] = []
  form: PaymentDetail = new PaymentDetail()
  url:string = environment.apiBaseUrl
  formSubmitted: boolean = false
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(`${this.url}/PaymentDetail`)
    .subscribe({
      next: res => {
        console.log(res)
        this.paymentDetails = res as PaymentDetail[]
      },
      error: err => {
        console.log(err)
      }
    })
  }

  postPaymentDetail() : Observable<any>{
    return this.http.post(`${this.url}/PaymentDetail`, this.form);
  }

  putPaymentDetail() : Observable<any>{
    return this.http.put(`${this.url}/PaymentDetail/${this.form.paymentDetailId}`, this.form);
  }

  deletePaymentDetail(id: number) : Observable<any>{
    return this.http.delete(`${this.url}/PaymentDetail/${id}`);
  }
  resetForm(form: NgForm) {
    form.form.reset()
    this.form = new PaymentDetail()
    this.formSubmitted = false
  }
}
