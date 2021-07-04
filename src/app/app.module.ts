import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CamComponent } from './cam/cam.component';
import { SideComponent } from './side/side.component';
import { DetecttionPageComponent } from './detecttion-page/detecttion-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageSideComponent } from './image-side/image-side.component';

@NgModule({
  declarations: [
    AppComponent,
    CamComponent,
    SideComponent,
    DetecttionPageComponent,
    ImageSideComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
