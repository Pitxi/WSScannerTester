import {Component, OnDestroy, OnInit} from '@angular/core';
import {Format, Intent, PaperSize, AVAILABLE_PPI, ScanCommand} from "../model/wsscan-command-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServerSocketService} from "../model/server-socket.service";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/delay";
import {ImagesService} from "../model/images.service";

/**
 * Tester for WebSocket Scan Server.
 */
@Component({
  selector: 'wsscan-tester',
  templateUrl: './wsscan-tester.component.html',
  styleUrls: ['./wsscan-tester.component.scss']
})
export class WsscanTesterComponent implements OnInit, OnDestroy {
  private socketSubscription: Subscription;
  readonly configFG: FormGroup;
  readonly Format = Format;
  readonly Intent = Intent;
  readonly PaperSize = PaperSize;
  readonly AVAILABLE_PPI = AVAILABLE_PPI;
  launched: boolean;

  /**
   * Constructor.
   */
  constructor(private socket: ServerSocketService, private images: ImagesService) {
    let fb = new FormBuilder();
    this.launched = false;

    this.configFG = fb.group({
      dialogTitle     : [ 'Escaneando documentos', Validators.required ],
      format          : [ Format.PNG             , Validators.required ],
      ppi             : [ 200                    , Validators.required ],
      paperSize       : [ PaperSize.Letter       , Validators.required ],
      intent          : [ Intent.Color           , Validators.required ],
      ppiSelectable   : [ true                   , Validators.required ],
      paperSelectable : [ true                   , Validators.required ],
      intentSelectable: [ true                   , Validators.required ]
    });
  }

  /**
   * Sends the Scan command to the server.
   */
  scan(): void {
    let command: ScanCommand = {
      command         : 'scan',
      format          : this.configFG.get('format').value,
      dialogTitle     : this.configFG.get('dialogTitle').value,
      ppi             : this.configFG.get('ppi').value,
      paper           : this.configFG.get('paperSize').value,
      intent          : this.configFG.get('intent').value,
      ppiSelectable   : this.configFG.get('ppiSelectable').value,
      paperSelectable : this.configFG.get('paperSelectable').value,
      intentSelectable: this.configFG.get('intentSelectable').value
    };

    this.socket.send(command);
    this.launched = true;
  }

  /**
   * Initializing component resources.
   */
  ngOnInit() {
    this.socket.connect();

    this.socketSubscription = this.socket.messages.retryWhen(errors => errors.delay(1000)).subscribe((response: string) => {
      let images = [];

      if (response.startsWith('[')) {
        images = JSON.parse(response).map(image => {
          let prefix: string = 'data:{mimetype};base64,'.replace(/\{mimetype\}/, this.configFG.get('format').value);

          return prefix + image;
        });

        this.images.imageList.next(images);
      } else if (response.startsWith('{')) {
        throw JSON.parse(response);
      }

      this.launched = false;
    });
  }

  /**
   * Frees unnecessary resources on destroy.
   */
  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }
}
