import { Injectable } from '@angular/core';
import {QueueingSubject} from "queueing-subject";
import {Observable} from "rxjs/Observable";
import websocketConnect from 'rxjs-websockets';
import {ScanCommand} from "./wsscan-command-model";
import "rxjs/add/operator/share";

@Injectable()
export class ServerSocketService {
  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>;

  /**
   * Connects to the WebSocket server, initializing the messages Observable.
   */
  public connect(): void {
    if (!this.messages) {
      this.messages = websocketConnect('ws://localhost:8001/WSScanService', this.inputStream = new QueueingSubject<string>()).messages;
    }
  }

  /**
   * Sends the scan command to the server.
   *
   * @param {ScanCommand} command Scan command with it's parameters.
   */
  public send(command: ScanCommand): void {
    this.inputStream.next(JSON.stringify(command));
  }

  constructor() { }

}
