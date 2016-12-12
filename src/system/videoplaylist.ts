/// <reference path="../../defs/es6-promise.d.ts" />

import {App as iApp} from '../internal/app';
import {Addable} from './iaddable';
import {JSON as JXON} from '../internal/util/json';
import {XML} from '../internal/util/xml';
import {IO} from '../util/io';
import {Environment} from '../core/environment';
/**
 *  Special class for adding a video playlist to the stage.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var VideoPlaylist = XJS.VideoPlaylist;
 *
 * var vids = new VideoPlaylist(['C:\\Users\\Public\\Music\\video1.mp4',
      'C:\\Users\\Public\\Music\\video2.mp4']).addToScene();
 * ```
 */
export class VideoPlaylist implements Addable {

  private _playlist: string[];
  private _id: number = 0;
  private _fileplaylist: string = '';
  private _testJSON: string;

  /**
   *  param: (files: string[])
   *
   *  Creates a VideoPlaylist object for several video files.
   */
  constructor(items: string[]) {
    this._playlist = items;
  }

  /**
   * return: XML
   *
   * Creates an XML object with the playlist properties. This method is used
   * internally for the `addToScene` method.
   */

  toXML(): Promise<string> {

    return new Promise((resolve, reject) => {
      let filePromises = this._playlist.map((filename) => {
        return new Promise(ioResolve => {
          IO.getVideoDuration(filename).then(duration => {
            ioResolve(duration);
          }).catch(err => {
            ioResolve(err);
          })
        })
      });

      Promise.all(filePromises).then(duration => {
        var fileItems = new JXON();

        let isError = false;

        if (this._playlist.length)
        {
          for (var i = 0; i < this._playlist.length; i++) {
            if (typeof duration[i] === 'object') {
              isError = true;
              break;
            }
            this._fileplaylist += this._playlist[i] + '*' + i + '*1*' +
              duration[i] + '*100*0*0*0*0*0|';
          }
          let _inner_this = this;
          if (!isError) {
            iApp.get('preset:0').then(function(main) {
              return iApp.get('presetconfig:' + main);
            }).then(function(presetConfig) {
              let placementJSON = JXON.parse(presetConfig);
              let defpos = placementJSON['defpos'];

              fileItems.tag = 'item';
              fileItems['type'] = '1';
              fileItems['name'] = 'Video Playlist';

              if (defpos === '0') {
                fileItems['pos_left'] = '0';
                fileItems['pos_top'] = '0';
                fileItems['pos_right'] = '0.5';
                fileItems['pos_bottom'] = '0.5';
              } else if (defpos === '1') {
                fileItems['pos_left'] = '0.5';
                fileItems['pos_top'] = '0';
                fileItems['pos_right'] = '1';
                fileItems['pos_bottom'] = '0.5';
              }  else if (defpos === '2') {
                fileItems['pos_left'] = '0';
                fileItems['pos_top'] = '0.5';
                fileItems['pos_right'] = '0.5';
                fileItems['pos_bottom'] = '1';
              } else if (defpos === '3') {
                fileItems['pos_left'] = '0.5';
                fileItems['pos_top'] = '0.5';
                fileItems['pos_right'] = '1';
                fileItems['pos_bottom'] = '1';
              } else {
                fileItems['pos_left'] = '0.25';
                fileItems['pos_top'] = '0.25';
                fileItems['pos_right'] = '0.75';
                fileItems['pos_bottom'] = '0.75';
              }
              fileItems['item'] = _inner_this._playlist[0] + '*0';
              fileItems['FilePlaylist'] = _inner_this._fileplaylist;

              resolve(XML.parseJSON(fileItems));

            });

          } else {
            reject(new Error('One or more files included are invalid.'));
          }
        } else {
          reject(new Error('No media file included.'));
        }
      });
    });
  }

  /**
   *  Adds the prepared video playlist to the current scene.
   *
   *  This function is not available to sources.
   */
  addToScene(): Promise <boolean> {
    return new Promise((resolve, reject) => {
      if (Environment.isSourcePlugin()) {
        reject(new Error('This function is not available to sources.'));
      } else {
        this.toXML().then(fileitem => {
          iApp.callFunc('additem', ' ' + fileitem)
          .then(() => { resolve(true) });
        }).catch(err => {
          reject(err);
        });
      }
    });
  }
}
