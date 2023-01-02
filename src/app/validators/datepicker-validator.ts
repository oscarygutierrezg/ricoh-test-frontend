import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

export function datePickerValidatorFrom(momentTo: Moment): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;
    if (control.value) {
      const moment: Moment = control.value;
      if (moment.year() < momentTo.year() ) {
        forbidden = false;
      }
    }
    return forbidden ? { 'invalidFromMajor': true } : null;
  };
} 

export function datePickerValidatorRange(momentFrom: Moment): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        const moment: Moment = control.value;
        console.log('momentFrom',momentFrom,'moment', moment,  Math.abs(momentFrom.year() - moment.year()));
        if ( Math.abs(momentFrom.year() - moment.year())<= 15 ) {
          forbidden = false;
        }
      }
      return forbidden ? { 'invalidRange': true } : null;
    };
  } 