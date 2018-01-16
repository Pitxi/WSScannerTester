import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WsscanTesterComponent} from './wsscan-tester/wsscan-tester.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";
import {KeysPipe} from './keys.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {ImagesService} from "./model/images.service";
import {ServerSocketService} from "./model/server-socket.service";
import {ImageGalleryComponent} from './image-gallery/image-gallery.component';
import {ImageGalleryItemComponent} from './image-gallery/image-gallery-item/image-gallery-item.component';
import {LargeImageDialogComponent} from './image-gallery/image-gallery-item/large-image-dialog/large-image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WsscanTesterComponent,
    KeysPipe,
    ImageGalleryComponent,
    ImageGalleryItemComponent,
    LargeImageDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  entryComponents: [
    LargeImageDialogComponent
  ],
  providers: [ ServerSocketService, ImagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
