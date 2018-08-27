import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import { Step } from '../../../api/recipe';


@Component({
  selector: 'app-step-editor',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepEditorComponent implements AfterViewInit {

  @Input() step: Step;
  @Input() index: number;
  @Input() add: (index: number, object: any) => null;
  @Input() remove: (index: number) => null;

  @ViewChild('add') addElement;
  @ViewChild('remove') removeElement;

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.add(this.index + 1, new Step()));
    this.removeElement.nativeElement.addEventListener('click', () => this.remove(this.index));
  }

}
