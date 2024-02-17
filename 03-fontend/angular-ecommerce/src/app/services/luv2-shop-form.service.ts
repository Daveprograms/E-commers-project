import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  constructor() {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    //build an array of "Month" dropdown list
    //- start at current month and loop until 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYear(): Observable<Number[]> {
    let data: number[] = [];
    //build an array of "Year" dropdown list
    //- start at current year and loop until 2030

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
