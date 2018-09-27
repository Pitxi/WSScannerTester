import { Injectable } from '@angular/core';
import { QueueingSubject } from "queueing-subject";
import websocketConnect, { Connection } from 'rxjs-websockets';
import { Subscription } from "rxjs";
import { IScannerCommand } from "./iscanner-command";

@Injectable()
export class ServerSocketService {
  public connection: Connection = null;
  public connectionSubscription: Subscription;
  public activeConnections: number = 0;
  public wsScanUrl = 'ws://localhost:8001/WSScanService';
  private inputStream: QueueingSubject<string>;

  constructor() {
  }

  /**
   * Connects to the WebSocket server, initializing the messages Observable.
   */
  public connect(): void {
    this.disconnect();

    this.connection = websocketConnect(this.wsScanUrl, this.inputStream = new QueueingSubject<string>());
    this.connectionSubscription = this.connection.connectionStatus.subscribe(connections => {
      this.activeConnections = connections;
    });
  }

  public disconnect(): void {
    if (!!this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }

    this.connection = null;
    this.connectionSubscription = null;
    this.activeConnections = 0;
  }

  /**
   * Sends a command to the server.
   *
   * @param command Scan command with it's parameters.
   */
  public send(command: IScannerCommand): void {
    this.inputStream.next(JSON.stringify(command));
  }
}
