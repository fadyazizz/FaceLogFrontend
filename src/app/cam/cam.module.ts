import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamComponent } from './cam.component';



@NgModule({
  declarations: [CamComponent],
  imports: [
    CommonModule
  ],
  exports:[CamComponent]
})
export class CamModule { }
