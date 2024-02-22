import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = []; // Corrected 'CreditCardMonths' to 'creditCardMonths' for naming consistency

  countries: Country[] = [];
  ShippingAddressStates: State[] = [];
  BillingAddressStates: State[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      ShippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      BillingAddress: this.formBuilder.group({
        // Changed 'BillingAddress' to 'billingAddress' for naming consistency
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

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('StartMonth: ' + startMonth);
    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved Credit Card Month: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });
    //populate credit card years
    this.luv2ShopFormService.getCreditCardYear().subscribe((data) => {
      console.log('Retrieved Credit Card Year: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    //populate counrties

    this.luv2ShopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));

      this.countries = data;
    });
  }

  get firstname() {
    return this.checkFormGroup.get('customer.firstname');
  }
  get lastname() {
    return this.checkFormGroup.get('customer.lastname');
  }
  get email() {
    return this.checkFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkFormGroup.controls['BillingAddress'].setValue(
        this.checkFormGroup.controls['ShippingAddress'].value
        //bug fix for states
      );
      this.BillingAddressStates = this.ShippingAddressStates;
    } else {
      this.checkFormGroup.controls['BillingAddress'].reset();
      this.BillingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handling the submit button');

    if (this.checkFormGroup.invalid) {
      this.checkFormGroup.markAllAsTouched();
    }
    console.log(this.checkFormGroup.get('customer').value);
    console.log(
      'This email address is: ' +
        this.checkFormGroup.get('customer').value.email
    );

    console.log(
      'The Shipping address  country is: ' +
        this.checkFormGroup.get('ShippingAddress').value.country.name
    );

    console.log(
      'The Shipping address  country is: ' +
        this.checkFormGroup.get('ShippingAddress').value.country.name
    );
    console.log(
      'The Shipping address  state is: ' +
        this.checkFormGroup.get('ShippingAddress').value.state.name
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    //if the current year equals the selectedyear, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1; // Get current month if years match
    } else {
      startMonth = 1; // Start with January if years don't match
    }

    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved Credit Card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });
  }

  getStates(FormGroupName: string) {
    const formGroup = this.checkFormGroup.get(FormGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${FormGroupName} country code: ${countryCode}`);
    console.log(`${FormGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe((data) => {
      if (FormGroupName === 'ShippingAddress') {
        this.ShippingAddressStates = data;
      } else {
        this.BillingAddressStates = data;
      }
      formGroup.get('state').setValue(data[0]);
    });
  }
}
