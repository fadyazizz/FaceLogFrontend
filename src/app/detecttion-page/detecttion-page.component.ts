import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { backendLink } from '../../keys/keys';
@Component({
  selector: 'app-detecttion-page',
  templateUrl: './detecttion-page.component.html',
  styleUrls: ['./detecttion-page.component.css'],
})
export class DetecttionPageComponent implements OnInit {
  constructor(private http: HttpClient) {}
  url = backendLink;
  sendData: any;
  ngOnInit(): void {
    this.http
      .get(this.url)
      .toPromise()
      .then((data) => {
        console.log('in get', data);
        this.sendData = data;
      });
  }
  updateName($event: any) {
    console.log('updating component');
    console.log($event);
    this.http
      .put(this.url + '/' + $event.id, $event)
      .toPromise()
      .then((data: any) => {
        console.log(data);
      });
  }
  receiveMessage($event: any) {
    console.log('message received');
    console.log($event.data.length);
    const dataArr = $event.data;
    $event.data.forEach((element: any) => {
      const body = {
        image: element.image,
      };

      this.http
        .post(this.url, body)
        .toPromise()
        .then((data) => {
          console.log(data);
          this.sendData.push(data);
        });
    });
  }
}
