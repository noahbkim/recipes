import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

import { Part } from '../../../api/recipe';


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements OnInit, AfterViewInit {

  @Input() amount: String;
  @Input() ingredient: String;
  @Input() add: (index: number, values: Object) => null;
  @Input() index: number;

  @ViewChild('add') addElement;
  @ViewChild('delete') deleteElement;

  /** Custom constructor. */
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.add(this.index + 1, new Part()));
  }

}
