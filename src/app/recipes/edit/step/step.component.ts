import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';

import { Step } from '../../../api/recipe';


@Component({
  selector: 'app-step-editor',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepEditorComponent implements OnInit, AfterViewInit {

  @Input() step: Step;
  @Input() index: Number;
  @Input() add: (index: Number) => null;

  @ViewChild('add') addElement;
  @ViewChild('delete') deleteElement;

  /** Custom constructor. */
  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => {
      this.add(this.index);
    });
  }

}
