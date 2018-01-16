import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/**
 * Service for images management.
 */
@Injectable()
export class ImagesService {
  public imageList: BehaviorSubject<string[]>;

  /**
   * Constructor.
   */
  constructor() {
    if (!this.imageList) {
      this.imageList = new BehaviorSubject<string[]>([]);
    }
  }

  /**
   * Clears the image list.
   */
  public clear() {
    this.imageList.next([]);
  }
}
