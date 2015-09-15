/// <reference path="../../defs/es6-promise.d.ts" />

import {exec} from '../internal/internal';

export class IO {

  /**
   * Returns a base-64 encoded string of the target file's contents.
   * UTF-8 encoded files may be decoded through:
   * ```javascript
   * var decodedContent = decodeURIComponent(escape(window.atob(base64Content));
   * ```
   */
  static getFileContent(path: string): Promise<string> {
    return new Promise(resolve => {
      resolve(exec('GetFileContent', path));
    });
  }

  /**
   * Returns a base-64 encoded string of the target endpoint's contents.
   * Redirects are resolved, and this bypasses access-control-allow-origin.
   *
   * UTF-8 encoded content may be decoded through:
   * ```javascript
   * var decodedContent = decodeURIComponent(escape(window.atob(base64Content));
   * ```
   */
  static getWebContent(url: string): Promise<string> {
    return new Promise(resolve => {
      exec('GetWebContent', url, encoded => {
        resolve(encoded);
      });
    });
  }

  /** Opens a URL in the user's default browser. URLs need to
   *
   */
  static openUrl(url: string) {
    exec('OpenUrl', url);
  }

  private static _ALLOW_MULTI_SELECT: number = 0x200;
  private static _FILE_MUST_EXIST: number = 0x1000;
  private static _FORCE_SHOW_HIDDEN: number = 0x10000000;

  /**
   * Opens a file dialog for the user to select a file (or multiple files).
   * Returns an array of strings, each of which contains the full path
   * and filename of a selected file. Rejects when the dialog is canceled.
   *
   * The first (optional) argument is a JSON object that can be used to indicate
   * that certain flags should be true. These are documented as follows:
   * - `allowMultiSelect`: allows users to select multiple files.
   * - `fileMustExist`: prevents users from typing a name of a nonexistent file
   * - `forceShowHidden`: lets the dialog show files marked as System or Hidden
   *  (but not both)
   *
   * The second argument (also optional) is a JSON object used to specify the
   * filter for items to be displayed. It takes two members:
   * - `name`: the description of the filter (for example: Image Files)
   * - `extensions`: an array of file extensions (for example: `['jpg','bmp']`);
   */
  static openFileDialog(optionBag ?: {
        allowMultiSelect ?: boolean,
        fileMustExist    ?: boolean,
        forceShowHidden  ?: boolean
      },
      filter ?: { name : boolean, extensions : String[] }): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let flags: number = 0;
      if (optionBag !== undefined && optionBag !== null) {
        if (optionBag.allowMultiSelect === true) {
          flags = flags | IO._ALLOW_MULTI_SELECT;
        }

        if (optionBag.fileMustExist === true) {
          flags = flags | IO._FILE_MUST_EXIST;
        }

        if (optionBag.forceShowHidden === true) {
          flags = flags | IO._FORCE_SHOW_HIDDEN;
        }
      }

      let filterString: string = '';
      if (filter !== undefined && filter !== null &&
          filter.name !== undefined && filter.extensions !== undefined) {
        filterString = filter.name + '|';
        filterString += (filter.extensions.map(val => {
          return '*.' + val;
        })).join(';');
        filterString += '||';
      }

      exec('OpenFileDialogAsync', null, null, String(flags), filterString,
          path => {
            if (path !== 'null') {
              resolve(path.split('|'));
            } else {
              reject(Error('File selection cancelled.'));
            }
      });
    });
  }
}
