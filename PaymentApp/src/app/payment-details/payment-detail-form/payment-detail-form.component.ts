import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
  constructor(public service: PaymentDetailService, public toast: ToastrService) {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if(form.valid){
      if(this.service.form.paymentDetailId == 0) this.insertRecord(form)
      else this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: res => {
        console.log(res)
        this.service.paymentDetails = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toast.success("Inserted successefully", "Payment Detail Register")
      },
      error: err => {
        console.log(err)
      }
    })
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: res => {
        console.log(res)
        this.service.paymentDetails = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toast.info("Updated successefully", "Payment Detail Update")
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
