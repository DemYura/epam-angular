import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'course-date',
  template: '<input (change)="setValue($event)" [disabled]="disabled" [(ngModel)]="dateString"/>',
  providers: [
    DatePipe, {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateControl),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDateControl),
      multi: true
    }
  ]
})
export class CourseDateControl implements ControlValueAccessor, Validator {
  private DATE_REGEXP =  /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  public dateString = '';
  @Input() public dateMs = 0;
  @Input('dateFormat') public dateFormat = 'mm/dd/yyy';
  public disabled: boolean;
  private onChange = (value: any) => {};

  constructor(private datePipe: DatePipe) {
  }

  validate(control: FormControl) {
    return this.DATE_REGEXP.test(this.dateString) ? null : {
      dateFormatValidation: {
        valid: false
      }
    };
  }

  setValue(item: DateInputEvent) {
    this.dateString = item.target.value;
    this.onChange(new Date(item.target.value).getTime());
  }

  writeValue(value: any): void {
    if (value) {
      this.dateString = this.datePipe.transform(new Date(value), this.dateFormat);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}

interface DateInputEvent {
  target: {
    value: string
  }
}