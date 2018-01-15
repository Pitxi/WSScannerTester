import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/**
 * Service for images management.
 */
@Injectable()
export class ImagesService {
  public imageList: BehaviorSubject<string[]>;

  constructor() {
    if (!this.imageList) {
      this.imageList = new BehaviorSubject<string[]>([]);
    }
  }

  /**
   * Adds new images to the image list.
   *
   * @param images One or more images to be added to the list.
   * @returns {boolean} True if the image was succesfully added. False otherwise.
   */
  public add(...images): boolean {
    const list = this.imageList.getValue();
    const length = list.length;
    let success = images.push(...images) > length;

    if (success) this.imageList.next(images);

    return success;
  }

  /**
   * Removes the image at the specified index.
   *
   * @param {number} index The index of the image to be deleted from the image list.
   * @returns {boolean} True if the image was succesfully removed. False otherwise.
   */
  public removeAt(index: number): boolean {
    const list = this.imageList.getValue();
    let success = false;

    if (index > -1 && index < list.length) {
      success = list.splice(index, 1).length > 0;

      if (success) this.imageList.next(list);
    }

    return success;
  }

  /**
   * Clears the image list.
   */
  public clear() {
    this.imageList.next([]);
  }
}
