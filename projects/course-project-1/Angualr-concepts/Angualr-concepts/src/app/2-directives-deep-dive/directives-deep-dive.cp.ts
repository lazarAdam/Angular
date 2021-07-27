import { Component } from '@angular/core';

@Component({
  selector: 'directives-deep-dive',
  templateUrl: './directives-deep-dive.cp.html',
  styleUrls: ['./directives-deep-dive.cp.css']
})
export class DirectivesDeepDiveCp {
  // numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1,3,5];
  evenNumbers=[2,4];
  onlyOdd = false;
  value =500
}
