import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import * as tf from '@tensorflow/tfjs';

import * as blazeface from '@tensorflow-models/blazeface';
@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css'],
})
export class CamComponent implements AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;
  @Output() messageEvent = new EventEmitter();

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured: boolean;
  globalmodel: any;

  async ngAfterViewInit() {
    await this.setupDevices();
    await tf.getBackend();
    this.globalmodel = await blazeface.load();
    setInterval(this.capture.bind(this), 500);
  }
  predictionObject: any;
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  sendImage() {
    console.log('sending image');
    this.messageEvent.emit(this.predictionObject);
  }

  capture() {
    const image = this.video.nativeElement;
    this.globalmodel.estimateFaces(image, false).then((prediction: any) => {
      if (prediction.length != 0) {
        const data = this.drawImageToCanvas(image, prediction);

        this.isCaptured = true;
        this.predictionObject = { data, prediction };

        this.sendImage();
      } else {
        this.isCaptured = false;
      }
    });
  }

  drawImageToCanvas(image: any, predictions: any) {
    const nativeElement = this.canvas.nativeElement;
    const context = nativeElement.getContext('2d');
    const AllPeople: any = [];
    context.drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);

    context.beginPath();
    context.lineWidth = '4';
    context.strokeStyle = 'blue';
    for (let i = 0; i < predictions.length; i++) {
      const context = nativeElement.getContext('2d');
      context.drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);

      context.beginPath();
      context.lineWidth = '4';
      context.strokeStyle = 'blue';
      const topLeft0 = predictions[i].topLeft[0];
      const topLeft1 = predictions[i].topLeft[1];
      const bottomRight0 = predictions[i].bottomRight[0];
      const bottomRight1 = predictions[i].bottomRight[1];
      context.rect(
        topLeft0,
        topLeft1,
        bottomRight0 - topLeft0,
        bottomRight1 - topLeft1
      );
      context.stroke();
      predictions[i].landmarks.forEach((landmark: any) => {
        context.fillRect(landmark[0], landmark[1], 5, 5);
      });
      const data = nativeElement.toDataURL();
      AllPeople.push({ image: data });
    }
    predictions.forEach((prediction: any) => {
      const topLeft0 = prediction.topLeft[0];
      const topLeft1 = prediction.topLeft[1];
      const bottomRight0 = prediction.bottomRight[0];
      const bottomRight1 = prediction.bottomRight[1];
      context.rect(
        topLeft0,
        topLeft1,
        bottomRight0 - topLeft0,
        bottomRight1 - topLeft1
      );
      context.stroke();
      prediction.landmarks.forEach((landmark: any) => {
        context.fillRect(landmark[0], landmark[1], 5, 5);
      });

      // context.getImageData(
      //   topLeft0,
      //   topLeft1,
      //   bottomRight0 - topLeft0,
      //   bottomRight1 - topLeft1
      // );
    });

    return AllPeople;
  }
}
