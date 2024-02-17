import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',

  standalone: true,

  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  templateUrl: './checkout.component.html',

  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        email: [''],
      }),
      ShippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      BillingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkFormGroup.controls['BillingAddress'].setValue(
        this.checkFormGroup.controls['ShippingAddress'].value
      );
    } else {
      this.checkFormGroup.controls['ShippingAddress'].reset();
    }
  }
  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkFormGroup.get('customer').value);
    console.log(
      'This email adress is: ' + this.checkFormGroup.get('customer').value.email
    );
  }
}
