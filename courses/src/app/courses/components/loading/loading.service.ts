import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {
  private visible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public show() {
    this.visible.next(true);
  }

  public hide() {
    this.visible.next(false);
  }

  public isLoading(): Observable<boolean> {
    return this.visible.asObservable();
  }
}