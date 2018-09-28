import { Component, OnDestroy } from '@angular/core';
import { AVAILABLE_PPI } from "../model/wsscan-command-model";
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
import { IScannerCommand } from "../model/iscanner-command";
import { IDevice } from "../model/idevice";
import { IDocumentSource } from "../model/idocument-source";
import { DocumentHandlingCapabilities } from "../model/document-handling-capabilities.enum";
import { DocumentHandlingSelect } from "../model/document-handling-select.enum";

/**
 * Tester for WebSocket Scan Server.
 */
@Component({
  selector: 'wsscan-tester',
  templateUrl: './wsscan-tester.component.html',
  styleUrls: [ './wsscan-tester.component.scss' ]
})
export class WsscanTesterComponent implements OnDestroy {
  private _devices: Array<IDevice>;
  private _documentSources: Array<IDocumentSource>;
  private socketSubscription: Subscription;
  readonly scanConfigFG: FormGroup;
  readonly Format = ImageFormat;
  readonly Intent = ImageIntent;
  readonly PaperSize = Page;
  readonly AVAILABLE_PPI = AVAILABLE_PPI;
  launched: boolean;

  /**
   * gets a list of available devices.
   */
  public get devices(): Array<IDevice> {
    return this._devices;
  }

  /**
   * Gets a list of available document sources in the device.
   */
  public get documentSources(): Array<IDocumentSource> {
    return this._documentSources;
  }

  /**
   * Gets the URL of the websocket scanner server.
   */
  public get serverUrl(): string {
    return this.socket.wsScanUrl;
  }

  /**
   * Sets the URL of the websocket scanner server.
   *
   * @param url
   */
  public set serverUrl(url: string) {
    this.socket.wsScanUrl = url;
  }

  /**
   * Gets the number of active WebSocket connections established with the web showScanDialog server.
   *
   * @returns {number} Number of active connections.
   */
  get activeConnections(): number {
    return this.socket.activeConnections;
  }

  /**
   * Gets if the application is actually trying to connect to the scanner server.
   */
  get isConnecting(): boolean {
    return !!this.socket.connection && this.socket.activeConnections == 0;
  }

  /**
   * Constructor.
   */
  constructor(private socket: ServerSocketService, private images: ImagesService) {
    let fb = new FormBuilder();
    this.launched = false;
    this._devices = [];
    this._documentSources = [];

    this.scanConfigFG = fb.group({
      selectedDevice: [ null, Validators.required ],
      documentSource: [ null, Validators.required ],
      dialogTitle: [ 'Escaneando documentos', Validators.required ],
      format: [ ImageFormat.PNG, Validators.required ],
      ppi: [ 200, Validators.required ],
      paperSize: [ Page.Letter, Validators.required ],
      intent: [ ImageIntent.Color, Validators.required ],
      ppiSelectable: [ true, Validators.required ],
      paperSelectable: [ true, Validators.required ],
      intentSelectable: [ true, Validators.required ]
    });
  }

  /**
   * Sends the command to show the scanning dialog in the host machine.
   */
  showScanDialog(): void {
    const command: IScannerCommand = {
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

  /**
   * Send the command to initiate the scanning process.
   */
  scan(): void {
    const command: IScannerCommand = {
      command: 'scan',
      parameters: {
        format: this.scanConfigFG.get('format').value,
        dialogTitle: this.scanConfigFG.get('dialogTitle').value,
        ppi: this.scanConfigFG.get('ppi').value,
        paper: this.scanConfigFG.get('paperSize').value,
        intent: this.scanConfigFG.get('intent').value,
        selectedDevice: this.scanConfigFG.get('selectedDevice').value,
        documentSource: this.scanConfigFG.get('documentSource').value
      }
    };

    console.log(command);

    this.images.imageList.next([]);
    this.socket.send(command);
    this.launched = true;
  }

  /**
   * Gets the mime type corresponding to the selected image format.
   */
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

  /**
   * Connects to the scanner server and sets the subscription to the connection on success.
   */
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
          break;
        case 'devices-list':
          this._devices = response.data;

          if (this._devices.length > 0) {
            const deviceId = this._devices[ 0 ].id;

            this.scanConfigFG.get('selectedDevice').setValue(deviceId);
            this.selectedDeviceChanged(deviceId);
          }

          break;
        case 'error':
          console.error(response);
      }

      this.launched = false;
    });

    this.refreshDevices();
  }

  /**
   * Refreshes the list of available document sources from the given device.
   *
   * @param deviceId The ID of the device whose document sources are requested.
   */
  selectedDeviceChanged(deviceId: string): void {
    const device = this._devices.find(device => device.id == deviceId);

    this._documentSources = [];

    if (device.capabilities & DocumentHandlingCapabilities.Feeder) {
      this._documentSources.push({ description: 'Alimentador', value: DocumentHandlingSelect.Feeder });
    }

    if (device.capabilities & DocumentHandlingCapabilities.Duplex) {
      this._documentSources.push({
        description: 'Alimentador doble cara',
        value: DocumentHandlingSelect.Feeder | DocumentHandlingSelect.Duplex
      });
    }

    if (device.capabilities & DocumentHandlingCapabilities.Flatbed) {
      this._documentSources.push({ description: 'Bandeja', value: DocumentHandlingSelect.Flatbed })
    }

    if (this._documentSources.length > 0) {
      this.scanConfigFG.get('documentSource').setValue(this._documentSources[ 0 ].value);
    }
  }

  /**
   * Gets the list of available devices from the server.
   */
  refreshDevices() {
    this.socket.send({ command: 'list-devices' });
  }


  /**
   * Disconnects from the server.
   */
  disconnect(): void {
    if (!!this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }

    this._devices = [];
    this._documentSources = [];
    this.launched = false;
    this.socket.disconnect();
  }

  /**
   * Releases resources when the component is destroyed.
   */
  ngOnDestroy() {
    this.disconnect();
  }
}
