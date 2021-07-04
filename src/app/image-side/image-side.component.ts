import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-side',
  templateUrl: './image-side.component.html',
  styleUrls: ['./image-side.component.css'],
})
export class ImageSideComponent implements OnInit {
  @Input() imgSrc: any = '';
  @Input() name: string = '';
  @Input() createdDate: string = '';
  @Input() id: any;
  @Input() nameSet: boolean;
  @Output() messageEvent = new EventEmitter();
  getName($event: any) {
    this.name = $event.target.value;
  }
  giveName($event: any) {
    //this.messageEvent.emit({ id: $event.target.id, name: this.name });
    console.log(this.name);
    console.log(this.id);
    this.nameSet = true;
    this.messageEvent.emit({
      id: this.id,
      name: this.name,
      image: this.imgSrc,
      createdDate: this.createdDate,
    });
  }
  constructor() {}

  ngOnInit(): void {}
}
