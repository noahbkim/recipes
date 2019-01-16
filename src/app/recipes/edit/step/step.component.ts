import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import { Step } from '../../../api/recipe';
import {ListEditDelegate} from "../../../library/list";


@Component({
  selector: 'app-step-editor',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepEditorComponent implements AfterViewInit {

  @Input() step: Step;
  @Input() index: number;
  @Input() delegate: ListEditDelegate;

  @ViewChild('add') addElement;
  @ViewChild('remove') removeElement;

  public ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.delegate.add(new Step(), this.index + 1));
    if (this.removeElement)
      this.removeElement.nativeElement.addEventListener('click', () => this.delegate.remove(this.index));
  }

}
