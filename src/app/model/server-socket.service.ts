import { Injectable } from '@angular/core';
import {QueueingSubject} from "queueing-subject";
import websocketConnect, {Connection} from 'rxjs-websockets';
import {ScanCommand} from "./wsscan-command-model";

@Injectable()
export class ServerSocketService {
  private inputStream: QueueingSubject<string>;
  public  connection: Connection;
  public  activeConnections: number;
  public readonly WSScanUrl = 'ws://localhost:8001/WSScanService';

  /**
   * Connects to the WebSocket server, initializing the messages Observable.
   */
  public connect(): void {
    if (!this.connection) {
      this.connection = websocketConnect(this.WSScanUrl, this.inputStream = new QueueingSubject<string>());
      this.connection.connectionStatus.subscribe(connections => { this.activeConnections = connections; });
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

  constructor() {}
}
