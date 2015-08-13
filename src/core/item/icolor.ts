/// <reference path="../../../defs/es6-promise.d.ts" />

import {Item as iItem} from '../../internal/item';
import {Color} from '../../internal/util/color';

export interface IItemColor {
  getTransparency(): Promise<number>;
  setTransparency(value: number);
  getBrightness(): Promise<number>;
  setBrightness(value: number);
  getContrast(): Promise<number>;
  setContrast(value: number);
  getHue(): Promise<number>;
  setHue(value: number);
  getSaturation(): Promise<number>;
  setSaturation(value: number);
  getBorderColor(): Promise<Color>;
  setBorderColor(value: Color);
}

export class ItemColor implements IItemColor {
  private id: string;

  getTransparency(): Promise<number> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:alpha', slot).then(val => {
        resolve(Number(val));
      });
    });
  }

  setTransparency(value: number) {
    if (value < 0 || value > 255) {
      throw new RangeError('Transparency may only be in the range 0 to 255.');
    };

    let slot = iItem.attach(this.id);

    iItem.set('prop:alpha', String(value), slot);
  }

  getBrightness(): Promise<number> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:cc_brightness', slot).then(val => {
        resolve(Number(val));
      });
    });
  }

  setBrightness(value: number) {
    if (value < -100 || value > 100) {
      throw new RangeError('Brightness may only be in the range -100 to 100.');
    } else {
      let slot = iItem.attach(this.id);
      iItem.set('prop:cc_brightness', String(value), slot);
    }
  }

  getContrast(): Promise<number> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:cc_contrast', slot).then(val => {
        resolve(Number(val));
      });
    });
  }

  setContrast(value: number) {
    if (value < -100 || value > 100) {
      throw new RangeError('Contrast may only be in the range -100 to 100.');
    } else {
      let slot = iItem.attach(this.id);
      iItem.set('prop:cc_contrast', String(value), slot);
    }
  }

  getHue(): Promise<number> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:cc_hue', slot).then(val => {
        resolve(Number(val));
      });
    });
  }

  setHue(value: number) {
    if (value < -180 || value > 180) {
      throw new RangeError('Contrast may only be in the range -180 to 180.');
    } else {
      let slot = iItem.attach(this.id);
      iItem.set('prop:cc_hue', String(value), slot);
    }

  }

  getSaturation(): Promise<number> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:cc_saturation', slot).then(val => {
        resolve(Number(val));
      });
    });
  }

  setSaturation(value: number) {
    if (value < -100 || value > 100) {
      throw new RangeError('Saturation may only be in the range -100 to 100');
    } else {
      let slot = iItem.attach(this.id);
      iItem.set('prop:cc_saturation', String(value), slot);
    }
  }

  getBorderColor(): Promise<Color> {
    return new Promise(resolve => {
      let slot = iItem.attach(this.id);

      iItem.get('prop:border', slot).then(val => {
        var bgr: number = Number(val) - 0x80000000;
        var color: Color = Color.fromBGRInt(bgr);

        resolve(color);
      });
    });
  }

  setBorderColor(value: Color) {
    let slot = iItem.attach(this.id);

    iItem.set('prop:border',
      String(value.getIbgr() - 0x80000000), slot);
  }
}
