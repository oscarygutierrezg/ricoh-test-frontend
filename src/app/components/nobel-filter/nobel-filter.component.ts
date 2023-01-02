import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Category } from 'src/app/model/enum/category';
import {MatDatepicker} from '@angular/material/datepicker';
import { NobelPrizeRequest } from 'src/app/model/nobel-prize-request';
import { datePickerValidatorFrom, datePickerValidatorRange } from 'src/app/validators/datepicker-validator';


@Component({
  selector: 'app-nobel-filter',
  templateUrl: './nobel-filter.component.html',
  styleUrls: ['./nobel-filter.component.css']
})
export class NobelFilterComponent  {

  @Output() enviarRequest = new EventEmitter<NobelPrizeRequest>();
  dateFrom: FormControl = new FormControl(moment(), Validators.required);
  dateTo: FormControl = new FormControl(moment(), Validators.required);
  category: FormControl = new FormControl('', Validators.required);
  filterForm: FormGroup = this.setFormControl();
  selectedCategory: any;
  currentYear = new Date().getFullYear();
  keys = Object.keys;
  categories = Category;

  constructor(
    private formBuilder: FormBuilder){
  }


  get f(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }

  setFormControl(): FormGroup {
   return this.formBuilder.group({
        category: this.category,
        dateFrom:  this.dateFrom,
        dateTo:  this.dateTo
    });
  }

  chosenYearFromHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.dateFrom.setErrors(null);
    this.dateTo.setErrors(null);
    this.dateFrom.addValidators(datePickerValidatorFrom(this.dateTo.value));
    this.dateFrom.addValidators(datePickerValidatorRange(this.dateTo.value));
  
    let ctrlValue = this.dateFrom.value;
    if(ctrlValue != null){
      this.setYear(ctrlValue, this.dateFrom, normalizedYear);
    } else {
      this.dateFrom = new FormControl(moment(), Validators.required);
      ctrlValue = this.dateFrom.value;
      if(ctrlValue != null){
        this.setYear(ctrlValue, this.dateFrom, normalizedYear);
      }
    }
    datepicker.close();
  }

  chosenYearToHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.dateFrom.setErrors(null);
    this.dateTo.setErrors(null);
    this.dateTo.addValidators(datePickerValidatorRange(this.dateFrom.value));
    let ctrlValue = this.dateTo.value;
    if(ctrlValue != null){
      this.setYear(ctrlValue, this.dateTo, normalizedYear);
    } else {
      this.dateTo = new FormControl(moment(), Validators.required);
      this.filterForm.addControl('dateTo',  this.dateTo );
      ctrlValue = this.dateTo.value;
      if(ctrlValue != null){
        this.setYear(ctrlValue, this.dateTo, normalizedYear);
      }
    }
    datepicker.close();
  }

  getName(cat: any): string{
    const indexOfS = Object.keys(Category).indexOf(cat as unknown as Category);
    return Object.values(Category)[indexOfS];
  }

  onKeydown(event: any) {
      console.log(event);
    
  }

  setYear(ctrlValue: any, dateForm: FormControl<Moment>, normalizedYear: Moment) {
    ctrlValue.year(normalizedYear.year());
    dateForm.setValue(ctrlValue);
  }

  onSubmit(){
    const request = new NobelPrizeRequest;
    const ctrlValueFrom = this.filterForm.get('dateFrom');
    const ctrlValueTo = this.filterForm.get('dateTo');
    request.category=`${this.selectedCategory}`
    if(ctrlValueFrom!=null)
      request.yearFrom=ctrlValueFrom.value.format('YYYY')
    if(ctrlValueTo!=null)
      request.yearTo=ctrlValueTo.value.format('YYYY')
    this.enviarRequest.emit(request);
  }
}


