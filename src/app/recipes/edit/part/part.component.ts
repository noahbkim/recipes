import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements OnInit {

  @Input() amount: String;
  @Input() ingredient: String;
  @Input() add: (index: Number, values: Object) => null;
  @Input() index: Number;

  /** Custom constructor. */
  constructor() {}

  ngOnInit() {}

}
