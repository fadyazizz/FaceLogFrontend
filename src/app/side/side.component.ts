import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent implements OnInit {
  constructor() {}
  @Output() messageEvent = new EventEmitter();
  updateName($event: any) {
    this.messageEvent.emit($event);
  }
  @Input() dataArr: any[] = [];
  ngOnInit(): void {}
}
