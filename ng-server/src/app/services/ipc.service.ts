import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private _ipc: IpcRenderer | undefined;

  private _ipcStream : Subject <object>;
  public  ipcStream : Observable <object>;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;

        this._ipc.on(channel, ()=> {

        })
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }
  public on(message: string, listener: Function): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(message, listener);
  }

  public send(message: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(message, ...args);
  }

}
