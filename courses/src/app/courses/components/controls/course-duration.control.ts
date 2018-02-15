import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'course-duration',
  template: '<input (change)="setValue($event)" [disabled]="disabled" [(ngModel)]="minutes"/>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CourseDurationControl),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CourseDurationControl),
    multi: true
  }]
})
export class CourseDurationControl implements ControlValueAccessor, Validator {
  @Input() public minutes = 0;
  public disabled: boolean;
  private onChange = (value: any) => {};

  constructor() {
  }

  validate(control: FormControl) {
    return Number.isInteger(this.minutes) && this.minutes >= 0 ? null : {
      durationValidation: {
        valid: false
      }
    };
  }

  setValue(item: DurationChangeEvent) {
    this.minutes = Number(item.target.value);
    this.onChange(this.minutes);
  }

  writeValue(value: any): void {
    if (value) {
      this.minutes = value;
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

interface DurationChangeEvent {
  target: {
    value: string
  }
}
  