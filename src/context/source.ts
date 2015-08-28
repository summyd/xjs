/// <reference path="../../defs/es6-promise.d.ts" />

import {MyEventEmitter} from './eventemitter';
import {exec} from '../internal/internal';

/** This utility class is used internally by the framework for certain important
 *  processes. This class also exposes certain important events for
 *
 *
 */
export class SourcePluginWindow extends MyEventEmitter {
  private static _instance: SourcePluginWindow;

  static getInstance() {
    if (SourcePluginWindow._instance === undefined) {
      SourcePluginWindow._instance = new SourcePluginWindow();
    }
    return SourcePluginWindow._instance;
  }

  constructor() {
    super();

    // TODO: need to document events emitted
    this.on('message-source', function(message) {
      if (message.request !== undefined) {
        if (message.request === 'saveConfig') {
          this.emit('save-config', message.data);
        } else if (message.request === 'revertConfig') {
          this.emit('revert-config', this.lastSavedConfig);
        }
      }
    });

    SourcePluginWindow._instance = this;
  }
}

window['MessageSource'] = function(message: string) {
    SourcePluginWindow.getInstance().emit("message-source",
      JSON.parse(message));
}

window['SetConfiguration'] = function(configObj: string) {
    try {
        var data = JSON.parse(configObj);
        SourcePluginWindow.getInstance().emit("apply-config", data);
    } catch (e) {
        // syntax error probably happened, exit gracefully
        return;
    }
}
