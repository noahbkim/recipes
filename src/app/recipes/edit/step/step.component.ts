import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepEditorComponent implements OnInit {

  step: String;

  /** Custom constructor. */
  constructor(step: String = '') {
    this.step = step;
  }

  ngOnInit() {
  }

}
