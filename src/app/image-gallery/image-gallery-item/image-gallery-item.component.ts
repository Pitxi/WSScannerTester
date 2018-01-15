import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'image-gallery-item',
  templateUrl: './image-gallery-item.component.html',
  styleUrls: ['./image-gallery-item.component.scss']
})
export class ImageGalleryItemComponent implements OnInit {
  @Input() public height: string = '100px';
  @Input('image-url') private _imageUrl: string;

  get url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this._imageUrl);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
