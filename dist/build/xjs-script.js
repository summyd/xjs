/**
* @license
*
* XSplit Extensibility Framework and Plugin License
*
* Copyright (c) 2015, SplitmediaLabs Limited
* All rights reserved.
*
* Redistribution and use in source, minified or binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
*
* 2. Redistributions in minified or binary form must reproduce the above
*    copyright notice, this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
*
* 3. This software, in source, minified and binary forms, and any derivatives
*    hereof, may be used only with the purpose to extend the functionality of the
*    XSplit products, developed and published by SplitmediaLabs Limited. It may
*    specifically not be used for extending the functionality of any other software
*    products which enables live streaming and/or recording functions.
*
* 4. This software may not be used to circumvent paid feature restrictions for
*    free and personal licensees of the XSplit products.
*
* THIS SOFTWARE IS PROVIDED BY SPLITMEDIALABS LIMITED ''AS IS'' AND ANY EXPRESS OR
* IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL SPLITMEDIALABS LIMITED BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
* PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
* IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
* OF SUCH DAMAGE.
*/

/** XSplit JS Framework 

 version:3.0.0-alpha-1 */
var xjs = (function (exports) {
'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Color = function () {
    function Color(props) {
        if (props['rgb'] !== undefined) {
            this.setRgb(props['rgb']);
        } else if (props['irgb'] !== undefined) {
            this.setIrgb(props['irgb']);
        } else if (props['bgr'] !== undefined) {
            this.setBgr(props['bgr']);
        } else if (props['ibgr'] !== undefined) {
            this.setIbgr(props['ibgr']);
        } else if (props['isTransparent'] !== undefined && props['isTransparent'] === true) {
            this.setTransparent();
        } else {
            throw new Error('Do not call Color constructor without parameters.');
        }
    }
    Color.fromRGBString = function (rgb) {
        return new Color({ rgb: rgb });
    };
    Color.fromRGBInt = function (irgb) {
        return new Color({ irgb: irgb });
    };
    Color.fromBGRString = function (bgr) {
        return new Color({ bgr: bgr });
    };
    Color.fromBGRInt = function (ibgr) {
        return new Color({ ibgr: ibgr });
    };
    Color.fromTransparent = function () {
        return new Color({ isTransparent: true });
    };
    Color.prototype.getRgb = function () {
        return this._rgb;
    };
    Color.prototype.setRgb = function (rgb) {
        this._rgb = rgb.replace(/^#/, '').toUpperCase();
        this._irgb = parseInt(this._rgb, 16);
        this._bgr = [this._rgb.substring(4, 6), this._rgb.substring(2, 4), this._rgb.substring(0, 2)].join('').toUpperCase();
        this._ibgr = parseInt(this._bgr, 16);
        this._transparent = false;
        return this;
    };
    Color.prototype.getBgr = function () {
        return this._bgr;
    };
    Color.prototype.setBgr = function (bgr) {
        this.setRgb([bgr.substring(4, 6), bgr.substring(2, 4), bgr.substring(0, 2)].join(''));
        return this;
    };
    Color.prototype.getIrgb = function () {
        return this._irgb;
    };
    Color.prototype.setIrgb = function (irgb) {
        var rgb = irgb.toString(16);
        while (rgb.length < 6) {
            rgb = '0' + rgb;
        }
        this.setRgb(rgb);
        return this;
    };
    Color.prototype.getIbgr = function () {
        return this._ibgr;
    };
    Color.prototype.setIbgr = function (ibgr) {
        var bgr = ibgr.toString(16);
        while (bgr.length < 6) {
            bgr = '0' + bgr;
        }
        this.setBgr(bgr);
        return this;
    };
    Color.prototype.setTransparent = function () {
        this._rgb = '0';
        this._irgb = 0;
        this._bgr = '0';
        this._ibgr = 0;
        this._transparent = true;
        return this;
    };
    Color.prototype.isTransparent = function () {
        return this._transparent;
    };
    return Color;
}();

/**
 *  The Rectangle class is a utility class used in many different parts of the
 *  framework. Please note that there are cases where the framework uses
 *  absolute (pixel) measurements, and cases where relative measurements are
 *  required (0 being the left/top edges and 1 being the right/bottom edges.)
 *
 *  Please check the documentation of each function to determine the necessary
 *  parameters for the Rectangle to be created.
 */
var Rectangle = function () {
    function Rectangle() {}
    /** Gets the top value */
    Rectangle.prototype.getTop = function () {
        return this._top;
    };
    /** Sets the top value */
    Rectangle.prototype.setTop = function (top) {
        this._top = top;
        if (this._bottom !== undefined && this._height !== this._top - this._bottom) {
            this.setHeight(Math.abs(this._top - this._bottom));
        } else if (this._height !== undefined && this._bottom !== this._top + this._height) {
            this.setBottom(this._top + this._height);
        }
        return this;
    };
    /** Gets the left value */
    Rectangle.prototype.getLeft = function () {
        return this._left;
    };
    /** Sets the left value */
    Rectangle.prototype.setLeft = function (left) {
        this._left = left;
        if (this._right !== undefined && this._width !== Math.abs(this._right - this._left)) {
            this.setWidth(Math.abs(this._right - this._left));
        } else if (this._width !== undefined && this._height !== this._left + this._width) {
            this.setRight(this._left + this._width);
        }
        return this;
    };
    /** Gets the right value */
    Rectangle.prototype.getRight = function () {
        return this._right;
    };
    /** Sets the right value */
    Rectangle.prototype.setRight = function (right) {
        this._right = right;
        if (this._left !== undefined && this._width !== Math.abs(this._right - this._left)) {
            this.setWidth(Math.abs(this._right - this._left));
        } else if (this._width !== undefined && this._left !== this._right - this._width) {
            this.setLeft(this._right - this._width);
        }
        return this;
    };
    /** Gets the bottom value */
    Rectangle.prototype.getBottom = function () {
        return this._bottom;
    };
    /** Sets the bottom value */
    Rectangle.prototype.setBottom = function (bottom) {
        this._bottom = bottom;
        if (this._top !== undefined && this._height !== Math.abs(this._top - this._bottom)) {
            this.setHeight(Math.abs(this._top - this._bottom));
        } else if (this._height !== undefined && this._top !== this._bottom - this._height) {
            this.setTop(this._bottom - this._height);
        }
        return this;
    };
    /** Gets the width value */
    Rectangle.prototype.getWidth = function () {
        return this._width;
    };
    /** Sets the width value */
    Rectangle.prototype.setWidth = function (width) {
        this._width = width;
        if (this._right !== undefined && this._left !== this._right - this._width) {
            this.setLeft(this._right - this._width);
        } else if (this._left !== undefined && this._right !== this._left + this._width) {
            this.setRight(this._left + this._width);
        }
        return this;
    };
    /** Gets the height value */
    Rectangle.prototype.getHeight = function () {
        return this._height;
    };
    /** Sets the height value */
    Rectangle.prototype.setHeight = function (height) {
        this._height = height;
        if (this._top !== undefined && this._bottom !== this._top + this._height) {
            this.setBottom(this._top + this._height);
        } else if (this._bottom !== undefined && this._top !== this._bottom - this._height) {
            this.setTop(this._bottom - this._height);
        }
        return this;
    };
    /**
     *  param: (width: number, height: number)
     *  ```
     *  return: Rectangle
     *  ```
     *  Creates a rectangle from width and height dimensions. Absolute (pixels)
     *  and relative (0-1) dimensions are accepted. Refer to the documentation
     *  of each individual function to see which one is necessary.
     */
    Rectangle.fromDimensions = function (width, height) {
        if (width < 0 || height < 0) {
            throw new Error('Rectangle dimensions cannot be negative.');
        }
        var rect = new Rectangle();
        rect._width = width;
        rect._height = height;
        return rect;
    };
    /**
     *  param: (left: number, top: number, right: number, bottom: number)
     *  ```
     *  return: Rectangle
     *  ```
     *  Creates a rectangle from coordinates. Absolute (pixels)
     *  and relative (0-1) dimensions are accepted. Refer to the documentation
     *  of each individual function to see which one is necessary.
     */
    Rectangle.fromCoordinates = function (left, top, right, bottom) {
        if (top > bottom) {
            throw new Error('Top coordinate must be smaller than bottom.');
        } else if (left > right) {
            throw new Error('Right coordinate must be smaller than left.');
        }
        var rect = new Rectangle();
        rect._top = top;
        rect._left = left;
        rect.setRight(right); // calculates width
        rect.setBottom(bottom); // calculates height
        return rect;
    };
    /**
     *  return: string
     *
     *  Returns a comma-separated string containing the width and height values.
     */
    Rectangle.prototype.toDimensionString = function () {
        return this._width + ',' + this._height;
    };
    /**
     *  return: string
     *
     *  Returns a comma-separated string containing the coordinates in the order:
     *  left, top, right, bottom.
     */
    Rectangle.prototype.toCoordinateString = function () {
        if ([this._left, this._right, this._top, this._bottom].indexOf(undefined) > -1) {
            throw new Error('This Rectangle instance does not have coordinates.');
        } else {
            return this._left + ',' + this._top + ',' + this._right + ',' + this._bottom;
        }
    };
    /**
     *  return: string
     *  ```
     *  param: (format ?: string)
     *  ```
     *  Returns a string representation of the Rectangle object. If the format
     *  optional parameter is omitted, then this is simply the string from
     *  `toDimensionString()`. Sample usage:
     *
     *  ```javascript
     *  console.log(rect.toString('Origin is at (:left, :top)'));```
     *
     *  You can format the output string by specifying the following markers in
     *  the parameter:
     *  - :left
     *  - :top
     *  - :right
     *  - :bottom
     *  - :width
     *  - :height
     */
    Rectangle.prototype.toString = function (value) {
        if (value === undefined) {
            return this.toDimensionString(); // all rectangles have dimensions
        } else {
            var format = value;
            format = format.replace(':left', String(this._left));
            format = format.replace(':top', String(this._top));
            format = format.replace(':right', String(this._right));
            format = format.replace(':bottom', String(this._bottom));
            format = format.replace(':width', String(this._width));
            format = format.replace(':height', String(this._height));
            return format;
        }
    };
    return Rectangle;
}();

/*
* List here the versions where we would limit a functionality.
*/
var minVersion = '2.8.1603.0401';
var deleteSceneEventFixVersion = '2.8.1606.1601';
var addSceneEventFixVersion = '2.8.1606.1701';
var handlePreStreamDialogFixVersion = '3.1.1707.3101';
var globalsrcMinVersion = '2.9';
var itemSubscribeEventVersion = '2.9.1608.2301';
var mockVersion = '';
function versionCompare(version) {
    var parts = version.split('.');
    var comp = function comp(prev, curr, idx) {
        if (parts[idx] < curr && prev !== -1 || prev === 1) {
            return 1;
        } else if (parts[idx] > curr || prev === -1) {
            return -1;
        } else {
            return 0;
        }
    };
    return {
        is: {
            lessThan: function lessThan(compare) {
                var cParts = compare.split('.');
                return cParts.reduce(comp, parts[0]) === 1;
            },
            greaterThan: function greaterThan(compare) {
                var cParts = compare.split('.');
                return cParts.reduce(comp, parts[0]) === -1;
            },
            equalsTo: function equalsTo(compare) {
                var cParts = compare.split('.');
                return cParts.reduce(comp, parts[0]) === 0;
            },
            greaterThanOrEqualTo: function greaterThanOrEqualTo(compare) {
                var cParts = compare.split('.');
                return cParts.reduce(comp, parts[0]) === -1 || cParts.reduce(comp, parts[0]) === 0;
            }
        }
    };
}
function setMockVersion(version) {
    mockVersion = version;
}
function getVersion() {
    var xbcPattern = /XSplit Broadcaster\s(.*?)\s/;
    var xbcMatch = navigator.appVersion.match(xbcPattern);
    xbcMatch = xbcMatch || mockVersion.match(xbcPattern);
    if (xbcMatch !== null) {
        return xbcMatch[1];
    } else {
        throw new Error('not loaded in XSplit Broadcaster');
    }
}

/**
 * This class allows detection of the context in which the HTML is located.
 */
var Environment = function () {
    function Environment() {}
    /**
     * This method is only used internally.
     */
    Environment.initialize = function () {
        if (Environment._initialized) {
            return;
        }
        Environment._isSourcePlugin = window.external && window.external['GetConfiguration'] !== undefined;
        Environment._isSourceProps = window.external && window.external['GetConfiguration'] === undefined && window.external['GetViewId'] !== undefined && window.external['GetViewId']() !== undefined;
        Environment._isExtension = window.external && window.external['GetConfiguration'] === undefined && window.external['GetViewId'] !== undefined && window.external['GetViewId']() === undefined;
        Environment._initialized = true;
    };
    /**
     * return: boolean
     *
     * Determines if this HTML is running as a source.
     */
    Environment.isSourcePlugin = function () {
        return Environment._isSourcePlugin;
    };
    /**
     * return: boolean
     *
     * Determines if this HTML is running within the source properties window.
     */
    Environment.isSourceProps = function () {
        return Environment._isSourceProps;
    };
    /**
     * return: boolean
     *
     * Determines if this HTML is running as an extension plugin.
     */
    Environment.isExtension = function () {
        if (Remote.remoteType === 'remote') {
            return true;
        } else {
            return Environment._isExtension;
        }
    };
    return Environment;
}();
Environment.initialize();

var XML = function () {
    function XML(json) {
        var attributes = '';
        var value = '';
        if (json.value === undefined) {
            json.value = '';
        }
        for (var key in json) {
            if (!XML.RESERVED_ATTRIBUTES.test(key) && json[key] !== undefined) {
                attributes += [' ', key, '="', json[key], '"'].join('');
            }
        }
        if (json.children === undefined) {
            json.children = [];
        }
        for (var _i = 0, _a = json.children; _i < _a.length; _i++) {
            var child = _a[_i];
            json.value += new XML(child).toString();
        }
        if (json.selfclosing === true) {
            this.xml = ['<', json.tag, attributes, '/>'].join('');
        } else if (value !== '') {
            this.xml = ['<', json.tag, attributes, '>', value, '</', json.tag, '>'].join('');
        } else {
            // json actually contains text content
            this.xml = ['<', json.tag, attributes, '>', json.value, '</', json.tag, '>'].join('');
        }
    }
    XML.prototype.toString = function () {
        return this.xml;
    };
    XML.parseJSON = function (json) {
        return new XML(json);
    };
    XML.encode = function (str) {
        return str.replace(/[&<>'']/g, function ($0) {
            return '&' + {
                '&': 'amp',
                '<': 'lt',
                '>': 'gt',
                '\'': 'quot',
                '"': '#39'
            }[$0] + ';';
        });
    };
    XML.RESERVED_ATTRIBUTES = /^(children|tag|value|selfclosing)$/i;
    return XML;
}();

var JSON$1 = function () {
    function JSON(xml) {
        if (xml === undefined || xml === '') {
            return;
        }
        var sxml = xml;
        if (xml instanceof XML) {
            sxml = xml.toString();
        }
        var openingRegex = /<([^\s>\/]+)/g;
        var selfCloseRegex = /(\/>)/g;
        var openResult = openingRegex.exec(sxml);
        var selfCloseResult = selfCloseRegex.exec(sxml);
        sxml = sxml.replace(/&/g, '&amp;');
        var xmlDocument = new DOMParser().parseFromString(sxml, 'application/xml');
        if (xmlDocument.getElementsByTagName('parsererror').length > 0) {
            throw new Error('XML parsing error. Invalid XML string');
        }
        var processNode = function processNode(node) {
            var obj = new JSON();
            obj.tag = node.tagName;
            // FIXME: optimize complex condition
            // every time we process a new node, we advance the opening tag regex
            openResult = openingRegex.exec(sxml);
            if (openResult === null && selfCloseRegex.lastIndex === 0) {} else if (openResult === null && selfCloseRegex.lastIndex > 0) {
                // no more opening tags, so by default the self-closing belongs to this
                obj.selfclosing = true;
                selfCloseResult = selfCloseRegex.exec(sxml);
            } else if (openResult !== null && selfCloseRegex.lastIndex > openingRegex.lastIndex) {} else if (openResult !== null && selfCloseRegex.lastIndex < openingRegex.lastIndex && selfCloseRegex.lastIndex === openingRegex.lastIndex - openResult[0].length // make sure self-closing pattern belongs to
            ) {
                    obj.selfclosing = true;
                    selfCloseResult = selfCloseRegex.exec(sxml);
                }
            for (var i = 0; i < node.attributes.length; i++) {
                var att = node.attributes[i];
                obj[att.name] = att.value;
            }
            obj.children = [];
            // FIXME: self-closing nodes do not have children, maybe optimize then?
            for (var j = 0; j < node.childNodes.length; j++) {
                var child = node.childNodes[j];
                if (child instanceof Element) {
                    obj.children.push(processNode(child));
                }
            }
            // process text value
            if (obj.value === undefined && obj.children.length === 0) {
                delete obj.children;
                obj.value = node.textContent;
            }
            return obj;
        };
        return processNode(xmlDocument.childNodes[0]);
    }
    JSON.parse = function (xml) {
        return new JSON(xml);
    };
    return JSON;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
var App = function () {
    function App() {}
    /** Get the value of the given property */
    App.get = function (name) {
        return new Promise(function (resolve) {
            exec('AppGetPropertyAsync', name, resolve);
        });
    };
    /** Sets the value of a property */
    App.set = function (name, value) {
        return new Promise(function (resolve) {
            exec('AppSetPropertyAsync', name, value, function (ret) {
                resolve(Number(ret) < 0 ? false : true);
            });
        });
    };
    /** Gets the value of the given property as list */
    App.getAsList = function (name) {
        return new Promise(function (resolve, reject) {
            App.get(name).then(function (xml) {
                try {
                    var propsJSON = JSON$1.parse(xml),
                        propsArr = [];
                    if (propsJSON.children && propsJSON.children.length > 0) {
                        propsArr = propsJSON.children;
                    }
                    resolve(propsArr);
                } catch (e) {
                    reject(e);
                }
            });
        });
    };
    /** Get the value of the given global property */
    App.getGlobalProperty = function (name) {
        return new Promise(function (resolve) {
            exec('GetGlobalProperty', name).then(function (result) {
                resolve(result);
            });
        });
    };
    /** Calls a DLL function synchronously */
    App.callDll = function (func) {
        var _this = this;
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        var args = [].slice.call(arguments);
        return new Promise(function (resolve) {
            args.unshift('CallDll');
            exec.apply(_this, args).then(function (result) {
                resolve(result);
            });
        });
    };
    /** Calls an application method asynchronously */
    App.callFunc = function (func, arg) {
        return new Promise(function (resolve) {
            exec('AppCallFuncAsync', func, arg, function (ret) {
                resolve(ret);
            });
        });
    };
    App.postMessage = function (key) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve) {
            args.unshift(key);
            args.unshift('PostMessageToParent');
            args.push(function (val) {
                resolve(val);
            });
            exec.apply(_this, args);
        });
    };
    return App;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
var Item = function () {
    function Item() {}
    /** Prepare an item for manipulation */
    Item.attach = function (itemID, callBack) {
        var _this = this;
        return new Promise(function (resolve) {
            var slot = Item.itemSlotMap.indexOf(itemID);
            if (slot === -1) {
                slot = ++Item.lastSlot % Item.MAX_SLOTS;
                if (Item.islockedSourceSlot && slot === 0) {
                    ++slot; // source cannot attach to first slot
                }
                Item.lastSlot = slot;
                Item.itemSlotMap[slot] = itemID;
            }
            if (!Environment.isSourcePlugin()) {
                exec('SearchVideoItem' + (String(slot) === '0' ? '' : slot + 1), itemID);
            } else {
                var hasGlobalSources = versionCompare(getVersion()).is.greaterThan(minVersion);
                if (hasGlobalSources) {
                    exec('AttachVideoItem' + (slot + 1), itemID);
                } else {
                    exec('AttachVideoItem' + (String(slot) === '0' ? '' : slot + 1), itemID);
                }
            }
            if (callBack) {
                callBack.call(_this, slot);
            } else {
                resolve(slot);
            }
        });
    };
    /** used for source plugins. lock an id to slot 0 */
    Item.lockSourceSlot = function (itemID) {
        if (itemID !== undefined) {
            Item.islockedSourceSlot = true;
            Item.itemSlotMap[0] = itemID;
        } else {
            Item.islockedSourceSlot = false;
            Item.itemSlotMap[0] = '';
        }
    };
    /**
     * Helper function to check if the supplied item id still exist.
     */
    Item.wrapGet = function (name, srcId, id, updateId) {
        return new Promise(function (resolve) {
            if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                Item.get(name, id).then(function (val) {
                    resolve(val);
                });
            } else {
                Item.get('itemlist', id).then(function (itemlist) {
                    return new Promise(function (resolveInner) {
                        var itemsArray = itemlist.split(',');
                        if (itemsArray.indexOf(id) > -1 && itemsArray.length > 0 && itemsArray[0] !== 'null') {
                            resolveInner(itemsArray[0]);
                        } else {
                            var idMatch_1, sceneMatch_1;
                            App.getAsList('presetconfig').then(function (jsonArr) {
                                for (var i = 0; i < jsonArr.length; i++) {
                                    if (jsonArr[i].children !== undefined) {
                                        for (var j = 0; j < jsonArr[i].children.length; j++) {
                                            if (jsonArr[i].children[j]['srcid'] === srcId) {
                                                sceneMatch_1 = i;
                                                idMatch_1 = jsonArr[i].children[j]['id'];
                                                break;
                                            }
                                        }
                                    }
                                    if (idMatch_1 !== undefined) {
                                        break;
                                    }
                                }
                                if (idMatch_1 !== undefined) {
                                    return new Promise(function (previewResolve) {
                                        previewResolve('');
                                    });
                                } else {
                                    return new Promise(function (previewResolve, previewReject) {
                                        App.getAsList('presetconfig:i12').then(function (previewJSONArr) {
                                            var previewMatch = '';
                                            for (var k = 0; k < previewJSONArr.length; ++k) {
                                                if (previewJSONArr[k]['srcid'] === srcId) {
                                                    previewMatch = previewJSONArr[k]['id'];
                                                    break;
                                                }
                                            }
                                            previewResolve(previewMatch);
                                        }).catch(function (e) {
                                            previewReject(e);
                                        });
                                    });
                                }
                            }).then(function (previewId) {
                                if (previewId !== '') {
                                    idMatch_1 = previewId;
                                    sceneMatch_1 = 'i12';
                                }
                                if (idMatch_1 !== undefined) {
                                    updateId(idMatch_1, sceneMatch_1);
                                    resolveInner(idMatch_1);
                                } else {
                                    resolveInner(id);
                                }
                            }).catch(function (e) {
                                resolveInner(id);
                            });
                        }
                    });
                }).then(function (resultId) {
                    Item.get(name, resultId).then(function (val) {
                        resolve(val);
                    });
                });
            }
        });
    };
    /** Get an item's local property asynchronously */
    Item.get = function (name, id) {
        return new Promise(function (resolve) {
            var hasGlobalSources = versionCompare(getVersion()).is.greaterThan(minVersion);
            var execCallFunc = function execCallFunc(slot) {
                if (!Environment.isSourcePlugin() && String(slot) === '0' || Environment.isSourcePlugin() && String(slot) === '0' && !hasGlobalSources) {
                    slot = -1;
                }
                exec('GetLocalPropertyAsync' + (String(slot) === '-1' ? '' : Number(slot) + 1), name, function (val) {
                    resolve(val);
                });
            };
            var checkSlot = function checkSlot(recId) {
                if (id) {
                    Item.attach(id, execCallFunc);
                } else {
                    execCallFunc(-1);
                }
            };
            checkSlot(id);
        });
    };
    /**
     * Helper function to check if the supplied item id still exist.
     */
    Item.wrapSet = function (name, value, srcId, id, updateId) {
        return new Promise(function (resolve) {
            if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                Item.set(name, value, id).then(function (val) {
                    resolve(val);
                });
            } else {
                Item.get('itemlist', id).then(function (itemlist) {
                    return new Promise(function (resolveInner) {
                        var itemsArray = itemlist.split(',');
                        if (itemsArray.indexOf(id) > -1 && itemsArray.length > 0 && itemsArray[0] !== 'null') {
                            resolveInner(itemsArray[0]);
                        } else {
                            var idMatch_2, sceneMatch_2;
                            App.getAsList('presetconfig').then(function (jsonArr) {
                                for (var i = 0; i < jsonArr.length; i++) {
                                    if (jsonArr[i].children !== undefined) {
                                        for (var j = 0; j < jsonArr[i].children.length; j++) {
                                            if (jsonArr[i].children[j]['srcid'] === srcId) {
                                                sceneMatch_2 = i;
                                                idMatch_2 = jsonArr[i].children[j]['id'];
                                                break;
                                            }
                                        }
                                    }
                                    if (idMatch_2 !== undefined) {
                                        break;
                                    }
                                }
                                if (idMatch_2 !== undefined) {
                                    return new Promise(function (previewResolve) {
                                        previewResolve('');
                                    });
                                } else {
                                    return new Promise(function (previewResolve, previewReject) {
                                        App.getAsList('presetconfig:i12').then(function (previewJSONArr) {
                                            var previewMatch = '';
                                            for (var k = 0; k < previewJSONArr.length; ++k) {
                                                if (previewJSONArr[k]['srcid'] === srcId) {
                                                    previewMatch = previewJSONArr[k]['id'];
                                                    break;
                                                }
                                            }
                                            previewResolve(previewMatch);
                                        }).catch(function (e) {
                                            previewReject(e);
                                        });
                                    });
                                }
                            }).then(function (previewId) {
                                if (previewId !== '') {
                                    idMatch_2 = previewId;
                                    sceneMatch_2 = 'i12';
                                }
                                if (idMatch_2 !== undefined) {
                                    updateId(idMatch_2, sceneMatch_2);
                                    resolveInner(idMatch_2);
                                } else {
                                    resolveInner(id);
                                }
                            }).catch(function (e) {
                                resolveInner(id);
                            });
                        }
                    });
                }).then(function (resultId) {
                    Item.set(name, value, resultId).then(function (val) {
                        resolve(val);
                    });
                });
            }
        });
    };
    /** Sets an item's local property */
    Item.set = function (name, value, id) {
        return new Promise(function (resolve) {
            var slotPromise;
            var slot;
            if (id !== undefined && id !== null) {
                slotPromise = new Promise(function (slotResolve) {
                    Item.attach(id).then(function (res) {
                        slotResolve(res);
                    });
                });
            } else {
                slotPromise = new Promise(function (slotResolve) {
                    slotResolve(-1);
                });
            }
            slotPromise.then(function (newSlot) {
                slot = newSlot;
                var hasGlobalSources = versionCompare(getVersion()).is.greaterThan(minVersion);
                if (!Environment.isSourcePlugin() && String(slot) === '0' || Environment.isSourcePlugin() && String(slot) === '0' && !hasGlobalSources) {
                    slot = -1;
                }
                exec('SetLocalPropertyAsync' + (String(slot) === '-1' ? '' : slot + 1), name, value, function (val) {
                    resolve(!(Number(val) < 0));
                });
            });
        });
    };
    /** For SourceProps and XBC version 2.7 below */
    Item.setBaseId = function (id) {
        Item.baseID = id;
    };
    /** For SourceProps and XBC version 2.7 below */
    Item.getBaseId = function () {
        return Item.baseID;
    };
    Item.MAX_SLOTS = 2;
    Item.lastSlot = Item.MAX_SLOTS - 1;
    Item.itemSlotMap = [];
    Item.islockedSourceSlot = false;
    return Item;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
var Global = function () {
    function Global() {}
    Global.addInitializationPromise = function (promise) {
        Global.initialPromises.push(promise);
    };
    Global.getInitializationPromises = function () {
        return Global.initialPromises;
    };
    Global.setPersistentConfig = function (config) {
        Global.persistedConfig = config;
    };
    Global.getPersistentConfig = function () {
        return Global.persistedConfig;
    };
    Global.persistedConfig = {};
    Global.initialPromises = [];
    return Global;
}();

// simple event emitter
var EventEmitter = function () {
    function EventEmitter() {
        this._handlers = {};
    }
    /** This function attaches a handler to an event. Duplicate handlers are allowed. */
    EventEmitter.prototype.on = function (event, handler, id) {
        if (Remote.remoteType === 'remote') {
            var id_1 = new Date().getTime() + '_' + Math.floor(Math.random() * 1000);
            var message = {
                event: event,
                id: id,
                type: 'event-emitter'
            };
            if (EventEmitter._remoteHandlers[id_1] === undefined) {
                EventEmitter._remoteHandlers[id_1] = [];
            }
            EventEmitter._remoteHandlers[id_1].push(handler);
            Remote.sendMessage(encodeURIComponent(JSON.stringify(message)));
        } else if (Remote.remoteType === 'proxy') {
            if (EventEmitter._proxyHandlers[id] === undefined) {
                EventEmitter._proxyHandlers[id] = [];
            }
            EventEmitter._proxyHandlers[id].push(handler);
        } else {
            if (this._handlers[event] === undefined) {
                this._handlers[event] = [];
            }
            this._handlers[event].push(handler);
        }
    };
    /** This function removes a handler to an event.*/
    EventEmitter.prototype.off = function (event, handler) {
        if (Remote.remoteType === 'remote') {
            if (EventEmitter._remoteHandlers[event] !== undefined) {
                for (var i = EventEmitter._remoteHandlers[event].length - 1; i >= 0; i--) {
                    if (EventEmitter._remoteHandlers[event][i] === handler) {
                        EventEmitter._remoteHandlers[event].splice(i, 1);
                    }
                }
            }
        } else if (Remote.remoteType === 'proxy') {
            if (EventEmitter._proxyHandlers[event] !== undefined) {
                for (var i = EventEmitter._proxyHandlers[event].length - 1; i >= 0; i--) {
                    if (EventEmitter._proxyHandlers[event][i] === handler) {
                        EventEmitter._proxyHandlers[event].splice(i, 1);
                    }
                }
            }
        } else {
            if (this._handlers[event] !== undefined) {
                for (var i = this._handlers[event].length - 1; i >= 0; i--) {
                    if (this._handlers[event][i] === handler) {
                        this._handlers[event].splice(i, 1);
                    }
                }
            }
        }
    };
    /** This function lets an event trigger with any number of supplied parameters. */
    EventEmitter.prototype.emit = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (Remote.remoteType === 'proxy') {
            if (EventEmitter._proxyHandlers[event] === undefined) {
                return;
            }
            for (var _a = 0, _b = EventEmitter._proxyHandlers[event]; _a < _b.length; _a++) {
                var handler = _b[_a];
                handler.apply(this, params);
            }
        } else {
            if (this._handlers[event] === undefined) {
                return;
            }
            for (var _c = 0, _d = this._handlers[event]; _c < _d.length; _c++) {
                var handler = _d[_c];
                handler.apply(this, params);
            }
        }
    };
    EventEmitter._setCallback = function (message) {
        return new Promise(function (resolve) {
            if (EventEmitter._proxyHandlers[message[0]] === undefined) {
                EventEmitter._proxyHandlers[message[0]] = [];
            }
            resolve(EventEmitter._proxyHandlers[message[0]].push(message[1]));
        });
    };
    EventEmitter._finalCallback = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            var result = JSON.parse(decodeURIComponent(message));
            if (EventEmitter._remoteHandlers[result['id']] !== undefined) {
                for (var _i = 0, _a = EventEmitter._remoteHandlers[result['id']]; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.apply(_this, [result['result']]);
                }
            }
            resolve();
        });
    };
    EventEmitter._remoteHandlers = {};
    EventEmitter._proxyHandlers = {};
    return EventEmitter;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/** This utility class exposes functionality for source plugin developers to
 *  handle the properties window for their source plugins. The framework also
 *  uses this class for its own internal purposes.
 *
 *  Developers can use this class to specify how their configuration HTML
 *  should be rendered within the built-in window in XSplit Broadcaster.
 *  This class also serves as an event emitter for specific important events.
 *
 * Inherits from: {@link #util/EventEmitter Util/EventEmitter}
 *
 *  At the moment, the only relevant event for developers is:
 *    - `set-selected-tab`: used when using Tabbed mode. Passes the name of the selected tab so properties window can update itself accordingly.
 *
 *  Use the `on(event: string, handler: Function)` function to listen to an event.
 */
var SourcePropsWindow = function (_super) {
    __extends(SourcePropsWindow, _super);
    /**
     *  Use getInstance() instead.
     */
    function SourcePropsWindow() {
        var _this = this;
        _super.call(this);
        if (!Environment.isSourceProps()) {
            throw new Error('SourcePropsWindow class is only available for source properties');
        }
        if (Remote.remoteType === 'remote') {
            throw new Error("Unable to listen to SourcePropsWindow events through Remote");
        } else {
            window.addEventListener('message', function (event) {
                try {
                    var data = JSON.parse(event.data);
                } catch (e) {
                    // syntax error probably happened, exit gracefully
                    return;
                }
                switch (data.event) {
                    // currently, restrict messages to selected set
                    case 'set-selected-tab':
                        this.emit(data.event, data.value);
                        break;
                    case 'async-callback':
                        this.emit(data.event, {
                            asyncId: data.value.asyncId,
                            result: data.value.result
                        });
                        break;
                }
            }.bind(this));
            this.on('config-load', function () {
                _this._informConfigLoaded();
            });
            SourcePropsWindow._instance = this;
        }
    }
    /**
     *  Gets the instance of the window utility. Use this instead of the constructor.
     */
    SourcePropsWindow.getInstance = function () {
        if (SourcePropsWindow._instance === undefined) {
            SourcePropsWindow._instance = new SourcePropsWindow();
        }
        return SourcePropsWindow._instance;
    };
    // helper function to communicate with built-in container
    SourcePropsWindow.prototype._notify = function (obj) {
        window.parent.postMessage(JSON.stringify(obj), '*');
    };
    /**
     *  Informs the application that the plugin intends to use the entire window for rendering its configuration.
     */
    SourcePropsWindow.prototype.useFullWindow = function () {
        this._setRenderMode(SourcePropsWindow._MODE_FULL);
        // use default size to avoid layout issues. plugin can resize later
        this.resize(354, 390);
    };
    /**
     *  param: ({customTabs: string[], tabOrder: string[]})
     *
     *  Informs the application that the plugin intends to use the existing tab
     *  system to render its properties window.
     *
     *  The `customTabs` node should contain a list of tab titles that the plugin
     *  will create for itself.
     *
     *  The `tabOrder` node contains the desired order of tabs. This list comes
     *  from the specified custom tabs, and the set of reusable XSplit tabs:
     *  'Color', 'Layout' and 'Transition'.
     */
    SourcePropsWindow.prototype.useTabbedWindow = function (config) {
        this._setRenderMode(SourcePropsWindow._MODE_TABBED);
        this._declareCustomTabs(config.customTabs);
        this._setTabOrder(config.tabOrder);
    };
    SourcePropsWindow.prototype._setRenderMode = function (renderMode) {
        this._mode = renderMode;
        this._notify({
            event: 'set-mode',
            value: renderMode
        });
    };
    
    SourcePropsWindow.prototype._setTabOrder = function (tabArray) {
        this._notify({
            event: 'set-tab-order',
            value: JSON.stringify(tabArray)
        });
    };
    
    SourcePropsWindow.prototype._declareCustomTabs = function (tabArray) {
        this._notify({
            event: 'set-custom-tabs',
            value: JSON.stringify(tabArray)
        });
    };
    
    SourcePropsWindow.prototype._informConfigLoaded = function () {
        this._notify({ event: 'load' });
    };
    /**
     *  param: width<number>, height<number>
     *
     *  Resizes the properties window. Currently only works when using full
     *  window mode.
     */
    SourcePropsWindow.prototype.resize = function (width, height) {
        this._notify({
            event: 'resize',
            value: JSON.stringify({
                width: width,
                height: height
            })
        });
    };
    
    /**
     *  param: name<string>
     *
     *  Changes the title of the source properties dialog.
     *  Note: The title change is temporary, as re-opening the source properties
     *  resets the title to the display name of the source
     *  (custom name takes precedence over name)
     */
    SourcePropsWindow.prototype.requestDialogTitleChange = function (name) {
        this._notify({
            event: 'change-dialog-title',
            value: name
        });
    };
    
    /** Closes the properties window. */
    SourcePropsWindow.prototype.close = function () {
        return new Promise(function (resolve) {
            resolve(exec('Close'));
        });
    };
    
    SourcePropsWindow._MODE_FULL = 'full';
    SourcePropsWindow._MODE_TABBED = 'embedded';
    return SourcePropsWindow;
}(EventEmitter);

/// <reference path="../../defs/es6-promise.d.ts" />
function resolveRelativePath(path, base) {
    // ABSOLUTE PATHS
    if (path.substring(0, 7) === 'http://' || path.substring(0, 8) === 'https://') {
        return path;
    } else if (path.substring(0, 2) === '//') {
        // get current protocol
        return base.split('://')[0] + ':' + path;
    } else if (path.substring(0, 3) === '../') {
        // RELATIVE PATHS
        var upDirectoryCount = 0;
        // count ../ segments
        while (path.substring(0, 3) === '../') {
            path = path.substring(3);
            ++upDirectoryCount;
        }
        var baseDirectories = base.split('/');
        baseDirectories = baseDirectories.slice(0, length - 1 - upDirectoryCount);
        baseDirectories.push(path);
        return baseDirectories.join('/');
    } else {
        if (path.substring(0, 2) === './') {
            path = path.substring(2);
        }
        var baseSegments = base.split('/');
        baseSegments[baseSegments.length - 1] = path;
        return baseSegments.join('/');
    }
}
function readMetaConfigUrl() {
    return new Promise(function (resolve) {
        if (Environment.isSourcePlugin()) {
            var configObj = {};
            // initialize config URL if necessary
            var promise = new Promise(function (resolveInner) {
                exec('GetLocalPropertyAsync', 'prop:BrowserConfiguration', function (result) {
                    resolveInner(result);
                });
            });
            promise.then(function (browserConfig) {
                try {
                    if (browserConfig === '' || browserConfig === 'null') {
                        browserConfig = exec('GetConfiguration');
                    }
                    configObj = JSON.parse(browserConfig);
                } catch (e) {} finally {
                    var metas = document.getElementsByTagName('meta');
                    for (var i = metas.length - 1; i >= 0; i--) {
                        if (metas[i].name === 'xsplit:config-url') {
                            var url = resolveRelativePath(metas[i].content, window.location.href);
                            configObj['configUrl'] = url;
                            var persist = {
                                configUrl: url
                            };
                            Global.setPersistentConfig(persist);
                            break;
                        }
                    }
                    exec('SetBrowserProperty', 'Configuration', JSON.stringify(configObj));
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}
function getCurrentSourceId() {
    return new Promise(function (resolve) {
        if (Environment.isSourceProps() || Environment.isSourcePlugin() && versionCompare(getVersion()).is.lessThan(minVersion)) {
            // initialize Item.getSource() functions
            exec('GetLocalPropertyAsync', 'prop:id', function (result) {
                var id = result;
                Item.setBaseId(id);
                if (Environment.isSourcePlugin() || Environment.isSourceProps()) {
                    Item.lockSourceSlot(id);
                }
                resolve();
            });
        } else {
            resolve();
        }
    });
}
function informWhenConfigLoaded() {
    return new Promise(function (resolve) {
        if (Environment.isSourceProps()) {
            window.addEventListener('load', function () {
                try {
                    SourcePropsWindow.getInstance().emit('config-load');
                } catch (e) {}
                resolve();
            });
        } else {
            resolve(); // other environments don't care if config iframe has loaded
        }
    });
}
function init() {
    Global.addInitializationPromise(readMetaConfigUrl());
    Global.addInitializationPromise(getCurrentSourceId());
    Global.addInitializationPromise(informWhenConfigLoaded());
    Promise.all(Global.getInitializationPromises()).then(function () {
        document.dispatchEvent(new CustomEvent('xsplit-js-ready', {
            bubbles: true
        }));
    });
}

/// <reference path="../../defs/es6-promise.d.ts" />
var isReady = false;
var isInit = false;
var readyResolve;
var readyPromise = new Promise(function (resolve) {
    document.addEventListener('xsplit-js-ready', function () {
        resolve();
    });
    if (isReady) {
        resolve();
    }
});
function finishReady(config) {
    var _this = this;
    return new Promise(function (resolve) {
        if (config && config['version'] !== undefined) {
            setMockVersion(config['version']);
        }
        setReady();
        if (isReady && !isInit) {
            setOnce();
            init();
        }
        if (readyResolve !== undefined && Remote.remoteType === 'remote') {
            readyResolve.call(_this, null);
        }
        resolve(readyPromise);
    });
}
function ready(config) {
    return new Promise(function (resolve, reject) {
        if (config && config['remote'] !== undefined) {
            if (config['remote']['type'] !== undefined) {
                Remote.remoteType = config['remote']['type'];
            }
            if (config['remote']['sendMessage'] !== undefined && config['remote']['sendMessage'] instanceof Function) {
                Remote.sendMessage = config['remote']['sendMessage'];
            } else {
                reject(Error('Send message should be instance of function.'));
            }
        }
        if (Remote.remoteType === 'remote') {
            // Create a callback that would resolve ready()
            // Resolve ready() for Remote once finishReady was already called.
            readyResolve = function readyResolve() {
                resolve();
            };
            Remote.sendMessage('getVersion');
        } else {
            resolve(finishReady(config));
        }
    });
}
function setReady() {
    isReady = true;
}
function setOnce() {
    isInit = true;
}

/// <reference path="../../defs/es6-promise.d.ts" />
var Extension = function () {
    function Extension() {
        if (Environment.isExtension()) {
            this._presName = window.location.href;
        } else {
            throw new Error('Extension class can only be used on Extension Plugins');
        }
    }
    /**
     *  Gets the instance of the Extension class. Use this instead of the constructor.
     */
    Extension.getInstance = function () {
        if (Extension._instance === undefined) {
            Extension._instance = new Extension();
        }
        Extension._instance.getId().then(function (id) {
            Extension._instance._id = String(id);
        });
        return Extension._instance;
    };
    /**
     * param: (configObj: JSON)
     * ```
     * return: Promise<ExtensionWindow|Error>
     * ```
     *
     * Save the configuration object to the presentation
     */
    Extension.prototype.saveConfig = function (configObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ({}.toString.call(configObj) === '[object Object]') {
                exec('SetPresProperty', _this._presName, JSON.stringify(configObj)).then(function (result) {
                    resolve(_this);
                });
            } else {
                reject(Error('Configuration object should be in JSON format'));
            }
        });
    };
    /**
     * return: Promise<JSON>
     *
     * Get the saved configuration from the presentation
     */
    Extension.prototype.loadConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            exec('GetPresProperty', _this._presName, function (config) {
                var configObj = config === '' ? {} : JSON.parse(config);
                resolve(configObj);
            });
        });
    };
    /**
     *  return: Promise<string>
     *
     *  Get the extension id.
     */
    Extension.prototype.getId = function (handler) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._id === undefined) {
                if (Remote.remoteType === 'remote') {
                    var message = {
                        type: 'extWindow',
                        instance: Extension._instance
                    };
                    Extension._remoteCallback['ExtensionWindowID'] = { resolve: resolve };
                    Remote.sendMessage(encodeURIComponent(JSON.stringify(message)));
                } else if (Remote.remoteType === 'proxy') {
                    Extension._proxyCallback['ExtensionWindowID'] = handler;
                    App.postMessage("8");
                } else {
                    Extension._callback['ExtensionWindowID'] = { resolve: resolve };
                    App.postMessage("8");
                }
            } else {
                resolve(_this._id);
            }
        });
    };
    Extension._finalCallback = function (message) {
        return new Promise(function (resolve) {
            var result = JSON.parse(decodeURIComponent(message));
            Extension._remoteCallback['ExtensionWindowID'].resolve(result['result']);
        });
    };
    Extension._proxyCallback = {};
    Extension._remoteCallback = {};
    Extension._callback = {};
    return Extension;
}();
var oldSetid = window.Setid;
window.Setid = function (id) {
    if (Remote.remoteType === 'proxy') {
        Extension._proxyCallback['ExtensionWindowID'].call(this, id);
    } else {
        Extension._callback['ExtensionWindowID'].resolve(id);
    }
    if (typeof oldSetid === 'function') {
        oldSetid(id);
    }
};

/**
 * The StreamInfo class provides methods to monitor the current active streams
 *  activity and other details.
 *
 * This can be used together with {@link #core/Output Output Class} and check
 * the details of the currently live outputs.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.ready()
 * .then(xjs.StreamInfo.getActiveStreamChannels)
 * .then(function(channels) {
 *   var stream = []
 *   channels.forEach(function(channel){
 *     channel.getName()
 *     .then(name => {
 *       if(name.includes('Twitch')) {
 *         stream.push(channel)
 *       }
 *     })
 *   })
 *   return stream
 * }).then(function(stream) {
 *   // Get any stream information you need here
 *   return stream[0].getStreamRenderedFrames()
 * })
 * ```
 */
var StreamInfo = function () {
    /** StreamInfo constructor (only used internally) */
    function StreamInfo(props) {
        this._name = props.name;
        this._stat = props.stat;
        this._channel = props.channel;
    }
    /**
     *  return: Promise<StreamInfo[]>
     *
     *  Gets the list of currently active channels.
     */
    StreamInfo.getActiveStreamChannels = function () {
        return new Promise(function (resolve) {
            App.getAsList('recstat').then(function (activeStreams) {
                if (activeStreams.length === 0) {
                    resolve([]);
                } else {
                    var channels = [];
                    for (var i = 0; i < activeStreams.length; ++i) {
                        channels.push(new StreamInfo({
                            name: activeStreams[i]['name'],
                            stat: activeStreams[i].children.filter(function (child) {
                                return child.tag.toLowerCase() === 'stat';
                            })[0],
                            channel: activeStreams[i].children.filter(function (child) {
                                return child.tag.toLowerCase() === 'channel';
                            })[0]
                        }));
                    }
                    resolve(channels);
                }
            });
        });
    };
    /**
     *  return: Promise<string>
     *
     *  Gets the name of the channel.
     */
    StreamInfo.prototype.getName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this._name);
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the number of frames dropped
     */
    StreamInfo.prototype.getStreamDrops = function () {
        var _this = this;
        return new Promise(function (resolve) {
            App.get('streamdrops:' + _this._name).then(function (val) {
                var drops = val.split(','),
                    dropped = Number(drops[0]) || 0;
                resolve(dropped);
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the number of GOP frames dropped
     */
    StreamInfo.prototype.getGOPDrops = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var usage;
            App.getGlobalProperty('bandwidthusage-all').then(function (result) {
                usage = JSON.parse(result);
                for (var i = 0; i < usage.length; i++) {
                    if (usage[i].ChannelName === _this._name) {
                        resolve(usage[i].Dropped);
                    }
                }
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the number of frames rendered
     */
    StreamInfo.prototype.getStreamRenderedFrames = function () {
        var _this = this;
        return new Promise(function (resolve) {
            App.get('streamdrops:' + _this._name).then(function (val) {
                var drops = val.split(','),
                    rendered = Number(drops[1]) || 0;
                resolve(rendered);
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the current duration of the stream in microseconds
     */
    StreamInfo.prototype.getStreamTime = function () {
        var _this = this;
        return new Promise(function (resolve) {
            App.get('streamtime:' + _this._name).then(function (val) {
                var duration = Number(val) / 10;
                resolve(duration);
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the current bandwidth usage of the stream
     */
    StreamInfo.prototype.getBandwidthUsage = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var usage;
            if (_this._name !== 'Local Recording') {
                App.getGlobalProperty('bandwidthusage-all').then(function (result) {
                    usage = JSON.parse(result);
                    for (var i = 0; i < usage.length; i++) {
                        if (usage[i].ChannelName === _this._name) {
                            resolve(usage[i].AvgBitrate);
                        }
                    }
                });
            } else {
                resolve(0);
            }
        });
    };
    return StreamInfo;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The Output class provides methods to start and stop a stream/recording
 * and pause or unpause a Local Recording.
 *
 * This can be used together with {@link #core/StreamInfo StreamInfo Class},
 * where you can check the status of the outputs you start.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 * var streamName;
 * xjs.Output.getOutputList()
 * .then(function(outputs) {
 *   outputs.map(output => {
 *    output.getName()
 *    .then(function(name) {
 *      // You can also save the name on a variable to be able to use it
 *      // when checking for the stream info.
 *      if(name.includes('Twitch')) {
 *        streamName = name
 *        output.startBroadcast();
 *      }
 *    })
 *  })
 * })
 * ```
 *
 * Once there's an active stream, StreamInfo class can be used at any time to
 * check the stream status of that output.
 *
 * ```javascript
 * xjs.StreamInfo.getActiveStreamChannels
 * .then(function(channels) {
 *   var stream = []
 *   channels.forEach(function(channel){
 *     channel.getName()
 *     .then(name => {
 *       if(name === streamName) {
 *         stream.push(channel)
 *       }
 *     })
 *   })
 *   return stream
 * }).then(function(stream) {
 *   // Get any stream information you need here
 *   return stream[0].getStreamRenderedFrames()
 * })
 * ```
 */
var Output = function () {
    function Output(props) {
        this._name = props.name;
    }
    /**
     * param: (id: string)
     *
     * ```
     * return Promise<Output[]>
     * ```
     *
     * Fetch all available Outputs you can broadcast on based on your installed
     * Broadcast plugin.
     *
     * ### Basic Usage
     *
     * ```javascript
     * var xjs = require('xjs');
     *
     * xjs.Output.getOutputList()
     * .then(function(outputs) {
     *   outputs.map(output => {
     *    output.getName()
     *    .then(function(name) {
     *      if(name.includes('Twitch')) {
     *        output.startBroadcast({
     *          suppressPrestreamDialog : true
     *        });
     *      }
     *    })
     *  })
     * })
     * ```
     */
    Output.getOutputList = function () {
        return new Promise(function (resolve, reject) {
            var _checkId;
            if (Environment.isExtension()) {
                _checkId = Extension.getInstance().getId();
            } else if (Environment.isSourcePlugin()) {
                _checkId = Item.get('itemlist').then(function (result) {
                    var results = result.split(',');
                    return results[0];
                });
            } else {
                _checkId = new Promise(function (innerResolve, innerReject) {
                    innerReject(Error('Outputs class is only accessible from Source Plugins and Extensions.'));
                });
            }
            _checkId.then(function (id) {
                Output._getBroadcastChannels(id).then(function (result) {
                    var results = JSON$1.parse(result);
                    var channels = [];
                    for (var i = 0; i < results.children.length; i++) {
                        channels.push(new Output({
                            name: results.children[i]['name']
                        }));
                    }
                    resolve(channels);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     *  return: Promise<string>
     *
     *  Gets the name of the Output.
     */
    Output.prototype.getName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this._name);
        });
    };
    /**
     * param: ([options]) -- see below
     *
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Start a broadcast of the provided channel.
     *
     * Accepts an optional JSON object argument,
     * which can be used to indicate certain flags, such as (additional options may be added):
     * - `suppressPrestreamDialog` : used to bypass the showing of the pre-stream dialog
     *  of the outputs supporting it, will use last settings provided
     */
    Output.prototype.startBroadcast = function (optionBag) {
        var _this = this;
        return new Promise(function (resolve) {
            if (versionCompare(getVersion()).is.greaterThanOrEqualTo(handlePreStreamDialogFixVersion) && typeof optionBag !== 'undefined' && optionBag !== null && optionBag['suppressPrestreamDialog']) {
                exec('CallHostFunc', 'startBroadcast', _this._name, 'suppressPrestreamDialog=1');
                resolve(true);
            } else {
                exec('CallHost', 'startBroadcast', _this._name);
                resolve(true);
            }
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Stop a broadcast of the provided channel.
     */
    Output.prototype.stopBroadcast = function () {
        var _this = this;
        return new Promise(function (resolve) {
            exec('CallHost', 'stopBroadcast', _this._name);
            resolve(true);
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Pause a local recording.
     */
    Output.prototype.pauseLocalRecording = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._name === 'Local Recording') {
                StreamInfo.getActiveStreamChannels().then(function (channels) {
                    Output._localRecording = false;
                    for (var i = 0; i < channels.length; i++) {
                        if (channels[i]['_name'] === 'Local Recording') {
                            Output._localRecording = true;
                            break;
                        }
                    }
                    if (Output._localRecording) {
                        exec('CallHost', 'pauseRecording');
                        resolve(true);
                    } else {
                        reject(Error('Local recording is not active.'));
                    }
                });
            } else {
                reject(Error('Output is not a local recording'));
            }
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Unpause a local recording.
     */
    Output.prototype.unpauseLocalRecording = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._name === 'Local Recording') {
                StreamInfo.getActiveStreamChannels().then(function (channels) {
                    Output._localRecording = false;
                    for (var i = 0; i < channels.length; i++) {
                        if (channels[i]['_name'] === 'Local Recording') {
                            Output._localRecording = true;
                            break;
                        }
                    }
                    if (Output._localRecording) {
                        exec('CallHost', 'unpauseRecording');
                        resolve(true);
                    } else {
                        reject(Error('Local recording is not active.'));
                    }
                });
            } else {
                reject(Error('Output is not a local recording'));
            }
        });
    };
    Output._getBroadcastChannels = function (id, handler) {
        Output._id = id;
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                var isID = /^{[A-F0-9\-]*}$/i.test(Output._id);
                if (!isID) {
                    reject(Error('Not a valid ID format for items'));
                }
            }
            if (Remote.remoteType === 'remote') {
                var message = {
                    type: 'broadcastChannels',
                    id: Output._id
                };
                Extension._remoteCallback[Output._id] = { resolve: resolve };
                Remote.sendMessage(encodeURIComponent(JSON.stringify(message)));
            } else if (Remote.remoteType === 'proxy') {
                if (Output._proxyCallback[Output._id] === undefined) {
                    Output._proxyCallback[Output._id] = [];
                }
                Output._proxyCallback[Output._id] = handler;
                exec('CallHost', 'getBroadcastChannelList:' + Output._id);
            } else {
                if (Output._callback[Output._id] === undefined) {
                    Output._callback[Output._id] = [];
                }
                Output._callback[Output._id] = { resolve: resolve };
                exec('CallHost', 'getBroadcastChannelList:' + Output._id);
            }
        });
    };
    Output._finalCallback = function (message) {
        return new Promise(function (resolve) {
            var result = JSON.parse(decodeURIComponent(message));
            Extension._remoteCallback[Output._id].resolve(result['result']);
        });
    };
    Output._callback = {};
    Output._remoteCallback = {};
    Output._proxyCallback = {};
    Output._localRecording = false;
    return Output;
}();
var oldSetBroadcastChannelList = window.SetBroadcastChannelList;
window.SetBroadcastChannelList = function (channels) {
    if (Remote.remoteType === 'proxy') {
        Output._proxyCallback[Output._id].call(this, channels);
    } else {
        Output._callback[Output._id].resolve(channels);
    }
    if (typeof oldSetBroadcastChannelList === 'function') {
        oldSetBroadcastChannelList(channels);
    }
};

/**
 * This class is used as a middleware for communication for a remote and proxy
 * xjs. Receiving, Sending and Routing of messages is done here to make the
 * calls reach their supposed methods, be processed and then returned to the
 * caller as if it is just running locally.
 *
 * Note that this class does not create/handle the connection used to send/receive
 * messages and should be declared initially upon readying the xjs, together with
 * what type it is (remote/proxy).
 * You can use websockets, datachannnels, etc... for this.
 *
 * Initial declaration on ready:
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.ready({
 *  remote: {
 *    type: 'remote' // remote/proxy, default is local
 *    sendMessage: function(message) {
 *      myConnection.send(message) // this will be assigned to Remote.sendMessage
 *    }
 *  }
 * })
 *
 * // Then handle received messages(string) should be passed to
 * xjs.Remote.receiveMessage(message)
 * ```
 *
 * Once this is set up, you can already use xjs normally as if you are just making
 * calls locally.
 */
var Remote = function () {
    function Remote() {}
    /**
     * param: (value: string)
     *
     * Handles received messages to properly relay it to either the proxy
     * and make the actual calls, or remote and return the results from
     * proxy.
     *
     */
    Remote.receiveMessage = function (message) {
        var messageObj = {};
        return new Promise(function (resolve, reject) {
            if (Remote.remoteType === 'remote') {
                // Receive version on first message from proxy
                if (!Remote._isVersion && message.indexOf('setVersion') !== -1) {
                    Remote._isVersion = true;
                    var mockVersion = message;
                    var msgArray = message.split("::");
                    if (typeof msgArray[1] !== 'undefined') {
                        mockVersion = msgArray[1];
                    }
                    resolve(finishReady({ version: mockVersion }));
                } else {
                    if (message.indexOf('setVersion') === -1) {
                        messageObj = JSON.parse(decodeURIComponent(message));
                        switch (messageObj['type']) {
                            case 'exec':
                                Remote._execHandler(message);
                                break;
                            case 'event-emitter':
                                Remote._eventEmitterHandler(message);
                                break;
                            case 'window':
                                Remote._allWindowHandler(message);
                                break;
                            case 'extWindow':
                                Remote._allWindowHandler(message);
                                break;
                            case 'broadcastChannels':
                                Remote._allWindowHandler(message);
                                break;
                            default:
                                reject(Error('Call type is undefined.'));
                                break;
                        }
                    }
                }
            } else if (Remote.remoteType === 'proxy') {
                if (message !== undefined) {
                    if (message === 'getVersion') {
                        // First message to get and send version
                        Remote.sendMessage('setVersion::' + window.navigator.appVersion);
                        resolve(true);
                    } else {
                        // Succeeding messages from exec/event/emit
                        messageObj = JSON.parse(decodeURIComponent(message));
                        switch (messageObj['type']) {
                            case 'exec':
                                Remote._execHandler(message);
                                break;
                            case 'event-emitter':
                                Remote._eventEmitterHandler(message);
                                break;
                            case 'window':
                                Remote._allWindowHandler(message);
                                break;
                            case 'extWindow':
                                Remote._allWindowHandler(message);
                                break;
                            case 'broadcastChannels':
                                Remote._allWindowHandler(message);
                                break;
                            default:
                                reject(Error('Call type is undefined.'));
                                break;
                        }
                    }
                }
            } else if (Remote.remoteType === 'local') {
                reject(Error('Remote calls do not work on local mode.'));
            }
        });
    };
    // Handle exec messages
    Remote._execHandler = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            if (Remote.remoteType === 'remote') {
                finalCallback(decodeURIComponent(message)).then(function (result) {
                    resolve(result);
                });
            } else if (Remote.remoteType === 'proxy') {
                var messageObj_1 = {};
                return new Promise(function (resolve, reject) {
                    messageObj_1 = JSON.parse(decodeURIComponent(message));
                    messageObj_1['callback'] = function (result) {
                        var retObj = {
                            result: result,
                            asyncId: Number(messageObj_1['asyncId']),
                            type: 'exec'
                        };
                        resolve(Remote.sendMessage(encodeURIComponent(JSON.stringify(retObj))));
                    };
                    var messageArr = [messageObj_1['funcName']].concat(messageObj_1['args'], [messageObj_1['callback']]);
                    exec.apply(_this, messageArr);
                });
            }
        });
    };
    // Hanndle emit on/off events
    Remote._eventEmitterHandler = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            if (Remote.remoteType === 'remote') {
                EventEmitter._finalCallback(message);
            } else if (Remote.remoteType === 'proxy') {
                var messageObj_2 = JSON.parse(decodeURIComponent(message));
                messageObj_2['callback'] = function (result) {
                    var retObj = {
                        result: result,
                        type: 'event-emitter',
                        id: messageObj_2['id'],
                        event: messageObj_2['event']
                    };
                    resolve(Remote.sendMessage(encodeURIComponent(JSON.stringify(retObj))));
                };
                var messageArr = [messageObj_2['event'], messageObj_2['callback'], messageObj_2['id']];
                EventEmitter._setCallback.call(_this, messageArr);
            }
        });
    };
    Remote._allWindowHandler = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            if (Remote.remoteType === 'remote') {
                var messageObj = JSON.parse(decodeURIComponent(message));
                if (messageObj['type'] === 'window') {
                    IO._finalCallback(message);
                } else if (messageObj['type'] === 'extWindow') {
                    Extension._finalCallback(message);
                } else if (messageObj['type'] === 'broadcastChannels') {
                    Output._finalCallback(message);
                }
            } else if (Remote.remoteType === 'proxy') {
                var messageObj_3 = JSON.parse(decodeURIComponent(message));
                messageObj_3['callback'] = function (result) {
                    var retObj = {
                        result: result,
                        file: messageObj_3['file'],
                        type: messageObj_3['type']
                    };
                    resolve(Remote.sendMessage(encodeURIComponent(JSON.stringify(retObj))));
                };
                if (messageObj_3['type'] === 'window') {
                    var messageArr = [messageObj_3['file'], messageObj_3['callback']];
                    IO.getVideoDuration.call(_this, messageArr);
                } else if (messageObj_3['type'] === 'extWindow') {
                    var Ext = messageObj_3['instance'] = new Extension();
                    Ext.getId(messageObj_3['callback']);
                } else if (messageObj_3['type'] === 'broadcastChannels') {
                    Output._getBroadcastChannels(messageObj_3['id'], messageObj_3['callback']);
                }
            }
        });
    };
    Remote._isVersion = false;
    /**
     * Initial assignment should be done on xjs.ready()
     * Types:
     *  - local (default)
     *  - remote
     *  - proxy
     */
    Remote.remoteType = 'local';
    return Remote;
}();

/// <reference path="../../defs/window.d.ts" />
var DEBUG = false;
var _callbacks = {};
var _proxyCallbacks = {};
var _remoteCallbacks = {};
var counter = 0;
/**
* Executes an external function
*/
function exec(funcName) {
    var _this = this;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        var callback = null;
        var ret = false;
        if (args.length > 0) {
            callback = args[args.length - 1];
            if (callback instanceof Function) {
                args.pop();
            } else {
                callback = null;
            }
        }
        if (DEBUG) {
            console.log(['internal.exec("', funcName, '") ', JSON.stringify(args)].join(' '));
        }
        // For Remote, parse message and send to proxy
        if (Remote.remoteType === 'remote') {
            counter++;
            var message = {};
            if (args.length >= 1) {
                message = {
                    funcName: funcName,
                    args: args,
                    asyncId: counter,
                    type: 'exec'
                };
            } else {
                message = {
                    funcName: funcName,
                    asyncId: counter,
                    type: 'exec'
                };
            }
            Remote.sendMessage(encodeURIComponent(JSON.stringify(message)));
        }
        if (window.external && window.external[funcName] && window.external[funcName] instanceof Function) {
            ret = window.external[funcName].apply(_this, args);
        }
        // register callback if present
        if (callback !== null) {
            if (Remote.remoteType === 'remote') {
                _remoteCallbacks[counter] = callback;
            } else if (Remote.remoteType === 'proxy') {
                _proxyCallbacks[ret] = callback;
            } else {
                _callbacks[ret] = callback;
            }
        } else {
            if (Remote.remoteType === 'remote') {
                _remoteCallbacks[counter] = function (result) {
                    resolve(result);
                };
            }
        }
        // Sync calls end here for proxy and local
        if (Remote.remoteType === 'proxy' && typeof ret !== 'number') {
            if (_proxyCallbacks[ret] !== undefined) {
                resolve(_proxyCallbacks[ret].call(_this, decodeURIComponent(ret)));
            }
        } else if (Remote.remoteType === 'local') {
            resolve(ret);
        }
    });
}
// Only used by remote to use saved callback
function finalCallback(message) {
    var _this = this;
    return new Promise(function (resolve) {
        var result = JSON.parse(message);
        if (typeof result['asyncId'] === 'number' && _remoteCallbacks[result['asyncId']] !== undefined) {
            _remoteCallbacks[result['asyncId']].apply(_this, [result['result']]);
        } else {
            resolve(result['result']);
        }
    });
}
var asyncCallback = window.OnAsyncCallback;
window.OnAsyncCallback = function (asyncID, result) {
    // Used by proxy to return Async calls
    if (Remote.remoteType === 'proxy') {
        var callback = _proxyCallbacks[asyncID];
        callback.call(this, decodeURIComponent(result));
    } else {
        var callback = _callbacks[asyncID];
        if (callback instanceof Function) {
            callback.call(this, decodeURIComponent(result));
        }
    }
    if (typeof asyncCallback === 'function') {
        asyncCallback(asyncID, result);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
var IO = function () {
    function IO() {}
    /**
     * param: (path: string)
     * ```
     * return: Promise<string>
     * ```
     *
     * Returns a base-64 encoded string of the target file's contents.
     * UTF-8 encoded files may be decoded through:
     * ```javascript
     * IO.getFileContent('C:\\text.txt').then(function(base64Content) {
     *   var actualContent = decodeURIComponent(escape(window.atob(base64Content));
     * });
     * ```
     */
    IO.getFileContent = function (path) {
        return new Promise(function (resolve) {
            resolve(exec('GetFileContent', path));
        });
    };
    /**
     * param: (url: string)
     * ```
     * return: Promise<string>
     * ```
     *
     * Returns a base-64 encoded string of the target endpoint's contents.
     * Redirects are resolved, and this bypasses access-control-allow-origin.
     *
     * UTF-8 encoded content may be decoded through:
     * ```javascript
     * IO.getWebContent('http://example.com').then(function(base64Content) {
     *   var actualContent = decodeURIComponent(escape(window.atob(base64Content));
     * });
     * ```
     */
    IO.getWebContent = function (url) {
        return new Promise(function (resolve) {
            exec('GetWebContent', url, function (encoded) {
                resolve(encoded);
            });
        });
    };
    /**
     * param: (url: string)
     *
     * Opens a URL in the user's default browser. URL must specify HTTP or HTTPS.
     *
     */
    IO.openUrl = function (url) {
        return new Promise(function (resolve) {
            exec('OpenUrl', url).then(function (res) {
                resolve(res);
            });
        });
    };
    /**
     * param: ([options] [, filter]) -- see below
     * ```
     * return: Promise<string[]>
     * ```
     * Opens a file dialog for the user to select a file (or multiple files).
     * Resolves with an array of strings, each of which contains the full path
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
    IO.openFileDialog = function (optionBag, filter) {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else {
                var flags = 0;
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
                var filterString = '';
                if (filter !== undefined && filter !== null && filter.name !== undefined && filter.extensions !== undefined) {
                    filterString = filter.name + '|';
                    filterString += filter.extensions.map(function (val) {
                        return '*.' + val;
                    }).join(';');
                    filterString += '||';
                }
                exec('OpenFileDialogAsync', null, null, String(flags), filterString, function (path) {
                    if (path !== 'null') {
                        resolve(path.split('|'));
                    } else {
                        reject(Error('File selection cancelled.'));
                    }
                });
            }
        });
    };
    /**
     * param: (file: string)
     *
     * return: Promise<number>
     *
     * Returns the duration of a video file on the local system, specified in
     * units of 10^-7 seconds.
     */
    IO.getVideoDuration = function (file) {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else {
                if (typeof file !== 'undefined') {
                    if (Remote.remoteType === 'remote') {
                        var message = {
                            file: file,
                            type: 'window'
                        };
                        if (IO._remoteCallback[file] === undefined) {
                            IO._remoteCallback[file] = [];
                        }
                        IO._remoteCallback[file].push({ resolve: resolve, reject: reject });
                        Remote.sendMessage(encodeURIComponent(JSON.stringify(message)));
                    } else if (Remote.remoteType === 'proxy') {
                        if (IO._proxyCallback[file[0]] === undefined) {
                            IO._proxyCallback[file[0]] = [];
                        }
                        IO._proxyCallback[file[0]].push(file[1]);
                        exec('GetVideoDuration', file[0]);
                    } else {
                        if (IO._callback[file] === undefined) {
                            IO._callback[file] = [];
                        }
                        IO._callback[file].push({ resolve: resolve, reject: reject });
                        exec('GetVideoDuration', file);
                    }
                } else {
                    reject(new Error('No file indicated.'));
                }
            }
        });
    };
    
    IO._finalCallback = function (message) {
        return new Promise(function (resolve) {
            var result = JSON.parse(decodeURIComponent(message));
            if (result['result'] !== undefined) {
                IO._remoteCallback[result['file']].shift().resolve(result['result']);
            } else {
                IO._remoteCallback[decodeURIComponent(result['file'])].shift().reject(Error('Invalid file path.'));
            }
        });
    };
    IO._ALLOW_MULTI_SELECT = 0x200;
    IO._FILE_MUST_EXIST = 0x1000;
    IO._FORCE_SHOW_HIDDEN = 0x10000000;
    IO._callback = {};
    IO._remoteCallback = {};
    IO._proxyCallback = {};
    return IO;
}();
var oldOnGetVideoDuration = window.OnGetVideoDuration;
window.OnGetVideoDuration = function (file, duration) {
    if (Remote.remoteType === 'proxy') {
        IO._proxyCallback[decodeURIComponent(file)][0].apply(this, [Number(duration), file]);
    } else {
        IO._callback[decodeURIComponent(file)].shift().resolve(Number(duration));
        if (IO._callback[decodeURIComponent(file)].length === 0) {
            delete IO._callback[decodeURIComponent(file)];
        }
    }
    if (typeof oldOnGetVideoDuration === 'function') {
        oldOnGetVideoDuration(file, duration);
    }
};
var oldOnGetVideoDurationFailed = window.OnGetVideoDurationFailed;
window.OnGetVideoDurationFailed = function (file) {
    if (Remote.remoteType === 'proxy') {
        IO._proxyCallback[decodeURIComponent(file)][0].apply(this, [undefined, file]);
    } else {
        IO._callback[decodeURIComponent(file)].shift().reject(Error('Invalid file path.'));
        if (IO._callback[decodeURIComponent(file)].length === 0) {
            delete IO._callback[decodeURIComponent(file)];
        }
    }
    if (typeof oldOnGetVideoDurationFailed === 'function') {
        oldOnGetVideoDuration(file);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The AudioDevice Class is the object returned by
 * {@link #system/System System Class} getAudioDevices method. It provides you
 * with methods to fetch the audio device object's attributes, and also provides
 * methods to convert it back to an XML object that is compatible with XBC.
 *
 * If you are looking to add a microphone device to the stage, please see
 * {@link #system/MicrophoneDevice System/MicrophoneDevice} instead.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var System = XJS.System;
 *
 * System.getAudioDevices().then(function(audios) {
 *   for (var i in audios) {
 *     // Do not include the imaginary xsplit audio device if that ever exist
 *     if (audios[i].getName().indexOf('xsplit') === -1) {
 *       xml = audios[i].toXML();
 *       // do something with the XML here
 *     }
 *   }
 * });
 * ```
 */
var AudioDevice = function () {
    function AudioDevice(props) {
        this._defaultConsole = false;
        this._defaultMultimedia = false;
        this._defaultCommunication = false;
        props = props || {};
        this._id = props['id'];
        this._name = props['name'];
        this._adapter = props['adapter'];
        this._adapterdev = props['adapterdev'];
        this._dSoundGuid = props['dSoundGuid'];
        this._dataFlow = props['dataFlow'];
        this._state = props['state'];
        this._defaultConsole = props['defaultConsole'];
        this._defaultMultimedia = props['defaultMultimedia'];
        this._defaultCommunication = props['defaultCommunication'];
        this._level = props['level'] !== undefined ? props['level'] : 1.000000;
        this._enable = props['enable'] !== undefined ? props['enable'] : true;
        this._hwlevel = props['hwlevel'] !== undefined ? props['hwlevel'] : -1.000000;
        this._hwenable = props['hwenable'] !== undefined ? props['hwenable'] : 255;
        this._delay = props['delay'] !== undefined ? props['delay'] : 0;
        this._mix = props['mix'] !== undefined ? props['mix'] : 0;
    }
    /**
     * return: string
     *
     * Gets the device ID
     *
     * #### Usage
     *
     * ```javascript
     * var audioDeviceID = device.getId();
     * ```
     */
    AudioDevice.prototype.getId = function () {
        return this._id;
    };
    /**
     * return: string
     *
     * Gets the device name
     *
     * #### Usage
     *
     * ```javascript
     * var audioDeviceName = device.getName();
     * ```
     */
    AudioDevice.prototype.getName = function () {
        return this._name;
    };
    /**
     * return: string
     *
     * Gets whether device is capturing or rendering audio
     *
     * #### Usage
     *
     * ```javascript
     * var audioDataFlow = device.getDataFlow();
     *   //where possible values are 'render' or 'capture'
     * ```
     */
    AudioDevice.prototype.getDataFlow = function () {
        return this._dataFlow;
    };
    /**
     * return: boolean
     *
     * Gets whether audio device is the system default
     *
     * #### Usage
     *
     * ```javascript
     * var audioIsDefaultDevice = audioDevice.isDefaultDevice();
     * ```
     */
    AudioDevice.prototype.isDefaultDevice = function () {
        return this._defaultConsole && this._defaultMultimedia;
    };
    /**
     * return: number
     *
     * Gets the device audio level in the application
     *
     * #### Usage
     *
     * ```javascript
     * var audioDeviceVolumeLevel = audioDevice.getLevel();
     * ```
     */
    AudioDevice.prototype.getLevel = function () {
        return this._level;
    };
    /**
     * param: level<number>
     * ```
     * return: AudioDevice (used for chaining)
     * ```
     *
     * Sets the device audio level in the application
     *
     * #### Usage
     *
     * ```javascript
     * audioDevice._setLevel(100);
     * ```
     */
    AudioDevice.prototype._setLevel = function (level) {
        this._level = level;
        return this;
    };
    /**
     * return: boolean
     *
     * Gets whether the audio device is enabled/not
     *
     * #### Usage
     *
     * ```javascript
     * var isAudioDeviceEnabled = audioDevice.isEnabled();
     * ```
     */
    AudioDevice.prototype.isEnabled = function () {
        return this._enable;
    };
    /**
     * param: enabled<boolean>
     * ```
     * return: AudioDevice (used for chaining)
     * ```
     *
     * Enables audio device/sets software mute
     *
     * #### Usage
     *
     * ```javascript
     * audioDevice._setEnabled(true);
     * ```
     */
    AudioDevice.prototype._setEnabled = function (enabled) {
        this._enable = enabled;
        return this;
    };
    /**
     * return: number
     *
     * Gets the device system volume
     *
     * #### Usage
     *
     * ```javascript
     * var systemVolumeLevel = audioDevice.getSystemLevel();
     * ```
     */
    AudioDevice.prototype.getSystemLevel = function () {
        return this._hwlevel;
    };
    /**
     * param: volume<number>
     * ```
     * return: AudioDevice (used for chaining)
     * ```
     *
     * Sets the device system volume
     *
     * #### Usage
     *
     * ```javascript
     * audioDevice._setSystemLevel(100);
     * ```
     */
    AudioDevice.prototype._setSystemLevel = function (hwlevel) {
        this._hwlevel = hwlevel;
        return this;
    };
    /**
     * return: number
     *
     * Gets whether audio device is enabled/muted in the system
     *
     * #### Usage
     *
     * ```javascript
     * var systemAudioDeviceEnabled = audioDevice.getSystemEnabled();
     * ```
     */
    AudioDevice.prototype.getSystemEnabled = function () {
        return this._hwenable;
    };
    /**
     * param: systemEnabled<number>
     * ```
     * return: AudioDevice (used for chaining)
     * ```
     *
     * Enables audio device/sets software mute
     *
     * #### Usage
     *
     * ```javascript
     * // you may use the following:
     * //     * AudioDevice.SYSTEM_LEVEL_MUTE (0)
     * //     * AudioDevice.SYSTEM_LEVEL_ENABLE (1)
     * //     * AudioDevice.SYSTEM_MUTE_CHANGE_NOT_ALLOWED (255)
     * audioDevice._setSystemEnabled(AudioDevice.SYSTEM_LEVEL_MUTE);
     * ```
     */
    AudioDevice.prototype._setSystemEnabled = function (hwenabled) {
        this._hwenable = hwenabled;
        return this;
    };
    /**
     * return: number (100 nanoseconds in units)
     *
     * Get the loopback capture delay value
     *
     * #### Usage
     *
     * ```javascript
     * var audioDelay = audioDevice.getDelay();
     * ```
     */
    AudioDevice.prototype.getDelay = function () {
        return this._delay;
    };
    /**
     * param: delay<number> (100 nanoseconds in units)
     * ```
     * return: AudioDevice (used for chaining)
     * ```
     *
     * Sets the loopback capture delay value
     *
     * #### Usage
     *
     * ```javascript
     * audioDevice._setDelay(100);
     * ```
     */
    AudioDevice.prototype._setDelay = function (delay) {
        this._delay = delay;
        return this;
    };
    /**
     * return: string
     *
     * Converts the AudioDevice object to XML-formatted string
     *
     * #### Usage
     *
     * ```javascript
     * var audioDeviceXMLString = AudioDevice.toString();
     * ```
     */
    AudioDevice.prototype.toString = function () {
        var device = new JSON$1();
        device.tag = 'dev';
        device.selfclosing = true;
        device['id'] = this.getId();
        device['level'] = (this.getLevel() / 100).toFixed(6);
        device['enable'] = this.isEnabled() ? 1 : 0;
        device['hwlevel'] = (this.getSystemLevel() / 100).toFixed(6);
        device['hwenable'] = this.getSystemEnabled();
        device['delay'] = this.getDelay();
        device['mix'] = this._mix;
        return XML.parseJSON(device).toString();
    };
    /**
     * param: deviceJXON<JSON>
     * ```
     * return: AudioDevice
     * ```
     *
     * Converts a JSON object into an AudioDevice object
     *
     * #### Usage
     *
     * ```javascript
     * var newAudioDevice = AudioDevice.parse(deviceJSONObj);
     * ```
     */
    AudioDevice.parse = function (deviceJXON) {
        var audio = new AudioDevice({
            id: deviceJXON['id'],
            name: deviceJXON['name'],
            adapter: deviceJXON['adapter'],
            adapterdev: deviceJXON['adapterdev'],
            dataFlow: deviceJXON['DataFlow'],
            state: deviceJXON['State'],
            dSoundGuid: deviceJXON['DSoundGuid'],
            defaultCommunication: deviceJXON['DefaultCommunication'] === '1',
            defaultConsole: deviceJXON['DefaultConsole'] === '1',
            defaultMultimedia: deviceJXON['DefaultMultimedia'] === '1',
            mix: deviceJXON['mix']
        });
        audio._setLevel(Number(deviceJXON['level'] !== undefined ? deviceJXON['level'] * 100 : 100))._setEnabled(deviceJXON['enable'] !== undefined ? deviceJXON['enable'] === '1' : true)._setSystemLevel(Number(deviceJXON['hwlevel'] !== undefined ? deviceJXON['hwlevel'] * 100 : -100))._setSystemEnabled(Number(deviceJXON['hwenable'] !== undefined ? deviceJXON['hwenable'] : 255))._setDelay(Number(deviceJXON['delay'] !== undefined ? deviceJXON['delay'] : 0));
        return audio;
    };
    AudioDevice.SYSTEM_LEVEL_MUTE = 0;
    AudioDevice.SYSTEM_LEVEL_ENABLE = 1;
    AudioDevice.SYSTEM_MUTE_CHANGE_NOT_ALLOWED = 255;
    return AudioDevice;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The Transition class represents a preset transition within XSplit Broadcaster.
 * This may be used to set the application's transition scheme when switching scenes,
 * or to set an individual item's transition when its visibility changes.
 *
 * Simply use one of the available Transition objects such as Transition.FAN or
 * Transition.COLLAPSE as the parameter to the `setTransition()` method of an
 * App instance, or a valid Item instance that supports transitions (this
 * includes {@link #core/CameraItem Core/CameraItem},
 * {@link #core/FlashItem Core/FlashItem},
 * {@link #core/GameItem Core/GameItem},
 * {@link #core/HtmlItem Core/HtmlItem},
 * {@link #core/ImageItem Core/ImageItem},
 * {@link #core/MediaItem Core/MediaItem}, and
 * {@link #core/ScreenItem Core/ScreenItem}.)
 *
 * For scene transitions, you can also use custom stinger transitions,
 * which are exposed through the static method Transition.getSceneTransitions
 */
var Transition = function () {
    function Transition(key, setValue) {
        if (setValue === void 0) {
            setValue = null;
        }
        var value = Transition._transitionMap[key];
        if (typeof value !== 'undefined') {
            this._key = key; // retain key so that NONE is readable
            this._value = value;
        } else if (key.substring(0, 8) === 'stinger:') {
            if (typeof setValue !== 'undefined' && setValue !== null) {
                this._key = setValue;
            } else {
                var fileName = key.split(',')[0].split('\\').pop().split('/').pop();
                var m = fileName.lastIndexOf('.webm');
                if (m >= 0 && m + fileName.length >= fileName.length) {
                    fileName = fileName.substring(0, m);
                }
                var n = fileName.lastIndexOf('_');
                if (n >= 0 && n + fileName.length >= fileName.length) {
                    fileName = fileName.substring(0, n) + ': ' + fileName.substring(n + 1) + 'ms';
                }
                this._key = fileName;
            }
            this._value = key;
        } else if (typeof setValue !== null) {
            this._key = setValue; // retain key so that NONE is readable
            this._value = key;
        } else {
            this._key = key; // retain key so that NONE is readable
            this._value = key.toLowerCase();
        }
    }
    /**
     * Converts this transition object to the underlying string representation to be read by XSplit Broadcaster.
     */
    Transition.prototype.toString = function () {
        return this._value;
    };
    /**
     * Converts this transition object to a easily identifiable string such as 'NONE'.
     */
    Transition.prototype.toTransitionKey = function () {
        return this._key;
    };
    /**
     * return: Promise<Transition[]>
     *
     * Get all available transitions for use in scene change
     *
     * ** MINIMUM XBC REQUIREMENT **
     * requires XBC v.2.7.1602.0502 and above
     *
     * #### Usage
     *
     * ```javascript
     * Transtition.getSceneTransitions().then(function(transitions) {
     *   for (var i = 0; i < transitions.length; i++) {
     *     transitions.toString(); // Returns the value of the transition
     *     transitions.toTransitionKey(); // Returns the key of the transition
     *   }
     * })
     * ```
     */
    Transition.getSceneTransitions = function () {
        return new Promise(function (resolve) {
            var transitions = [];
            var transitionString;
            App.getGlobalProperty('transitions').then(function (result) {
                transitionString = result;
                try {
                    if (transitionString !== '') {
                        var transitionArray = JSON.parse(transitionString);
                        for (var i = transitionArray.length - 1; i >= 0; i--) {
                            var transitionObject = transitionArray[i];
                            if (transitionObject.hasOwnProperty('Id') && transitionObject.hasOwnProperty('Name')) {
                                transitions.push(new Transition(transitionObject['Id'], transitionObject['Name']));
                            }
                        }
                        resolve(transitions);
                    } else {
                        resolve(transitions);
                    }
                } catch (e) {
                    throw new Error('Error retrieving available transitions');
                }
            });
        });
    };
    Transition._transitionMap = {
        NONE: '',
        CLOCK: 'clock',
        COLLAPSE: 'collapse',
        FADE: 'fade',
        FAN: 'fan',
        HOLE: 'hole',
        MOVE_BOTTOM: 'move_bottom',
        MOVE_LEFT: 'move_left',
        MOVE_LEFT_RIGHT: 'move_left_right',
        MOVE_RIGHT: 'move_right',
        MOVE_TOP: 'move_top',
        MOVE_TOP_BOTTOM: 'move_top_bottom',
        WAVE: 'wave'
    };
    Transition.NONE = new Transition('NONE');
    Transition.CLOCK = new Transition('CLOCK');
    Transition.COLLAPSE = new Transition('COLLAPSE');
    Transition.FADE = new Transition('FADE');
    Transition.FAN = new Transition('FAN');
    Transition.HOLE = new Transition('HOLE');
    Transition.MOVE_BOTTOM = new Transition('MOVE_BOTTOM');
    Transition.MOVE_LEFT = new Transition('MOVE_LEFT');
    Transition.MOVE_LEFT_RIGHT = new Transition('MOVE_LEFT_RIGHT');
    Transition.MOVE_RIGHT = new Transition('MOVE_RIGHT');
    Transition.MOVE_TOP = new Transition('MOVE_TOP');
    Transition.MOVE_TOP_BOTTOM = new Transition('MOVE_TOP_BOTTOM');
    Transition.WAVE = new Transition('WAVE');
    return Transition;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
var DEFAULT_SILENCE_DETECTION_THRESHOLD = 5;
var DEFAULT_SILENCE_DETECTION_PERIOD = 1000;
/**
 * The App Class provides you methods to get and set application-related
 * functionalities.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 * var App = new xjs.App();
 *
 * App.getFrameTime().then(function(frametime) {
 *   window.frametime = frametime;
 * });
 * ```
 *
 * For methods referring to application audio
 * (i.e. mic and speaker settings, silence detection, etc.).
 * This will affect XBC settings
 * but will not be reflected in the General Settings Window
 * (also will not be persistent after logging out of/exiting the application).
 *
 */
var App$1 = function () {
    function App$$1() {}
    /**
     * return: Promise<number>
     *
     * Gets application's frame time (duration per frame in 100ns unit)
     *
     * #### Usage
     *
     * ```javascript
     * App.getFrameTime().then(function(res) {
     *   var frameTime = res;
     * });
     * ```
     */
    App$$1.prototype.getFrameTime = function () {
        return new Promise(function (resolve) {
            App.get('frametime').then(function (val) {
                resolve(Number(val));
            });
        });
    };
    /**
     * return: Promise<Rectangle>
     *
     * Gets application default output resolution in pixels.
     *
     * See also: {@link #util/Rectangle Util/Rectangle}
     *
     * #### Usage
     *
     * ```javascript
     * App.getResolution().then(function(res) {
     *   var height = res.getHeight();
     *   var width = res.getWidth();
     * });
     * ```
     */
    App$$1.prototype.getResolution = function () {
        return new Promise(function (resolve) {
            App.get('resolution').then(function (val) {
                var dimensions = val.split(',');
                resolve(Rectangle.fromDimensions(parseInt(dimensions[0]), parseInt(dimensions[1])));
            });
        });
    };
    /**
     * return: Promise<Rectangle>
     *
     * Gets application viewport display resolution
     *
     * See also: {@link #util/Rectangle Util/Rectangle}
     *
     * #### Usage
     *
     * ```javascript
     * App.getViewport().then(function(res) {
     *   var height = res.getHeight();
     *   var width = res.getWidth();
     * });
     * ```
     */
    App$$1.prototype.getViewport = function () {
        return new Promise(function (resolve) {
            App.get('viewport').then(function (val) {
                var dimensions = val.split(',');
                resolve(Rectangle.fromDimensions(parseInt(dimensions[0]), parseInt(dimensions[1])));
            });
        });
    };
    /**
     * return: Promise<string>
     *
     * Refers to XSplit Broadcaster version number
     *
     * #### Usage
     *
     * ```javascript
     * App.getVersion().then(function(res) {
     *   var version = res;
     * });
     * ```
     */
    App$$1.prototype.getVersion = function () {
        return new Promise(function (resolve, reject) {
            var xbcPattern = /XSplit Broadcaster\s(.*?)\s/;
            var xbcMatch = navigator.appVersion.match(xbcPattern);
            xbcMatch = xbcMatch || mockVersion.match(xbcPattern);
            if (xbcMatch !== null) {
                resolve(xbcMatch[1]);
            } else {
                reject(Error('not loaded in XSplit Broadcaster'));
            }
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the total number of frames rendered
     *
     * #### Usage
     *
     * ```javascript
     * App.getFramesRendered().then(function(res) {
     *   var framesrendered = res;
     * });
     * ```
     */
    App$$1.prototype.getFramesRendered = function () {
        return new Promise(function (resolve) {
            App.get('framesrendered').then(function (val) {
                resolve(Number(val));
            });
        });
    };
    // Audio Services
    /**
     * return: Promise<AudioDevice[]>
     *
     * Gets the primary microphone device used in the application
     *
     * See also: {@link #system/AudioDevice System/AudioDevice}
     *
     * ### Usage
     *
     * ```javascript
     * App.getPrimaryMic().then(function(audioDevice) {
     *   var primaryMic = audioDevice;
     * });
     * ```
     */
    App$$1.prototype.getPrimaryMic = function () {
        return new Promise(function (resolve, reject) {
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    resolve(audioDevices[0]);
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * return: Promise<AudioDevice[]>
     *
     * Gets the primary speaker/audio render device used in the application
     *
     * See also: {@link #system/AudioDevice System/AudioDevice}
     *
     * ### Usage
     *
     * ```javascript
     * App.getPrimarySpeaker().then(function(audioDevice) {
     *   var primarySpeaker = audioDevice;
     * });
     * ```
     */
    App$$1.prototype.getPrimarySpeaker = function () {
        return new Promise(function (resolve, reject) {
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    resolve(audioDevices[1]);
                } else {
                    reject(Error('No audio device is set as primary speaker'));
                }
            });
        });
    };
    /**
     * param: volume<number> (0 to 100 normal range, > 100 will boost volume level)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the application audio level of the primary microphone set
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimaryMicLevel(volume).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimaryMicLevel = function (volume) {
        return new Promise(function (resolve, reject) {
            if (volume < 0) {
                reject(Error('Volume can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    var micDevice = audioDevices[0];
                    micDevice._setLevel(volume);
                    audioDevices[0] = micDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * param: enabled<boolean>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets whether the primary microphone set is enabled or disabled in the applicaation
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimaryMicEnabled(enabled).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimaryMicEnabled = function (enabled) {
        return new Promise(function (resolve, reject) {
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    var micDevice = audioDevices[0];
                    micDevice._setEnabled(enabled);
                    audioDevices[0] = micDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * param: volume<number> (0 to 100)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the system audio level of the primary microphone set
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimaryMicSystemLevel(volume).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimaryMicSystemLevel = function (volume) {
        return new Promise(function (resolve, reject) {
            if (volume < 0) {
                reject(Error('Volume can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    var micDevice = audioDevices[0];
                    micDevice._setSystemLevel(volume);
                    audioDevices[0] = micDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * param: hwenabled<number> (0 or 1, or set to 255 to avoid mute change)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets whether the primary microphone set is enabled or disabled in the system
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimaryMicSystemEnabled(enabled).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimaryMicSystemEnabled = function (hwenabled) {
        return new Promise(function (resolve, reject) {
            if (hwenabled !== 0 && hwenabled !== 1 && hwenabled !== 255) {
                reject(Error('Value can only be 0, 1 or 255'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    var micDevice = audioDevices[0];
                    micDevice._setSystemEnabled(hwenabled);
                    audioDevices[0] = micDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * param: delay<number> (100 nanoseconds in units)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the loopback capture delay of the primary microphone set
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimaryMicDelay(delay).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimaryMicDelay = function (delay) {
        return new Promise(function (resolve, reject) {
            if (delay < 0) {
                reject(Error('Delay can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 0) {
                    var micDevice = audioDevices[0];
                    micDevice._setDelay(delay);
                    audioDevices[0] = micDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary microphone'));
                }
            });
        });
    };
    /**
     * param: volume<number> (0 to 100 normal range, > 100 will boost volume level)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the application audio level of the primary speaker/audio render device
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimarySpeakerLevel(volume).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimarySpeakerLevel = function (volume) {
        return new Promise(function (resolve, reject) {
            if (volume < 0) {
                reject(Error('Volume can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    var speakerDevice = audioDevices[1];
                    speakerDevice._setLevel(volume);
                    audioDevices[1] = speakerDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary speaker/audio render device'));
                }
            });
        });
    };
    /**
     * param: enabled<boolean>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets whether the primary speaker/audio render device set is enabled or disabled in the applicaation
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimarySpeakerEnabled(enabled).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimarySpeakerEnabled = function (enabled) {
        return new Promise(function (resolve, reject) {
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    var speakerDevice = audioDevices[1];
                    speakerDevice._setEnabled(enabled);
                    audioDevices[1] = speakerDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary speaker/audio render device'));
                }
            });
        });
    };
    /**
     * param: volume<number> (0 to 100)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the system audio level of the primary speaker/audio render device set
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimarySpeakerSystemLevel(volume).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimarySpeakerSystemLevel = function (volume) {
        return new Promise(function (resolve, reject) {
            if (volume < 0) {
                reject(Error('Volume can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    var speakerDevice = audioDevices[1];
                    speakerDevice._setSystemLevel(volume);
                    audioDevices[1] = speakerDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary speaker/audio render device'));
                }
            });
        });
    };
    /**
     * param: hwenabled<number> (0 or 1, or set to 255 to avoid mute change)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets whether the primary speaker/audio render device set is enabled or disabled in the system
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimarySpeakerSystemEnabled(enabled).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimarySpeakerSystemEnabled = function (hwenabled) {
        return new Promise(function (resolve, reject) {
            if (hwenabled !== 0 && hwenabled !== 1 && hwenabled !== 255) {
                reject(Error('Value can only 0, 1 or 255'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    var speakerDevice = audioDevices[1];
                    speakerDevice._setSystemEnabled(hwenabled);
                    audioDevices[1] = speakerDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary speaker/audio render device'));
                }
            });
        });
    };
    /**
     * param: delay<number> (100 nanoseconds in units)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the loopback capture delay of the primary speaker/audio render device
     *
     * ### Usage
     *
     * ```javascript
     * App.setPrimarySpeakerDelay(delay).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setPrimarySpeakerDelay = function (delay) {
        return new Promise(function (resolve, reject) {
            if (delay < 0) {
                reject(Error('Delay can only be positive'));
            }
            App.getAsList('microphonedev2').then(function (arr) {
                var audioDevices = arr.map(function (val) {
                    return AudioDevice.parse(val);
                });
                if (audioDevices.length && audioDevices.length > 1) {
                    var speakerDevice = audioDevices[1];
                    speakerDevice._setDelay(delay);
                    audioDevices[1] = speakerDevice;
                    var dev = '';
                    if (Array.isArray(audioDevices)) {
                        for (var i = 0; i < audioDevices.length; ++i) {
                            dev += audioDevices[i].toString();
                        }
                    }
                    dev = '<devices>' + dev + '</devices>';
                    App.set('microphonedev2', dev).then(function (setVal) {
                        resolve(setVal);
                    });
                } else {
                    reject(Error('No audio device is set as primary speaker/audio render device'));
                }
            });
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Gets whether silence detection is enabled
     *
     * ### Usage
     *
     * ```javascript
     * App.isSilenceDetectionEnabled().then(function(val) {
     *   var isEnabled = val;
     * });
     * ```
     */
    App$$1.prototype.isSilenceDetectionEnabled = function () {
        return new Promise(function (resolve) {
            App.get('microphonegain').then(function (val) {
                var micGainObj = JSON$1.parse(val);
                resolve(micGainObj['enable'] == '1');
            });
        });
    };
    /**
     * param: enabled<boolean>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Enables or disables silence detection
     *
     * ### Usage
     *
     * ```javascript
     * App.enableSilenceDetection(enabled).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.enableSilenceDetection = function (enabled) {
        return new Promise(function (resolve) {
            App.get('microphonegain').then(function (val) {
                var silenceDetectionObj = JSON$1.parse(val);
                silenceDetectionObj['enable'] = enabled ? '1' : '0';
                App.set('microphonegain', XML.parseJSON(silenceDetectionObj).toString()).then(function (setVal) {
                    resolve(setVal);
                });
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets silence detection period,
     * the length of time after voice detection before silence is again detected
     *
     * ### Usage
     *
     * ```javascript
     * App.getSilenceDetectionPeriod().then(function(val) {
     *   var silenceDetectionPeriod = val;
     * });
     * ```
     */
    App$$1.prototype.getSilenceDetectionPeriod = function () {
        return new Promise(function (resolve) {
            App.get('microphonegain').then(function (val) {
                var micGainObj = JSON$1.parse(val);
                resolve(micGainObj['latency'] !== undefined ? Number(micGainObj['latency']) : DEFAULT_SILENCE_DETECTION_PERIOD);
            });
        });
    };
    /**
     * param: sdPeriod<number>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets silence detection period (0-60000 ms),
     * the length of time after voice detection before silence is again detected
     *
     * ### Usage
     *
     * ```javascript
     * App.setSilenceDetectionPeriod(sdPeriod).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setSilenceDetectionPeriod = function (sdPeriod) {
        return new Promise(function (resolve, reject) {
            if (typeof sdPeriod !== 'number') {
                reject(Error('Silence detection period must be a number'));
            } else if (sdPeriod % 1 != 0) {
                reject(Error('Silence detection period must be an integer'));
            } else if (sdPeriod < 0 || sdPeriod > 60000) {
                reject(Error('Silence detection must be in the range 0-60000.'));
            }
            App.get('microphonegain').then(function (val) {
                var silenceDetectionObj = JSON$1.parse(val);
                silenceDetectionObj['latency'] = sdPeriod.toString();
                App.set('microphonegain', XML.parseJSON(silenceDetectionObj).toString()).then(function (setVal) {
                    resolve(setVal);
                });
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets silence detection threshold/silence amplitude
     *
     * ### Usage
     *
     * ```javascript
     * App.getSilenceDetectionThreshold().then(function(val) {
     *   var silenceDetectionTfhreshold = val;
     * });
     * ```
     */
    App$$1.prototype.getSilenceDetectionThreshold = function () {
        return new Promise(function (resolve) {
            App.get('microphonegain').then(function (val) {
                var micGainObj = JSON$1.parse(val);
                resolve(micGainObj['gain'] !== undefined ? Number(micGainObj['gain']) : DEFAULT_SILENCE_DETECTION_THRESHOLD);
            });
        });
    };
    /**
     * param: sdThreshold<number>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets silence detection threshold/silence amplitude (values from 0-128)
     *
     * ### Usage
     *
     * ```javascript
     * App.setSilenceDetectionThreshold(sdThreshold).then(function(val) {
     *   var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setSilenceDetectionThreshold = function (sdThreshold) {
        return new Promise(function (resolve, reject) {
            if (typeof sdThreshold !== 'number') {
                reject(Error('Silence detection threshold must be a number'));
            } else if (sdThreshold % 1 != 0) {
                reject(Error('Silence detection threshold must be an integer'));
            } else if (sdThreshold < 0 || sdThreshold > 128) {
                reject(Error('Silence detection threshold must be in the range 0-128.'));
            }
            App.get('microphonegain').then(function (val) {
                var silenceDetectionObj = JSON$1.parse(val);
                silenceDetectionObj['gain'] = sdThreshold.toString();
                App.set('microphonegain', XML.parseJSON(silenceDetectionObj).toString()).then(function (setVal) {
                    resolve(setVal);
                });
            });
        });
    };
    // Transition Services
    /**
     * return: Promise<Transition>
     *
     * Gets the transition for scene changes
     *
     * See also: {@link #core/Transition Core/Transition}
     *
     * #### Usage
     *
     * ```javascript
     * App.getTransition().then(function(res) {
     *   var transitionid = res;
     * });
     * ```
     */
    App$$1.prototype.getTransition = function () {
        return new Promise(function (resolve) {
            App.get('transitionid').then(function (val) {
                if (val === '') {
                    resolve(Transition.NONE);
                } else {
                    var currTransition = Transition[val.toUpperCase()];
                    if (typeof currTransition !== 'undefined') {
                        resolve(currTransition);
                    } else {
                        Transition.getSceneTransitions().then(function (transitions) {
                            var inTransition = false;
                            var transitionObj;
                            var i;
                            for (i = 0; i < transitions.length; i++) {
                                transitionObj = transitions[i];
                                if (transitionObj.toString() === val) {
                                    inTransition = true;
                                    break;
                                }
                            }
                            if (inTransition) {
                                resolve(transitionObj);
                            } else {
                                resolve(new Transition(val));
                            }
                        }).catch(function (err) {
                            resolve(new Transition(val));
                        });
                    }
                }
            });
        });
    };
    /**
     * param: transition<Transition>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the transition for scene changes
     *
     * See also: {@link #core/Transition Core/Transition}
     *
     * #### Usage
     *
     * ```javascript
     * var xjs = require('xjs'),
     *     Transition = xjs.Transition,
     *     App = new xjs.App();
         * App.setTransition(Transition.CLOCK).then(function(val) {
     *  var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setTransition = function (transition) {
        return new Promise(function (resolve) {
            App.set('transitionid', transition.toString()).then(function (val) {
                resolve(val);
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Gets the scene transition duration in milliseconds
     *
     * #### Usage
     *
     * ```javascript
     * App.getTransitionTime().then(function(res) {
     *   var transitiontime = res;
     * });
     * ```
     */
    App$$1.prototype.getTransitionTime = function () {
        return new Promise(function (resolve) {
            App.get('transitiontime').then(function (val) {
                resolve(Number(val));
            });
        });
    };
    /**
     * param: time<number>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Sets the scene transition duration in milliseconds
     *
     * #### Usage
     *
     * ```javascript
     * App.setTransitionTime(time).then(function(val) {
     *  var isSet = val;
     * });
     * ```
     */
    App$$1.prototype.setTransitionTime = function (time) {
        return new Promise(function (resolve) {
            App.set('transitiontime', time.toString()).then(function (val) {
                resolve(val);
            });
        });
    };
    /**
     * return: Promise<boolean>
     *
     *  Clears all cookies across all browser instances. Not available to
     *  source plugins (call this from the source properties window instead.)
     *
     * #### Usage
     *
     * ```javascript
     * App.clearBrowserCookies().then(function(val) {
     *  var isCleared = val;
     * });
     * ```
     */
    App$$1.prototype.clearBrowserCookies = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(new Error('This method is not available to source plugins.'));
            } else {
                exec('CallHost', 'deletecookie:videoitemprop');
                resolve(true);
            }
        });
    };
    /**
     * return: Promise<string>
     *
     * Returns a hashed string that may be used to differentiate among logged-in
     * users. This will be useful in such cases as persisting data to be used by
     * certain XSplit users only.
     */
    App$$1.prototype.getUserIdHash = function () {
        return new Promise(function (resolve) {
            App.getGlobalProperty('userid').then(function (res) {
                resolve(res);
            });
        });
    };
    return App$$1;
}();

/**
 * Usage:
 *
 * ```
 * EventManager.subscribe('StreamStart', callback);
 * ```
 *
 * OR
 *
 * ```
 * EventManager.subscribe(['StreamStart', 'StreamEnd'], callback);
 * ```
 */
var EventManager = function () {
    function EventManager() {}
    EventManager.subscribe = function (event, _cb) {
        var _this = this;
        return new Promise(function (resolve) {
            event = event instanceof Array ? event : [event];
            if (event instanceof Array) {
                event.forEach(function (_event) {
                    if (EventManager.callbacks[_event] === undefined) {
                        EventManager.callbacks[_event] = [];
                    }
                    if (_event === 'OnSceneAddByUser') {
                        exec('AppSubscribeEvents');
                    } else if (_event.startsWith('itempropchange_')) {
                        var itemID = _event.split('_')[1];
                        exec('ItemSubscribeEvents', itemID);
                    }
                    EventManager.callbacks[_event].push(_cb);
                });
            }
            resolve(_this);
        });
    };
    EventManager.callbacks = {};
    return EventManager;
}();
var oldSetEvent = window.SetEvent;
window.SetEvent = function (args) {
    var settings = [];
    settings = args.split('&');
    var settingsObj = {};
    settings.map(function (el) {
        var _split = el.split('=');
        settingsObj[_split[0]] = _split[1];
    });
    if (EventManager.callbacks[settingsObj['event']] === undefined) return;
    EventManager.callbacks[settingsObj['event']].map(function (_cb) {
        _cb(settingsObj);
    });
    if (typeof oldSetEvent === 'function') {
        oldSetEvent(args);
    }
};
var oldAppOnEvent = window.AppOnEvent;
window.AppOnEvent = function (event) {
    if (EventManager.callbacks[event] === undefined) return;
    EventManager.callbacks[event].map(function (_cb) {
        _cb({ event: event });
    });
    if (typeof oldAppOnEvent === 'function') {
        oldAppOnEvent(event);
    }
};
var oldOnEvent = window.OnEvent;
window.OnEvent = function (event, item) {
    var eventArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        eventArgs[_i - 2] = arguments[_i];
    }
    if (EventManager.callbacks[event + '_' + item] === undefined) return;
    EventManager.callbacks[event + '_' + item].map(function (_cb) {
        _cb.apply(void 0, eventArgs);
    });
    if (typeof oldOnEvent === 'function') {
        oldOnEvent(event);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
/// <reference path="../../defs/window.d.ts" />
/**
 *  The ChannelManager class allows limited access to channels (also termed as outputs)
 *  that are being used or set in XSplit Broadcaster.
 *  This function is not available on Source Properties.
 *
 *  The class also emits events for developers to know when a stream has started
 *  or ended.
 *
 *  The following events are emitted.
 *    - `stream-start`
 *    - `stream-end`
 *    - `recording-renamed`
 *
 *  Use the `on(event: string, handler: Function)` function to listen to events.
 *
 */
var ChannelManager = function (_super) {
    __extends(ChannelManager, _super);
    function ChannelManager() {
        _super.apply(this, arguments);
    }
    /**
     *  param: (event: string, ...params: any[])
     *
     *  Allows this class to emit an event.
     */
    ChannelManager.emit = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(event);
        ChannelManager._emitter.emit.apply(ChannelManager._emitter, params);
    };
    /**
     *  param: (event: string, handler: Function)
     *
     *  Allows listening to events that this class emits. Currently there are three:
     *  `stream-start`, `stream-end` and `recording-renamed`.
     *
     *  #### Usage:
     *
     * ```javascript
     * ChannelManager.on('stream-start', function(res) {
     *   if (!res.error) { // No error
     *     var channel = res.channel; // Channel Object
     *     var streamTime = res.streamTime;
     *   }
     * });
     * ```
     */
    ChannelManager.on = function (event, handler) {
        var _this = this;
        if (Environment.isSourceProps()) {
            console.warn('Channel Manager: stream-related events are not received' + ' via the Source Properties');
        }
        ChannelManager._emitter.on(event, function (params) {
            try {
                var channelInfoObj = JSON.parse(decodeURIComponent(params));
                if (channelInfoObj.hasOwnProperty('ChannelName')) {
                    var channelName = channelInfoObj['ChannelName'];
                    var infoJSON = JSON$1.parse(channelInfoObj['Settings']);
                    var statJSON = void 0;
                    var addedInfo = {};
                    if (event === 'stream-end') {
                        channelInfoObj['Dropped'] = Number(channelInfoObj['Dropped']) || 0;
                        channelInfoObj['NotDropped'] = Number(channelInfoObj['NotDropped']) || 0;
                        channelInfoObj['StreamTime'] = Number(channelInfoObj['StreamTime'] / 10) || 0;
                        channelInfoObj['Audio'] = Number(channelInfoObj['Audio']) || 0;
                        channelInfoObj['Video'] = Number(channelInfoObj['Video']) || 0;
                        channelInfoObj['Output'] = Number(channelInfoObj['Output']) || 0;
                        statJSON = JSON$1.parse('<stat' + ' video="' + channelInfoObj['Video'] + '" audio="' + channelInfoObj['Audio'] + '" output="' + channelInfoObj['Output'] + '" frmdropped="' + channelInfoObj['Dropped'] + '" frmcoded="' + channelInfoObj['NotDropped'] + '" />');
                        addedInfo['streamTime'] = channelInfoObj['StreamTime'];
                    } else if (event === 'stream-start') {
                        statJSON = JSON$1.parse('<stat />');
                    }
                    var eventChannel = new StreamInfo({
                        name: channelName,
                        stat: statJSON,
                        channel: infoJSON
                    });
                    handler.call(_this, {
                        error: false,
                        channel: eventChannel,
                        streamTime: addedInfo['streamTime']
                    });
                } else if (channelInfoObj.hasOwnProperty('new') && channelInfoObj.hasOwnProperty('old')) {
                    if (event === 'recording-renamed') {
                        var name = decodeURIComponent(channelInfoObj['new']).replace(/\\/g, "/");
                        var nameArr = name.split('/');
                        var newName = nameArr[nameArr.length - 1];
                        handler.call(_this, {
                            error: false,
                            recordingInfo: {
                                oldName: channelInfoObj['old'],
                                newName: newName,
                                fullPath: decodeURIComponent(channelInfoObj['new'])
                            }
                        });
                    }
                }
            } catch (e) {
                handler.call(_this, { error: true });
            }
        });
    };
    ChannelManager._emitter = new ChannelManager();
    ChannelManager._proxyCallbacks = {};
    ChannelManager._remoteCallbacks = {};
    return ChannelManager;
}(EventEmitter);
EventManager.subscribe(['StreamStart', 'StreamEnd', 'RecordingRenamed'], function (settingsObj) {
    var eventString;
    if (settingsObj.hasOwnProperty('event') && settingsObj.hasOwnProperty('info')) {
        eventString = settingsObj['event'];
        if (settingsObj['event'] === 'StreamStart') {
            eventString = 'stream-start';
        } else if (settingsObj['event'] === 'StreamEnd') {
            eventString = 'stream-end';
        }
        ChannelManager.emit(eventString, settingsObj['info']);
    }
    if (settingsObj.hasOwnProperty('event') && settingsObj.hasOwnProperty('old') && settingsObj.hasOwnProperty('new')) {
        eventString = settingsObj['event'];
        if (settingsObj['event'] === 'RecordingRenamed') {
            eventString = 'recording-renamed';
            var renameInfo = {
                old: settingsObj['old'],
                new: settingsObj['new']
            };
            ChannelManager.emit(eventString, encodeURIComponent(JSON.stringify(renameInfo)));
        }
    }
});

function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (name === 'constructor') {
                return;
            }
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

var Logger = function () {
    function Logger() {}
    Logger.log = function (message) {
        console.log(message);
    };
    Logger.warn = function (type, warnCaller, once) {
        if (once === void 0) {
            once = false;
        }
        switch (type) {
            case 'sourceWarning':
                Logger.warnMessage = 'Info: ' + warnCaller + ' accesses a source property,' + ' which is shared by all items linked to the source. Setting this property' + ' will affect all linked items.';
                break;
            case 'other':
                //Other conditions that we can add for other warning instances
                break;
            default:
                break;
        }
        if (!once) {
            console.warn(Logger.warnMessage);
        } else if (!Logger.onceWarningsShown[warnCaller]) {
            console.warn(Logger.warnMessage + Logger.onceMessage);
            Logger.onceWarningsShown[warnCaller] = true;
        }
    };
    Logger.onceWarningsShown = {};
    Logger.onceMessage = " (This warning will only be shown once.)";
    return Logger;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * ItemTypes is used to define the type of the current Source.
 *
 * Check `getType()` method of {@link #core/Source#getType Core/Source}
 */

(function (ItemTypes) {
    ItemTypes[ItemTypes["UNDEFINED"] = 0] = "UNDEFINED";
    ItemTypes[ItemTypes["FILE"] = 1] = "FILE";
    ItemTypes[ItemTypes["LIVE"] = 2] = "LIVE";
    ItemTypes[ItemTypes["TEXT"] = 3] = "TEXT";
    ItemTypes[ItemTypes["BITMAP"] = 4] = "BITMAP";
    ItemTypes[ItemTypes["SCREEN"] = 5] = "SCREEN";
    ItemTypes[ItemTypes["FLASHFILE"] = 6] = "FLASHFILE";
    ItemTypes[ItemTypes["GAMESOURCE"] = 7] = "GAMESOURCE";
    ItemTypes[ItemTypes["HTML"] = 8] = "HTML";
})(exports.ItemTypes || (exports.ItemTypes = {}));
/**
 * Used by Source and Item to implement methods that are used on both classes
 * More info to be added soon.
 */
var iSource = function () {
    function iSource() {}
    iSource.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    iSource.prototype.setName = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            _this._name = value;
            if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                Item.set('prop:name', _this._name, _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                if (_this._isItemCall) {
                    Logger.warn('sourceWarning', 'setName', true);
                    _this._checkPromise = Item.get('itemlist', _this._id);
                } else {
                    _this._checkPromise = Item.wrapGet('itemlist', _this._srcId, _this._id, _this._updateId.bind(_this));
                }
                _this._checkPromise.then(function (itemlist) {
                    var promiseArray = [];
                    var itemsArray = itemlist.split(',');
                    itemsArray.forEach(function (itemId) {
                        promiseArray.push(new Promise(function (itemResolve) {
                            Item.set('prop:name', _this._name, itemId).then(function () {
                                itemResolve(true);
                            });
                            Item.wrapSet('prop:name', _this._name, _this._srcId, itemId, _this._updateId.bind(_this));
                        }));
                    });
                    Promise.all(promiseArray).then(function () {
                        resolve(_this);
                    });
                });
            }
        });
    };
    iSource.prototype.getName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getName', true);
                _this._checkPromise = Item.get('prop:name', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:name', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                _this._name = String(val);
                resolve(val);
            });
        });
    };
    iSource.prototype.setCustomName = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            _this._cname = value;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setCustomName', true);
                Item.set('prop:cname', _this._cname, _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:cname', _this._cname, _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSource.prototype.getCustomName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getCustomName', true);
                Item.get('prop:cname', _this._id).then(function (val) {
                    resolve(val);
                });
            } else {
                Item.wrapGet('prop:cname', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val);
                });
            }
        });
    };
    iSource.prototype.getValue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getValue', true);
                _this._checkPromise = Item.get('prop:item', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:item', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                val = val === 'null' ? '' : val;
                if (val === '') {
                    _this._value = '';
                    resolve(val);
                } else {
                    try {
                        _this._value = XML.parseJSON(JSON$1.parse(val));
                        resolve(_this._value);
                    } catch (e) {
                        // value is not valid XML (it is a string instead)
                        _this._value = val;
                        resolve(val);
                    }
                }
            });
        });
    };
    iSource.prototype.setValue = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            var val = typeof value === 'string' ? value : value.toString();
            if (typeof value !== 'string') {
                _this._value = JSON$1.parse(val);
            } else {
                _this._value = val;
            }
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setValue', true);
                Item.set('prop:srcitem', val, _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:srcitem', val, _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSource.prototype.getKeepLoaded = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getKeepLoaded', true);
                _this._checkPromise = Item.get('prop:keeploaded', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:keeploaded', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                _this._keepLoaded = val === '1';
                resolve(_this._keepLoaded);
            });
        });
    };
    iSource.prototype.setKeepLoaded = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            _this._keepLoaded = value;
            _this._globalsrc = value;
            if (versionCompare(getVersion()).is.lessThan(globalsrcMinVersion)) {
                Item.set('prop:globalsrc', _this._globalsrc ? '1' : '0', _this._id);
            }
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setKeepLoaded', true);
                Item.set('prop:keeploaded', _this._keepLoaded ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:keeploaded', _this._keepLoaded ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSource.prototype.getId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                resolve(_this._id);
            } else {
                if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                    reject(new Error('Only available on versions above ' + minVersion));
                } else {
                    Item.wrapGet('prop:srcid', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (srcid) {
                        resolve(srcid);
                    });
                }
            }
        });
    };
    iSource.prototype.refresh = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Item.set('refresh', '', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('refresh', '', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSource.prototype.getItemList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                Scene.searchItemsById(_this._id).then(function (item) {
                    var itemArray = [];
                    itemArray.push(item);
                    resolve(itemArray);
                });
            } else {
                if (_this._isItemCall) {
                    _this._checkPromise = Item.get('itemlist', _this._id);
                } else {
                    _this._checkPromise = Item.wrapGet('itemlist', _this._srcId, _this._id, _this._updateId.bind(_this));
                }
                _this._checkPromise.then(function (itemlist) {
                    var promiseArray = [];
                    var itemsArray = String(itemlist).split(',');
                    itemsArray.forEach(function (itemId) {
                        promiseArray.push(new Promise(function (itemResolve) {
                            Scene.searchItemsById(itemId).then(function (item) {
                                itemResolve(item);
                            }).catch(function () {
                                return itemResolve(null);
                            });
                        }));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        resolve(results.filter(function (res) {
                            return res !== null;
                        }));
                    });
                });
            }
        });
    };
    iSource.prototype.getType = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                _this._checkPromise = Item.get('prop:type', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:type', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                _this._type = exports.ItemTypes[exports.ItemTypes[Number(val)]];
                resolve(_this._type);
            });
        });
    };
    return iSource;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * A `Source` represents an object of an Item that is used on the stage.
 * Manipulating Source specific properties would render changes to all
 * items linked to that source.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 * var Scene = xjs.Scene
 *
 * xjs.ready()
 *    .then(Scene.getById(1))
 *    .then(function(scene) {
 *    scene.getSources().then(function(sources) {
 *    return sources[0].setCustomName('Custom Name');
 *    })
 * })
 *```
 *
 * All methods marked as *Chainable* resolve with the original `Source` instance.
 * This allows you to perform sequential operations correctly: *
 * ```javascript
 * var xjs = require('xjs');
 * var Source = xjs.Source;
 *
 * xjs.ready()
 *    .then(Source.getCurrentSource)
 *    .then(function(source){
 *     //Manipulate source here
 *     return source.setName('New Name');
 *  }).then(function(source){
 *     return source.setKeepLoaded(true)
 *  }).then(function(source){
 *     // set more source properties here
 *  })
 * ```
 */
var Source = function () {
    function Source(props) {
        props = props ? props : {};
        this._name = props['name'];
        this._cname = props['cname'];
        this._id = props['id'];
        this._srcId = props['srcid'];
        this._sceneId = props['sceneId'];
        this._value = props['value'];
        this._keepLoaded = props['keeploaded'];
        this._type = Number(props['type']);
        this._xmlparams = props;
        this._isItemCall = false;
    }
    /**
     * return: Promise<Source>
     *
     * Get the current source (when function is called by sources), or the source
     * that was right-clicked to open the source properties window (when function is called
     * from the source properties window)
     *
     * #### Usage
     *
     * ```javascript
     * xjs.Source.getCurrentSource().then(function(source) {
     *   // This will fetch the current source (the plugin)
     * }).catch(function(err) {
     *   // Handle the error here. Errors would only occur
     *   // if we try to execute this method on Extension plugins
     * });
     * ```
     */
    Source.getCurrentSource = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isExtension()) {
                reject(Error('Extensions do not have sources ' + 'associated with them.'));
            } else if ((Environment.isSourcePlugin() || Environment.isSourceProps()) && versionCompare(getVersion()).is.greaterThan(minVersion)) {
                Source.getItemList().then(function (items) {
                    if (items.length > 0) {
                        items[0].getSource().then(function (source) {
                            resolve(source);
                        });
                    } else {
                        reject(Error('Cannot get item list'));
                    }
                });
            } else if (Environment.isSourcePlugin() || Environment.isSourceProps()) {
                Scene.searchItemsById(Item.getBaseId()).then(function (item) {
                    return item.getSource();
                }).then(function (source) {
                    resolve(source);
                });
            }
        });
    };
    /**
     * return: Promise<Item[]>
     *
     * Get the item List of the current Source.
     * The item list is a list of items linked to a single Source.
     *
     * #### Usage
     *
     * ```javascript
     * xjs.Source.getItemList()
     * .then(function(items) {
     *   // This will fetch the item list of the current Source
     *   for (var i = 0 ; i < items.length ; i++) {
     *     // Manipulate each item here
     *   }
     * });
     * ```
     *
     * This is just the shorter way of getting items that are linked to a single
     * source. See the long version below:
     * ```javascript
     * xjs.Source.getCurrentSource()
     * .then(source.getItemList)
     * .then(function(items) {
     * // Manipulate the items here
     * })
     * ```
     */
    Source.getItemList = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isExtension()) {
                reject(Error('Extensions do not have default items associated with them.'));
            } else if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                Scene.searchItemsById(Item.getBaseId()).then(function (item) {
                    var itemArray = [];
                    itemArray.push(item);
                    resolve(itemArray);
                });
            } else if (Environment.isSourcePlugin() || Environment.isSourceProps()) {
                Item.get('itemlist').then(function (itemlist) {
                    var promiseArray = [];
                    var itemsArray = itemlist.split(',');
                    itemsArray.forEach(function (itemId) {
                        promiseArray.push(new Promise(function (itemResolve) {
                            Scene.searchItemsById(itemId).then(function (item) {
                                itemResolve(item);
                            }).catch(function () {
                                return itemResolve(null);
                            });
                        }));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        resolve(results.filter(function (res) {
                            return res !== null;
                        }));
                    });
                });
            }
        });
    };
    /**
     * return: Promise<Source[]>
     *
     * Get all unique Source from every scene.
     * Total number of Sources returned may be less than total number of items on
     * all the scenes due to `Linked` items only having a single Source.
     *
     * #### Usage
     * ```javascript
     * xjs.Source.getAllSources().then(function(sources) {
     *   for(var i = 0 ; i < sources.length ; i++) {
     *      if(sources[i] instanceof xjs.HtmlSource) {
     *        // Manipulate HTML Source here
     *      }
     *    }
     * })
     * ```
     */
    Source.getAllSources = function () {
        return new Promise(function (resolve, reject) {
            var allJson = [];
            var allSrc = [];
            var uniqueObj = {};
            var uniqueSrc = [];
            var promiseArray = [];
            App.getAsList('presetconfig').then(function (jsonArr) {
                for (var i = 0; i < jsonArr.length - 1; i++) {
                    allJson = allJson.concat(jsonArr[i].children);
                }
                var sourcePromise = function sourcePromise(srcid) {
                    return new Promise(function (sourceResolve) {
                        Scene.searchSourcesById(srcid).then(function (result) {
                            allSrc = allSrc.concat(result);
                            sourceResolve(result);
                        }).catch(function (err) {
                            sourceResolve(null);
                        });
                    });
                };
                for (var i = 0; i < allJson.length; i++) {
                    if (typeof allJson[i] !== 'undefined') {
                        promiseArray.push(sourcePromise(allJson[i]['srcid']));
                    }
                }
                Promise.all(promiseArray).then(function (results) {
                    for (var h = 0; h < allSrc.length; h++) {
                        if (allSrc[h] !== null) {
                            for (var key in allSrc[h]) {
                                if (key === '_srcId') {
                                    uniqueObj[allSrc[h][key]] = allSrc[h];
                                }
                            }
                        }
                    }
                    for (var j in uniqueObj) {
                        if (uniqueObj.hasOwnProperty(j)) {
                            uniqueSrc.push(uniqueObj[j]);
                        }
                    }
                    resolve(uniqueSrc);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return Source;
}();
applyMixins(Source, [iSource]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var iSourceGame = function () {
    function iSourceGame() {}
    iSourceGame.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    iSourceGame.prototype.isSpecialOptimizationEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isSpecialOptimizationEnabled', true);
                Item.get('GameCapSurfSharing', _this._id).then(function (res) {
                    resolve(res === '1');
                });
            } else {
                Item.wrapGet('GameCapSurfSharing', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                    resolve(res === '1');
                });
            }
        });
    };
    iSourceGame.prototype.setSpecialOptimizationEnabled = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setSpecialOptimizationEnabled', true);
                Item.set('GameCapSurfSharing', value ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('GameCapSurfSharing', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSourceGame.prototype.isShowMouseEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isShowMouseEnabled', true);
                Item.get('GameCapShowMouse', _this._id).then(function (res) {
                    resolve(res === '1');
                });
            } else {
                Item.wrapGet('GameCapShowMouse', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                    resolve(res === '1');
                });
            }
        });
    };
    iSourceGame.prototype.setShowMouseEnabled = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setShowMouseEnabled', true);
                Item.set('GameCapShowMouse', value ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('GameCapShowMouse', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    iSourceGame.prototype.setOfflineImage = function (path) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'setOfflineImage', true);
        }
        return new Promise(function (resolve, reject) {
            if (_this._type !== exports.ItemTypes.GAMESOURCE) {
                reject(Error('Current item should be a game item'));
            } else if (Environment.isSourcePlugin()) {
                reject(Error('Source plugins cannot update offline images of other items'));
            } else if (!(_this._value instanceof XML)) {
                _this.getValue().then(function () {
                    _this.setOfflineImage(path).then(function (itemObj) {
                        resolve(itemObj);
                    });
                });
            } else {
                var regExp = new RegExp('^(([A-Z|a-z]:\\\\[^*|"<>?\n]*)|(\\\\\\\\.*?' + '\\\\.*)|([A-Za-z]+\\\\[^*|"<>?\\n]*))\.(png|gif|jpg|jpeg|tif)$');
                if (regExp.test(path) || path === '') {
                    var valueObj = JSON$1.parse(_this._value.toString());
                    valueObj['replace'] = path;
                    _this.setValue(XML.parseJSON(valueObj)).then(function () {
                        resolve(_this);
                    });
                }
            }
        });
    };
    iSourceGame.prototype.getOfflineImage = function () {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'getOfflineImage', true);
        }
        return new Promise(function (resolve, reject) {
            if (_this._type !== exports.ItemTypes.GAMESOURCE) {
                reject(Error('Current item should be a game item'));
            } else {
                _this.getValue().then(function () {
                    var valueObj = JSON$1.parse(_this._value.toString());
                    resolve(valueObj['replace'] ? valueObj['replace'] : '');
                });
            }
        });
    };
    return iSourceGame;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The GameSource class represents the sources of the game items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the GameItem class.
 * See: {@link #core/GameItem Core/GameItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.GameSource) {
 *         // Manipulate your audio device source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `GameSource`
 * instance.
 */
var GameSource = function (_super) {
    __extends(GameSource, _super);
    function GameSource() {
        _super.apply(this, arguments);
    }
    return GameSource;
}(Source);
applyMixins(GameSource, [iSourceGame]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var Audio = function () {
    function Audio() {}
    Audio.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    Audio.prototype.getVolume = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getVolume', true);
                _this._checkPromise = Item.get('prop:volume', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:volume', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val));
            });
        });
    };
    Audio.prototype.setVolume = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            value = value < 0 ? 0 : value > 100 ? 100 : value;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setVolume', true);
                _this._checkPromise = Item.set('prop:volume', String(value), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:volume', String(value), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    Audio.prototype.isMute = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isMute', true);
                _this._checkPromise = Item.get('prop:mute', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:mute', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    Audio.prototype.setMute = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setMute', true);
                _this._checkPromise = Item.set('prop:mute', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:mute', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    Audio.prototype.isAutoMute = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isAutoMute', true);
                _this._checkPromise = Item.get('prop:keepaudio', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:keepaudio', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val !== '1');
            });
        });
    };
    Audio.prototype.setAutoMute = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAutoMute', true);
                _this._checkPromise = Item.set('prop:keepaudio', value ? '0' : '1', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:keepaudio', value ? '0' : '1', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    Audio.prototype.isStreamOnlyAudio = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isStreamOnlyAudio', true);
                _this._checkPromise = Item.get('prop:sounddev', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:sounddev', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    Audio.prototype.setStreamOnlyAudio = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setStreamOnlyAudio', true);
                _this._checkPromise = Item.set('prop:sounddev', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:sounddev', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    Audio.prototype.isAudioAvailable = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isAudioAvailable', true);
                _this._checkPromise = Item.get('prop:audioavail', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:audioavail', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    return Audio;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The MicrophoneDevice class provides you with methods to add a microphone
 * device as a source on the stage.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var System = XJS.System;
 *
 * System.getMicrophones().then(function(microphones) {
 *  for (var i in microphones) {
 *    microphones[i].addToScene();
 *  }
 * });
 * ```
 */
var MicrophoneDevice = function () {
    function MicrophoneDevice() {}
    /**
     * param: (deviceJXON: JXON)
     * ```
     * return MicrophoneDevice
     * ```
     * Create a MicrophoneDevice onject based on a JXON object
     *
     */
    MicrophoneDevice.parse = function (jxon) {
        var m = new MicrophoneDevice();
        m._disp = jxon['disp'];
        m._name = jxon['name'];
        return m;
    };
    /**
     * return: string
     *
     * Gets the display ID
     *
     * #### Usage
     *
     * ```javascript
     * var micDisplayId = device.getDisplayId();
     * ```
     */
    MicrophoneDevice.prototype.getDisplayId = function () {
        return this._disp;
    };
    /**
     * return: XML
     *
     * Converts Microphone object into an XML object
     *
     * #### Usage
     *
     * ```javascript
     * var microphoneXML = microphone.toXML();
     * ```
     */
    MicrophoneDevice.prototype.toXML = function () {
        var microphone = new JSON$1();
        microphone.tag = 'item';
        microphone['item'] = this._disp;
        microphone['name'] = this._name;
        microphone['type'] = '2'; // type LIVE
        microphone['selfclosing'] = true;
        return XML.parseJSON(microphone);
    };
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Adds this microphone device to the current scene by default.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     */
    MicrophoneDevice.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                return App.callFunc(scenePrefix + 'additem', _this.toXML().toString());
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return MicrophoneDevice;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The CameraDevice Class is the object returned by
 * {@link #system/System System Class} getCameraDevices method. It provides
 * you with methods to fetch the Camera Device's id, name, and to add it as
 * a source in the current scene.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var System = XJS.System;
 *
 * System.getCameraDevices().then(function(cameras) {
 *   for (var i in cameras) {
 *     xml = cameras[i].toXML();
 *     // do something with the XML here
 *   }
 * });
 * ```
 */
var CameraDevice = function () {
    function CameraDevice(props) {
        this._id = props['id'];
        this._name = props['name'];
    }
    /**
     * return: string
     *
     * Get the ID of the device. The ID of the device is based on the `disp`
     * attribute of the devices XML
     *
     * #### Usage
     *
     * ```javascript
     * var cameraID = device.getId();
     * ```
     */
    CameraDevice.prototype.getId = function () {
        return this._id;
    };
    /**
     * return: string
     *
     * Get the Name of the device.
     *
     * #### Usage
     *
     * ```javascript
     * var cameraName = device.getName();
     * ```
     */
    CameraDevice.prototype.getName = function () {
        return this._name;
    };
    /**
     * return: XML
     *
     * Convert the current CameraDevice object to XML
     *
     * #### Usage
     *
     * ```javascript
     * var xml = device.toXML();
     * ```
     */
    CameraDevice.prototype.toXML = function () {
        var json = new JSON$1();
        json['disp'] = this._id;
        json['name'] = this._name;
        return XML.parseJSON(json);
    };
    /**
     * param: (deviceJSON: JXON)
     * ```
     * return: CameraDevice
     * ```
     *
     * Create a CameraDevice object based on a JXON object
     *
     * #### Usage
     *
     * ```javascript
     * var camera = CameraDevice.parse(JSONObj);
     * ```
     */
    CameraDevice.parse = function (deviceJSON) {
        var cam = new CameraDevice({
            id: deviceJSON['disp'].replace(/&amp;/ig, '&'),
            name: deviceJSON['name']
        });
        return cam;
    };
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Adds this camera device to the current scene by default.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     */
    CameraDevice.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                return App.callFunc(scenePrefix + 'addcamera', 'dev:' + _this._id);
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return CameraDevice;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * The Game Class is the object returned by {@link #system/System System Class}
 * getGames method. It provides you with methods to fetch the game object's
 * attributes, as well as methods to add any game to the current scene.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var System = XJS.System;
 * var xml;
 *
 * System.getGames().then(function(games) {
 *  for (var i in games) {
 *    if(games[i].isFullscreen()) {
 *      games[i].addToScene();
 *    }
 *  }
 * });
 * ```
 */
var Game = function () {
    function Game() {}
    /**
     * return: number
     *
     * Gets the game's process ID.
     *
     * #### Usage
     *
     * ```javascript
     * var processId = game.getPid();
     * ```
     */
    Game.prototype.getPid = function () {
        return this._pid;
    };
    /**
     * return: number
     *
     * Gets the Graphics API handle.
     *
     * #### Usage
     *
     * ```javascript
     * var handle = game.getHandle();
     * ```
     */
    Game.prototype.getHandle = function () {
        return this._handle;
    };
    /**
     * return: number
     *
     * Gets the window handle.
     *
     * #### Usage
     *
     * ```javascript
     * var windowHandle = game.getWindowHandle();
     * ```
     */
    Game.prototype.getWindowHandle = function () {
        return this._hwnd;
    };
    /**
     * return: string
     *
     * Gets the Graphics API type.
     *
     * #### Usage
     *
     * ```javascript
     * var gApiType = game.getGapiType();
     * ```
     *
     * #### Possible Values
     *
     * ```
     * OGL, DX8, DX8_SwapChain, DX9, DX9Ex, DX9_SwapChain,
     * DX9_PresentEx, DX10, DX11, DX11.1, DX11.1_Present1
     * ```
     */
    Game.prototype.getGapiType = function () {
        return this._gapitype;
    };
    /**
     * return: Rectangle
     *
     * Gets the game resolution in pixels.
     *
     * #### Usage
     *
     * ```javascript
     * var resolution = game.getResolution();
     * ```
     */
    Game.prototype.getResolution = function () {
        return Rectangle.fromDimensions(this._width, this._height);
    };
    /**
     * return: boolean
     *
     * Checks if game has exclusive full screen.
     *
     * #### Usage
     *
     * ```javascript
     * var isFullscreen = game.isFullscreen();
     * ```
     */
    Game.prototype.isFullscreen = function () {
        return this._flags === 1 ? true : false;
    };
    /**
     * return: string
     *
     * Gets the window title
     *
     * #### Usage
     *
     * ```javascript
     * var windowName = game.getWindowName();
     * ```
     */
    Game.prototype.getWindowName = function () {
        return this._wndname;
    };
    /**
     * return: number
     *
     * Gets timestamp of last frame in milliseconds.
     *
     * #### Usage
     *
     * ```javascript
     * var lastFrameTimestamp = game.getLastFrameTimestamp();
     * ```
     */
    Game.prototype.getLastFrameTimestamp = function () {
        return this._lastframets;
    };
    /**
     * return: number
     *
     * Get the FPS Render of the game
     */
    Game.prototype.getFpsRender = function () {
        return this._fpsRender;
    };
    /**
     * return: number
     *
     * Get the Captured FPS of the game
     */
    Game.prototype.getFpsCapture = function () {
        return this._fpsCapture;
    };
    /**
     * return: string
     *
     * Get the image name of the game
     */
    Game.prototype.getImageName = function () {
        return this._imagename;
    };
    /**
     * return: string
     *
     * Get the replace image value of the game
     */
    Game.prototype.getReplace = function () {
        return this._replace;
    };
    /**
     * param: gameJSON<JXON>
     * ```
     * return: Game
     * ```
     *
     * Converts a JSON object into a Game object
     *
     * #### Usage
     *
     * ```javascript
     * var XJS = require('xjs');
     * var game = XJS.Game.parse(jsonObj);
     * ```
     */
    Game.parse = function (jxon) {
        var g = new Game();
        g._pid = jxon['pid'] !== undefined ? parseInt(jxon['pid']) : undefined;
        g._handle = jxon['handle'] !== undefined ? parseInt(jxon['handle']) : undefined;
        g._hwnd = jxon['hwnd'] !== undefined ? parseInt(jxon['hwnd']) : undefined;
        g._gapitype = jxon['GapiType'];
        g._width = jxon['width'] !== undefined ? parseInt(jxon['width']) : undefined;
        g._height = jxon['height'] !== undefined ? parseInt(jxon['height']) : undefined;
        g._flags = jxon['flags'] !== undefined ? parseInt(jxon['flags']) : undefined;
        g._wndname = jxon['wndname'];
        g._lastframets = jxon['lastframets'] !== undefined ? parseInt(jxon['lastframets']) : undefined;
        g._fpsRender = jxon['fpsRender'] !== undefined ? Number(jxon['fpsRender']) : undefined;
        g._fpsCapture = jxon['fpsCapture'] !== undefined ? Number(jxon['fpsCapture']) : undefined;
        g._imagename = jxon['imagename'];
        g._replace = jxon['replace'];
        return g;
    };
    /**
     * return: XML
     *
     * Converts Game object into an XML object
     *
     * #### Usage
     *
     * ```javascript
     * var gameXML = game.toXML();
     * ```
     */
    Game.prototype.toXML = function () {
        var gamesource = new JSON$1();
        gamesource.tag = 'src';
        gamesource['pid'] = this._pid;
        gamesource['handle'] = this._handle;
        gamesource['hwnd'] = this._hwnd;
        gamesource['gapitype'] = this._gapitype;
        gamesource['width'] = this._width;
        gamesource['height'] = this._height;
        gamesource['flags'] = this._flags;
        gamesource['wndname'] = this._wndname;
        gamesource['lastframets'] = this._lastframets;
        gamesource['selfclosing'] = true;
        return XML.parseJSON(gamesource);
    };
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Adds this game to the current scene by default.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     */
    Game.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                return App.callFunc(scenePrefix + 'addgamesource', 'dev:' + _this.toXML());
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     *  return: Game
     *
     *  Returns a special Game object that may be added to the stage. This
     *  object automatically detects any compatible games that are running
     *  and focused, and changes the displayed game on the stage accordingly.
     *
     *  #### Usage
     *
     * ```javascript
     * var xjs = require('xjs');
     * xjs.Game.autoDetect().addToScene();
     * ```
     */
    Game.autoDetect = function () {
        if (Game._autoDetect === undefined) {
            Game._autoDetect = new Game();
            var ad = Game._autoDetect;
            ad._pid = 0;
            ad._handle = 0;
            ad._hwnd = 0;
            ad._gapitype = "";
            ad._width = 0;
            ad._height = 0;
            ad._flags = 0;
            ad._wndname = "";
            ad._lastframets = 0;
            ad._fpsRender = 0;
            ad._fpsCapture = 0;
            ad._imagename = "";
            Game._autoDetect.addToScene = function (value) {
                return new Promise(function (resolve, reject) {
                    var scenePrefix = '';
                    var scenePromise;
                    if (typeof value === 'number' || value instanceof Scene) {
                        scenePromise = new Promise(function (innerResolve, innerReject) {
                            Scene.getSceneCount().then(function (sceneCount) {
                                if (typeof value === 'number') {
                                    var int = Math.floor(value);
                                    if (int > sceneCount || int === 0) {
                                        innerReject(new Error('Scene not existing.'));
                                    } else {
                                        scenePrefix = 's:' + (int - 1) + '|';
                                        innerResolve();
                                    }
                                } else {
                                    value.getSceneNumber().then(function (int) {
                                        if (int > sceneCount || int === 0) {
                                            innerReject(new Error('Scene not existing.'));
                                        } else {
                                            scenePrefix = 's:' + (int - 1) + '|';
                                            innerResolve();
                                        }
                                    });
                                }
                            });
                        });
                    } else if (typeof value === 'undefined') {
                        scenePromise = Promise.resolve();
                    } else {
                        scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
                    }
                    scenePromise.then(function () {
                        var defposPromise;
                        if (Environment.isSourcePlugin()) {
                            defposPromise = new Promise(function (defposResolve) {
                                App.get('presetconfig:-1').then(function (presetConfig) {
                                    var placementJSON = JSON$1.parse(presetConfig);
                                    defposResolve(placementJSON['defpos']);
                                });
                            });
                        } else {
                            defposPromise = new Promise(function (defposResolve) {
                                App.get('preset:0').then(function (main) {
                                    return App.get('presetconfig:' + main);
                                }).then(function (presetConfig) {
                                    var placementJSON = JSON$1.parse(presetConfig);
                                    defposResolve(placementJSON['defpos']);
                                });
                            });
                        }
                        defposPromise.then(function (defpos) {
                            var posString;
                            if (defpos === '0') {
                                posString = 'pos_left="0" pos_top="0" pos_right="0.5" pos_bottom="0.5"';
                            } else if (defpos === '1') {
                                posString = 'pos_left="0.5" pos_top="0" pos_right="1" pos_bottom="0.5"';
                            } else if (defpos === '2') {
                                posString = 'pos_left="0" pos_top="0.5" pos_right="0.5" pos_bottom="1"';
                            } else if (defpos === '3') {
                                posString = 'pos_left="0.5" pos_top="0.5" pos_right="1" pos_bottom="1"';
                            } else {
                                posString = 'pos_left="0.25" pos_top="0.25" pos_right="0.75" pos_bottom="0.75"';
                            }
                            var adstring = '<item GameCapTrackActive="1" GameCapTrackActiveFullscreen="0" item="&lt;src pid=&quot;0&quot; handle=&quot;0&quot; hwnd=&quot;0&quot; GapiType=&quot;&quot; width=&quot;0&quot; height=&quot;0&quot; flags=&quot;0&quot; wndname=&quot;&quot; lastframets=&quot;0&quot; fpsRender=&quot;0.000000&quot; fpsCapture=&quot;0.000000&quot; imagename=&quot;&quot;/&gt; " name="Game: Auto Detect"  type="7" ' + posString + ' />';
                            return App.callFunc(scenePrefix + 'additem', adstring);
                        }).then(function () {
                            resolve(true);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            };
        }
        return Game._autoDetect;
    };
    return Game;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 * This enum is used for {@link #system/System System Class} getAudioDevices
 * method's first parameter.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * XJS.System.getAudioDevices(XJS.AudioDeviceDataflow.CAPTURE, ...);
 * ```
 */

(function (AudioDeviceDataflow) {
    AudioDeviceDataflow[AudioDeviceDataflow["RENDER"] = 1] = "RENDER";
    AudioDeviceDataflow[AudioDeviceDataflow["CAPTURE"] = 2] = "CAPTURE";
    AudioDeviceDataflow[AudioDeviceDataflow["ALL"] = 3] = "ALL";
})(exports.AudioDeviceDataflow || (exports.AudioDeviceDataflow = {}));
/**
 * This enum is used for {@link #system/System System Class} getAudioDevices
 * method's second parameter.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * XJS.System.getAudioDevices(..., XJS.AudioDeviceState.ACTIVE);
 * ```
 */

(function (AudioDeviceState) {
    AudioDeviceState[AudioDeviceState["ACTIVE"] = 1] = "ACTIVE";
    AudioDeviceState[AudioDeviceState["DISABLED"] = 2] = "DISABLED";
    AudioDeviceState[AudioDeviceState["UNPLUGGED"] = 4] = "UNPLUGGED";
    AudioDeviceState[AudioDeviceState["NOTPRESENT"] = 8] = "NOTPRESENT";
    AudioDeviceState[AudioDeviceState["ALL"] = 15] = "ALL";
})(exports.AudioDeviceState || (exports.AudioDeviceState = {}));
/**
 * The System class provides you methods to fetch audio devices to manipulate
 * the application's audio settings. It also allows you to fetch games,
 * microphone devices and camera devices to add to scenes. Finally, some
 * system-level functionality such as cursor position is exposed.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var System = XJS.System;
 *
 * System.getCameraDevices().then(function(cameras) {
 *   window.cameras = cameras;
 * });
 * ```
 */
var System = function () {
    function System() {}
    /**
     * return: Promise<AudioDevice[]>
     *
     * Gets audio devices, both input and output
     * See also: {@link #system/AudioDevice System/AudioDevice}
     *
     * #### Usage
     *
     * ```javascript
     * System.getAudioDevices(
     *   XML.AudioDeviceDataflow.ALL,
     *   XML.AudioDeviceState.ACTIVE
     * ).then(function(devices) {
     *   // devices is an array of AudioDevice object
     *   window.audios = devices;
     * });
     * ```
     */
    System.getAudioDevices = function (dataflow, state) {
        if (dataflow === void 0) {
            dataflow = exports.AudioDeviceDataflow.ALL;
        }
        if (state === void 0) {
            state = exports.AudioDeviceState.ACTIVE;
        }
        return new Promise(function (resolve) {
            App.getAsList('wasapienum').then(function (devicesJXON) {
                var devices = [];
                if (devicesJXON !== undefined) {
                    var devicesJXONLength = devicesJXON.length;
                    for (var i = 0; i < devicesJXONLength; ++i) {
                        var device = devicesJXON[i];
                        var bitsState = exports.AudioDeviceState[String(device['State']).toUpperCase().replace(/\s+/g, '')];
                        if ((bitsState & state) !== bitsState) {
                            continue;
                        }
                        var bitsFlow = exports.AudioDeviceDataflow[String(device['DataFlow']).toUpperCase()];
                        if ((bitsFlow & dataflow) !== bitsFlow) {
                            continue;
                        }
                        if (device['name'].toLowerCase().indexOf('xsplit') > -1) {
                            continue;
                        }
                        devices.push(AudioDevice.parse(device));
                    }
                }
                resolve(devices);
            });
        });
    };
    /**
     * return: Promise<CameraDevice[]>
     *
     * Gets all camera devices
     * See also: {@link #system/CameraDevice System/CameraDevice}
     *
     * #### Usage
     *
     * ```javascript
     * System.getCameraDevices().then(function(devices) {
     *   // devices is an array of CameraDevice object
     *   window.cameras = devices;
     * });
     * ```
     */
    System.getCameraDevices = function () {
        return new Promise(function (resolve) {
            App.getAsList('dshowenum:vsrc').then(function (devicesJSON) {
                var devices = [];
                if (devicesJSON !== undefined) {
                    for (var _i = 0, devicesJSON_1 = devicesJSON; _i < devicesJSON_1.length; _i++) {
                        var device = devicesJSON_1[_i];
                        if (String(device['disp']).toLowerCase().indexOf('xsplit') === -1 && String(device['disp']).toLowerCase() !== ('@DEVICE:SW:{860BB310-5D01-11D0-BD3B-00A0C911CE86}\\' + '{778abfb2-e87b-48a2-8d33-675150fcf8a2}').toLowerCase() && String(device['name']).toLowerCase().indexOf('Intel(R) RealSense(TM) 3D Camera Virtual Driver'.toLowerCase()) === -1 && String(device['name']).toLowerCase().indexOf('Intel(R) RealSense(TM) Camera SR300 Virtual Driver'.toLowerCase()) === -1 && String(device['disp']).toLowerCase().indexOf('@DEVICE:PNP:\\\\?\\USB#VID_8086&PID_0AA5&MI_02#'.toLowerCase()) === -1 && String(device['disp']).toLowerCase().indexOf('@DEVICE:PNP:\\\\?\\USB#VID_8086&PID_0A66&MI_02#'.toLowerCase()) === -1) {
                            devices.push(CameraDevice.parse(device));
                        }
                    }
                    resolve(devices);
                }
            });
        });
    };
    /**
     * return: Promise<Game[]>
     *
     * Gets all currently running games
     * See also: {@link #system/Game System/Game}
     *
     * #### Usage
     *
     * ```javascript
     * System.getGames().then(function(games) {
     *   // games is an array of Game object
     *   window.games = games;
     * });
     * ```
     */
    System.getGames = function () {
        return new Promise(function (resolve) {
            App.getAsList('gsenum').then(function (gamesJXON) {
                var games = [];
                if (gamesJXON !== undefined) {
                    var gamesJXONLength = gamesJXON.length;
                    for (var i = 0; i < gamesJXONLength; ++i) {
                        games.push(Game.parse(gamesJXON[i]));
                    }
                }
                resolve(games);
            });
        });
    };
    /**
     * return: Promise<MicrophoneDevice[]>
     *
     * Gets all audio capture devices that may be added to the stage
     * See also: {@link #system/MicrophoneDevice System/MicrophoneDevice}
     *
     * #### Usage
     *
     * ```javascript
     * System.getMicrophones().then(function(microphones) {
     *   microphones[0].addToScene(); // add first microphone to stage
     * });
     * ```
     */
    System.getMicrophones = function () {
        return new Promise(function (resolve) {
            App.getAsList('dshowenum:asrc').then(function (micsJXON) {
                var mics = [];
                if (micsJXON !== undefined) {
                    var micsJXONLength = micsJXON.length;
                    for (var i = 0; i < micsJXONLength; ++i) {
                        if (micsJXON[i]['WaveInId'] !== undefined) {
                            mics.push(MicrophoneDevice.parse(micsJXON[i]));
                        }
                    }
                }
                resolve(mics);
            });
        });
    };
    /**
     * return: Promise<string[]>
     *
     * Gets array of system-installed fonts
     *
     * #### Usage
     *
     * ```javascript
     * var mySelect = document.getElementById("mySelect");
     *
     * System.getSystemFonts().then(function(fontsArray) {
     *   var fontsArrayLength = fontsArray.length;
     *   for (var i = 0; i < fontsArrayLength; ++i) {
     *     var option = document.createElement('option');
     *     option.text = fontsArray[i];
     *     mySelect.add(option);
     *   }
     * });
     * ```
     */
    System.getFonts = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else {
                App.get('html:fontlist').then(function (fontlist) {
                    if (typeof fontlist === 'string' && fontlist !== '') {
                        var fontArray = fontlist.split(',');
                        resolve(fontArray);
                    } else {
                        reject(Error('cannot fetch list of available system fonts'));
                    }
                });
            }
        });
    };
    /**
     * return: Promise<JSON>
     *
     * Gets the position of the cursor. Does not work on Source Plugins.
     *
     * #### Usage
     *
     * ```javascript
     * System.getCursorPosition().then(function(pos) {
     *   var x = pos.x; // X Axis
     *   var y = pos.y; // Y Axis
     * });
     * ```
     */
    System.getCursorPosition = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else {
                var res_1;
                exec('GetCursorPos').then(function (result) {
                    res_1 = result;
                    if (typeof res_1 === 'string') {
                        var posArr = res_1.split(',');
                        var pos = {};
                        pos['x'] = Number(posArr[0]);
                        pos['y'] = Number(posArr[1]);
                        resolve(pos);
                    } else {
                        reject(Error('cannot fetch current cursor position'));
                    }
                });
            }
        });
    };
    /**
     * param: JSON: {x: number, y: number}
     *
     * Sets the position of the cursor. Does not work on Source Plugins.
     *
     * #### Usage
     *
     * ```javascript
     * System.setCursorPosition({x:0, y:0});
     * ```
     */
    System.setCursorPosition = function (pos) {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else if (typeof pos.x !== 'number' || typeof pos.y !== 'number') {
                reject(Error('invalid parameters'));
            } else {
                exec('SetCursorPos', String(pos.x), String(pos.y));
                resolve(true);
            }
        });
    };
    return System;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceCamera = function () {
    function SourceCamera() {
        this._delayExclusionObject = {
            roxio: "vid_1b80&pid_e0(01|11|12)",
            hauppauge1: "vid_2040&pid_49(0[0-3]|8[0-3])",
            hauppauge2: "vid_2040&pid_e50[012a4]"
        };
    }
    SourceCamera.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceCamera.prototype.getDeviceId = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getDeviceId', true);
                Item.get('prop:item', _this._id).then(function (val) {
                    resolve(val);
                });
            } else {
                Item.wrapGet('prop:item', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val);
                });
            }
        });
    };
    SourceCamera.prototype.getAudioOffset = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var streamDelay, audioDelay;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getAudioOffset', true);
                Item.get('prop:StreamDelay', _this._id).then(function (val) {
                    streamDelay = Number(val);
                    return Item.get('prop:AudioDelay', _this._id);
                }).then(function (val) {
                    audioDelay = Number(val);
                    resolve((audioDelay - streamDelay) / 10000);
                });
            } else {
                Item.wrapGet('prop:StreamDelay', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    streamDelay = Number(val);
                    return Item.get('prop:AudioDelay', _this._id);
                }).then(function (val) {
                    audioDelay = Number(val);
                    resolve((audioDelay - streamDelay) / 10000);
                });
            }
        });
    };
    SourceCamera.prototype.setAudioOffset = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var itemAudio, delay;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAudioOffset', true);
                _this._checkPromise = Item.get('prop:itemaudio', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:itemaudio', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                itemAudio = val;
                return _this.isAudioAvailable();
            }).then(function (val) {
                if (val === false && itemAudio === '') {
                    reject(new Error('Device has no audio'));
                } else {
                    return _this.getDelay();
                }
            }).then(function (val) {
                delay = val;
                if (value >= 0) {
                    return Item.set('prop:StreamDelay', String(delay * 10000), _this._id);
                } else {
                    return Item.set('prop:StreamDelay', String((delay + value * -1) * 10000), _this._id);
                }
            }).then(function (val) {
                if (value >= 0) {
                    return Item.set('prop:AudioDelay', String((delay + value) * 10000), _this._id);
                } else {
                    return Item.set('prop:AudioDelay', String(delay * 10000), _this._id);
                }
            }).then(function (val) {
                resolve(_this);
            });
        });
    };
    SourceCamera.prototype.getAudioInput = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var itemAudioId;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getAudioInput', true);
                _this._checkPromise = Item.get('prop:itemaudio', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:itemaudio', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                if (val === '') {
                    reject(new Error('No tied audio input'));
                } else {
                    itemAudioId = val;
                    return System.getMicrophones();
                }
            }).then(function (val) {
                var micDevice;
                if (val !== undefined) {
                    for (var i = 0; i < val.length; ++i) {
                        if (val[i].getDisplayId() === itemAudioId) {
                            micDevice = val[i];
                            break;
                        }
                    }
                }
                if (micDevice !== undefined) {
                    resolve(micDevice);
                } else {
                    reject(new Error('Tied audio input not present'));
                }
            });
        });
    };
    SourceCamera.prototype.setAudioInput = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAudioInput', true);
                Item.set('prop:itemaudio', value.getDisplayId(), _this._id).then(function (val) {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:itemaudio', value.getDisplayId(), _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(_this);
                });
            }
        });
    };
    SourceCamera.prototype.isStreamPaused = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isStreamPaused', true);
                Item.get('prop:StreamPause', _this._id).then(function (val) {
                    resolve(val === '1');
                });
            } else {
                Item.wrapGet('prop:StreamPause', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val === '1');
                });
            }
        });
    };
    SourceCamera.prototype.setStreamPaused = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setStreamPaused', true);
                _this._checkPromise = Item.set('prop:StreamPause', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:StreamPause', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                return Item.get('prop:StreamPause', _this._id);
            }).then(function (val) {
                if (value === (val === '1')) {
                    resolve(_this);
                } else {
                    reject(new Error('Camera feed cannot be paused/resumed or is not present'));
                }
            });
        });
    };
    SourceCamera.prototype.isHardwareEncoder = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isHardwareEncoder', true);
                _this._checkPromise = Item.get('prop:hwencoder', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:hwencoder', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                if (val === '1') {
                    resolve(true);
                } else {
                    _this.isActive().then(function (isActive) {
                        if (isActive) {
                            resolve(false);
                        } else {
                            reject(new Error('Cannot check hardware encoding. Device not present'));
                        }
                    });
                }
            });
        });
    };
    SourceCamera.prototype.isActive = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isActive', true);
                Item.get('prop:activestate', _this._id).then(function (val) {
                    resolve(val === 'active');
                });
            } else {
                Item.wrapGet('prop:activestate', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val === 'active');
                });
            }
        });
    };
    SourceCamera.prototype.getDelay = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var streamDelay, audioDelay;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getDelay', true);
                _this._checkPromise = Item.get('prop:StreamDelay', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:StreamDelay', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    streamDelay = Number(val);
                    return Item.get('prop:AudioDelay', _this._id);
                });
            }
            _this._checkPromise.then(function (val) {
                streamDelay = Number(val);
                return Item.get('prop:AudioDelay', _this._id);
            }).then(function (val) {
                audioDelay = Number(val);
                if (streamDelay < audioDelay) {
                    resolve(streamDelay / 10000);
                } else {
                    resolve(audioDelay / 10000);
                }
            });
        });
    };
    SourceCamera.prototype.setDelay = function (value) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'setDelay', true);
        }
        return new Promise(function (resolve, reject) {
            var isPositive, audioOffset;
            _this.isHardwareEncoder().then(function (val) {
                if (val === true) {
                    reject(new Error('Cannot set delay to hardware encoder devices'));
                } else {
                    return _this.getValue();
                }
            }).then(function (val) {
                for (var key in _this._delayExclusionObject) {
                    var regex = new RegExp(_this._delayExclusionObject[key].toLowerCase(), 'g');
                    if (typeof val === 'string' && val.toLowerCase().match(regex) != null) {
                        reject(new Error('Cannot set delay to specific device'));
                        break;
                    }
                }
                return _this.getAudioOffset();
            }).then(function (val) {
                audioOffset = val;
                if (audioOffset >= 0) {
                    isPositive = true;
                    if (_this._isItemCall) {
                        return Item.set('prop:StreamDelay', String(value * 10000), _this._id);
                    } else {
                        return Item.wrapSet('prop:StreamDelay', String(value * 10000), _this._srcId, _this._id, _this._updateId.bind(_this));
                    }
                } else {
                    isPositive = false;
                    return Item.set('prop:StreamDelay', String((value + audioOffset * -1) * 10000), _this._id);
                }
            }).then(function (val) {
                if (isPositive) {
                    return Item.set('prop:AudioDelay', String((value + audioOffset) * 10000), _this._id);
                } else {
                    return Item.set('prop:AudioDelay', String(value * 10000), _this._id);
                }
            }).then(function (val) {
                resolve(_this);
            });
        });
    };
    SourceCamera.prototype.isForceDeinterlace = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isForceDeinterlace', true);
                Item.get('prop:fdeinterlace', _this._id).then(function (val) {
                    resolve(val === '3');
                });
            } else {
                Item.wrapGet('prop:fdeinterlace', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val === '3');
                });
            }
        });
    };
    SourceCamera.prototype.setForceDeinterlace = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setForceDeinterlace', true);
                Item.set('prop:fdeinterlace', value ? '3' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:fdeinterlace', value ? '3' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    return SourceCamera;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The CameraSource class represents the sources of the camera device items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the CameraItem class.
 * See: {@link #core/CameraItem Core/CameraItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.CameraSource) {
 *         // Manipulate your camera device source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `CameraSource`
 * instance.
 */
var CameraSource = function (_super) {
    __extends(CameraSource, _super);
    function CameraSource() {
        _super.apply(this, arguments);
    }
    return CameraSource;
}(Source);
applyMixins(CameraSource, [Audio, SourceCamera]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceAudio = function () {
    function SourceAudio() {}
    SourceAudio.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceAudio.prototype.isSilenceDetectionEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isSilenceDetectionEnabled', true);
                Item.get('prop:AudioGainEnable', _this._id).then(function (val) {
                    resolve(val === '1');
                });
            } else {
                //wrapget
                Item.wrapGet('prop:AudioGainEnable', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val === '1');
                });
            }
        });
    };
    SourceAudio.prototype.setSilenceDetectionEnabled = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setSilenceDetectionEnabled', true);
                Item.set('prop:AudioGainEnable', value ? '1' : '0', _this._id).then(function (res) {
                    resolve(_this);
                });
            } else {
                //wrapset
                Item.wrapSet('prop:AudioGainEnable', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                    resolve(_this);
                });
            }
        });
    };
    SourceAudio.prototype.getSilenceThreshold = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getSilenceThreshold', true);
                Item.get('prop:AudioGain', _this._id).then(function (val) {
                    resolve(Number(val));
                });
            } else {
                //wrapget
                Item.wrapGet('prop:AudioGain', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(Number(val));
                });
            }
        });
    };
    SourceAudio.prototype.setSilenceThreshold = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(Error('Only numbers are acceptable values for threshold'));
            } else if (value % 1 !== 0 || value < 0 || value > 128) {
                reject(Error('Only integers in the range 0-128 are acceptable for threshold'));
            } else {
                if (_this._isItemCall) {
                    Logger.warn('sourceWarning', 'setSilenceThreshold', true);
                    Item.set('prop:AudioGain', String(value), _this._id).then(function (res) {
                        resolve(_this);
                    });
                } else {
                    Item.wrapSet('prop:AudioGain', String(value), _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                        resolve(_this);
                    });
                }
            }
        });
    };
    SourceAudio.prototype.getSilencePeriod = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getSilencePeriod', true);
                Item.get('prop:AudioGainLatency', _this._id).then(function (val) {
                    resolve(Number(val));
                });
            } else {
                Item.wrapGet('prop:AudioGainLatency', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(Number(val));
                });
            }
        });
    };
    SourceAudio.prototype.setSilencePeriod = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(Error('Only numbers are acceptable values for period'));
            } else if (value % 1 !== 0 || value < 0 || value > 10000) {
                reject(Error('Only integers in the range 0-10000 are acceptable for period'));
            } else {
                if (_this._isItemCall) {
                    Logger.warn('sourceWarning', 'setSilencePeriod', true);
                    Item.set('prop:AudioGainLatency', String(value), _this._id).then(function (res) {
                        resolve(_this);
                    });
                } else {
                    Item.wrapSet('prop:AudioGainLatency', String(value), _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                        resolve(_this);
                    });
                }
            }
        });
    };
    SourceAudio.prototype.getAudioOffset = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getAudioOffset', true);
                Item.get('prop:AudioDelay', _this._id).then(function (val) {
                    resolve(Number(val));
                });
            } else {
                Item.wrapGet('prop:AudioDelay', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(Number(val));
                });
            }
        });
    };
    SourceAudio.prototype.setAudioOffset = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(Error('Only numbers are acceptable values for period'));
            } else if (value < 0) {
                reject(Error('Audio offset cannot be negative'));
            } else {
                if (_this._isItemCall) {
                    Logger.warn('sourceWarning', 'setAudioOffset', true);
                    Item.set('prop:AudioDelay', String(value), _this._id).then(function (res) {
                        resolve(_this);
                    });
                } else {
                    Item.wrapSet('prop:AudioDelay', String(value), _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (res) {
                        resolve(_this);
                    });
                }
            }
        });
    };
    return SourceAudio;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The AudioSource class represents the sources of the audio device items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the AudioItem class.
 * See: {@link #core/AudioItem Core/AudioItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.AudioSource) {
 *         // Manipulate your audio device source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `AudioSource`
 * instance.
 */
var AudioSource = function (_super) {
    __extends(AudioSource, _super);
    function AudioSource() {
        _super.apply(this, arguments);
    }
    return AudioSource;
}(Source);
applyMixins(AudioSource, [SourceAudio, Audio]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceConfigurable = function () {
    function SourceConfigurable() {}
    SourceConfigurable.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceConfigurable.prototype.loadConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'loadConfig', true);
                _this._checkPromise = Item.get('prop:BrowserConfiguration', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:BrowserConfiguration', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (config) {
                var configObj = config === 'null' ? {} : JSON.parse(config);
                var persist = Global.getPersistentConfig();
                for (var key in persist) {
                    delete configObj[key];
                }
                resolve(configObj);
            });
        });
    };
    SourceConfigurable.prototype.saveConfig = function (configObj) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'saveConfig', true);
        }
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin) {
                var slot_1;
                var savingAllowed_1 = false;
                Item.attach(_this._id).then(function (res) {
                    slot_1 = res;
                    return Item.get('prop:srcid');
                }).then(function (srcId) {
                    if (typeof srcId !== 'string' || srcId === '') {
                        // version is lower than 2.8
                        savingAllowed_1 = slot_1 === 0;
                    } else {
                        savingAllowed_1 = srcId === _this._srcId;
                    }
                    // only allow direct saving for self
                    if (savingAllowed_1) {
                        // check for valid object
                        if ({}.toString.call(configObj) === '[object Object]') {
                            // add persisted configuration if available
                            // currently only top level merging is available
                            var persist = Global.getPersistentConfig();
                            for (var key in persist) {
                                configObj[key] = persist[key];
                            }
                            exec('SetBrowserProperty', 'Configuration', JSON.stringify(configObj));
                            resolve(_this);
                        } else {
                            reject(Error('Configuration object should be ' + 'in JSON format.'));
                        }
                    } else {
                        reject(Error('Sources may only request other ' + 'Sources to save a configuration. Consider ' + 'calling requestSaveConfig() on this Source ' + 'instance instead.'));
                    }
                });
            } else {
                reject(Error('Extensions and source properties windows are ' + 'not allowed to directly save configuration objects. ' + 'Call requestSaveConfig() instead.'));
            }
        });
    };
    SourceConfigurable.prototype.requestSaveConfig = function (configObj) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'requestSaveConfig', true);
        }
        return new Promise(function (resolve) {
            var slot;
            Item.attach(_this._id).then(function (res) {
                slot = res;
                exec('CallInner' + (slot === 0 ? '' : slot + 1), 'MessageSource', JSON.stringify({
                    'request': 'saveConfig',
                    'data': configObj
                }));
                resolve(_this);
            });
        });
    };
    SourceConfigurable.prototype.applyConfig = function (configObj) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'applyConfig', true);
        }
        return new Promise(function (resolve) {
            var slot;
            Item.attach(_this._id).then(function (res) {
                slot = res;
                exec('CallInner' + (slot === 0 ? '' : slot + 1), 'MessageSource', JSON.stringify({
                    'request': 'applyConfig',
                    'data': configObj
                }));
                resolve(_this);
            });
        });
    };
    return SourceConfigurable;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceVideoPlaylist = function () {
    function SourceVideoPlaylist() {}
    SourceVideoPlaylist.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceVideoPlaylist.prototype.getVideoNowPlaying = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getVideoNowPlaying', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (playlist) {
                var _playlist = String(playlist).slice(0, playlist.indexOf('*'));
                resolve(_playlist);
            });
        });
    };
    SourceVideoPlaylist.prototype.setVideoNowPlaying = function (value) {
        var _this = this;
        var file;
        var _playlist;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setVideoNowPlaying', true);
                _this._checkPromise = Item.get('prop:FilePlaylist', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:FilePlaylist', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (playlist) {
                _playlist = String(playlist).split('|');
                for (var i = 0; i < _playlist.length; i++) {
                    _playlist[i] = _playlist[i].slice(0, _playlist[i].indexOf('*'));
                }
                
                return _playlist;
            }).then(function (list) {
                if (typeof value === 'string') {
                    if (_playlist.indexOf(value) === -1) {
                        reject(Error('File not found on Playlist.'));
                    } else {
                        var index = _playlist.indexOf(value);
                        file = _playlist[index] + '*' + index;
                        Item.set('prop:srcitem', file, _this._id).then(function (fileplaylist) {
                            resolve(_this);
                        });
                    }
                } else if (typeof value === 'number' && value <= _playlist.length) {
                    file = _playlist[value] + '*' + value;
                    Item.set('prop:srcitem', file, _this._id).then(function (fileplaylist) {
                        resolve(this);
                    });
                } else {
                    reject(Error('Invalid value.'));
                }
                
            });
        });
    };
    
    SourceVideoPlaylist.prototype.getVideoPlaylistSources = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getVideoPlaylistSources', true);
                _this._checkPromise = Item.get('prop:FilePlaylist', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:FilePlaylist', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (playlist) {
                var _playlist = String(playlist).split('|');
                for (var i = 0; i < _playlist.length; i++) {
                    _playlist[i] = _playlist[i].slice(0, _playlist[i].indexOf('*'));
                }
                
                resolve(_playlist);
            });
        });
    };
    
    SourceVideoPlaylist.prototype.setVideoPlaylistSources = function (fileItems) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'setVideoPlaylistSources', true);
        }
        var fileString;
        var filePromises = fileItems.map(function (filename) {
            return IO.getVideoDuration(filename);
        });
        return new Promise(function (resolve, reject) {
            Promise.all(filePromises).then(function (duration) {
                for (var i = 0; i < fileItems.length; i++) {
                    if (fileString === undefined) {
                        fileString = fileItems[i] + '*' + i + '*1*' + duration[i] + '*100*0*0*0*0*0|';
                    } else {
                        fileString += fileItems[i] + '*' + i + '*1*' + duration[i] + '*100*0*0*0*0*0';
                        if (i + 1 < fileItems.length) {
                            fileString += '|';
                        }
                        
                    }
                    
                }
                
                if (_this._isItemCall) {
                    Item.set('prop:srcitem', fileItems[0] + '*0', _this._id);
                } else {
                    Item.wrapSet('prop:srcitem', fileItems[0] + '*0', _this._srcId, _this._id, _this._updateId.bind(_this));
                }
                return fileString;
            }).then(function (fileString) {
                Item.set('prop:FilePlaylist', fileString, _this._id).then(function (fileplaylist) {
                    resolve(_this);
                });
            });
        });
    };
    
    return SourceVideoPlaylist;
}();

/**
 *  A CuePoint represents a configurable object for sources that
 *  support cue points. Check `getCuePoints()` and other related methods of
 *  {@link #core/ISourcePlayback#getCuePoints getCuePoints}.
 */
var CuePoint = function () {
    function CuePoint(time, action) {
        this._time = time;
        this._action = action;
    }
    CuePoint.prototype.toString = function () {
        return String(this._time * 10000000) + this._action;
    };
    /**
     * param: number
     *
     * Sets this cue point's time in seconds, with precision up to 100ns.
     */
    CuePoint.prototype.setTime = function (time) {
        this._time = time;
    };
    /**
     *  param: string
     *
     *  Sets the action to be performed on the cue point. Choose any of the
     *  following values: CuePoint.PAUSE, CuePoint.RESUME, CuePoint.CUT.
     */
    CuePoint.prototype.setAction = function (action) {
        if (action === CuePoint.PAUSE || action === CuePoint.RESUME || action === CuePoint.CUT) {
            this._action = action;
        } else {
            throw new Error('Trying to set to an invalid Cue Point action.');
        }
    };
    /**
     * return: number
     *
     * Gets the time in seconds corresponding to this cue point, with precision
     * up to 100ns.
     */
    CuePoint.prototype.getTime = function () {
        return this._time / 10000000;
    };
    /**
     *  return: string
     *
     *  Gets the action to be performed on the cue point, which may be any of the
     *  following: CuePoint.PAUSE, CuePoint.RESUME, CuePoint.CUT.
     */
    CuePoint.prototype.getAction = function () {
        return this._action;
    };
    CuePoint._fromString = function (value) {
        var _a = [value.substring(0, value.length - 1), value.charAt(value.length - 1)],
            time = _a[0],
            action = _a[1];
        return new CuePoint(Number(time), action);
    };
    CuePoint.PAUSE = 'p';
    CuePoint.RESUME = 'r';
    CuePoint.CUT = 's';
    return CuePoint;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 *  Used by sources that implement the Playback interface.
 */

(function (ActionAfterPlayback) {
    ActionAfterPlayback[ActionAfterPlayback["NONE"] = 0] = "NONE";
    ActionAfterPlayback[ActionAfterPlayback["REWIND"] = 1] = "REWIND";
    ActionAfterPlayback[ActionAfterPlayback["LOOP"] = 2] = "LOOP";
    ActionAfterPlayback[ActionAfterPlayback["TRANSPARENT"] = 3] = "TRANSPARENT";
    ActionAfterPlayback[ActionAfterPlayback["HIDE"] = 4] = "HIDE";
})(exports.ActionAfterPlayback || (exports.ActionAfterPlayback = {}));
var AUDIO_REGEX = /\.(mp3|aac|cda|ogg|m4a|flac|wma|aiff|aif|wav|mid|midi|rma)$/;
var VIDEO_REGEX = /\.(avi|flv|mkv|mp4|mpg|wmv|3gp|3g2|asf|f4v|mov|mpeg|vob|webm)$/;
var SourcePlayback = function () {
    function SourcePlayback() {}
    SourcePlayback.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourcePlayback.prototype.isSeekable = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isSeekable', true);
                _this._checkPromise = Item.get('sync:syncable', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('sync:syncable', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1' ? true : false);
            });
        });
    };
    SourcePlayback.prototype.getPlaybackPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getPlaybackPosition', true);
                _this._checkPromise = Item.get('sync:position', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('sync:position', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val) / 10000000);
            });
        });
    };
    SourcePlayback.prototype.setPlaybackPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setPlaybackPosition', true);
                _this._checkPromise = Item.set('sync:position', String(value * 10000000), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('sync:position', String(value * 10000000), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.getPlaybackDuration = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getPlaybackDuration', true);
                _this._checkPromise = Item.get('sync:duration', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('sync:duration', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val) / 10000000);
            });
        });
    };
    SourcePlayback.prototype.isPlaying = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isPlaying', true);
                _this._checkPromise = Item.get('sync:state', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('sync:state', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === "running");
            });
        });
    };
    SourcePlayback.prototype.setPlaying = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setPlaying', true);
                _this._checkPromise = Item.set('sync:state', value ? "running" : "stopped", _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('sync:state', value ? "running" : "stopped", _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.getPlaybackStartPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getPlaybackStartPosition', true);
                _this._checkPromise = Item.get('prop:InPoint', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:InPoint', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val) / 10000000);
            });
        });
    };
    SourcePlayback.prototype.setPlaybackStartPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setPlaybackStartPosition', true);
                _this._checkPromise = Item.set('prop:InPoint', String(value * 10000000), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:InPoint', String(value * 10000000), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.getPlaybackEndPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getPlaybackEndPosition', true);
                _this._checkPromise = Item.get('prop:OutPoint', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:OutPoint', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val) / 10000000);
            });
        });
    };
    SourcePlayback.prototype.setPlaybackEndPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setPlaybackEndPosition', true);
                _this._checkPromise = Item.set('prop:OutPoint', String(value * 10000000), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:OutPoint', String(value * 10000000), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.getActionAfterPlayback = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getActionAfterPlayback', true);
                _this._checkPromise = Item.get('prop:OpWhenFinished', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:OpWhenFinished', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(Number(val));
            });
        });
    };
    SourcePlayback.prototype.setActionAfterPlayback = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setActionAfterPlayback', true);
                _this._checkPromise = Item.set('prop:OpWhenFinished', String(value), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:OpWhenFinished', String(value), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.isAutostartOnSceneLoad = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isAutostartOnSceneLoad', true);
                _this._checkPromise = Item.get('prop:StartOnLoad', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:StartOnLoad', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    SourcePlayback.prototype.setAutostartOnSceneLoad = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAutostartOnSceneLoad', true);
                _this._checkPromise = Item.set('prop:StartOnLoad', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:StartOnLoad', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.isForceDeinterlace = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isForceDeinterlace', true);
                _this._checkPromise = Item.get('prop:fdeinterlace', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:fdeinterlace', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '3');
            });
        });
    };
    SourcePlayback.prototype.setForceDeinterlace = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setForceDeinterlace', true);
                _this._checkPromise = Item.set('prop:fdeinterlace', value ? '3' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:fdeinterlace', value ? '3' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.isRememberingPlaybackPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isRememberingPlaybackPosition', true);
                _this._checkPromise = Item.get('prop:RememberPosition', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:RememberPosition', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    SourcePlayback.prototype.setRememberingPlaybackPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setRememberingPlaybackPosition', true);
                _this._checkPromise = Item.set('prop:RememberPosition', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:RememberPosition', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.isShowingPlaybackPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isShowingPlaybackPosition', true);
                _this._checkPromise = Item.get('prop:ShowPosition', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ShowPosition', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    SourcePlayback.prototype.setShowingPlaybackPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setShowingPlaybackPosition', true);
                _this._checkPromise = Item.set('prop:ShowPositio', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ShowPositio', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.getCuePoints = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getCuePoints', true);
                _this._checkPromise = Item.get('prop:CuePoints', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:CuePoints', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (cuePointString) {
                if (cuePointString === '') {
                    resolve([]);
                } else {
                    var cuePointStrings = cuePointString.split(',');
                    var cuePoints = cuePointStrings.map(function (string) {
                        return CuePoint._fromString(string);
                    });
                    resolve(cuePoints);
                }
            });
        });
    };
    SourcePlayback.prototype.setCuePoints = function (cuePoints) {
        var _this = this;
        var cuePointString = cuePoints.map(function (point) {
            return point.toString();
        }).join(',');
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setCuePoints', true);
                _this._checkPromise = Item.set('prop:CuePoints', cuePointString, _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:CuePoints', cuePointString, _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    SourcePlayback.prototype.isAudio = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isAudio', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (filename) {
                resolve(AUDIO_REGEX.test(filename));
            });
        });
    };
    SourcePlayback.prototype.isVideo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isVideo', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (filename) {
                resolve(VIDEO_REGEX.test(filename));
            });
        });
    };
    SourcePlayback.prototype.getValue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // we do not do any additional checking since we are assured of the type
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getValue', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this).bind(_this));
            }
            _this._checkPromise.then(function (filename) {
                resolve(filename);
            });
        });
    };
    
    SourcePlayback.prototype.setValue = function (filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (VIDEO_REGEX.test(filename) || AUDIO_REGEX.test(filename)) {
                if (_this._isItemCall) {
                    Logger.warn('sourceWarning', 'setValue', true);
                    _this._checkPromise = Item.set('prop:srcitem', filename, _this._id);
                } else {
                    _this._checkPromise = Item.wrapSet('prop:srcitem', filename, _this._srcId, _this._id, _this._updateId.bind(_this));
                }
                _this._checkPromise.then(function () {
                    return Item.set('prop:name', filename, _this._id);
                }).then(function () {
                    return Item.set('prop:CuePoints', '', _this._id);
                }).then(function () {
                    resolve(_this);
                });
            } else {
                reject(new Error('You can only set the value to a valid media type'));
            }
        });
    };
    return SourcePlayback;
}();

/**
 * The VideoPlaylistSource class represents the sources of the videoplaylist items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the VideoPlaylistItem class.
 * See: {@link #core/VideoPlaylistItem Core/VideoPlaylistItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.VideoPlaylistSource) {
 *         // Manipulate your videoplaylist source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original
 *  `VideoPlaylistSource` instance.
 */
var VideoPlaylistSource = function (_super) {
    __extends(VideoPlaylistSource, _super);
    function VideoPlaylistSource() {
        _super.apply(this, arguments);
    }
    return VideoPlaylistSource;
}(Source);
applyMixins(VideoPlaylistSource, [SourceConfigurable, SourceVideoPlaylist, SourcePlayback, Audio]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var iSourceHtml = function () {
    function iSourceHtml() {}
    iSourceHtml.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    /**
     * param: (func: string, arg: string)
     * ```
     * return: Promise<HtmlSource>
     * ```
     *
     * Allow this item to call a pre-exposed function within the HTML Item
     */
    iSourceHtml.prototype.call = function (func, arg) {
        var _this = this;
        return new Promise(function (resolve) {
            var slot;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'call', true);
                _this._checkPromise = Item.attach(_this._id);
            } else {
                _this._checkPromise = Item.attach(_this._id);
            }
            _this._checkPromise.then(function (res) {
                slot = res;
                exec('CallInner' + (String(slot) === '0' ? '' : slot + 1), func, arg);
                resolve(_this);
            });
        });
    };
    /**
     * return: Promise<string>
     *
     * Gets the URL of this webpage item.
     */
    iSourceHtml.prototype.getURL = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getURL', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (url) {
                var _url = String(url).split('*');
                url = _url[0];
                resolve(url);
            });
        });
    };
    /**
     * param: (url: string)
     * ```
     * return: Promise<HtmlSource>
     * ```
     *
     * Sets the URL of this webpage item.
     *
     * *Chainable.*
     */
    iSourceHtml.prototype.setURL = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setURL', true);
                _this._checkPromise = Item.get('prop:srcitem', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:srcitem', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (url) {
                var _url = String(url).split('*');
                _url[0] = value;
                return Item.set('prop:srcitem', _url.join('*'), _this._id);
            }).then(function (code) {
                if (code) {
                    resolve(_this);
                } else {
                    reject('Invalid value');
                }
            });
        });
    };
    iSourceHtml.prototype.isBrowserTransparent = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isBrowserTransparent', true);
                _this._checkPromise = Item.get('prop:BrowserTransparent', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:BrowserTransparent', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (isTransparent) {
                resolve(isTransparent === '1');
            });
        });
    };
    iSourceHtml.prototype.enableBrowserTransparency = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'enableBrowserTransparency', true);
                _this._checkPromise = Item.set('prop:BrowserTransparent', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:BrowserTransparent', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    iSourceHtml.prototype.isBrowser60FPS = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isBrowser60FPS', true);
                _this._checkPromise = Item.get('prop:Browser60fps', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:Browser60fps', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (isBrowser60FPS) {
                resolve(isBrowser60FPS === '1');
            });
        });
    };
    iSourceHtml.prototype.enableBrowser60FPS = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isBrowser60FPS', true);
                _this._checkPromise = Item.get('prop:Browser60fps', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:Browser60fps', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (isBrowser60FPS) {
                if (isBrowser60FPS === '1' !== value) {
                    Item.set('prop:Browser60fps', value ? '1' : '0', _this._id);
                }
                resolve(_this);
            });
        });
    };
    iSourceHtml.prototype.getBrowserCustomSize = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var customSize;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getBrowserCustomSize', true);
                _this._checkPromise = Item.get('prop:BrowserSize', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:BrowserSize', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                if (val !== '') {
                    var _a = decodeURIComponent(val).split(','),
                        width = _a[0],
                        height = _a[1];
                    customSize = Rectangle.fromDimensions(Number(width) / window.devicePixelRatio, Number(height) / window.devicePixelRatio);
                } else {
                    customSize = Rectangle.fromDimensions(0, 0);
                }
                resolve(customSize);
            });
        });
    };
    iSourceHtml.prototype.setBrowserCustomSize = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            // Set the correct width and height based on the DPI settings
            value.setWidth(value.getWidth() * window.devicePixelRatio);
            value.setHeight(value.getHeight() * window.devicePixelRatio);
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setBrowserCustomSize', true);
                _this._checkPromise = Item.set('prop:BrowserSize', value.toDimensionString(), _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:BrowserSize', value.toDimensionString(), _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    iSourceHtml.prototype.getAllowRightClick = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getAllowRightClick', true);
                _this._checkPromise = Item.get('prop:BrowserRightClick', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:BrowserRightClick', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    iSourceHtml.prototype.setAllowRightClick = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAllowRightClick', true);
                _this._checkPromise = Item.set('prop:BrowserRightClick', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:BrowserRightClick', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    iSourceHtml.prototype.getBrowserJS = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getBrowserJS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customJS = '';
                try {
                    var customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('customJS')) {
                        customJS = customObject['customJS'];
                    }
                } catch (e) {}
                resolve(customJS);
            });
        });
    };
    iSourceHtml.prototype.setBrowserJS = function (value, refresh) {
        var _this = this;
        if (refresh === void 0) {
            refresh = false;
        }
        return new Promise(function (resolve, reject) {
            var customObject = {};
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setBrowserJS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customCSS = '';
                var scriptString = ' ';
                var scriptEnabled = true;
                var cssEnabled = true;
                try {
                    customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('cssEnabled')) {
                        cssEnabled = customObject['cssEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('scriptEnabled')) {
                        scriptEnabled = customObject['scriptEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('customCSS')) {
                        customCSS = customObject['customCSS'];
                    }
                } catch (e) {}
                customObject['cssEnabled'] = cssEnabled.toString();
                customObject['scriptEnabled'] = scriptEnabled.toString();
                customObject['customCSS'] = customCSS;
                customObject['customJS'] = value;
                if (cssEnabled === true) {
                    var cssScript = "var xjsCSSOverwrite = document.createElement('style');xjsCSSOverwrite.id = 'splitmedialabsCSSOverwrite';xjsCSSOverwrite.type = 'text/css';var h = document.querySelector('head');var existing = document.querySelector('head #splitmedialabsCSSOverwrite');if (existing != null)h.removeChild(existing);xjsCSSOverwrite.innerHTML = '" + customCSS.replace(/(\r\n|\n|\r)/gm, '').replace(/\s{2,}/g, ' ').replace(/(\[br\])/gm, '') + "';h.appendChild(xjsCSSOverwrite);";
                    scriptString = scriptString + cssScript;
                }
                if (value !== '' && scriptEnabled === true) {
                    scriptString = scriptString + value;
                }
                return Item.set('prop:BrowserJs', scriptString, _this._id);
            }).then(function () {
                return Item.set('prop:custom', JSON.stringify(customObject), _this._id);
            }).then(function () {
                if (refresh) {
                    Item.set('refresh', '', _this._id).then(function () {
                        resolve(_this);
                    });
                } else {
                    resolve(_this);
                }
            });
        });
    };
    iSourceHtml.prototype.isBrowserJSEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isBrowserJSEnabled', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var enabled = true;
                try {
                    var customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('scriptEnabled')) {
                        enabled = customObject['scriptEnabled'] == 'true';
                    }
                } catch (e) {}
                resolve(enabled);
            });
        });
    };
    iSourceHtml.prototype.enableBrowserJS = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var customObject = {};
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'enableBrowserJS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customJS = '';
                var customCSS = '';
                var scriptString = ' ';
                var cssEnabled = true;
                try {
                    customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('cssEnabled')) {
                        cssEnabled = customObject['cssEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('customJS')) {
                        customJS = customObject['customJS'];
                    }
                    if (customObject.hasOwnProperty('customCSS')) {
                        customCSS = customObject['customCSS'];
                    }
                } catch (e) {}
                customObject['cssEnabled'] = cssEnabled.toString();
                customObject['scriptEnabled'] = value.toString();
                customObject['customJS'] = customJS;
                customObject['customCSS'] = customCSS;
                if (cssEnabled === true) {
                    var cssScript = 'var xjsCSSOverwrite = document.createElement("style");' + 'xjsCSSOverwrite.id = "splitmedialabsCSSOverwrite";' + 'xjsCSSOverwrite.type = "text/css";' + 'var h = document.querySelector("head");' + 'var existing = document' + '.querySelector("head #splitmedialabsCSSOverwrite");' + 'if (existing != null)h.removeChild(existing);' + 'xjsCSSOverwrite.innerHTML = "' + customCSS.replace(/(\r\n|\n|\r)/gm, '').replace(/\s{2,}/g, ' ').replace(/(\[br\])/gm, '') + '";"' + 'h.appendChild(xjsCSSOverwrite);';
                    scriptString = scriptString + cssScript;
                }
                if (customJS !== '' && value === true) {
                    scriptString = scriptString + customJS;
                }
                return Item.set('prop:BrowserJs', scriptString, _this._id);
            }).then(function () {
                return Item.set('prop:custom', JSON.stringify(customObject), _this._id);
            }).then(function () {
                if (!value) {
                    Item.set('refresh', '', _this._id).then(function () {
                        resolve(_this);
                    });
                } else {
                    resolve(_this);
                }
            });
        });
    };
    iSourceHtml.prototype.getCustomCSS = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getCustomCSS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customCSS = '';
                try {
                    var customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('customCSS')) {
                        customCSS = customObject['customCSS'];
                    }
                } catch (e) {}
                resolve(customCSS);
            });
        });
    };
    iSourceHtml.prototype.setCustomCSS = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var customObject = {};
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setCustomCSS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customJS = '';
                var scriptString = ' ';
                var scriptEnabled = true;
                var cssEnabled = true;
                try {
                    customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('cssEnabled')) {
                        cssEnabled = customObject['cssEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('scriptEnabled')) {
                        scriptEnabled = customObject['scriptEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('customJS')) {
                        customJS = customObject['customJS'];
                    }
                } catch (e) {}
                customObject['cssEnabled'] = cssEnabled.toString();
                customObject['scriptEnabled'] = scriptEnabled.toString();
                customObject['customJS'] = customJS;
                customObject['customCSS'] = value;
                if (cssEnabled === true) {
                    var cssScript = 'var xjsCSSOverwrite = document.createElement("style");' + 'xjsCSSOverwrite.id = "splitmedialabsCSSOverwrite";' + 'xjsCSSOverwrite.type = "text/css";' + 'var h = document.querySelector("head");' + 'var existing = document' + '.querySelector("head #splitmedialabsCSSOverwrite");' + 'if (existing != null)h.removeChild(existing);' + 'xjsCSSOverwrite.innerHTML = "' + value.replace(/(\r\n|\n|\r)/gm, '').replace(/\s{2,}/g, ' ').replace(/(\[br\])/gm, '') + '";h.appendChild(xjsCSSOverwrite);';
                    scriptString = scriptString + cssScript;
                }
                if (customJS !== '' && scriptEnabled === true) {
                    scriptString = scriptString + customJS;
                }
                return Item.set('prop:BrowserJs', scriptString, _this._id);
            }).then(function () {
                return Item.set('prop:custom', JSON.stringify(customObject), _this._id);
            }).then(function () {
                resolve(_this);
            });
        });
    };
    iSourceHtml.prototype.isCustomCSSEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isCustomCSSEnabled', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var enabled = true;
                try {
                    var customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('cssEnabled')) {
                        enabled = customObject['cssEnabled'] == 'true';
                    }
                } catch (e) {}
                resolve(enabled);
            });
        });
    };
    iSourceHtml.prototype.enableCustomCSS = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var customObject = {};
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'enableCustomCSS', true);
                _this._checkPromise = Item.get('prop:custom', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:custom', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (custom) {
                var customJS = '';
                var customCSS = '';
                var scriptString = ' ';
                var scriptEnabled = true;
                try {
                    customObject = JSON.parse(custom);
                    if (customObject.hasOwnProperty('scriptEnabled')) {
                        scriptEnabled = customObject['scriptEnabled'] == 'true';
                    }
                    if (customObject.hasOwnProperty('customJS')) {
                        customJS = customObject['customJS'];
                    }
                    if (customObject.hasOwnProperty('customCSS')) {
                        customCSS = customObject['customCSS'];
                    }
                } catch (e) {}
                customObject['scriptEnabled'] = scriptEnabled.toString();
                customObject['cssEnabled'] = value.toString();
                customObject['customJS'] = customJS;
                customObject['customCSS'] = customCSS;
                if (value === true) {
                    var cssScript = 'var xjsCSSOverwrite = document.createElement("style");' + 'xjsCSSOverwrite.id = "splitmedialabsCSSOverwrite";' + 'xjsCSSOverwrite.type = "text/css";' + 'var h = document.querySelector("head");' + 'var existing = document' + '.querySelector("head #splitmedialabsCSSOverwrite");' + 'if (existing != null)h.removeChild(existing);' + 'xjsCSSOverwrite.innerHTML = "' + customCSS.replace(/(\r\n|\n|\r)/gm, '').replace(/\s{2,}/g, ' ').replace(/(\[br\])/gm, '') + '";h.appendChild(xjsCSSOverwrite);';
                    scriptString = scriptString + cssScript;
                }
                if (customJS !== '' && value === scriptEnabled) {
                    scriptString = scriptString + customJS;
                }
                return Item.set('prop:BrowserJs', scriptString, _this._id);
            }).then(function () {
                return Item.set('prop:custom', JSON.stringify(customObject), _this._id);
            }).then(function () {
                if (!value) {
                    var cssScript = "var h = document.querySelector('head');var existing3 = document.querySelector('head #splitmedialabsCSSOverwrite');if (existing3 != null)h.removeChild(existing3);";
                    if (Environment.isSourcePlugin()) {
                        eval(cssScript);
                    } else {
                        exec('CallInner', 'eval', cssScript);
                    }
                    resolve(_this);
                } else {
                    resolve(_this);
                }
            });
        });
    };
    return iSourceHtml;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The HtmlSource class represents the sources of the html items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the HtmlItem class.
 * See: {@link #core/HtmlItem Core/HtmlItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.HtmlSource) {
 *         // Manipulate your html source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `HtmlSource`
 * instance.
 */
var HtmlSource = function (_super) {
    __extends(HtmlSource, _super);
    function HtmlSource() {
        _super.apply(this, arguments);
    }
    return HtmlSource;
}(Source);
applyMixins(HtmlSource, [iSourceHtml, SourceConfigurable, Audio]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceFlash = function () {
    function SourceFlash() {}
    SourceFlash.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceFlash.prototype.getCustomResolution = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var customSize;
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getCustomResolution', true);
                _this._checkPromise = Item.get('prop:BrowserSize', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:BrowserSize', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                if (val !== '') {
                    var _a = decodeURIComponent(val).split(','),
                        width = _a[0],
                        height = _a[1];
                    customSize = Rectangle.fromDimensions(Number(width), Number(height));
                } else {
                    customSize = Rectangle.fromDimensions(0, 0);
                }
                resolve(customSize);
            });
        });
    };
    SourceFlash.prototype.setCustomResolution = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setCustomResolution', true);
                Item.set('prop:BrowserSize', value.toDimensionString(), _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:BrowserSize', value.toDimensionString(), _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    SourceFlash.prototype.getAllowRightClick = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getAllowRightClick', true);
                Item.get('prop:BrowserRightClick', _this._id).then(function (val) {
                    resolve(val === '1');
                });
            } else {
                Item.wrapGet('prop:BrowserRightClick', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function (val) {
                    resolve(val === '1');
                });
            }
        });
    };
    SourceFlash.prototype.setAllowRightClick = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setAllowRightClick', true);
                Item.set('prop:BrowserRightClick', value ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                Item.wrapSet('prop:BrowserRightClick', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this)).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    return SourceFlash;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The FlashSource class represents the sources of the flash items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the FlashItem class.
 * See: {@link #core/FlashItem Core/FlashItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.FlashSource) {
 *         // Manipulate your game source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `FlashSource`
 * instance.
 */
var FlashSource = function (_super) {
    __extends(FlashSource, _super);
    function FlashSource() {
        _super.apply(this, arguments);
    }
    return FlashSource;
}(Source);
applyMixins(FlashSource, [Audio, SourceFlash]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var iSourceScreen = function () {
    function iSourceScreen() {}
    iSourceScreen.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    iSourceScreen.prototype.isStickToTitle = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'isStickToTitle', true);
                _this._checkPromise = Item.get('prop:ScrCapTrackWindowTitle', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ScrCapTrackWindowTitle', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '0');
            });
        });
    };
    iSourceScreen.prototype.setStickToTitle = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setStickToTitle', true);
                _this._checkPromise = Item.set('prop:ScrCapTrackWindowTitle', value ? '0' : '1', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ScrCapTrackWindowTitle', value ? '0' : '1', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function () {
                resolve(_this);
            });
        });
    };
    iSourceScreen.prototype.getCaptureLayered = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getCaptureLayered', true);
                _this._checkPromise = Item.get('prop:ScrCapLayered', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ScrCapLayered', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    iSourceScreen.prototype.setCaptureLayered = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setCaptureLayered', true);
                _this._checkPromise = Item.set('prop:ScrCapLayered', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ScrCapLayered', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(_this);
            });
        });
    };
    iSourceScreen.prototype.getOptimizedCapture = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getOptimizedCapture', true);
                _this._checkPromise = Item.get('prop:ScrCapOptCapture1', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ScrCapOptCapture1', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    iSourceScreen.prototype.setOptimizedCapture = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setOptimizedCapture', true);
                _this._checkPromise = Item.set('prop:ScrCapOptCapture1', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ScrCapOptCapture1', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(_this);
            });
        });
    };
    iSourceScreen.prototype.getShowMouseClicks = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getShowMouseClicks', true);
                _this._checkPromise = Item.get('prop:ScrCapShowClicks', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ScrCapShowClicks', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    iSourceScreen.prototype.setShowMouseClicks = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setShowMouseClicks', true);
                _this._checkPromise = Item.set('prop:ScrCapShowClicks', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ScrCapShowClicks', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(_this);
            });
        });
    };
    iSourceScreen.prototype.getShowMouse = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getShowMouse', true);
                _this._checkPromise = Item.get('prop:ScrCapShowMouse', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('prop:ScrCapShowMouse', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                resolve(val === '1');
            });
        });
    };
    iSourceScreen.prototype.setShowMouse = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'setShowMouse', true);
                _this._checkPromise = Item.set('prop:ScrCapShowMouse', value ? '1' : '0', _this._id);
            } else {
                _this._checkPromise = Item.wrapSet('prop:ScrCapShowMouse', value ? '1' : '0', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                if (val === true) {
                    Item.set('prop:ScrCapShowClicks', value ? '1' : '0', _this._id);
                }
                resolve(_this);
            });
        });
    };
    iSourceScreen.prototype.getCaptureArea = function () {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'getCaptureArea', true);
        }
        return new Promise(function (resolve) {
            _this.getValue().then(function (val) {
                if (!(val instanceof XML)) {
                    resolve(Rectangle.fromCoordinates(0, 0, 0, 0));
                } else {
                    var _value = JSON$1.parse(val);
                    resolve(Rectangle.fromCoordinates(Number(_value['left']), Number(_value['top']), Number(_value['width']) + Number(_value['left']), Number(_value['height']) + Number(_value['top'])));
                }
            });
        });
    };
    iSourceScreen.prototype.setCaptureArea = function (dimension) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'setCaptureArea', true);
        }
        return new Promise(function (resolve) {
            _this.getValue().then(function (val) {
                return new Promise(function (iResolve) {
                    if (_this._isItemCall) {
                        _this._checkPromise = Item.get('screenresolution', _this._id);
                    } else {
                        _this._checkPromise = Item.wrapGet('screenresolution', _this._srcId, _this._id, _this._updateId.bind(_this));
                    }
                    _this._checkPromise.then(function (res) {
                        var _res = res.split(',');
                        iResolve({
                            value: val,
                            res: Rectangle.fromCoordinates(Number(_res[0]), Number(_res[1]), Number(_res[2]), Number(_res[3]))
                        });
                    });
                });
            }).then(function (obj) {
                var _config = new JSON$1();
                if (!(obj.value instanceof XML)) {
                    _config['tag'] = 'screen';
                    _config['module'] = '';
                    _config['window'] = '';
                    _config['hwnd'] = '0';
                    _config['wclient'] = '0';
                    _config['left'] = '0';
                    _config['top'] = '0';
                    _config['width'] = '0';
                    _config['height'] = '0';
                } else {
                    _config = JSON$1.parse(obj.value);
                }
                _config['left'] = dimension.getLeft() >= obj.res.getLeft() ? dimension.getLeft() : Number(_config['left']) >= obj.res.getLeft() ? _config['left'] : obj.res.getLeft();
                _config['top'] = dimension.getTop() >= obj.res.getTop() ? dimension.getTop() : Number(_config['top']) >= obj.res.getTop() ? _config['top'] : obj.res.getTop();
                _config['width'] = dimension.getWidth() <= obj.res.getWidth() ? dimension.getWidth() : Number(_config['width']) <= obj.res.getWidth() ? _config['width'] : obj.res.getWidth();
                _config['height'] = dimension.getHeight() <= obj.res.getHeight() ? dimension.getHeight() : Number(_config['height']) <= obj.res.getHeight() ? _config['height'] : obj.res.getHeight();
                _this.setValue(XML.parseJSON(_config)).then(function () {
                    resolve(_this);
                });
            });
        });
    };
    iSourceScreen.prototype.isClientArea = function () {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'isClientArea', true);
        }
        return new Promise(function (resolve) {
            _this.getValue().then(function (val) {
                if (!(val instanceof XML)) {
                    resolve(false);
                } else {
                    var _value = JSON$1.parse(val);
                    resolve(_value['wclient'] === '1');
                }
            });
        });
    };
    iSourceScreen.prototype.setClientArea = function (value) {
        var _this = this;
        if (this._isItemCall) {
            Logger.warn('sourceWarning', 'setClientArea', true);
        }
        return new Promise(function (resolve) {
            _this.getValue().then(function (val) {
                var _config = new JSON$1();
                if (!(val instanceof XML)) {
                    _config['tag'] = 'screen';
                    _config['module'] = '';
                    _config['window'] = '';
                    _config['hwnd'] = '0';
                    _config['wclient'] = '0';
                    _config['left'] = '0';
                    _config['top'] = '0';
                    _config['width'] = '0';
                    _config['height'] = '0';
                } else {
                    _config = JSON$1.parse(val);
                }
                _config['wclient'] = value ? '1' : '0';
                _this.setValue(XML.parseJSON(_config)).then(function () {
                    resolve(_this);
                });
            });
        });
    };
    return iSourceScreen;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The ScreenSource class represents the sources of the screen device items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the ScreenItem class.
 * See: {@link #core/ScreenItem Core/ScreenItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.ScreenSource) {
 *         // Manipulate your screen source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original `ScreenSource`
 *  instance.
 */
var ScreenSource = function (_super) {
    __extends(ScreenSource, _super);
    function ScreenSource() {
        _super.apply(this, arguments);
    }
    return ScreenSource;
}(Source);
applyMixins(ScreenSource, [iSourceScreen]);

/**
 * The ImageSource class represents the sources of the image items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the ImageItem class.
 * See: {@link #core/ImageItem Core/ImageItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.ImageSource) {
 *         // Manipulate your image source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `ImageSource`
 * instance.
 */
var ImageSource = function (_super) {
    __extends(ImageSource, _super);
    function ImageSource() {
        _super.apply(this, arguments);
    }
    return ImageSource;
}(Source);

/// <reference path="../../../defs/es6-promise.d.ts" />
var SourceMedia = function () {
    function SourceMedia() {}
    SourceMedia.prototype._updateId = function (id, sceneId) {
        this._id = id;
        this._sceneId = sceneId;
    };
    SourceMedia.prototype.getFileInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isItemCall) {
                Logger.warn('sourceWarning', 'getFileInfo', true);
                _this._checkPromise = Item.get('FileInfo', _this._id);
            } else {
                _this._checkPromise = Item.wrapGet('FileInfo', _this._srcId, _this._id, _this._updateId.bind(_this));
            }
            _this._checkPromise.then(function (val) {
                try {
                    var fileInfoObj = {};
                    var fileInfoJXON = JSON$1.parse(val);
                    if (typeof fileInfoJXON['children'] !== 'undefined' && fileInfoJXON['children'].length > 0) {
                        var fileInfoChildren = fileInfoJXON['children'];
                        for (var i = fileInfoChildren.length - 1; i >= 0; i--) {
                            var child = fileInfoChildren[i];
                            var childObj = {};
                            var childObjKeys = Object.keys(child);
                            for (var j = childObjKeys.length - 1; j >= 0; j--) {
                                var key = childObjKeys[j];
                                if (key !== 'value' && key !== 'tag') {
                                    childObj[key] = child[key];
                                }
                            }
                            var tag = child['tag'];
                            fileInfoObj[tag] = childObj;
                        }
                        resolve(fileInfoObj);
                    } else {
                        resolve(fileInfoObj);
                    }
                } catch (e) {
                    reject(Error('Error retrieving file information'));
                }
            });
        });
    };
    return SourceMedia;
}();

/**
 * The MediaSource class represents the sources of the media items that
 * has been added to the stage. A single source could have multiple items linked
 * into it and any changes to the source would affect all items linked to it.
 *
 * Each item is represented by the MediaItem class.
 * See: {@link #core/MediaItem Core/MediaItem}
 *
 * Inherits from: {@link #core/Source Core/Source}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 *
 * xjs.Scene.getActiveScene().then(function(scene) {
 *   scene.getSources().then(function(sources) {
 *   for (var i in sources) {
 *       if (sources[i] instanceof XJS.MediaSource) {
 *         // Manipulate your media source here
 *         sources[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   })
 * })
 * ```
 *
 * All methods marked as *Chainable* resolve with the original `MediaSource`
 * instance.
 */
var MediaSource = function (_super) {
    __extends(MediaSource, _super);
    function MediaSource() {
        _super.apply(this, arguments);
    }
    return MediaSource;
}(Source);
applyMixins(MediaSource, [SourcePlayback, Audio, SourceMedia]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var ItemLayout = function () {
    function ItemLayout() {}
    ItemLayout.prototype._getCanvasAndZRotate = function (value) {
        var rotationObject = {};
        if (value >= -180 && value <= -135) {
            rotationObject['canvasRotate'] = 180;
            rotationObject['zRotate'] = value + 180;
            rotationObject['orientation'] = 'landscape';
        } else if (value > -135 && value < -45) {
            rotationObject['canvasRotate'] = 270;
            rotationObject['zRotate'] = value + 90;
            rotationObject['orientation'] = 'portrait';
        } else if (value >= -45 && value <= 45) {
            rotationObject['canvasRotate'] = 0;
            rotationObject['zRotate'] = value;
            rotationObject['orientation'] = 'landscape';
        } else if (value > 45 && value < 135) {
            rotationObject['canvasRotate'] = 90;
            rotationObject['zRotate'] = value - 90;
            rotationObject['orientation'] = 'portrait';
        } else if (value >= 135 && value <= 180) {
            rotationObject['canvasRotate'] = 180;
            rotationObject['zRotate'] = value - 180;
            rotationObject['orientation'] = 'landscape';
        }
        return rotationObject;
    };
    ItemLayout.prototype._adjustRotation = function (value) {
        if (value > 180) {
            value -= 360;
        } else if (value < -180) {
            value += 360;
        }
        return value;
    };
    ItemLayout.prototype.isKeepAspectRatio = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:keep_ar', _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    ItemLayout.prototype.setKeepAspectRatio = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:keep_ar', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemLayout.prototype.isPositionLocked = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:lockmove', _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    ItemLayout.prototype.setPositionLocked = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:lockmove', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemLayout.prototype.isEnhancedResizeEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:mipmaps', _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    ItemLayout.prototype.setEnhancedResizeEnabled = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:mipmaps', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemLayout.prototype.getPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:pos', _this._id).then(function (val) {
                var _a = String(val).split(','),
                    left = _a[0],
                    top = _a[1],
                    right = _a[2],
                    bottom = _a[3];
                _this.position = Rectangle.fromCoordinates(Number(left), Number(top), Number(right), Number(bottom));
                resolve(_this.position);
            });
        });
    };
    ItemLayout.prototype.setPosition = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                Item.set('prop:pos', value.toCoordinateString(), _this._id).then(function () {
                    resolve(_this);
                });
            } catch (err) {
                reject(err);
            }
        });
    };
    ItemLayout.prototype.getRotateY = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:rotate_y', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemLayout.prototype.setRotateY = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -360 || value > 360) {
                reject(Error('Invalid value. Min: -360, Max: 360'));
            } else {
                Item.set('prop:rotate_y', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemLayout.prototype.getRotateX = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:rotate_x', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemLayout.prototype.setRotateX = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -360 || value > 360) {
                reject(Error('Invalid value. Min: -360, Max: 360'));
            } else {
                Item.set('prop:rotate_x', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemLayout.prototype.getRotateZ = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:rotate_z', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemLayout.prototype.setRotateZ = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -360 || value > 360) {
                reject(Error('Invalid value. Min: -360, Max: 360'));
            } else {
                Item.set('prop:rotate_z', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemLayout.prototype.getCropping = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var cropObject = {};
            Item.get('prop:crop', _this._id).then(function (val) {
                var _a = String(val).split(','),
                    left = _a[0],
                    top = _a[1],
                    right = _a[2],
                    bottom = _a[3];
                cropObject['left'] = Number(left);
                cropObject['top'] = Number(top);
                cropObject['right'] = Number(right);
                cropObject['bottom'] = Number(bottom);
                resolve(cropObject);
            });
        });
    };
    ItemLayout.prototype.setCropping = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value.hasOwnProperty('top') && value.hasOwnProperty('left') && value.hasOwnProperty('right') && value.hasOwnProperty('bottom')) {
                Item.set('prop:crop', value['left'].toFixed(6) + ',' + value['top'].toFixed(6) + ',' + value['right'].toFixed(6) + ',' + value['bottom'].toFixed(6), _this._id).then(function () {
                    resolve(_this);
                });
            } else {
                reject('Error setting cropping,' + ' insufficient properties (left, top, right, bottom)');
            }
        });
    };
    ItemLayout.prototype.getCanvasRotate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:rotate_canvas', _this._id).then(function (val) {
                var value = Number(val);
                if ([0, 90, 180, 270].indexOf(value) < 0) {
                    resolve(0);
                } else {
                    resolve(value);
                }
            });
        });
    };
    ItemLayout.prototype.setCanvasRotate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ([0, 90, 180, 270].indexOf(value) < 0) {
                reject(Error('Invalid value. Only possible values are 0, 90, 180 and 270'));
            } else {
                Item.set('prop:rotate_canvas', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemLayout.prototype.getEnhancedRotate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var rotateZ;
            var rotateCanvas;
            var rotateValue;
            Item.get('prop:rotate_z', _this._id).then(function (val) {
                rotateZ = Number(val);
                return Item.get('prop:rotate_canvas', _this._id);
            }).then(function (val) {
                rotateCanvas = Number(val);
                rotateValue = _this._adjustRotation(rotateCanvas + rotateZ);
                resolve(rotateValue);
            });
        });
    };
    ItemLayout.prototype.setEnhancedRotate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -180 || value > 180) {
                reject(Error('Invalid value. Min: -180, Max: 180'));
            } else {
                var formerObject;
                var valueObject = _this._getCanvasAndZRotate(Number(value));
                _this.getEnhancedRotate().then(function (val) {
                    formerObject = _this._getCanvasAndZRotate(Number(val));
                    return Item.set('prop:rotate_z', String(valueObject['zRotate']), _this._id);
                }).then(function () {
                    return Item.set('prop:rotate_canvas', String(valueObject['canvasRotate']), _this._id);
                }).then(function () {
                    if (formerObject['orientation'] !== valueObject['orientation']) {
                        // interChangeHeightAndWidth();
                        var outputResolution;
                        var widthMax;
                        var heightMax;
                        Item.get('mixerresolution', _this._id).then(function (val) {
                            outputResolution = val.split(',');
                            widthMax = Number(outputResolution[0]);
                            heightMax = Number(outputResolution[1]);
                            return Item.get('prop:pos', _this._id);
                        }).then(function (val) {
                            var position = val.split(',');
                            var leftPosition = parseFloat(position[0]) * widthMax;
                            var topPosition = parseFloat(position[1]) * heightMax;
                            var rightPosition = parseFloat(position[2]) * widthMax;
                            var bottomPosition = parseFloat(position[3]) * heightMax;
                            var newLeft;
                            var newRight;
                            var newTop;
                            var newBottom;
                            var widthValue = Math.round(rightPosition - leftPosition);
                            var heightValue = Math.round(bottomPosition - topPosition);
                            if (heightValue > widthMax) {
                                newLeft = 0;
                                newRight = widthMax;
                            } else {
                                var xCenter = leftPosition + (rightPosition - leftPosition) / 2;
                                newLeft = xCenter - heightValue / 2;
                                newRight = xCenter + heightValue / 2;
                            }
                            if (widthValue > heightMax) {
                                newTop = 0;
                                newBottom = heightMax;
                            } else {
                                var yCenter = topPosition + (bottomPosition - topPosition) / 2;
                                newTop = yCenter - widthValue / 2;
                                newBottom = yCenter + widthValue / 2;
                            }
                            var leftPos = newLeft / widthMax;
                            var topPos = newTop / heightMax;
                            var rightPos = newRight / widthMax;
                            var bottomPos = newBottom / heightMax;
                            return Item.set('prop:pos', leftPos.toFixed(6) + ',' + topPos.toFixed(6) + ',' + rightPos.toFixed(6) + ',' + bottomPos.toFixed(6), _this._id);
                        }).then(function () {
                            return Item.get('prop:posaspect', _this._id);
                        }).then(function (val) {
                            return Item.set('prop:pos', val, _this._id);
                        });
                    }
                });
            }
        });
    };
    ItemLayout.prototype.setCroppingEnhanced = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value.hasOwnProperty('top') && value.hasOwnProperty('left') && value.hasOwnProperty('right') && value.hasOwnProperty('bottom')) {
                var originalWidth;
                var originalHeight;
                var outputResolution;
                var position;
                var canvasRotate;
                var preCropPosition = {};
                Item.get('mixerresolution', _this._id).then(function (val) {
                    outputResolution = val.split(',');
                    return Item.get('prop:pos', _this._id);
                }).then(function (val) {
                    position = val.split(',');
                    return Item.get('prop:rotate_canvas', _this._id);
                }).then(function (val) {
                    canvasRotate = val;
                    return Item.get('prop:crop', _this._id);
                }).then(function (val) {
                    var mixerWidth = parseInt(outputResolution[0]);
                    var mixerHeight = parseInt(outputResolution[1]);
                    var leftPositionInit = parseFloat(position[0]) * mixerWidth;
                    var topPositionInit = parseFloat(position[1]) * mixerHeight;
                    var rightPositionInit = parseFloat(position[2]) * mixerWidth;
                    var bottomPositionInit = parseFloat(position[3]) * mixerHeight;
                    var widthValue = rightPositionInit - leftPositionInit;
                    var heightValue = bottomPositionInit - topPositionInit;
                    var crop = val.split(',');
                    var leftCropRaw = parseFloat(crop[0]);
                    var topCropRaw = parseFloat(crop[1]);
                    var rightCropRaw = parseFloat(crop[2]);
                    var bottomCropRaw = parseFloat(crop[3]);
                    var leftValue = Math.round(leftCropRaw * 100);
                    var topValue = Math.round(topCropRaw * 100);
                    var rightValue = Math.round(rightCropRaw * 100);
                    var bottomValue = Math.round(bottomCropRaw * 100);
                    var isNoCropping = leftValue == 0 && topValue == 0 && rightValue == 0 && bottomValue == 0;
                    if (canvasRotate == 270) {
                        if (isNoCropping) {
                            preCropPosition = position;
                            originalHeight = widthValue;
                            originalWidth = heightValue;
                        } else {
                            var leftPosition = parseFloat(position[3]);
                            var topPosition = parseFloat(position[0]);
                            var rightPosition = parseFloat(position[1]);
                            var bottomPosition = parseFloat(position[2]);
                            if (leftCropRaw != 0 || rightCropRaw != 0) {
                                originalWidth = heightValue / (1 - rightCropRaw - leftCropRaw);
                                var leftDifference = originalWidth * leftCropRaw / mixerHeight;
                                preCropPosition[3] = leftPosition + leftDifference;
                                var rightDifference = originalWidth * rightCropRaw / mixerHeight;
                                preCropPosition[1] = rightPosition - rightDifference;
                            } else {
                                originalWidth = heightValue;
                            }
                            if (topCropRaw != 0 || bottomCropRaw != 0) {
                                originalHeight = widthValue / (1 - bottomCropRaw - topCropRaw);
                                var topDifference = originalHeight * topCropRaw / mixerWidth;
                                preCropPosition[0] = topPosition - topDifference;
                                var bottomDifference = originalHeight * bottomCropRaw / mixerWidth;
                                preCropPosition[2] = bottomPosition + bottomDifference;
                            } else {
                                originalHeight = widthValue;
                            }
                            if (leftCropRaw == 0) {
                                preCropPosition[3] = position[3];
                            }
                            if (topCropRaw == 0) {
                                preCropPosition[0] = position[0];
                            }
                            if (rightCropRaw == 0) {
                                preCropPosition[1] = position[1];
                            }
                            if (bottomCropRaw == 0) {
                                preCropPosition[2] = position[2];
                            }
                        }
                    } else if (canvasRotate == 180) {
                        if (isNoCropping) {
                            preCropPosition = position;
                            originalWidth = widthValue;
                            originalHeight = heightValue;
                        } else {
                            var leftPosition = parseFloat(position[2]);
                            var topPosition = parseFloat(position[3]);
                            var rightPosition = parseFloat(position[0]);
                            var bottomPosition = parseFloat(position[1]);
                            if (leftCropRaw != 0 || rightCropRaw != 0) {
                                originalWidth = widthValue / (1 - rightCropRaw - leftCropRaw);
                                var leftDifference = originalWidth * leftCropRaw / mixerWidth;
                                preCropPosition[2] = leftPosition + leftDifference;
                                var rightDifference = originalWidth * rightCropRaw / mixerWidth;
                                preCropPosition[0] = rightPosition - rightDifference;
                            } else {
                                originalWidth = widthValue;
                            }
                            if (topCropRaw != 0 || bottomCropRaw != 0) {
                                originalHeight = heightValue / (1 - bottomCropRaw - topCropRaw);
                                var topDifference = originalHeight * topCropRaw / mixerHeight;
                                preCropPosition[3] = topPosition + topDifference;
                                var bottomDifference = originalHeight * bottomCropRaw / mixerHeight;
                                preCropPosition[1] = bottomPosition - bottomDifference;
                            } else {
                                originalHeight = heightValue;
                            }
                            if (leftCropRaw == 0) {
                                preCropPosition[2] = position[2];
                            }
                            if (topCropRaw == 0) {
                                preCropPosition[3] = position[3];
                            }
                            if (rightCropRaw == 0) {
                                preCropPosition[0] = position[0];
                            }
                            if (bottomCropRaw == 0) {
                                preCropPosition[1] = position[1];
                            }
                        }
                    } else if (canvasRotate == 90) {
                        if (isNoCropping) {
                            preCropPosition = position;
                            originalHeight = widthValue;
                            originalWidth = heightValue;
                        } else {
                            var leftPosition = parseFloat(position[1]);
                            var topPosition = parseFloat(position[2]);
                            var rightPosition = parseFloat(position[3]);
                            var bottomPosition = parseFloat(position[0]);
                            if (leftCropRaw != 0 || rightCropRaw != 0) {
                                originalWidth = heightValue / (1 - rightCropRaw - leftCropRaw);
                                var leftDifference = originalWidth * leftCropRaw / mixerHeight;
                                preCropPosition[1] = leftPosition - leftDifference;
                                var rightDifference = originalWidth * rightCropRaw / mixerHeight;
                                preCropPosition[3] = rightPosition + rightDifference;
                            } else {
                                originalWidth = heightValue;
                            }
                            if (topCropRaw != 0 || bottomCropRaw != 0) {
                                originalHeight = widthValue / (1 - bottomCropRaw - topCropRaw);
                                var topDifference = originalHeight * topCropRaw / mixerWidth;
                                preCropPosition[2] = topPosition + topDifference;
                                var bottomDifference = originalHeight * bottomCropRaw / mixerWidth;
                                preCropPosition[0] = bottomPosition - bottomDifference;
                            } else {
                                originalHeight = widthValue;
                            }
                            if (leftCropRaw == 0) {
                                preCropPosition[1] = position[1];
                            }
                            if (topCropRaw == 0) {
                                preCropPosition[2] = position[2];
                            }
                            if (rightCropRaw == 0) {
                                preCropPosition[3] = position[3];
                            }
                            if (bottomCropRaw == 0) {
                                preCropPosition[0] = position[0];
                            }
                        }
                    } else {
                        if (isNoCropping) {
                            preCropPosition = position;
                            originalHeight = heightValue;
                            originalWidth = widthValue;
                        } else {
                            var leftPosition = parseFloat(position[0]);
                            var topPosition = parseFloat(position[1]);
                            var rightPosition = parseFloat(position[2]);
                            var bottomPosition = parseFloat(position[3]);
                            if (leftCropRaw != 0 || rightCropRaw != 0) {
                                originalWidth = widthValue / (1 - rightCropRaw - leftCropRaw);
                                var leftDifference = originalWidth * leftCropRaw / mixerWidth;
                                preCropPosition[0] = leftPosition - leftDifference;
                                var rightDifference = originalWidth * rightCropRaw / mixerWidth;
                                preCropPosition[2] = rightPosition + rightDifference;
                            } else {
                                originalWidth = widthValue;
                            }
                            if (topCropRaw != 0 || bottomCropRaw != 0) {
                                originalHeight = heightValue / (1 - bottomCropRaw - topCropRaw);
                                var topDifference = originalHeight * topCropRaw / mixerHeight;
                                preCropPosition[1] = topPosition - topDifference;
                                var bottomDifference = originalHeight * bottomCropRaw / mixerHeight;
                                preCropPosition[3] = bottomPosition + bottomDifference;
                            } else {
                                originalHeight = heightValue;
                            }
                            if (leftCropRaw == 0) {
                                preCropPosition[0] = position[0];
                            }
                            if (topCropRaw == 0) {
                                preCropPosition[1] = position[1];
                            }
                            if (rightCropRaw == 0) {
                                preCropPosition[2] = position[2];
                            }
                            if (bottomCropRaw == 0) {
                                preCropPosition[3] = position[3];
                            }
                        }
                    }
                    var leftCrop = value['left'];
                    var topCrop = value['top'];
                    var rightCrop = value['right'];
                    var bottomCrop = value['bottom'];
                    var leftPosition = parseFloat(preCropPosition[0]);
                    var topPosition = parseFloat(preCropPosition[1]);
                    var rightPosition = parseFloat(preCropPosition[2]);
                    var bottomPosition = parseFloat(preCropPosition[3]);
                    var sourceHeight = (bottomPosition - topPosition) * mixerHeight;
                    var sourceWidth = (rightPosition - leftPosition) * mixerWidth;
                    var newLeft, newTop, newRight, newBottom;
                    if (canvasRotate == 270) {
                        newLeft = topCrop * sourceWidth / mixerWidth + leftPosition;
                        newTop = rightCrop * sourceHeight / mixerHeight + topPosition;
                        newRight = rightPosition - bottomCrop * sourceWidth / mixerWidth;
                        newBottom = bottomPosition - leftCrop * sourceHeight / mixerHeight;
                    } else if (canvasRotate == 180) {
                        newLeft = rightCrop * sourceWidth / mixerWidth + leftPosition;
                        newTop = bottomCrop * sourceHeight / mixerHeight + topPosition;
                        newRight = rightPosition - leftCrop * sourceWidth / mixerWidth;
                        newBottom = bottomPosition - topCrop * sourceHeight / mixerHeight;
                    } else if (canvasRotate == 90) {
                        newLeft = bottomCrop * sourceWidth / mixerWidth + leftPosition;
                        newTop = leftCrop * sourceHeight / mixerHeight + topPosition;
                        newRight = rightPosition - topCrop * sourceWidth / mixerWidth;
                        newBottom = bottomPosition - rightCrop * sourceHeight / mixerHeight;
                    } else {
                        newLeft = leftCrop * sourceWidth / mixerWidth + leftPosition;
                        newTop = topCrop * sourceHeight / mixerHeight + topPosition;
                        newRight = rightPosition - rightCrop * sourceWidth / mixerWidth;
                        newBottom = bottomPosition - bottomCrop * sourceHeight / mixerHeight;
                    }
                    Item.set('prop:crop', value['left'].toFixed(6) + ',' + value['top'].toFixed(6) + ',' + value['right'].toFixed(6) + ',' + value['bottom'].toFixed(6), _this._id).then(function () {
                        return Item.set('prop:pos', newLeft.toFixed(6) + ',' + newTop.toFixed(6) + ',' + newRight.toFixed(6) + ',' + newBottom.toFixed(6), _this._id);
                    }).then(function () {
                        resolve(_this);
                    });
                });
            } else {
                reject('Error setting cropping,' + ' insufficient properties (left, top, right, bottom)');
            }
        });
    };
    ItemLayout.prototype.bringForward = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:zorder', '+', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemLayout.prototype.sendBackward = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:zorder', '-', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemLayout.prototype.bringToFront = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var itemsLength = 0;
            var itemIndex = -1;
            var forwardStep = 0;
            Scene.searchScenesByItemId(_this._id).then(function (itemScene) {
                return itemScene.getItems();
            }).then(function (sceneItems) {
                itemsLength = sceneItems.length;
                for (var i = 0; i < itemsLength; ++i) {
                    if (sceneItems[i]['_id'] === _this._id) {
                        itemIndex = i;
                        break;
                    }
                }
                if (itemsLength > 0 && itemIndex > -1) {
                    forwardStep = itemsLength - 1 - itemIndex;
                }
                var promiseArray = [];
                var zorderPromise = function zorderPromise(itemId, idx) {
                    return new Promise(function (zorderResolve) {
                        Item.set('prop:zorder', '+', _this._id).then(function () {
                            zorderResolve();
                        });
                    });
                };
                for (var i = forwardStep - 1; i >= 0; i--) {
                    promiseArray.push(zorderPromise(_this._id, i));
                }
                Promise.all(promiseArray).then(function () {
                    resolve(_this);
                });
            });
            // get index in scene
            // call bring forward based on index
        });
    };
    ItemLayout.prototype.sendToBack = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var itemsLength = 0;
            var itemIndex = -1;
            var backwardStep = 0;
            Scene.searchScenesByItemId(_this._id).then(function (itemScene) {
                return itemScene.getItems();
            }).then(function (sceneItems) {
                itemsLength = sceneItems.length;
                for (var i = 0; i < itemsLength; ++i) {
                    if (sceneItems[i]['_id'] === _this._id) {
                        itemIndex = i;
                        break;
                    }
                }
                if (itemsLength > 0 && itemIndex > -1) {
                    backwardStep = itemIndex;
                }
                var promiseArray = [];
                var zorderPromise = function zorderPromise(itemId, idx) {
                    return new Promise(function (zorderResolve) {
                        Item.set('prop:zorder', '-', _this._id).then(function () {
                            zorderResolve();
                        });
                    });
                };
                for (var i = backwardStep - 1; i >= 0; i--) {
                    promiseArray.push(zorderPromise(_this._id, i));
                }
                Promise.all(promiseArray).then(function () {
                    resolve(_this);
                });
            });
            // get index in scene
            // call bring forward based on index
        });
    };
    return ItemLayout;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * Used by items to determine the its view type.
 *
 * Check `getView()` method of {@link #core/Item#getView Core/Item}
 */

(function (ViewTypes) {
    ViewTypes[ViewTypes["MAIN"] = 0] = "MAIN";
    ViewTypes[ViewTypes["PREVIEW"] = 1] = "PREVIEW";
    ViewTypes[ViewTypes["THUMBNAIL"] = 2] = "THUMBNAIL";
})(exports.ViewTypes || (exports.ViewTypes = {}));
/**
 * An `Item` is rendered from a {@link #core/Source Source} and represents an
 * object that is used as an item on the stage. Multiple items may be linked to
 * a single source and any changes made to the source would affect all linked
 * items.
 *
 * Implements: {@link #core/IItemLayout Core/IItemLayout}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var xjs = require('xjs');
 * var Scene = xjs.Scene.getById(1);
 *
 * Scene.getItems().then(function(items) {
 *   if (items.length === 0) return;
 *
 *   // There's a valid item, let's use that
 *   var item = items[items.length - 1];
 *   return item.setKeepAspectRatio(true);
 * }).then(function(item) {
 *   // Do something else here
 * });
 * ```
 * All methods marked as *Chainable* resolve with the original `Item` instance.
 * This allows you to perform sequential operations correctly:
 * ```javascript
 * var xjs = require('xjs');
 * var Source = xjs.Source;
 *
 * // an item that sets its own properties on load
 * xjs.ready()
 *    .then(Source.getCurrentSource)
 *    .then(function(source) {
 *    return source.getItemList()
 *  }).then(function(items) {
 *    return items[0].setEnhancedResizeEnabled(true)
 *  }).then(function(items) {
 *    return items[0].setPositionLocked(true)
 *  }).then(function(items) {
 *    //set more properties here
 *  })
 * ```
 */
var Item$1 = function (_super) {
    __extends(Item$$1, _super);
    function Item$$1(props) {
        _super.call(this, props);
        this._isItemCall = true;
    }
    /**
     * param: (event: string,  handler: Function)
     *
     * Allows listening to events per instance.
     * Currently there are only two:
     * `item-changed` and `item-destroyed`.
     *
     * Item change is triggered thru any property change:
     * - via js(source plugin/extension),
     * - via visibility-toggling through the sources list,
     * - or via the source properties dialog
     *
     *  #### Usage:
     *
     * ```javascript
     * let itemChange = function(...args) {
     *   console.log('Item has changed');
     * }
     *
     * let current;
     * let items;
     * xjs.Scene.getActiveScene()
     * .then( scene => {
     *   current = scene;
     *   return current.getItems();
     * }).then( list => {
     *   items = list;
     *   items[0].on('item-changed', itemChange);
     * });
     * ```
     *
     * Duplicate handlers are allowed.
     */
    Item$$1.prototype.on = function (event, handler) {
        var _this = this;
        Item$$1._emitter.on(event + '_' + this._id, handler);
        // add additional functionality for events
        var isItemSubscribeEventsSupported = versionCompare(getVersion()).is.greaterThanOrEqualTo(itemSubscribeEventVersion);
        if (event === 'item-changed' && isItemSubscribeEventsSupported && !Environment.isSourceProps() && Item$$1._subscriptions.indexOf('itempropchange_' + this._id) < 0) {
            Item$$1._subscriptions.push('itempropchange_' + this._id);
            EventManager.subscribe('itempropchange_' + this._id, function () {
                var eventArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    eventArgs[_i - 0] = arguments[_i];
                }
                (_a = Item$$1._emitter).emit.apply(_a, ['item-changed_' + _this._id].concat(eventArgs));
                var _a;
            });
        } else if (event === 'item-destroyed' && isItemSubscribeEventsSupported && !Environment.isSourceProps() && Item$$1._subscriptions.indexOf('itemdestroyed_' + this._id) < 0) {
            Item$$1._subscriptions.push('itemdestroyed_' + this._id);
            EventManager.subscribe('itemdestroyed_' + this._id, function () {
                var eventArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    eventArgs[_i - 0] = arguments[_i];
                }
                (_a = Item$$1._emitter).emit.apply(_a, ['item-destroyed_' + _this._id].concat(eventArgs));
                var _a;
            });
        }
    };
    /**
     * param: (event: string,  handler: Function)
     *
     * Removes specificied event handler bound by `on`.
     * Note that this can only be done for named function handlers.
     *
     *  #### Usage:
     *
     * ```javascript
     * let itemChange = function(...args) {
     *   console.log('Item has changed');
     * }
     *
     * let current;
     * let items;
     * xjs.Scene.getActiveScene()
     * .then( scene => {
     *   current = scene;
     *   return current.getItems();
     * }).then( list => {
     *   items = list;
     *   items[0].on('item-changed', itemChange);
     *   setTimeout( ()=> {
     *     items[0].off('item-changed', itemChange);
     *   }, 10000);
     * });
     * ```
     */
    Item$$1.prototype.off = function (event, handler) {
        Item$$1._emitter.off(event + '_' + this._id, handler);
    };
    /**
     * return: Promise<Item[]>
     *
     * Gets the list of linked items of the current Item.
     * Linked items are items linked to a single source.
     *
     * #### Usage
     *
     * ```javascript
     * xjs.Item.getItemList().then(function(items) {
     *   for (var i = 0 ; i < items.length ; i++) {
     *     // Manipulate each item here
     *     items[i].setKeepAspectRatio(true);
     *   }
     * })
     * ```
     *
     * This is simply a shortcut to:
     * `xjs.Item.getCurrentSource()` -> `source.getItemList()`
     */
    Item$$1.getItemList = function () {
        return new Promise(function (resolve) {
            resolve(Source.getItemList());
        });
    };
    /**
     * return: Promise<ViewTypes>
     *
     * Get the view type of the item
     *
     * #### Usage
     *
     * ```javascript
     * item.getView().then(function(view) {
     *   // view values:
     *   // 0 = main view
     *   // 1 = preview editor
     *   // 2 = thumbnail preview
     * })
     * ```
     */
    Item$$1.prototype.getView = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:viewid', _this._id).then(function (viewId) {
                var view = exports.ViewTypes.MAIN;
                if (viewId === '1') {
                    var preview_1;
                    App.getGlobalProperty('preview_editor_opened').then(function (result) {
                        preview_1 = result;
                        view = preview_1 === '1' ? exports.ViewTypes.PREVIEW : exports.ViewTypes.THUMBNAIL;
                        resolve(view);
                    });
                } else {
                    resolve(view);
                }
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Get (1-indexed) Scene ID where the source is loaded
     *
     * #### Usage
     *
     * ```javascript
     * source.getSceneId().then(function(id) {
     *   // The rest of your code here
     * });
     * ```
     */
    Item$$1.prototype.getSceneId = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(Number(_this._sceneId) + 1);
        });
    };
    /**
     * return: XML
     *
     * Convert the Item object to an XML object. Use `toString()` to
     * get the string version of the returned object.
     *
     * #### Usage
     *
     * ```javascript
     * var xml = item.toXML();
     * ```
     */
    Item$$1.prototype.toXML = function () {
        var item = new JSON$1();
        for (var prop in this._xmlparams) {
            if (!{}.hasOwnProperty.call(this._xmlparams, prop)) continue;
            item[prop] = this._xmlparams[prop];
        }
        item['tag'] = 'item';
        item['selfclosing'] = true;
        return XML.parseJSON(item);
    };
    /**
     * param: (options: {linked?:<boolean>, scene?:<Scene> })
     * ```
     * return: Promise<Item>
     * ```
     * Duplicate an item into the current scene or to a specified scene as
     * Linked or Unlinked.
     *
     * Linked items would generally have a single source, and any changes in the
     * property of an item would be applied to all linked items.
     *
     *  *Chainable*
     *
     * #### Usage
     * ```javascript
     * // item pertains to an actual Item instance
     * // Sample 1
     * item.duplicate() // duplicate selected item to the current scene as unlinked
     *```
     * Duplicate the selected item to a specific scene and set it to be linked to
     * a single source with the original item.
     * ```javascript
     * // Sample 2
     * var toScene = xjs.Scene.getById(2)
     * item.duplicate({linked:true, scene:toScene})
     *
     * ```
     */
    Item$$1.prototype.duplicate = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (versionCompare(getVersion()).is.lessThan(globalsrcMinVersion)) {
                App.callFunc('additem', _this.toXML().toString()).then(function () {
                    resolve(_this);
                });
            } else {
                if (options) {
                    if (options.linked) {
                        Item.set('prop:keeploaded', '1', _this._id);
                    }
                    if (options.scene !== undefined && options.linked !== undefined) {
                        if (options.scene instanceof Scene) {
                            options.scene.getSceneNumber().then(function (id) {
                                App.callFunc("link:" + (options.linked ? 1 : 0) + "|s:" + id + "|additem", _this.toXML().toString()).then(function () {
                                    resolve(_this);
                                });
                            });
                        } else {
                            reject(Error('Invalid parameters'));
                        }
                    } else if (options.linked === undefined) {
                        if (options.scene instanceof Scene) {
                            options.scene.getSceneNumber().then(function (id) {
                                App.callFunc("link:0|s:" + id + "|additem", _this.toXML().toString()).then(function () {
                                    resolve(_this);
                                });
                            });
                        } else {
                            reject(Error('Invalid parameters'));
                        }
                    } else if (options.scene === undefined) {
                        App.callFunc("link:" + (options.linked ? 1 : 0) + "|s:" + _this._sceneId + "|additem", _this.toXML().toString()).then(function () {
                            resolve(_this);
                        });
                    }
                } else {
                    App.callFunc('link:0|additem', _this.toXML().toString()).then(function () {
                        resolve(_this);
                    });
                }
            }
        });
    };
    /**
     * return: Promise<Item>
     *
     * Unlinks selected item.
     *
     * Unlinks an item to the source of other linked items and renders its
     * own source.
     *
     * #### Usage
     * ```javascript
     * item.unlink()
     * ```
     *
     * Note: Once you unlink an Item, there's still no method to reverse the
     * process.
     *
     */
    Item$$1.prototype.unlink = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:globalsrc', '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    /**
     * return: Promise<Source>
     *
     * Gets the Source of an item, linked items would only have 1 source.
     *
     * *Chainable*
     *
     * #### Usage
     * ```javascript
     * item.getSource().then(function(source) {
     *   //Manipulate source here
     *   source.setName('New Name')
     * })
     * ```
     */
    Item$$1.prototype.getSource = function () {
        var _this = this;
        var uniqueSource = [];
        var uniqueObj = {};
        var promiseArray = [];
        return new Promise(function (resolve, reject) {
            _this.getItemList().then(function (items) {
                for (var i = 0; i < items.length; i++) {
                    for (var key in items[i]) {
                        if (key === '_srcId') {
                            uniqueObj[items[i][key]] = items[i];
                        }
                    }
                }
                for (var j in uniqueObj) {
                    if (uniqueObj.hasOwnProperty(j)) {
                        uniqueSource.push(uniqueObj[j]);
                    }
                }
                var typePromise = function typePromise(index) {
                    return new Promise(function (typeResolve) {
                        var source = uniqueSource[index];
                        var params = source['_xmlparams'];
                        var type = Number(source['_type']);
                        if (type === exports.ItemTypes.GAMESOURCE) {
                            typeResolve(new GameSource(params));
                        } else if ((type === exports.ItemTypes.HTML || type === exports.ItemTypes.FILE) && source['_name'].indexOf('Video Playlist') === 0 && source['FilePlaylist'] !== '') {
                            typeResolve(new VideoPlaylistSource(params));
                        } else if (type === exports.ItemTypes.HTML) {
                            typeResolve(new HtmlSource(params));
                        } else if (type === exports.ItemTypes.SCREEN) {
                            typeResolve(new ScreenSource(params));
                        } else if (type === exports.ItemTypes.BITMAP || type === exports.ItemTypes.FILE && /\.gif$/.test(source['item'])) {
                            typeResolve(new ImageSource(params));
                        } else if (type === exports.ItemTypes.FILE && /\.(gif|xbs)$/.test(source['item']) === false && /^(rtsp|rtmp):\/\//.test(source['item']) === false) {
                            typeResolve(new MediaSource(params));
                        } else if (Number(source['type']) === exports.ItemTypes.LIVE && source['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') === -1) {
                            typeResolve(new CameraSource(params));
                        } else if (Number(source['type']) === exports.ItemTypes.LIVE && source['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') !== -1) {
                            typeResolve(new AudioSource(params));
                        } else if (Number(source['type']) === exports.ItemTypes.FLASHFILE) {
                            typeResolve(new FlashSource(params));
                        } else {
                            typeResolve(new Source(params));
                        }
                    });
                };
                if (Array.isArray(uniqueSource)) {
                    for (var i = 0; i < uniqueSource.length; i++) {
                        promiseArray.push(typePromise(i));
                    }
                }
                Promise.all(promiseArray).then(function (results) {
                    resolve(results[0]);
                });
            });
        });
    };
    Item$$1._emitter = new EventEmitter();
    Item$$1._subscriptions = [];
    return Item$$1;
}(Source);
applyMixins(Item$1, [iSource, ItemLayout]);

/// <reference path="../../../defs/es6-promise.d.ts" />
var ItemColor = function () {
    function ItemColor() {}
    ItemColor.prototype.getTransparency = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:alpha', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemColor.prototype.setTransparency = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < 0 || value > 255) {
                reject(RangeError('Transparency may only be in the range 0 to 255.'));
            } else {
                Item.set('prop:alpha', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemColor.prototype.getBrightness = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_brightness', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemColor.prototype.setBrightness = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -100 || value > 100) {
                reject(RangeError('Brightness may only be in the range -100 to 100.'));
            } else {
                Item.set('prop:cc_brightness', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemColor.prototype.getContrast = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_contrast', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemColor.prototype.setContrast = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -100 || value > 100) {
                reject(RangeError('Contrast may only be in the range -100 to 100.'));
            } else {
                Item.set('prop:cc_contrast', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemColor.prototype.getHue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_hue', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemColor.prototype.setHue = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -180 || value > 180) {
                reject(RangeError('Contrast may only be in the range -180 to 180.'));
            } else {
                Item.set('prop:cc_hue', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemColor.prototype.getSaturation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_saturation', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemColor.prototype.setSaturation = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < -100 || value > 100) {
                reject(RangeError('Saturation may only be in the range -100 to 100'));
            } else {
                Item.set('prop:cc_saturation', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemColor.prototype.getBorderColor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:border', _this._id).then(function (val) {
                var color;
                if (val === '0') {
                    color = Color.fromTransparent();
                } else {
                    var bgr = Number(val) - 0x80000000;
                    color = Color.fromBGRInt(bgr);
                }
                resolve(color);
            });
        });
    };
    ItemColor.prototype.setBorderColor = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var colorString;
            if (value.isTransparent()) {
                colorString = '0';
            } else {
                colorString = String(value.getIbgr() - 0x80000000);
            }
            Item.set('prop:border', colorString, _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemColor.prototype.isFullDynamicColorRange = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_dynamicrange', _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    ItemColor.prototype.setFullDynamicColorRange = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'boolean') {
                reject(TypeError('Parameter should be boolean.'));
            } else {
                Item.set('prop:cc_dynamicrange', value ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    return ItemColor;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 *  Used by items that implement the Chroma interface.
 *  Check `getKeyingType()`/`setKeyingType()` method of
 *  {@link #core/CameraItem#getKeyingType Core/CameraItem},
 *  {@link #core/GameItem#getKeyingType Core/GameItem}, and
 *  {@link #core/HtmlItem#getKeyingType Core/HtmlItem}.
 */

(function (KeyingType) {
    KeyingType[KeyingType["LEGACY"] = 0] = "LEGACY";
    KeyingType[KeyingType["COLORKEY"] = 1] = "COLORKEY";
    KeyingType[KeyingType["RGBKEY"] = 2] = "RGBKEY"; // Chroma Key RGB Mode
})(exports.KeyingType || (exports.KeyingType = {}));
/**
 *  Used by items that implement the Chroma interface, when using RGB mode
 *  Chroma Key.
 *
 *  Check `getChromaRGBKeyPrimaryColor()`/`setChromaRGBKeyPrimaryColor()` method
 *  of {@link #core/CameraItem#getChromaRGBKeyPrimaryColor Core/CameraItem},
 *  {@link #core/GameItem#getChromaRGBKeyPrimaryColor Core/GameItem}, and
 *  {@link #core/HtmlItem#getChromaRGBKeyPrimaryColor Core/HtmlItem}.
 */

(function (ChromaPrimaryColors) {
    ChromaPrimaryColors[ChromaPrimaryColors["RED"] = 0] = "RED";
    ChromaPrimaryColors[ChromaPrimaryColors["GREEN"] = 1] = "GREEN";
    ChromaPrimaryColors[ChromaPrimaryColors["BLUE"] = 2] = "BLUE";
})(exports.ChromaPrimaryColors || (exports.ChromaPrimaryColors = {}));
/**
 *  Used by items that implement the Chroma interface.
 *
 *  Check `getChromaAntiAliasLevel()`/`setChromaAntiAliasLevel()` method
 *  of {@link #core/CameraItem#getChromaAntiAliasLevel Core/CameraItem},
 *  {@link #core/GameItem#getChromaAntiAliasLevel Core/GameItem}, and
 *  {@link #core/HtmlItem#getChromaAntiAliasLevel Core/HtmlItem}.
 */

(function (ChromaAntiAliasLevel) {
    ChromaAntiAliasLevel[ChromaAntiAliasLevel["NONE"] = 0] = "NONE";
    ChromaAntiAliasLevel[ChromaAntiAliasLevel["LOW"] = 1] = "LOW";
    ChromaAntiAliasLevel[ChromaAntiAliasLevel["HIGH"] = 2] = "HIGH";
})(exports.ChromaAntiAliasLevel || (exports.ChromaAntiAliasLevel = {}));
var ItemChroma = function () {
    function ItemChroma() {}
    ItemChroma.prototype.isChromaEnabled = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromakey', _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    ItemChroma.prototype.setChromaEnabled = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'boolean') {
                reject(TypeError('Parameter should be boolean.'));
            } else {
                Item.set('prop:key_chromakey', value ? '1' : '0', _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getKeyingType = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromakeytype', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setKeyingType = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a KeyingType value as the parameter.'));
            } else if (value < 0 || value > 2) {
                reject(RangeError('Use a KeyingType value as the parameter.'));
            } else {
                Item.set('prop:key_chromakeytype', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaAntiAliasLevel = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_antialiasing', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaAntiAliasLevel = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a ChromaAntiAliasLevel value as the parameter.'));
            } else if (value < 0 || value > 2) {
                reject(RangeError('Use a ChromaAntiAliasLevel value as the parameter.'));
            } else {
                Item.set('prop:key_antialiasing', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    // CHROMA LEGACY MODE FUNCTIONS
    ItemChroma.prototype.getChromaLegacyBrightness = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromabr', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaLegacyBrightness = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromabr', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaLegacySaturation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromasat', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaLegacySaturation = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromasat', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaLegacyHue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromahue', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaLegacyHue = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 180) {
                reject(RangeError('Valid value is an integer from 0-180.'));
            } else {
                Item.set('prop:key_chromahue', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaLegacyThreshold = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromarang', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaLegacyThreshold = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromarang', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaLegacyAlphaSmoothing = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromaranga', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaLegacyAlphaSmoothing = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromaranga', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    // CHROMA RGB KEY FUNCTIONS
    ItemChroma.prototype.getChromaRGBKeyPrimaryColor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromargbkeyprimary', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaRGBKeyPrimaryColor = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a ChromaPrimaryColors value as the parameter.'));
            } else if (value < 0 || value > 2) {
                reject(RangeError('Use a ChromaPrimaryColors value as the parameter.'));
            } else {
                Item.set('prop:key_chromargbkeyprimary', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaRGBKeyThreshold = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromargbkeythresh', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaRGBKeyThreshold = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromargbkeythresh', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaRGBKeyExposure = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_chromargbkeybalance', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaRGBKeyExposure = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_chromargbkeybalance', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    // CHROMA COLOR KEY FUNCTIONS
    ItemChroma.prototype.getChromaColorKeyThreshold = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_colorrang', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaColorKeyThreshold = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_colorrang', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaColorKeyExposure = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_colorranga', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemChroma.prototype.setChromaColorKeyExposure = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use an integer as the parameter.'));
            } else if (value < 0 || value > 255) {
                reject(RangeError('Valid value is an integer from 0-255.'));
            } else {
                Item.set('prop:key_colorranga', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemChroma.prototype.getChromaColorKeyColor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_colorrgb', _this._id).then(function (val) {
                var color = Color.fromBGRString(val);
                resolve(color);
            });
        });
    };
    ItemChroma.prototype.setChromaColorKeyColor = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:key_colorrgb', String(value.getIbgr()), _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    return ItemChroma;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 *  Used by sources that implement the Effect interface.
 *  Check `getMaskEffect()`/`setMaskEffect()` method of
 *  {@link #core/CameraItem#getMaskEffect Core/CameraItem},
 *  {@link #core/FlashItem#getMaskEffect Core/FlashItem},
 *  {@link #core/GameItem#getMaskEffect Core/GameItem},
 *  {@link #core/HtmlItem#getMaskEffect Core/HtmlItem},
 *  {@link #core/ImageItem#getMaskEffect Core/ImageItem},
 *  {@link #core/MediaItem#getMaskEffect Core/MediaItem}, and
 *  {@link #core/ScreenItem#getMaskEffect Core/ScreenItem}.
 */

(function (MaskEffect) {
    MaskEffect[MaskEffect["NONE"] = 0] = "NONE";
    MaskEffect[MaskEffect["SHAPE"] = 1] = "SHAPE";
    MaskEffect[MaskEffect["FILE_BIND_TO_SOURCE"] = 2] = "FILE_BIND_TO_SOURCE";
    MaskEffect[MaskEffect["FILE_BIND_TO_STAGE"] = 3] = "FILE_BIND_TO_STAGE";
})(exports.MaskEffect || (exports.MaskEffect = {}));
var _DEFAULT_EFFECT_VALUES = {
    'MASK_EFFECT': exports.MaskEffect.NONE,
    'BORDER_RADIUS': 0,
    'BORDER_THICKNESS': 0,
    'BORDER_OPACITY': 100,
    'BORDER_COLOR': Color.fromRGBString('#FFFFFF'),
    'SHADOW_COLOR': Color.fromRGBString('#FFFFFF'),
    'SHADOW_THICKNESS': 0,
    'SHADOW_BLUR': 0,
    'SHADOW_OPACITY': 100,
    'SHADOW_OFFSET_X': 0,
    'SHADOW_OFFSET_Y': 0,
    'FILE_MASK': '',
    'FILE_MASK_GUIDE': false
};
var _DEFAULT_EDGE_EFFECT_CONFIG = '0,1.00,1.00,1.00,1|1,0,0,0,1|2,0,0,0,0|3,1.00,1.00,1.00,1';
var ItemEffect = function () {
    function ItemEffect() {}
    ItemEffect.prototype._convertToHex = function (value) {
        var hex = parseInt(String(Number(value) * 255)).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    };
    ItemEffect.prototype._getEdgeEffectValue = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Item.get('prop:edgeeffectcfg', _this._id).then(function (val) {
                if (val !== '' && val !== null) {
                    var edgeConfig = val.split("|");
                    var arrayIndex = value['arrayIndex'];
                    var individualIndex = value['indIndex'];
                    if (typeof edgeConfig[arrayIndex] !== 'undefined') {
                        var cfgArray = edgeConfig[arrayIndex].split(',');
                        if (Array.isArray(individualIndex)) {
                            var newArray = [];
                            for (var i = 0; i < individualIndex.length; ++i) {
                                var config = individualIndex[i];
                                newArray.push(cfgArray[config]);
                            }
                            resolve(newArray);
                        } else {
                            resolve(cfgArray[individualIndex]);
                        }
                    } else {
                        reject(RangeError('Invalid parameter. Array index given not included.'));
                    }
                } else {
                    reject(ReferenceError('Edge effect configuration not set.'));
                }
            });
        });
    };
    ItemEffect.prototype._setEdgeEffectValue = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Item.get('prop:edgeeffectcfg', _this._id).then(function (val) {
                var edgeConfig = [];
                var edgeEffectString;
                if (val !== '' && val !== null) {
                    edgeEffectString = val;
                } else {
                    edgeEffectString = _DEFAULT_EDGE_EFFECT_CONFIG;
                }
                var edgeArray = edgeEffectString.split("|");
                var edgeArrayLength = edgeArray.length;
                for (var i = 0; i < edgeArrayLength; ++i) {
                    edgeConfig.push(edgeArray[i].split(','));
                }
                var arrayIndex = value['arrayIndex'];
                var individualIndex = value['indIndex'];
                var setValue = value['value'];
                if (typeof edgeConfig[arrayIndex] !== 'undefined') {
                    var oldArray = edgeConfig[arrayIndex];
                    if (Array.isArray(individualIndex)) {
                        for (var j = 0; j < individualIndex.length; ++j) {
                            var tempIndex = individualIndex[j];
                            oldArray[tempIndex] = setValue[j];
                        }
                    } else {
                        oldArray[individualIndex] = setValue;
                    }
                    edgeConfig[arrayIndex] = oldArray;
                    var edgeEffectStringValue = '';
                    for (var k = 0; k < edgeConfig.length; ++k) {
                        edgeEffectStringValue = edgeEffectStringValue + edgeConfig[k].toString();
                        if (k !== edgeConfig.length - 1) {
                            edgeEffectStringValue = edgeEffectStringValue + '|';
                        }
                    }
                    Item.set('prop:edgeeffectcfg', edgeEffectStringValue, _this._id).then(function () {
                        resolve(_this);
                    });
                } else {
                    reject(RangeError('Invalid parameter. Array index given not included.'));
                }
            });
        });
    };
    ItemEffect.prototype._getRGBArray = function (value) {
        var hex = value.getRgb();
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4), 16) / 255;
        return [r, g, b];
    };
    ItemEffect.prototype.getMaskEffect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:edgeeffectid', _this._id).then(function (val) {
                if (val === 'border') {
                    resolve(exports.MaskEffect.SHAPE);
                } else {
                    Item.get('prop:edgeeffectmaskmode', _this._id).then(function (val) {
                        if (val === '1' || val === '3') {
                            resolve(exports.MaskEffect.FILE_BIND_TO_SOURCE);
                        } else if (val === '2' || val === '4') {
                            resolve(exports.MaskEffect.FILE_BIND_TO_STAGE);
                        } else {
                            resolve(_DEFAULT_EFFECT_VALUES['MASK_EFFECT']);
                        }
                    });
                }
            });
        });
    };
    ItemEffect.prototype.setMaskEffect = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a MaskEffect value as the parameter.'));
            } else if (value < 0 || value > 3) {
                reject(RangeError('Use a MaskEffect value as the parameter.'));
            } else {
                if (value === 1) {
                    Item.set('prop:edgeeffectmaskmode', '0', _this._id).then(function () {
                        return Item.set('prop:edgeeffectid', 'border', _this._id);
                    }).then(function () {
                        resolve(_this);
                    });
                } else {
                    Item.set('prop:edgeeffectid', '', _this._id).then(function () {
                        if (value === 2 || value === 3) {
                            value = value - 1;
                        } else {
                            value = 0;
                        }
                        return Item.set('prop:edgeeffectmaskmode', String(value), _this._id);
                    }).then(function () {
                        resolve(_this);
                    });
                }
            }
        });
    };
    ItemEffect.prototype.getBorderEffectRadius = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 1;
            parameterObject['indIndex'] = 1;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['BORDER_RADIUS']);
            });
        });
    };
    ItemEffect.prototype.setBorderEffectRadius = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 1;
                parameterObject['indIndex'] = 1;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getBorderEffectThickness = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 1;
            parameterObject['indIndex'] = 2;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['BORDER_THICKNESS']);
            });
        });
    };
    ItemEffect.prototype.setBorderEffectThickness = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 1;
                parameterObject['indIndex'] = 2;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getBorderEffectOpacity = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 0;
            parameterObject['indIndex'] = 4;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['BORDER_OPACITY']);
            });
        });
    };
    ItemEffect.prototype.setBorderEffectOpacity = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 0;
                parameterObject['indIndex'] = 4;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getBorderEffectColor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 0;
            parameterObject['indIndex'] = [1, 2, 3];
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Color.fromRGBString('#' + _this._convertToHex(val[0]) + _this._convertToHex(val[1]) + _this._convertToHex(val[2])));
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['BORDER_COLOR']);
            });
        });
    };
    ItemEffect.prototype.setBorderEffectColor = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 0;
            parameterObject['indIndex'] = [1, 2, 3];
            parameterObject['value'] = _this._getRGBArray(value);
            _this._setEdgeEffectValue(parameterObject).then(function () {
                resolve(_this);
            });
        });
    };
    ItemEffect.prototype.getShadowEffectColor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 3;
            parameterObject['indIndex'] = [1, 2, 3];
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Color.fromRGBString('#' + _this._convertToHex(val[0]) + _this._convertToHex(val[1]) + _this._convertToHex(val[2])));
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_COLOR']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectColor = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 3;
            parameterObject['indIndex'] = [1, 2, 3];
            parameterObject['value'] = _this._getRGBArray(value);
            _this._setEdgeEffectValue(parameterObject).then(function () {
                resolve(_this);
            });
        });
    };
    ItemEffect.prototype.getShadowEffectThickness = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 1;
            parameterObject['indIndex'] = 3;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_THICKNESS']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectThickness = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 1;
                parameterObject['indIndex'] = 3;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getShadowEffectBlur = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 2;
            parameterObject['indIndex'] = 3;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_BLUR']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectBlur = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 2;
                parameterObject['indIndex'] = 3;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getShadowEffectOpacity = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 3;
            parameterObject['indIndex'] = 4;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_OPACITY']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectOpacity = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < 0 || value > 100) {
                reject(RangeError('Valid value is a number from 0 - 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 3;
                parameterObject['indIndex'] = 4;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getShadowEffectOffsetX = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 2;
            parameterObject['indIndex'] = 1;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_OFFSET_X']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectOffsetX = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < -100 || value > 100) {
                reject(RangeError('Valid value is a number from -100 to 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 2;
                parameterObject['indIndex'] = 1;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getShadowEffectOffsetY = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var parameterObject = {};
            parameterObject['arrayIndex'] = 2;
            parameterObject['indIndex'] = 2;
            _this._getEdgeEffectValue(parameterObject).then(function (val) {
                resolve(Number(val) * 100);
            }).catch(function (err) {
                resolve(_DEFAULT_EFFECT_VALUES['SHADOW_OFFSET_Y']);
            });
        });
    };
    ItemEffect.prototype.setShadowEffectOffsetY = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof value !== 'number') {
                reject(TypeError('Use a number as the parameter.'));
            } else if (value < -100 || value > 100) {
                reject(RangeError('Valid value is a number from -100 to 100.'));
            } else {
                var parameterObject = {};
                parameterObject['arrayIndex'] = 2;
                parameterObject['indIndex'] = 2;
                parameterObject['value'] = value / 100;
                _this._setEdgeEffectValue(parameterObject).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    ItemEffect.prototype.getFileMask = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:edgeeffectmask', _this._id).then(function (val) {
                resolve(val);
            });
        });
    };
    ItemEffect.prototype.setFileMask = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:edgeeffectmask', value, _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemEffect.prototype.isFileMaskingGuideVisible = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Item.get('prop:edgeeffectmaskmode', _this._id).then(function (val) {
                if (val === '4' || val === '3') {
                    resolve(true);
                } else if (val === '2' || val === '1') {
                    resolve(false);
                } else {
                    reject(new Error('This method is not available if filemasking is not enabled.'));
                }
            });
        });
    };
    ItemEffect.prototype.showFileMaskingGuide = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Item.get('prop:edgeeffectmaskmode', _this._id).then(function (val) {
                if (val === '1' || val === '3') {
                    Item.set('prop:edgeeffectmaskmode', value ? '3' : '1', _this._id);
                } else if (val === '2' || val === '4') {
                    Item.set('prop:edgeeffectmaskmode', value ? '4' : '2', _this._id);
                } else {
                    reject(new Error('This method is not available if filemasking is not enabled.'));
                }
            });
        });
    };
    return ItemEffect;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
var ItemTransition = function () {
    function ItemTransition() {}
    ItemTransition.prototype.isVisible = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:visible', _this._id).then(function (val) {
                resolve(val === '1' ? true : false);
            });
        });
    };
    ItemTransition.prototype.setVisible = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:visible', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemTransition.prototype.getTransition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:transitionid', _this._id).then(function (val) {
                if (val === '') {
                    resolve(Transition.NONE);
                } else {
                    resolve(Transition[val.toUpperCase()]);
                }
            });
        });
    };
    ItemTransition.prototype.setTransition = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:transitionid', value.toString(), _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    ItemTransition.prototype.getTransitionTime = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:transitiontime', _this._id).then(function (val) {
                resolve(Number(val));
            });
        });
    };
    ItemTransition.prototype.setTransitionTime = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (value < 0 || value > 60000) {
                reject(RangeError('Transparency may only be in the range 0 to 60000.'));
            } else {
                Item.set('prop:transitiontime', String(value), _this._id).then(function () {
                    resolve(_this);
                });
            }
        });
    };
    return ItemTransition;
}();

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The GameItem Class provides methods specifically used for game items and
 * also methods that is shared between Item Classes. The
 * {@link #core/Scene Scene} class' getItems method would automatically return a
 * GameItem object if there's a game item on the specified scene.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IItemEffect Core/IItemEffect}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 *
 * XJS.Scene.getActiveScene().then(function(scene) {
 *   scene.getItems().then(function(items) {
 *     for (var i in items) {
 *       if (items[i] instanceof XJS.GameItem) {
 *         // Manipulate your game item here
 *         items[i].setOfflineImage(path); // just an example here
 *       }
 *     }
 *   });
 * });
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original `GameItem`
 *  instance.
 */
var GameItem = function (_super) {
    __extends(GameItem, _super);
    function GameItem() {
        _super.apply(this, arguments);
    }
    return GameItem;
}(Item$1);
applyMixins(GameItem, [Item$1, ItemLayout, ItemColor, ItemChroma, ItemTransition, ItemEffect, iSourceGame]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The CameraItem Class provides methods specifically used for camera items and
 * also methods that are shared between Item Classes. The
 * {@link #core/Scene Scene} class' getItems method would automatically return a
 * CameraItem object if there's a camera item on the specified scene.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IAudio Core/IAudio},
 * {@link #core/IItemEffect Core/IItemEffect}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 *
 * XJS.Scene.getActiveScene().then(function(scene) {
 *   scene.getItems().then(function(items) {
 *     for (var i in items) {
 *       if (items[i] instanceof XJS.CameraItem) {
 *         // Manipulate your camera item here
 *         items[i].getDeviceId().then(function(id) {
 *           // Do something with the id
 *         });
 *       }
 *     }
 *   });
 * });
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original `CameraItem`
 *  instance.
 */
var CameraItem = function (_super) {
    __extends(CameraItem, _super);
    function CameraItem() {
        _super.apply(this, arguments);
    }
    // special color options pinning
    /**
     * param: (value: boolean)
     *
     * Set this to true to share color settings across all instances of this
     * camera device on the stage.
     *
     * *Chainable.*
     */
    CameraItem.prototype.setColorOptionsPinned = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:cc_pin', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Checks whether color settings are shared across all instances of
     * this camera device on the stage.
     */
    CameraItem.prototype.getColorOptionsPinned = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:cc_pin', _this._id).then(function (val) {
                resolve(val === '1' ? true : false);
            });
        });
    };
    // special chroma options pinning
    /**
     * param: (value: boolean)
     *
     * Set this to true to share chroma keying settings across all instances of
     * this camera device on the stage.
     *
     * *Chainable.*
     */
    CameraItem.prototype.setKeyingOptionsPinned = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            Item.set('prop:key_pin', value ? '1' : '0', _this._id).then(function () {
                resolve(_this);
            });
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Checks whether chroma keying settings are shared across all instances of
     * this camera device on the stage.
     */
    CameraItem.prototype.getKeyingOptionsPinned = function () {
        var _this = this;
        return new Promise(function (resolve) {
            Item.get('prop:key_pin', _this._id).then(function (val) {
                resolve(val === '1' ? true : false);
            });
        });
    };
    return CameraItem;
}(Item$1);
applyMixins(CameraItem, [Item$1, ItemLayout, ItemColor, ItemChroma, ItemTransition, Audio, ItemEffect, SourceCamera]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The AudioItem class represents an audio device that has been added
 * to the stage.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IAudio Core/IAudio}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 *
 * XJS.Scene.getActiveScene().then(function(scene) {
 *   scene.getItems().then(function(items) {
 *     for (var i in items) {
 *       if (items[i] instanceof XJS.AudioItem) {
 *         // Manipulate your audio device item here
 *         items[i].setSilenceDetectionEnabled(true);
 *       }
 *     }
 *   });
 * });
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original `AudioItem`
 *  instance.
 */
var AudioItem = function (_super) {
    __extends(AudioItem, _super);
    function AudioItem() {
        _super.apply(this, arguments);
    }
    return AudioItem;
}(Item$1);
applyMixins(AudioItem, [SourceAudio, Audio]);

/**
 * The VideoPlaylistItem class represents the VideoPlaylist item that has been
 * added to the stage.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/ISourceConfigurable Core/ISourceConfigurable}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 *
 * XJS.Scene.getActiveScene().then(function(scene) {
 *   scene.getItems().then(function(items) {
 *     for (var i in items) {
 *       if (items[i] instanceof XJS.VideoPlaylistItem) {
 *         // Manipulate your VideoPlaylist Item here
 *       }
 *     }
 *   });
 * });
 * ```
 */
var VideoPlaylistItem = function (_super) {
    __extends(VideoPlaylistItem, _super);
    function VideoPlaylistItem() {
        _super.apply(this, arguments);
    }
    return VideoPlaylistItem;
}(Item$1);
applyMixins(VideoPlaylistItem, [ItemLayout, ItemColor, ItemChroma, ItemTransition, SourceConfigurable, SourceVideoPlaylist, SourcePlayback]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The HtmlItem class represents a web page item. This covers both item
 * plugins and non-plugin URLs.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IAudio Core/IAudio},
 * {@link #core/ISourceConfigurable Core/ISourceConfigurable}
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 *
 * XJS.Scene.getActiveScene().then(function(scene) {
 *   scene.getItems().then(function(items) {
 *     for (var i in items) {
 *       if (items[i] instanceof XJS.HtmlItem) {
 *         // Manipulate your HTML item here
 *         items[i].enableBrowserTransparency(true);
 *       }
 *     }
 *   });
 * });
 * ```
 *
 *  All methods marked as *Chainable* resolve with the original `HtmlItem`
 * instance. Also, any audio setting, i.e. volume, mute, stream only
 * may not be properly reflected in the item unless native browser audio support
 * is enabled. (Tools menu > General Settings > Advanced tab)
 */
var HtmlItem = function (_super) {
    __extends(HtmlItem, _super);
    function HtmlItem() {
        _super.apply(this, arguments);
    }
    return HtmlItem;
}(Item$1);
applyMixins(HtmlItem, [iSourceHtml, ItemLayout, ItemColor, ItemChroma, ItemTransition, SourceConfigurable, Audio, ItemEffect]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The FlashItem class represents a flash item, which is any SWF file
 * loaded to XSplit Broadcaster.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IAudio Core/IAudio},
 * {@link #core/IItemEffect Core/IItemEffect}
 *
 *  All methods marked as *Chainable* resolve with the original `FlashItem`
 * instance. Also, any audio setting, i.e. volume, mute, stream only
 * may not be properly reflected in the item unless native flash audio support
 * is enabled. (Tools menu > General Settings > Advanced tab)
 */
var FlashItem = function (_super) {
    __extends(FlashItem, _super);
    function FlashItem() {
        _super.apply(this, arguments);
    }
    return FlashItem;
}(Item$1);
applyMixins(FlashItem, [ItemLayout, ItemColor, ItemChroma, ItemTransition, Audio, ItemEffect, SourceFlash]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The ScreenItem class represents a screen capture item.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IItemEffect Core/IItemEffect}
 *
 *  All methods marked as *Chainable* resolve with the original `ScreenItem`
 *  instance.
 */
var ScreenItem = function (_super) {
    __extends(ScreenItem, _super);
    function ScreenItem() {
        _super.apply(this, arguments);
    }
    return ScreenItem;
}(Item$1);
applyMixins(ScreenItem, [ItemLayout, ItemColor, ItemChroma, ItemTransition, ItemEffect, iSourceScreen]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The ImageItem class represents an image item (includes GIF files).
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IItemEffect Core/IItemEffect}
 *
 *  All methods marked as *Chainable* resolve with the original `ImageItem`
 *  instance.
 */
var ImageItem = function (_super) {
    __extends(ImageItem, _super);
    function ImageItem() {
        _super.apply(this, arguments);
    }
    return ImageItem;
}(Item$1);
applyMixins(ImageItem, [Item$1, ItemLayout, ItemColor, ItemChroma, ItemTransition, ItemEffect]);

/// <reference path="../../../defs/es6-promise.d.ts" />
/**
 * The MediaItem class represents a playable media file.
 *
 * Inherits from: {@link #core/Item Core/Item}
 *
 * Implements: {@link #core/IItemChroma Core/IItemChroma},
 * {@link #core/IItemColor Core/IItemColor},
 * {@link #core/IItemLayout Core/IItemLayout},
 * {@link #core/IItemTransition Core/IItemTransition},
 * {@link #core/IAudio Core/IAudio},
 * {@link #core/ISourcePlayback Core/ISourcePlayback}
 *
 *  All methods marked as *Chainable* resolve with the original `MediaItem`
 *  instance.
 */
var MediaItem = function (_super) {
    __extends(MediaItem, _super);
    function MediaItem() {
        _super.apply(this, arguments);
    }
    return MediaItem;
}(Item$1);
applyMixins(MediaItem, [Item$1, ItemLayout, ItemColor, ItemChroma, ItemTransition, SourcePlayback, Audio, ItemEffect, SourceMedia]);

/// <reference path="../../defs/es6-promise.d.ts" />
var Scene = function () {
    function Scene(sceneId) {
        if (typeof sceneId === 'number') {
            this._id = sceneId - 1;
        } else if (typeof sceneId === 'string') {
            this._id = sceneId;
        }
    }
    
    Scene._initializeScenePool = function () {
        if (Scene._scenePool.length === 0) {
            for (var i = 0; i < Scene._maxScenes; i++) {
                Scene._scenePool[i] = new Scene(i + 1);
            }
        }
    };
    Scene._initializeScenePoolAsync = function () {
        return new Promise(function (resolve) {
            App.get('presetcount').then(function (cnt) {
                Scene._scenePool = [];
                var count = Number(cnt);
                if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                    count > 12 ? Scene._maxScenes = count : Scene._maxScenes = 12;
                    for (var i = 0; i < Scene._maxScenes; i++) {
                        Scene._scenePool[i] = new Scene(i + 1);
                    }
                    // Add special scene for preview editor (i12)
                    Scene._scenePool.push(new Scene('i12'));
                    resolve(Scene._maxScenes);
                } else {
                    if (count + 1 !== Scene._scenePool.length) {
                        for (var i = 0; i < count; i++) {
                            Scene._scenePool[i] = new Scene(i + 1);
                        }
                        // Add special scene for preview editor (i12)
                        Scene._scenePool.push(new Scene('i12'));
                        resolve(count);
                    }
                }
            });
        });
    };
    /**
     * return: Promise<number>
     *
     * Get the specific number of scenes loaded.
     * ```javascript
     * var sceneCount;
     * Scene.getSceneCount().then(function(count) {
     *   sceneCount = count;
     * });
     * ```
     */
    Scene.getSceneCount = function () {
        return new Promise(function (resolve) {
            Scene._initializeScenePoolAsync().then(function (count) {
                resolve(count);
            });
        });
    };
    /**
     * return: Promise<Scene>
     *
     * Get a specific scene object given the scene number.
     *
     * #### Usage
     *
     * ```javascript
     * var scene1;
     * Scene.getById(1).then(function(scene) {
     *   scene1 = scene;
     * });
     * ```
     */
    Scene.getById = function (sceneNum) {
        return new Promise(function (resolve, reject) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                if (sceneNum === 'i12') {
                    if (Scene._scenePool[cnt]._id === 'i12') {
                        resolve(Scene._scenePool[cnt]);
                    } else {
                        reject(Error('Invalid parameter'));
                    }
                } else {
                    try {
                        if (sceneNum > cnt || typeof Scene._scenePool[sceneNum - 1] === 'undefined') {
                            reject(Error('Invalid parameter'));
                        } else {
                            resolve(Scene._scenePool[sceneNum - 1]);
                        }
                    } catch (e) {
                        reject(Error('Parameter must be a number'));
                    }
                }
            });
        });
    };
    /**
     * return: Promise<Scene[]>
     *
     * Asynchronous function to get a list of scene objects with a specific name.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.getByName('Game').then(function(scenes) {
     *   // manipulate scenes
     * });
     * ```
     */
    Scene.getByName = function (sceneName) {
        return new Promise(function (resolve) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                var namePromise = Promise.all(Scene._scenePool.map(function (scene, index) {
                    return App.get('presetname:' + index).then(function (name) {
                        if (sceneName === name) {
                            return Scene._scenePool[index];
                        } else {
                            return null;
                        }
                    });
                }));
                namePromise.then(function (results) {
                    var returnArray = [];
                    for (var j = 0; j < results.length; ++j) {
                        if (results[j] !== null) {
                            returnArray.push(results[j]);
                        }
                    }
                    
                    resolve(returnArray);
                });
            });
        });
    };
    /**
     * return: Promise<Scene>
     *
     * Get the currently active scene. Does not work on source plugins.
     *
     * #### Usage
     *
     * ```javascript
     * var myScene;
     * Scene.getActiveScene().then(function(scene) {
     *   myScene = scene;
     * });
     * ```
     */
    Scene.getActiveScene = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('Not supported on source plugins'));
            } else {
                App.get('preset:0').then(function (id) {
                    return Scene.getById(Number(id) + 1);
                }).then(function (scene) {
                    resolve(scene);
                });
            }
        });
    };
    /**
     * param: scene<number|Scene>
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Change active scene. Does not work on source plugins.
     */
    Scene.setActiveScene = function (scene) {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('Not supported on source plugins'));
            } else {
                if (scene instanceof Scene) {
                    App.set('preset', String(scene._id)).then(function (res) {
                        resolve(res);
                    });
                } else if (typeof scene === 'number') {
                    if (scene < 1 || !Number['isInteger'](Number(scene))) {
                        reject(Error('Invalid parameters. Valid range is greater than 0'));
                    } else {
                        App.set('preset', String(scene - 1)).then(function (res) {
                            resolve(res);
                        });
                    }
                } else {
                    reject(Error('Invalid parameters'));
                }
            }
        });
    };
    /**
     * return: Promise<Item>
     *
     * Searches all scenes for an item by ID. ID search will return exactly 1 result (IDs are unique) or null.
     *
     * See also: {@link #core/Item Core/Item}
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchItemsById('{10F04AE-6215-3A88-7899-950B12186359}')
     * .then(function(item) {
     *   // result is either an Item or null
     * });
     * ```
     *
     */
    Scene.searchItemsById = function (id) {
        return new Promise(function (resolve, reject) {
            var isID = /^{[A-F0-9\-]*}$/i.test(id);
            if (!isID) {
                reject(Error('Not a valid ID format for items'));
            } else {
                Scene._initializeScenePoolAsync().then(function (cnt) {
                    var match = null;
                    var found = false;
                    var promiseArray = [];
                    var scenePromise = function scenePromise(scene, idx, arr) {
                        return new Promise(function (sceneResolve) {
                            if (match === null) {
                                scene.getItems().then(function (items) {
                                    found = items.some(function (item) {
                                        if (item['_id'] === id.toUpperCase()) {
                                            match = item;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (found || Number(idx) === arr.length - 1) {
                                        sceneResolve(match);
                                    } else {
                                        sceneResolve(null);
                                    }
                                }).catch(function (err) {
                                    sceneResolve(null);
                                });
                            }
                        });
                    };
                    Scene._scenePool.map(function (scene, idx, arr) {
                        promiseArray.push(scenePromise(scene, idx, arr));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        resolve(match);
                    });
                });
            }
        });
    };
    /**
     * return: Promise<Scene>
     *
     * Searches all scenes for one that contains the given item ID.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchScenesByItemId('{10F04AE-6215-3A88-7899-950B12186359}')
     * .then(function(scene) {
     *   // scene contains the item
     * });
     * ```
     *
     */
    Scene.searchScenesByItemId = function (id) {
        return new Promise(function (resolve, reject) {
            var isID = /^{[A-F0-9-]*}$/i.test(id);
            if (!isID) {
                reject(Error('Not a valid ID format for items'));
            } else {
                Scene._initializeScenePoolAsync().then(function (cnt) {
                    var match = null;
                    var found = false;
                    var promiseArray = [];
                    var scenePromise = function scenePromise(scene, idx, arr) {
                        return new Promise(function (sceneResolve) {
                            if (match === null) {
                                scene.getItems().then(function (items) {
                                    found = items.some(function (item) {
                                        if (item['_id'] === id.toUpperCase()) {
                                            match = scene;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (found || Number(idx) === arr.length - 1) {
                                        sceneResolve(match);
                                    } else {
                                        sceneResolve(null);
                                    }
                                }).catch(function (err) {
                                    sceneResolve(null);
                                });
                            }
                        });
                    };
                    Scene._scenePool.map(function (scene, idx, arr) {
                        promiseArray.push(scenePromise(scene, idx, arr));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        resolve(match);
                    });
                });
            }
        });
    };
    
    /**
     * return: Promise<Items[]>
     *
     * Searches all items for an item by name substring. This function
     * compares against custom name first (recommended) before falling back to the
     * name property of the item.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchItemsByName('camera')
     * .then(function(items) {
     *   // do something to each item in items array
     * });
     * ```
     *
     * Note: With the XBC 2.9 change, linked items would have the same
     * Name and Custom Name. Changes made on an item would reflect on all
     * linked items.
     *
     */
    Scene.searchItemsByName = function (param) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.filterItems(function (item, filterResolve) {
                if (item['_cname'] === param) {
                    filterResolve(true);
                } else if (item['_name'] === param) {
                    filterResolve(true);
                } else if (item['_value'] === param) {
                    filterResolve(true);
                } else {
                    filterResolve(false);
                }
            }).then(function (items) {
                resolve(items);
            });
        });
    };
    
    /**
     * param: (func: function)
     * ```
     * return: Promise<Item[]>
     * ```
     *
     * Searches all scenes for items that satisfies the provided testing function.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.filterItems(function(item, resolve) {
     *   // We'll only fetch Flash Items by resolving 'true' if the item is an
     *   // instance of FlashItem
     *   resolve((item instanceof FlashItem));
     * }).then(function(items) {
     *   // items would either be an empty array if no Flash items was found,
     *   // or an array of FlashItem objects
     * });
     * ```
     */
    Scene.filterItems = function (func) {
        return new Promise(function (resolve, reject) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                var matches = [];
                if (typeof func === 'function') {
                    return Promise.all(Scene._scenePool.map(function (scene) {
                        return new Promise(function (resolveScene) {
                            scene.getItems().then(function (items) {
                                if (items.length === 0) {
                                    resolveScene();
                                } else {
                                    return Promise.all(items.map(function (item) {
                                        return new Promise(function (resolveItem) {
                                            func(item, function (checker) {
                                                if (checker) {
                                                    matches.push(item);
                                                }
                                                resolveItem();
                                            });
                                        });
                                    })).then(function () {
                                        resolveScene();
                                    });
                                }
                            }).catch(function () {
                                resolveScene();
                            });
                        });
                    })).then(function () {
                        resolve(matches);
                    });
                } else {
                    reject(Error('Parameter is not a function'));
                }
            });
        });
    };
    /**
     * param: (func: function)
     * ```
     * return: Promise<Scene[]>
     * ```
     *
     * Searches all scenes for items that satisfies the provided testing
     * function, and then return the scene that contains the item.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.filterScenesByItems(function(item, resolve) {
     *   // We'll only fetch the scenes with flash items by resolving 'true' if
     *   // the item is an instance of FlashItem
     *   resolve((item instanceof FlashItem));
     * }).then(function(scenes) {
     *   // scenes would be an array of all scenes with FlashItem
     * });
     * ```
     */
    Scene.filterScenesByItems = function (func) {
        return new Promise(function (resolve, reject) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                var matches = [];
                if (typeof func === 'function') {
                    return Promise.all(Scene._scenePool.map(function (scene) {
                        return new Promise(function (resolveScene) {
                            scene.getItems().then(function (items) {
                                if (items.length === 0) {
                                    resolveScene();
                                } else {
                                    return Promise.all(items.map(function (item) {
                                        return new Promise(function (resolveItem) {
                                            func(item, function (checker) {
                                                if (checker) {
                                                    matches.push(scene);
                                                }
                                                resolveItem();
                                            });
                                        });
                                    })).then(function () {
                                        resolveScene();
                                    });
                                }
                            }).catch(function () {
                                return resolveScene();
                            });
                        });
                    })).then(function () {
                        resolve(matches);
                    });
                } else {
                    reject(Error('Parameter is not a function'));
                }
            });
        });
    };
    /**
     * return: Promise<Source>
     *
     * Searches all scenes for a source by ID. ID search will return exactly 1
     * result (IDs are unique) or null.
     *
     * See also: {@link #core/Source Core/Source}
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchSourcesById('{10F04AE-6215-3A88-7899-950B12186359}')
     * .then(function(sources) {
     *   // result would return one instance of the source per scene
     * });
     * ```
     *
     */
    Scene.searchSourcesById = function (srcId) {
        return new Promise(function (resolve, reject) {
            var isID = /^{[A-F0-9\-]*}$/i.test(srcId);
            if (!isID) {
                reject(Error('Not a valid ID format for sources'));
            } else {
                Scene._initializeScenePoolAsync().then(function (cnt) {
                    var match = null;
                    var found = false;
                    var promiseArray = [];
                    var scenePromise = function scenePromise(scene, idx, arr) {
                        return new Promise(function (sceneResolve) {
                            if (match === null) {
                                scene.getSources().then(function (sources) {
                                    found = sources.some(function (source) {
                                        if (source['_srcId'] === srcId.toUpperCase()) {
                                            match = source;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (found || Number(idx) === arr.length - 1) {
                                        sceneResolve(match);
                                    } else {
                                        sceneResolve(null);
                                    }
                                }).catch(function (err) {
                                    sceneResolve(null);
                                });
                            }
                        });
                    };
                    Scene._scenePool.map(function (scene, idx, arr) {
                        promiseArray.push(scenePromise(scene, idx, arr));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        var finalResults = [];
                        for (var i = 0; i < results.length; i++) {
                            if (results[i] !== null) {
                                finalResults.push(results[i]);
                            }
                        }
                        resolve(finalResults);
                    });
                });
            }
        });
    };
    
    /**
     * return: Promise<Scene>
     *
     * Searches all scenes for one that contains the given source ID.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchScenesBySourceId('{10F04AE-6215-3A88-7899-950B12186359}')
     * .then(function(scenes) {
     *   // scenes that contains the source with matching source id
     * });
     * ```
     *
     */
    Scene.searchScenesBySourceId = function (srcId) {
        return new Promise(function (resolve, reject) {
            var isID = /^{[A-F0-9-]*}$/i.test(srcId);
            if (!isID) {
                reject(Error('Not a valid ID format for sources'));
            } else {
                Scene._initializeScenePoolAsync().then(function (cnt) {
                    var match = null;
                    var found = false;
                    var promiseArray = [];
                    var scenePromise = function scenePromise(scene, idx, arr) {
                        return new Promise(function (sceneResolve) {
                            if (match === null) {
                                scene.getSources().then(function (sources) {
                                    found = sources.some(function (source) {
                                        if (source['_srcId'] === srcId.toUpperCase()) {
                                            match = scene;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (found || Number(idx) === arr.length - 1) {
                                        sceneResolve(match);
                                    } else {
                                        sceneResolve(null);
                                    }
                                }).catch(function (err) {
                                    sceneResolve(null);
                                });
                            }
                        });
                    };
                    Scene._scenePool.map(function (scene, idx, arr) {
                        promiseArray.push(scenePromise(scene, idx, arr));
                    });
                    Promise.all(promiseArray).then(function (results) {
                        var finalResults = [];
                        for (var i = 0; i < results.length; i++) {
                            if (results[i] !== null) {
                                finalResults.push(results[i]);
                            }
                        }
                        resolve(finalResults);
                    });
                });
            }
        });
    };
    
    /**
     * return: Promise<Source[]>
     *
     * Searches all scenes for a source by name substring. This function
     * compares against custom name first (recommended) before falling back to the
     * name property of the source.
     *
     *
     * #### Usage
     *
     * ```javascript
     * Scene.searchSourcesByName('camera').then(function(sources) {
     *   // do something to each source in sources array
     * });
     * ```
     *
     */
    Scene.searchSourcesByName = function (param) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.filterSources(function (source, filterResolve) {
                source.getCustomName().then(function (cname) {
                    if (cname.match(param)) {
                        filterResolve(true);
                    } else {
                        return source.getName();
                    }
                }).then(function (name) {
                    if (name !== undefined) {
                        if (name.match(param)) {
                            filterResolve(true);
                        } else {
                            return source.getValue();
                        }
                    }
                }).then(function (value) {
                    if (value !== undefined) {
                        if (value.toString().match(param)) {
                            filterResolve(true);
                        } else {
                            filterResolve(false);
                        }
                    }
                });
            }).then(function (sources) {
                resolve(sources);
            });
        });
    };
    
    /**
     * param: (func: function)
     * ```
     * return: Promise<Source[]>
     * ```
     *
     * Searches all scenes for sources that satisfies the provided testing function.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.filterSources(function(source, resolve) {
     *   // We'll only fetch Flash Sources by resolving 'true' if the source is
     *   // an instance of FlashSource
     *   resolve((source instanceof FlashSource));
     * }).then(function(sources) {
     *   // sources would either be an empty array if no Flash sources was
     *   // found, or an array of FlashSource objects
     * });
     * ```
     */
    Scene.filterSources = function (func) {
        return new Promise(function (resolve, reject) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                var matches = [];
                if (typeof func === 'function') {
                    return Promise.all(Scene._scenePool.map(function (scene) {
                        return new Promise(function (resolveScene) {
                            scene.getSources().then(function (sources) {
                                if (sources.length === 0) {
                                    resolveScene();
                                } else {
                                    return Promise.all(sources.map(function (source) {
                                        return new Promise(function (resolveSource) {
                                            func(source, function (checker) {
                                                if (checker) {
                                                    matches.push(source);
                                                }
                                                resolveSource();
                                            });
                                        });
                                    })).then(function () {
                                        resolveScene();
                                    });
                                }
                            }).catch(function () {
                                resolveScene();
                            });
                        });
                    })).then(function () {
                        resolve(matches);
                    });
                } else {
                    reject(Error('Parameter is not a function'));
                }
            });
        });
    };
    /**
     * param: (func: function)
     * ```
     * return: Promise<Scene[]>
     * ```
     *
     * Searches all scenes for sources that satisfies the provided testing
     * function, and then return the scene that contains the source.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.filterScenesBySources(function(source, resolve) {
     *   // We'll only fetch the scenes with flash sources by resolving 'true'
     *   // if the source is an instance of FlashSource
     *   resolve((source instanceof FlashSource));
     * }).then(function(scenes) {
     *   // scenes would be an array of all scenes with FlashSources
     * });
     * ```
     */
    Scene.filterScenesBySources = function (func) {
        return new Promise(function (resolve, reject) {
            Scene._initializeScenePoolAsync().then(function (cnt) {
                var matches = [];
                if (typeof func === 'function') {
                    return Promise.all(Scene._scenePool.map(function (scene) {
                        return new Promise(function (resolveScene) {
                            scene.getSources().then(function (sources) {
                                if (sources.length === 0) {
                                    resolveScene();
                                } else {
                                    return Promise.all(sources.map(function (source) {
                                        return new Promise(function (resolveSource) {
                                            func(source, function (checker) {
                                                if (checker) {
                                                    matches.push(scene);
                                                }
                                                resolveSource();
                                            });
                                        });
                                    })).then(function () {
                                        resolveScene();
                                    });
                                }
                            });
                        });
                    })).then(function () {
                        resolve(matches);
                    });
                } else {
                    reject(Error('Parameter is not a function'));
                }
            });
        });
    };
    /**
     * return: Promise<boolean>
         * Load scenes that are not yet initialized in XSplit Broadcaster.
     *
     * Note: This is only necessary for XSplit version 2.7 and below.
     * Also, for memory saving purposes, this is not called automatically.
     * If your extension wants to manipulate multiple scenes, it is imperative that you call this function.
     * This function is only available to extensions.
     *
     * #### Usage
     *
     * ```javascript
     * Scene.initializeScenes().then(function(val) {
     *   if (val === true) {
     *     // Now you know that all scenes are loaded :)
     *   }
     * })
     * ```
     */
    Scene.initializeScenes = function () {
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('function is not available for source'));
            } else {
                if (versionCompare(getVersion()).is.lessThan(minVersion)) {
                    App.get('presetcount').then(function (cnt) {
                        if (Number(cnt) < 12) {
                            // Insert an empty scene for scene #12
                            App.set('presetconfig:11', '<placement name="Scene 12" defpos="0" />').then(function (res) {
                                resolve(res);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } else {
                    resolve(true);
                }
            }
        });
    };
    /**
     * return: Promise<Source[]>
     *
     * Get all unique Sources from the current scene.
     * Total number of Sources returned may be less that total number of Items on
     * the scenes due to `Linked` items only having a single Source.
     * See also: {@link #core/Source Core/Source}
     *
     * #### Usage
     * ```javascript
     * scene.getSources().then(function(sources) {
     *   for(var i = 0 ; i < sources.length ; i++) {
     *      if(sources[i] instanceof xjs.HtmlSource) {
     *        // Manipulate HTML Source here
     *      }
     *   }
     * })
     * ```
     */
    Scene.prototype.getSources = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            App.getAsList('presetconfig:' + _this._id).then(function (jsonArr) {
                var promiseArray = [];
                var uniqueObj = {};
                var uniqueSrc = [];
                // type checking to return correct Source subtype
                var typePromise = function typePromise(index) {
                    return new Promise(function (typeResolve) {
                        var source = jsonArr[index];
                        var type = Number(source['type']);
                        if (type === exports.ItemTypes.GAMESOURCE) {
                            typeResolve(new GameSource(source));
                        } else if ((type === exports.ItemTypes.HTML || type === exports.ItemTypes.FILE) && source['name'].indexOf('Video Playlist') === 0 && source['FilePlaylist'] !== '') {
                            typeResolve(new VideoPlaylistSource(source));
                        } else if (type === exports.ItemTypes.HTML) {
                            typeResolve(new HtmlSource(source));
                        } else if (type === exports.ItemTypes.SCREEN) {
                            typeResolve(new ScreenSource(source));
                        } else if (type === exports.ItemTypes.BITMAP || type === exports.ItemTypes.FILE && /\.gif$/.test(source['item'])) {
                            typeResolve(new ImageSource(source));
                        } else if (type === exports.ItemTypes.FILE && /\.(gif|xbs)$/.test(source['item']) === false && /^(rtsp|rtmp):\/\//.test(source['item']) === false) {
                            typeResolve(new MediaSource(source));
                        } else if (Number(source['type']) === exports.ItemTypes.LIVE && source['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') === -1) {
                            typeResolve(new CameraSource(source));
                        } else if (Number(source['type']) === exports.ItemTypes.LIVE && source['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') !== -1) {
                            typeResolve(new AudioSource(source));
                        } else if (Number(source['type']) === exports.ItemTypes.FLASHFILE) {
                            typeResolve(new FlashSource(source));
                        } else {
                            typeResolve(new Source(source));
                        }
                    });
                };
                if (Array.isArray(jsonArr)) {
                    for (var i = 0; i < jsonArr.length; i++) {
                        jsonArr[i]['sceneId'] = _this._id;
                        promiseArray.push(typePromise(i));
                    }
                }
                Promise.all(promiseArray).then(function (results) {
                    for (var h = 0; h < results.length; h++) {
                        for (var key in results[h]) {
                            if (key === '_srcId') {
                                uniqueObj[results[h][key]] = results[h];
                            }
                        }
                    }
                    for (var j in uniqueObj) {
                        if (uniqueObj.hasOwnProperty(j)) {
                            uniqueSrc.push(uniqueObj[j]);
                        }
                    }
                    resolve(uniqueSrc);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * return: number
     *
     * Get the 1-indexed scene number of this scene object.
     *
     *
     * #### Usage
     *
     * ```javascript
     * myScene.getSceneNumber().then(function(num) {
     *  console.log('My scene is scene number ' + num);
     * });
     * ```
     */
    Scene.prototype.getSceneNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof _this._id === 'number') {
                resolve(Number(_this._id) + 1);
            } else {
                resolve(_this._id);
            }
        });
    };
    /**
     * return: number
     *
     * Get the name of this scene object.
     *
     *
     * #### Usage
     *
     * ```javascript
     * myScene.getName().then(function(name) {
     *  console.log('My scene is named ' + name);
     * });
     * ```
     */
    Scene.prototype.getName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            App.get('presetname:' + _this._id).then(function (val) {
                resolve(val);
            });
        });
    };
    /**
     * param: (value: string)
     * Set the name of this scene object. Cannot be set by source plugins.
     *
     * #### Usage
     *
     * ```javascript
     * myScene.setName('Gameplay');
     * ```
     */
    Scene.prototype.setName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('Scene names are readonly for source plugins.'));
            } else {
                App.set('presetname:' + _this._id, name).then(function (value) {
                    resolve(value);
                });
            }
        });
    };
    /**
     * return: Promise<Item[]>
     *
     * Gets all the items in a specific scene.
     * See also: {@link #core/Item Core/Item}
     *
     * #### Usage
     *
     * ```javascript
     * myScene.getItems().then(function(items) {
     *  // do something to each item in items array
     * });
     * ```
     */
    Scene.prototype.getItems = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            App.getAsList('presetconfig:' + _this._id).then(function (jsonArr) {
                var promiseArray = [];
                // type checking to return correct Source subtype
                var typePromise = function typePromise(index) {
                    return new Promise(function (typeResolve) {
                        var item = jsonArr[index];
                        var type = Number(item['type']);
                        if (type === exports.ItemTypes.GAMESOURCE) {
                            typeResolve(new GameItem(item));
                        } else if ((type === exports.ItemTypes.HTML || type === exports.ItemTypes.FILE) && item['name'].indexOf('Video Playlist') === 0 && item['FilePlaylist'] !== '') {
                            typeResolve(new VideoPlaylistItem(item));
                        } else if (type === exports.ItemTypes.HTML) {
                            typeResolve(new HtmlItem(item));
                        } else if (type === exports.ItemTypes.SCREEN) {
                            typeResolve(new ScreenItem(item));
                        } else if (type === exports.ItemTypes.BITMAP || type === exports.ItemTypes.FILE && /\.gif$/.test(item['item'])) {
                            typeResolve(new ImageItem(item));
                        } else if (type === exports.ItemTypes.FILE && /\.(gif|xbs)$/.test(item['item']) === false && /^(rtsp|rtmp):\/\//.test(item['item']) === false) {
                            typeResolve(new MediaItem(item));
                        } else if (Number(item['type']) === exports.ItemTypes.LIVE && item['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') === -1) {
                            typeResolve(new CameraItem(item));
                        } else if (Number(item['type']) === exports.ItemTypes.LIVE && item['item'].indexOf('{33D9A762-90C8-11D0-BD43-00A0C911CE86}') !== -1) {
                            typeResolve(new AudioItem(item));
                        } else if (Number(item['type']) === exports.ItemTypes.FLASHFILE) {
                            typeResolve(new FlashItem(item));
                        } else {
                            typeResolve(new Item$1(item));
                        }
                    });
                };
                if (Array.isArray(jsonArr)) {
                    for (var i = 0; i < jsonArr.length; i++) {
                        jsonArr[i]['sceneId'] = _this._id;
                        promiseArray.push(typePromise(i));
                    }
                }
                Promise.all(promiseArray).then(function (results) {
                    resolve(results);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * return: Promise<boolean>
     *
     * Checks if a scene is empty.
     *
     * #### Usage
     *
     * ```javascript
     * myScene.isEmpty().then(function(empty) {
     *   if (empty === true) {
     *     console.log('My scene is empty.');
     *   }
     * });
     * ```
     */
    Scene.prototype.isEmpty = function () {
        var _this = this;
        return new Promise(function (resolve) {
            App.get('presetisempty:' + _this._id).then(function (val) {
                resolve(val === '1');
            });
        });
    };
    /**
    * param: Array<Item> | Array<string> (item IDs)
    * ```
    * return: Promise<Scene>
    * ```
    *
    * Sets the item order of the current scene. The first item in the array
    * will be on top (will cover items below it).
    */
    Scene.prototype.setItemOrder = function (items) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(Error('not available for source plugins'));
            } else {
                items.reverse();
                var ids_1 = [];
                Scene.getActiveScene().then(function (scene) {
                    if (items.every(function (el) {
                        return el instanceof Source || el instanceof Item$1;
                    })) {
                        return new Promise(function (resolve) {
                            var promises = [];
                            for (var i in items) {
                                promises.push(function (_i) {
                                    return new Promise(function (resolve) {
                                        items[_i].getId().then(function (id) {
                                            ids_1[_i] = id;
                                            resolve(_this);
                                        });
                                    });
                                }(i));
                            }
                            Promise.all(promises).then(function () {
                                return scene.getSceneNumber();
                            }).then(function (id) {
                                resolve(id);
                            });
                        });
                    } else {
                        ids_1 = items;
                        return scene.getSceneNumber();
                    }
                }).then(function (id) {
                    if (Number(id) - 1 === _this._id && (Environment.isSourceProps() || Environment.isExtension)) {
                        exec('SourcesListOrderSave', String(exports.ViewTypes.MAIN), ids_1.join(','));
                        resolve(_this);
                    } else {
                        var sceneName_1;
                        _this.getName().then(function (name) {
                            sceneName_1 = name;
                            return App.getAsList('presetconfig:' + _this._id);
                        }).then(function (jsonArr) {
                            var newOrder = new JSON$1();
                            newOrder.children = [];
                            newOrder['tag'] = 'placement';
                            newOrder['name'] = sceneName_1;
                            if (Array.isArray(jsonArr)) {
                                var attrs = ['name', 'cname', 'item'];
                                for (var i = 0; i < jsonArr.length; i++) {
                                    for (var a = 0; a < attrs.length; a++) {
                                        //This formatting is for json
                                        jsonArr[i][attrs[a]] = jsonArr[i][attrs[a]].replace(/\\/g, '\\\\');
                                        jsonArr[i][attrs[a]] = jsonArr[i][attrs[a]].replace(/"/g, '&quot;');
                                    }
                                    newOrder.children[ids_1.indexOf(jsonArr[i]['id'])] = jsonArr[i];
                                }
                                App.set('presetconfig:' + _this._id,
                                //Revert back the formatting from json when transforming to xml
                                XML.parseJSON(newOrder).toString().replace(/\\\\/g, '\\')).then(function () {
                                    resolve(_this);
                                });
                            } else {
                                reject(Error('Scene does not have any source'));
                            }
                        });
                    }
                });
            }
        });
    };
    Scene._maxScenes = 12;
    Scene._scenePool = [];
    return Scene;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 *  The Dll class allows access to functions in DLL files that are placed within
 *  the Scriptdlls folder.
 *
 *  The class also emits two events for developers to know when the user
 *  changes the DLL permission setting for the plugin through the permissions
 *  window.
 *
 *  The following events are emitted.
 *    - `access-granted`
 *    - `access-revoked`
 *
 *
 *  Use the `on(event: string, handler: Function)` function to listen to events.
 *
 *  For more detailed information about using DLLs in XSplit, please see the
 *  {@link tutorials.html#/dll DLL tutorial}. That link also includes a list of
 *  methods exposed by the DLLs that ship with XSplit.
 *
 */
var Dll = function (_super) {
    __extends(Dll, _super);
    function Dll() {
        _super.apply(this, arguments);
    }
    /**
     *  param: (path: string)
     *
     *  Loads one or more DLLs for the plugin to use. Currently, only Xjs.dll is
     *  auto-loaded and does not require loading. Loading DLLs will trigger a
     *  notification for the user, requesting access to be granted to DLL files.
     *  Your plugin should only call this once, at the beginning of execution.
     *
     *  Paths are relative to the main XBC application folder, so sample usage is:
     *
     *  ```javascript
     *  Dll.load(['Scriptdlls\\SplitMediaLabs\\XjsEx.dll']);
     *  ```
     */
    Dll.load = function (path) {
        return new Promise(function (resolve) {
            exec('LoadDll', path.join(',')).then(function (result) {
                resolve(result);
            });
        });
    };
    /**
     *  param: (event: string, handler: Function)
     *
     *  Allows listening to events that this class emits. Currently there are two:
     *  `access-granted` and `access-revoked`.
     */
    Dll.on = function (event, handler) {
        Dll._emitter.on(event, handler);
    };
    /**
     *  param: (event: string, ...params: any[])
     *
     *  Allows this class to emit an event. Generally only useful for testing.
     */
    Dll.emit = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(event);
        Dll._emitter.emit.apply(Dll._emitter, params);
    };
    /**
     *  param: (funcName: string, ...params: string[])
     *
     *  return: Promise<string> (see {@link tutorials.html#/dll DLL documentation})
     *
     *  Calls a function from a loaded "safe" DLL. The only safe DLL we are
     *  currently exposing is `Xjs.dll`.
     */
    Dll.call = function (func) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var funcCall = 'CallDll';
            params.unshift(func);
            params.unshift(funcCall);
            exec.apply(_this, params).then(function (retValue) {
                if (retValue !== undefined) {
                    resolve(retValue);
                } else {
                    reject('DLL call not accessible.');
                }
            });
        });
    };
    /**
     *  param: (funcName: string, ...params: string[])
     *
     *  return: Promise<string> (see {@link tutorials.html#/dll DLL documentation})
     *
     *  Calls a function from a loaded "unsafe" DLL. The first DLL containing
     *  the function name will be called, so you need to ensure there are no
     *  function name collisions among DLLs for functions you require.
     *
     *  Some DLLs have callbacks. Assign a handler function to that callback in
     *  the global namespace (`window.callbackName = ...`), and the DLL will call
     *  that function accordingly.
     *
     *  See the documentation of your specific DLL for more details.
     */
    Dll.callEx = function (func) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var funcCall = 'CallDllEx';
            params.unshift(func);
            params.unshift(funcCall);
            exec.apply(_this, params).then(function (retValue) {
                if (retValue !== undefined) {
                    resolve(retValue);
                } else {
                    reject('DLL call not accessible.');
                }
            });
        });
    };
    /**
     *  return: Promise<boolean>
     *
     *  Determines if user has granted DLL access for this plugin. This also
     *  resolves to true if DLL security is disabled altogether.
     */
    Dll.isAccessGranted = function () {
        return new Promise(function (resolve) {
            exec('CheckDllGrant').then(function (result) {
                resolve(result === '1');
            });
        });
    };
    Dll._emitter = new Dll();
    return Dll;
}(EventEmitter);
var oldUpdateLocalProperty = window.UpdateLocalProperty;
window.UpdateLocalProperty = function (prop, value) {
    if (prop === 'prop:dlldogrant') {
        var granted = value === '1';
        if (granted) {
            Dll.emit('access-granted');
        } else {
            Dll.emit('access-revoked');
        }
    }
    if (typeof oldUpdateLocalProperty === 'function') {
        oldUpdateLocalProperty(prop, value);
    }
};
var oldSetdlldogrant = window.Setdlldogrant;
window.Setdlldogrant = function (value) {
    var granted = value === '1';
    if (granted) {
        Dll.emit('access-granted');
    } else {
        Dll.emit('access-revoked');
    }
    if (typeof oldSetdlldogrant === 'function') {
        oldSetdlldogrant(value);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 *  Class for adding a web source to the stage.
 *  URLs will use http by default unless https
 *  is specified. This class supports adding
 *  locally hosted HTML files as well.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var Url = XJS.Url;
 *
 * var urlPromise = new Url('https://www.xsplit.com').addToScene();
 * ```
 */
var Url = function () {
    /**
     *  param: (url: string)
     *
     *  Creates a URL object. If unspecified, protocol is http.
     */
    function Url(url) {
        this._url = url;
    }
    Url.prototype._getUrl = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (/^https?:\/\//i.test(_this._url)) {
                resolve(_this._url);
            } else if (/[a-z]+:\/\//i.test(_this._url)) {
                reject(new Error('You may only add HTTP or HTTPS URLs to the stage.'));
            } else {
                resolve('http://' + _this._url);
            }
        });
    };
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Adds this URL to the current scene as an HTML source by default.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     *
     *  Will raise an error if URL is not http or https.
     */
    Url.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                return _this._getUrl();
            }).then(function (url) {
                return App.callFunc(scenePrefix + 'addurl', url);
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return Url;
}();

/**
 *  This class serves to allow developers to add new screen regions or window
 *  regions to the stage in XSplit Broadcaster.
 */
var Screen = function () {
    function Screen() {}
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Initializes the screen region selector crosshair
     * so user may select a desktop region or a window to add to the stage in the current scene.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     */
    Screen.prototype.addToScene = function (value) {
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                exec('AppCallFunc', scenePrefix + 'addscreen');
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return Screen;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/**
 *  Class for adding files (such as images and media)
 *  from your file system to the stage.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var File = XJS.File;
 *
 * var filePromise = new File('C:\\Users\\Public\\Music\\song.mp3').addToScene();
 * ```
 */
var File = function () {
    /**
     *  param: (file: string)
     *
     *  Creates a File object pertaining to a file's full path.
     */
    function File(file) {
        this._path = file;
    }
    /**
     * param: (value?: number | Scene)
     * ```
     * return: Promise<boolean>
     * ```
     *
     * Adds this file to the current scene by default.
     * Accepts an optional parameter value, which, when supplied,
     * points to the scene where item will be added instead.
     */
    File.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var scenePrefix = '';
            var scenePromise;
            if (typeof value === 'number' || value instanceof Scene) {
                scenePromise = new Promise(function (innerResolve, innerReject) {
                    Scene.getSceneCount().then(function (sceneCount) {
                        if (typeof value === 'number') {
                            var int = Math.floor(value);
                            if (int > sceneCount || int === 0) {
                                innerReject(new Error('Scene not existing.'));
                            } else {
                                scenePrefix = 's:' + (int - 1) + '|';
                                innerResolve();
                            }
                        } else {
                            value.getSceneNumber().then(function (int) {
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            });
                        }
                    });
                });
            } else if (typeof value === 'undefined') {
                scenePromise = Promise.resolve();
            } else {
                scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
            }
            scenePromise.then(function () {
                return App.callFunc(scenePrefix + 'addfile', _this._path);
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return File;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
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
var VideoPlaylist = function () {
    /**
     *  param: (files: string[])
     *
     *  Creates a VideoPlaylist object for several video files.
     */
    function VideoPlaylist(items) {
        this._id = 0;
        this._fileplaylist = '';
        this._playlist = items;
    }
    /**
     * return: XML
     *
     * Creates an XML object with the playlist properties. This method is used
     * internally for the `addToScene` method.
     */
    VideoPlaylist.prototype.toXML = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filePromises = _this._playlist.map(function (filename) {
                return new Promise(function (ioResolve) {
                    IO.getVideoDuration(filename).then(function (duration) {
                        ioResolve(duration);
                    }).catch(function (err) {
                        ioResolve(err);
                    });
                });
            });
            Promise.all(filePromises).then(function (duration) {
                var fileItems = new JSON$1();
                var isError = false;
                if (_this._playlist.length) {
                    for (var i = 0; i < _this._playlist.length; i++) {
                        if (babelHelpers.typeof(duration[i]) === 'object') {
                            isError = true;
                            break;
                        }
                        _this._fileplaylist += _this._playlist[i] + '*' + i + '*1*' + duration[i] + '*100*0*0*0*0*0|';
                    }
                    var _inner_this_1 = _this;
                    if (!isError) {
                        App.get('preset:0').then(function (main) {
                            return App.get('presetconfig:' + main);
                        }).then(function (presetConfig) {
                            var placementJSON = JSON$1.parse(presetConfig);
                            var defpos = placementJSON['defpos'];
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
                            } else if (defpos === '2') {
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
                            fileItems['item'] = _inner_this_1._playlist[0] + '*0';
                            fileItems['FilePlaylist'] = _inner_this_1._fileplaylist;
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
    };
    /**
     * param: (value?: number | Scene)
     * ```
     *  return: Promise<boolean>
     * ```
     *
     * Adds the prepared video playlist to the current scene by default.
     * Accepts an optional parameter value, which when supplied,
     * points to the scene where item will be added instead.
     * This function is not available to sources.
     */
    VideoPlaylist.prototype.addToScene = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Environment.isSourcePlugin()) {
                reject(new Error('This function is not available to sources.'));
            } else {
                var scenePrefix_1 = '';
                var scenePromise = void 0;
                if (typeof value === 'number' || value instanceof Scene) {
                    scenePromise = new Promise(function (innerResolve, innerReject) {
                        Scene.getSceneCount().then(function (sceneCount) {
                            if (typeof value === 'number') {
                                var int = Math.floor(value);
                                if (int > sceneCount || int === 0) {
                                    innerReject(new Error('Scene not existing.'));
                                } else {
                                    scenePrefix_1 = 's:' + (int - 1) + '|';
                                    innerResolve();
                                }
                            } else {
                                value.getSceneNumber().then(function (int) {
                                    if (int > sceneCount || int === 0) {
                                        innerReject(new Error('Scene not existing.'));
                                    } else {
                                        scenePrefix_1 = 's:' + (int - 1) + '|';
                                        innerResolve();
                                    }
                                });
                            }
                        });
                    });
                } else if (typeof value === 'undefined') {
                    scenePromise = Promise.resolve();
                } else {
                    scenePromise = Promise.reject(new Error('Optional parameter \'scene\' only accepts integers or an XJS.Scene object'));
                }
                scenePromise.then(function () {
                    return _this.toXML();
                }).then(function (fileItem) {
                    return App.callFunc(scenePrefix_1 + 'additem', ' ' + fileItem);
                }).then(function () {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            }
        });
    };
    return VideoPlaylist;
}();

/// <reference path="../../defs/es6-promise.d.ts" />
/** This utility class is used internally by the framework for certain important
 *  processes. This class also exposes certain important events that the source
 *  plugin may emit.
 *
 * Inherits from: {@link #util/EventEmitter Util/EventEmitter}
 *
 *  Currently, the following events are available:
 *    - `save-config`: signals the source that it should save the configuration object. Handler is a function f(config: JSON)
 *    - `apply-config`: signals the source that it should apply the changes that this configuration object describes. Handler is a function f(config: JSON)
 *    - `set-background-color`: only used when the native Color tab is reused and background color is set. Handler is a function f(colorHexNoNumberSign: string)
 *    - `scene-load`: signals the source that the active scene is the scene where it is loaded. Only works on sources loaded in memory
 *    - `scene-delete` : notifies when a user deletes a scene. Handler is a function f(index: number). Works only on version 2.8.1606.1601 or higher.
 *
 *  Use the `on(event: string, handler: Function)` function to listen to an event.
 */
var SourcePluginWindow = function (_super) {
    __extends(SourcePluginWindow, _super);
    /**
     *  ** For Deprecation
     *
     *  Use getInstance()
     */
    function SourcePluginWindow() {
        _super.call(this);
        if (!Environment.isSourcePlugin()) {
            throw new Error('SourcePluginWindow class is only available for source plugins');
        }
        this.on('message-source', function (message) {
            if (message.request !== undefined) {
                if (message.request === 'saveConfig') {
                    this.emit('save-config', this._hideGlobalConfig(message.data));
                } else if (message.request === 'applyConfig') {
                    this.emit('apply-config', this._hideGlobalConfig(message.data));
                }
            }
        });
        SourcePluginWindow._instance = this;
        SourcePluginWindow._subscriptions = [];
    }
    /**
     * ** For deprecation, the need for getting the instance of a SourcePluginWindow looks redundant,
     * `** since a SourcePluginWindow should technically have a single instance`
     *
     * Gets the instance of the window utility. Use this instead of the constructor.
     */
    SourcePluginWindow.getInstance = function () {
        if (SourcePluginWindow._instance === undefined) {
            SourcePluginWindow._instance = new SourcePluginWindow();
        }
        return SourcePluginWindow._instance;
    };
    /**
     *  param: (event: string, ...params: any[])
     *
     *  Allows this class to emit an event.
     */
    SourcePluginWindow.emit = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(event);
        try {
            SourcePluginWindow.getInstance().emit.apply(SourcePluginWindow._instance, params);
        } catch (event) {
            SourcePluginWindow._instance.emit.apply(SourcePluginWindow._instance, params);
        }
    };
    /**
     *  param: (event: string, handler: Function)
     *
     *  Allows listening to events that this class emits.
     *
     */
    SourcePluginWindow.on = function (event, handler) {
        SourcePluginWindow.getInstance().on(event, handler);
        var isDeleteSceneEventFixed = versionCompare(getVersion()).is.greaterThanOrEqualTo(deleteSceneEventFixVersion);
        if (event === 'scene-delete' && isDeleteSceneEventFixed) {
            if (SourcePluginWindow._subscriptions.indexOf('SceneDeleted') < 0) {
                EventManager.subscribe("SceneDeleted", function (settingsObj) {
                    if (Environment.isSourcePlugin()) {
                        SourcePluginWindow.emit(event, settingsObj['index'] === '' ? null : Number(settingsObj['index']) + 1);
                    }
                });
            }
        } else if (['set-background-color', 'scene-load', 'apply-config', 'save-config'].indexOf(event) >= 0) {} else {
            console.warn('Warning! The event "' + event + '" is not yet supported on this version.');
        }
    };
    SourcePluginWindow.off = function (event, handler) {
        SourcePluginWindow.getInstance().off(event, handler);
    };
    // We modify the configuration sent from the source properties window
    // so that we do not see 'persistent' configuration such as config-url.
    // When saving, this is restored back to the config object through
    // Item#saveConfig().
    //
    // Note that we could have chosen to hide this from Item#requestSaveConfig()
    // or Item#applyConfig() calls, but unfortunately, the context of the source
    // properties window cannot always correctly determine the global config nodes
    // when dealing with sources other than the current source (right-clicked.)
    SourcePluginWindow.prototype._hideGlobalConfig = function (data) {
        var persist = Global.getPersistentConfig();
        for (var key in persist) {
            delete data[key];
        }
        return data;
    };
    SourcePluginWindow._subscriptions = [];
    return SourcePluginWindow;
}(EventEmitter);
// for source plugins
window.MessageSource = function (message) {
    SourcePluginWindow.emit('message-source', JSON.parse(message));
};
window.SetConfiguration = function (configObj) {
    try {
        var data = JSON.parse(configObj);
        SourcePluginWindow.emit('apply-config', data);
        SourcePluginWindow.emit('save-config', data);
    } catch (e) {
        // syntax error probably happened, exit gracefully
        return;
    }
};
window.setBackGroundColor = function (color) {
    SourcePluginWindow.emit('set-background-color', color);
};
var prevOnSceneLoad = window.OnSceneLoad;
window.OnSceneLoad = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (Environment.isSourcePlugin()) {
        SourcePluginWindow.emit('scene-load');
    }
    if (prevOnSceneLoad !== undefined) {
        prevOnSceneLoad.apply(void 0, args);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
var _RESIZE = '2';
/** This utility class represents the extension window. It allows manipulation
 *  of the window (e.g., resizing), and also serves as an event emitter
 *  for all events that the window should be able to handle.
 *
 *  Currently, the following events are available:
 *    - `scene-load`: notifies in the event of a scene change. Handler is a function f(sceneNumber: number)
 *    - `sources-list-highlight`: notifies when a user hovers over a source in the stage, returning its source id, or when the mouse moves out of a source bounding box, returning null. Source id is also returned when hovering over the bottom panel. Handler is a function f(id: string)
 *    - `sources-list-select`: notifies when a user clicks a source in the stage. Source id is also returned when source is selected from the bottom panel. Handler is a function f(id: string)
 *    - `sources-list-update`: notifies when there are changes on list sources whether on stage or bottom panel. Handler is a function(ids: string) where ids are comma separated source ids.
 *    - `scene-delete` : notifies when a user deletes a scene. Handler is a function f(index: number). Works only on version 2.8.1606.1601 or higher.
 *    - `scene-add` : notifies when a user adds a scene. Handler is a function f(index: number). Works only on version 2.8.1606.1701 or higher.
 *
 *  Use the `on(event: string, handler: Function)` function to listen to an event.
 *
 */
var ExtensionWindow = function (_super) {
    __extends(ExtensionWindow, _super);
    /**
     *  ** For Deprecation
     *
     *  Use getInstance()
     */
    function ExtensionWindow() {
        _super.call(this);
        if (!Environment.isExtension()) {
            throw new Error('ExtensionWindow class is only available for extensions');
        }
        ExtensionWindow._instance = this;
        ExtensionWindow._subscriptions = [];
    }
    /**
     * ** For deprecation, the need for getting the instance of an ExtensionWindow looks redundant,
     * `** since an ExtensionWinow should technically have a single instance`
     *
     * Gets the instance of the window utility. Use this instead of the constructor.
     */
    ExtensionWindow.getInstance = function () {
        if (ExtensionWindow._instance === undefined) {
            ExtensionWindow._instance = new ExtensionWindow();
        }
        return ExtensionWindow._instance;
    };
    /**
     *  param: (event: string, ...params: any[])
     *
     *  Allows this class to emit an event.
     */
    ExtensionWindow.emit = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(event);
        try {
            ExtensionWindow.getInstance().emit.apply(ExtensionWindow._instance, params);
        } catch (event) {
            ExtensionWindow._instance.emit.apply(ExtensionWindow._instance, params);
        }
    };
    /**
     *  param: (event: string, handler: Function)
     *
     *  Allows listening to events that this class emits.
     *
     */
    ExtensionWindow.on = function (event, handler) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ExtensionWindow.getInstance().on(event, handler);
            var isDeleteSceneEventFixed = versionCompare(getVersion()).is.greaterThanOrEqualTo(deleteSceneEventFixVersion);
            var isAddSceneEventFixed = versionCompare(getVersion()).is.greaterThanOrEqualTo(addSceneEventFixVersion);
            if (event === 'scene-delete' && isDeleteSceneEventFixed) {
                if (ExtensionWindow._subscriptions.indexOf('SceneDeleted') < 0) {
                    ExtensionWindow._subscriptions.push('SceneDeleted');
                    EventManager.subscribe('SceneDeleted', function (settingsObj) {
                        if (Environment.isExtension()) {
                            ExtensionWindow.emit(event, settingsObj['index'] === '' ? null : Number(settingsObj['index']) + 1);
                        }
                        resolve(this);
                    });
                } else {
                    resolve(_this);
                }
            } else if (event === 'scene-add' && isAddSceneEventFixed) {
                if (ExtensionWindow._subscriptions.indexOf('OnSceneAddByUser') < 0) {
                    ExtensionWindow._subscriptions.push('OnSceneAddByUser');
                    EventManager.subscribe('OnSceneAddByUser', function (settingsObj) {
                        Scene.getSceneCount().then(function (count) {
                            if (Environment.isExtension()) {
                                ExtensionWindow.emit(event, count);
                                resolve(this);
                            } else {
                                reject(Error('ExtensionWindow class is only available for extensions.'));
                            }
                        });
                    });
                } else {
                    resolve(_this);
                }
            } else if (['sources-list-highlight', 'sources-list-select', 'sources-list-update', 'scene-load'].indexOf(event) >= 0) {
                //Just subscribe to the event. Emitter is already handled.
                if (['sources-list-highlight', 'sources-list-select', 'sources-list-update'].indexOf(event) >= 0) {
                    try {
                        exec('SourcesListSubscribeEvents', exports.ViewTypes.MAIN.toString()).then(function (res) {
                            resolve(_this);
                        });
                    } catch (ex) {}
                } else {
                    resolve(_this);
                }
            } else {
                reject(Error('Warning! The event "' + event + '" is not yet supported.'));
            }
        });
    };
    ExtensionWindow.off = function (event, handler) {
        ExtensionWindow.getInstance().off(event, handler);
    };
    /** param: (width: number, height: number)
     *
     *  Resizes this extension's window.
     */
    ExtensionWindow.resize = function (width, height) {
        App.postMessage(_RESIZE, String(width), String(height));
    };
    /**
     * `** For deprecation, please use the static method instead`
     */
    ExtensionWindow.prototype.resize = function (width, height) {
        App.postMessage(_RESIZE, String(width), String(height));
    };
    /**
     * param: (value: string)
     *
     * Renames the extension window.
     */
    ExtensionWindow.setTitle = function (value) {
        return new Promise(function (resolve) {
            var ext = Extension.getInstance();
            ext.getId().then(function (id) {
                exec("CallHost", "setExtensionWindowTitle:" + id, value).then(function (res) {
                    resolve(res);
                });
            });
        });
    };
    
    /**
     * `** For deprecation, please use the static method instead`
     */
    ExtensionWindow.prototype.setTitle = function (value) {
        return new Promise(function (resolve) {
            var ext = Extension.getInstance();
            ext.getId().then(function (id) {
                exec("CallHost", "setExtensionWindowTitle:" + id, value).then(function (res) {
                    resolve(res);
                });
            });
        });
    };
    
    /**
     * param (flag: number)
     *
     * Modifies this extension's window border.
     *
     * '4' is th e base command on setting border flags.
     *
     * Flags can be:
     *     (bit 0 - enable border)
     *     (bit 1 - enable caption)
     *     (bit 2 - enable sizing)
     *     (bit 3 - enable minimize btn)
     *     (bit 4 - enable maximize btn)
     */
    ExtensionWindow.setBorder = function (flag) {
        App.postMessage('4', String(flag));
    };
    /**
     * `** For deprecation, please use the static method instead`
     * */
    ExtensionWindow.prototype.setBorder = function (flag) {
        App.postMessage('4', String(flag));
    };
    /**
     * Closes this extension window
     */
    ExtensionWindow.close = function () {
        App.postMessage('1');
    };
    /**
     * `** For deprecation, please use the static method instead`
     * */
    ExtensionWindow.prototype.close = function () {
        App.postMessage('1');
    };
    /**
     * Disable Close Button on this extension's window
     */
    ExtensionWindow.disableClose = function () {
        App.postMessage('5', '0');
    };
    /**
     * `** For deprecation, please use the static method instead`
     * */
    ExtensionWindow.prototype.disableClose = function () {
        App.postMessage('5', '0');
    };
    /**
     * Enable Close Button on this extension's window
     */
    ExtensionWindow.enableClose = function () {
        App.postMessage('5', '1');
    };
    /**
     * `** For deprecation, please use the static method instead`
     * */
    ExtensionWindow.prototype.enableClose = function () {
        App.postMessage('5', '1');
    };
    ExtensionWindow._subscriptions = [];
    return ExtensionWindow;
}(EventEmitter);
// for extensions
var oldSourcesListUpdate = window.SourcesListUpdate;
window.SourcesListUpdate = function (view, sources) {
    if (Number(view) === 0) {
        var propsJSON = JSON$1.parse(decodeURIComponent(sources)),
            propsArr = [],
            ids = [];
        if (propsJSON.children && propsJSON.children.length > 0) {
            propsArr = propsJSON.children;
            for (var i = 0; i < propsArr.length; i++) {
                ids.push(propsArr[i]['id']);
            }
        }
        ExtensionWindow.emit('sources-list-update', ids.join(','));
    }
    if (typeof oldSourcesListUpdate === 'function') {
        oldSourcesListUpdate(view, sources);
    }
};
var oldSourcesListHighlight = window.SourcesListHighlight;
window.SourcesListHighlight = function (view, id) {
    if (Number(view) === 0) {
        ExtensionWindow.emit('sources-list-highlight', id === '' ? null : id);
    }
    if (typeof oldSourcesListHighlight === 'function') {
        oldSourcesListHighlight(view, id);
    }
};
var oldSourcesListSelect = window.SourcesListSelect;
window.SourcesListSelect = function (view, id) {
    if (Number(view) === 0) {
        ExtensionWindow.emit('sources-list-select', id === '' ? null : id);
    }
    if (typeof oldSourcesListSelect === 'function') {
        oldSourcesListSelect(view, id);
    }
};
var oldOnSceneLoad = window.OnSceneLoad;
window.OnSceneLoad = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (Environment.isExtension()) {
        var view = args[0];
        var scene = args[1];
        if (Number(view) === 0) {
            ExtensionWindow.emit('scene-load', Number(scene));
        }
    }
    if (typeof oldOnSceneLoad === 'function') {
        oldOnSceneLoad.apply(void 0, args);
    }
};

/// <reference path="../../defs/es6-promise.d.ts" />
/// <reference path="../../defs/object.d.ts" />
/// <reference path="../../defs/proxy.d.ts" />
var dialogProxy;
/**
 *  This class is used to spawn new browser processes that can be used to open
 *  other URLs. Source plugins do not have this functionality (but their
 *  properties windows may use this.)
 *
 *  Note that opening a new dialog replaces the old one. Also, dialogs are
 *  considered to be the same type of window as their parent windows: e.g.,
 *  dialogs from extension windows are considered by the framework to have
 *  access to the same functions as extensions.
 *
 *  Most of the methods are chainable.
 *
 *  Sample usage:
 *
 *  ```javascript
 *  var xjs = require('xjs');
 *  var Dialog = xjs.Dialog;
 *
 *  xjs.ready().then(function() {
 *    var button = document.getElementById('openDialogButton');
 *    button.addEventListener('click', function() {
 *      xjs.Dialog.createDialog('your.url/here.html')
 *      .setSize(500, 800)
 *      .setTitle('ThisDialogReturnsAString')
 *      .setBorderOptions(true, false)
 *      .setButtons(true, true)
 *      .show()
 *      .getResult().then(function(result) {
 *        document.getElementById('input').value = result;
 *      });
 *    });
 *  });
 *
 *  // in the opened dialog, call Dialog.return() to return a value
 *  //
 *  // see documentation below for more details
 *  ```
 */
var Dialog = function () {
    function Dialog() {
        var _this = this;
        if (Environment.isSourcePlugin()) {
            throw new Error('Dialogs are not available for source plugins.');
        } else {
            if (Remote.remoteType === 'remote') {
                throw new Error('Unable to listen to Dialog window events through Remote');
            }
            this._result = null;
            var eventListener_1 = function eventListener_1(e) {
                // self-deleting event listener
                e.target.removeEventListener(e.type, eventListener_1);
                if (typeof dialogProxy !== 'undefined' && typeof Proxy !== 'undefined') {
                    dialogProxy._result = e.detail;
                } else {
                    _this._result = e.detail;
                }
                _this._resultListener = null;
            };
            document.addEventListener('xsplit-dialog-result', eventListener_1);
            this._resultListener = eventListener_1;
            return this;
        }
    }
    /**
     *  param: (url: string)
     *
     *  return: Dialog
     *
     *  Creates a Dialog object pointing to a URL. Call the other methods to
     *  modify the dialog's properties, and `show()` to spawn the dialog.
     *
     * *Chainable.*
     */
    Dialog.createDialog = function (url) {
        var dialog = new Dialog();
        dialog._url = url;
        return dialog;
    };
    /**
     *  param: (url: string)
     *
     *  return: Dialog
     *
     *  Creates a Dialog object pointing to a URL, that autocloses on an outside
     *  click. AutoDialogs only have access to the `setSize` and `show` methods.
     *
     * *Chainable.*
     */
    Dialog.createAutoDialog = function (url) {
        if (Environment.isSourceProps()) {
            throw new Error('Auto dialogs are not available for config windows.');
        } else {
            var dialog = new Dialog();
            dialog._url = url;
            dialog._autoclose = true;
            return dialog;
        }
    };
    /**
     *  param: (result ?: string)
     *
     *  Closes this dialog with an optional string result. For more complex
     *  return values, try JSON.stringify. (Call this method from the dialog.)
     *
     *  As an alternative, lightweight dialogs that do not want to include xjs.js
     *  may simply call native XBC methods to return a value.
     *  ```javascript
     *  external.SetDialogResult(stringResult);
     *  external.Close();
     *  ```
     */
    Dialog.return = function (result) {
        return new Promise(function (resolve) {
            if (result !== undefined) {
                exec('SetDialogResult', result).then(function (res) {
                    resolve(res);
                    exec('Close');
                });
            } else {
                resolve(exec('Close'));
            }
        });
    };
    /**
     *  param: (width: number, height: number)
     *
     *  return: Dialog
     *
     *  Sets the size in pixels of the dialog to be displayed.
     *
     * *Chainable.*
     */
    Dialog.prototype.setSize = function (width, height) {
        if (width === void 0) {
            width = 300;
        }
        if (height === void 0) {
            height = 300;
        }
        this._size = Rectangle.fromDimensions(width, height);
        return this;
    };
    /**
     *  param: (title: string)
     *
     *  return: Dialog
     *
     *  Sets the title of the dialog to be displayed.
     *
     * *Chainable.*
     */
    Dialog.prototype.setTitle = function (title) {
        if (this._autoclose) {
            throw new Error('Autoclosing dialogs cannot use this method.');
        }
        this._title = title;
        return this;
    };
    /**
     *  param: (showBorder: boolean, resizable: boolean)
     *
     *  return: Dialog
     *
     *  Specifies the border and resizable flags for the dialog to be displayed.
     *
     * *Chainable.*
     */
    Dialog.prototype.setBorderOptions = function (showBorder, resizable) {
        if (showBorder === void 0) {
            showBorder = false;
        }
        if (resizable === void 0) {
            resizable = false;
        }
        if (this._autoclose) {
            throw new Error('Autoclosing dialogs cannot use this method.');
        }
        this._showBorder = showBorder;
        this._resizable = resizable;
        return this;
    };
    /**
     *  param: (isMinimizeActive: boolean, isMaximizeActive: boolean)
     *
     *  return: Dialog
     *
     *  Specifies if the window buttons (minimize and maximize) should be active.
     *
     * *Chainable.*
     */
    Dialog.prototype.setButtons = function (isMinimizeActive, isMaximizeActive) {
        if (isMinimizeActive === void 0) {
            isMinimizeActive = false;
        }
        if (isMaximizeActive === void 0) {
            isMaximizeActive = false;
        }
        if (this._autoclose) {
            throw new Error('Autoclosing dialogs cannot use this method.');
        }
        this._minimize = isMinimizeActive;
        this._maximize = isMaximizeActive;
        return this;
    };
    /**
     *  return: Dialog
     *
     *  After configuring the dialog, call this function to spawn it.
     *
     * *Chainable.*
     */
    Dialog.prototype.show = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._result = null;
            if (_this._autoclose) {
                exec('NewAutoDialog', _this._url, '', _this._size === undefined ? undefined : _this._size.getWidth() + ',' + _this._size.getHeight()).then(function (result) {
                    resolve(_this);
                });
            } else {
                exec('NewDialog', _this._url, '', _this._size === undefined ? undefined : _this._size.toDimensionString(), _this._calculateFlags(), _this._title).then(function (result) {
                    resolve(_this);
                });
            }
        });
    };
    /**
     *  return: Promise<string>
     *
     *  Gets the string result returned from the spawned dialog.
     */
    Dialog.prototype.getResult = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._result !== null) {
                resolve(_this._result);
            } else if (_this._resultListener === null) {
                var eventListener_2 = function eventListener_2(e) {
                    // self-deleting event listener
                    e.target.removeEventListener(e.type, eventListener_2);
                    _this._result = e.detail;
                    _this._resultListener = null;
                    resolve(_this._result);
                };
                document.addEventListener('xsplit-dialog-result', eventListener_2);
                _this._resultListener = eventListener_2;
            } else if (typeof Proxy === 'undefined') {
                Object.observe(_this, function (changes) {
                    // Search for changes with the name as result
                    var change = changes.filter(function (elem) {
                        return elem.name === '_result';
                    });
                    if (change !== undefined && change.length > 0) {
                        resolve(change[0].object._result);
                    }
                });
            } else {
                dialogProxy = new Proxy(_this, {
                    set: function set(target, property, value, receiver) {
                        if (property === '_result') {
                            _this._result = value;
                            resolve(value);
                        }
                        return true;
                    }
                });
            }
        });
    };
    /**
     *  Closes the dialog that this window spawned.
     */
    Dialog.prototype.close = function () {
        return new Promise(function (resolve) {
            resolve(exec('CloseDialog'));
        });
    };
    Dialog.prototype._calculateFlags = function () {
        var flags = 0;
        if (this._showBorder) {
            flags += 1;
        }
        if (this._resizable) {
            flags += 4;
        }
        if (this._minimize) {
            flags += 8;
        }
        if (this._maximize) {
            flags += 16;
        }
        if (this._title || this._minimize || this._maximize) {
            flags += 2;
        }
        return String(flags);
    };
    return Dialog;
}();
var oldOnDialogResult = window.OnDialogResult;
window.OnDialogResult = function (result) {
    if (Environment.isSourceProps() || Environment.isExtension()) {
        document.dispatchEvent(new CustomEvent('xsplit-dialog-result', {
            detail: result }));
    }
    if (typeof oldOnDialogResult === 'function') {
        oldOnDialogResult(result);
    }
};

exports.CuePoint = CuePoint;
exports.ready = ready;
exports.Color = Color;
exports.Rectangle = Rectangle;
exports.IO = IO;
exports.Environment = Environment;
exports.App = App$1;
exports.StreamInfo = StreamInfo;
exports.Output = Output;
exports.ChannelManager = ChannelManager;
exports.Scene = Scene;
exports.Transition = Transition;
exports.Dll = Dll;
exports.Extension = Extension;
exports.Source = Source;
exports.CameraSource = CameraSource;
exports.GameSource = GameSource;
exports.AudioSource = AudioSource;
exports.HtmlSource = HtmlSource;
exports.FlashSource = FlashSource;
exports.ScreenSource = ScreenSource;
exports.ImageSource = ImageSource;
exports.MediaSource = MediaSource;
exports.VideoPlaylistSource = VideoPlaylistSource;
exports.Item = Item$1;
exports.CameraItem = CameraItem;
exports.GameItem = GameItem;
exports.AudioItem = AudioItem;
exports.HtmlItem = HtmlItem;
exports.FlashItem = FlashItem;
exports.ScreenItem = ScreenItem;
exports.ImageItem = ImageItem;
exports.MediaItem = MediaItem;
exports.VideoPlaylistItem = VideoPlaylistItem;
exports.System = System;
exports.AudioDevice = AudioDevice;
exports.Game = Game;
exports.CameraDevice = CameraDevice;
exports.MicrophoneDevice = MicrophoneDevice;
exports.Url = Url;
exports.Screen = Screen;
exports.File = File;
exports.VideoPlaylist = VideoPlaylist;
exports.SourcePropsWindow = SourcePropsWindow;
exports.SourcePluginWindow = SourcePluginWindow;
exports.ExtensionWindow = ExtensionWindow;
exports.Dialog = Dialog;
exports.Remote = Remote;

return exports;

}({}));