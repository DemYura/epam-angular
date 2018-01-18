import { Component, EventEmitter, Output } from '@angular/core';

import '../../../../assets/css/styles.css';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent { 
    public findCriteria: string = '';
    @Output("onSearch") onFindEmitter = new EventEmitter<string>(); 

    onFindButtonClick() {
      this.onFindEmitter.emit(this.findCriteria);
    }
}
