import {Component, Input, OnInit} from '@angular/core';
import {ImagesService} from "../model/images.service";

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @Input('item-size') public itemSize: string;

  /**
   * Gets the list of scanned images.
   *
   * @returns {string[]} List of scanned images.
   */
  get imageList(): string[] {
    return this.images.imageList.getValue();
  }

  /**
   * Constructor.
   *
   * @param {ImagesService} images Service for acanned images management.
   */
  constructor(private images: ImagesService) {}

  ngOnInit() {}
}
