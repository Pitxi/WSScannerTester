import {Component, Inject, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material";
import {LargeImageDialogComponent} from "./large-image-dialog/large-image-dialog.component";

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

  /**
   * Constructor.
   *
   * @param {DomSanitizer} sanitizer Saneador de cadenas para las URLs de las imágenes.
   */
  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) {}

  showLargeImage(): void {
    let dialogRef = this.dialog.open(LargeImageDialogComponent, {
      data: { url: this.url }
    });
  }

  ngOnInit() {}
}
