/// <reference path="../../../defs/es6-promise.d.ts" />

import {applyMixins} from '../../internal/util/mixin';
import {Rectangle} from '../../util/rectangle';
import {Item as iItem} from '../../internal/item';
import {Environment} from '../environment';
import {JSON as JXON} from '../../internal/util/json';
import {XML} from '../../internal/util/xml';
import {Scene} from '../scene';
import {ItemLayout, IItemLayout} from './ilayout';

export enum ItemTypes {
  UNDEFINED,
  FILE,
  LIVE,
  TEXT,
  BITMAP,
  SCREEN,
  FLASHFILE,
  GAMESOURCE,
  HTML
}

/**
 * An Item represents an object that is used as a source on the stage.
 * Some possible sources are games, microphones, or a webpage.
 * 
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 * var Scene = xjs.Scene.getById(0);
 * 
 * Scene.getItems().then(function(items) {
 *   if (items.length === 0) return;
 * 
 *   // There's a valid item, let's use that
 *   var item = items[items.length - 1];
 *   return item.setCustomName('ItemTesting');
 * }).then(function(item) {
 *   // Do something else here
 * });
 * ```
 */
export class Item implements IItemLayout {
  protected _id: string;
  protected _type: ItemTypes;
  protected _value: any;
  private _name: string;
  private _cname: string;
  private _sceneID: number;
  private _keepLoaded: boolean;

  private _xmlparams: {};

  constructor(props?: {}) {
    props = props ? props : {};

    this._name = props['name'];
    this._cname = props['cname'];
    this._id = props['id'];
    this._sceneID = props['sceneID'];
    this._value = props['value'];
    this._keepLoaded = props['keeploaded'];
    this._type = Number(props['type']);

    this._xmlparams = props;
  }

  /**
   * param: (value: string)
   * ```
   * return: Promise<Item>
   * ```
   *  
   * Sets the name of the item. This method also returns the current item instance,
   * which could be used to execute functionality that requires setName to resolve
   * first.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setName('newNameHere').then(function(item) {
   *   // Promise would resolve current item instance, which would allow us
   *   // to execute other methods only after we're sure that setName is
   *   // done with setting the prop:name to XSplit
   *   return item.getName();
   * }).then(function(name) {
   *   // 'name' should be the updated value by now.
   * });
   * ```
   */
  setName(value: string): Promise<Item> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      this._name = value;
      iItem.set('prop:name', this._name, slot).then(() => {
        resolve(this);
      });
    });
  }

  /**
   * return: Promise<string>
   * 
   * Gets the current name of the item.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getName().then(function(name) {
   *   // Do something with the name
   * });
   * ```
   */
  getName(): Promise<string> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      iItem.get('prop:name', slot).then(val => {
        this._name = val;
        resolve(val);
      });
    });
  }

  /**
   * param: (value: string)
   * ```
   * return: Promise<Item>
   * ```
   *  
   * Sets the custom name of the item. This method also returns the current item 
   * instance, which could be used to execute functionality that requires setName 
   * to resolve first.
   * 
   * The main difference between `setName` and `setCustomName` is that the CustomName
   * can be edited by the end users using XBC through the bottom panel. `setName` on
   * the other hand would update the item's `prop:name`, which cannot be edited by the
   * end users using XBC through the bottom panel.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setCustomName('newNameHere').then(function(item) {
   *   // Promise would resolve current item instance, which would allow us
   *   // to execute other methods only after we're sure that setCustomName is
   *   // done with setting the prop:cname to XSplit
   *   return item.getCustomName();
   * }).then(function(name) {
   *   // 'name' should be the updated value by now.
   * });
   * ```
   */
  setCustomName(value: string): Promise<Item> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      this._cname = value;
      iItem.set('prop:cname', this._cname, slot).then(() => {
        resolve(this);
      });
    });
  }

  /**
   * return: Promise<string>
   * 
   * Gets the current custom name of the item.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getCustomName().then(function(name) {
   *   // Do something with the name
   * });
   * ```
   */
  getCustomName(): Promise<string> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      iItem.get('prop:cname', slot).then(val => {
        this._cname = val;
        resolve(val);
      });
    });
  }

  /**
   * return: Promise<string|XML>
   * 
   * Gets the current custom name of the item.
   * 
   * This method has the possibility to return an XML object, which is an object
   * generated by the framework. Call `toString()` to transform into an XML String.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getCustomName().then(function(name) {
   *   // Do something with the name
   * });
   * ```
   */
  getValue(): Promise<string|XML> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      iItem.get('prop:item', slot).then(val => {
        val = (val === 'null') ? '' : val;
        if (val === '') { // don't return XML for null values
          this._value = '';
          resolve(val);
        } else {
          try {
            this._value = XML.parseJSON(JXON.parse(val));
            resolve(this._value);
          } catch (e) {
            // value is not valid XML (it is a string instead)
            this._value = val;
            resolve(val);
          }
        }
      });
    });
  }

  /**
   * param: (value: string)
   * ```
   * return: Promise<Item>
   * ```
   *  
   * Set the video item's main definition. This method also returns the current item 
   * instance, which could be used to execute functionality that requires setName 
   * to resolve first.
   * 
   * **WARNING:**
   * Please do note that using this method COULD break the current item, possibly modifying
   * its type IF you set an invalid string for the current item.
   * 
   * #### Possible values by item type
   * - FILE - path/URL
   * - LIVE - Device ID
   * - BITMAP - path
   * - SCREEN - XML string
   * - FLASHFILE - path
   * - GAMESOURCE - XML string
   * - HTML - path/URL or html:<plugin>
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setValue('@DEVICE:PNP:\\?\USB#VID_046D&amp;PID_082C&amp;MI_02#6&amp;16FD2F8D&amp;0&amp;0002#{65E8773D-8F56-11D0-A3B9-00A0C9223196}\GLOBAL')
   *   .then(function(item) {
   *   // Promise would resolve current item instance, which would allow us
   *   // to execute other methods only after we're sure that setCustomName 
   *   // is done with setting the prop:item to XSplit
   * });
   * ```
   */
  setValue(value: string | XML): Promise<Item> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      var val: string = (typeof value === 'string') ?
        <string> value : (<XML> value).toString();
      if (typeof value !== 'string') { // XML
        this._value = JXON.parse(val);
      } else {
        this._value = val;
      }
      iItem.set('prop:item', val, slot).then(() => {
        resolve(this);
      });
    });
  }

  /**
   * return: Promise<boolean>
   * 
   * Check if item is kept loaded in memory
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getKeepLoaded().then(function(isLoaded) {
   *   // The rest of your code here
   * });
   * ```
   */
  getKeepLoaded(): Promise<boolean> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      iItem.get('prop:keeploaded', slot).then(val => {
        this._keepLoaded = (val === '1');
        resolve(this._keepLoaded);
      });
    });
  }

  /**
   * param: (value: boolean)
   * ```
   * return: Promise<Item>
   * ```
   *  
   * Set Keep loaded option to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setKeepLoaded(true).then(function(item) {
   *   // Promise would resolve current item instance, which would allow us
   *   // to execute other methods only after we're sure that setKeepLoaded is
   *   // done with setting the prop:keeploaded to XSplit
   * });
   * ```
   */
  setKeepLoaded(value: boolean): Promise<Item> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      this._keepLoaded = value;
      iItem.set('prop:keeploaded', (this._keepLoaded ? '1' : '0'), slot)
        .then(() => {
          resolve(this);
      });
    });
  }

  /**
   * return: Promise<ItemTypes>
   * 
   * Get the type of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getType().then(function(type) {
   *   // The rest of your code here
   * });
   * ```
   */
  getType(): Promise<ItemTypes> {
    return new Promise(resolve => {
      let slot = iItem.attach(this._id);
      iItem.get('prop:type', slot).then(val => {
        this._type = ItemTypes[ItemTypes[Number(val)]];
        resolve(this._type);
      });
    });
  }

  /**
   * return: Promise<string>
   * 
   * Get the ID of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getID().then(function(id) {
   *   // The rest of your code here
   * });
   * ```
   */
  getID(): Promise<string> {
    return new Promise(resolve => {
      resolve(this._id);
    });
  }

  /**
   * return: Promise<number>
   * 
   * Get (1-indexed) Scene ID where the item is loaded
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getSceneID().then(function(id) {
   *   // The rest of your code here
   * });
   * ```
   */
  getSceneID(): Promise<number> {
    return new Promise(resolve => {
      resolve(Number(this._sceneID) + 1);
    });
  }

  /** Convert the Item object to an XML string */

  /**
   * return: XML
   * 
   * Convert the Item object to an XML object. Please use `toString()` method to get the 
   * XML String.
   * 
   * #### Usage
   * 
   * ```javascript
   * var xml = item.toXML();
   * ```
   */
  toXML(): XML {
    var item: JXON = new JXON();

    item['tag'] = 'item';
    item['name'] = this._name;
    item['item'] = this._value;
    item['type'] = this._type;
    item['selfclosing'] = true;

    if (this._cname) {
      item['cname'] = this._cname;
    }

    return XML.parseJSON(item);
  }

  /**
   * return: Promise<Item>
   * 
   * Get the current source (when function is called by sources), or the source
   * that was right-clicked to open the config window (when function is called
   * from the config window)
   * 
   * #### Usage
   * 
   * ```javascript
   * xjs.Item.getCurrentSource().then(function(item) {
   *   // This will fetch the current item (the plugin)
   * }).catch(function(err) {
   *   // Handle the error here. Errors would only occur
   *   // if we try to execute this method on Extension plugins
   * });
   * ```
   */
  static getCurrentSource(): Promise<Item> {
    return new Promise((resolve, reject) => {
      if (Environment.isExtension()) {
        reject(Error('Extensions do not have sources ' +
          'associated with them.'));
      } else if (Environment.isSourcePlugin() || Environment.isSourceConfig()) {
        Scene.searchAllForItemId(iItem.getBaseID()).then(item => {
          resolve(item); // this should always exist
        });
      }
    });
  }

   // ItemLayout

  /**
   * return: Promise<boolean>
   * 
   * Check if Aspect Ratio is set to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.isKeepAspectRatio().then(function(bool) {
   *   // The rest of your code here
   * });
   * ```
   */
  isKeepAspectRatio:        () => Promise<boolean>;

  /**
   * return: Promise<boolean>
   * 
   * Check if Position Locked is set to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.isPositionLocked().then(function(bool) {
   *   // The rest of your code here
   * });
   * ```
   */
  isPositionLocked:         () => Promise<boolean>;

  /**
   * return: Promise<boolean>
   * 
   * Check if Enhance Resize is Enabled or Disabled
   * 
   * #### Usage
   * 
   * ```javascript
   * item.isEnhancedResizeEnabled().then(function(bool) {
   *   // The rest of your code here
   * });
   * ```
   */
  isEnhancedResizeEnabled:   () => Promise<boolean>;

  /**
   * return: Promise<Rectangle>
   * 
   * Get the position of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getPosition().then(function(pos) {
   *   // The rest of your code here
   * });
   * ```
   */
  getPosition:              () => Promise<Rectangle>;

  /**
   * return: Promise<number>
   * 
   * Get Rotate Y value of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getRotateY().then(function(deg) {
   *   // The rest of your code here
   * });
   * ```
   */
  getRotateY:              () => Promise<number>;

  /**
   * return: Promise<number>
   * 
   * Get Rotate X value of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getRotateX().then(function(deg) {
   *   // The rest of your code here
   * });
   * ```
   */
  getRotateX:              () => Promise<number>;

  /**
   * return: Promise<number>
   * 
   * Get Rotate Z value of the item.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.getRotateX().then(function(deg) {
   *   // The rest of your code here
   * });
   * ```
   */
  getRotateZ:              () => Promise<number>;

  /**
   * param: (value: boolean)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Aspect Ratio to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setKeepAspectRatio(true).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setKeepAspectRatio:       (value: boolean) => Promise<Item>;

  /**
   * param: (value: boolean)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Position Lock to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setPositionLocked(true).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setPositionLocked:        (value: boolean) => Promise<Item>;

  /**
   * param: (value: boolean)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Enhance Resize to ON or OFF
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setEnhancedResizeEnabled(true).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setEnhancedResizeEnabled:  (value: boolean) => Promise<Item>;

  /**
   * param: (value: Rectangle)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Item position
   * 
   * #### Usage
   * 
   * ```javascript
   * var rect = xjs.Rectangle.fromCoordinates(0, 0, 1, 1);
   * item.setPosition(rect).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setPosition:              (value: Rectangle) => Promise<Item>;

  /**
   * param: (value: number)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Rotate Y value of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setRotateY(30).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setRotateY:              (value: number) => Promise<Item>;

  /**
   * param: (value: number)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Rotate X value of the item
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setRotateX(30).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setRotateX:              (value: number) => Promise<Item>;

  /**
   * param: (value: number)
   * ```
   * return: Promise<Item>
   * ```
   * 
   * Set Rotate Z value of the item. 
   * 
   * Please do note that this method will NOT automatically modify/calculate
   * the height and width of the item whenever you modify the rotate Z value,
   * unlike the behavior of XBC when modifying it through the properties window.
   * 
   * You will need to manually modify the height and width of the item each time
   * you modify this value to get the best results. If not, it might result to
   * the stretching and/or shrinking of the item.
   * 
   * #### Usage
   * 
   * ```javascript
   * item.setRotateZ(30).then(function(item) {
   *   // Promise would resolve current item instance
   * });
   * ```
   */
  setRotateZ:              (value: number) => Promise<Item>;
}

applyMixins(Item, [ItemLayout]);