import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'courseDuration' })
export class CourseDurationPipe implements PipeTransform {
  transform(minutes: number) {
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
        return `${hours}h ${minutes % 60}min`;
    } else {
        return `${minutes % 60}min`;
    }
  }
}