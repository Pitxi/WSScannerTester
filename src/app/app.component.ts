import { Component } from '@angular/core';
import {ImagesService} from "./model/images.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasImages: boolean;

  /**
   * Constructor.
   *
   * @param {ImagesService} images
   */
  constructor(private images: ImagesService) {
    this.hasImages = false;

    this.images.imageList.subscribe((images) => {
      this.hasImages = images.length > 0;
    });
  }
}
