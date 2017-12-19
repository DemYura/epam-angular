import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[courseBorder]'
})
export class CourseBorderDirective {
  @Input() creationDate: number;

  constructor(private el: ElementRef) { 
  }

  ngOnInit() {
      console.log(this.creationDate);
    if (this.isFreshCourse()){
      this.el.nativeElement.style.borderColor = 'green';
    } else if (this.isUpcomingCourse()) {
      this.el.nativeElement.style.borderColor = 'blue';
    }
  }

  private isFreshCourse(): boolean {
    return this.creationDate <= Date.now() && 
        this.creationDate >= this.getTwoWeeksEarielerDate();
  }

  private isUpcomingCourse(): boolean {
    return this.creationDate > Date.now();  
  }

  private getTwoWeeksEarielerDate(): number {
    const now = new Date();
    return now.setDate(now.getDate() - 14);
  }
}