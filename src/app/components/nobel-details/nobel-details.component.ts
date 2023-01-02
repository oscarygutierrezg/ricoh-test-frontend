import { Component, Input } from '@angular/core';
import { Laureate } from 'src/app/model/laureate';

@Component({
  selector: 'app-nobel-details',
  templateUrl: './nobel-details.component.html',
  styleUrls: ['./nobel-details.component.css'],
})

export class NobelDetailsComponent  {
  @Input() laureate: Laureate | undefined;
 
}
