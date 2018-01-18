import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'loading-component',
  template: '<div class="loading-container" *ngIf="loadingService.isLoading() | async">Loading</div>',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) {}
}