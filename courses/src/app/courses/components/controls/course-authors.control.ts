import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'course-authors',
  templateUrl: './course-authors.control.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CourseAuthorsControl),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CourseAuthorsControl),
    multi: true
  }]
})
export class CourseAuthorsControl implements ControlValueAccessor, Validator {
  @Input('authors') public authors: string[];
  @Input() public selectedAuthors: string[];
  public disabled: boolean;
  private onChange = (value: any) => {};

  constructor() {
  }

  onCheckChange(event: CheckboxEvent) {
    this.selectedAuthors = this.selectedAuthors || [];
    if (event.target.checked) {
      this.selectedAuthors.push(event.target.value);
    } else {
      const index = this.selectedAuthors.indexOf(event.target.value);
      this.selectedAuthors.splice(index, 1);
    }
    this.onChange(this.selectedAuthors);
  }

  isChecked(author: string): boolean {
    return this.selectedAuthors && this.selectedAuthors.indexOf(author) > -1;
  }

  validate(control: FormControl) {
    return this.selectedAuthors && this.selectedAuthors.length > 0 ? null : {
      authorsValidation: {
        valid: false
      }
    };
  }

  writeValue(value: string[]): void {
    if (value) {
      this.selectedAuthors = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}

interface CheckboxEvent {
  target: {
    checked: boolean;
    value: string;
  }
}
  