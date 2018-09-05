import { Component } from '@angular/core';
import {ImagesService} from "./model/images.service";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

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
   * @param sanitizer Service for url sanitazion.
   * @param iconRegistry Service for registration of SVG icons which will be used with mat-icon.
   * @param images Service for storing of scanned images.
   */
  constructor(private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry, private images: ImagesService) {
    this.hasImages = false;

    this.images.imageList.subscribe((images) => {
      this.hasImages = images.length > 0;

      this.iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/images/refresh.svg'));
    });
  }
}
