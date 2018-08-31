import { Component, OnDestroy } from '@angular/core';
import { AVAILABLE_PPI, IScanCommand } from "../model/wsscan-command-model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServerSocketService } from "../model/server-socket.service";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/delay";
import { ImagesService } from "../model/images.service";
import "rxjs/add/operator/share";
import { ImageIntent } from "../model/image-intent.enum";
import { ImageFormat } from "../model/image-format.enum";
import { Page } from "../model/page.enum";
import { IResponse } from "../model/iresponse";

/**
 * Tester for WebSocket Scan Server.
 */
@Component({
  selector: 'wsscan-tester',
  templateUrl: './wsscan-tester.component.html',
  styleUrls: ['./wsscan-tester.component.scss']
})
export class WsscanTesterComponent implements OnDestroy {
  private socketSubscription: Subscription;
  readonly scanConfigFG: FormGroup;
  readonly Format = ImageFormat;
  readonly Intent = ImageIntent;
  readonly PaperSize = Page;
  readonly AVAILABLE_PPI = AVAILABLE_PPI;
  launched: boolean;

  public get serverUrl(): string {
    return this.socket.wsScanUrl;
  }

  public set serverUrl(url: string) {
    this.socket.wsScanUrl = url;
  }

  /**
   * Gets the number of active WebSocket connections established with the web showScanDialog server.
   * @returns {number} Number of active connections.
   */
  get activeConnections(): number {
    return this.socket.activeConnections;
  }

  get isConnecting(): boolean {
    return !!this.socket.connection && this.socket.activeConnections == 0;
  }

  /**
   * Constructor.
   */
  constructor(private socket: ServerSocketService, private images: ImagesService) {
    let fb = new FormBuilder();
    this.launched = false;

    this.scanConfigFG = fb.group({
      dialogTitle: ['Escaneando documentos', Validators.required],
      format: [ImageFormat.PNG, Validators.required],
      ppi: [200, Validators.required],
      paperSize: [Page.Letter, Validators.required],
      intent: [ImageIntent.Color, Validators.required],
      ppiSelectable: [true, Validators.required],
      paperSelectable: [true, Validators.required],
      intentSelectable: [true, Validators.required]
    });
  }

  /**
   * Sends the Scan command to the server.
   */
  showScanDialog(): void {
    const command: IScanCommand = {
      command: 'scan-dialog',
      parameters: {
        format: this.scanConfigFG.get('format').value,
        dialogTitle: this.scanConfigFG.get('dialogTitle').value,
        ppi: this.scanConfigFG.get('ppi').value,
        paper: this.scanConfigFG.get('paperSize').value,
        intent: this.scanConfigFG.get('intent').value,
        ppiSelectable: this.scanConfigFG.get('ppiSelectable').value,
        paperSelectable: this.scanConfigFG.get('paperSelectable').value,
        intentSelectable: this.scanConfigFG.get('intentSelectable').value
      }
    };

    this.socket.send(command);
    this.launched = true;
  }

  scan(deviceIndex: number): void {
    const command: IScanCommand = {
      command: 'scan',
      parameters: {
        format: this.scanConfigFG.get('format').value,
        dialogTitle: this.scanConfigFG.get('dialogTitle').value,
        ppi: this.scanConfigFG.get('ppi').value,
        paper: this.scanConfigFG.get('paperSize').value,
        intent: this.scanConfigFG.get('intent').value,
        ppiSelectable: this.scanConfigFG.get('ppiSelectable').value,
        paperSelectable: this.scanConfigFG.get('paperSelectable').value,
        intentSelectable: this.scanConfigFG.get('intentSelectable').value,
        selectedDevice: deviceIndex
      }
    };

    this.images.imageList.next([]);
    this.socket.send(command);
    this.launched = true;
  }

  private getImageMimeType(): string {
    const format: ImageFormat = this.scanConfigFG.get('format').value;

    switch (format) {
      case ImageFormat.GIF:
        return 'image/gif';
      case ImageFormat.BMP:
        return 'image/bmp';
      case ImageFormat.JPEG:
        return 'image/jpeg';
      case ImageFormat.PNG:
        return 'image/png';
      case ImageFormat.TIFF:
        return 'image/tiff';
    }
  }

  connect(): void {
    this.disconnect();
    this.socket.connect();

    this.socketSubscription = this.socket.connection.messages.share().retryWhen(errors => errors.delay(5000)).share().subscribe((responseStr: string) => {
      const response: IResponse = JSON.parse(responseStr);
      
      switch (response.type) {
        case 'message':
          console.log(response.data);
          break;
        case 'image':
          let images = this.images.imageList.getValue();

          images.push(`data:${this.getImageMimeType()};base64,${response.data}`);
          this.images.imageList.next(images);
      }

      this.launched = false;
    });
  }

  disconnect(): void {
    if (!!this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }

    this.socket.disconnect();
  }

  /**
   * Frees unnecessary resources on destroy.
   */
  ngOnDestroy() {
    this.disconnect();
  }
}
