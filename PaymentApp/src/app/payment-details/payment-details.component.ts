import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  constructor(public service: PaymentDetailService, public toast: ToastrService) {

  }
  ngOnInit(): void {
    this.service.refreshList()
  }

  populateForm(pd: PaymentDetail){
    this.service.form = Object.assign({}, pd)
  }

  onDelete(id: number){
    if(confirm("Are you sure you want to delete this record?")){
      this.service.deletePaymentDetail(id).subscribe({
        next: res => {
          this.service.paymentDetails = res as PaymentDetail[]
          this.toast.error("Deleted Successufly", "Payment Detail Delete")
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}
