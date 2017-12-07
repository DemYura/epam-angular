import { Component } from '@angular/core';

import '../../../../assets/css/styles.css';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent { 
    private findCriteria: string = '';

    onFindButtonClick() {
        console.log(this.findCriteria);
    }
}
