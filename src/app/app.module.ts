import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WsscanTesterComponent } from './wsscan-tester/wsscan-tester.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";
import { KeysPipe } from './keys.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {ImagesService} from "./model/images.service";
import {ServerSocketService} from "./model/server-socket.service";
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageGalleryItemComponent } from './image-gallery/image-gallery-item/image-gallery-item.component';


@NgModule({
  declarations: [
    AppComponent,
    WsscanTesterComponent,
    KeysPipe,
    ImageGalleryComponent,
    ImageGalleryItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  providers: [ ServerSocketService, ImagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
