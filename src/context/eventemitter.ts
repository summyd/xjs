// simple event emitter
export class MyEventEmitter {
  private _handlers: { [listener: string]: Function[] } = {};

  // allows duplicates
  on(event: string, handler: Function) {
    if (this._handlers[event] === undefined) {
      this._handlers[event] = [];
    }
    this._handlers[event].push(handler);
  }

  emit(event: string, ...params: any[]) {
    if (this._handlers[event] === undefined) {
      return;
    }

    for (let handler of this._handlers[event]) {
      handler.apply(this, params);
    }
  }
}
