(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xmldom"), require("jszip"));
	else if(typeof define === 'function' && define.amd)
		define(["xmldom", "jszip"], factory);
	else if(typeof exports === 'object')
		exports["ePub"] = factory(require("xmldom"), require("jszip"));
	else
		root["ePub"] = factory(root["xmldom"], root["jszip"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__678__, __WEBPACK_EXTERNAL_MODULE__4547__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isConstructor = __webpack_require__(4411);
var tryToString = __webpack_require__(6330);

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 6077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);

module.exports = function (argument) {
  if (typeof argument === 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 1530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(8710).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 5787:
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
  if (it instanceof Constructor) return it;
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
};


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 4019:
/***/ ((module) => {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';


/***/ }),

/***/ 3331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_ARRAY_BUFFER = __webpack_require__(4019);
var FunctionName = __webpack_require__(6530);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefineAll = __webpack_require__(2248);
var fails = __webpack_require__(7293);
var anInstance = __webpack_require__(5787);
var toIntegerOrInfinity = __webpack_require__(9303);
var toLength = __webpack_require__(7466);
var toIndex = __webpack_require__(7067);
var IEEE754 = __webpack_require__(1179);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var getOwnPropertyNames = __webpack_require__(8006).f;
var defineProperty = __webpack_require__(3070).f;
var arrayFill = __webpack_require__(1285);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ 1285:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 8533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = __webpack_require__(2092).forEach;
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 8457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(9974);
var toObject = __webpack_require__(7908);
var callWithSafeIterationClosing = __webpack_require__(3411);
var isArrayIteratorMethod = __webpack_require__(7659);
var isConstructor = __webpack_require__(4411);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 1318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 2092:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(9974);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var arraySpeciesCreate = __webpack_require__(5417);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 1194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 9341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 7475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(111);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 5417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(7475);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 3411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var iteratorClose = __webpack_require__(9212);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4326:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 4964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 8544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = __webpack_require__(3383).IteratorPrototype;
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var FunctionName = __webpack_require__(6530);
var isCallable = __webpack_require__(614);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 7235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(857);
var hasOwn = __webpack_require__(2597);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineProperty = __webpack_require__(3070).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8324:
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(317);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 7871:
/***/ ((module) => {

module.exports = typeof window == 'object';


/***/ }),

/***/ 1528:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);
var global = __webpack_require__(7854);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 6833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 5268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var global = __webpack_require__(7854);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 1036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 8113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ 748:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = __webpack_require__(1236).f;
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var redefine = __webpack_require__(1320);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 6677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 9974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(9662);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aCallable(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 7065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(9662);
var isObject = __webpack_require__(111);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aCallable(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ 6530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 5005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 1246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(648);
var getMethod = __webpack_require__(8173);
var Iterators = __webpack_require__(7497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8554:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(9662);
var anObject = __webpack_require__(9670);
var getIteratorMethod = __webpack_require__(1246);

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(iteratorMethod.call(argument));
  throw TypeError(String(argument) + ' is not iterable');
};


/***/ }),

/***/ 8173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);

var hasOwnProperty = {}.hasOwnProperty;

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 1179:
/***/ ((module) => {

// IEEE754 conversions based on https://github.com/feross/ieee754
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ 8361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 2423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var hiddenKeys = __webpack_require__(3501);
var isObject = __webpack_require__(111);
var hasOwn = __webpack_require__(2597);
var defineProperty = __webpack_require__(3070).f;
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternalModule = __webpack_require__(1156);
var uid = __webpack_require__(9711);
var FREEZING = __webpack_require__(6677);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = [].splice;
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice.call(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 9909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 3157:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 614:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument === 'function';
};


/***/ }),

/***/ 4411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(648);
var getBuiltIn = __webpack_require__(5005);
var inspectSource = __webpack_require__(2788);

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = constructorRegExp.exec;
var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(Object, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 5032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2597);

module.exports = function (descriptor) {
  return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'));
};


/***/ }),

/***/ 4705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var getBuiltIn = __webpack_require__(5005);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && Object(it) instanceof $Symbol;
};


/***/ }),

/***/ 408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isArrayIteratorMethod = __webpack_require__(7659);
var lengthOfArrayLike = __webpack_require__(6244);
var bind = __webpack_require__(9974);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);
var iteratorClose = __webpack_require__(9212);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var getMethod = __webpack_require__(8173);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 3383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var create = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(9518);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 6244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 5948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = __webpack_require__(1236).f;
var macrotask = __webpack_require__(261).set;
var IS_IOS = __webpack_require__(6833);
var IS_IOS_PEBBLE = __webpack_require__(1528);
var IS_WEBOS_WEBKIT = __webpack_require__(1036);
var IS_NODE = __webpack_require__(5268);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 3366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = global.Promise;


/***/ }),

/***/ 133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ 8536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 8523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(9662);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 3929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isRegExp = __webpack_require__(7850);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 1574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var objectKeys = __webpack_require__(1956);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var propertyIsEnumerableModule = __webpack_require__(5296);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var defineProperties = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(5656);
var $getOwnPropertyNames = __webpack_require__(8006).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = __webpack_require__(1318).indexOf;
var hiddenKeys = __webpack_require__(3501);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classof = __webpack_require__(648);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 2140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = global;


/***/ }),

/***/ 2534:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 9478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var newPromiseCapability = __webpack_require__(8523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 2248:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(1320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 1320:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(6530).CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = exec.call(R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return regexpExec.call(R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var toString = __webpack_require__(1340);
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = __webpack_require__(9909).get;
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(7168);

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = str.slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 9441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 7168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 4488:
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 1150:
/***/ ((module) => {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 3505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var definePropertyModule = __webpack_require__(3070);
var wellKnownSymbol = __webpack_require__(5112);
var DESCRIPTORS = __webpack_require__(9781);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 8003:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(3070).f;
var hasOwn = __webpack_require__(2597);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.18.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 6707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var aConstructor = __webpack_require__(9483);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 8710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 3197:
/***/ ((module) => {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ 6091:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var PROPER_FUNCTION_NAME = __webpack_require__(6530).PROPER;
var fails = __webpack_require__(7293);
var whitespaces = __webpack_require__(1361);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ 3111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var whitespaces = __webpack_require__(1361);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var fails = __webpack_require__(7293);
var bind = __webpack_require__(9974);
var html = __webpack_require__(490);
var createElement = __webpack_require__(317);
var IS_IOS = __webpack_require__(6833);
var IS_NODE = __webpack_require__(5268);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (isCallable(fn) ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 1400:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 7067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);
var toLength = __webpack_require__(7466);

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ 5656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 7466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),

/***/ 1694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(648);

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ ((module) => {

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 3307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 6061:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 5112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 1361:
/***/ ((module) => {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 8264:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var arrayBufferModule = __webpack_require__(3331);
var setSpecies = __webpack_require__(6340);

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);


/***/ }),

/***/ 2222:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);
var arraySpeciesCreate = __webpack_require__(5417);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 3290:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var fill = __webpack_require__(1285);
var addToUnscopables = __webpack_require__(1223);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 7327:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $filter = __webpack_require__(2092).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 9826:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $find = __webpack_require__(2092).find;
var addToUnscopables = __webpack_require__(1223);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 1038:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var from = __webpack_require__(8457);
var checkCorrectnessOfIteration = __webpack_require__(7072);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 6699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $includes = __webpack_require__(1318).includes;
var addToUnscopables = __webpack_require__(1223);

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 6992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 9600:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IndexedObject = __webpack_require__(8361);
var toIndexedObject = __webpack_require__(5656);
var arrayMethodIsStrict = __webpack_require__(9341);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 1249:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $map = __webpack_require__(2092).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 7042:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var isArray = __webpack_require__(3157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(111);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);
var toIndexedObject = __webpack_require__(5656);
var createProperty = __webpack_require__(6135);
var wellKnownSymbol = __webpack_require__(5112);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 561:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var toAbsoluteIndex = __webpack_require__(1400);
var toIntegerOrInfinity = __webpack_require__(9303);
var lengthOfArrayLike = __webpack_require__(6244);
var toObject = __webpack_require__(7908);
var arraySpeciesCreate = __webpack_require__(5417);
var createProperty = __webpack_require__(6135);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 8309:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var FUNCTION_NAME_EXISTS = __webpack_require__(6530).EXISTS;
var defineProperty = __webpack_require__(3070).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 9601:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var assign = __webpack_require__(1574);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 3371:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var FREEZING = __webpack_require__(6677);
var fails = __webpack_require__(7293);
var isObject = __webpack_require__(111);
var onFreeze = __webpack_require__(2423).onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 5003:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyDescriptor = __webpack_require__(1236).f;
var DESCRIPTORS = __webpack_require__(9781);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 6210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var getOwnPropertyNames = __webpack_require__(1156).f;

// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: getOwnPropertyNames
});


/***/ }),

/***/ 489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toObject = __webpack_require__(7908);
var nativeGetPrototypeOf = __webpack_require__(9518);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ 7941:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var nativeKeys = __webpack_require__(1956);
var fails = __webpack_require__(7293);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 1539:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var redefine = __webpack_require__(1320);
var toString = __webpack_require__(288);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 8674:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var NativePromise = __webpack_require__(3366);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var setSpecies = __webpack_require__(6340);
var aCallable = __webpack_require__(9662);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var anInstance = __webpack_require__(5787);
var inspectSource = __webpack_require__(2788);
var iterate = __webpack_require__(408);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var speciesConstructor = __webpack_require__(6707);
var task = __webpack_require__(261).set;
var microtask = __webpack_require__(5948);
var promiseResolve = __webpack_require__(9478);
var hostReportErrors = __webpack_require__(842);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var InternalStateModule = __webpack_require__(9909);
var isForced = __webpack_require__(4705);
var wellKnownSymbol = __webpack_require__(5112);
var IS_BROWSER = __webpack_require__(7871);
var IS_NODE = __webpack_require__(5268);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aCallable(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 2419:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var aConstructor = __webpack_require__(9483);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var create = __webpack_require__(30);
var bind = __webpack_require__(7065);
var fails = __webpack_require__(7293);

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 4819:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var isObject = __webpack_require__(111);
var anObject = __webpack_require__(9670);
var isDataDescriptor = __webpack_require__(5032);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var getPrototypeOf = __webpack_require__(9518);

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey);
  if (descriptor) return isDataDescriptor(descriptor)
    ? descriptor.value
    : descriptor.get === undefined ? undefined : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var inheritIfRequired = __webpack_require__(9587);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineProperty = __webpack_require__(3070).f;
var getOwnPropertyNames = __webpack_require__(8006).f;
var isRegExp = __webpack_require__(7850);
var toString = __webpack_require__(1340);
var getFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var redefine = __webpack_require__(1320);
var fails = __webpack_require__(7293);
var hasOwn = __webpack_require__(2597);
var enforceInternalState = __webpack_require__(9909).enforce;
var setSpecies = __webpack_require__(6340);
var wellKnownSymbol = __webpack_require__(5112);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(7168);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ 4916:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 9714:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var PROPER_FUNCTION_NAME = __webpack_require__(6530).PROPER;
var redefine = __webpack_require__(1320);
var anObject = __webpack_require__(9670);
var $toString = __webpack_require__(1340);
var fails = __webpack_require__(7293);
var flags = __webpack_require__(7066);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ 2023:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var correctIsRegExpLogic = __webpack_require__(4964);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~toString(requireObjectCoercible(this))
      .indexOf(toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 8783:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(8710).charAt;
var toString = __webpack_require__(1340);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 4723:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var anObject = __webpack_require__(9670);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var getMethod = __webpack_require__(8173);
var advanceStringIndex = __webpack_require__(1530);
var regExpExec = __webpack_require__(7651);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 5306:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var fails = __webpack_require__(7293);
var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var toIntegerOrInfinity = __webpack_require__(9303);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var getMethod = __webpack_require__(8173);
var getSubstitution = __webpack_require__(647);
var regExpExec = __webpack_require__(7651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = toString(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 4765:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var sameValue = __webpack_require__(1150);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var regExpExec = __webpack_require__(7651);

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ 3123:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var isRegExp = __webpack_require__(7850);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var speciesConstructor = __webpack_require__(6707);
var advanceStringIndex = __webpack_require__(1530);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var callRegExpExec = __webpack_require__(7651);
var regexpExec = __webpack_require__(2261);
var stickyHelpers = __webpack_require__(2999);
var fails = __webpack_require__(7293);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? splitter.call(separator, O, limit)
        : internalSplit.call(toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 3210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $trim = __webpack_require__(3111).trim;
var forcedStringTrimMethod = __webpack_require__(6091);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ 1817:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var defineProperty = __webpack_require__(3070).f;
var copyConstructorProperties = __webpack_require__(9920);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var nativeSymbol = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = nativeSymbol ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 2165:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(7235);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 2526:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_SYMBOL = __webpack_require__(133);
var fails = __webpack_require__(7293);
var hasOwn = __webpack_require__(2597);
var isArray = __webpack_require__(3157);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var anObject = __webpack_require__(9670);
var toObject = __webpack_require__(7908);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var $toString = __webpack_require__(1340);
var createPropertyDescriptor = __webpack_require__(9114);
var nativeObjectCreate = __webpack_require__(30);
var objectKeys = __webpack_require__(1956);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);
var propertyIsEnumerableModule = __webpack_require__(5296);
var redefine = __webpack_require__(1320);
var shared = __webpack_require__(2309);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var uid = __webpack_require__(9711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineWellKnownSymbol = __webpack_require__(7235);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);
var $forEach = __webpack_require__(2092).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  var valueOf = $Symbol[PROTOTYPE].valueOf;
  redefine($Symbol[PROTOTYPE], TO_PRIMITIVE, function () {
    return valueOf.apply(this, arguments);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 4747:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var forEach = __webpack_require__(8533);
var createNonEnumerableProperty = __webpack_require__(8880);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ 3948:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var ArrayIteratorMethods = __webpack_require__(6992);
var createNonEnumerableProperty = __webpack_require__(8880);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 1637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(6992);
var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var USE_NATIVE_URL = __webpack_require__(590);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setToStringTag = __webpack_require__(8003);
var createIteratorConstructor = __webpack_require__(4994);
var InternalStateModule = __webpack_require__(9909);
var anInstance = __webpack_require__(5787);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var bind = __webpack_require__(9974);
var classof = __webpack_require__(648);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var $toString = __webpack_require__(1340);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);
var wellKnownSymbol = __webpack_require__(5112);

var nativeFetch = getBuiltIn('fetch');
var NativeRequest = getBuiltIn('Request');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (iteratorMethod) {
        iterator = getIterator(init, iteratorMethod);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: $toString(first.value), value: $toString(second.value) });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: $toString(init[key]) });
    } else {
      parseSearchParams(
        entries,
        typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : $toString(init)
      );
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headers.has('content-type')) {
          headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, String(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestConstructor, 'Request');
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ 285:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(8783);
var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var USE_NATIVE_URL = __webpack_require__(590);
var global = __webpack_require__(7854);
var defineProperties = __webpack_require__(6048);
var redefine = __webpack_require__(1320);
var anInstance = __webpack_require__(5787);
var hasOwn = __webpack_require__(2597);
var assign = __webpack_require__(1574);
var arrayFrom = __webpack_require__(8457);
var codeAt = __webpack_require__(8710).codeAt;
var toASCII = __webpack_require__(3197);
var $toString = __webpack_require__(1340);
var setToStringTag = __webpack_require__(8003);
var URLSearchParamsModule = __webpack_require__(1637);
var InternalStateModule = __webpack_require__(9909);

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return input.charAt(pointer);
  };

  if (chr() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8) return;
    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(chr())) return;
        while (DIGIT.test(chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return hasOwn(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, chr, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    chr = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (chr && ALPHA.test(chr)) {
          buffer += chr.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (chr && (ALPHANUMERIC.test(chr) || chr == '+' || chr == '-' || chr == '.')) {
          buffer += chr.toLowerCase();
        } else if (chr == ':') {
          if (stateOverride && (
            (isSpecial(url) != hasOwn(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && chr == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (chr == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (chr == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (chr == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (chr == '/' || (chr == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (chr == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (chr == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (chr == '/' || chr == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (chr == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (chr != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (chr != '/' && chr != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (chr == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += chr;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (chr == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (chr == '[') seenBracket = true;
          else if (chr == ']') seenBracket = false;
          buffer += chr;
        } break;

      case PORT:
        if (DIGIT.test(chr)) {
          buffer += chr;
        } else if (
          chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
          (chr == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (chr == '/' || chr == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (chr == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (chr == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (chr == '/' || chr == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += chr;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (chr != '/' && chr != '\\') continue;
        } else if (!stateOverride && chr == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          state = PATH;
          if (chr != '/') continue;
        } break;

      case PATH:
        if (
          chr == EOF || chr == '/' ||
          (chr == '\\' && isSpecial(url)) ||
          (!stateOverride && (chr == '?' || chr == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (chr != '/' && !(chr == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (chr != '/' && !(chr == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(chr, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (chr == '?') {
          url.query = '';
          state = QUERY;
        } else if (chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && chr == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (chr != EOF) {
          if (chr == "'" && isSpecial(url)) url.query += '%27';
          else if (chr == '#') url.query += '%23';
          else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = $toString(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, $toString(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = $toString(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, $toString(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = $toString(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, $toString(pathname), PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = $toString(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = $toString(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ 1804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue         = __webpack_require__(5618)
  , isPlainFunction = __webpack_require__(7205)
  , assign          = __webpack_require__(7191)
  , normalizeOpts   = __webpack_require__(5516)
  , contains        = __webpack_require__(9981);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 430:
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 7191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(6560)() ? Object.assign : __webpack_require__(7346);


/***/ }),

/***/ 6560:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 7346:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys  = __webpack_require__(5103)
  , value = __webpack_require__(2745)
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 6914:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _undefined = __webpack_require__(430)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 5103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(7446)() ? Object.keys : __webpack_require__(6137);


/***/ }),

/***/ 7446:
/***/ ((module) => {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 6137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 5516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 1290:
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 2745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 9981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(3591)() ? String.prototype.contains : __webpack_require__(6042);


/***/ }),

/***/ 3591:
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 6042:
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 8370:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var d        = __webpack_require__(1804)
  , callable = __webpack_require__(1290)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 1365:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=undefined;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=undefined;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});


/***/ }),

/***/ 2705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(5639);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 4239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705),
    getRawTag = __webpack_require__(9607),
    objectToString = __webpack_require__(2333);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 7561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(7990);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 1957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 9607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 2333:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 5639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(1957);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 7990:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 3279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3218),
    now = __webpack_require__(7771),
    toNumber = __webpack_require__(4841);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 3218:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 7005:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 3448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(4239),
    isObjectLike = __webpack_require__(7005);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 7771:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(5639);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 3493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debounce = __webpack_require__(3279),
    isObject = __webpack_require__(3218);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ 4841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(7561),
    isObject = __webpack_require__(3218),
    isSymbol = __webpack_require__(3448);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 9521:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.proxyMouse = proxyMouse;
exports.clone = clone;
// import 'babelify/polyfill'; // needed for Object.assign

exports["default"] = {
    proxyMouse: proxyMouse
};

/**
 * Start proxying all mouse events that occur on the target node to each node in
 * a set of tracked nodes.
 *
 * The items in tracked do not strictly have to be DOM Nodes, but they do have
 * to have dispatchEvent, getBoundingClientRect, and getClientRects methods.
 *
 * @param target {Node} The node on which to listen for mouse events.
 * @param tracked {Node[]} A (possibly mutable) array of nodes to which to proxy
 *                         events.
 */

function proxyMouse(target, tracked) {
    function dispatch(e) {
        // We walk through the set of tracked elements in reverse order so that
        // events are sent to those most recently added first.
        //
        // This is the least surprising behaviour as it simulates the way the
        // browser would work if items added later were drawn "on top of"
        // earlier ones.
        for (var i = tracked.length - 1; i >= 0; i--) {
            var t = tracked[i];
            var x = e.clientX;
            var y = e.clientY;

            if (e.touches && e.touches.length) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }

            if (!contains(t, target, x, y)) {
                continue;
            }

            // The event targets this mark, so dispatch a cloned event:
            t.dispatchEvent(clone(e));
            // We only dispatch the cloned event to the first matching mark.
            break;
        }
    }

    if (target.nodeName === "iframe" || target.nodeName === "IFRAME") {

        try {
            // Try to get the contents if same domain
            this.target = target.contentDocument;
        } catch (err) {
            this.target = target;
        }
    } else {
        this.target = target;
    }

    var _arr = ['mouseup', 'mousedown', 'click', 'touchstart'];
    for (var _i = 0; _i < _arr.length; _i++) {
        var ev = _arr[_i];
        this.target.addEventListener(ev, function (e) {
            return dispatch(e);
        }, false);
    }
}

/**
 * Clone a mouse event object.
 *
 * @param e {MouseEvent} A mouse event object to clone.
 * @returns {MouseEvent}
 */
function clone(e) {
    var opts = Object.assign({}, e, { bubbles: false });
    try {
        return new MouseEvent(e.type, opts);
    } catch (err) {
        // compat: webkit
        var copy = document.createEvent('MouseEvents');
        copy.initMouseEvent(e.type, false, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
        return copy;
    }
}

/**
 * Check if the item contains the point denoted by the passed coordinates
 * @param item {Object} An object with getBoundingClientRect and getClientRects
 *                      methods.
 * @param x {Number}
 * @param y {Number}
 * @returns {Boolean}
 */
function contains(item, target, x, y) {
    // offset
    var offset = target.getBoundingClientRect();

    function rectContains(r, x, y) {
        var top = r.top - offset.top;
        var left = r.left - offset.left;
        var bottom = top + r.height;
        var right = left + r.width;
        return top <= y && left <= x && bottom > y && right > x;
    }

    // Check overall bounding box first
    var rect = item.getBoundingClientRect();
    if (!rectContains(rect, x, y)) {
        return false;
    }

    // Then continue to check each child rect
    var rects = item.getClientRects();
    for (var i = 0, len = rects.length; i < len; i++) {
        if (rectContains(rects[i], x, y)) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ 3476:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
    value: true
});
exports.v6 = exports.y$ = __webpack_unused_export__ = exports.X6 = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svg = __webpack_require__(1777);

var _svg2 = _interopRequireDefault(_svg);

var _events = __webpack_require__(9521);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pane = exports.X6 = function () {
    function Pane(target) {
        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

        _classCallCheck(this, Pane);

        this.target = target;
        this.element = _svg2.default.createElement('svg');
        this.marks = [];

        // Match the coordinates of the target element
        this.element.style.position = 'absolute';
        // Disable pointer events
        this.element.setAttribute('pointer-events', 'none');

        // Set up mouse event proxying between the target element and the marks
        _events2.default.proxyMouse(this.target, this.marks);

        this.container = container;
        this.container.appendChild(this.element);

        this.render();
    }

    _createClass(Pane, [{
        key: 'addMark',
        value: function addMark(mark) {
            var g = _svg2.default.createElement('g');
            this.element.appendChild(g);
            mark.bind(g, this.container);

            this.marks.push(mark);

            mark.render();
            return mark;
        }
    }, {
        key: 'removeMark',
        value: function removeMark(mark) {
            var idx = this.marks.indexOf(mark);
            if (idx === -1) {
                return;
            }
            var el = mark.unbind();
            this.element.removeChild(el);
            this.marks.splice(idx, 1);
        }
    }, {
        key: 'render',
        value: function render() {
            setCoords(this.element, coords(this.target, this.container));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var m = _step.value;

                    m.render();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Pane;
}();

var Mark = __webpack_unused_export__ = function () {
    function Mark() {
        _classCallCheck(this, Mark);

        this.element = null;
    }

    _createClass(Mark, [{
        key: 'bind',
        value: function bind(element, container) {
            this.element = element;
            this.container = container;
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            var el = this.element;
            this.element = null;
            return el;
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(e) {
            if (!this.element) return;
            this.element.dispatchEvent(e);
        }
    }, {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect() {
            return this.element.getBoundingClientRect();
        }
    }, {
        key: 'getClientRects',
        value: function getClientRects() {
            var rects = [];
            var el = this.element.firstChild;
            while (el) {
                rects.push(el.getBoundingClientRect());
                el = el.nextSibling;
            }
            return rects;
        }
    }, {
        key: 'filteredRanges',
        value: function filteredRanges() {
            var rects = Array.from(this.range.getClientRects());

            // De-duplicate the boxes
            return rects.filter(function (box) {
                for (var i = 0; i < rects.length; i++) {
                    if (rects[i] === box) {
                        return true;
                    }
                    var contained = contains(rects[i], box);
                    if (contained) {
                        return false;
                    }
                }
                return true;
            });
        }
    }]);

    return Mark;
}();

var Highlight = exports.y$ = function (_Mark) {
    _inherits(Highlight, _Mark);

    function Highlight(range, className, data, attributes) {
        _classCallCheck(this, Highlight);

        var _this = _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this));

        _this.range = range;
        _this.className = className;
        _this.data = data || {};
        _this.attributes = attributes || {};
        return _this;
    }

    _createClass(Highlight, [{
        key: 'bind',
        value: function bind(element, container) {
            _get(Highlight.prototype.__proto__ || Object.getPrototypeOf(Highlight.prototype), 'bind', this).call(this, element, container);

            for (var attr in this.data) {
                if (this.data.hasOwnProperty(attr)) {
                    this.element.dataset[attr] = this.data[attr];
                }
            }

            for (var attr in this.attributes) {
                if (this.attributes.hasOwnProperty(attr)) {
                    this.element.setAttribute(attr, this.attributes[attr]);
                }
            }

            if (this.className) {
                this.element.classList.add(this.className);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // Empty element
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }

            var docFrag = this.element.ownerDocument.createDocumentFragment();
            var filtered = this.filteredRanges();
            var offset = this.element.getBoundingClientRect();
            var container = this.container.getBoundingClientRect();

            for (var i = 0, len = filtered.length; i < len; i++) {
                var r = filtered[i];
                var el = _svg2.default.createElement('rect');
                el.setAttribute('x', r.left - offset.left + container.left);
                el.setAttribute('y', r.top - offset.top + container.top);
                el.setAttribute('height', r.height);
                el.setAttribute('width', r.width);
                docFrag.appendChild(el);
            }

            this.element.appendChild(docFrag);
        }
    }]);

    return Highlight;
}(Mark);

var Underline = exports.v6 = function (_Highlight) {
    _inherits(Underline, _Highlight);

    function Underline(range, className, data, attributes) {
        _classCallCheck(this, Underline);

        return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).call(this, range, className, data, attributes));
    }

    _createClass(Underline, [{
        key: 'render',
        value: function render() {
            // Empty element
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }

            var docFrag = this.element.ownerDocument.createDocumentFragment();
            var filtered = this.filteredRanges();
            var offset = this.element.getBoundingClientRect();
            var container = this.container.getBoundingClientRect();

            for (var i = 0, len = filtered.length; i < len; i++) {
                var r = filtered[i];

                var rect = _svg2.default.createElement('rect');
                rect.setAttribute('x', r.left - offset.left + container.left);
                rect.setAttribute('y', r.top - offset.top + container.top);
                rect.setAttribute('height', r.height);
                rect.setAttribute('width', r.width);
                rect.setAttribute('fill', 'none');

                var line = _svg2.default.createElement('line');
                line.setAttribute('x1', r.left - offset.left + container.left);
                line.setAttribute('x2', r.left - offset.left + container.left + r.width);
                line.setAttribute('y1', r.top - offset.top + container.top + r.height - 1);
                line.setAttribute('y2', r.top - offset.top + container.top + r.height - 1);

                line.setAttribute('stroke-width', 1);
                line.setAttribute('stroke', 'black'); //TODO: match text color?
                line.setAttribute('stroke-linecap', 'square');

                docFrag.appendChild(rect);

                docFrag.appendChild(line);
            }

            this.element.appendChild(docFrag);
        }
    }]);

    return Underline;
}(Highlight);

function coords(el, container) {
    var offset = container.getBoundingClientRect();
    var rect = el.getBoundingClientRect();

    return {
        top: rect.top - offset.top,
        left: rect.left - offset.left,
        height: el.scrollHeight,
        width: el.scrollWidth
    };
}

function setCoords(el, coords) {
    el.style.setProperty('top', coords.top + 'px', 'important');
    el.style.setProperty('left', coords.left + 'px', 'important');
    el.style.setProperty('height', coords.height + 'px', 'important');
    el.style.setProperty('width', coords.width + 'px', 'important');
}

function contains(rect1, rect2) {
    return rect2.right <= rect1.right && rect2.left >= rect1.left && rect2.top >= rect1.top && rect2.bottom <= rect1.bottom;
}


/***/ }),

/***/ 1777:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createElement = createElement;
function createElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

exports["default"] = {
    createElement: createElement
};


/***/ }),

/***/ 9294:
/***/ ((module) => {

"use strict";


if (!process) {
  var process = {
    "cwd" : function () { return '/' }
  };
}

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + path);
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47/*/*/)
      break;
    else
      code = 47/*/*/;
    if (code === 47/*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 ||
            res.charCodeAt(res.length - 1) !== 46/*.*/ ||
            res.charCodeAt(res.length - 2) !== 46/*.*/) {
          if (res.length > 2) {
            var start = res.length - 1;
            var j = start;
            for (; j >= 0; --j) {
              if (res.charCodeAt(j) === 47/*/*/)
                break;
            }
            if (j !== start) {
              if (j === -1)
                res = '';
              else
                res = res.slice(0, j);
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46/*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base ||
    ((pathObject.name || '') + (pathObject.ext || ''));
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47/*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },


  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0)
      return '.';

    var isAbsolute = path.charCodeAt(0) === 47/*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47/*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute)
      path = '.';
    if (path.length > 0 && trailingSeparator)
      path += '/';

    if (isAbsolute)
      return '/' + path;
    return path;
  },


  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47/*/*/;
  },


  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },


  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to)
      return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to)
      return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47/*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = (fromEnd - fromStart);

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47/*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = (toEnd - toStart);

    // Compare paths to find the longest common path from root
    var length = (fromLen < toLen ? fromLen : toLen);
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47/*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47/*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47/*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47/*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47/*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },


  _makeLong: function _makeLong(path) {
    return path;
  },


  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0)
      return '.';
    var code = path.charCodeAt(0);
    var hasRoot = (code === 47/*/*/);
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1)
      return hasRoot ? '/' : '.';
    if (hasRoot && end === 1)
      return '//';
    return path.slice(0, end);
  },


  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string')
      throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path)
        return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47/*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47/*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1)
        return '';
      return path.slice(start, end);
    }
  },


  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46/*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
         startDot === end - 1 &&
         startDot === startPart + 1)) {
      return '';
    }
    return path.slice(startDot, end);
  },


  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError(
        'Parameter "pathObject" must be an object, not ' + typeof(pathObject)
      );
    }
    return _format('/', pathObject);
  },


  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0)
      return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = (code === 47/*/*/);
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46/*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
         startDot === end - 1 &&
         startDot === startPart + 1)) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute)
          ret.base = ret.name = path.slice(1, end);
        else
          ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0)
      ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute)
      ret.dir = '/';

    return ret;
  },


  sep: '/',
  delimiter: ':',
  posix: null
};


module.exports = posix;


/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isPrototype = __webpack_require__(6060);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 3940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(5618);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 7205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isFunction = __webpack_require__(372);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 6060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isObject = __webpack_require__(3940);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 5618:
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ 4547:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__4547__;

/***/ }),

/***/ 678:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__678__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ epub)
});

// NAMESPACE OBJECT: ./src/utils/core.js
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
  "RangeObject": () => (RangeObject),
  "blob2base64": () => (blob2base64),
  "borders": () => (borders),
  "bounds": () => (core_bounds),
  "createBase64Url": () => (createBase64Url),
  "createBlob": () => (createBlob),
  "createBlobUrl": () => (createBlobUrl),
  "defaults": () => (defaults),
  "defer": () => (defer),
  "documentHeight": () => (documentHeight),
  "extend": () => (extend),
  "filterChildren": () => (filterChildren),
  "findChildren": () => (findChildren),
  "getParentByTagName": () => (getParentByTagName),
  "indexOfElementNode": () => (indexOfElementNode),
  "indexOfNode": () => (indexOfNode),
  "indexOfSorted": () => (indexOfSorted),
  "indexOfTextNode": () => (indexOfTextNode),
  "insert": () => (insert),
  "isElement": () => (isElement),
  "isFloat": () => (isFloat),
  "isNumber": () => (isNumber),
  "isXml": () => (isXml),
  "locationOf": () => (locationOf),
  "nodeBounds": () => (nodeBounds),
  "parents": () => (parents),
  "parse": () => (parse),
  "prefixed": () => (prefixed),
  "qs": () => (qs),
  "qsa": () => (qsa),
  "qsp": () => (qsp),
  "querySelectorByType": () => (querySelectorByType),
  "requestAnimationFrame": () => (core_requestAnimationFrame),
  "revokeBlobUrl": () => (revokeBlobUrl),
  "sprint": () => (sprint),
  "treeWalker": () => (treeWalker),
  "type": () => (type),
  "uuid": () => (uuid),
  "walk": () => (walk),
  "windowBounds": () => (windowBounds)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.constructor.js
var es_array_buffer_constructor = __webpack_require__(8264);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/event-emitter/index.js
var event_emitter = __webpack_require__(8370);
var event_emitter_default = /*#__PURE__*/__webpack_require__.n(event_emitter);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(285);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(1637);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-names.js
var es_object_get_own_property_names = __webpack_require__(6210);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(5003);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(561);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.freeze.js
var es_object_freeze = __webpack_require__(3371);
// EXTERNAL MODULE: external "xmldom"
var external_xmldom_ = __webpack_require__(678);
;// CONCATENATED MODULE: ./src/utils/core.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




















/**
 * Core Utilities and Helpers
 * @module Core
*/

/**
 * Vendor prefixed requestAnimationFrame
 * @returns {function} requestAnimationFrame
 * @memberof Core
 */

var core_requestAnimationFrame = typeof window != "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : false;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;

var _URL = typeof URL != "undefined" ? URL : typeof window != "undefined" ? window.URL || window.webkitURL || window.mozURL : undefined;
/**
 * Generates a UUID
 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 * @returns {string} uuid
 * @memberof Core
 */


function uuid() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}
/**
 * Gets the height of a document
 * @returns {number} height
 * @memberof Core
 */

function documentHeight() {
  return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
}
/**
 * Checks if a node is an element
 * @param {object} obj
 * @returns {boolean}
 * @memberof Core
 */

function isElement(obj) {
  return !!(obj && obj.nodeType == 1);
}
/**
 * @param {any} n
 * @returns {boolean}
 * @memberof Core
 */

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * @param {any} n
 * @returns {boolean}
 * @memberof Core
 */

function isFloat(n) {
  var f = parseFloat(n);

  if (isNumber(n) === false) {
    return false;
  }

  if (typeof n === "string" && n.indexOf(".") > -1) {
    return true;
  }

  return Math.floor(f) !== f;
}
/**
 * Get a prefixed css property
 * @param {string} unprefixed
 * @returns {string}
 * @memberof Core
 */

function prefixed(unprefixed) {
  var vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
  var prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
  var lower = unprefixed.toLowerCase();
  var length = vendors.length;

  if (typeof document === "undefined" || typeof document.body.style[lower] != "undefined") {
    return unprefixed;
  }

  for (var i = 0; i < length; i++) {
    if (typeof document.body.style[prefixes[i] + lower] != "undefined") {
      return prefixes[i] + lower;
    }
  }

  return unprefixed;
}
/**
 * Apply defaults to an object
 * @param {object} obj
 * @returns {object}
 * @memberof Core
 */

function defaults(obj) {
  for (var i = 1, length = arguments.length; i < length; i++) {
    var source = arguments[i];

    for (var prop in source) {
      if (obj[prop] === void 0) obj[prop] = source[prop];
    }
  }

  return obj;
}
/**
 * Extend properties of an object
 * @param {object} target
 * @returns {object}
 * @memberof Core
 */

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    if (!source) return;
    Object.getOwnPropertyNames(source).forEach(function (propName) {
      Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
    });
  });
  return target;
}
/**
 * Fast quicksort insert for sorted array -- based on:
 *  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @returns {number} location (in array)
 * @memberof Core
 */

function insert(item, array, compareFunction) {
  var location = locationOf(item, array, compareFunction);
  array.splice(location, 0, item);
  return location;
}
/**
 * Finds where something would fit into a sorted array
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} location (in array)
 * @memberof Core
 */

function locationOf(item, array, compareFunction, _start, _end) {
  var start = _start || 0;
  var end = _end || array.length;
  var pivot = parseInt(start + (end - start) / 2);
  var compared;

  if (!compareFunction) {
    compareFunction = function compareFunction(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a == b) return 0;
    };
  }

  if (end - start <= 0) {
    return pivot;
  }

  compared = compareFunction(array[pivot], item);

  if (end - start === 1) {
    return compared >= 0 ? pivot : pivot + 1;
  }

  if (compared === 0) {
    return pivot;
  }

  if (compared === -1) {
    return locationOf(item, array, compareFunction, pivot, end);
  } else {
    return locationOf(item, array, compareFunction, start, pivot);
  }
}
/**
 * Finds index of something in a sorted array
 * Returns -1 if not found
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} index (in array) or -1
 * @memberof Core
 */

function indexOfSorted(item, array, compareFunction, _start, _end) {
  var start = _start || 0;
  var end = _end || array.length;
  var pivot = parseInt(start + (end - start) / 2);
  var compared;

  if (!compareFunction) {
    compareFunction = function compareFunction(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a == b) return 0;
    };
  }

  if (end - start <= 0) {
    return -1; // Not found
  }

  compared = compareFunction(array[pivot], item);

  if (end - start === 1) {
    return compared === 0 ? pivot : -1;
  }

  if (compared === 0) {
    return pivot; // Found
  }

  if (compared === -1) {
    return indexOfSorted(item, array, compareFunction, pivot, end);
  } else {
    return indexOfSorted(item, array, compareFunction, start, pivot);
  }
}
/**
 * Find the bounds of an element
 * taking padding and margin into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */

function core_bounds(el) {
  var style = window.getComputedStyle(el);
  var widthProps = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
  var heightProps = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];
  var width = 0;
  var height = 0;
  widthProps.forEach(function (prop) {
    width += parseFloat(style[prop]) || 0;
  });
  heightProps.forEach(function (prop) {
    height += parseFloat(style[prop]) || 0;
  });
  return {
    height: height,
    width: width
  };
}
/**
 * Find the bounds of an element
 * taking padding, margin and borders into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */

function borders(el) {
  var style = window.getComputedStyle(el);
  var widthProps = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
  var heightProps = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];
  var width = 0;
  var height = 0;
  widthProps.forEach(function (prop) {
    width += parseFloat(style[prop]) || 0;
  });
  heightProps.forEach(function (prop) {
    height += parseFloat(style[prop]) || 0;
  });
  return {
    height: height,
    width: width
  };
}
/**
 * Find the bounds of any node
 * allows for getting bounds of text nodes by wrapping them in a range
 * @param {node} node
 * @returns {BoundingClientRect}
 * @memberof Core
 */

function nodeBounds(node) {
  var elPos;
  var doc = node.ownerDocument;

  if (node.nodeType == Node.TEXT_NODE) {
    var elRange = doc.createRange();
    elRange.selectNodeContents(node);
    elPos = elRange.getBoundingClientRect();
  } else {
    elPos = node.getBoundingClientRect();
  }

  return elPos;
}
/**
 * Find the equivelent of getBoundingClientRect of a browser window
 * @returns {{ width: Number, height: Number, top: Number, left: Number, right: Number, bottom: Number }}
 * @memberof Core
 */

function windowBounds() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width: width,
    height: height
  };
}
/**
 * Gets the index of a node in its parent
 * @param {Node} node
 * @param {string} typeId
 * @return {number} index
 * @memberof Core
 */

function indexOfNode(node, typeId) {
  var parent = node.parentNode;
  var children = parent.childNodes;
  var sib;
  var index = -1;

  for (var i = 0; i < children.length; i++) {
    sib = children[i];

    if (sib.nodeType === typeId) {
      index++;
    }

    if (sib == node) break;
  }

  return index;
}
/**
 * Gets the index of a text node in its parent
 * @param {node} textNode
 * @returns {number} index
 * @memberof Core
 */

function indexOfTextNode(textNode) {
  return indexOfNode(textNode, TEXT_NODE);
}
/**
 * Gets the index of an element node in its parent
 * @param {element} elementNode
 * @returns {number} index
 * @memberof Core
 */

function indexOfElementNode(elementNode) {
  return indexOfNode(elementNode, ELEMENT_NODE);
}
/**
 * Check if extension is xml
 * @param {string} ext
 * @returns {boolean}
 * @memberof Core
 */

function isXml(ext) {
  return ["xml", "opf", "ncx"].indexOf(ext) > -1;
}
/**
 * Create a new blob
 * @param {any} content
 * @param {string} mime
 * @returns {Blob}
 * @memberof Core
 */

function createBlob(content, mime) {
  return new Blob([content], {
    type: mime
  });
}
/**
 * Create a new blob url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */

function createBlobUrl(content, mime) {
  var tempUrl;
  var blob = createBlob(content, mime);
  tempUrl = _URL.createObjectURL(blob);
  return tempUrl;
}
/**
 * Remove a blob url
 * @param {string} url
 * @memberof Core
 */

function revokeBlobUrl(url) {
  return _URL.revokeObjectURL(url);
}
/**
 * Create a new base64 encoded url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */

function createBase64Url(content, mime) {
  var data;
  var datauri;

  if (typeof content !== "string") {
    // Only handles strings
    return;
  }

  data = btoa(encodeURIComponent(content));
  datauri = "data:" + mime + ";base64," + data;
  return datauri;
}
/**
 * Get type of an object
 * @param {object} obj
 * @returns {string} type
 * @memberof Core
 */

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
/**
 * Parse xml (or html) markup
 * @param {string} markup
 * @param {string} mime
 * @param {boolean} forceXMLDom force using xmlDom to parse instead of native parser
 * @returns {document} document
 * @memberof Core
 */

function parse(markup, mime, forceXMLDom) {
  var doc;
  var Parser;

  if (typeof DOMParser === "undefined" || forceXMLDom) {
    Parser = external_xmldom_.DOMParser;
  } else {
    Parser = DOMParser;
  } // Remove byte order mark before parsing
  // https://www.w3.org/International/questions/qa-byte-order-mark


  if (markup.charCodeAt(0) === 0xFEFF) {
    markup = markup.slice(1);
  }

  doc = new Parser().parseFromString(markup, mime);
  return doc;
}
/**
 * querySelector polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element} element
 * @memberof Core
 */

function qs(el, sel) {
  var elements;

  if (!el) {
    throw new Error("No Element Provided");
  }

  if (typeof el.querySelector != "undefined") {
    return el.querySelector(sel);
  } else {
    elements = el.getElementsByTagName(sel);

    if (elements.length) {
      return elements[0];
    }
  }
}
/**
 * querySelectorAll polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element[]} elements
 * @memberof Core
 */

function qsa(el, sel) {
  if (typeof el.querySelector != "undefined") {
    return el.querySelectorAll(sel);
  } else {
    return el.getElementsByTagName(sel);
  }
}
/**
 * querySelector by property
 * @param {element} el
 * @param {string} sel selector string
 * @param {object[]} props
 * @returns {element[]} elements
 * @memberof Core
 */

function qsp(el, sel, props) {
  var q, filtered;

  if (typeof el.querySelector != "undefined") {
    sel += "[";

    for (var prop in props) {
      sel += prop + "~='" + props[prop] + "'";
    }

    sel += "]";
    return el.querySelector(sel);
  } else {
    q = el.getElementsByTagName(sel);
    filtered = Array.prototype.slice.call(q, 0).filter(function (el) {
      for (var prop in props) {
        if (el.getAttribute(prop) === props[prop]) {
          return true;
        }
      }

      return false;
    });

    if (filtered) {
      return filtered[0];
    }
  }
}
/**
 * Sprint through all text nodes in a document
 * @memberof Core
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 */

function sprint(root, func) {
  var doc = root.ownerDocument || root;

  if (typeof doc.createTreeWalker !== "undefined") {
    treeWalker(root, func, NodeFilter.SHOW_TEXT);
  } else {
    walk(root, function (node) {
      if (node && node.nodeType === 3) {
        // Node.TEXT_NODE
        func(node);
      }
    }, true);
  }
}
/**
 * Create a treeWalker
 * @memberof Core
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 * @param  {function | object} filter funtion or object to filter with
 */

function treeWalker(root, func, filter) {
  var treeWalker = document.createTreeWalker(root, filter, null, false);
  var node;

  while (node = treeWalker.nextNode()) {
    func(node);
  }
}
/**
 * @memberof Core
 * @param {node} node
 * @param {callback} return false for continue,true for break inside callback
 */

function walk(node, callback) {
  if (callback(node)) {
    return true;
  }

  node = node.firstChild;

  if (node) {
    do {
      var walked = walk(node, callback);

      if (walked) {
        return true;
      }

      node = node.nextSibling;
    } while (node);
  }
}
/**
 * Convert a blob to a base64 encoded string
 * @param {Blog} blob
 * @returns {string}
 * @memberof Core
 */

function blob2base64(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
}
/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 * From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
 * @memberof Core
 */

function defer() {
  var _this = this;

  /* A method to resolve the associated Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {anything} value : This value is used to resolve the promise
   * If the value is a Promise then the associated promise assumes the state
   * of Promise passed as value.
   */
  this.resolve = null;
  /* A method to reject the assocaited Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {anything} reason: The reason for the rejection of the Promise.
   * Generally its an Error object. If however a Promise is passed, then the Promise
   * itself will be the reason for rejection no matter the state of the Promise.
   */

  this.reject = null;
  this.id = uuid();
  /* A newly created Pomise object.
   * Initially in pending state.
   */

  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
  Object.freeze(this);
}
/**
 * querySelector with filter by epub type
 * @param {element} html
 * @param {string} element element type to find
 * @param {string} type epub type to find
 * @returns {element[]} elements
 * @memberof Core
 */

function querySelectorByType(html, element, type) {
  var query;

  if (typeof html.querySelector != "undefined") {
    query = html.querySelector("".concat(element, "[*|type=\"").concat(type, "\"]"));
  } // Handle IE not supporting namespaced epub:type in querySelector


  if (!query || query.length === 0) {
    query = qsa(html, element);

    for (var i = 0; i < query.length; i++) {
      if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) {
        return query[i];
      }
    }
  } else {
    return query;
  }
}
/**
 * Find direct decendents of an element
 * @param {element} el
 * @returns {element[]} children
 * @memberof Core
 */

function findChildren(el) {
  var result = [];
  var childNodes = el.childNodes;

  for (var i = 0; i < childNodes.length; i++) {
    var node = childNodes[i];

    if (node.nodeType === 1) {
      result.push(node);
    }
  }

  return result;
}
/**
 * Find all parents (ancestors) of an element
 * @param {element} node
 * @returns {element[]} parents
 * @memberof Core
 */

function parents(node) {
  var nodes = [node];

  for (; node; node = node.parentNode) {
    nodes.unshift(node);
  }

  return nodes;
}
/**
 * Find all direct decendents of a specific type
 * @param {element} el
 * @param {string} nodeName
 * @param {boolean} [single]
 * @returns {element[]} children
 * @memberof Core
 */

function filterChildren(el, nodeName, single) {
  var result = [];
  var childNodes = el.childNodes;

  for (var i = 0; i < childNodes.length; i++) {
    var node = childNodes[i];

    if (node.nodeType === 1 && node.nodeName.toLowerCase() === nodeName) {
      if (single) {
        return node;
      } else {
        result.push(node);
      }
    }
  }

  if (!single) {
    return result;
  }
}
/**
 * Filter all parents (ancestors) with tag name
 * @param {element} node
 * @param {string} tagname
 * @returns {element[]} parents
 * @memberof Core
 */

function getParentByTagName(node, tagname) {
  var parent;
  if (node === null || tagname === '') return;
  parent = node.parentNode;

  while (parent.nodeType === 1) {
    if (parent.tagName.toLowerCase() === tagname) {
      return parent;
    }

    parent = parent.parentNode;
  }
}
/**
 * Lightweight Polyfill for DOM Range
 * @class
 * @memberof Core
 */

var RangeObject = /*#__PURE__*/function () {
  function RangeObject() {
    _classCallCheck(this, RangeObject);

    this.collapsed = false;
    this.commonAncestorContainer = undefined;
    this.endContainer = undefined;
    this.endOffset = undefined;
    this.startContainer = undefined;
    this.startOffset = undefined;
  }

  _createClass(RangeObject, [{
    key: "setStart",
    value: function setStart(startNode, startOffset) {
      this.startContainer = startNode;
      this.startOffset = startOffset;

      if (!this.endContainer) {
        this.collapse(true);
      } else {
        this.commonAncestorContainer = this._commonAncestorContainer();
      }

      this._checkCollapsed();
    }
  }, {
    key: "setEnd",
    value: function setEnd(endNode, endOffset) {
      this.endContainer = endNode;
      this.endOffset = endOffset;

      if (!this.startContainer) {
        this.collapse(false);
      } else {
        this.collapsed = false;
        this.commonAncestorContainer = this._commonAncestorContainer();
      }

      this._checkCollapsed();
    }
  }, {
    key: "collapse",
    value: function collapse(toStart) {
      this.collapsed = true;

      if (toStart) {
        this.endContainer = this.startContainer;
        this.endOffset = this.startOffset;
        this.commonAncestorContainer = this.startContainer.parentNode;
      } else {
        this.startContainer = this.endContainer;
        this.startOffset = this.endOffset;
        this.commonAncestorContainer = this.endOffset.parentNode;
      }
    }
  }, {
    key: "selectNode",
    value: function selectNode(referenceNode) {
      var parent = referenceNode.parentNode;
      var index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
      this.setStart(parent, index);
      this.setEnd(parent, index + 1);
    }
  }, {
    key: "selectNodeContents",
    value: function selectNodeContents(referenceNode) {
      var end = referenceNode.childNodes[referenceNode.childNodes - 1];
      var endIndex = referenceNode.nodeType === 3 ? referenceNode.textContent.length : parent.childNodes.length;
      this.setStart(referenceNode, 0);
      this.setEnd(referenceNode, endIndex);
    }
  }, {
    key: "_commonAncestorContainer",
    value: function _commonAncestorContainer(startContainer, endContainer) {
      var startParents = parents(startContainer || this.startContainer);
      var endParents = parents(endContainer || this.endContainer);
      if (startParents[0] != endParents[0]) return undefined;

      for (var i = 0; i < startParents.length; i++) {
        if (startParents[i] != endParents[i]) {
          return startParents[i - 1];
        }
      }
    }
  }, {
    key: "_checkCollapsed",
    value: function _checkCollapsed() {
      if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
    }
  }, {
    key: "toString",
    value: function toString() {// TODO: implement walking between start and end to find text
    }
  }]);

  return RangeObject;
}();
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__(4765);
// EXTERNAL MODULE: ./node_modules/path-webpack/path.js
var path = __webpack_require__(9294);
var path_default = /*#__PURE__*/__webpack_require__.n(path);
;// CONCATENATED MODULE: ./src/utils/path.js









function path_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function path_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function path_createClass(Constructor, protoProps, staticProps) { if (protoProps) path_defineProperties(Constructor.prototype, protoProps); if (staticProps) path_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Creates a Path object for parsing and manipulation of a path strings
 *
 * Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
 * @param	{string} pathString	a url string (relative or absolute)
 * @class
 */

var Path = /*#__PURE__*/function () {
  function Path(pathString) {
    path_classCallCheck(this, Path);

    var protocol;
    var parsed;
    protocol = pathString.indexOf("://");

    if (protocol > -1) {
      pathString = new URL(pathString).pathname;
    }

    parsed = this.parse(pathString);
    this.path = pathString;

    if (this.isDirectory(pathString)) {
      this.directory = pathString;
    } else {
      this.directory = parsed.dir + "/";
    }

    this.filename = parsed.base;
    this.extension = parsed.ext.slice(1);
  }
  /**
   * Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
   * @param	{string} what
   * @returns {object}
   */


  path_createClass(Path, [{
    key: "parse",
    value: function parse(what) {
      return path_default().parse(what);
    }
    /**
     * @param	{string} what
     * @returns {boolean}
     */

  }, {
    key: "isAbsolute",
    value: function isAbsolute(what) {
      return path_default().isAbsolute(what || this.path);
    }
    /**
     * Check if path ends with a directory
     * @param	{string} what
     * @returns {boolean}
     */

  }, {
    key: "isDirectory",
    value: function isDirectory(what) {
      return what.charAt(what.length - 1) === "/";
    }
    /**
     * Resolve a path against the directory of the Path
     *
     * https://nodejs.org/api/path.html#path_path_resolve_paths
     * @param	{string} what
     * @returns {string} resolved
     */

  }, {
    key: "resolve",
    value: function resolve(what) {
      return path_default().resolve(this.directory, what);
    }
    /**
     * Resolve a path relative to the directory of the Path
     *
     * https://nodejs.org/api/path.html#path_path_relative_from_to
     * @param	{string} what
     * @returns {string} relative
     */

  }, {
    key: "relative",
    value: function relative(what) {
      var isAbsolute = what && what.indexOf("://") > -1;

      if (isAbsolute) {
        return what;
      }

      return path_default().relative(this.directory, what);
    }
  }, {
    key: "splitPath",
    value: function splitPath(filename) {
      return this.splitPathRe.exec(filename).slice(1);
    }
    /**
     * Return the path string
     * @returns {string} path
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.path;
    }
  }]);

  return Path;
}();

/* harmony default export */ const utils_path = (Path);
;// CONCATENATED MODULE: ./src/utils/url.js









function url_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function url_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function url_createClass(Constructor, protoProps, staticProps) { if (protoProps) url_defineProperties(Constructor.prototype, protoProps); if (staticProps) url_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * creates a Url object for parsing and manipulation of a url string
 * @param	{string} urlString	a url string (relative or absolute)
 * @param	{string} [baseString] optional base for the url,
 * default to window.location.href
 */

var Url = /*#__PURE__*/function () {
  function Url(urlString, baseString) {
    url_classCallCheck(this, Url);

    var absolute = urlString.indexOf("://") > -1;
    var pathname = urlString;
    var basePath;
    this.Url = undefined;
    this.href = urlString;
    this.protocol = "";
    this.origin = "";
    this.hash = "";
    this.hash = "";
    this.search = "";
    this.base = baseString;

    if (!absolute && baseString !== false && typeof baseString !== "string" && window && window.location) {
      this.base = window.location.href;
    } // URL Polyfill doesn't throw an error if base is empty


    if (absolute || this.base) {
      try {
        if (this.base) {
          // Safari doesn't like an undefined base
          this.Url = new URL(urlString, this.base);
        } else {
          this.Url = new URL(urlString);
        }

        this.href = this.Url.href;
        this.protocol = this.Url.protocol;
        this.origin = this.Url.origin;
        this.hash = this.Url.hash;
        this.search = this.Url.search;
        pathname = this.Url.pathname + (this.Url.search ? this.Url.search : '');
      } catch (e) {
        // Skip URL parsing
        this.Url = undefined; // resolve the pathname from the base

        if (this.base) {
          basePath = new utils_path(this.base);
          pathname = basePath.resolve(pathname);
        }
      }
    }

    this.Path = new utils_path(pathname);
    this.directory = this.Path.directory;
    this.filename = this.Path.filename;
    this.extension = this.Path.extension;
  }
  /**
   * @returns {Path}
   */


  url_createClass(Url, [{
    key: "path",
    value: function path() {
      return this.Path;
    }
    /**
     * Resolves a relative path to a absolute url
     * @param {string} what
     * @returns {string} url
     */

  }, {
    key: "resolve",
    value: function resolve(what) {
      var isAbsolute = what.indexOf("://") > -1;
      var fullpath;

      if (isAbsolute) {
        return what;
      }

      fullpath = path_default().resolve(this.directory, what);
      return this.origin + fullpath;
    }
    /**
     * Resolve a path relative to the url
     * @param {string} what
     * @returns {string} path
     */

  }, {
    key: "relative",
    value: function relative(what) {
      return path_default().relative(what, this.directory);
    }
    /**
     * @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.href;
    }
  }]);

  return Url;
}();

/* harmony default export */ const utils_url = (Url);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(3123);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(1249);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(4723);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(9600);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(1817);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(2165);
;// CONCATENATED MODULE: ./src/epubcfi.js


















function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function epubcfi_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function epubcfi_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function epubcfi_createClass(Constructor, protoProps, staticProps) { if (protoProps) epubcfi_defineProperties(Constructor.prototype, protoProps); if (staticProps) epubcfi_defineProperties(Constructor, staticProps); return Constructor; }


var epubcfi_ELEMENT_NODE = 1;
var epubcfi_TEXT_NODE = 3;
var epubcfi_COMMENT_NODE = 8;
var epubcfi_DOCUMENT_NODE = 9;
/**
	* Parsing and creation of EpubCFIs: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

	* Implements:
	* - Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
	* - Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

	* Does Not Implement:
	* - Temporal Offset (~)
	* - Spatial Offset (@)
	* - Temporal-Spatial Offset (~ + @)
	* - Text Location Assertion ([)
	* @class
	@param {string | Range | Node } [cfiFrom]
	@param {string | object} [base]
	@param {string} [ignoreClass] class to ignore when parsing DOM
*/

var EpubCFI = /*#__PURE__*/function () {
  function EpubCFI(cfiFrom, base, ignoreClass) {
    epubcfi_classCallCheck(this, EpubCFI);

    var type;
    this.str = "";
    this.base = {};
    this.spinePos = 0; // For compatibility

    this.range = false; // true || false;

    this.path = {};
    this.start = null;
    this.end = null; // Allow instantiation without the "new" keyword

    if (!(this instanceof EpubCFI)) {
      return new EpubCFI(cfiFrom, base, ignoreClass);
    }

    if (typeof base === "string") {
      this.base = this.parseComponent(base);
    } else if (_typeof(base) === "object" && base.steps) {
      this.base = base;
    }

    type = this.checkType(cfiFrom);

    if (type === "string") {
      this.str = cfiFrom;
      return extend(this, this.parse(cfiFrom));
    } else if (type === "range") {
      return extend(this, this.fromRange(cfiFrom, this.base, ignoreClass));
    } else if (type === "node") {
      return extend(this, this.fromNode(cfiFrom, this.base, ignoreClass));
    } else if (type === "EpubCFI" && cfiFrom.path) {
      return cfiFrom;
    } else if (!cfiFrom) {
      return this;
    } else {
      throw new TypeError("not a valid argument for EpubCFI");
    }
  }
  /**
   * Check the type of constructor input
   * @private
   */


  epubcfi_createClass(EpubCFI, [{
    key: "checkType",
    value: function checkType(cfi) {
      if (this.isCfiString(cfi)) {
        return "string"; // Is a range object
      } else if (cfi && _typeof(cfi) === "object" && (type(cfi) === "Range" || typeof cfi.startContainer != "undefined")) {
        return "range";
      } else if (cfi && _typeof(cfi) === "object" && typeof cfi.nodeType != "undefined") {
        // || typeof cfi === "function"
        return "node";
      } else if (cfi && _typeof(cfi) === "object" && cfi instanceof EpubCFI) {
        return "EpubCFI";
      } else {
        return false;
      }
    }
    /**
     * Parse a cfi string to a CFI object representation
     * @param {string} cfiStr
     * @returns {object} cfi
     */

  }, {
    key: "parse",
    value: function parse(cfiStr) {
      var cfi = {
        spinePos: -1,
        range: false,
        base: {},
        path: {},
        start: null,
        end: null
      };
      var baseComponent, pathComponent, range;

      if (typeof cfiStr !== "string") {
        return {
          spinePos: -1
        };
      }

      if (cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length - 1] === ")") {
        // Remove intial epubcfi( and ending )
        cfiStr = cfiStr.slice(8, cfiStr.length - 1);
      }

      baseComponent = this.getChapterComponent(cfiStr); // Make sure this is a valid cfi or return

      if (!baseComponent) {
        return {
          spinePos: -1
        };
      }

      cfi.base = this.parseComponent(baseComponent);
      pathComponent = this.getPathComponent(cfiStr);
      cfi.path = this.parseComponent(pathComponent);
      range = this.getRange(cfiStr);

      if (range) {
        cfi.range = true;
        cfi.start = this.parseComponent(range[0]);
        cfi.end = this.parseComponent(range[1]);
      } // Get spine node position
      // cfi.spineSegment = cfi.base.steps[1];
      // Chapter segment is always the second step


      cfi.spinePos = cfi.base.steps[1].index;
      return cfi;
    }
  }, {
    key: "parseComponent",
    value: function parseComponent(componentStr) {
      var component = {
        steps: [],
        terminal: {
          offset: null,
          assertion: null
        }
      };
      var parts = componentStr.split(":");
      var steps = parts[0].split("/");
      var terminal;

      if (parts.length > 1) {
        terminal = parts[1];
        component.terminal = this.parseTerminal(terminal);
      }

      if (steps[0] === "") {
        steps.shift(); // Ignore the first slash
      }

      component.steps = steps.map(function (step) {
        return this.parseStep(step);
      }.bind(this));
      return component;
    }
  }, {
    key: "parseStep",
    value: function parseStep(stepStr) {
      var type, num, index, has_brackets, id;
      has_brackets = stepStr.match(/\[(.*)\]/);

      if (has_brackets && has_brackets[1]) {
        id = has_brackets[1];
      } //-- Check if step is a text node or element


      num = parseInt(stepStr);

      if (isNaN(num)) {
        return;
      }

      if (num % 2 === 0) {
        // Even = is an element
        type = "element";
        index = num / 2 - 1;
      } else {
        type = "text";
        index = (num - 1) / 2;
      }

      return {
        "type": type,
        "index": index,
        "id": id || null
      };
    }
  }, {
    key: "parseTerminal",
    value: function parseTerminal(termialStr) {
      var characterOffset, textLocationAssertion;
      var assertion = termialStr.match(/\[(.*)\]/);

      if (assertion && assertion[1]) {
        characterOffset = parseInt(termialStr.split("[")[0]);
        textLocationAssertion = assertion[1];
      } else {
        characterOffset = parseInt(termialStr);
      }

      if (!isNumber(characterOffset)) {
        characterOffset = null;
      }

      return {
        "offset": characterOffset,
        "assertion": textLocationAssertion
      };
    }
  }, {
    key: "getChapterComponent",
    value: function getChapterComponent(cfiStr) {
      var indirection = cfiStr.split("!");
      return indirection[0];
    }
  }, {
    key: "getPathComponent",
    value: function getPathComponent(cfiStr) {
      var indirection = cfiStr.split("!");

      if (indirection[1]) {
        var ranges = indirection[1].split(",");
        return ranges[0];
      }
    }
  }, {
    key: "getRange",
    value: function getRange(cfiStr) {
      var ranges = cfiStr.split(",");

      if (ranges.length === 3) {
        return [ranges[1], ranges[2]];
      }

      return false;
    }
  }, {
    key: "getCharecterOffsetComponent",
    value: function getCharecterOffsetComponent(cfiStr) {
      var splitStr = cfiStr.split(":");
      return splitStr[1] || "";
    }
  }, {
    key: "joinSteps",
    value: function joinSteps(steps) {
      if (!steps) {
        return "";
      }

      return steps.map(function (part) {
        var segment = "";

        if (part.type === "element") {
          segment += (part.index + 1) * 2;
        }

        if (part.type === "text") {
          segment += 1 + 2 * part.index; // TODO: double check that this is odd
        }

        if (part.id) {
          segment += "[" + part.id + "]";
        }

        return segment;
      }).join("/");
    }
  }, {
    key: "segmentString",
    value: function segmentString(segment) {
      var segmentString = "/";
      segmentString += this.joinSteps(segment.steps);

      if (segment.terminal && segment.terminal.offset != null) {
        segmentString += ":" + segment.terminal.offset;
      }

      if (segment.terminal && segment.terminal.assertion != null) {
        segmentString += "[" + segment.terminal.assertion + "]";
      }

      return segmentString;
    }
    /**
     * Convert CFI to a epubcfi(...) string
     * @returns {string} epubcfi
     */

  }, {
    key: "toString",
    value: function toString() {
      var cfiString = "epubcfi(";
      cfiString += this.segmentString(this.base);
      cfiString += "!";
      cfiString += this.segmentString(this.path); // Add Range, if present

      if (this.range && this.start) {
        cfiString += ",";
        cfiString += this.segmentString(this.start);
      }

      if (this.range && this.end) {
        cfiString += ",";
        cfiString += this.segmentString(this.end);
      }

      cfiString += ")";
      return cfiString;
    }
    /**
     * Compare which of two CFIs is earlier in the text
     * @returns {number} First is earlier = -1, Second is earlier = 1, They are equal = 0
     */

  }, {
    key: "compare",
    value: function compare(cfiOne, cfiTwo) {
      var stepsA, stepsB;
      var terminalA, terminalB;
      var rangeAStartSteps, rangeAEndSteps;
      var rangeBEndSteps, rangeBEndSteps;
      var rangeAStartTerminal, rangeAEndTerminal;
      var rangeBStartTerminal, rangeBEndTerminal;

      if (typeof cfiOne === "string") {
        cfiOne = new EpubCFI(cfiOne);
      }

      if (typeof cfiTwo === "string") {
        cfiTwo = new EpubCFI(cfiTwo);
      } // Compare Spine Positions


      if (cfiOne.spinePos > cfiTwo.spinePos) {
        return 1;
      }

      if (cfiOne.spinePos < cfiTwo.spinePos) {
        return -1;
      }

      if (cfiOne.range) {
        stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
        terminalA = cfiOne.start.terminal;
      } else {
        stepsA = cfiOne.path.steps;
        terminalA = cfiOne.path.terminal;
      }

      if (cfiTwo.range) {
        stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
        terminalB = cfiTwo.start.terminal;
      } else {
        stepsB = cfiTwo.path.steps;
        terminalB = cfiTwo.path.terminal;
      } // Compare Each Step in the First item


      for (var i = 0; i < stepsA.length; i++) {
        if (!stepsA[i]) {
          return -1;
        }

        if (!stepsB[i]) {
          return 1;
        }

        if (stepsA[i].index > stepsB[i].index) {
          return 1;
        }

        if (stepsA[i].index < stepsB[i].index) {
          return -1;
        } // Otherwise continue checking

      } // All steps in First equal to Second and First is Less Specific


      if (stepsA.length < stepsB.length) {
        return -1;
      } // Compare the charecter offset of the text node


      if (terminalA.offset > terminalB.offset) {
        return 1;
      }

      if (terminalA.offset < terminalB.offset) {
        return -1;
      } // CFI's are equal


      return 0;
    }
  }, {
    key: "step",
    value: function step(node) {
      var nodeType = node.nodeType === epubcfi_TEXT_NODE ? "text" : "element";
      return {
        "id": node.id,
        "tagName": node.tagName,
        "type": nodeType,
        "index": this.position(node)
      };
    }
  }, {
    key: "filteredStep",
    value: function filteredStep(node, ignoreClass) {
      var filteredNode = this.filter(node, ignoreClass);
      var nodeType; // Node filtered, so ignore

      if (!filteredNode) {
        return;
      } // Otherwise add the filter node in


      nodeType = filteredNode.nodeType === epubcfi_TEXT_NODE ? "text" : "element";
      return {
        "id": filteredNode.id,
        "tagName": filteredNode.tagName,
        "type": nodeType,
        "index": this.filteredPosition(filteredNode, ignoreClass)
      };
    }
  }, {
    key: "pathTo",
    value: function pathTo(node, offset, ignoreClass) {
      var segment = {
        steps: [],
        terminal: {
          offset: null,
          assertion: null
        }
      };
      var currentNode = node;
      var step;

      while (currentNode && currentNode.parentNode && currentNode.parentNode.nodeType != epubcfi_DOCUMENT_NODE) {
        if (ignoreClass) {
          step = this.filteredStep(currentNode, ignoreClass);
        } else {
          step = this.step(currentNode);
        }

        if (step) {
          segment.steps.unshift(step);
        }

        currentNode = currentNode.parentNode;
      }

      if (offset != null && offset >= 0) {
        segment.terminal.offset = offset; // Make sure we are getting to a textNode if there is an offset

        if (segment.steps[segment.steps.length - 1].type != "text") {
          segment.steps.push({
            "type": "text",
            "index": 0
          });
        }
      }

      return segment;
    }
  }, {
    key: "equalStep",
    value: function equalStep(stepA, stepB) {
      if (!stepA || !stepB) {
        return false;
      }

      if (stepA.index === stepB.index && stepA.id === stepB.id && stepA.type === stepB.type) {
        return true;
      }

      return false;
    }
    /**
     * Create a CFI object from a Range
     * @param {Range} range
     * @param {string | object} base
     * @param {string} [ignoreClass]
     * @returns {object} cfi
     */

  }, {
    key: "fromRange",
    value: function fromRange(range, base, ignoreClass) {
      var cfi = {
        range: false,
        base: {},
        path: {},
        start: null,
        end: null
      };
      var start = range.startContainer;
      var end = range.endContainer;
      var startOffset = range.startOffset;
      var endOffset = range.endOffset;
      var needsIgnoring = false;

      if (ignoreClass) {
        // Tell pathTo if / what to ignore
        needsIgnoring = start.ownerDocument.querySelector("." + ignoreClass) != null;
      }

      if (typeof base === "string") {
        cfi.base = this.parseComponent(base);
        cfi.spinePos = cfi.base.steps[1].index;
      } else if (_typeof(base) === "object") {
        cfi.base = base;
      }

      if (range.collapsed) {
        if (needsIgnoring) {
          startOffset = this.patchOffset(start, startOffset, ignoreClass);
        }

        cfi.path = this.pathTo(start, startOffset, ignoreClass);
      } else {
        cfi.range = true;

        if (needsIgnoring) {
          startOffset = this.patchOffset(start, startOffset, ignoreClass);
        }

        cfi.start = this.pathTo(start, startOffset, ignoreClass);

        if (needsIgnoring) {
          endOffset = this.patchOffset(end, endOffset, ignoreClass);
        }

        cfi.end = this.pathTo(end, endOffset, ignoreClass); // Create a new empty path

        cfi.path = {
          steps: [],
          terminal: null
        }; // Push steps that are shared between start and end to the common path

        var len = cfi.start.steps.length;
        var i;

        for (i = 0; i < len; i++) {
          if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
            if (i === len - 1) {
              // Last step is equal, check terminals
              if (cfi.start.terminal === cfi.end.terminal) {
                // CFI's are equal
                cfi.path.steps.push(cfi.start.steps[i]); // Not a range

                cfi.range = false;
              }
            } else {
              cfi.path.steps.push(cfi.start.steps[i]);
            }
          } else {
            break;
          }
        }

        cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
        cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length); // TODO: Add Sanity check to make sure that the end if greater than the start
      }

      return cfi;
    }
    /**
     * Create a CFI object from a Node
     * @param {Node} anchor
     * @param {string | object} base
     * @param {string} [ignoreClass]
     * @returns {object} cfi
     */

  }, {
    key: "fromNode",
    value: function fromNode(anchor, base, ignoreClass) {
      var cfi = {
        range: false,
        base: {},
        path: {},
        start: null,
        end: null
      };

      if (typeof base === "string") {
        cfi.base = this.parseComponent(base);
        cfi.spinePos = cfi.base.steps[1].index;
      } else if (_typeof(base) === "object") {
        cfi.base = base;
      }

      cfi.path = this.pathTo(anchor, null, ignoreClass);
      return cfi;
    }
  }, {
    key: "filter",
    value: function filter(anchor, ignoreClass) {
      var needsIgnoring;
      var sibling; // to join with

      var parent, previousSibling, nextSibling;
      var isText = false;

      if (anchor.nodeType === epubcfi_TEXT_NODE) {
        isText = true;
        parent = anchor.parentNode;
        needsIgnoring = anchor.parentNode.classList.contains(ignoreClass);
      } else {
        isText = false;
        needsIgnoring = anchor.classList.contains(ignoreClass);
      }

      if (needsIgnoring && isText) {
        previousSibling = parent.previousSibling;
        nextSibling = parent.nextSibling; // If the sibling is a text node, join the nodes

        if (previousSibling && previousSibling.nodeType === epubcfi_TEXT_NODE) {
          sibling = previousSibling;
        } else if (nextSibling && nextSibling.nodeType === epubcfi_TEXT_NODE) {
          sibling = nextSibling;
        }

        if (sibling) {
          return sibling;
        } else {
          // Parent will be ignored on next step
          return anchor;
        }
      } else if (needsIgnoring && !isText) {
        // Otherwise just skip the element node
        return false;
      } else {
        // No need to filter
        return anchor;
      }
    }
  }, {
    key: "patchOffset",
    value: function patchOffset(anchor, offset, ignoreClass) {
      if (anchor.nodeType != epubcfi_TEXT_NODE) {
        throw new Error("Anchor must be a text node");
      }

      var curr = anchor;
      var totalOffset = offset; // If the parent is a ignored node, get offset from it's start

      if (anchor.parentNode.classList.contains(ignoreClass)) {
        curr = anchor.parentNode;
      }

      while (curr.previousSibling) {
        if (curr.previousSibling.nodeType === epubcfi_ELEMENT_NODE) {
          // Originally a text node, so join
          if (curr.previousSibling.classList.contains(ignoreClass)) {
            totalOffset += curr.previousSibling.textContent.length;
          } else {
            break; // Normal node, dont join
          }
        } else {
          // If the previous sibling is a text node, join the nodes
          totalOffset += curr.previousSibling.textContent.length;
        }

        curr = curr.previousSibling;
      }

      return totalOffset;
    }
  }, {
    key: "normalizedMap",
    value: function normalizedMap(children, nodeType, ignoreClass) {
      var output = {};
      var prevIndex = -1;
      var i,
          len = children.length;
      var currNodeType;
      var prevNodeType;

      for (i = 0; i < len; i++) {
        currNodeType = children[i].nodeType; // Check if needs ignoring

        if (currNodeType === epubcfi_ELEMENT_NODE && children[i].classList.contains(ignoreClass)) {
          currNodeType = epubcfi_TEXT_NODE;
        }

        if (i > 0 && currNodeType === epubcfi_TEXT_NODE && prevNodeType === epubcfi_TEXT_NODE) {
          // join text nodes
          output[i] = prevIndex;
        } else if (nodeType === currNodeType) {
          prevIndex = prevIndex + 1;
          output[i] = prevIndex;
        }

        prevNodeType = currNodeType;
      }

      return output;
    }
  }, {
    key: "position",
    value: function position(anchor) {
      var children, index;

      if (anchor.nodeType === epubcfi_ELEMENT_NODE) {
        children = anchor.parentNode.children;

        if (!children) {
          children = findChildren(anchor.parentNode);
        }

        index = Array.prototype.indexOf.call(children, anchor);
      } else {
        children = this.textNodes(anchor.parentNode);
        index = children.indexOf(anchor);
      }

      return index;
    }
  }, {
    key: "filteredPosition",
    value: function filteredPosition(anchor, ignoreClass) {
      var children, index, map;

      if (anchor.nodeType === epubcfi_ELEMENT_NODE) {
        children = anchor.parentNode.children;
        map = this.normalizedMap(children, epubcfi_ELEMENT_NODE, ignoreClass);
      } else {
        children = anchor.parentNode.childNodes; // Inside an ignored node

        if (anchor.parentNode.classList.contains(ignoreClass)) {
          anchor = anchor.parentNode;
          children = anchor.parentNode.childNodes;
        }

        map = this.normalizedMap(children, epubcfi_TEXT_NODE, ignoreClass);
      }

      index = Array.prototype.indexOf.call(children, anchor);
      return map[index];
    }
  }, {
    key: "stepsToXpath",
    value: function stepsToXpath(steps) {
      var xpath = [".", "*"];
      steps.forEach(function (step) {
        var position = step.index + 1;

        if (step.id) {
          xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
        } else if (step.type === "text") {
          xpath.push("text()[" + position + "]");
        } else {
          xpath.push("*[" + position + "]");
        }
      });
      return xpath.join("/");
    }
    /*
    	To get the last step if needed:
    	// Get the terminal step
    lastStep = steps[steps.length-1];
    // Get the query string
    query = this.stepsToQuery(steps);
    // Find the containing element
    startContainerParent = doc.querySelector(query);
    // Find the text node within that element
    if(startContainerParent && lastStep.type == "text") {
    	container = startContainerParent.childNodes[lastStep.index];
    }
    */

  }, {
    key: "stepsToQuerySelector",
    value: function stepsToQuerySelector(steps) {
      var query = ["html"];
      steps.forEach(function (step) {
        var position = step.index + 1;

        if (step.id) {
          query.push("#" + step.id);
        } else if (step.type === "text") {// unsupported in querySelector
          // query.push("text()[" + position + "]");
        } else {
          query.push("*:nth-child(" + position + ")");
        }
      });
      return query.join(">");
    }
  }, {
    key: "textNodes",
    value: function textNodes(container, ignoreClass) {
      return Array.prototype.slice.call(container.childNodes).filter(function (node) {
        if (node.nodeType === epubcfi_TEXT_NODE) {
          return true;
        } else if (ignoreClass && node.classList.contains(ignoreClass)) {
          return true;
        }

        return false;
      });
    }
  }, {
    key: "walkToNode",
    value: function walkToNode(steps, _doc, ignoreClass) {
      var doc = _doc || document;
      var container = doc.documentElement;
      var children;
      var step;
      var len = steps.length;
      var i;

      for (i = 0; i < len; i++) {
        step = steps[i];

        if (step.type === "element") {
          //better to get a container using id as some times step.index may not be correct
          //For ex.https://github.com/futurepress/epub.js/issues/561
          if (step.id) {
            container = doc.getElementById(step.id);
          } else {
            children = container.children || findChildren(container);
            container = children[step.index];
          }
        } else if (step.type === "text") {
          container = this.textNodes(container, ignoreClass)[step.index];
        }

        if (!container) {
          //Break the for loop as due to incorrect index we can get error if
          //container is undefined so that other functionailties works fine
          //like navigation
          break;
        }
      }

      return container;
    }
  }, {
    key: "findNode",
    value: function findNode(steps, _doc, ignoreClass) {
      var doc = _doc || document;
      var container;
      var xpath;

      if (!ignoreClass && typeof doc.evaluate != "undefined") {
        xpath = this.stepsToXpath(steps);
        container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } else if (ignoreClass) {
        container = this.walkToNode(steps, doc, ignoreClass);
      } else {
        container = this.walkToNode(steps, doc);
      }

      return container;
    }
  }, {
    key: "fixMiss",
    value: function fixMiss(steps, offset, _doc, ignoreClass) {
      var container = this.findNode(steps.slice(0, -1), _doc, ignoreClass);
      var children = container.childNodes;
      var map = this.normalizedMap(children, epubcfi_TEXT_NODE, ignoreClass);
      var child;
      var len;
      var lastStepIndex = steps[steps.length - 1].index;

      for (var childIndex in map) {
        if (!map.hasOwnProperty(childIndex)) return;

        if (map[childIndex] === lastStepIndex) {
          child = children[childIndex];
          len = child.textContent.length;

          if (offset > len) {
            offset = offset - len;
          } else {
            if (child.nodeType === epubcfi_ELEMENT_NODE) {
              container = child.childNodes[0];
            } else {
              container = child;
            }

            break;
          }
        }
      }

      return {
        container: container,
        offset: offset
      };
    }
    /**
     * Creates a DOM range representing a CFI
     * @param {document} _doc document referenced in the base
     * @param {string} [ignoreClass]
     * @return {Range}
     */

  }, {
    key: "toRange",
    value: function toRange(_doc, ignoreClass) {
      var doc = _doc || document;
      var range;
      var start, end, startContainer, endContainer;
      var cfi = this;
      var startSteps, endSteps;
      var needsIgnoring = ignoreClass ? doc.querySelector("." + ignoreClass) != null : false;
      var missed;

      if (typeof doc.createRange !== "undefined") {
        range = doc.createRange();
      } else {
        range = new RangeObject();
      }

      if (cfi.range) {
        start = cfi.start;
        startSteps = cfi.path.steps.concat(start.steps);
        startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
        end = cfi.end;
        endSteps = cfi.path.steps.concat(end.steps);
        endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
      } else {
        start = cfi.path;
        startSteps = cfi.path.steps;
        startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
      }

      if (startContainer) {
        try {
          if (start.terminal.offset != null) {
            range.setStart(startContainer, start.terminal.offset);
          } else {
            range.setStart(startContainer, 0);
          }
        } catch (e) {
          missed = this.fixMiss(startSteps, start.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
          range.setStart(missed.container, missed.offset);
        }
      } else {
        console.log("No startContainer found for", this.toString()); // No start found

        return null;
      }

      if (endContainer) {
        try {
          if (end.terminal.offset != null) {
            range.setEnd(endContainer, end.terminal.offset);
          } else {
            range.setEnd(endContainer, 0);
          }
        } catch (e) {
          missed = this.fixMiss(endSteps, cfi.end.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
          range.setEnd(missed.container, missed.offset);
        }
      } // doc.defaultView.getSelection().addRange(range);


      return range;
    }
    /**
     * Check if a string is wrapped with "epubcfi()"
     * @param {string} str
     * @returns {boolean}
     */

  }, {
    key: "isCfiString",
    value: function isCfiString(str) {
      if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") {
        return true;
      }

      return false;
    }
  }, {
    key: "generateChapterComponent",
    value: function generateChapterComponent(_spineNodeIndex, _pos, id) {
      var pos = parseInt(_pos),
          spineNodeIndex = (_spineNodeIndex + 1) * 2,
          cfi = "/" + spineNodeIndex + "/";
      cfi += (pos + 1) * 2;

      if (id) {
        cfi += "[" + id + "]";
      }

      return cfi;
    }
    /**
     * Collapse a CFI Range to a single CFI Position
     * @param {boolean} [toStart=false]
     */

  }, {
    key: "collapse",
    value: function collapse(toStart) {
      if (!this.range) {
        return;
      }

      this.range = false;

      if (toStart) {
        this.path.steps = this.path.steps.concat(this.start.steps);
        this.path.terminal = this.start.terminal;
      } else {
        this.path.steps = this.path.steps.concat(this.end.steps);
        this.path.terminal = this.end.terminal;
      }
    }
  }]);

  return EpubCFI;
}();

/* harmony default export */ const epubcfi = (EpubCFI);
;// CONCATENATED MODULE: ./src/utils/hook.js








function hook_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function hook_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function hook_createClass(Constructor, protoProps, staticProps) { if (protoProps) hook_defineProperties(Constructor.prototype, protoProps); if (staticProps) hook_defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Hooks allow for injecting functions that must all complete in order before finishing
 * They will execute in parallel but all must finish before continuing
 * Functions may return a promise if they are asycn.
 * @param {any} context scope of this
 * @example this.content = new EPUBJS.Hook(this);
 */
var Hook = /*#__PURE__*/function () {
  function Hook(context) {
    hook_classCallCheck(this, Hook);

    this.context = context || this;
    this.hooks = [];
  }
  /**
   * Adds a function to be run before a hook completes
   * @example this.content.register(function(){...});
   */


  hook_createClass(Hook, [{
    key: "register",
    value: function register() {
      for (var i = 0; i < arguments.length; ++i) {
        if (typeof arguments[i] === "function") {
          this.hooks.push(arguments[i]);
        } else {
          // unpack array
          for (var j = 0; j < arguments[i].length; ++j) {
            this.hooks.push(arguments[i][j]);
          }
        }
      }
    }
    /**
     * Removes a function
     * @example this.content.deregister(function(){...});
     */

  }, {
    key: "deregister",
    value: function deregister(func) {
      var hook;

      for (var i = 0; i < this.hooks.length; i++) {
        hook = this.hooks[i];

        if (hook === func) {
          this.hooks.splice(i, 1);
          break;
        }
      }
    }
    /**
     * Triggers a hook to run all functions
     * @example this.content.trigger(args).then(function(){...});
     */

  }, {
    key: "trigger",
    value: function trigger() {
      var args = arguments;
      var context = this.context;
      var promises = [];
      this.hooks.forEach(function (task) {
        try {
          var executing = task.apply(context, args);
        } catch (err) {
          console.log(err);
        }

        if (executing && typeof executing["then"] === "function") {
          // Task is a function that returns a promise
          promises.push(executing);
        } // Otherwise Task resolves immediately, continue

      });
      return Promise.all(promises);
    } // Adds a function to be run before a hook completes

  }, {
    key: "list",
    value: function list() {
      return this.hooks;
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.hooks = [];
    }
  }]);

  return Hook;
}();

/* harmony default export */ const hook = (Hook);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(9826);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__(4603);
;// CONCATENATED MODULE: ./src/utils/replacements.js








function replaceBase(doc, section) {
  var base;
  var head;
  var url = section.url;
  var absolute = url.indexOf("://") > -1;

  if (!doc) {
    return;
  }

  head = qs(doc, "head");
  base = qs(head, "base");

  if (!base) {
    base = doc.createElement("base");
    head.insertBefore(base, head.firstChild);
  } // Fix for Safari crashing if the url doesn't have an origin


  if (!absolute && window && window.location) {
    url = window.location.origin + url;
  }

  base.setAttribute("href", url);
}
function replaceCanonical(doc, section) {
  var head;
  var link;
  var url = section.canonical;

  if (!doc) {
    return;
  }

  head = qs(doc, "head");
  link = qs(head, "link[rel='canonical']");

  if (link) {
    link.setAttribute("href", url);
  } else {
    link = doc.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", url);
    head.appendChild(link);
  }
}
function replaceMeta(doc, section) {
  var head;
  var meta;
  var id = section.idref;

  if (!doc) {
    return;
  }

  head = qs(doc, "head");
  meta = qs(head, "link[property='dc.identifier']");

  if (meta) {
    meta.setAttribute("content", id);
  } else {
    meta = doc.createElement("meta");
    meta.setAttribute("name", "dc.identifier");
    meta.setAttribute("content", id);
    head.appendChild(meta);
  }
} // TODO: move me to Contents

function replaceLinks(contents, fn) {
  var links = contents.querySelectorAll("a[href]");

  if (!links.length) {
    return;
  }

  var base = qs(contents.ownerDocument, "base");
  var location = base ? base.getAttribute("href") : undefined;

  var replaceLink = function (link) {
    var href = link.getAttribute("href");

    if (href.indexOf("mailto:") === 0) {
      return;
    }

    var absolute = href.indexOf("://") > -1;

    if (absolute) {
      link.setAttribute("target", "_blank");
    } else {
      var linkUrl;

      try {
        linkUrl = new utils_url(href, location);
      } catch (error) {// NOOP
      }

      link.onclick = function () {
        if (linkUrl && linkUrl.hash) {
          fn(linkUrl.Path.path + linkUrl.hash);
        } else if (linkUrl) {
          fn(linkUrl.Path.path);
        } else {
          fn(href);
        }

        return false;
      };
    }
  }.bind(this);

  for (var i = 0; i < links.length; i++) {
    replaceLink(links[i]);
  }
}
function replacements_substitute(content, urls, replacements) {
  urls.forEach(function (url, i) {
    if (url && replacements[i]) {
      // Account for special characters in the file name.
      // See https://stackoverflow.com/a/6318729.
      url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      content = content.replace(new RegExp(url, "g"), replacements[i]);
    }
  });
  return content;
}
;// CONCATENATED MODULE: ./src/utils/request.js









function request(url, type, withCredentials, headers) {
  var supportsURL = typeof window != "undefined" ? window.URL : false; // TODO: fallback for url if window isn't defined

  var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";
  var deferred = new defer();
  var xhr = new XMLHttpRequest(); //-- Check from PDF.js:
  //   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js

  var xhrPrototype = XMLHttpRequest.prototype;
  var header;

  if (!("overrideMimeType" in xhrPrototype)) {
    // IE10 might have response, but not overrideMimeType
    Object.defineProperty(xhrPrototype, "overrideMimeType", {
      value: function xmlHttpRequestOverrideMimeType() {}
    });
  }

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.onreadystatechange = handler;
  xhr.onerror = err;
  xhr.open("GET", url, true);

  for (header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }

  if (type == "json") {
    xhr.setRequestHeader("Accept", "application/json");
  } // If type isn"t set, determine it from the file extension


  if (!type) {
    type = new utils_path(url).extension;
  }

  if (type == "blob") {
    xhr.responseType = BLOB_RESPONSE;
  }

  if (isXml(type)) {
    // xhr.responseType = "document";
    xhr.overrideMimeType("text/xml"); // for OPF parsing
  }

  if (type == "xhtml") {// xhr.responseType = "document";
  }

  if (type == "html" || type == "htm") {// xhr.responseType = "document";
  }

  if (type == "binary") {
    xhr.responseType = "arraybuffer";
  }

  xhr.send();

  function err(e) {
    deferred.reject(e);
  }

  function handler() {
    if (this.readyState === XMLHttpRequest.DONE) {
      var responseXML = false;

      if (this.responseType === "" || this.responseType === "document") {
        responseXML = this.responseXML;
      }

      if (this.status === 200 || this.status === 0 || responseXML) {
        //-- Firefox is reporting 0 for blob urls
        var r;

        if (!this.response && !responseXML) {
          deferred.reject({
            status: this.status,
            message: "Empty Response",
            stack: new Error().stack
          });
          return deferred.promise;
        }

        if (this.status === 403) {
          deferred.reject({
            status: this.status,
            response: this.response,
            message: "Forbidden",
            stack: new Error().stack
          });
          return deferred.promise;
        }

        if (responseXML) {
          r = this.responseXML;
        } else if (isXml(type)) {
          // xhr.overrideMimeType("text/xml"); // for OPF parsing
          // If this.responseXML wasn't set, try to parse using a DOMParser from text
          r = parse(this.response, "text/xml");
        } else if (type == "xhtml") {
          r = parse(this.response, "application/xhtml+xml");
        } else if (type == "html" || type == "htm") {
          r = parse(this.response, "text/html");
        } else if (type == "json") {
          r = JSON.parse(this.response);
        } else if (type == "blob") {
          if (supportsURL) {
            r = this.response;
          } else {
            //-- Safari doesn't support responseType blob, so create a blob from arraybuffer
            r = new Blob([this.response]);
          }
        } else {
          r = this.response;
        }

        deferred.resolve(r);
      } else {
        deferred.reject({
          status: this.status,
          message: this.response,
          stack: new Error().stack
        });
      }
    }
  }

  return deferred.promise;
}

/* harmony default export */ const utils_request = (request);
;// CONCATENATED MODULE: ./src/section.js








function section_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function section_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function section_createClass(Constructor, protoProps, staticProps) { if (protoProps) section_defineProperties(Constructor.prototype, protoProps); if (staticProps) section_defineProperties(Constructor, staticProps); return Constructor; }








/**
 * Represents a Section of the Book
 *
 * In most books this is equivelent to a Chapter
 * @param {object} item  The spine item representing the section
 * @param {object} hooks hooks for serialize and content
 */

var Section = /*#__PURE__*/function () {
  function Section(item, hooks) {
    section_classCallCheck(this, Section);

    this.idref = item.idref;
    this.linear = item.linear === "yes";
    this.properties = item.properties;
    this.index = item.index;
    this.href = item.href;
    this.url = item.url;
    this.canonical = item.canonical;
    this.next = item.next;
    this.prev = item.prev;
    this.cfiBase = item.cfiBase;

    if (hooks) {
      this.hooks = hooks;
    } else {
      this.hooks = {};
      this.hooks.serialize = new hook(this);
      this.hooks.content = new hook(this);
    }

    this.document = undefined;
    this.contents = undefined;
    this.output = undefined;
  }
  /**
   * Load the section from its url
   * @param  {method} [_request] a request method to use for loading
   * @return {document} a promise with the xml document
   */


  section_createClass(Section, [{
    key: "load",
    value: function load(_request) {
      var request = _request || this.request || utils_request;
      var loading = new defer();
      var loaded = loading.promise;

      if (this.contents) {
        loading.resolve(this.contents);
      } else {
        request(this.url).then(function (xml) {
          // var directory = new Url(this.url).directory;
          this.document = xml;
          this.contents = xml.documentElement;
          return this.hooks.content.trigger(this.document, this);
        }.bind(this)).then(function () {
          loading.resolve(this.contents);
        }.bind(this)).catch(function (error) {
          loading.reject(error);
        });
      }

      return loaded;
    }
    /**
     * Adds a base tag for resolving urls in the section
     * @private
     */

  }, {
    key: "base",
    value: function base() {
      return replaceBase(this.document, this);
    }
    /**
     * Render the contents of a section
     * @param  {method} [_request] a request method to use for loading
     * @return {string} output a serialized XML Document
     */

  }, {
    key: "render",
    value: function render(_request) {
      var rendering = new defer();
      var rendered = rendering.promise;
      this.output; // TODO: better way to return this from hooks?

      this.load(_request).then(function (contents) {
        var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
        var isIE = userAgent.indexOf('Trident') >= 0;
        var Serializer;

        if (typeof XMLSerializer === "undefined" || isIE) {
          Serializer = external_xmldom_.DOMParser;
        } else {
          Serializer = XMLSerializer;
        }

        var serializer = new Serializer();
        this.output = serializer.serializeToString(contents);
        return this.output;
      }.bind(this)).then(function () {
        return this.hooks.serialize.trigger(this.output, this);
      }.bind(this)).then(function () {
        rendering.resolve(this.output);
      }.bind(this)).catch(function (error) {
        rendering.reject(error);
      });
      return rendered;
    }
    /**
     * Find a string in a section
     * @param  {string} _query The query string to find
     * @return {object[]} A list of matches, with form {cfi, excerpt}
     */

  }, {
    key: "find",
    value: function find(_query) {
      var section = this;
      var matches = [];

      var query = _query.toLowerCase();

      var find = function find(node) {
        var text = node.textContent.toLowerCase();
        var range = section.document.createRange();
        var cfi;
        var pos;
        var last = -1;
        var excerpt;
        var limit = 150;

        while (pos != -1) {
          // Search for the query
          pos = text.indexOf(query, last + 1);

          if (pos != -1) {
            // We found it! Generate a CFI
            range = section.document.createRange();
            range.setStart(node, pos);
            range.setEnd(node, pos + query.length);
            cfi = section.cfiFromRange(range); // Generate the excerpt

            if (node.textContent.length < limit) {
              excerpt = node.textContent;
            } else {
              excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
              excerpt = "..." + excerpt + "...";
            } // Add the CFI to the matches list


            matches.push({
              cfi: cfi,
              excerpt: excerpt
            });
          }

          last = pos;
        }
      };

      sprint(section.document, function (node) {
        find(node);
      });
      return matches;
    }
  }, {
    key: "search",
    value:
    /**
     * Search a string in multiple sequential Element of the section. If the document.createTreeWalker api is missed(eg: IE8), use `find` as a fallback.
     * @param  {string} _query The query string to search
     * @param  {int} maxSeqEle The maximum number of Element that are combined for search, defualt value is 5.
     * @return {object[]} A list of matches, with form {cfi, excerpt}
     */
    function search(_query) {
      var maxSeqEle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

      if (typeof document.createTreeWalker == "undefined") {
        return this.find(_query);
      }

      var matches = [];
      var excerptLimit = 150;
      var section = this;

      var query = _query.toLowerCase();

      var search = function search(nodeList) {
        var textWithCase = nodeList.reduce(function (acc, current) {
          return acc + current.textContent;
        }, "");
        var text = textWithCase.toLowerCase();
        var pos = text.indexOf(query);

        if (pos != -1) {
          var startNodeIndex = 0,
              endPos = pos + query.length;
          var endNodeIndex = 0,
              l = 0;

          if (pos < nodeList[startNodeIndex].length) {
            var cfi;

            while (endNodeIndex < nodeList.length - 1) {
              l += nodeList[endNodeIndex].length;

              if (endPos <= l) {
                break;
              }

              endNodeIndex += 1;
            }

            var startNode = nodeList[startNodeIndex],
                endNode = nodeList[endNodeIndex];
            var range = section.document.createRange();
            range.setStart(startNode, pos);
            var beforeEndLengthCount = nodeList.slice(0, endNodeIndex).reduce(function (acc, current) {
              return acc + current.textContent.length;
            }, 0);
            range.setEnd(endNode, beforeEndLengthCount > endPos ? endPos : endPos - beforeEndLengthCount);
            cfi = section.cfiFromRange(range);
            var excerpt = nodeList.slice(0, endNodeIndex + 1).reduce(function (acc, current) {
              return acc + current.textContent;
            }, "");

            if (excerpt.length > excerptLimit) {
              excerpt = excerpt.substring(pos - excerptLimit / 2, pos + excerptLimit / 2);
              excerpt = "..." + excerpt + "...";
            }

            matches.push({
              cfi: cfi,
              excerpt: excerpt
            });
          }
        }
      };

      var treeWalker = document.createTreeWalker(section.document, NodeFilter.SHOW_TEXT, null, false);
      var node,
          nodeList = [];

      while (node = treeWalker.nextNode()) {
        nodeList.push(node);

        if (nodeList.length == maxSeqEle) {
          search(nodeList.slice(0, maxSeqEle));
          nodeList = nodeList.slice(1, maxSeqEle);
        }
      }

      if (nodeList.length > 0) {
        search(nodeList);
      }

      return matches;
    }
    /**
    * Reconciles the current chapters layout properies with
    * the global layout properities.
    * @param {object} globalLayout  The global layout settings object, chapter properties string
    * @return {object} layoutProperties Object with layout properties
    */

  }, {
    key: "reconcileLayoutSettings",
    value: function reconcileLayoutSettings(globalLayout) {
      //-- Get the global defaults
      var settings = {
        layout: globalLayout.layout,
        spread: globalLayout.spread,
        orientation: globalLayout.orientation
      }; //-- Get the chapter's display type

      this.properties.forEach(function (prop) {
        var rendition = prop.replace("rendition:", "");
        var split = rendition.indexOf("-");
        var property, value;

        if (split != -1) {
          property = rendition.slice(0, split);
          value = rendition.slice(split + 1);
          settings[property] = value;
        }
      });
      return settings;
    }
    /**
     * Get a CFI from a Range in the Section
     * @param  {range} _range
     * @return {string} cfi an EpubCFI string
     */

  }, {
    key: "cfiFromRange",
    value: function cfiFromRange(_range) {
      return new epubcfi(_range, this.cfiBase).toString();
    }
    /**
     * Get a CFI from an Element in the Section
     * @param  {element} el
     * @return {string} cfi an EpubCFI string
     */

  }, {
    key: "cfiFromElement",
    value: function cfiFromElement(el) {
      return new epubcfi(el, this.cfiBase).toString();
    }
    /**
     * Unload the section document
     */

  }, {
    key: "unload",
    value: function unload() {
      this.document = undefined;
      this.contents = undefined;
      this.output = undefined;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unload();
      this.hooks.serialize.clear();
      this.hooks.content.clear();
      this.hooks = undefined;
      this.idref = undefined;
      this.linear = undefined;
      this.properties = undefined;
      this.index = undefined;
      this.href = undefined;
      this.url = undefined;
      this.next = undefined;
      this.prev = undefined;
      this.cfiBase = undefined;
    }
  }]);

  return Section;
}();

/* harmony default export */ const section = (Section);
;// CONCATENATED MODULE: ./src/spine.js





function spine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function spine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function spine_createClass(Constructor, protoProps, staticProps) { if (protoProps) spine_defineProperties(Constructor.prototype, protoProps); if (staticProps) spine_defineProperties(Constructor, staticProps); return Constructor; }





/**
 * A collection of Spine Items
 */

var Spine = /*#__PURE__*/function () {
  function Spine() {
    spine_classCallCheck(this, Spine);

    this.spineItems = [];
    this.spineByHref = {};
    this.spineById = {};
    this.hooks = {};
    this.hooks.serialize = new hook();
    this.hooks.content = new hook(); // Register replacements

    this.hooks.content.register(replaceBase);
    this.hooks.content.register(replaceCanonical);
    this.hooks.content.register(replaceMeta);
    this.epubcfi = new epubcfi();
    this.loaded = false;
    this.items = undefined;
    this.manifest = undefined;
    this.spineNodeIndex = undefined;
    this.baseUrl = undefined;
    this.length = undefined;
  }
  /**
   * Unpack items from a opf into spine items
   * @param  {Packaging} _package
   * @param  {method} resolver URL resolver
   * @param  {method} canonical Resolve canonical url
   */


  spine_createClass(Spine, [{
    key: "unpack",
    value: function unpack(_package, resolver, canonical) {
      var _this = this;

      this.items = _package.spine;
      this.manifest = _package.manifest;
      this.spineNodeIndex = _package.spineNodeIndex;
      this.baseUrl = _package.baseUrl || _package.basePath || "";
      this.length = this.items.length;
      this.items.forEach(function (item, index) {
        var manifestItem = _this.manifest[item.idref];
        var spineItem;
        item.index = index;
        item.cfiBase = _this.epubcfi.generateChapterComponent(_this.spineNodeIndex, item.index, item.idref);

        if (item.href) {
          item.url = resolver(item.href, true);
          item.canonical = canonical(item.href);
        }

        if (manifestItem) {
          item.href = manifestItem.href;
          item.url = resolver(item.href, true);
          item.canonical = canonical(item.href);

          if (manifestItem.properties.length) {
            item.properties.push.apply(item.properties, manifestItem.properties);
          }
        }

        if (item.linear === "yes") {
          item.prev = function () {
            var prevIndex = item.index;

            while (prevIndex > 0) {
              var prev = this.get(prevIndex - 1);

              if (prev && prev.linear) {
                return prev;
              }

              prevIndex -= 1;
            }

            return;
          }.bind(_this);

          item.next = function () {
            var nextIndex = item.index;

            while (nextIndex < this.spineItems.length - 1) {
              var next = this.get(nextIndex + 1);

              if (next && next.linear) {
                return next;
              }

              nextIndex += 1;
            }

            return;
          }.bind(_this);
        } else {
          item.prev = function () {
            return;
          };

          item.next = function () {
            return;
          };
        }

        spineItem = new section(item, _this.hooks);

        _this.append(spineItem);
      });
      this.loaded = true;
    }
    /**
     * Get an item from the spine
     * @param  {string|number} [target]
     * @return {Section} section
     * @example spine.get();
     * @example spine.get(1);
     * @example spine.get("chap1.html");
     * @example spine.get("#id1234");
     */

  }, {
    key: "get",
    value: function get(target) {
      var index = 0;

      if (typeof target === "undefined") {
        while (index < this.spineItems.length) {
          var next = this.spineItems[index];

          if (next && next.linear) {
            break;
          }

          index += 1;
        }
      } else if (this.epubcfi.isCfiString(target)) {
        var cfi = new epubcfi(target);
        index = cfi.spinePos;
      } else if (typeof target === "number" || isNaN(target) === false) {
        index = target;
      } else if (typeof target === "string" && target.indexOf("#") === 0) {
        index = this.spineById[target.substring(1)];
      } else if (typeof target === "string") {
        // Remove fragments
        target = target.split("#")[0];
        index = this.spineByHref[target] || this.spineByHref[encodeURI(target)];
      }

      return this.spineItems[index] || null;
    }
    /**
     * Append a Section to the Spine
     * @private
     * @param  {Section} section
     */

  }, {
    key: "append",
    value: function append(section) {
      var index = this.spineItems.length;
      section.index = index;
      this.spineItems.push(section); // Encode and Decode href lookups
      // see pr for details: https://github.com/futurepress/epub.js/pull/358

      this.spineByHref[decodeURI(section.href)] = index;
      this.spineByHref[encodeURI(section.href)] = index;
      this.spineByHref[section.href] = index;
      this.spineById[section.idref] = index;
      return index;
    }
    /**
     * Prepend a Section to the Spine
     * @private
     * @param  {Section} section
     */

  }, {
    key: "prepend",
    value: function prepend(section) {
      // var index = this.spineItems.unshift(section);
      this.spineByHref[section.href] = 0;
      this.spineById[section.idref] = 0; // Re-index

      this.spineItems.forEach(function (item, index) {
        item.index = index;
      });
      return 0;
    } // insert(section, index) {
    //
    // };

    /**
     * Remove a Section from the Spine
     * @private
     * @param  {Section} section
     */

  }, {
    key: "remove",
    value: function remove(section) {
      var index = this.spineItems.indexOf(section);

      if (index > -1) {
        delete this.spineByHref[section.href];
        delete this.spineById[section.idref];
        return this.spineItems.splice(index, 1);
      }
    }
    /**
     * Loop over the Sections in the Spine
     * @return {method} forEach
     */

  }, {
    key: "each",
    value: function each() {
      return this.spineItems.forEach.apply(this.spineItems, arguments);
    }
    /**
     * Find the first Section in the Spine
     * @return {Section} first section
     */

  }, {
    key: "first",
    value: function first() {
      var index = 0;

      do {
        var next = this.get(index);

        if (next && next.linear) {
          return next;
        }

        index += 1;
      } while (index < this.spineItems.length);
    }
    /**
     * Find the last Section in the Spine
     * @return {Section} last section
     */

  }, {
    key: "last",
    value: function last() {
      var index = this.spineItems.length - 1;

      do {
        var prev = this.get(index);

        if (prev && prev.linear) {
          return prev;
        }

        index -= 1;
      } while (index >= 0);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.each(function (section) {
        return section.destroy();
      });
      this.spineItems = undefined;
      this.spineByHref = undefined;
      this.spineById = undefined;
      this.hooks.serialize.clear();
      this.hooks.content.clear();
      this.hooks = undefined;
      this.epubcfi = undefined;
      this.loaded = false;
      this.items = undefined;
      this.manifest = undefined;
      this.spineNodeIndex = undefined;
      this.baseUrl = undefined;
      this.length = undefined;
    }
  }]);

  return Spine;
}();

/* harmony default export */ const spine = (Spine);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
;// CONCATENATED MODULE: ./src/utils/queue.js



function queue_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function queue_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function queue_createClass(Constructor, protoProps, staticProps) { if (protoProps) queue_defineProperties(Constructor.prototype, protoProps); if (staticProps) queue_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Queue for handling tasks one at a time
 * @class
 * @param {scope} context what this will resolve to in the tasks
 */

var Queue = /*#__PURE__*/function () {
  function Queue(context) {
    queue_classCallCheck(this, Queue);

    this._q = [];
    this.context = context;
    this.tick = core_requestAnimationFrame;
    this.running = false;
    this.paused = false;
  }
  /**
   * Add an item to the queue
   * @return {Promise}
   */


  queue_createClass(Queue, [{
    key: "enqueue",
    value: function enqueue() {
      var deferred, promise;
      var queued;
      var task = [].shift.call(arguments);
      var args = arguments; // Handle single args without context
      // if(args && !Array.isArray(args)) {
      //   args = [args];
      // }

      if (!task) {
        throw new Error("No Task Provided");
      }

      if (typeof task === "function") {
        deferred = new defer();
        promise = deferred.promise;
        queued = {
          "task": task,
          "args": args,
          //"context"  : context,
          "deferred": deferred,
          "promise": promise
        };
      } else {
        // Task is a promise
        queued = {
          "promise": task
        };
      }

      this._q.push(queued); // Wait to start queue flush


      if (this.paused == false && !this.running) {
        // setTimeout(this.flush.bind(this), 0);
        // this.tick.call(window, this.run.bind(this));
        this.run();
      }

      return queued.promise;
    }
    /**
     * Run one item
     * @return {Promise}
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      var inwait, task, result;

      if (this._q.length && !this.paused) {
        inwait = this._q.shift();
        task = inwait.task;

        if (task) {
          // console.log(task)
          result = task.apply(this.context, inwait.args);

          if (result && typeof result["then"] === "function") {
            // Task is a function that returns a promise
            return result.then(function () {
              inwait.deferred.resolve.apply(this.context, arguments);
            }.bind(this), function () {
              inwait.deferred.reject.apply(this.context, arguments);
            }.bind(this));
          } else {
            // Task resolves immediately
            inwait.deferred.resolve.apply(this.context, result);
            return inwait.promise;
          }
        } else if (inwait.promise) {
          // Task is a promise
          return inwait.promise;
        }
      } else {
        inwait = new defer();
        inwait.deferred.resolve();
        return inwait.promise;
      }
    } // Run All Immediately

  }, {
    key: "dump",
    value: function dump() {
      while (this._q.length) {
        this.dequeue();
      }
    }
    /**
     * Run all tasks sequentially, at convince
     * @return {Promise}
     */

  }, {
    key: "run",
    value: function run() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.defered = new defer();
      }

      this.tick.call(window, function () {
        if (_this._q.length) {
          _this.dequeue().then(function () {
            this.run();
          }.bind(_this));
        } else {
          _this.defered.resolve();

          _this.running = undefined;
        }
      }); // Unpause

      if (this.paused == true) {
        this.paused = false;
      }

      return this.defered.promise;
    }
    /**
     * Flush all, as quickly as possible
     * @return {Promise}
     */

  }, {
    key: "flush",
    value: function flush() {
      if (this.running) {
        return this.running;
      }

      if (this._q.length) {
        this.running = this.dequeue().then(function () {
          this.running = undefined;
          return this.flush();
        }.bind(this));
        return this.running;
      }
    }
    /**
     * Clear all items in wait
     */

  }, {
    key: "clear",
    value: function clear() {
      this._q = [];
    }
    /**
     * Get the number of tasks in the queue
     * @return {number} tasks
     */

  }, {
    key: "length",
    value: function length() {
      return this._q.length;
    }
    /**
     * Pause a running queue
     */

  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
    }
    /**
     * End the queue
     */

  }, {
    key: "stop",
    value: function stop() {
      this._q = [];
      this.running = false;
      this.paused = true;
    }
  }]);

  return Queue;
}();
/**
 * Create a new task from a callback
 * @class
 * @private
 * @param {function} task
 * @param {array} args
 * @param {scope} context
 * @return {function} task
 */


var Task = function Task(task, args, context) {
  queue_classCallCheck(this, Task);

  return function () {
    var _this2 = this;

    var toApply = arguments || [];
    return new Promise(function (resolve, reject) {
      var callback = function callback(value, err) {
        if (!value && err) {
          reject(err);
        } else {
          resolve(value);
        }
      }; // Add the callback to the arguments list


      toApply.push(callback); // Apply all arguments to the functions

      task.apply(context || _this2, toApply);
    });
  };
};

/* harmony default export */ const queue = (Queue);

;// CONCATENATED MODULE: ./src/utils/constants.js
var EPUBJS_VERSION = "0.3"; // Dom events to listen for

var DOM_EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "mousemove", "click", "touchend", "touchstart", "touchmove"];
var EVENTS = {
  BOOK: {
    OPEN_FAILED: "openFailed"
  },
  CONTENTS: {
    EXPAND: "expand",
    RESIZE: "resize",
    SELECTED: "selected",
    SELECTED_RANGE: "selectedRange",
    LINK_CLICKED: "linkClicked"
  },
  LOCATIONS: {
    CHANGED: "changed"
  },
  MANAGERS: {
    RESIZE: "resize",
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange",
    ADDED: "added",
    SCROLL: "scroll",
    SCROLLED: "scrolled",
    REMOVED: "removed"
  },
  VIEWS: {
    AXIS: "axis",
    WRITING_MODE: "writingMode",
    LOAD_ERROR: "loaderror",
    RENDERED: "rendered",
    RESIZED: "resized",
    DISPLAYED: "displayed",
    SHOWN: "shown",
    HIDDEN: "hidden",
    MARK_CLICKED: "markClicked"
  },
  RENDITION: {
    STARTED: "started",
    ATTACHED: "attached",
    DISPLAYED: "displayed",
    DISPLAY_ERROR: "displayerror",
    RENDERED: "rendered",
    REMOVED: "removed",
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange",
    LOCATION_CHANGED: "locationChanged",
    RELOCATED: "relocated",
    MARK_CLICKED: "markClicked",
    SELECTED: "selected",
    LAYOUT: "layout"
  },
  LAYOUT: {
    UPDATED: "updated"
  },
  ANNOTATION: {
    ATTACH: "attach",
    DETACH: "detach"
  }
};
;// CONCATENATED MODULE: ./src/locations.js










function locations_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function locations_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function locations_createClass(Constructor, protoProps, staticProps) { if (protoProps) locations_defineProperties(Constructor.prototype, protoProps); if (staticProps) locations_defineProperties(Constructor, staticProps); return Constructor; }






/**
 * Find Locations for a Book
 * @param {Spine} spine
 * @param {request} request
 * @param {number} [pause=100]
 */

var Locations = /*#__PURE__*/function () {
  function Locations(spine, request, pause) {
    locations_classCallCheck(this, Locations);

    this.spine = spine;
    this.request = request;
    this.pause = pause || 100;
    this.q = new queue(this);
    this.epubcfi = new epubcfi();
    this._locations = [];
    this._locationsWords = [];
    this.total = 0;
    this.break = 150;
    this._current = 0;
    this._wordCounter = 0;
    this.currentLocation = '';
    this._currentCfi = '';
    this.processingTimeout = undefined;
  }
  /**
   * Load all of sections in the book to generate locations
   * @param  {int} chars how many chars to split on
   * @return {object} locations
   */


  locations_createClass(Locations, [{
    key: "generate",
    value: function generate(chars) {
      if (chars) {
        this.break = chars;
      }

      this.q.pause();
      this.spine.each(function (section) {
        if (section.linear) {
          this.q.enqueue(this.process.bind(this), section);
        }
      }.bind(this));
      return this.q.run().then(function () {
        this.total = this._locations.length - 1;

        if (this._currentCfi) {
          this.currentLocation = this._currentCfi;
        }

        return this._locations; // console.log(this.percentage(this.book.rendition.location.start), this.percentage(this.book.rendition.location.end));
      }.bind(this));
    }
  }, {
    key: "createRange",
    value: function createRange() {
      return {
        startContainer: undefined,
        startOffset: undefined,
        endContainer: undefined,
        endOffset: undefined
      };
    }
  }, {
    key: "process",
    value: function process(section) {
      return section.load(this.request).then(function (contents) {
        var completed = new defer();
        var locations = this.parse(contents, section.cfiBase);
        this._locations = this._locations.concat(locations);
        section.unload();
        this.processingTimeout = setTimeout(function () {
          return completed.resolve(locations);
        }, this.pause);
        return completed.promise;
      }.bind(this));
    }
  }, {
    key: "parse",
    value: function parse(contents, cfiBase, chars) {
      var locations = [];
      var range;
      var doc = contents.ownerDocument;
      var body = qs(doc, "body");
      var counter = 0;
      var prev;

      var _break = chars || this.break;

      var parser = function parser(node) {
        var len = node.length;
        var dist;
        var pos = 0;

        if (node.textContent.trim().length === 0) {
          return false; // continue
        } // Start range


        if (counter == 0) {
          range = this.createRange();
          range.startContainer = node;
          range.startOffset = 0;
        }

        dist = _break - counter; // Node is smaller than a break,
        // skip over it

        if (dist > len) {
          counter += len;
          pos = len;
        }

        while (pos < len) {
          dist = _break - counter;

          if (counter === 0) {
            // Start new range
            pos += 1;
            range = this.createRange();
            range.startContainer = node;
            range.startOffset = pos;
          } // pos += dist;
          // Gone over


          if (pos + dist >= len) {
            // Continue counter for next node
            counter += len - pos; // break

            pos = len; // At End
          } else {
            // Advance pos
            pos += dist; // End the previous range

            range.endContainer = node;
            range.endOffset = pos; // cfi = section.cfiFromRange(range);

            var cfi = new epubcfi(range, cfiBase).toString();
            locations.push(cfi);
            counter = 0;
          }
        }

        prev = node;
      };

      sprint(body, parser.bind(this)); // Close remaining

      if (range && range.startContainer && prev) {
        range.endContainer = prev;
        range.endOffset = prev.length;
        var cfi = new epubcfi(range, cfiBase).toString();
        locations.push(cfi);
        counter = 0;
      }

      return locations;
    }
    /**
     * Load all of sections in the book to generate locations
     * @param  {string} startCfi start position
     * @param  {int} wordCount how many words to split on
     * @param  {int} count result count
     * @return {object} locations
     */

  }, {
    key: "generateFromWords",
    value: function generateFromWords(startCfi, wordCount, count) {
      var start = startCfi ? new epubcfi(startCfi) : undefined;
      this.q.pause();
      this._locationsWords = [];
      this._wordCounter = 0;
      this.spine.each(function (section) {
        if (section.linear) {
          if (start) {
            if (section.index >= start.spinePos) {
              this.q.enqueue(this.processWords.bind(this), section, wordCount, start, count);
            }
          } else {
            this.q.enqueue(this.processWords.bind(this), section, wordCount, start, count);
          }
        }
      }.bind(this));
      return this.q.run().then(function () {
        if (this._currentCfi) {
          this.currentLocation = this._currentCfi;
        }

        return this._locationsWords;
      }.bind(this));
    }
  }, {
    key: "processWords",
    value: function processWords(section, wordCount, startCfi, count) {
      if (count && this._locationsWords.length >= count) {
        return Promise.resolve();
      }

      return section.load(this.request).then(function (contents) {
        var completed = new defer();
        var locations = this.parseWords(contents, section, wordCount, startCfi);
        var remainingCount = count - this._locationsWords.length;
        this._locationsWords = this._locationsWords.concat(locations.length >= count ? locations.slice(0, remainingCount) : locations);
        section.unload();
        this.processingTimeout = setTimeout(function () {
          return completed.resolve(locations);
        }, this.pause);
        return completed.promise;
      }.bind(this));
    } //http://stackoverflow.com/questions/18679576/counting-words-in-string

  }, {
    key: "countWords",
    value: function countWords(s) {
      s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space

      s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1

      s = s.replace(/\n /, "\n"); // exclude newline with a start spacing

      return s.split(" ").length;
    }
  }, {
    key: "parseWords",
    value: function parseWords(contents, section, wordCount, startCfi) {
      var cfiBase = section.cfiBase;
      var locations = [];
      var doc = contents.ownerDocument;
      var body = qs(doc, "body");
      var prev;
      var _break = wordCount;
      var foundStartNode = startCfi ? startCfi.spinePos !== section.index : true;
      var startNode;

      if (startCfi && section.index === startCfi.spinePos) {
        startNode = startCfi.findNode(startCfi.range ? startCfi.path.steps.concat(startCfi.start.steps) : startCfi.path.steps, contents.ownerDocument);
      }

      var parser = function parser(node) {
        if (!foundStartNode) {
          if (node === startNode) {
            foundStartNode = true;
          } else {
            return false;
          }
        }

        if (node.textContent.length < 10) {
          if (node.textContent.trim().length === 0) {
            return false;
          }
        }

        var len = this.countWords(node.textContent);
        var dist;
        var pos = 0;

        if (len === 0) {
          return false; // continue
        }

        dist = _break - this._wordCounter; // Node is smaller than a break,
        // skip over it

        if (dist > len) {
          this._wordCounter += len;
          pos = len;
        }

        while (pos < len) {
          dist = _break - this._wordCounter; // Gone over

          if (pos + dist >= len) {
            // Continue counter for next node
            this._wordCounter += len - pos; // break

            pos = len; // At End
          } else {
            // Advance pos
            pos += dist;
            var cfi = new epubcfi(node, cfiBase);
            locations.push({
              cfi: cfi.toString(),
              wordCount: this._wordCounter
            });
            this._wordCounter = 0;
          }
        }

        prev = node;
      };

      sprint(body, parser.bind(this));
      return locations;
    }
    /**
     * Get a location from an EpubCFI
     * @param {EpubCFI} cfi
     * @return {number}
     */

  }, {
    key: "locationFromCfi",
    value: function locationFromCfi(cfi) {
      var loc;

      if (epubcfi.prototype.isCfiString(cfi)) {
        cfi = new epubcfi(cfi);
      } // Check if the location has not been set yet


      if (this._locations.length === 0) {
        return -1;
      }

      loc = locationOf(cfi, this._locations, this.epubcfi.compare);

      if (loc > this.total) {
        return this.total;
      }

      return loc;
    }
    /**
     * Get a percentage position in locations from an EpubCFI
     * @param {EpubCFI} cfi
     * @return {number}
     */

  }, {
    key: "percentageFromCfi",
    value: function percentageFromCfi(cfi) {
      if (this._locations.length === 0) {
        return null;
      } // Find closest cfi


      var loc = this.locationFromCfi(cfi); // Get percentage in total

      return this.percentageFromLocation(loc);
    }
    /**
     * Get a percentage position from a location index
     * @param {number} location
     * @return {number}
     */

  }, {
    key: "percentageFromLocation",
    value: function percentageFromLocation(loc) {
      if (!loc || !this.total) {
        return 0;
      }

      return loc / this.total;
    }
    /**
     * Get an EpubCFI from location index
     * @param {number} loc
     * @return {EpubCFI} cfi
     */

  }, {
    key: "cfiFromLocation",
    value: function cfiFromLocation(loc) {
      var cfi = -1; // check that pg is an int

      if (typeof loc != "number") {
        loc = parseInt(loc);
      }

      if (loc >= 0 && loc < this._locations.length) {
        cfi = this._locations[loc];
      }

      return cfi;
    }
    /**
     * Get an EpubCFI from location percentage
     * @param {number} percentage
     * @return {EpubCFI} cfi
     */

  }, {
    key: "cfiFromPercentage",
    value: function cfiFromPercentage(percentage) {
      var loc;

      if (percentage > 1) {
        console.warn("Normalize cfiFromPercentage value to between 0 - 1");
      } // Make sure 1 goes to very end


      if (percentage >= 1) {
        var cfi = new epubcfi(this._locations[this.total]);
        cfi.collapse();
        return cfi.toString();
      }

      loc = Math.ceil(this.total * percentage);
      return this.cfiFromLocation(loc);
    }
    /**
     * Load locations from JSON
     * @param {json} locations
     */

  }, {
    key: "load",
    value: function load(locations) {
      if (typeof locations === "string") {
        this._locations = JSON.parse(locations);
      } else {
        this._locations = locations;
      }

      this.total = this._locations.length - 1;
      return this._locations;
    }
    /**
     * Save locations to JSON
     * @return {json}
     */

  }, {
    key: "save",
    value: function save() {
      return JSON.stringify(this._locations);
    }
  }, {
    key: "getCurrent",
    value: function getCurrent() {
      return this._current;
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(curr) {
      var loc;

      if (typeof curr == "string") {
        this._currentCfi = curr;
      } else if (typeof curr == "number") {
        this._current = curr;
      } else {
        return;
      }

      if (this._locations.length === 0) {
        return;
      }

      if (typeof curr == "string") {
        loc = this.locationFromCfi(curr);
        this._current = loc;
      } else {
        loc = curr;
      }

      this.emit(EVENTS.LOCATIONS.CHANGED, {
        percentage: this.percentageFromLocation(loc)
      });
    }
    /**
     * Get the current location
     */

  }, {
    key: "currentLocation",
    get: function get() {
      return this._current;
    }
    /**
     * Set the current location
     */
    ,
    set: function set(curr) {
      this.setCurrent(curr);
    }
    /**
     * Locations length
     */

  }, {
    key: "length",
    value: function length() {
      return this._locations.length;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.spine = undefined;
      this.request = undefined;
      this.pause = undefined;
      this.q.stop();
      this.q = undefined;
      this.epubcfi = undefined;
      this._locations = undefined;
      this.total = undefined;
      this.break = undefined;
      this._current = undefined;
      this.currentLocation = undefined;
      this._currentCfi = undefined;
      clearTimeout(this.processingTimeout);
    }
  }]);

  return Locations;
}();

event_emitter_default()(Locations.prototype);
/* harmony default export */ const locations = (Locations);
;// CONCATENATED MODULE: ./src/container.js
function container_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function container_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function container_createClass(Constructor, protoProps, staticProps) { if (protoProps) container_defineProperties(Constructor.prototype, protoProps); if (staticProps) container_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Handles Parsing and Accessing an Epub Container
 * @class
 * @param {document} [containerDocument] xml document
 */

var Container = /*#__PURE__*/function () {
  function Container(containerDocument) {
    container_classCallCheck(this, Container);

    this.packagePath = '';
    this.directory = '';
    this.encoding = '';

    if (containerDocument) {
      this.parse(containerDocument);
    }
  }
  /**
   * Parse the Container XML
   * @param  {document} containerDocument
   */


  container_createClass(Container, [{
    key: "parse",
    value: function parse(containerDocument) {
      //-- <rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
      var rootfile;

      if (!containerDocument) {
        throw new Error("Container File Not Found");
      }

      rootfile = qs(containerDocument, "rootfile");

      if (!rootfile) {
        throw new Error("No RootFile Found");
      }

      this.packagePath = rootfile.getAttribute("full-path");
      this.directory = path_default().dirname(this.packagePath);
      this.encoding = containerDocument.xmlEncoding;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.packagePath = undefined;
      this.directory = undefined;
      this.encoding = undefined;
    }
  }]);

  return Container;
}();

/* harmony default export */ const container = (Container);
;// CONCATENATED MODULE: ./src/packaging.js







function packaging_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function packaging_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function packaging_createClass(Constructor, protoProps, staticProps) { if (protoProps) packaging_defineProperties(Constructor.prototype, protoProps); if (staticProps) packaging_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Open Packaging Format Parser
 * @class
 * @param {document} packageDocument OPF XML
 */

var Packaging = /*#__PURE__*/function () {
  function Packaging(packageDocument) {
    packaging_classCallCheck(this, Packaging);

    this.manifest = {};
    this.navPath = '';
    this.ncxPath = '';
    this.coverPath = '';
    this.spineNodeIndex = 0;
    this.spine = [];
    this.metadata = {};

    if (packageDocument) {
      this.parse(packageDocument);
    }
  }
  /**
   * Parse OPF XML
   * @param  {document} packageDocument OPF XML
   * @return {object} parsed package parts
   */


  packaging_createClass(Packaging, [{
    key: "parse",
    value: function parse(packageDocument) {
      var metadataNode, manifestNode, spineNode;

      if (!packageDocument) {
        throw new Error("Package File Not Found");
      }

      metadataNode = qs(packageDocument, "metadata");

      if (!metadataNode) {
        throw new Error("No Metadata Found");
      }

      manifestNode = qs(packageDocument, "manifest");

      if (!manifestNode) {
        throw new Error("No Manifest Found");
      }

      spineNode = qs(packageDocument, "spine");

      if (!spineNode) {
        throw new Error("No Spine Found");
      }

      this.manifest = this.parseManifest(manifestNode);
      this.navPath = this.findNavPath(manifestNode);
      this.ncxPath = this.findNcxPath(manifestNode, spineNode);
      this.coverPath = this.findCoverPath(packageDocument);
      this.spineNodeIndex = indexOfElementNode(spineNode);
      this.spine = this.parseSpine(spineNode, this.manifest);
      this.uniqueIdentifier = this.findUniqueIdentifier(packageDocument);
      this.metadata = this.parseMetadata(metadataNode);
      this.metadata.direction = spineNode.getAttribute("page-progression-direction");
      return {
        "metadata": this.metadata,
        "spine": this.spine,
        "manifest": this.manifest,
        "navPath": this.navPath,
        "ncxPath": this.ncxPath,
        "coverPath": this.coverPath,
        "spineNodeIndex": this.spineNodeIndex
      };
    }
    /**
     * Parse Metadata
     * @private
     * @param  {node} xml
     * @return {object} metadata
     */

  }, {
    key: "parseMetadata",
    value: function parseMetadata(xml) {
      var metadata = {};
      metadata.title = this.getElementText(xml, "title");
      metadata.creator = this.getElementText(xml, "creator");
      metadata.description = this.getElementText(xml, "description");
      metadata.pubdate = this.getElementText(xml, "date");
      metadata.publisher = this.getElementText(xml, "publisher");
      metadata.identifier = this.getElementText(xml, "identifier");
      metadata.language = this.getElementText(xml, "language");
      metadata.rights = this.getElementText(xml, "rights");
      metadata.modified_date = this.getPropertyText(xml, "dcterms:modified");
      metadata.layout = this.getPropertyText(xml, "rendition:layout");
      metadata.orientation = this.getPropertyText(xml, "rendition:orientation");
      metadata.flow = this.getPropertyText(xml, "rendition:flow");
      metadata.viewport = this.getPropertyText(xml, "rendition:viewport");
      metadata.media_active_class = this.getPropertyText(xml, "media:active-class");
      metadata.spread = this.getPropertyText(xml, "rendition:spread"); // metadata.page_prog_dir = packageXml.querySelector("spine").getAttribute("page-progression-direction");

      return metadata;
    }
    /**
     * Parse Manifest
     * @private
     * @param  {node} manifestXml
     * @return {object} manifest
     */

  }, {
    key: "parseManifest",
    value: function parseManifest(manifestXml) {
      var manifest = {}; //-- Turn items into an array
      // var selected = manifestXml.querySelectorAll("item");

      var selected = qsa(manifestXml, "item");
      var items = Array.prototype.slice.call(selected); //-- Create an object with the id as key

      items.forEach(function (item) {
        var id = item.getAttribute("id"),
            href = item.getAttribute("href") || "",
            type = item.getAttribute("media-type") || "",
            overlay = item.getAttribute("media-overlay") || "",
            properties = item.getAttribute("properties") || "";
        manifest[id] = {
          "href": href,
          // "url" : href,
          "type": type,
          "overlay": overlay,
          "properties": properties.length ? properties.split(" ") : []
        };
      });
      return manifest;
    }
    /**
     * Parse Spine
     * @private
     * @param  {node} spineXml
     * @param  {Packaging.manifest} manifest
     * @return {object} spine
     */

  }, {
    key: "parseSpine",
    value: function parseSpine(spineXml, manifest) {
      var spine = [];
      var selected = qsa(spineXml, "itemref");
      var items = Array.prototype.slice.call(selected); // var epubcfi = new EpubCFI();
      //-- Add to array to mantain ordering and cross reference with manifest

      items.forEach(function (item, index) {
        var idref = item.getAttribute("idref"); // var cfiBase = epubcfi.generateChapterComponent(spineNodeIndex, index, Id);

        var props = item.getAttribute("properties") || "";
        var propArray = props.length ? props.split(" ") : []; // var manifestProps = manifest[Id].properties;
        // var manifestPropArray = manifestProps.length ? manifestProps.split(" ") : [];

        var itemref = {
          "idref": idref,
          "linear": item.getAttribute("linear") || "yes",
          "properties": propArray,
          // "href" : manifest[Id].href,
          // "url" :  manifest[Id].url,
          "index": index // "cfiBase" : cfiBase

        };
        spine.push(itemref);
      });
      return spine;
    }
    /**
     * Find Unique Identifier
     * @private
     * @param  {node} packageXml
     * @return {string} Unique Identifier text
     */

  }, {
    key: "findUniqueIdentifier",
    value: function findUniqueIdentifier(packageXml) {
      var uniqueIdentifierId = packageXml.documentElement.getAttribute("unique-identifier");

      if (!uniqueIdentifierId) {
        return "";
      }

      var identifier = packageXml.getElementById(uniqueIdentifierId);

      if (!identifier) {
        return "";
      }

      if (identifier.localName === "identifier" && identifier.namespaceURI === "http://purl.org/dc/elements/1.1/") {
        return identifier.childNodes.length > 0 ? identifier.childNodes[0].nodeValue.trim() : "";
      }

      return "";
    }
    /**
     * Find TOC NAV
     * @private
     * @param {element} manifestNode
     * @return {string}
     */

  }, {
    key: "findNavPath",
    value: function findNavPath(manifestNode) {
      // Find item with property "nav"
      // Should catch nav irregardless of order
      // var node = manifestNode.querySelector("item[properties$='nav'], item[properties^='nav '], item[properties*=' nav ']");
      var node = qsp(manifestNode, "item", {
        "properties": "nav"
      });
      return node ? node.getAttribute("href") : false;
    }
    /**
     * Find TOC NCX
     * media-type="application/x-dtbncx+xml" href="toc.ncx"
     * @private
     * @param {element} manifestNode
     * @param {element} spineNode
     * @return {string}
     */

  }, {
    key: "findNcxPath",
    value: function findNcxPath(manifestNode, spineNode) {
      // var node = manifestNode.querySelector("item[media-type='application/x-dtbncx+xml']");
      var node = qsp(manifestNode, "item", {
        "media-type": "application/x-dtbncx+xml"
      });
      var tocId; // If we can't find the toc by media-type then try to look for id of the item in the spine attributes as
      // according to http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm#Section2.4.1.2,
      // "The item that describes the NCX must be referenced by the spine toc attribute."

      if (!node) {
        tocId = spineNode.getAttribute("toc");

        if (tocId) {
          // node = manifestNode.querySelector("item[id='" + tocId + "']");
          node = manifestNode.querySelector("#".concat(tocId));
        }
      }

      return node ? node.getAttribute("href") : false;
    }
    /**
     * Find the Cover Path
     * <item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />
     * Fallback for Epub 2.0
     * @private
     * @param  {node} packageXml
     * @return {string} href
     */

  }, {
    key: "findCoverPath",
    value: function findCoverPath(packageXml) {
      var pkg = qs(packageXml, "package");
      var epubVersion = pkg.getAttribute("version"); // Try parsing cover with epub 3.
      // var node = packageXml.querySelector("item[properties='cover-image']");

      var node = qsp(packageXml, "item", {
        "properties": "cover-image"
      });
      if (node) return node.getAttribute("href"); // Fallback to epub 2.

      var metaCover = qsp(packageXml, "meta", {
        "name": "cover"
      });

      if (metaCover) {
        var coverId = metaCover.getAttribute("content"); // var cover = packageXml.querySelector("item[id='" + coverId + "']");

        var cover = packageXml.getElementById(coverId);
        return cover ? cover.getAttribute("href") : "";
      } else {
        return false;
      }
    }
    /**
     * Get text of a namespaced element
     * @private
     * @param  {node} xml
     * @param  {string} tag
     * @return {string} text
     */

  }, {
    key: "getElementText",
    value: function getElementText(xml, tag) {
      var found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
      var el;
      if (!found || found.length === 0) return "";
      el = found[0];

      if (el.childNodes.length) {
        return el.childNodes[0].nodeValue;
      }

      return "";
    }
    /**
     * Get text by property
     * @private
     * @param  {node} xml
     * @param  {string} property
     * @return {string} text
     */

  }, {
    key: "getPropertyText",
    value: function getPropertyText(xml, property) {
      var el = qsp(xml, "meta", {
        "property": property
      });

      if (el && el.childNodes.length) {
        return el.childNodes[0].nodeValue;
      }

      return "";
    }
    /**
     * Load JSON Manifest
     * @param  {document} packageDocument OPF XML
     * @return {object} parsed package parts
     */

  }, {
    key: "load",
    value: function load(json) {
      var _this = this;

      this.metadata = json.metadata;
      var spine = json.readingOrder || json.spine;
      this.spine = spine.map(function (item, index) {
        item.index = index;
        item.linear = item.linear || "yes";
        return item;
      });
      json.resources.forEach(function (item, index) {
        _this.manifest[index] = item;

        if (item.rel && item.rel[0] === "cover") {
          _this.coverPath = item.href;
        }
      });
      this.spineNodeIndex = 0;
      this.toc = json.toc.map(function (item, index) {
        item.label = item.title;
        return item;
      });
      return {
        "metadata": this.metadata,
        "spine": this.spine,
        "manifest": this.manifest,
        "navPath": this.navPath,
        "ncxPath": this.ncxPath,
        "coverPath": this.coverPath,
        "spineNodeIndex": this.spineNodeIndex,
        "toc": this.toc
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.manifest = undefined;
      this.navPath = undefined;
      this.ncxPath = undefined;
      this.coverPath = undefined;
      this.spineNodeIndex = undefined;
      this.spine = undefined;
      this.metadata = undefined;
    }
  }]);

  return Packaging;
}();

/* harmony default export */ const packaging = (Packaging);
;// CONCATENATED MODULE: ./src/navigation.js






function navigation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function navigation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function navigation_createClass(Constructor, protoProps, staticProps) { if (protoProps) navigation_defineProperties(Constructor.prototype, protoProps); if (staticProps) navigation_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Navigation Parser
 * @param {document} xml navigation html / xhtml / ncx
 */

var Navigation = /*#__PURE__*/function () {
  function Navigation(xml) {
    navigation_classCallCheck(this, Navigation);

    this.toc = [];
    this.tocByHref = {};
    this.tocById = {};
    this.landmarks = [];
    this.landmarksByType = {};
    this.length = 0;

    if (xml) {
      this.parse(xml);
    }
  }
  /**
   * Parse out the navigation items
   * @param {document} xml navigation html / xhtml / ncx
   */


  navigation_createClass(Navigation, [{
    key: "parse",
    value: function parse(xml) {
      var isXml = xml.nodeType;
      var html;
      var ncx;

      if (isXml) {
        html = qs(xml, "html");
        ncx = qs(xml, "ncx");
      }

      if (!isXml) {
        this.toc = this.load(xml);
      } else if (html) {
        this.toc = this.parseNav(xml);
        this.landmarks = this.parseLandmarks(xml);
      } else if (ncx) {
        this.toc = this.parseNcx(xml);
      }

      this.length = 0;
      this.unpack(this.toc);
    }
    /**
     * Unpack navigation items
     * @private
     * @param  {array} toc
     */

  }, {
    key: "unpack",
    value: function unpack(toc) {
      var item;

      for (var i = 0; i < toc.length; i++) {
        item = toc[i];

        if (item.href) {
          this.tocByHref[item.href] = i;
        }

        if (item.id) {
          this.tocById[item.id] = i;
        }

        this.length++;

        if (item.subitems.length) {
          this.unpack(item.subitems);
        }
      }
    }
    /**
     * Get an item from the navigation
     * @param  {string} target
     * @return {object} navItem
     */

  }, {
    key: "get",
    value: function get(target) {
      var index;

      if (!target) {
        return this.toc;
      }

      if (target.indexOf("#") === 0) {
        index = this.tocById[target.substring(1)];
      } else if (target in this.tocByHref) {
        index = this.tocByHref[target];
      }

      return this.getByIndex(target, index, this.toc);
    }
    /**
     * Get an item from navigation subitems recursively by index
     * @param  {string} target
     * @param  {number} index
     * @param  {array} navItems
     * @return {object} navItem
     */

  }, {
    key: "getByIndex",
    value: function getByIndex(target, index, navItems) {
      if (navItems.length === 0) {
        return;
      }

      var item = navItems[index];

      if (item && (target === item.id || target === item.href)) {
        return item;
      } else {
        var result;

        for (var i = 0; i < navItems.length; ++i) {
          result = this.getByIndex(target, index, navItems[i].subitems);

          if (result) {
            break;
          }
        }

        return result;
      }
    }
    /**
     * Get a landmark by type
     * List of types: https://idpf.github.io/epub-vocabs/structure/
     * @param  {string} type
     * @return {object} landmarkItem
     */

  }, {
    key: "landmark",
    value: function landmark(type) {
      var index;

      if (!type) {
        return this.landmarks;
      }

      index = this.landmarksByType[type];
      return this.landmarks[index];
    }
    /**
     * Parse toc from a Epub > 3.0 Nav
     * @private
     * @param  {document} navHtml
     * @return {array} navigation list
     */

  }, {
    key: "parseNav",
    value: function parseNav(navHtml) {
      var navElement = querySelectorByType(navHtml, "nav", "toc");
      var list = [];
      if (!navElement) return list;
      var navList = filterChildren(navElement, "ol", true);
      if (!navList) return list;
      list = this.parseNavList(navList);
      return list;
    }
    /**
     * Parses lists in the toc
     * @param  {document} navListHtml
     * @param  {string} parent id
     * @return {array} navigation list
     */

  }, {
    key: "parseNavList",
    value: function parseNavList(navListHtml, parent) {
      var result = [];
      if (!navListHtml) return result;
      if (!navListHtml.children) return result;

      for (var i = 0; i < navListHtml.children.length; i++) {
        var item = this.navItem(navListHtml.children[i], parent);

        if (item) {
          result.push(item);
        }
      }

      return result;
    }
    /**
     * Create a navItem
     * @private
     * @param  {element} item
     * @return {object} navItem
     */

  }, {
    key: "navItem",
    value: function navItem(item, parent) {
      var id = item.getAttribute("id") || undefined;
      var content = filterChildren(item, "a", true);

      if (!content) {
        return;
      }

      var src = content.getAttribute("href") || "";

      if (!id) {
        id = src;
      }

      var text = content.textContent || "";
      var subitems = [];
      var nested = filterChildren(item, "ol", true);

      if (nested) {
        subitems = this.parseNavList(nested, id);
      }

      return {
        "id": id,
        "href": src,
        "label": text,
        "subitems": subitems,
        "parent": parent
      };
    }
    /**
     * Parse landmarks from a Epub > 3.0 Nav
     * @private
     * @param  {document} navHtml
     * @return {array} landmarks list
     */

  }, {
    key: "parseLandmarks",
    value: function parseLandmarks(navHtml) {
      var navElement = querySelectorByType(navHtml, "nav", "landmarks");
      var navItems = navElement ? qsa(navElement, "li") : [];
      var length = navItems.length;
      var i;
      var list = [];
      var item;
      if (!navItems || length === 0) return list;

      for (i = 0; i < length; ++i) {
        item = this.landmarkItem(navItems[i]);

        if (item) {
          list.push(item);
          this.landmarksByType[item.type] = i;
        }
      }

      return list;
    }
    /**
     * Create a landmarkItem
     * @private
     * @param  {element} item
     * @return {object} landmarkItem
     */

  }, {
    key: "landmarkItem",
    value: function landmarkItem(item) {
      var content = filterChildren(item, "a", true);

      if (!content) {
        return;
      }

      var type = content.getAttributeNS("http://www.idpf.org/2007/ops", "type") || undefined;
      var href = content.getAttribute("href") || "";
      var text = content.textContent || "";
      return {
        "href": href,
        "label": text,
        "type": type
      };
    }
    /**
     * Parse from a Epub > 3.0 NC
     * @private
     * @param  {document} navHtml
     * @return {array} navigation list
     */

  }, {
    key: "parseNcx",
    value: function parseNcx(tocXml) {
      var navPoints = qsa(tocXml, "navPoint");
      var length = navPoints.length;
      var i;
      var toc = {};
      var list = [];
      var item, parent;
      if (!navPoints || length === 0) return list;

      for (i = 0; i < length; ++i) {
        item = this.ncxItem(navPoints[i]);
        toc[item.id] = item;

        if (!item.parent) {
          list.push(item);
        } else {
          parent = toc[item.parent];
          parent.subitems.push(item);
        }
      }

      return list;
    }
    /**
     * Create a ncxItem
     * @private
     * @param  {element} item
     * @return {object} ncxItem
     */

  }, {
    key: "ncxItem",
    value: function ncxItem(item) {
      var id = item.getAttribute("id") || false,
          content = qs(item, "content"),
          src = content.getAttribute("src"),
          navLabel = qs(item, "navLabel"),
          text = navLabel.textContent ? navLabel.textContent : "",
          subitems = [],
          parentNode = item.parentNode,
          parent;

      if (parentNode && (parentNode.nodeName === "navPoint" || parentNode.nodeName.split(':').slice(-1)[0] === "navPoint")) {
        parent = parentNode.getAttribute("id");
      }

      return {
        "id": id,
        "href": src,
        "label": text,
        "subitems": subitems,
        "parent": parent
      };
    }
    /**
     * Load Spine Items
     * @param  {object} json the items to be loaded
     * @return {Array} navItems
     */

  }, {
    key: "load",
    value: function load(json) {
      var _this = this;

      return json.map(function (item) {
        item.label = item.title;
        item.subitems = item.children ? _this.load(item.children) : [];
        return item;
      });
    }
    /**
     * forEach pass through
     * @param  {Function} fn function to run on each item
     * @return {method} forEach loop
     */

  }, {
    key: "forEach",
    value: function forEach(fn) {
      return this.toc.forEach(fn);
    }
  }]);

  return Navigation;
}();

/* harmony default export */ const navigation = (Navigation);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
;// CONCATENATED MODULE: ./src/utils/mime.js



/*
 From Zip.js, by Gildas Lormeau
edited down
 */
var table = {
  "application": {
    "ecmascript": ["es", "ecma"],
    "javascript": "js",
    "ogg": "ogx",
    "pdf": "pdf",
    "postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
    "rdf+xml": "rdf",
    "smil": ["smi", "smil"],
    "xhtml+xml": ["xhtml", "xht"],
    "xml": ["xml", "xsl", "xsd", "opf", "ncx"],
    "zip": "zip",
    "x-httpd-eruby": "rhtml",
    "x-latex": "latex",
    "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
    "x-object": "o",
    "x-shockwave-flash": ["swf", "swfl"],
    "x-silverlight": "scr",
    "epub+zip": "epub",
    "font-tdpfr": "pfr",
    "inkml+xml": ["ink", "inkml"],
    "json": "json",
    "jsonml+json": "jsonml",
    "mathml+xml": "mathml",
    "metalink+xml": "metalink",
    "mp4": "mp4s",
    // "oebps-package+xml" : "opf",
    "omdoc+xml": "omdoc",
    "oxps": "oxps",
    "vnd.amazon.ebook": "azw",
    "widget": "wgt",
    // "x-dtbncx+xml" : "ncx",
    "x-dtbook+xml": "dtb",
    "x-dtbresource+xml": "res",
    "x-font-bdf": "bdf",
    "x-font-ghostscript": "gsf",
    "x-font-linux-psf": "psf",
    "x-font-otf": "otf",
    "x-font-pcf": "pcf",
    "x-font-snf": "snf",
    "x-font-ttf": ["ttf", "ttc"],
    "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "x-font-woff": "woff",
    "x-mobipocket-ebook": ["prc", "mobi"],
    "x-mspublisher": "pub",
    "x-nzb": "nzb",
    "x-tgif": "obj",
    "xaml+xml": "xaml",
    "xml-dtd": "dtd",
    "xproc+xml": "xpl",
    "xslt+xml": "xslt",
    "internet-property-stream": "acx",
    "x-compress": "z",
    "x-compressed": "tgz",
    "x-gzip": "gz"
  },
  "audio": {
    "flac": "flac",
    "midi": ["mid", "midi", "kar", "rmi"],
    "mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
    "mpegurl": "m3u",
    "ogg": ["oga", "ogg", "spx"],
    "x-aiff": ["aif", "aiff", "aifc"],
    "x-ms-wma": "wma",
    "x-wav": "wav",
    "adpcm": "adp",
    "mp4": "mp4a",
    "webm": "weba",
    "x-aac": "aac",
    "x-caf": "caf",
    "x-matroska": "mka",
    "x-pn-realaudio-plugin": "rmp",
    "xm": "xm",
    "mid": ["mid", "rmi"]
  },
  "image": {
    "gif": "gif",
    "ief": "ief",
    "jpeg": ["jpeg", "jpg", "jpe"],
    "pcx": "pcx",
    "png": "png",
    "svg+xml": ["svg", "svgz"],
    "tiff": ["tiff", "tif"],
    "x-icon": "ico",
    "bmp": "bmp",
    "webp": "webp",
    "x-pict": ["pic", "pct"],
    "x-tga": "tga",
    "cis-cod": "cod"
  },
  "text": {
    "cache-manifest": ["manifest", "appcache"],
    "css": "css",
    "csv": "csv",
    "html": ["html", "htm", "shtml", "stm"],
    "mathml": "mml",
    "plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
    "richtext": "rtx",
    "tab-separated-values": "tsv",
    "x-bibtex": "bib"
  },
  "video": {
    "mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
    "mp4": ["mp4", "mp4v", "mpg4"],
    "quicktime": ["qt", "mov"],
    "ogg": "ogv",
    "vnd.mpegurl": ["mxu", "m4u"],
    "x-flv": "flv",
    "x-la-asf": ["lsf", "lsx"],
    "x-mng": "mng",
    "x-ms-asf": ["asf", "asx", "asr"],
    "x-ms-wm": "wm",
    "x-ms-wmv": "wmv",
    "x-ms-wmx": "wmx",
    "x-ms-wvx": "wvx",
    "x-msvideo": "avi",
    "x-sgi-movie": "movie",
    "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
    "3gpp2": "3g2",
    "h261": "h261",
    "h263": "h263",
    "h264": "h264",
    "jpeg": "jpgv",
    "jpm": ["jpm", "jpgm"],
    "mj2": ["mj2", "mjp2"],
    "vnd.ms-playready.media.pyv": "pyv",
    "vnd.uvvu.mp4": ["uvu", "uvvu"],
    "vnd.vivo": "viv",
    "webm": "webm",
    "x-f4v": "f4v",
    "x-m4v": "m4v",
    "x-ms-vob": "vob",
    "x-smv": "smv"
  }
};

var mime_mimeTypes = function () {
  var type,
      subtype,
      val,
      index,
      mimeTypes = {};

  for (type in table) {
    if (table.hasOwnProperty(type)) {
      for (subtype in table[type]) {
        if (table[type].hasOwnProperty(subtype)) {
          val = table[type][subtype];

          if (typeof val == "string") {
            mimeTypes[val] = type + "/" + subtype;
          } else {
            for (index = 0; index < val.length; index++) {
              mimeTypes[val[index]] = type + "/" + subtype;
            }
          }
        }
      }
    }
  }

  return mimeTypes;
}();

var defaultValue = "text/plain"; //"application/octet-stream";

function lookup(filename) {
  return filename && mime_mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
}

;
/* harmony default export */ const mime = ({
  lookup: lookup
});
;// CONCATENATED MODULE: ./src/resources.js












function resources_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function resources_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function resources_createClass(Constructor, protoProps, staticProps) { if (protoProps) resources_defineProperties(Constructor.prototype, protoProps); if (staticProps) resources_defineProperties(Constructor, staticProps); return Constructor; }







/**
 * Handle Package Resources
 * @class
 * @param {Manifest} manifest
 * @param {object} [options]
 * @param {string} [options.replacements="base64"]
 * @param {Archive} [options.archive]
 * @param {method} [options.resolver]
 */

var Resources = /*#__PURE__*/function () {
  function Resources(manifest, options) {
    resources_classCallCheck(this, Resources);

    this.settings = {
      replacements: options && options.replacements || "base64",
      archive: options && options.archive,
      resolver: options && options.resolver,
      request: options && options.request
    };
    this.process(manifest);
  }
  /**
   * Process resources
   * @param {Manifest} manifest
   */


  resources_createClass(Resources, [{
    key: "process",
    value: function process(manifest) {
      this.manifest = manifest;
      this.resources = Object.keys(manifest).map(function (key) {
        return manifest[key];
      });
      this.replacementUrls = [];
      this.html = [];
      this.assets = [];
      this.css = [];
      this.urls = [];
      this.cssUrls = [];
      this.split();
      this.splitUrls();
    }
    /**
     * Split resources by type
     * @private
     */

  }, {
    key: "split",
    value: function split() {
      // HTML
      this.html = this.resources.filter(function (item) {
        if (item.type === "application/xhtml+xml" || item.type === "text/html") {
          return true;
        }
      }); // Exclude HTML

      this.assets = this.resources.filter(function (item) {
        if (item.type !== "application/xhtml+xml" && item.type !== "text/html") {
          return true;
        }
      }); // Only CSS

      this.css = this.resources.filter(function (item) {
        if (item.type === "text/css") {
          return true;
        }
      });
    }
    /**
     * Convert split resources into Urls
     * @private
     */

  }, {
    key: "splitUrls",
    value: function splitUrls() {
      // All Assets Urls
      this.urls = this.assets.map(function (item) {
        return item.href;
      }.bind(this)); // Css Urls

      this.cssUrls = this.css.map(function (item) {
        return item.href;
      });
    }
    /**
     * Create a url to a resource
     * @param {string} url
     * @return {Promise<string>} Promise resolves with url string
     */

  }, {
    key: "createUrl",
    value: function createUrl(url) {
      var parsedUrl = new utils_url(url);
      var mimeType = mime.lookup(parsedUrl.filename);

      if (this.settings.archive) {
        return this.settings.archive.createUrl(url, {
          "base64": this.settings.replacements === "base64"
        });
      } else {
        if (this.settings.replacements === "base64") {
          return this.settings.request(url, 'blob').then(function (blob) {
            return blob2base64(blob);
          }).then(function (blob) {
            return createBase64Url(blob, mimeType);
          });
        } else {
          return this.settings.request(url, 'blob').then(function (blob) {
            return createBlobUrl(blob, mimeType);
          });
        }
      }
    }
    /**
     * Create blob urls for all the assets
     * @return {Promise}         returns replacement urls
     */

  }, {
    key: "replacements",
    value: function replacements() {
      var _this = this;

      if (this.settings.replacements === "none") {
        return new Promise(function (resolve) {
          resolve(this.urls);
        }.bind(this));
      }

      var replacements = this.urls.map(function (url) {
        var absolute = _this.settings.resolver(url);

        return _this.createUrl(absolute).catch(function (err) {
          console.error(err);
          return null;
        });
      });
      return Promise.all(replacements).then(function (replacementUrls) {
        _this.replacementUrls = replacementUrls.filter(function (url) {
          return typeof url === "string";
        });
        return replacementUrls;
      });
    }
    /**
     * Replace URLs in CSS resources
     * @private
     * @param  {Archive} [archive]
     * @param  {method} [resolver]
     * @return {Promise}
     */

  }, {
    key: "replaceCss",
    value: function replaceCss(archive, resolver) {
      var replaced = [];
      archive = archive || this.settings.archive;
      resolver = resolver || this.settings.resolver;
      this.cssUrls.forEach(function (href) {
        var replacement = this.createCssFile(href, archive, resolver).then(function (replacementUrl) {
          // switch the url in the replacementUrls
          var indexInUrls = this.urls.indexOf(href);

          if (indexInUrls > -1) {
            this.replacementUrls[indexInUrls] = replacementUrl;
          }
        }.bind(this));
        replaced.push(replacement);
      }.bind(this));
      return Promise.all(replaced);
    }
    /**
     * Create a new CSS file with the replaced URLs
     * @private
     * @param  {string} href the original css file
     * @return {Promise}  returns a BlobUrl to the new CSS file or a data url
     */

  }, {
    key: "createCssFile",
    value: function createCssFile(href) {
      var _this2 = this;

      var newUrl;

      if (path_default().isAbsolute(href)) {
        return new Promise(function (resolve) {
          resolve();
        });
      }

      var absolute = this.settings.resolver(href); // Get the text of the css file from the archive

      var textResponse;

      if (this.settings.archive) {
        textResponse = this.settings.archive.getText(absolute);
      } else {
        textResponse = this.settings.request(absolute, "text");
      } // Get asset links relative to css file


      var relUrls = this.urls.map(function (assetHref) {
        var resolved = _this2.settings.resolver(assetHref);

        var relative = new utils_path(absolute).relative(resolved);
        return relative;
      });

      if (!textResponse) {
        // file not found, don't replace
        return new Promise(function (resolve) {
          resolve();
        });
      }

      return textResponse.then(function (text) {
        // Replacements in the css text
        text = replacements_substitute(text, relUrls, _this2.replacementUrls); // Get the new url

        if (_this2.settings.replacements === "base64") {
          newUrl = createBase64Url(text, "text/css");
        } else {
          newUrl = createBlobUrl(text, "text/css");
        }

        return newUrl;
      }, function (err) {
        // handle response errors
        return new Promise(function (resolve) {
          resolve();
        });
      });
    }
    /**
     * Resolve all resources URLs relative to an absolute URL
     * @param  {string} absolute to be resolved to
     * @param  {resolver} [resolver]
     * @return {string[]} array with relative Urls
     */

  }, {
    key: "relativeTo",
    value: function relativeTo(absolute, resolver) {
      resolver = resolver || this.settings.resolver; // Get Urls relative to current sections

      return this.urls.map(function (href) {
        var resolved = resolver(href);
        var relative = new utils_path(absolute).relative(resolved);
        return relative;
      }.bind(this));
    }
    /**
     * Get a URL for a resource
     * @param  {string} path
     * @return {string} url
     */

  }, {
    key: "get",
    value: function get(path) {
      var indexInUrls = this.urls.indexOf(path);

      if (indexInUrls === -1) {
        return;
      }

      if (this.replacementUrls.length) {
        return new Promise(function (resolve, reject) {
          resolve(this.replacementUrls[indexInUrls]);
        }.bind(this));
      } else {
        return this.createUrl(path);
      }
    }
    /**
     * Substitute urls in content, with replacements,
     * relative to a url if provided
     * @param  {string} content
     * @param  {string} [url]   url to resolve to
     * @return {string}         content with urls substituted
     */

  }, {
    key: "substitute",
    value: function substitute(content, url) {
      var relUrls;

      if (url) {
        relUrls = this.relativeTo(url);
      } else {
        relUrls = this.urls;
      }

      return replacements_substitute(content, relUrls, this.replacementUrls);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.settings = undefined;
      this.manifest = undefined;
      this.resources = undefined;
      this.replacementUrls = undefined;
      this.html = undefined;
      this.assets = undefined;
      this.css = undefined;
      this.urls = undefined;
      this.cssUrls = undefined;
    }
  }]);

  return Resources;
}();

/* harmony default export */ const resources = (Resources);
;// CONCATENATED MODULE: ./src/pagelist.js




function pagelist_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pagelist_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function pagelist_createClass(Constructor, protoProps, staticProps) { if (protoProps) pagelist_defineProperties(Constructor.prototype, protoProps); if (staticProps) pagelist_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Page List Parser
 * @param {document} [xml]
 */

var PageList = /*#__PURE__*/function () {
  function PageList(xml) {
    pagelist_classCallCheck(this, PageList);

    this.pages = [];
    this.locations = [];
    this.epubcfi = new epubcfi();
    this.firstPage = 0;
    this.lastPage = 0;
    this.totalPages = 0;
    this.toc = undefined;
    this.ncx = undefined;

    if (xml) {
      this.pageList = this.parse(xml);
    }

    if (this.pageList && this.pageList.length) {
      this.process(this.pageList);
    }
  }
  /**
   * Parse PageList Xml
   * @param  {document} xml
   */


  pagelist_createClass(PageList, [{
    key: "parse",
    value: function parse(xml) {
      var html = qs(xml, "html");
      var ncx = qs(xml, "ncx");

      if (html) {
        return this.parseNav(xml);
      } else if (ncx) {
        return this.parseNcx(xml);
      }
    }
    /**
     * Parse a Nav PageList
     * @private
     * @param  {node} navHtml
     * @return {PageList.item[]} list
     */

  }, {
    key: "parseNav",
    value: function parseNav(navHtml) {
      var navElement = querySelectorByType(navHtml, "nav", "page-list");
      var navItems = navElement ? qsa(navElement, "li") : [];
      var length = navItems.length;
      var i;
      var list = [];
      var item;
      if (!navItems || length === 0) return list;

      for (i = 0; i < length; ++i) {
        item = this.item(navItems[i]);
        list.push(item);
      }

      return list;
    }
  }, {
    key: "parseNcx",
    value: function parseNcx(navXml) {
      var list = [];
      var i = 0;
      var item;
      var pageList;
      var pageTargets;
      var length = 0;
      pageList = qs(navXml, "pageList");
      if (!pageList) return list;
      pageTargets = qsa(pageList, "pageTarget");
      length = pageTargets.length;

      if (!pageTargets || pageTargets.length === 0) {
        return list;
      }

      for (i = 0; i < length; ++i) {
        item = this.ncxItem(pageTargets[i]);
        list.push(item);
      }

      return list;
    }
  }, {
    key: "ncxItem",
    value: function ncxItem(item) {
      var navLabel = qs(item, "navLabel");
      var navLabelText = qs(navLabel, "text");
      var pageText = navLabelText.textContent;
      var content = qs(item, "content");
      var href = content.getAttribute("src");
      var page = parseInt(pageText, 10);
      return {
        "href": href,
        "page": page
      };
    }
    /**
     * Page List Item
     * @private
     * @param  {node} item
     * @return {object} pageListItem
     */

  }, {
    key: "item",
    value: function item(_item) {
      var content = qs(_item, "a"),
          href = content.getAttribute("href") || "",
          text = content.textContent || "",
          page = parseInt(text),
          isCfi = href.indexOf("epubcfi"),
          split,
          packageUrl,
          cfi;

      if (isCfi != -1) {
        split = href.split("#");
        packageUrl = split[0];
        cfi = split.length > 1 ? split[1] : false;
        return {
          "cfi": cfi,
          "href": href,
          "packageUrl": packageUrl,
          "page": page
        };
      } else {
        return {
          "href": href,
          "page": page
        };
      }
    }
    /**
     * Process pageList items
     * @private
     * @param  {array} pageList
     */

  }, {
    key: "process",
    value: function process(pageList) {
      pageList.forEach(function (item) {
        this.pages.push(item.page);

        if (item.cfi) {
          this.locations.push(item.cfi);
        }
      }, this);
      this.firstPage = parseInt(this.pages[0]);
      this.lastPage = parseInt(this.pages[this.pages.length - 1]);
      this.totalPages = this.lastPage - this.firstPage;
    }
    /**
     * Get a PageList result from a EpubCFI
     * @param  {string} cfi EpubCFI String
     * @return {number} page
     */

  }, {
    key: "pageFromCfi",
    value: function pageFromCfi(cfi) {
      var pg = -1; // Check if the pageList has not been set yet

      if (this.locations.length === 0) {
        return -1;
      } // TODO: check if CFI is valid?
      // check if the cfi is in the location list
      // var index = this.locations.indexOf(cfi);


      var index = indexOfSorted(cfi, this.locations, this.epubcfi.compare);

      if (index != -1) {
        pg = this.pages[index];
      } else {
        // Otherwise add it to the list of locations
        // Insert it in the correct position in the locations page
        //index = EPUBJS.core.insert(cfi, this.locations, this.epubcfi.compare);
        index = locationOf(cfi, this.locations, this.epubcfi.compare); // Get the page at the location just before the new one, or return the first

        pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];

        if (pg !== undefined) {// Add the new page in so that the locations and page array match up
          //this.pages.splice(index, 0, pg);
        } else {
          pg = -1;
        }
      }

      return pg;
    }
    /**
     * Get an EpubCFI from a Page List Item
     * @param  {string | number} pg
     * @return {string} cfi
     */

  }, {
    key: "cfiFromPage",
    value: function cfiFromPage(pg) {
      var cfi = -1; // check that pg is an int

      if (typeof pg != "number") {
        pg = parseInt(pg);
      } // check if the cfi is in the page list
      // Pages could be unsorted.


      var index = this.pages.indexOf(pg);

      if (index != -1) {
        cfi = this.locations[index];
      } // TODO: handle pages not in the list


      return cfi;
    }
    /**
     * Get a Page from Book percentage
     * @param  {number} percent
     * @return {number} page
     */

  }, {
    key: "pageFromPercentage",
    value: function pageFromPercentage(percent) {
      var pg = Math.round(this.totalPages * percent);
      return pg;
    }
    /**
     * Returns a value between 0 - 1 corresponding to the location of a page
     * @param  {number} pg the page
     * @return {number} percentage
     */

  }, {
    key: "percentageFromPage",
    value: function percentageFromPage(pg) {
      var percentage = (pg - this.firstPage) / this.totalPages;
      return Math.round(percentage * 1000) / 1000;
    }
    /**
     * Returns a value between 0 - 1 corresponding to the location of a cfi
     * @param  {string} cfi EpubCFI String
     * @return {number} percentage
     */

  }, {
    key: "percentageFromCfi",
    value: function percentageFromCfi(cfi) {
      var pg = this.pageFromCfi(cfi);
      var percentage = this.percentageFromPage(pg);
      return percentage;
    }
    /**
     * Destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.pages = undefined;
      this.locations = undefined;
      this.epubcfi = undefined;
      this.pageList = undefined;
      this.toc = undefined;
      this.ncx = undefined;
    }
  }]);

  return PageList;
}();

/* harmony default export */ const pagelist = (PageList);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
;// CONCATENATED MODULE: ./src/layout.js




function layout_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function layout_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function layout_createClass(Constructor, protoProps, staticProps) { if (protoProps) layout_defineProperties(Constructor.prototype, protoProps); if (staticProps) layout_defineProperties(Constructor, staticProps); return Constructor; }




/**
 * Figures out the CSS values to apply for a layout
 * @class
 * @param {object} settings
 * @param {string} [settings.layout='reflowable']
 * @param {string} [settings.spread]
 * @param {number} [settings.minSpreadWidth=800]
 * @param {boolean} [settings.evenSpreads=false]
 */

var Layout = /*#__PURE__*/function () {
  function Layout(settings) {
    layout_classCallCheck(this, Layout);

    this.settings = settings;
    this.name = settings.layout || "reflowable";
    this._spread = settings.spread === "none" ? false : true;
    this._minSpreadWidth = settings.minSpreadWidth || 800;
    this._evenSpreads = settings.evenSpreads || false;

    if (settings.flow === "scrolled" || settings.flow === "scrolled-continuous" || settings.flow === "scrolled-doc") {
      this._flow = "scrolled";
    } else {
      this._flow = "paginated";
    }

    this.width = 0;
    this.height = 0;
    this.spreadWidth = 0;
    this.delta = 0;
    this.columnWidth = 0;
    this.gap = 0;
    this.divisor = 1;
    this.props = {
      name: this.name,
      spread: this._spread,
      flow: this._flow,
      width: 0,
      height: 0,
      spreadWidth: 0,
      delta: 0,
      columnWidth: 0,
      gap: 0,
      divisor: 1
    };
  }
  /**
   * Switch the flow between paginated and scrolled
   * @param  {string} flow paginated | scrolled
   * @return {string} simplified flow
   */


  layout_createClass(Layout, [{
    key: "flow",
    value: function flow(_flow) {
      if (typeof _flow != "undefined") {
        if (_flow === "scrolled" || _flow === "scrolled-continuous" || _flow === "scrolled-doc") {
          this._flow = "scrolled";
        } else {
          this._flow = "paginated";
        } // this.props.flow = this._flow;


        this.update({
          flow: this._flow
        });
      }

      return this._flow;
    }
    /**
     * Switch between using spreads or not, and set the
     * width at which they switch to single.
     * @param  {string} spread "none" | "always" | "auto"
     * @param  {number} min integer in pixels
     * @return {boolean} spread true | false
     */

  }, {
    key: "spread",
    value: function spread(_spread, min) {
      if (_spread) {
        this._spread = _spread === "none" ? false : true; // this.props.spread = this._spread;

        this.update({
          spread: this._spread
        });
      }

      if (min >= 0) {
        this._minSpreadWidth = min;
      }

      return this._spread;
    }
    /**
     * Calculate the dimensions of the pagination
     * @param  {number} _width  width of the rendering
     * @param  {number} _height height of the rendering
     * @param  {number} _gap    width of the gap between columns
     */

  }, {
    key: "calculate",
    value: function calculate(_width, _height, _gap) {
      var divisor = 1;
      var gap = _gap || 0; //-- Check the width and create even width columns
      // var fullWidth = Math.floor(_width);

      var width = _width;
      var height = _height;
      var section = Math.floor(width / 12);
      var columnWidth;
      var spreadWidth;
      var pageWidth;
      var delta;

      if (this._spread && width >= this._minSpreadWidth) {
        divisor = 2;
      } else {
        divisor = 1;
      }

      if (this.name === "reflowable" && this._flow === "paginated" && !(_gap >= 0)) {
        gap = section % 2 === 0 ? section : section - 1;
      }

      if (this.name === "pre-paginated") {
        gap = 0;
      } //-- Double Page


      if (divisor > 1) {
        // width = width - gap;
        // columnWidth = (width - gap) / divisor;
        // gap = gap / divisor;
        columnWidth = width / divisor - gap;
        pageWidth = columnWidth + gap;
      } else {
        columnWidth = width;
        pageWidth = width;
      }

      if (this.name === "pre-paginated" && divisor > 1) {
        width = columnWidth;
      }

      spreadWidth = columnWidth * divisor + gap;
      delta = width;
      this.width = width;
      this.height = height;
      this.spreadWidth = spreadWidth;
      this.pageWidth = pageWidth;
      this.delta = delta;
      this.columnWidth = columnWidth;
      this.gap = gap;
      this.divisor = divisor; // this.props.width = width;
      // this.props.height = _height;
      // this.props.spreadWidth = spreadWidth;
      // this.props.pageWidth = pageWidth;
      // this.props.delta = delta;
      //
      // this.props.columnWidth = colWidth;
      // this.props.gap = gap;
      // this.props.divisor = divisor;

      this.update({
        width: width,
        height: height,
        spreadWidth: spreadWidth,
        pageWidth: pageWidth,
        delta: delta,
        columnWidth: columnWidth,
        gap: gap,
        divisor: divisor
      });
    }
    /**
     * Apply Css to a Document
     * @param  {Contents} contents
     * @return {Promise}
     */

  }, {
    key: "format",
    value: function format(contents, section, axis) {
      var formating;

      if (this.name === "pre-paginated") {
        formating = contents.fit(this.columnWidth, this.height, section);
      } else if (this._flow === "paginated") {
        formating = contents.columns(this.width, this.height, this.columnWidth, this.gap, this.settings.direction);
      } else if (axis && axis === "horizontal") {
        formating = contents.size(null, this.height);
      } else {
        formating = contents.size(this.width, null);
      }

      return formating; // might be a promise in some View Managers
    }
    /**
     * Count number of pages
     * @param  {number} totalLength
     * @param  {number} pageLength
     * @return {{spreads: Number, pages: Number}}
     */

  }, {
    key: "count",
    value: function count(totalLength, pageLength) {
      var spreads, pages;

      if (this.name === "pre-paginated") {
        spreads = 1;
        pages = 1;
      } else if (this._flow === "paginated") {
        pageLength = pageLength || this.delta;
        spreads = Math.ceil(totalLength / pageLength);
        pages = spreads * this.divisor;
      } else {
        // scrolled
        pageLength = pageLength || this.height;
        spreads = Math.ceil(totalLength / pageLength);
        pages = spreads;
      }

      return {
        spreads: spreads,
        pages: pages
      };
    }
    /**
     * Update props that have changed
     * @private
     * @param  {object} props
     */

  }, {
    key: "update",
    value: function update(props) {
      var _this = this;

      // Remove props that haven't changed
      Object.keys(props).forEach(function (propName) {
        if (_this.props[propName] === props[propName]) {
          delete props[propName];
        }
      });

      if (Object.keys(props).length > 0) {
        var newProps = extend(this.props, props);
        this.emit(EVENTS.LAYOUT.UPDATED, newProps, props);
      }
    }
  }]);

  return Layout;
}();

event_emitter_default()(Layout.prototype);
/* harmony default export */ const src_layout = (Layout);
;// CONCATENATED MODULE: ./src/themes.js











function themes_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { themes_typeof = function _typeof(obj) { return typeof obj; }; } else { themes_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return themes_typeof(obj); }

function themes_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function themes_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function themes_createClass(Constructor, protoProps, staticProps) { if (protoProps) themes_defineProperties(Constructor.prototype, protoProps); if (staticProps) themes_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Themes to apply to displayed content
 * @class
 * @param {Rendition} rendition
 */

var Themes = /*#__PURE__*/function () {
  function Themes(rendition) {
    themes_classCallCheck(this, Themes);

    this.rendition = rendition;
    this._themes = {
      "default": {
        "rules": {},
        "url": "",
        "serialized": ""
      }
    };
    this._overrides = {};
    this._current = "default";
    this._injected = [];
    this.rendition.hooks.content.register(this.inject.bind(this));
    this.rendition.hooks.content.register(this.overrides.bind(this));
  }
  /**
   * Add themes to be used by a rendition
   * @param {object | Array<object> | string}
   * @example themes.register("light", "http://example.com/light.css")
   * @example themes.register("light", { "body": { "color": "purple"}})
   * @example themes.register({ "light" : {...}, "dark" : {...}})
   */


  themes_createClass(Themes, [{
    key: "register",
    value: function register() {
      if (arguments.length === 0) {
        return;
      }

      if (arguments.length === 1 && themes_typeof(arguments[0]) === "object") {
        return this.registerThemes(arguments[0]);
      }

      if (arguments.length === 1 && typeof arguments[0] === "string") {
        return this.default(arguments[0]);
      }

      if (arguments.length === 2 && typeof arguments[1] === "string") {
        return this.registerUrl(arguments[0], arguments[1]);
      }

      if (arguments.length === 2 && themes_typeof(arguments[1]) === "object") {
        return this.registerRules(arguments[0], arguments[1]);
      }
    }
    /**
     * Add a default theme to be used by a rendition
     * @param {object | string} theme
     * @example themes.register("http://example.com/default.css")
     * @example themes.register({ "body": { "color": "purple"}})
     */

  }, {
    key: "default",
    value: function _default(theme) {
      if (!theme) {
        return;
      }

      if (typeof theme === "string") {
        return this.registerUrl("default", theme);
      }

      if (themes_typeof(theme) === "object") {
        return this.registerRules("default", theme);
      }
    }
    /**
     * Register themes object
     * @param {object} themes
     */

  }, {
    key: "registerThemes",
    value: function registerThemes(themes) {
      for (var theme in themes) {
        if (themes.hasOwnProperty(theme)) {
          if (typeof themes[theme] === "string") {
            this.registerUrl(theme, themes[theme]);
          } else {
            this.registerRules(theme, themes[theme]);
          }
        }
      }
    }
    /**
     * Register a theme by passing its css as string
     * @param {string} name 
     * @param {string} css 
     */

  }, {
    key: "registerCss",
    value: function registerCss(name, css) {
      this._themes[name] = {
        "serialized": css
      };

      if (this._injected[name] || name == 'default') {
        this.update(name);
      }
    }
    /**
     * Register a url
     * @param {string} name
     * @param {string} input
     */

  }, {
    key: "registerUrl",
    value: function registerUrl(name, input) {
      var url = new utils_url(input);
      this._themes[name] = {
        "url": url.toString()
      };

      if (this._injected[name] || name == 'default') {
        this.update(name);
      }
    }
    /**
     * Register rule
     * @param {string} name
     * @param {object} rules
     */

  }, {
    key: "registerRules",
    value: function registerRules(name, rules) {
      this._themes[name] = {
        "rules": rules
      }; // TODO: serialize css rules

      if (this._injected[name] || name == 'default') {
        this.update(name);
      }
    }
    /**
     * Select a theme
     * @param {string} name
     */

  }, {
    key: "select",
    value: function select(name) {
      var prev = this._current;
      var contents;
      this._current = name;
      this.update(name);
      contents = this.rendition.getContents();
      contents.forEach(function (content) {
        content.removeClass(prev);
        content.addClass(name);
      });
    }
    /**
     * Update a theme
     * @param {string} name
     */

  }, {
    key: "update",
    value: function update(name) {
      var _this = this;

      var contents = this.rendition.getContents();
      contents.forEach(function (content) {
        _this.add(name, content);
      });
    }
    /**
     * Inject all themes into contents
     * @param {Contents} contents
     */

  }, {
    key: "inject",
    value: function inject(contents) {
      var links = [];
      var themes = this._themes;
      var theme;

      for (var name in themes) {
        if (themes.hasOwnProperty(name) && (name === this._current || name === "default")) {
          theme = themes[name];

          if (theme.rules && Object.keys(theme.rules).length > 0 || theme.url && links.indexOf(theme.url) === -1) {
            this.add(name, contents);
          }

          this._injected.push(name);
        }
      }

      if (this._current != "default") {
        contents.addClass(this._current);
      }
    }
    /**
     * Add Theme to contents
     * @param {string} name
     * @param {Contents} contents
     */

  }, {
    key: "add",
    value: function add(name, contents) {
      var theme = this._themes[name];

      if (!theme || !contents) {
        return;
      }

      if (theme.url) {
        contents.addStylesheet(theme.url);
      } else if (theme.serialized) {
        contents.addStylesheetCss(theme.serialized, name);
        theme.injected = true;
      } else if (theme.rules) {
        contents.addStylesheetRules(theme.rules, name);
        theme.injected = true;
      }
    }
    /**
     * Add override
     * @param {string} name
     * @param {string} value
     * @param {boolean} priority
     */

  }, {
    key: "override",
    value: function override(name, value, priority) {
      var _this2 = this;

      var contents = this.rendition.getContents();
      this._overrides[name] = {
        value: value,
        priority: priority === true
      };
      contents.forEach(function (content) {
        content.css(name, _this2._overrides[name].value, _this2._overrides[name].priority);
      });
    }
  }, {
    key: "removeOverride",
    value: function removeOverride(name) {
      var contents = this.rendition.getContents();
      delete this._overrides[name];
      contents.forEach(function (content) {
        content.css(name);
      });
    }
    /**
     * Add all overrides
     * @param {Content} content
     */

  }, {
    key: "overrides",
    value: function overrides(contents) {
      var overrides = this._overrides;

      for (var rule in overrides) {
        if (overrides.hasOwnProperty(rule)) {
          contents.css(rule, overrides[rule].value, overrides[rule].priority);
        }
      }
    }
    /**
     * Adjust the font size of a rendition
     * @param {number} size
     */

  }, {
    key: "fontSize",
    value: function fontSize(size) {
      this.override("font-size", size);
    }
    /**
     * Adjust the font-family of a rendition
     * @param {string} f
     */

  }, {
    key: "font",
    value: function font(f) {
      this.override("font-family", f, true);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.rendition = undefined;
      this._themes = undefined;
      this._overrides = undefined;
      this._current = undefined;
      this._injected = undefined;
    }
  }]);

  return Themes;
}();

/* harmony default export */ const themes = (Themes);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(2023);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(1038);
;// CONCATENATED MODULE: ./src/mapping.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }














function mapping_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mapping_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function mapping_createClass(Constructor, protoProps, staticProps) { if (protoProps) mapping_defineProperties(Constructor.prototype, protoProps); if (staticProps) mapping_defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Map text locations to CFI ranges
 * @class
 * @param {Layout} layout Layout to apply
 * @param {string} [direction="ltr"] Text direction
 * @param {string} [axis="horizontal"] vertical or horizontal axis
 * @param {boolean} [dev] toggle developer highlighting
 */

var Mapping = /*#__PURE__*/function () {
  function Mapping(layout, direction, axis) {
    var dev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    mapping_classCallCheck(this, Mapping);

    this.layout = layout;
    this.horizontal = axis === "horizontal" ? true : false;
    this.direction = direction || "ltr";
    this._dev = dev;
  }
  /**
   * Find CFI pairs for entire section at once
   */


  mapping_createClass(Mapping, [{
    key: "section",
    value: function section(view) {
      var ranges = this.findRanges(view);
      var map = this.rangeListToCfiList(view.section.cfiBase, ranges);
      return map;
    }
    /**
     * Find CFI pairs for a page
     * @param {Contents} contents Contents from view
     * @param {string} cfiBase string of the base for a cfi
     * @param {number} start position to start at
     * @param {number} end position to end at
     */

  }, {
    key: "page",
    value: function page(contents, cfiBase, start, end) {
      var root = contents && contents.document ? contents.document.body : false;
      var result;

      if (!root) {
        return;
      }

      result = this.rangePairToCfiPair(cfiBase, {
        start: this.findStart(root, start, end),
        end: this.findEnd(root, start, end)
      });

      if (this._dev === true) {
        var doc = contents.document;
        var startRange = new epubcfi(result.start).toRange(doc);
        var endRange = new epubcfi(result.end).toRange(doc);
        var selection = doc.defaultView.getSelection();
        var r = doc.createRange();
        selection.removeAllRanges();
        r.setStart(startRange.startContainer, startRange.startOffset);
        r.setEnd(endRange.endContainer, endRange.endOffset);
        selection.addRange(r);
      }

      return result;
    }
    /**
     * Walk a node, preforming a function on each node it finds
     * @private
     * @param {Node} root Node to walkToNode
     * @param {function} func walk function
     * @return {*} returns the result of the walk function
     */

  }, {
    key: "walk",
    value: function walk(root, func) {
      // IE11 has strange issue, if root is text node IE throws exception on
      // calling treeWalker.nextNode(), saying
      // Unexpected call to method or property access instead of returing null value
      if (root && root.nodeType === Node.TEXT_NODE) {
        return;
      } // safeFilter is required so that it can work in IE as filter is a function for IE
      // and for other browser filter is an object.


      var filter = {
        acceptNode: function acceptNode(node) {
          if (node.data.trim().length > 0) {
            return NodeFilter.FILTER_ACCEPT;
          } else {
            return NodeFilter.FILTER_REJECT;
          }
        }
      };
      var safeFilter = filter.acceptNode;
      safeFilter.acceptNode = filter.acceptNode;
      var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
      var node;
      var result;

      while (node = treeWalker.nextNode()) {
        result = func(node);
        if (result) break;
      }

      return result;
    }
  }, {
    key: "findRanges",
    value: function findRanges(view) {
      var columns = [];
      var scrollWidth = view.contents.scrollWidth();
      var spreads = Math.ceil(scrollWidth / this.layout.spreadWidth);
      var count = spreads * this.layout.divisor;
      var columnWidth = this.layout.columnWidth;
      var gap = this.layout.gap;
      var start, end;

      for (var i = 0; i < count.pages; i++) {
        start = (columnWidth + gap) * i;
        end = columnWidth * (i + 1) + gap * i;
        columns.push({
          start: this.findStart(view.document.body, start, end),
          end: this.findEnd(view.document.body, start, end)
        });
      }

      return columns;
    }
    /**
     * Find Start Range
     * @private
     * @param {Node} root root node
     * @param {number} start position to start at
     * @param {number} end position to end at
     * @return {Range}
     */

  }, {
    key: "findStart",
    value: function findStart(root, start, end) {
      var _this = this;

      var stack = [root];
      var $el;
      var found;
      var $prev = root;

      while (stack.length) {
        $el = stack.shift();
        found = this.walk($el, function (node) {
          var left, right, top, bottom;
          var elPos;
          var elRange;
          elPos = nodeBounds(node);

          if (_this.horizontal && _this.direction === "ltr") {
            left = _this.horizontal ? elPos.left : elPos.top;
            right = _this.horizontal ? elPos.right : elPos.bottom;

            if (left >= start && left <= end) {
              return node;
            } else if (right > start) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          } else if (_this.horizontal && _this.direction === "rtl") {
            left = elPos.left;
            right = elPos.right;

            if (right <= end && right >= start) {
              return node;
            } else if (left < end) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          } else {
            top = elPos.top;
            bottom = elPos.bottom;

            if (top >= start && top <= end) {
              return node;
            } else if (bottom > start) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          }
        });

        if (found) {
          return this.findTextStartRange(found, start, end);
        }
      } // Return last element


      return this.findTextStartRange($prev, start, end);
    }
    /**
     * Find End Range
     * @private
     * @param {Node} root root node
     * @param {number} start position to start at
     * @param {number} end position to end at
     * @return {Range}
     */

  }, {
    key: "findEnd",
    value: function findEnd(root, start, end) {
      var _this2 = this;

      var stack = [root];
      var $el;
      var $prev = root;
      var found;

      while (stack.length) {
        $el = stack.shift();
        found = this.walk($el, function (node) {
          var left, right, top, bottom;
          var elPos;
          var elRange;
          elPos = nodeBounds(node);

          if (_this2.horizontal && _this2.direction === "ltr") {
            left = Math.round(elPos.left);
            right = Math.round(elPos.right);

            if (left > end && $prev) {
              return $prev;
            } else if (right > end) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          } else if (_this2.horizontal && _this2.direction === "rtl") {
            left = Math.round(_this2.horizontal ? elPos.left : elPos.top);
            right = Math.round(_this2.horizontal ? elPos.right : elPos.bottom);

            if (right < start && $prev) {
              return $prev;
            } else if (left < start) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          } else {
            top = Math.round(elPos.top);
            bottom = Math.round(elPos.bottom);

            if (top > end && $prev) {
              return $prev;
            } else if (bottom > end) {
              return node;
            } else {
              $prev = node;
              stack.push(node);
            }
          }
        });

        if (found) {
          return this.findTextEndRange(found, start, end);
        }
      } // end of chapter


      return this.findTextEndRange($prev, start, end);
    }
    /**
     * Find Text Start Range
     * @private
     * @param {Node} root root node
     * @param {number} start position to start at
     * @param {number} end position to end at
     * @return {Range}
     */

  }, {
    key: "findTextStartRange",
    value: function findTextStartRange(node, start, end) {
      var ranges = this.splitTextNodeIntoRanges(node);
      var range;
      var pos;
      var left, top, right;

      for (var i = 0; i < ranges.length; i++) {
        range = ranges[i];
        pos = range.getBoundingClientRect();

        if (this.horizontal && this.direction === "ltr") {
          left = pos.left;

          if (left >= start) {
            return range;
          }
        } else if (this.horizontal && this.direction === "rtl") {
          right = pos.right;

          if (right <= end) {
            return range;
          }
        } else {
          top = pos.top;

          if (top >= start) {
            return range;
          }
        } // prev = range;

      }

      return ranges[0];
    }
    /**
     * Find Text End Range
     * @private
     * @param {Node} root root node
     * @param {number} start position to start at
     * @param {number} end position to end at
     * @return {Range}
     */

  }, {
    key: "findTextEndRange",
    value: function findTextEndRange(node, start, end) {
      var ranges = this.splitTextNodeIntoRanges(node);
      var prev;
      var range;
      var pos;
      var left, right, top, bottom;

      for (var i = 0; i < ranges.length; i++) {
        range = ranges[i];
        pos = range.getBoundingClientRect();

        if (this.horizontal && this.direction === "ltr") {
          left = pos.left;
          right = pos.right;

          if (left > end && prev) {
            return prev;
          } else if (right > end) {
            return range;
          }
        } else if (this.horizontal && this.direction === "rtl") {
          left = pos.left;
          right = pos.right;

          if (right < start && prev) {
            return prev;
          } else if (left < start) {
            return range;
          }
        } else {
          top = pos.top;
          bottom = pos.bottom;

          if (top > end && prev) {
            return prev;
          } else if (bottom > end) {
            return range;
          }
        }

        prev = range;
      } // Ends before limit


      return ranges[ranges.length - 1];
    }
    /**
     * Split up a text node into ranges for each word
     * @private
     * @param {Node} root root node
     * @param {string} [_splitter] what to split on
     * @return {Range[]}
     */

  }, {
    key: "splitTextNodeIntoRanges",
    value: function splitTextNodeIntoRanges(node, _splitter) {
      var ranges = [];
      var textContent = node.textContent || "";
      var text = textContent.trim();
      var range;
      var doc = node.ownerDocument;
      var splitter = _splitter || " ";
      var pos = text.indexOf(splitter);

      if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
        if (text !== '') {
          pos = 0;

          var _iterator = _createForOfIteratorHelper(text),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var ch = _step.value;
              range = doc.createRange();
              range.setStart(node, pos);
              range.setEnd(node, ++pos);
              ranges.push(range);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return ranges;
        } else {
          range = doc.createRange();
          range.selectNodeContents(node);
          return [range];
        }
      }

      range = doc.createRange();
      range.setStart(node, 0);
      range.setEnd(node, pos);
      ranges.push(range);
      range = false;

      while (pos != -1) {
        pos = text.indexOf(splitter, pos + 1);

        if (pos > 0) {
          if (range) {
            range.setEnd(node, pos);
            ranges.push(range);
          }

          range = doc.createRange();
          range.setStart(node, pos + 1);
        }
      }

      if (range) {
        range.setEnd(node, text.length);
        ranges.push(range);
      }

      return ranges;
    }
    /**
     * Turn a pair of ranges into a pair of CFIs
     * @private
     * @param {string} cfiBase base string for an EpubCFI
     * @param {object} rangePair { start: Range, end: Range }
     * @return {object} { start: "epubcfi(...)", end: "epubcfi(...)" }
     */

  }, {
    key: "rangePairToCfiPair",
    value: function rangePairToCfiPair(cfiBase, rangePair) {
      var startRange = rangePair.start;
      var endRange = rangePair.end;
      startRange.collapse(true);
      endRange.collapse(false);
      var startCfi = new epubcfi(startRange, cfiBase).toString();
      var endCfi = new epubcfi(endRange, cfiBase).toString();
      return {
        start: startCfi,
        end: endCfi
      };
    }
  }, {
    key: "rangeListToCfiList",
    value: function rangeListToCfiList(cfiBase, columns) {
      var map = [];
      var cifPair;

      for (var i = 0; i < columns.length; i++) {
        cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);
        map.push(cifPair);
      }

      return map;
    }
    /**
     * Set the axis for mapping
     * @param {string} axis horizontal | vertical
     * @return {boolean} is it horizontal?
     */

  }, {
    key: "axis",
    value: function axis(_axis) {
      if (_axis) {
        this.horizontal = _axis === "horizontal" ? true : false;
      }

      return this.horizontal;
    }
  }]);

  return Mapping;
}();

/* harmony default export */ const src_mapping = (Mapping);
;// CONCATENATED MODULE: ./src/contents.js













function contents_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function contents_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function contents_createClass(Constructor, protoProps, staticProps) { if (protoProps) contents_defineProperties(Constructor.prototype, protoProps); if (staticProps) contents_defineProperties(Constructor, staticProps); return Constructor; }







var hasNavigator = typeof navigator !== "undefined";
var isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
var isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);
var contents_ELEMENT_NODE = 1;
var contents_TEXT_NODE = 3;
/**
	* Handles DOM manipulation, queries and events for View contents
	* @class
	* @param {document} doc Document
	* @param {element} content Parent Element (typically Body)
	* @param {string} cfiBase Section component of CFIs
	* @param {number} sectionIndex Index in Spine of Conntent's Section
	*/

var Contents = /*#__PURE__*/function () {
  function Contents(doc, content, cfiBase, sectionIndex) {
    contents_classCallCheck(this, Contents);

    // Blank Cfi for Parsing
    this.epubcfi = new epubcfi();
    this.document = doc;
    this.documentElement = this.document.documentElement;
    this.content = content || this.document.body;
    this.window = this.document.defaultView;
    this._size = {
      width: 0,
      height: 0
    };
    this.sectionIndex = sectionIndex || 0;
    this.cfiBase = cfiBase || "";
    this.epubReadingSystem("epub.js", EPUBJS_VERSION);
    this.called = 0;
    this.active = true;
    this.listeners();
  }
  /**
  	* Get DOM events that are listened for and passed along
  	*/


  contents_createClass(Contents, [{
    key: "width",
    value:
    /**
    	* Get or Set width
    	* @param {number} [w]
    	* @returns {number} width
    	*/
    function width(w) {
      // var frame = this.documentElement;
      var frame = this.content;

      if (w && isNumber(w)) {
        w = w + "px";
      }

      if (w) {
        frame.style.width = w; // this.content.style.width = w;
      }

      return parseInt(this.window.getComputedStyle(frame)["width"]);
    }
    /**
    	* Get or Set height
    	* @param {number} [h]
    	* @returns {number} height
    	*/

  }, {
    key: "height",
    value: function height(h) {
      // var frame = this.documentElement;
      var frame = this.content;

      if (h && isNumber(h)) {
        h = h + "px";
      }

      if (h) {
        frame.style.height = h; // this.content.style.height = h;
      }

      return parseInt(this.window.getComputedStyle(frame)["height"]);
    }
    /**
    	* Get or Set width of the contents
    	* @param {number} [w]
    	* @returns {number} width
    	*/

  }, {
    key: "contentWidth",
    value: function contentWidth(w) {
      var content = this.content || this.document.body;

      if (w && isNumber(w)) {
        w = w + "px";
      }

      if (w) {
        content.style.width = w;
      }

      return parseInt(this.window.getComputedStyle(content)["width"]);
    }
    /**
    	* Get or Set height of the contents
    	* @param {number} [h]
    	* @returns {number} height
    	*/

  }, {
    key: "contentHeight",
    value: function contentHeight(h) {
      var content = this.content || this.document.body;

      if (h && isNumber(h)) {
        h = h + "px";
      }

      if (h) {
        content.style.height = h;
      }

      return parseInt(this.window.getComputedStyle(content)["height"]);
    }
    /**
    	* Get the width of the text using Range
    	* @returns {number} width
    	*/

  }, {
    key: "textWidth",
    value: function textWidth() {
      var rect;
      var width;
      var range = this.document.createRange();
      var content = this.content || this.document.body;
      var border = borders(content); // Select the contents of frame

      range.selectNodeContents(content); // get the width of the text content

      rect = range.getBoundingClientRect();
      width = rect.width;

      if (border && border.width) {
        width += border.width;
      }

      return Math.round(width);
    }
    /**
    	* Get the height of the text using Range
    	* @returns {number} height
    	*/

  }, {
    key: "textHeight",
    value: function textHeight() {
      var rect;
      var height;
      var range = this.document.createRange();
      var content = this.content || this.document.body;
      range.selectNodeContents(content);
      rect = range.getBoundingClientRect();
      height = rect.bottom;
      return Math.round(height);
    }
    /**
    	* Get documentElement scrollWidth
    	* @returns {number} width
    	*/

  }, {
    key: "scrollWidth",
    value: function scrollWidth() {
      var width = this.documentElement.scrollWidth;
      return width;
    }
    /**
    	* Get documentElement scrollHeight
    	* @returns {number} height
    	*/

  }, {
    key: "scrollHeight",
    value: function scrollHeight() {
      var height = this.documentElement.scrollHeight;
      return height;
    }
    /**
    	* Set overflow css style of the contents
    	* @param {string} [overflow]
    	*/

  }, {
    key: "overflow",
    value: function overflow(_overflow) {
      if (_overflow) {
        this.documentElement.style.overflow = _overflow;
      }

      return this.window.getComputedStyle(this.documentElement)["overflow"];
    }
    /**
    	* Set overflowX css style of the documentElement
    	* @param {string} [overflow]
    	*/

  }, {
    key: "overflowX",
    value: function overflowX(overflow) {
      if (overflow) {
        this.documentElement.style.overflowX = overflow;
      }

      return this.window.getComputedStyle(this.documentElement)["overflowX"];
    }
    /**
    	* Set overflowY css style of the documentElement
    	* @param {string} [overflow]
    	*/

  }, {
    key: "overflowY",
    value: function overflowY(overflow) {
      if (overflow) {
        this.documentElement.style.overflowY = overflow;
      }

      return this.window.getComputedStyle(this.documentElement)["overflowY"];
    }
    /**
    	* Set Css styles on the contents element (typically Body)
    	* @param {string} property
    	* @param {string} value
    	* @param {boolean} [priority] set as "important"
    	*/

  }, {
    key: "css",
    value: function css(property, value, priority) {
      var content = this.content || this.document.body;

      if (value) {
        content.style.setProperty(property, value, priority ? "important" : "");
      } else {
        content.style.removeProperty(property);
      }

      return this.window.getComputedStyle(content)[property];
    }
    /**
    	* Get or Set the viewport element
    	* @param {object} [options]
    	* @param {string} [options.width]
    	* @param {string} [options.height]
    	* @param {string} [options.scale]
    	* @param {string} [options.minimum]
    	* @param {string} [options.maximum]
    	* @param {string} [options.scalable]
    	*/

  }, {
    key: "viewport",
    value: function viewport(options) {
      var _width, _height, _scale, _minimum, _maximum, _scalable; // var width, height, scale, minimum, maximum, scalable;


      var $viewport = this.document.querySelector("meta[name='viewport']");
      var parsed = {
        "width": undefined,
        "height": undefined,
        "scale": undefined,
        "minimum": undefined,
        "maximum": undefined,
        "scalable": undefined
      };
      var newContent = [];
      var settings = {};
      /*
      * check for the viewport size
      * <meta name="viewport" content="width=1024,height=697" />
      */

      if ($viewport && $viewport.hasAttribute("content")) {
        var content = $viewport.getAttribute("content");

        var _width2 = content.match(/width\s*=\s*([^,]*)/);

        var _height2 = content.match(/height\s*=\s*([^,]*)/);

        var _scale2 = content.match(/initial-scale\s*=\s*([^,]*)/);

        var _minimum2 = content.match(/minimum-scale\s*=\s*([^,]*)/);

        var _maximum2 = content.match(/maximum-scale\s*=\s*([^,]*)/);

        var _scalable2 = content.match(/user-scalable\s*=\s*([^,]*)/);

        if (_width2 && _width2.length && typeof _width2[1] !== "undefined") {
          parsed.width = _width2[1];
        }

        if (_height2 && _height2.length && typeof _height2[1] !== "undefined") {
          parsed.height = _height2[1];
        }

        if (_scale2 && _scale2.length && typeof _scale2[1] !== "undefined") {
          parsed.scale = _scale2[1];
        }

        if (_minimum2 && _minimum2.length && typeof _minimum2[1] !== "undefined") {
          parsed.minimum = _minimum2[1];
        }

        if (_maximum2 && _maximum2.length && typeof _maximum2[1] !== "undefined") {
          parsed.maximum = _maximum2[1];
        }

        if (_scalable2 && _scalable2.length && typeof _scalable2[1] !== "undefined") {
          parsed.scalable = _scalable2[1];
        }
      }

      settings = defaults(options || {}, parsed);

      if (options) {
        if (settings.width) {
          newContent.push("width=" + settings.width);
        }

        if (settings.height) {
          newContent.push("height=" + settings.height);
        }

        if (settings.scale) {
          newContent.push("initial-scale=" + settings.scale);
        }

        if (settings.scalable === "no") {
          newContent.push("minimum-scale=" + settings.scale);
          newContent.push("maximum-scale=" + settings.scale);
          newContent.push("user-scalable=" + settings.scalable);
        } else {
          if (settings.scalable) {
            newContent.push("user-scalable=" + settings.scalable);
          }

          if (settings.minimum) {
            newContent.push("minimum-scale=" + settings.minimum);
          }

          if (settings.maximum) {
            newContent.push("minimum-scale=" + settings.maximum);
          }
        }

        if (!$viewport) {
          $viewport = this.document.createElement("meta");
          $viewport.setAttribute("name", "viewport");
          this.document.querySelector("head").appendChild($viewport);
        }

        $viewport.setAttribute("content", newContent.join(", "));
        this.window.scrollTo(0, 0);
      }

      return settings;
    }
    /**
     * Event emitter for when the contents has expanded
     * @private
     */

  }, {
    key: "expand",
    value: function expand() {
      this.emit(EVENTS.CONTENTS.EXPAND);
    }
    /**
     * Add DOM listeners
     * @private
     */

  }, {
    key: "listeners",
    value: function listeners() {
      this.imageLoadListeners();
      this.mediaQueryListeners(); // this.fontLoadListeners();

      this.addEventListeners();
      this.addSelectionListeners(); // this.transitionListeners();

      if (typeof ResizeObserver === "undefined") {
        this.resizeListeners();
        this.visibilityListeners();
      } else {
        this.resizeObservers();
      } // this.mutationObservers();


      this.linksHandler();
    }
    /**
     * Remove DOM listeners
     * @private
     */

  }, {
    key: "removeListeners",
    value: function removeListeners() {
      this.removeEventListeners();
      this.removeSelectionListeners();

      if (this.observer) {
        this.observer.disconnect();
      }

      clearTimeout(this.expanding);
    }
    /**
     * Check if size of contents has changed and
     * emit 'resize' event if it has.
     * @private
     */

  }, {
    key: "resizeCheck",
    value: function resizeCheck() {
      var width = this.textWidth();
      var height = this.textHeight();

      if (width != this._size.width || height != this._size.height) {
        this._size = {
          width: width,
          height: height
        };
        this.onResize && this.onResize(this._size);
        this.emit(EVENTS.CONTENTS.RESIZE, this._size);
      }
    }
    /**
     * Poll for resize detection
     * @private
     */

  }, {
    key: "resizeListeners",
    value: function resizeListeners() {
      var width, height; // Test size again

      clearTimeout(this.expanding);
      requestAnimationFrame(this.resizeCheck.bind(this));
      this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
    }
    /**
     * Listen for visibility of tab to change
     * @private
     */

  }, {
    key: "visibilityListeners",
    value: function visibilityListeners() {
      var _this = this;

      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible" && _this.active === false) {
          _this.active = true;

          _this.resizeListeners();
        } else {
          _this.active = false;
          clearTimeout(_this.expanding);
        }
      });
    }
    /**
     * Use css transitions to detect resize
     * @private
     */

  }, {
    key: "transitionListeners",
    value: function transitionListeners() {
      var body = this.content;
      body.style['transitionProperty'] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
      body.style['transitionDuration'] = "0.001ms";
      body.style['transitionTimingFunction'] = "linear";
      body.style['transitionDelay'] = "0";
      this._resizeCheck = this.resizeCheck.bind(this);
      this.document.addEventListener('transitionend', this._resizeCheck);
    }
    /**
     * Listen for media query changes and emit 'expand' event
     * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
     * @private
     */

  }, {
    key: "mediaQueryListeners",
    value: function mediaQueryListeners() {
      var sheets = this.document.styleSheets;

      var mediaChangeHandler = function (m) {
        if (m.matches && !this._expanding) {
          setTimeout(this.expand.bind(this), 1);
        }
      }.bind(this);

      for (var i = 0; i < sheets.length; i += 1) {
        var rules; // Firefox errors if we access cssRules cross-domain

        try {
          rules = sheets[i].cssRules;
        } catch (e) {
          return;
        }

        if (!rules) return; // Stylesheets changed

        for (var j = 0; j < rules.length; j += 1) {
          //if (rules[j].constructor === CSSMediaRule) {
          if (rules[j].media) {
            var mql = this.window.matchMedia(rules[j].media.mediaText);
            mql.addListener(mediaChangeHandler); //mql.onchange = mediaChangeHandler;
          }
        }
      }
    }
    /**
     * Use ResizeObserver to listen for changes in the DOM and check for resize
     * @private
     */

  }, {
    key: "resizeObservers",
    value: function resizeObservers() {
      var _this2 = this;

      // create an observer instance
      this.observer = new ResizeObserver(function (e) {
        requestAnimationFrame(_this2.resizeCheck.bind(_this2));
      }); // pass in the target node

      this.observer.observe(this.document.documentElement);
    }
    /**
     * Use MutationObserver to listen for changes in the DOM and check for resize
     * @private
     */

  }, {
    key: "mutationObservers",
    value: function mutationObservers() {
      var _this3 = this;

      // create an observer instance
      this.observer = new MutationObserver(function (mutations) {
        _this3.resizeCheck();
      }); // configuration of the observer:

      var config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      }; // pass in the target node, as well as the observer options

      this.observer.observe(this.document, config);
    }
    /**
     * Test if images are loaded or add listener for when they load
     * @private
     */

  }, {
    key: "imageLoadListeners",
    value: function imageLoadListeners() {
      var images = this.document.querySelectorAll("img");
      var img;

      for (var i = 0; i < images.length; i++) {
        img = images[i];

        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
          img.onload = this.expand.bind(this);
        }
      }
    }
    /**
     * Listen for font load and check for resize when loaded
     * @private
     */

  }, {
    key: "fontLoadListeners",
    value: function fontLoadListeners() {
      if (!this.document || !this.document.fonts) {
        return;
      }

      this.document.fonts.ready.then(function () {
        this.resizeCheck();
      }.bind(this));
    }
    /**
     * Get the documentElement
     * @returns {element} documentElement
     */

  }, {
    key: "root",
    value: function root() {
      if (!this.document) return null;
      return this.document.documentElement;
    }
    /**
     * Get the location offset of a EpubCFI or an #id
     * @param {string | EpubCFI} target
     * @param {string} [ignoreClass] for the cfi
     * @returns { {left: Number, top: Number }
     */

  }, {
    key: "locationOf",
    value: function locationOf(target, ignoreClass) {
      var position;
      var targetPos = {
        "left": 0,
        "top": 0
      };
      if (!this.document) return targetPos;

      if (this.epubcfi.isCfiString(target)) {
        var range = new epubcfi(target).toRange(this.document, ignoreClass);

        if (range) {
          try {
            if (!range.endContainer || range.startContainer == range.endContainer && range.startOffset == range.endOffset) {
              // If the end for the range is not set, it results in collapsed becoming
              // true. This in turn leads to inconsistent behaviour when calling
              // getBoundingRect. Wrong bounds lead to the wrong page being displayed.
              // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15684911/
              var pos = range.startContainer.textContent.indexOf(" ", range.startOffset);

              if (pos == -1) {
                pos = range.startContainer.textContent.length;
              }

              range.setEnd(range.startContainer, pos);
            }
          } catch (e) {
            console.error("setting end offset to start container length failed", e);
          }

          if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
            position = range.startContainer.getBoundingClientRect();
            targetPos.left = position.left;
            targetPos.top = position.top;
          } else {
            // Webkit does not handle collapsed range bounds correctly
            // https://bugs.webkit.org/show_bug.cgi?id=138949
            // Construct a new non-collapsed range
            if (isWebkit) {
              var container = range.startContainer;
              var newRange = new Range();

              try {
                if (container.nodeType === contents_ELEMENT_NODE) {
                  position = container.getBoundingClientRect();
                } else if (range.startOffset + 2 < container.length) {
                  newRange.setStart(container, range.startOffset);
                  newRange.setEnd(container, range.startOffset + 2);
                  position = newRange.getBoundingClientRect();
                } else if (range.startOffset - 2 > 0) {
                  newRange.setStart(container, range.startOffset - 2);
                  newRange.setEnd(container, range.startOffset);
                  position = newRange.getBoundingClientRect();
                } else {
                  // empty, return the parent element
                  position = container.parentNode.getBoundingClientRect();
                }
              } catch (e) {
                console.error(e, e.stack);
              }
            } else {
              position = range.getBoundingClientRect();
            }
          }
        }
      } else if (typeof target === "string" && target.indexOf("#") > -1) {
        var id = target.substring(target.indexOf("#") + 1);
        var el = this.document.getElementById(id);

        if (el) {
          if (isWebkit) {
            // Webkit reports incorrect bounding rects in Columns
            var _newRange = new Range();

            _newRange.selectNode(el);

            position = _newRange.getBoundingClientRect();
          } else {
            position = el.getBoundingClientRect();
          }
        }
      }

      if (position) {
        targetPos.left = position.left;
        targetPos.top = position.top;
      }

      return targetPos;
    }
    /**
     * Append a stylesheet link to the document head
     * @param {string} src url
     */

  }, {
    key: "addStylesheet",
    value: function addStylesheet(src) {
      return new Promise(function (resolve, reject) {
        var $stylesheet;
        var ready = false;

        if (!this.document) {
          resolve(false);
          return;
        } // Check if link already exists


        $stylesheet = this.document.querySelector("link[href='" + src + "']");

        if ($stylesheet) {
          resolve(true);
          return; // already present
        }

        $stylesheet = this.document.createElement("link");
        $stylesheet.type = "text/css";
        $stylesheet.rel = "stylesheet";
        $stylesheet.href = src;

        $stylesheet.onload = $stylesheet.onreadystatechange = function () {
          if (!ready && (!this.readyState || this.readyState == "complete")) {
            ready = true; // Let apply

            setTimeout(function () {
              resolve(true);
            }, 1);
          }
        };

        this.document.head.appendChild($stylesheet);
      }.bind(this));
    }
  }, {
    key: "_getStylesheetNode",
    value: function _getStylesheetNode(key) {
      var styleEl;
      key = "epubjs-inserted-css-" + (key || '');
      if (!this.document) return false; // Check if link already exists

      styleEl = this.document.getElementById(key);

      if (!styleEl) {
        styleEl = this.document.createElement("style");
        styleEl.id = key; // Append style element to head

        this.document.head.appendChild(styleEl);
      }

      return styleEl;
    }
    /**
     * Append stylesheet css
     * @param {string} serializedCss
     * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
     */

  }, {
    key: "addStylesheetCss",
    value: function addStylesheetCss(serializedCss, key) {
      if (!this.document || !serializedCss) return false;
      var styleEl;
      styleEl = this._getStylesheetNode(key);
      styleEl.innerHTML = serializedCss;
      return true;
    }
    /**
     * Append stylesheet rules to a generate stylesheet
     * Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
     * Object: https://github.com/desirable-objects/json-to-css
     * @param {array | object} rules
     * @param {string} key If the key is the same, the CSS will be replaced instead of inserted
     */

  }, {
    key: "addStylesheetRules",
    value: function addStylesheetRules(rules, key) {
      var styleSheet;
      if (!this.document || !rules || rules.length === 0) return; // Grab style sheet

      styleSheet = this._getStylesheetNode(key).sheet;

      if (Object.prototype.toString.call(rules) === "[object Array]") {
        for (var i = 0, rl = rules.length; i < rl; i++) {
          var j = 1,
              rule = rules[i],
              selector = rules[i][0],
              propStr = ""; // If the second argument of a rule is an array of arrays, correct our variables.

          if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
            rule = rule[1];
            j = 0;
          }

          for (var pl = rule.length; j < pl; j++) {
            var prop = rule[j];
            propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
          } // Insert CSS Rule


          styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
        }
      } else {
        var selectors = Object.keys(rules);
        selectors.forEach(function (selector) {
          var definition = rules[selector];

          if (Array.isArray(definition)) {
            definition.forEach(function (item) {
              var _rules = Object.keys(item);

              var result = _rules.map(function (rule) {
                return "".concat(rule, ":").concat(item[rule]);
              }).join(';');

              styleSheet.insertRule("".concat(selector, "{").concat(result, "}"), styleSheet.cssRules.length);
            });
          } else {
            var _rules = Object.keys(definition);

            var result = _rules.map(function (rule) {
              return "".concat(rule, ":").concat(definition[rule]);
            }).join(';');

            styleSheet.insertRule("".concat(selector, "{").concat(result, "}"), styleSheet.cssRules.length);
          }
        });
      }
    }
    /**
     * Append a script tag to the document head
     * @param {string} src url
     * @returns {Promise} loaded
     */

  }, {
    key: "addScript",
    value: function addScript(src) {
      return new Promise(function (resolve, reject) {
        var $script;
        var ready = false;

        if (!this.document) {
          resolve(false);
          return;
        }

        $script = this.document.createElement("script");
        $script.type = "text/javascript";
        $script.async = true;
        $script.src = src;

        $script.onload = $script.onreadystatechange = function () {
          if (!ready && (!this.readyState || this.readyState == "complete")) {
            ready = true;
            setTimeout(function () {
              resolve(true);
            }, 1);
          }
        };

        this.document.head.appendChild($script);
      }.bind(this));
    }
    /**
     * Add a class to the contents container
     * @param {string} className
     */

  }, {
    key: "addClass",
    value: function addClass(className) {
      var content;
      if (!this.document) return;
      content = this.content || this.document.body;

      if (content) {
        content.classList.add(className);
      }
    }
    /**
     * Remove a class from the contents container
     * @param {string} removeClass
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {
      var content;
      if (!this.document) return;
      content = this.content || this.document.body;

      if (content) {
        content.classList.remove(className);
      }
    }
    /**
     * Add DOM event listeners
     * @private
     */

  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      if (!this.document) {
        return;
      }

      this._triggerEvent = this.triggerEvent.bind(this);
      DOM_EVENTS.forEach(function (eventName) {
        this.document.addEventListener(eventName, this._triggerEvent, {
          passive: true
        });
      }, this);
    }
    /**
     * Remove DOM event listeners
     * @private
     */

  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      if (!this.document) {
        return;
      }

      DOM_EVENTS.forEach(function (eventName) {
        this.document.removeEventListener(eventName, this._triggerEvent, {
          passive: true
        });
      }, this);
      this._triggerEvent = undefined;
    }
    /**
     * Emit passed browser events
     * @private
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(e) {
      this.emit(e.type, e);
    }
    /**
     * Add listener for text selection
     * @private
     */

  }, {
    key: "addSelectionListeners",
    value: function addSelectionListeners() {
      if (!this.document) {
        return;
      }

      this._onSelectionChange = this.onSelectionChange.bind(this);
      this.document.addEventListener("selectionchange", this._onSelectionChange, {
        passive: true
      });
    }
    /**
     * Remove listener for text selection
     * @private
     */

  }, {
    key: "removeSelectionListeners",
    value: function removeSelectionListeners() {
      if (!this.document) {
        return;
      }

      this.document.removeEventListener("selectionchange", this._onSelectionChange, {
        passive: true
      });
      this._onSelectionChange = undefined;
    }
    /**
     * Handle getting text on selection
     * @private
     */

  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(e) {
      if (this.selectionEndTimeout) {
        clearTimeout(this.selectionEndTimeout);
      }

      this.selectionEndTimeout = setTimeout(function () {
        var selection = this.window.getSelection();
        this.triggerSelectedEvent(selection);
      }.bind(this), 250);
    }
    /**
     * Emit event on text selection
     * @private
     */

  }, {
    key: "triggerSelectedEvent",
    value: function triggerSelectedEvent(selection) {
      var range, cfirange;

      if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);

        if (!range.collapsed) {
          // cfirange = this.section.cfiFromRange(range);
          cfirange = new epubcfi(range, this.cfiBase).toString();
          this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
          this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
        }
      }
    }
    /**
     * Get a Dom Range from EpubCFI
     * @param {EpubCFI} _cfi
     * @param {string} [ignoreClass]
     * @returns {Range} range
     */

  }, {
    key: "range",
    value: function range(_cfi, ignoreClass) {
      var cfi = new epubcfi(_cfi);
      return cfi.toRange(this.document, ignoreClass);
    }
    /**
     * Get an EpubCFI from a Dom Range
     * @param {Range} range
     * @param {string} [ignoreClass]
     * @returns {EpubCFI} cfi
     */

  }, {
    key: "cfiFromRange",
    value: function cfiFromRange(range, ignoreClass) {
      return new epubcfi(range, this.cfiBase, ignoreClass).toString();
    }
    /**
     * Get an EpubCFI from a Dom node
     * @param {node} node
     * @param {string} [ignoreClass]
     * @returns {EpubCFI} cfi
     */

  }, {
    key: "cfiFromNode",
    value: function cfiFromNode(node, ignoreClass) {
      return new epubcfi(node, this.cfiBase, ignoreClass).toString();
    } // TODO: find where this is used - remove?

  }, {
    key: "map",
    value: function map(layout) {
      var map = new src_mapping(layout);
      return map.section();
    }
    /**
     * Size the contents to a given width and height
     * @param {number} [width]
     * @param {number} [height]
     */

  }, {
    key: "size",
    value: function size(width, height) {
      var viewport = {
        scale: 1.0,
        scalable: "no"
      };
      this.layoutStyle("scrolling");

      if (width >= 0) {
        this.width(width);
        viewport.width = width;
        this.css("padding", "0 " + width / 12 + "px");
      }

      if (height >= 0) {
        this.height(height);
        viewport.height = height;
      }

      this.css("margin", "0");
      this.css("box-sizing", "border-box");
      this.viewport(viewport);
    }
    /**
     * Apply columns to the contents for pagination
     * @param {number} width
     * @param {number} height
     * @param {number} columnWidth
     * @param {number} gap
     */

  }, {
    key: "columns",
    value: function columns(width, height, columnWidth, gap, dir) {
      var COLUMN_AXIS = prefixed("column-axis");
      var COLUMN_GAP = prefixed("column-gap");
      var COLUMN_WIDTH = prefixed("column-width");
      var COLUMN_FILL = prefixed("column-fill");
      var writingMode = this.writingMode();
      var axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
      this.layoutStyle("paginated");

      if (dir === "rtl" && axis === "horizontal") {
        this.direction(dir);
      }

      this.width(width);
      this.height(height); // Deal with Mobile trying to scale to viewport

      this.viewport({
        width: width,
        height: height,
        scale: 1.0,
        scalable: "no"
      }); // TODO: inline-block needs more testing
      // Fixes Safari column cut offs, but causes RTL issues
      // this.css("display", "inline-block");

      this.css("overflow-y", "hidden");
      this.css("margin", "0", true);

      if (axis === "vertical") {
        this.css("padding-top", gap / 2 + "px", true);
        this.css("padding-bottom", gap / 2 + "px", true);
        this.css("padding-left", "20px");
        this.css("padding-right", "20px");
        this.css(COLUMN_AXIS, "vertical");
      } else {
        this.css("padding-top", "20px");
        this.css("padding-bottom", "20px");
        this.css("padding-left", gap / 2 + "px", true);
        this.css("padding-right", gap / 2 + "px", true);
        this.css(COLUMN_AXIS, "horizontal");
      }

      this.css("box-sizing", "border-box");
      this.css("max-width", "inherit");
      this.css(COLUMN_FILL, "auto");
      this.css(COLUMN_GAP, gap + "px");
      this.css(COLUMN_WIDTH, columnWidth + "px"); // Fix glyph clipping in WebKit
      // https://github.com/futurepress/epub.js/issues/983

      this.css("-webkit-line-box-contain", "block glyphs replaced");
    }
    /**
     * Scale contents from center
     * @param {number} scale
     * @param {number} offsetX
     * @param {number} offsetY
     */

  }, {
    key: "scaler",
    value: function scaler(scale, offsetX, offsetY) {
      var scaleStr = "scale(" + scale + ")";
      var translateStr = ""; // this.css("position", "absolute"));

      this.css("transform-origin", "top left");

      if (offsetX >= 0 || offsetY >= 0) {
        translateStr = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
      }

      this.css("transform", scaleStr + translateStr);
    }
    /**
     * Fit contents into a fixed width and height
     * @param {number} width
     * @param {number} height
     */

  }, {
    key: "fit",
    value: function fit(width, height, section) {
      var viewport = this.viewport();
      var viewportWidth = parseInt(viewport.width);
      var viewportHeight = parseInt(viewport.height);
      var widthScale = width / viewportWidth;
      var heightScale = height / viewportHeight;
      var scale = widthScale < heightScale ? widthScale : heightScale; // the translate does not work as intended, elements can end up unaligned
      // var offsetY = (height - (viewportHeight * scale)) / 2;
      // var offsetX = 0;
      // if (this.sectionIndex % 2 === 1) {
      // 	offsetX = width - (viewportWidth * scale);
      // }

      this.layoutStyle("paginated"); // scale needs width and height to be set

      this.width(viewportWidth);
      this.height(viewportHeight);
      this.overflow("hidden"); // Scale to the correct size

      this.scaler(scale, 0, 0); // this.scaler(scale, offsetX > 0 ? offsetX : 0, offsetY);
      // background images are not scaled by transform

      this.css("background-size", viewportWidth * scale + "px " + viewportHeight * scale + "px");
      this.css("background-color", "transparent");

      if (section && section.properties.includes("page-spread-left")) {
        // set margin since scale is weird
        var marginLeft = width - viewportWidth * scale;
        this.css("margin-left", marginLeft + "px");
      }
    }
    /**
     * Set the direction of the text
     * @param {string} [dir="ltr"] "rtl" | "ltr"
     */

  }, {
    key: "direction",
    value: function direction(dir) {
      if (this.documentElement) {
        this.documentElement.style["direction"] = dir;
      }
    }
  }, {
    key: "mapPage",
    value: function mapPage(cfiBase, layout, start, end, dev) {
      var mapping = new src_mapping(layout, dev);
      return mapping.page(this, cfiBase, start, end);
    }
    /**
     * Emit event when link in content is clicked
     * @private
     */

  }, {
    key: "linksHandler",
    value: function linksHandler() {
      var _this4 = this;

      replaceLinks(this.content, function (href) {
        _this4.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
      });
    }
    /**
     * Set the writingMode of the text
     * @param {string} [mode="horizontal-tb"] "horizontal-tb" | "vertical-rl" | "vertical-lr"
     */

  }, {
    key: "writingMode",
    value: function writingMode(mode) {
      var WRITING_MODE = prefixed("writing-mode");

      if (mode && this.documentElement) {
        this.documentElement.style[WRITING_MODE] = mode;
      }

      return this.window.getComputedStyle(this.documentElement)[WRITING_MODE] || '';
    }
    /**
     * Set the layoutStyle of the content
     * @param {string} [style="paginated"] "scrolling" | "paginated"
     * @private
     */

  }, {
    key: "layoutStyle",
    value: function layoutStyle(style) {
      if (style) {
        this._layoutStyle = style;
        navigator.epubReadingSystem.layoutStyle = this._layoutStyle;
      }

      return this._layoutStyle || "paginated";
    }
    /**
     * Add the epubReadingSystem object to the navigator
     * @param {string} name
     * @param {string} version
     * @private
     */

  }, {
    key: "epubReadingSystem",
    value: function epubReadingSystem(name, version) {
      navigator.epubReadingSystem = {
        name: name,
        version: version,
        layoutStyle: this.layoutStyle(),
        hasFeature: function hasFeature(feature) {
          switch (feature) {
            case "dom-manipulation":
              return true;

            case "layout-changes":
              return true;

            case "touch-events":
              return true;

            case "mouse-events":
              return true;

            case "keyboard-events":
              return true;

            case "spine-scripting":
              return false;

            default:
              return false;
          }
        }
      };
      return navigator.epubReadingSystem;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // this.document.removeEventListener('transitionend', this._resizeCheck);
      this.removeListeners();
    }
  }], [{
    key: "listenedEvents",
    get: function get() {
      return DOM_EVENTS;
    }
  }]);

  return Contents;
}();

event_emitter_default()(Contents.prototype);
/* harmony default export */ const contents = (Contents);
;// CONCATENATED MODULE: ./src/annotations.js



function annotations_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function annotations_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function annotations_createClass(Constructor, protoProps, staticProps) { if (protoProps) annotations_defineProperties(Constructor.prototype, protoProps); if (staticProps) annotations_defineProperties(Constructor, staticProps); return Constructor; }




/**
	* Handles managing adding & removing Annotations
	* @param {Rendition} rendition
	* @class
	*/

var Annotations = /*#__PURE__*/function () {
  function Annotations(rendition) {
    annotations_classCallCheck(this, Annotations);

    this.rendition = rendition;
    this.highlights = [];
    this.underlines = [];
    this.marks = [];
    this._annotations = {};
    this._annotationsBySectionIndex = {};
    this.rendition.hooks.render.register(this.inject.bind(this));
    this.rendition.hooks.unloaded.register(this.clear.bind(this));
  }
  /**
   * Add an annotation to store
   * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
   * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
   * @param {object} data Data to assign to annotation
   * @param {function} [cb] Callback after annotation is added
   * @param {string} className CSS class to assign to annotation
   * @param {object} styles CSS styles to assign to annotation
   * @returns {Annotation} annotation
   */


  annotations_createClass(Annotations, [{
    key: "add",
    value: function add(type, cfiRange, data, cb, className, styles) {
      var hash = encodeURI(cfiRange + type);
      var cfi = new epubcfi(cfiRange);
      var sectionIndex = cfi.spinePos;
      var annotation = new Annotation({
        type: type,
        cfiRange: cfiRange,
        data: data,
        sectionIndex: sectionIndex,
        cb: cb,
        className: className,
        styles: styles
      });
      this._annotations[hash] = annotation;

      if (sectionIndex in this._annotationsBySectionIndex) {
        this._annotationsBySectionIndex[sectionIndex].push(hash);
      } else {
        this._annotationsBySectionIndex[sectionIndex] = [hash];
      }

      var views = this.rendition.views();
      views.forEach(function (view) {
        if (annotation.sectionIndex === view.index) {
          annotation.attach(view);
        }
      });
      return annotation;
    }
    /**
     * Remove an annotation from store
     * @param {EpubCFI} cfiRange EpubCFI range the annotation is attached to
     * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
     */

  }, {
    key: "remove",
    value: function remove(cfiRange, type) {
      var _this = this;

      var hash = encodeURI(cfiRange + type);

      if (hash in this._annotations) {
        var annotation = this._annotations[hash];

        if (type && annotation.type !== type) {
          return;
        }

        var views = this.rendition.views();
        views.forEach(function (view) {
          _this._removeFromAnnotationBySectionIndex(annotation.sectionIndex, hash);

          if (annotation.sectionIndex === view.index) {
            annotation.detach(view);
          }
        });
        delete this._annotations[hash];
      }
    }
    /**
     * Remove an annotations by Section Index
     * @private
     */

  }, {
    key: "_removeFromAnnotationBySectionIndex",
    value: function _removeFromAnnotationBySectionIndex(sectionIndex, hash) {
      this._annotationsBySectionIndex[sectionIndex] = this._annotationsAt(sectionIndex).filter(function (h) {
        return h !== hash;
      });
    }
    /**
     * Get annotations by Section Index
     * @private
     */

  }, {
    key: "_annotationsAt",
    value: function _annotationsAt(index) {
      return this._annotationsBySectionIndex[index];
    }
    /**
     * Add a highlight to the store
     * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
     * @param {object} data Data to assign to annotation
     * @param {function} cb Callback after annotation is clicked
     * @param {string} className CSS class to assign to annotation
     * @param {object} styles CSS styles to assign to annotation
     */

  }, {
    key: "highlight",
    value: function highlight(cfiRange, data, cb, className, styles) {
      return this.add("highlight", cfiRange, data, cb, className, styles);
    }
    /**
     * Add a underline to the store
     * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
     * @param {object} data Data to assign to annotation
     * @param {function} cb Callback after annotation is clicked
     * @param {string} className CSS class to assign to annotation
     * @param {object} styles CSS styles to assign to annotation
     */

  }, {
    key: "underline",
    value: function underline(cfiRange, data, cb, className, styles) {
      return this.add("underline", cfiRange, data, cb, className, styles);
    }
    /**
     * Add a mark to the store
     * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
     * @param {object} data Data to assign to annotation
     * @param {function} cb Callback after annotation is clicked
     */

  }, {
    key: "mark",
    value: function mark(cfiRange, data, cb) {
      return this.add("mark", cfiRange, data, cb);
    }
    /**
     * iterate over annotations in the store
     */

  }, {
    key: "each",
    value: function each() {
      return this._annotations.forEach.apply(this._annotations, arguments);
    }
    /**
     * Hook for injecting annotation into a view
     * @param {View} view
     * @private
     */

  }, {
    key: "inject",
    value: function inject(view) {
      var _this2 = this;

      var sectionIndex = view.index;

      if (sectionIndex in this._annotationsBySectionIndex) {
        var annotations = this._annotationsBySectionIndex[sectionIndex];
        annotations.forEach(function (hash) {
          var annotation = _this2._annotations[hash];
          annotation.attach(view);
        });
      }
    }
    /**
     * Hook for removing annotation from a view
     * @param {View} view
     * @private
     */

  }, {
    key: "clear",
    value: function clear(view) {
      var _this3 = this;

      var sectionIndex = view.index;

      if (sectionIndex in this._annotationsBySectionIndex) {
        var annotations = this._annotationsBySectionIndex[sectionIndex];
        annotations.forEach(function (hash) {
          var annotation = _this3._annotations[hash];
          annotation.detach(view);
        });
      }
    }
    /**
     * [Not Implemented] Show annotations
     * @TODO: needs implementation in View
     */

  }, {
    key: "show",
    value: function show() {}
    /**
     * [Not Implemented] Hide annotations
     * @TODO: needs implementation in View
     */

  }, {
    key: "hide",
    value: function hide() {}
  }]);

  return Annotations;
}();
/**
 * Annotation object
 * @class
 * @param {object} options
 * @param {string} options.type Type of annotation to add: "highlight", "underline", "mark"
 * @param {EpubCFI} options.cfiRange EpubCFI range to attach annotation to
 * @param {object} options.data Data to assign to annotation
 * @param {int} options.sectionIndex Index in the Spine of the Section annotation belongs to
 * @param {function} [options.cb] Callback after annotation is clicked
 * @param {string} className CSS class to assign to annotation
 * @param {object} styles CSS styles to assign to annotation
 * @returns {Annotation} annotation
 */


var Annotation = /*#__PURE__*/function () {
  function Annotation(_ref) {
    var type = _ref.type,
        cfiRange = _ref.cfiRange,
        data = _ref.data,
        sectionIndex = _ref.sectionIndex,
        cb = _ref.cb,
        className = _ref.className,
        styles = _ref.styles;

    annotations_classCallCheck(this, Annotation);

    this.type = type;
    this.cfiRange = cfiRange;
    this.data = data;
    this.sectionIndex = sectionIndex;
    this.mark = undefined;
    this.cb = cb;
    this.className = className;
    this.styles = styles;
  }
  /**
   * Update stored data
   * @param {object} data
   */


  annotations_createClass(Annotation, [{
    key: "update",
    value: function update(data) {
      this.data = data;
    }
    /**
     * Add to a view
     * @param {View} view
     */

  }, {
    key: "attach",
    value: function attach(view) {
      var cfiRange = this.cfiRange,
          data = this.data,
          type = this.type,
          mark = this.mark,
          cb = this.cb,
          className = this.className,
          styles = this.styles;
      var result;

      if (type === "highlight") {
        result = view.highlight(cfiRange, data, cb, className, styles);
      } else if (type === "underline") {
        result = view.underline(cfiRange, data, cb, className, styles);
      } else if (type === "mark") {
        result = view.mark(cfiRange, data, cb);
      }

      this.mark = result;
      this.emit(EVENTS.ANNOTATION.ATTACH, result);
      return result;
    }
    /**
     * Remove from a view
     * @param {View} view
     */

  }, {
    key: "detach",
    value: function detach(view) {
      var cfiRange = this.cfiRange,
          type = this.type;
      var result;

      if (view) {
        if (type === "highlight") {
          result = view.unhighlight(cfiRange);
        } else if (type === "underline") {
          result = view.ununderline(cfiRange);
        } else if (type === "mark") {
          result = view.unmark(cfiRange);
        }
      }

      this.mark = undefined;
      this.emit(EVENTS.ANNOTATION.DETACH, result);
      return result;
    }
    /**
     * [Not Implemented] Get text of an annotation
     * @TODO: needs implementation in contents
     */

  }, {
    key: "text",
    value: function text() {}
  }]);

  return Annotation;
}();

event_emitter_default()(Annotation.prototype);
/* harmony default export */ const annotations = (Annotations);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/marks-pane/lib/marks.js
var marks = __webpack_require__(3476);
;// CONCATENATED MODULE: ./src/managers/views/iframe.js







function iframe_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function iframe_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function iframe_createClass(Constructor, protoProps, staticProps) { if (protoProps) iframe_defineProperties(Constructor.prototype, protoProps); if (staticProps) iframe_defineProperties(Constructor, staticProps); return Constructor; }








var IframeView = /*#__PURE__*/function () {
  function IframeView(section, options) {
    iframe_classCallCheck(this, IframeView);

    this.settings = extend({
      ignoreClass: "",
      axis: undefined,
      //options.layout && options.layout.props.flow === "scrolled" ? "vertical" : "horizontal",
      direction: undefined,
      width: 0,
      height: 0,
      layout: undefined,
      globalLayoutProperties: {},
      method: undefined,
      forceRight: false
    }, options || {});
    this.id = "epubjs-view-" + uuid();
    this.section = section;
    this.index = section.index;
    this.element = this.container(this.settings.axis);
    this.added = false;
    this.displayed = false;
    this.rendered = false; // this.width  = this.settings.width;
    // this.height = this.settings.height;

    this.fixedWidth = 0;
    this.fixedHeight = 0; // Blank Cfi for Parsing

    this.epubcfi = new epubcfi();
    this.layout = this.settings.layout; // Dom events to listen for
    // this.listenedEvents = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

    this.pane = undefined;
    this.highlights = {};
    this.underlines = {};
    this.marks = {};
  }

  iframe_createClass(IframeView, [{
    key: "container",
    value: function container(axis) {
      var element = document.createElement("div");
      element.classList.add("epub-view"); // this.element.style.minHeight = "100px";

      element.style.height = "0px";
      element.style.width = "0px";
      element.style.overflow = "hidden";
      element.style.position = "relative";
      element.style.display = "block";

      if (axis && axis == "horizontal") {
        element.style.flex = "none";
      } else {
        element.style.flex = "initial";
      }

      return element;
    }
  }, {
    key: "create",
    value: function create() {
      if (this.iframe) {
        return this.iframe;
      }

      if (!this.element) {
        this.element = this.createContainer();
      }

      this.iframe = document.createElement("iframe");
      this.iframe.id = this.id;
      this.iframe.scrolling = "no"; // Might need to be removed: breaks ios width calculations

      this.iframe.style.overflow = "hidden";
      this.iframe.seamless = "seamless"; // Back up if seamless isn't supported

      this.iframe.style.border = "none";
      this.iframe.setAttribute("enable-annotation", "true");
      this.resizing = true; // this.iframe.style.display = "none";

      this.element.style.visibility = "hidden";
      this.iframe.style.visibility = "hidden";
      this.iframe.style.width = "0";
      this.iframe.style.height = "0";
      this._width = 0;
      this._height = 0;
      this.element.setAttribute("ref", this.index);
      this.added = true;
      this.elementBounds = core_bounds(this.element); // if(width || height){
      //   this.resize(width, height);
      // } else if(this.width && this.height){
      //   this.resize(this.width, this.height);
      // } else {
      //   this.iframeBounds = bounds(this.iframe);
      // }

      if ("srcdoc" in this.iframe) {
        this.supportsSrcdoc = true;
      } else {
        this.supportsSrcdoc = false;
      }

      if (!this.settings.method) {
        this.settings.method = this.supportsSrcdoc ? "srcdoc" : "write";
      }

      return this.iframe;
    }
  }, {
    key: "render",
    value: function render(request, show) {
      // view.onLayout = this.layout.format.bind(this.layout);
      this.create(); // Fit to size of the container, apply padding

      this.size();

      if (!this.sectionRender) {
        this.sectionRender = this.section.render(request);
      } // Render Chain


      return this.sectionRender.then(function (contents) {
        return this.load(contents);
      }.bind(this)).then(function () {
        var _this = this;

        // find and report the writingMode axis
        var writingMode = this.contents.writingMode(); // Set the axis based on the flow and writing mode

        var axis;

        if (this.settings.flow === "scrolled") {
          axis = writingMode.indexOf("vertical") === 0 ? "horizontal" : "vertical";
        } else {
          axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
        }

        if (writingMode.indexOf("vertical") === 0 && this.settings.flow === "paginated") {
          this.layout.delta = this.layout.height;
        }

        this.setAxis(axis);
        this.emit(EVENTS.VIEWS.AXIS, axis);
        this.setWritingMode(writingMode);
        this.emit(EVENTS.VIEWS.WRITING_MODE, writingMode); // apply the layout function to the contents

        this.layout.format(this.contents, this.section, this.axis); // Listen for events that require an expansion of the iframe

        this.addListeners();
        return new Promise(function (resolve, reject) {
          // Expand the iframe to the full size of the content
          _this.expand();

          if (_this.settings.forceRight) {
            _this.element.style.marginLeft = _this.width() + "px";
          }

          resolve();
        });
      }.bind(this), function (e) {
        this.emit(EVENTS.VIEWS.LOAD_ERROR, e);
        return new Promise(function (resolve, reject) {
          reject(e);
        });
      }.bind(this)).then(function () {
        this.emit(EVENTS.VIEWS.RENDERED, this.section);
      }.bind(this));
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.iframe) {
        this.iframe.style.width = "0";
        this.iframe.style.height = "0";
        this._width = 0;
        this._height = 0;
        this._textWidth = undefined;
        this._contentWidth = undefined;
        this._textHeight = undefined;
        this._contentHeight = undefined;
      }

      this._needsReframe = true;
    } // Determine locks base on settings

  }, {
    key: "size",
    value: function size(_width, _height) {
      var width = _width || this.settings.width;
      var height = _height || this.settings.height;

      if (this.layout.name === "pre-paginated") {
        this.lock("both", width, height);
      } else if (this.settings.axis === "horizontal") {
        this.lock("height", width, height);
      } else {
        this.lock("width", width, height);
      }

      this.settings.width = width;
      this.settings.height = height;
    } // Lock an axis to element dimensions, taking borders into account

  }, {
    key: "lock",
    value: function lock(what, width, height) {
      var elBorders = borders(this.element);
      var iframeBorders;

      if (this.iframe) {
        iframeBorders = borders(this.iframe);
      } else {
        iframeBorders = {
          width: 0,
          height: 0
        };
      }

      if (what == "width" && isNumber(width)) {
        this.lockedWidth = width - elBorders.width - iframeBorders.width; // this.resize(this.lockedWidth, width); //  width keeps ratio correct
      }

      if (what == "height" && isNumber(height)) {
        this.lockedHeight = height - elBorders.height - iframeBorders.height; // this.resize(width, this.lockedHeight);
      }

      if (what === "both" && isNumber(width) && isNumber(height)) {
        this.lockedWidth = width - elBorders.width - iframeBorders.width;
        this.lockedHeight = height - elBorders.height - iframeBorders.height; // this.resize(this.lockedWidth, this.lockedHeight);
      }

      if (this.displayed && this.iframe) {
        // this.contents.layout();
        this.expand();
      }
    } // Resize a single axis based on content dimensions

  }, {
    key: "expand",
    value: function expand(force) {
      var width = this.lockedWidth;
      var height = this.lockedHeight;
      var columns;
      var textWidth, textHeight;
      if (!this.iframe || this._expanding) return;
      this._expanding = true;

      if (this.layout.name === "pre-paginated") {
        width = this.layout.columnWidth;
        height = this.layout.height;
      } // Expand Horizontally
      else if (this.settings.axis === "horizontal") {
        // Get the width of the text
        width = this.contents.textWidth();

        if (width % this.layout.pageWidth > 0) {
          width = Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
        }

        if (this.settings.forceEvenPages) {
          columns = width / this.layout.pageWidth;

          if (this.layout.divisor > 1 && this.layout.name === "reflowable" && columns % 2 > 0) {
            // add a blank page
            width += this.layout.pageWidth;
          }
        }
      } // Expand Vertically
      else if (this.settings.axis === "vertical") {
        height = this.contents.textHeight();

        if (this.settings.flow === "paginated" && height % this.layout.height > 0) {
          height = Math.ceil(height / this.layout.height) * this.layout.height;
        }
      } // Only Resize if dimensions have changed or
      // if Frame is still hidden, so needs reframing


      if (this._needsReframe || width != this._width || height != this._height) {
        this.reframe(width, height);
      }

      this._expanding = false;
    }
  }, {
    key: "reframe",
    value: function reframe(width, height) {
      var _this2 = this;

      var size;

      if (isNumber(width)) {
        this.element.style.width = width + "px";
        this.iframe.style.width = width + "px";
        this._width = width;
      }

      if (isNumber(height)) {
        this.element.style.height = height + "px";
        this.iframe.style.height = height + "px";
        this._height = height;
      }

      var widthDelta = this.prevBounds ? width - this.prevBounds.width : width;
      var heightDelta = this.prevBounds ? height - this.prevBounds.height : height;
      size = {
        width: width,
        height: height,
        widthDelta: widthDelta,
        heightDelta: heightDelta
      };
      this.pane && this.pane.render();
      requestAnimationFrame(function () {
        var mark;

        for (var m in _this2.marks) {
          if (_this2.marks.hasOwnProperty(m)) {
            mark = _this2.marks[m];

            _this2.placeMark(mark.element, mark.range);
          }
        }
      });
      this.onResize(this, size);
      this.emit(EVENTS.VIEWS.RESIZED, size);
      this.prevBounds = size;
      this.elementBounds = core_bounds(this.element);
    }
  }, {
    key: "load",
    value: function load(contents) {
      var loading = new defer();
      var loaded = loading.promise;

      if (!this.iframe) {
        loading.reject(new Error("No Iframe Available"));
        return loaded;
      }

      this.iframe.onload = function (event) {
        this.onLoad(event, loading);
      }.bind(this);

      if (this.settings.method === "blobUrl") {
        this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
        this.iframe.src = this.blobUrl;
        this.element.appendChild(this.iframe);
      } else if (this.settings.method === "srcdoc") {
        this.iframe.srcdoc = contents;
        this.element.appendChild(this.iframe);
      } else {
        this.element.appendChild(this.iframe);
        this.document = this.iframe.contentDocument;

        if (!this.document) {
          loading.reject(new Error("No Document Available"));
          return loaded;
        }

        this.iframe.contentDocument.open(); // For Cordova windows platform

        if (window.MSApp && MSApp.execUnsafeLocalFunction) {
          var outerThis = this;
          MSApp.execUnsafeLocalFunction(function () {
            outerThis.iframe.contentDocument.write(contents);
          });
        } else {
          this.iframe.contentDocument.write(contents);
        }

        this.iframe.contentDocument.close();
      }

      return loaded;
    }
  }, {
    key: "onLoad",
    value: function onLoad(event, promise) {
      var _this3 = this;

      this.window = this.iframe.contentWindow;
      this.document = this.iframe.contentDocument;
      this.contents = new contents(this.document, this.document.body, this.section.cfiBase, this.section.index);
      this.rendering = false;
      var link = this.document.querySelector("link[rel='canonical']");

      if (link) {
        link.setAttribute("href", this.section.canonical);
      } else {
        link = this.document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", this.section.canonical);
        this.document.querySelector("head").appendChild(link);
      }

      this.contents.on(EVENTS.CONTENTS.EXPAND, function () {
        if (_this3.displayed && _this3.iframe) {
          _this3.expand();

          if (_this3.contents) {
            _this3.layout.format(_this3.contents);
          }
        }
      });
      this.contents.on(EVENTS.CONTENTS.RESIZE, function (e) {
        if (_this3.displayed && _this3.iframe) {
          _this3.expand();

          if (_this3.contents) {
            _this3.layout.format(_this3.contents);
          }
        }
      });
      promise.resolve(this.contents);
    }
  }, {
    key: "setLayout",
    value: function setLayout(layout) {
      this.layout = layout;

      if (this.contents) {
        this.layout.format(this.contents);
        this.expand();
      }
    }
  }, {
    key: "setAxis",
    value: function setAxis(axis) {
      this.settings.axis = axis;

      if (axis == "horizontal") {
        this.element.style.flex = "none";
      } else {
        this.element.style.flex = "initial";
      }

      this.size();
    }
  }, {
    key: "setWritingMode",
    value: function setWritingMode(mode) {
      // this.element.style.writingMode = writingMode;
      this.writingMode = mode;
    }
  }, {
    key: "addListeners",
    value: function addListeners() {//TODO: Add content listeners for expanding
    }
  }, {
    key: "removeListeners",
    value: function removeListeners(layoutFunc) {//TODO: remove content listeners for expanding
    }
  }, {
    key: "display",
    value: function display(request) {
      var displayed = new defer();

      if (!this.displayed) {
        this.render(request).then(function () {
          this.emit(EVENTS.VIEWS.DISPLAYED, this);
          this.onDisplayed(this);
          this.displayed = true;
          displayed.resolve(this);
        }.bind(this), function (err) {
          displayed.reject(err, this);
        });
      } else {
        displayed.resolve(this);
      }

      return displayed.promise;
    }
  }, {
    key: "show",
    value: function show() {
      this.element.style.visibility = "visible";

      if (this.iframe) {
        this.iframe.style.visibility = "visible"; // Remind Safari to redraw the iframe

        this.iframe.style.transform = "translateZ(0)";
        this.iframe.offsetWidth;
        this.iframe.style.transform = null;
      }

      this.emit(EVENTS.VIEWS.SHOWN, this);
    }
  }, {
    key: "hide",
    value: function hide() {
      // this.iframe.style.display = "none";
      this.element.style.visibility = "hidden";
      this.iframe.style.visibility = "hidden";
      this.stopExpanding = true;
      this.emit(EVENTS.VIEWS.HIDDEN, this);
    }
  }, {
    key: "offset",
    value: function offset() {
      return {
        top: this.element.offsetTop,
        left: this.element.offsetLeft
      };
    }
  }, {
    key: "width",
    value: function width() {
      return this._width;
    }
  }, {
    key: "height",
    value: function height() {
      return this._height;
    }
  }, {
    key: "position",
    value: function position() {
      return this.element.getBoundingClientRect();
    }
  }, {
    key: "locationOf",
    value: function locationOf(target) {
      var parentPos = this.iframe.getBoundingClientRect();
      var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);
      return {
        "left": targetPos.left,
        "top": targetPos.top
      };
    }
  }, {
    key: "onDisplayed",
    value: function onDisplayed(view) {// Stub, override with a custom functions
    }
  }, {
    key: "onResize",
    value: function onResize(view, e) {// Stub, override with a custom functions
    }
  }, {
    key: "bounds",
    value: function bounds(force) {
      if (force || !this.elementBounds) {
        this.elementBounds = core_bounds(this.element);
      }

      return this.elementBounds;
    }
  }, {
    key: "highlight",
    value: function highlight(cfiRange) {
      var _this4 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 ? arguments[2] : undefined;
      var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "epubjs-hl";
      var styles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      if (!this.contents) {
        return;
      }

      var attributes = Object.assign({
        "fill": "yellow",
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply"
      }, styles);
      var range = this.contents.range(cfiRange);

      var emitter = function emitter() {
        _this4.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
      };

      data["epubcfi"] = cfiRange;

      if (!this.pane) {
        this.pane = new marks/* Pane */.X6(this.iframe, this.element);
      }

      var m = new marks/* Highlight */.y$(range, className, data, attributes);
      var h = this.pane.addMark(m);
      this.highlights[cfiRange] = {
        "mark": h,
        "element": h.element,
        "listeners": [emitter, cb]
      };
      h.element.setAttribute("ref", className);
      h.element.addEventListener("click", emitter);
      h.element.addEventListener("touchstart", emitter);

      if (cb) {
        h.element.addEventListener("click", cb);
        h.element.addEventListener("touchstart", cb);
      }

      return h;
    }
  }, {
    key: "underline",
    value: function underline(cfiRange) {
      var _this5 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 ? arguments[2] : undefined;
      var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "epubjs-ul";
      var styles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      if (!this.contents) {
        return;
      }

      var attributes = Object.assign({
        "stroke": "black",
        "stroke-opacity": "0.3",
        "mix-blend-mode": "multiply"
      }, styles);
      var range = this.contents.range(cfiRange);

      var emitter = function emitter() {
        _this5.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
      };

      data["epubcfi"] = cfiRange;

      if (!this.pane) {
        this.pane = new marks/* Pane */.X6(this.iframe, this.element);
      }

      var m = new marks/* Underline */.v6(range, className, data, attributes);
      var h = this.pane.addMark(m);
      this.underlines[cfiRange] = {
        "mark": h,
        "element": h.element,
        "listeners": [emitter, cb]
      };
      h.element.setAttribute("ref", className);
      h.element.addEventListener("click", emitter);
      h.element.addEventListener("touchstart", emitter);

      if (cb) {
        h.element.addEventListener("click", cb);
        h.element.addEventListener("touchstart", cb);
      }

      return h;
    }
  }, {
    key: "mark",
    value: function mark(cfiRange) {
      var _this6 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 ? arguments[2] : undefined;

      if (!this.contents) {
        return;
      }

      if (cfiRange in this.marks) {
        var item = this.marks[cfiRange];
        return item;
      }

      var range = this.contents.range(cfiRange);

      if (!range) {
        return;
      }

      var container = range.commonAncestorContainer;
      var parent = container.nodeType === 1 ? container : container.parentNode;

      var emitter = function emitter(e) {
        _this6.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
      };

      if (range.collapsed && container.nodeType === 1) {
        range = new Range();
        range.selectNodeContents(container);
      } else if (range.collapsed) {
        // Webkit doesn't like collapsed ranges
        range = new Range();
        range.selectNodeContents(parent);
      }

      var mark = this.document.createElement("a");
      mark.setAttribute("ref", "epubjs-mk");
      mark.style.position = "absolute";
      mark.dataset["epubcfi"] = cfiRange;

      if (data) {
        Object.keys(data).forEach(function (key) {
          mark.dataset[key] = data[key];
        });
      }

      if (cb) {
        mark.addEventListener("click", cb);
        mark.addEventListener("touchstart", cb);
      }

      mark.addEventListener("click", emitter);
      mark.addEventListener("touchstart", emitter);
      this.placeMark(mark, range);
      this.element.appendChild(mark);
      this.marks[cfiRange] = {
        "element": mark,
        "range": range,
        "listeners": [emitter, cb]
      };
      return parent;
    }
  }, {
    key: "placeMark",
    value: function placeMark(element, range) {
      var top, right, left;

      if (this.layout.name === "pre-paginated" || this.settings.axis !== "horizontal") {
        var pos = range.getBoundingClientRect();
        top = pos.top;
        right = pos.right;
      } else {
        // Element might break columns, so find the left most element
        var rects = range.getClientRects();
        var rect;

        for (var i = 0; i != rects.length; i++) {
          rect = rects[i];

          if (!left || rect.left < left) {
            left = rect.left; // right = rect.right;

            right = Math.ceil(left / this.layout.props.pageWidth) * this.layout.props.pageWidth - this.layout.gap / 2;
            top = rect.top;
          }
        }
      }

      element.style.top = "".concat(top, "px");
      element.style.left = "".concat(right, "px");
    }
  }, {
    key: "unhighlight",
    value: function unhighlight(cfiRange) {
      var item;

      if (cfiRange in this.highlights) {
        item = this.highlights[cfiRange];
        this.pane.removeMark(item.mark);
        item.listeners.forEach(function (l) {
          if (l) {
            item.element.removeEventListener("click", l);
            item.element.removeEventListener("touchstart", l);
          }

          ;
        });
        delete this.highlights[cfiRange];
      }
    }
  }, {
    key: "ununderline",
    value: function ununderline(cfiRange) {
      var item;

      if (cfiRange in this.underlines) {
        item = this.underlines[cfiRange];
        this.pane.removeMark(item.mark);
        item.listeners.forEach(function (l) {
          if (l) {
            item.element.removeEventListener("click", l);
            item.element.removeEventListener("touchstart", l);
          }

          ;
        });
        delete this.underlines[cfiRange];
      }
    }
  }, {
    key: "unmark",
    value: function unmark(cfiRange) {
      var item;

      if (cfiRange in this.marks) {
        item = this.marks[cfiRange];
        this.element.removeChild(item.element);
        item.listeners.forEach(function (l) {
          if (l) {
            item.element.removeEventListener("click", l);
            item.element.removeEventListener("touchstart", l);
          }

          ;
        });
        delete this.marks[cfiRange];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      for (var cfiRange in this.highlights) {
        this.unhighlight(cfiRange);
      }

      for (var _cfiRange in this.underlines) {
        this.ununderline(_cfiRange);
      }

      for (var _cfiRange2 in this.marks) {
        this.unmark(_cfiRange2);
      }

      if (this.blobUrl) {
        revokeBlobUrl(this.blobUrl);
      }

      if (this.displayed) {
        this.displayed = false;
        this.removeListeners();
        this.contents.destroy();
        this.stopExpanding = true;
        this.element.removeChild(this.iframe);
        this.iframe = undefined;
        this.contents = undefined;
        this._textWidth = null;
        this._textHeight = null;
        this._width = null;
        this._height = null;
      } // this.element.style.height = "0px";
      // this.element.style.width = "0px";

    }
  }]);

  return IframeView;
}();

event_emitter_default()(IframeView.prototype);
/* harmony default export */ const iframe = (IframeView);
;// CONCATENATED MODULE: ./src/utils/scrolltype.js
// Detect RTL scroll type
// Based on https://github.com/othree/jquery.rtl-scroll-type/blob/master/src/jquery.rtl-scroll.js
function scrollType() {
  var type = "reverse";
  var definer = createDefiner();
  document.body.appendChild(definer);

  if (definer.scrollLeft > 0) {
    type = "default";
  } else {
    if (typeof Element !== 'undefined' && Element.prototype.scrollIntoView) {
      definer.children[0].children[1].scrollIntoView();

      if (definer.scrollLeft < 0) {
        type = "negative";
      }
    } else {
      definer.scrollLeft = 1;

      if (definer.scrollLeft === 0) {
        type = "negative";
      }
    }
  }

  document.body.removeChild(definer);
  return type;
}
function createDefiner() {
  var definer = document.createElement('div');
  definer.dir = "rtl";
  definer.style.position = "fixed";
  definer.style.width = "1px";
  definer.style.height = "1px";
  definer.style.top = "0px";
  definer.style.left = "0px";
  definer.style.overflow = "hidden";
  var innerDiv = document.createElement('div');
  innerDiv.style.width = "2px";
  var spanA = document.createElement('span');
  spanA.style.width = "1px";
  spanA.style.display = "inline-block";
  var spanB = document.createElement('span');
  spanB.style.width = "1px";
  spanB.style.display = "inline-block";
  innerDiv.appendChild(spanA);
  innerDiv.appendChild(spanB);
  definer.appendChild(innerDiv);
  return definer;
}
// EXTERNAL MODULE: ./node_modules/lodash/throttle.js
var throttle = __webpack_require__(3493);
var throttle_default = /*#__PURE__*/__webpack_require__.n(throttle);
;// CONCATENATED MODULE: ./src/managers/helpers/stage.js


function stage_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function stage_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function stage_createClass(Constructor, protoProps, staticProps) { if (protoProps) stage_defineProperties(Constructor.prototype, protoProps); if (staticProps) stage_defineProperties(Constructor, staticProps); return Constructor; }




var Stage = /*#__PURE__*/function () {
  function Stage(_options) {
    stage_classCallCheck(this, Stage);

    this.settings = _options || {};
    this.id = "epubjs-container-" + uuid();
    this.container = this.create(this.settings);

    if (this.settings.hidden) {
      this.wrapper = this.wrap(this.container);
    }
  }
  /*
  * Creates an element to render to.
  * Resizes to passed width and height or to the elements size
  */


  stage_createClass(Stage, [{
    key: "create",
    value: function create(options) {
      var height = options.height; // !== false ? options.height : "100%";

      var width = options.width; // !== false ? options.width : "100%";

      var overflow = options.overflow || false;
      var axis = options.axis || "vertical";
      var direction = options.direction;
      extend(this.settings, options);

      if (options.height && isNumber(options.height)) {
        height = options.height + "px";
      }

      if (options.width && isNumber(options.width)) {
        width = options.width + "px";
      } // Create new container element


      var container = document.createElement("div");
      container.id = this.id;
      container.classList.add("epub-container"); // Style Element
      // container.style.fontSize = "0";

      container.style.wordSpacing = "0";
      container.style.lineHeight = "0";
      container.style.verticalAlign = "top";
      container.style.position = "relative";

      if (axis === "horizontal") {
        // container.style.whiteSpace = "nowrap";
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.flexWrap = "nowrap";
      }

      if (width) {
        container.style.width = width;
      }

      if (height) {
        container.style.height = height;
      }

      if (overflow) {
        if (overflow === "scroll" && axis === "vertical") {
          container.style["overflow-y"] = overflow;
          container.style["overflow-x"] = "hidden";
        } else if (overflow === "scroll" && axis === "horizontal") {
          container.style["overflow-y"] = "hidden";
          container.style["overflow-x"] = overflow;
        } else {
          container.style["overflow"] = overflow;
        }
      }

      if (direction) {
        container.dir = direction;
        container.style["direction"] = direction;
      }

      if (direction && this.settings.fullsize) {
        document.body.style["direction"] = direction;
      }

      return container;
    }
  }, {
    key: "wrap",
    value: function wrap(container) {
      var wrapper = document.createElement("div");
      wrapper.style.visibility = "hidden";
      wrapper.style.overflow = "hidden";
      wrapper.style.width = "0";
      wrapper.style.height = "0";
      wrapper.appendChild(container);
      return wrapper;
    }
  }, {
    key: "getElement",
    value: function getElement(_element) {
      var element;

      if (isElement(_element)) {
        element = _element;
      } else if (typeof _element === "string") {
        element = document.getElementById(_element);
      }

      if (!element) {
        throw new Error("Not an Element");
      }

      return element;
    }
  }, {
    key: "attachTo",
    value: function attachTo(what) {
      var element = this.getElement(what);
      var base;

      if (!element) {
        return;
      }

      if (this.settings.hidden) {
        base = this.wrapper;
      } else {
        base = this.container;
      }

      element.appendChild(base);
      this.element = element;
      return element;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "onResize",
    value: function onResize(func) {
      // Only listen to window for resize event if width and height are not fixed.
      // This applies if it is set to a percent or auto.
      if (!isNumber(this.settings.width) || !isNumber(this.settings.height)) {
        this.resizeFunc = throttle_default()(func, 50);
        window.addEventListener("resize", this.resizeFunc, false);
      }
    }
  }, {
    key: "onOrientationChange",
    value: function onOrientationChange(func) {
      this.orientationChangeFunc = func;
      window.addEventListener("orientationchange", this.orientationChangeFunc, false);
    }
  }, {
    key: "size",
    value: function size(width, height) {
      var bounds;

      var _width = width || this.settings.width;

      var _height = height || this.settings.height; // If width or height are set to false, inherit them from containing element


      if (width === null) {
        bounds = this.element.getBoundingClientRect();

        if (bounds.width) {
          width = Math.floor(bounds.width);
          this.container.style.width = width + "px";
        }
      } else {
        if (isNumber(width)) {
          this.container.style.width = width + "px";
        } else {
          this.container.style.width = width;
        }
      }

      if (height === null) {
        bounds = bounds || this.element.getBoundingClientRect();

        if (bounds.height) {
          height = bounds.height;
          this.container.style.height = height + "px";
        }
      } else {
        if (isNumber(height)) {
          this.container.style.height = height + "px";
        } else {
          this.container.style.height = height;
        }
      }

      if (!isNumber(width)) {
        width = this.container.clientWidth;
      }

      if (!isNumber(height)) {
        height = this.container.clientHeight;
      }

      this.containerStyles = window.getComputedStyle(this.container);
      this.containerPadding = {
        left: parseFloat(this.containerStyles["padding-left"]) || 0,
        right: parseFloat(this.containerStyles["padding-right"]) || 0,
        top: parseFloat(this.containerStyles["padding-top"]) || 0,
        bottom: parseFloat(this.containerStyles["padding-bottom"]) || 0
      }; // Bounds not set, get them from window

      var _windowBounds = windowBounds();

      var bodyStyles = window.getComputedStyle(document.body);
      var bodyPadding = {
        left: parseFloat(bodyStyles["padding-left"]) || 0,
        right: parseFloat(bodyStyles["padding-right"]) || 0,
        top: parseFloat(bodyStyles["padding-top"]) || 0,
        bottom: parseFloat(bodyStyles["padding-bottom"]) || 0
      };

      if (!_width) {
        width = _windowBounds.width - bodyPadding.left - bodyPadding.right;
      }

      if (this.settings.fullsize && !_height || !_height) {
        height = _windowBounds.height - bodyPadding.top - bodyPadding.bottom;
      }

      return {
        width: width - this.containerPadding.left - this.containerPadding.right,
        height: height - this.containerPadding.top - this.containerPadding.bottom
      };
    }
  }, {
    key: "bounds",
    value: function bounds() {
      var box;

      if (this.container.style.overflow !== "visible") {
        box = this.container && this.container.getBoundingClientRect();
      }

      if (!box || !box.width || !box.height) {
        return windowBounds();
      } else {
        return box;
      }
    }
  }, {
    key: "getSheet",
    value: function getSheet() {
      var style = document.createElement("style"); // WebKit hack --> https://davidwalsh.name/add-rules-stylesheets

      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);
      return style.sheet;
    }
  }, {
    key: "addStyleRules",
    value: function addStyleRules(selector, rulesArray) {
      var scope = "#" + this.id + " ";
      var rules = "";

      if (!this.sheet) {
        this.sheet = this.getSheet();
      }

      rulesArray.forEach(function (set) {
        for (var prop in set) {
          if (set.hasOwnProperty(prop)) {
            rules += prop + ":" + set[prop] + ";";
          }
        }
      });
      this.sheet.insertRule(scope + selector + " {" + rules + "}", 0);
    }
  }, {
    key: "axis",
    value: function axis(_axis) {
      if (_axis === "horizontal") {
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";
        this.container.style.flexWrap = "nowrap";
      } else {
        this.container.style.display = "block";
      }

      this.settings.axis = _axis;
    } // orientation(orientation) {
    // 	if (orientation === "landscape") {
    //
    // 	} else {
    //
    // 	}
    //
    // 	this.orientation = orientation;
    // }

  }, {
    key: "direction",
    value: function direction(dir) {
      if (this.container) {
        this.container.dir = dir;
        this.container.style["direction"] = dir;
      }

      if (this.settings.fullsize) {
        document.body.style["direction"] = dir;
      }

      this.settings.dir = dir;
    }
  }, {
    key: "overflow",
    value: function overflow(_overflow) {
      if (this.container) {
        if (_overflow === "scroll" && this.settings.axis === "vertical") {
          this.container.style["overflow-y"] = _overflow;
          this.container.style["overflow-x"] = "hidden";
        } else if (_overflow === "scroll" && this.settings.axis === "horizontal") {
          this.container.style["overflow-y"] = "hidden";
          this.container.style["overflow-x"] = _overflow;
        } else {
          this.container.style["overflow"] = _overflow;
        }
      }

      this.settings.overflow = _overflow;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var base;

      if (this.element) {
        if (this.settings.hidden) {
          base = this.wrapper;
        } else {
          base = this.container;
        }

        if (this.element.contains(this.container)) {
          this.element.removeChild(this.container);
        }

        window.removeEventListener("resize", this.resizeFunc);
        window.removeEventListener("orientationChange", this.orientationChangeFunc);
      }
    }
  }]);

  return Stage;
}();

/* harmony default export */ const stage = (Stage);
;// CONCATENATED MODULE: ./src/managers/helpers/views.js




function views_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function views_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function views_createClass(Constructor, protoProps, staticProps) { if (protoProps) views_defineProperties(Constructor.prototype, protoProps); if (staticProps) views_defineProperties(Constructor, staticProps); return Constructor; }

var Views = /*#__PURE__*/function () {
  function Views(container) {
    views_classCallCheck(this, Views);

    this.container = container;
    this._views = [];
    this.length = 0;
    this.hidden = false;
  }

  views_createClass(Views, [{
    key: "all",
    value: function all() {
      return this._views;
    }
  }, {
    key: "first",
    value: function first() {
      return this._views[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this._views[this._views.length - 1];
    }
  }, {
    key: "indexOf",
    value: function indexOf(view) {
      return this._views.indexOf(view);
    }
  }, {
    key: "slice",
    value: function slice() {
      return this._views.slice.apply(this._views, arguments);
    }
  }, {
    key: "get",
    value: function get(i) {
      return this._views[i];
    }
  }, {
    key: "append",
    value: function append(view) {
      this._views.push(view);

      if (this.container) {
        this.container.appendChild(view.element);
      }

      this.length++;
      return view;
    }
  }, {
    key: "prepend",
    value: function prepend(view) {
      this._views.unshift(view);

      if (this.container) {
        this.container.insertBefore(view.element, this.container.firstChild);
      }

      this.length++;
      return view;
    }
  }, {
    key: "insert",
    value: function insert(view, index) {
      this._views.splice(index, 0, view);

      if (this.container) {
        if (index < this.container.children.length) {
          this.container.insertBefore(view.element, this.container.children[index]);
        } else {
          this.container.appendChild(view.element);
        }
      }

      this.length++;
      return view;
    }
  }, {
    key: "remove",
    value: function remove(view) {
      var index = this._views.indexOf(view);

      if (index > -1) {
        this._views.splice(index, 1);
      }

      this.destroy(view);
      this.length--;
    }
  }, {
    key: "destroy",
    value: function destroy(view) {
      if (view.displayed) {
        view.destroy();
      }

      if (this.container) {
        this.container.removeChild(view.element);
      }

      view = null;
    } // Iterators

  }, {
    key: "forEach",
    value: function forEach() {
      return this._views.forEach.apply(this._views, arguments);
    }
  }, {
    key: "clear",
    value: function clear() {
      // Remove all views
      var view;
      var len = this.length;
      if (!this.length) return;

      for (var i = 0; i < len; i++) {
        view = this._views[i];
        this.destroy(view);
      }

      this._views = [];
      this.length = 0;
    }
  }, {
    key: "find",
    value: function find(section) {
      var view;
      var len = this.length;

      for (var i = 0; i < len; i++) {
        view = this._views[i];

        if (view.displayed && view.section.index == section.index) {
          return view;
        }
      }
    }
  }, {
    key: "displayed",
    value: function displayed() {
      var displayed = [];
      var view;
      var len = this.length;

      for (var i = 0; i < len; i++) {
        view = this._views[i];

        if (view.displayed) {
          displayed.push(view);
        }
      }

      return displayed;
    }
  }, {
    key: "show",
    value: function show() {
      var view;
      var len = this.length;

      for (var i = 0; i < len; i++) {
        view = this._views[i];

        if (view.displayed) {
          view.show();
        }
      }

      this.hidden = false;
    }
  }, {
    key: "hide",
    value: function hide() {
      var view;
      var len = this.length;

      for (var i = 0; i < len; i++) {
        view = this._views[i];

        if (view.displayed) {
          view.hide();
        }
      }

      this.hidden = true;
    }
  }]);

  return Views;
}();

/* harmony default export */ const views = (Views);
;// CONCATENATED MODULE: ./src/managers/default/index.js
function default_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { default_typeof = function _typeof(obj) { return typeof obj; }; } else { default_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return default_typeof(obj); }















function default_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function default_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function default_createClass(Constructor, protoProps, staticProps) { if (protoProps) default_defineProperties(Constructor.prototype, protoProps); if (staticProps) default_defineProperties(Constructor, staticProps); return Constructor; }










var DefaultViewManager = /*#__PURE__*/function () {
  function DefaultViewManager(options) {
    default_classCallCheck(this, DefaultViewManager);

    this.name = "default";
    this.optsSettings = options.settings;
    this.View = options.view;
    this.request = options.request;
    this.renditionQueue = options.queue;
    this.q = new queue(this);
    this.settings = extend(this.settings || {}, {
      infinite: true,
      hidden: false,
      width: undefined,
      height: undefined,
      axis: undefined,
      writingMode: undefined,
      flow: "scrolled",
      ignoreClass: "",
      fullsize: undefined
    });
    extend(this.settings, options.settings || {});
    this.viewSettings = {
      ignoreClass: this.settings.ignoreClass,
      axis: this.settings.axis,
      flow: this.settings.flow,
      layout: this.layout,
      method: this.settings.method,
      // srcdoc, blobUrl, write
      width: 0,
      height: 0,
      forceEvenPages: true
    };
    this.rendered = false;
  }

  default_createClass(DefaultViewManager, [{
    key: "render",
    value: function render(element, size) {
      var tag = element.tagName;

      if (typeof this.settings.fullsize === "undefined" && tag && (tag.toLowerCase() == "body" || tag.toLowerCase() == "html")) {
        this.settings.fullsize = true;
      }

      if (this.settings.fullsize) {
        this.settings.overflow = "visible";
        this.overflow = this.settings.overflow;
      }

      this.settings.size = size;
      this.settings.rtlScrollType = scrollType(); // Save the stage

      this.stage = new stage({
        width: size.width,
        height: size.height,
        overflow: this.overflow,
        hidden: this.settings.hidden,
        axis: this.settings.axis,
        fullsize: this.settings.fullsize,
        direction: this.settings.direction
      });
      this.stage.attachTo(element); // Get this stage container div

      this.container = this.stage.getContainer(); // Views array methods

      this.views = new views(this.container); // Calculate Stage Size

      this._bounds = this.bounds();
      this._stageSize = this.stage.size(); // Set the dimensions for views

      this.viewSettings.width = this._stageSize.width;
      this.viewSettings.height = this._stageSize.height; // Function to handle a resize event.
      // Will only attach if width and height are both fixed.

      this.stage.onResize(this.onResized.bind(this));
      this.stage.onOrientationChange(this.onOrientationChange.bind(this)); // Add Event Listeners

      this.addEventListeners(); // Add Layout method
      // this.applyLayoutMethod();

      if (this.layout) {
        this.updateLayout();
      }

      this.rendered = true;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var scroller;
      window.addEventListener("unload", function (e) {
        this.destroy();
      }.bind(this));

      if (!this.settings.fullsize) {
        scroller = this.container;
      } else {
        scroller = window;
      }

      this._onScroll = this.onScroll.bind(this);
      scroller.addEventListener("scroll", this._onScroll);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var scroller;

      if (!this.settings.fullsize) {
        scroller = this.container;
      } else {
        scroller = window;
      }

      scroller.removeEventListener("scroll", this._onScroll);
      this._onScroll = undefined;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearTimeout(this.orientationTimeout);
      clearTimeout(this.resizeTimeout);
      clearTimeout(this.afterScrolled);
      this.clear();
      this.removeEventListeners();
      this.stage.destroy();
      this.rendered = false;
      /*
      		clearTimeout(this.trimTimeout);
      	if(this.settings.hidden) {
      		this.element.removeChild(this.wrapper);
      	} else {
      		this.element.removeChild(this.container);
      	}
      */
    }
  }, {
    key: "onOrientationChange",
    value: function onOrientationChange(e) {
      var _window = window,
          orientation = _window.orientation;

      if (this.optsSettings.resizeOnOrientationChange) {
        this.resize();
      } // Per ampproject:
      // In IOS 10.3, the measured size of an element is incorrect if the
      // element size depends on window size directly and the measurement
      // happens in window.resize event. Adding a timeout for correct
      // measurement. See https://github.com/ampproject/amphtml/issues/8479


      clearTimeout(this.orientationTimeout);
      this.orientationTimeout = setTimeout(function () {
        this.orientationTimeout = undefined;

        if (this.optsSettings.resizeOnOrientationChange) {
          this.resize();
        }

        this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
      }.bind(this), 500);
    }
  }, {
    key: "onResized",
    value: function onResized(e) {
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize(width, height, epubcfi) {
      var stageSize = this.stage.size(width, height); // For Safari, wait for orientation to catch up
      // if the window is a square

      this.winBounds = windowBounds();

      if (this.orientationTimeout && this.winBounds.width === this.winBounds.height) {
        // reset the stage size for next resize
        this._stageSize = undefined;
        return;
      }

      if (this._stageSize && this._stageSize.width === stageSize.width && this._stageSize.height === stageSize.height) {
        // Size is the same, no need to resize
        return;
      }

      this._stageSize = stageSize;
      this._bounds = this.bounds(); // Clear current views

      this.clear(); // Update for new views

      this.viewSettings.width = this._stageSize.width;
      this.viewSettings.height = this._stageSize.height;
      this.updateLayout();
      this.emit(EVENTS.MANAGERS.RESIZED, {
        width: this._stageSize.width,
        height: this._stageSize.height
      }, epubcfi);
    }
  }, {
    key: "createView",
    value: function createView(section, forceRight) {
      return new this.View(section, extend(this.viewSettings, {
        forceRight: forceRight
      }));
    }
  }, {
    key: "handleNextPrePaginated",
    value: function handleNextPrePaginated(forceRight, section, action) {
      var next;

      if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
        if (forceRight || section.index === 0) {
          // First page (cover) should stand alone for pre-paginated books
          return;
        }

        next = section.next();

        if (next && !next.properties.includes("page-spread-left")) {
          return action.call(this, next);
        }
      }
    }
  }, {
    key: "display",
    value: function display(section, target) {
      var displaying = new defer();
      var displayed = displaying.promise; // Check if moving to target is needed

      if (target === section.href || isNumber(target)) {
        target = undefined;
      } // Check to make sure the section we want isn't already shown


      var visible = this.views.find(section); // View is already shown, just move to correct location in view

      if (visible && section && this.layout.name !== "pre-paginated") {
        var offset = visible.offset();

        if (this.settings.direction === "ltr") {
          this.scrollTo(offset.left, offset.top, true);
        } else {
          var width = visible.width();
          this.scrollTo(offset.left + width, offset.top, true);
        }

        if (target) {
          var _offset = visible.locationOf(target);

          var _width = visible.width();

          this.moveTo(_offset, _width);
        }

        displaying.resolve();
        return displayed;
      } // Hide all current views


      this.clear();
      var forceRight = false;

      if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && section.properties.includes("page-spread-right")) {
        forceRight = true;
      }

      this.add(section, forceRight).then(function (view) {
        // Move to correct place within the section, if needed
        if (target) {
          var _offset2 = view.locationOf(target);

          var _width2 = view.width();

          this.moveTo(_offset2, _width2);
        }
      }.bind(this), function (err) {
        displaying.reject(err);
      }).then(function () {
        return this.handleNextPrePaginated(forceRight, section, this.add);
      }.bind(this)).then(function () {
        this.views.show();
        displaying.resolve();
      }.bind(this)); // .then(function(){
      // 	return this.hooks.display.trigger(view);
      // }.bind(this))
      // .then(function(){
      // 	this.views.show();
      // }.bind(this));

      return displayed;
    }
  }, {
    key: "afterDisplayed",
    value: function afterDisplayed(view) {
      this.emit(EVENTS.MANAGERS.ADDED, view);
    }
  }, {
    key: "afterResized",
    value: function afterResized(view) {
      this.emit(EVENTS.MANAGERS.RESIZE, view.section);
    }
  }, {
    key: "moveTo",
    value: function moveTo(offset, width) {
      var distX = 0,
          distY = 0;

      if (!this.isPaginated) {
        distY = offset.top;
      } else {
        distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;

        if (distX + this.layout.delta > this.container.scrollWidth) {
          distX = this.container.scrollWidth - this.layout.delta;
        }

        distY = Math.floor(offset.top / this.layout.delta) * this.layout.delta;

        if (distY + this.layout.delta > this.container.scrollHeight) {
          distY = this.container.scrollHeight - this.layout.delta;
        }
      }

      if (this.settings.direction === 'rtl') {
        /***
        	the `floor` function above (L343) is on positive values, so we should add one `layout.delta` 
        	to distX or use `Math.ceil` function, or multiply offset.left by -1
        	before `Math.floor`
        */
        distX = distX + this.layout.delta;
        distX = distX - width;
      }

      this.scrollTo(distX, distY, true);
    }
  }, {
    key: "add",
    value: function add(section, forceRight) {
      var _this = this;

      var view = this.createView(section, forceRight);
      this.views.append(view); // view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));

      view.onDisplayed = this.afterDisplayed.bind(this);
      view.onResize = this.afterResized.bind(this);
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this.updateWritingMode(mode);
      });
      return view.display(this.request);
    }
  }, {
    key: "append",
    value: function append(section, forceRight) {
      var _this2 = this;

      var view = this.createView(section, forceRight);
      this.views.append(view);
      view.onDisplayed = this.afterDisplayed.bind(this);
      view.onResize = this.afterResized.bind(this);
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this2.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this2.updateWritingMode(mode);
      });
      return view.display(this.request);
    }
  }, {
    key: "prepend",
    value: function prepend(section, forceRight) {
      var _this3 = this;

      var view = this.createView(section, forceRight);
      view.on(EVENTS.VIEWS.RESIZED, function (bounds) {
        _this3.counter(bounds);
      });
      this.views.prepend(view);
      view.onDisplayed = this.afterDisplayed.bind(this);
      view.onResize = this.afterResized.bind(this);
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this3.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this3.updateWritingMode(mode);
      });
      return view.display(this.request);
    }
  }, {
    key: "counter",
    value: function counter(bounds) {
      if (this.settings.axis === "vertical") {
        this.scrollBy(0, bounds.heightDelta, true);
      } else {
        this.scrollBy(bounds.widthDelta, 0, true);
      }
    } // resizeView(view) {
    //
    // 	if(this.settings.globalLayoutProperties.layout === "pre-paginated") {
    // 		view.lock("both", this.bounds.width, this.bounds.height);
    // 	} else {
    // 		view.lock("width", this.bounds.width, this.bounds.height);
    // 	}
    //
    // };

  }, {
    key: "next",
    value: function next() {
      var next;
      var left;
      var dir = this.settings.direction;
      if (!this.views.length) return;

      if (this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
        this.scrollLeft = this.container.scrollLeft;
        left = this.container.scrollLeft + this.container.offsetWidth + this.layout.delta;

        if (left <= this.container.scrollWidth) {
          this.scrollBy(this.layout.delta, 0, true);
        } else {
          next = this.views.last().section.next();
        }
      } else if (this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
        this.scrollLeft = this.container.scrollLeft;

        if (this.settings.rtlScrollType === "default") {
          left = this.container.scrollLeft;

          if (left > 0) {
            this.scrollBy(this.layout.delta, 0, true);
          } else {
            next = this.views.last().section.next();
          }
        } else {
          left = this.container.scrollLeft + this.layout.delta * -1;

          if (left > this.container.scrollWidth * -1) {
            this.scrollBy(this.layout.delta, 0, true);
          } else {
            next = this.views.last().section.next();
          }
        }
      } else if (this.isPaginated && this.settings.axis === "vertical") {
        this.scrollTop = this.container.scrollTop;
        var top = this.container.scrollTop + this.container.offsetHeight;

        if (top < this.container.scrollHeight) {
          this.scrollBy(0, this.layout.height, true);
        } else {
          next = this.views.last().section.next();
        }
      } else {
        next = this.views.last().section.next();
      }

      if (next) {
        this.clear(); // The new section may have a different writing-mode from the old section. Thus, we need to update layout.

        this.updateLayout();
        var forceRight = false;

        if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && next.properties.includes("page-spread-right")) {
          forceRight = true;
        }

        return this.append(next, forceRight).then(function () {
          return this.handleNextPrePaginated(forceRight, next, this.append);
        }.bind(this), function (err) {
          return err;
        }).then(function () {
          // Reset position to start for scrolled-doc vertical-rl in default mode
          if (!this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl" && this.settings.rtlScrollType === "default") {
            this.scrollTo(this.container.scrollWidth, 0, true);
          }

          this.views.show();
        }.bind(this));
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      var prev;
      var left;
      var dir = this.settings.direction;
      if (!this.views.length) return;

      if (this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
        this.scrollLeft = this.container.scrollLeft;
        left = this.container.scrollLeft;

        if (left > 0) {
          this.scrollBy(-this.layout.delta, 0, true);
        } else {
          prev = this.views.first().section.prev();
        }
      } else if (this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
        this.scrollLeft = this.container.scrollLeft;

        if (this.settings.rtlScrollType === "default") {
          left = this.container.scrollLeft + this.container.offsetWidth;

          if (left < this.container.scrollWidth) {
            this.scrollBy(-this.layout.delta, 0, true);
          } else {
            prev = this.views.first().section.prev();
          }
        } else {
          left = this.container.scrollLeft;

          if (left < 0) {
            this.scrollBy(-this.layout.delta, 0, true);
          } else {
            prev = this.views.first().section.prev();
          }
        }
      } else if (this.isPaginated && this.settings.axis === "vertical") {
        this.scrollTop = this.container.scrollTop;
        var top = this.container.scrollTop;

        if (top > 0) {
          this.scrollBy(0, -this.layout.height, true);
        } else {
          prev = this.views.first().section.prev();
        }
      } else {
        prev = this.views.first().section.prev();
      }

      if (prev) {
        this.clear(); // The new section may have a different writing-mode from the old section. Thus, we need to update layout.

        this.updateLayout();
        var forceRight = false;

        if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && default_typeof(prev.prev()) !== "object") {
          forceRight = true;
        }

        return this.prepend(prev, forceRight).then(function () {
          var left;

          if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
            left = prev.prev();

            if (left) {
              return this.prepend(left);
            }
          }
        }.bind(this), function (err) {
          return err;
        }).then(function () {
          if (this.isPaginated && this.settings.axis === "horizontal") {
            if (this.settings.direction === "rtl") {
              if (this.settings.rtlScrollType === "default") {
                this.scrollTo(0, 0, true);
              } else {
                this.scrollTo(this.container.scrollWidth * -1 + this.layout.delta, 0, true);
              }
            } else {
              this.scrollTo(this.container.scrollWidth - this.layout.delta, 0, true);
            }
          }

          this.views.show();
        }.bind(this));
      }
    }
  }, {
    key: "current",
    value: function current() {
      var visible = this.visible();

      if (visible.length) {
        // Current is the last visible view
        return visible[visible.length - 1];
      }

      return null;
    }
  }, {
    key: "clear",
    value: function clear() {
      // this.q.clear();
      if (this.views) {
        this.views.hide();
        this.scrollTo(0, 0, true);
        this.views.clear();
      }
    }
  }, {
    key: "currentLocation",
    value: function currentLocation() {
      this.updateLayout();

      if (this.isPaginated && this.settings.axis === "horizontal") {
        this.location = this.paginatedLocation();
      } else {
        this.location = this.scrolledLocation();
      }

      return this.location;
    }
  }, {
    key: "scrolledLocation",
    value: function scrolledLocation() {
      var _this4 = this;

      var visible = this.visible();
      var container = this.container.getBoundingClientRect();
      var pageHeight = container.height < window.innerHeight ? container.height : window.innerHeight;
      var pageWidth = container.width < window.innerWidth ? container.width : window.innerWidth;
      var vertical = this.settings.axis === "vertical";
      var rtl = this.settings.direction === "rtl";
      var offset = 0;
      var used = 0;

      if (this.settings.fullsize) {
        offset = vertical ? window.scrollY : window.scrollX;
      }

      var sections = visible.map(function (view) {
        var _view$section = view.section,
            index = _view$section.index,
            href = _view$section.href;
        var position = view.position();
        var width = view.width();
        var height = view.height();
        var startPos;
        var endPos;
        var stopPos;
        var totalPages;

        if (vertical) {
          startPos = offset + container.top - position.top + used;
          endPos = startPos + pageHeight - used;
          totalPages = _this4.layout.count(height, pageHeight).pages;
          stopPos = pageHeight;
        } else {
          startPos = offset + container.left - position.left + used;
          endPos = startPos + pageWidth - used;
          totalPages = _this4.layout.count(width, pageWidth).pages;
          stopPos = pageWidth;
        }

        var currPage = Math.ceil(startPos / stopPos);
        var pages = [];
        var endPage = Math.ceil(endPos / stopPos); // Reverse page counts for horizontal rtl

        if (_this4.settings.direction === "rtl" && !vertical) {
          var tempStartPage = currPage;
          currPage = totalPages - endPage;
          endPage = totalPages - tempStartPage;
        }

        pages = [];

        for (var i = currPage; i <= endPage; i++) {
          var pg = i + 1;
          pages.push(pg);
        }

        var mapping = _this4.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);

        return {
          index: index,
          href: href,
          pages: pages,
          totalPages: totalPages,
          mapping: mapping
        };
      });
      return sections;
    }
  }, {
    key: "paginatedLocation",
    value: function paginatedLocation() {
      var _this5 = this;

      var visible = this.visible();
      var container = this.container.getBoundingClientRect();
      var left = 0;
      var used = 0;

      if (this.settings.fullsize) {
        left = window.scrollX;
      }

      var sections = visible.map(function (view) {
        var _view$section2 = view.section,
            index = _view$section2.index,
            href = _view$section2.href;
        var offset;
        var position = view.position();
        var width = view.width(); // Find mapping

        var start;
        var end;
        var pageWidth;

        if (_this5.settings.direction === "rtl") {
          offset = container.right - left;
          pageWidth = Math.min(Math.abs(offset - position.left), _this5.layout.width) - used;
          end = position.width - (position.right - offset) - used;
          start = end - pageWidth;
        } else {
          offset = container.left + left;
          pageWidth = Math.min(position.right - offset, _this5.layout.width) - used;
          start = offset - position.left + used;
          end = start + pageWidth;
        }

        used += pageWidth;

        var mapping = _this5.mapping.page(view.contents, view.section.cfiBase, start, end);

        var totalPages = _this5.layout.count(width).pages;

        var startPage = Math.floor(start / _this5.layout.pageWidth);
        var pages = [];
        var endPage = Math.floor(end / _this5.layout.pageWidth); // start page should not be negative

        if (startPage < 0) {
          startPage = 0;
          endPage = endPage + 1;
        } // Reverse page counts for rtl


        if (_this5.settings.direction === "rtl") {
          var tempStartPage = startPage;
          startPage = totalPages - endPage;
          endPage = totalPages - tempStartPage;
        }

        for (var i = startPage + 1; i <= endPage; i++) {
          var pg = i;
          pages.push(pg);
        }

        return {
          index: index,
          href: href,
          pages: pages,
          totalPages: totalPages,
          mapping: mapping
        };
      });
      return sections;
    }
  }, {
    key: "isVisible",
    value: function isVisible(view, offsetPrev, offsetNext, _container) {
      var position = view.position();

      var container = _container || this.bounds();

      if (this.settings.axis === "horizontal" && position.right > container.left - offsetPrev && position.left < container.right + offsetNext) {
        return true;
      } else if (this.settings.axis === "vertical" && position.bottom > container.top - offsetPrev && position.top < container.bottom + offsetNext) {
        return true;
      }

      return false;
    }
  }, {
    key: "visible",
    value: function visible() {
      var container = this.bounds();
      var views = this.views.displayed();
      var viewsLength = views.length;
      var visible = [];
      var isVisible;
      var view;

      for (var i = 0; i < viewsLength; i++) {
        view = views[i];
        isVisible = this.isVisible(view, 0, 0, container);

        if (isVisible === true) {
          visible.push(view);
        }
      }

      return visible;
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(x, y, silent) {
      var dir = this.settings.direction === "rtl" ? -1 : 1;

      if (silent) {
        this.ignore = true;
      }

      if (!this.settings.fullsize) {
        if (x) this.container.scrollLeft += x * dir;
        if (y) this.container.scrollTop += y;
      } else {
        window.scrollBy(x * dir, y * dir);
      }

      this.scrolled = true;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(x, y, silent) {
      if (silent) {
        this.ignore = true;
      }

      if (!this.settings.fullsize) {
        this.container.scrollLeft = x;
        this.container.scrollTop = y;
      } else {
        window.scrollTo(x, y);
      }

      this.scrolled = true;
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var scrollTop;
      var scrollLeft;

      if (!this.settings.fullsize) {
        scrollTop = this.container.scrollTop;
        scrollLeft = this.container.scrollLeft;
      } else {
        scrollTop = window.scrollY;
        scrollLeft = window.scrollX;
      }

      this.scrollTop = scrollTop;
      this.scrollLeft = scrollLeft;

      if (!this.ignore) {
        this.emit(EVENTS.MANAGERS.SCROLL, {
          top: scrollTop,
          left: scrollLeft
        });
        clearTimeout(this.afterScrolled);
        this.afterScrolled = setTimeout(function () {
          this.emit(EVENTS.MANAGERS.SCROLLED, {
            top: this.scrollTop,
            left: this.scrollLeft
          });
        }.bind(this), 20);
      } else {
        this.ignore = false;
      }
    }
  }, {
    key: "bounds",
    value: function bounds() {
      var bounds;
      bounds = this.stage.bounds();
      return bounds;
    }
  }, {
    key: "applyLayout",
    value: function applyLayout(layout) {
      this.layout = layout;
      this.updateLayout();

      if (this.views && this.views.length > 0 && this.layout.name === "pre-paginated") {
        this.display(this.views.first().section);
      } // this.manager.layout(this.layout.format);

    }
  }, {
    key: "updateLayout",
    value: function updateLayout() {
      if (!this.stage) {
        return;
      }

      this._stageSize = this.stage.size();

      if (!this.isPaginated) {
        this.layout.calculate(this._stageSize.width, this._stageSize.height);
      } else {
        this.layout.calculate(this._stageSize.width, this._stageSize.height, this.settings.gap); // Set the look ahead offset for what is visible

        this.settings.offset = this.layout.delta / this.layout.divisor; // this.stage.addStyleRules("iframe", [{"margin-right" : this.layout.gap + "px"}]);
      } // Set the dimensions for views


      this.viewSettings.width = this.layout.width;
      this.viewSettings.height = this.layout.height;
      this.setLayout(this.layout);
    }
  }, {
    key: "setLayout",
    value: function setLayout(layout) {
      this.viewSettings.layout = layout;
      this.mapping = new src_mapping(layout.props, this.settings.direction, this.settings.axis);

      if (this.views) {
        this.views.forEach(function (view) {
          if (view) {
            view.setLayout(layout);
          }
        });
      }
    }
  }, {
    key: "updateWritingMode",
    value: function updateWritingMode(mode) {
      this.writingMode = mode;
    }
  }, {
    key: "updateAxis",
    value: function updateAxis(axis, forceUpdate) {
      if (!forceUpdate && axis === this.settings.axis) {
        return;
      }

      this.settings.axis = axis;
      this.stage && this.stage.axis(axis);
      this.viewSettings.axis = axis;

      if (this.mapping) {
        this.mapping = new src_mapping(this.layout.props, this.settings.direction, this.settings.axis);
      }

      if (this.layout) {
        if (axis === "vertical") {
          this.layout.spread("none");
        } else {
          this.layout.spread(this.layout.settings.spread);
        }
      }
    }
  }, {
    key: "updateFlow",
    value: function updateFlow(flow) {
      var defaultScrolledOverflow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "auto";
      var isPaginated = flow === "paginated" || flow === "auto";
      this.isPaginated = isPaginated;

      if (flow === "scrolled-doc" || flow === "scrolled-continuous" || flow === "scrolled") {
        this.updateAxis("vertical");
      } else {
        this.updateAxis("horizontal");
      }

      this.viewSettings.flow = flow;

      if (!this.settings.overflow) {
        this.overflow = isPaginated ? "hidden" : defaultScrolledOverflow;
      } else {
        this.overflow = this.settings.overflow;
      }

      this.stage && this.stage.overflow(this.overflow);
      this.updateLayout();
    }
  }, {
    key: "getContents",
    value: function getContents() {
      var contents = [];

      if (!this.views) {
        return contents;
      }

      this.views.forEach(function (view) {
        var viewContents = view && view.contents;

        if (viewContents) {
          contents.push(viewContents);
        }
      });
      return contents;
    }
  }, {
    key: "direction",
    value: function direction() {
      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ltr";
      this.settings.direction = dir;
      this.stage && this.stage.direction(dir);
      this.viewSettings.direction = dir;
      this.updateLayout();
    }
  }, {
    key: "isRendered",
    value: function isRendered() {
      return this.rendered;
    }
  }]);

  return DefaultViewManager;
}(); //-- Enable binding events to Manager


event_emitter_default()(DefaultViewManager.prototype);
/* harmony default export */ const managers_default = (DefaultViewManager);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(3290);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__(489);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__(2419);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__(4819);
;// CONCATENATED MODULE: ./src/managers/helpers/snap.js
function snap_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function snap_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function snap_createClass(Constructor, protoProps, staticProps) { if (protoProps) snap_defineProperties(Constructor.prototype, protoProps); if (staticProps) snap_defineProperties(Constructor, staticProps); return Constructor; }



 // easing equations from https://github.com/danro/easing-js/blob/master/easing.js

var PI_D2 = Math.PI / 2;
var EASING_EQUATIONS = {
  easeOutSine: function easeOutSine(pos) {
    return Math.sin(pos * PI_D2);
  },
  easeInOutSine: function easeInOutSine(pos) {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  },
  easeInOutQuint: function easeInOutQuint(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }

    return 0.5 * (Math.pow(pos - 2, 5) + 2);
  },
  easeInCubic: function easeInCubic(pos) {
    return Math.pow(pos, 3);
  }
};

var Snap = /*#__PURE__*/function () {
  function Snap(manager, options) {
    snap_classCallCheck(this, Snap);

    this.settings = extend({
      duration: 80,
      minVelocity: 0.2,
      minDistance: 10,
      easing: EASING_EQUATIONS['easeInCubic']
    }, options || {});
    this.supportsTouch = this.supportsTouch();

    if (this.supportsTouch) {
      this.setup(manager);
    }
  }

  snap_createClass(Snap, [{
    key: "setup",
    value: function setup(manager) {
      this.manager = manager;
      this.layout = this.manager.layout;
      this.fullsize = this.manager.settings.fullsize;

      if (this.fullsize) {
        this.element = this.manager.stage.element;
        this.scroller = window;
        this.disableScroll();
      } else {
        this.element = this.manager.stage.container;
        this.scroller = this.element;
        this.element.style["WebkitOverflowScrolling"] = "touch";
      } // this.overflow = this.manager.overflow;
      // set lookahead offset to page width


      this.manager.settings.offset = this.layout.width;
      this.manager.settings.afterScrolledTimeout = this.settings.duration * 2;
      this.isVertical = this.manager.settings.axis === "vertical"; // disable snapping if not paginated or axis in not horizontal

      if (!this.manager.isPaginated || this.isVertical) {
        return;
      }

      this.touchCanceler = false;
      this.resizeCanceler = false;
      this.snapping = false;
      this.scrollLeft;
      this.scrollTop;
      this.startTouchX = undefined;
      this.startTouchY = undefined;
      this.startTime = undefined;
      this.endTouchX = undefined;
      this.endTouchY = undefined;
      this.endTime = undefined;
      this.addListeners();
    }
  }, {
    key: "supportsTouch",
    value: function supportsTouch() {
      if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
      }

      return false;
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      this.element.style.overflow = "hidden";
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      this.element.style.overflow = "";
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      this._onResize = this.onResize.bind(this);
      window.addEventListener('resize', this._onResize);
      this._onScroll = this.onScroll.bind(this);
      this.scroller.addEventListener('scroll', this._onScroll);
      this._onTouchStart = this.onTouchStart.bind(this);
      this.scroller.addEventListener('touchstart', this._onTouchStart, {
        passive: true
      });
      this.on('touchstart', this._onTouchStart);
      this._onTouchMove = this.onTouchMove.bind(this);
      this.scroller.addEventListener('touchmove', this._onTouchMove, {
        passive: true
      });
      this.on('touchmove', this._onTouchMove);
      this._onTouchEnd = this.onTouchEnd.bind(this);
      this.scroller.addEventListener('touchend', this._onTouchEnd, {
        passive: true
      });
      this.on('touchend', this._onTouchEnd);
      this._afterDisplayed = this.afterDisplayed.bind(this);
      this.manager.on(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      window.removeEventListener('resize', this._onResize);
      this._onResize = undefined;
      this.scroller.removeEventListener('scroll', this._onScroll);
      this._onScroll = undefined;
      this.scroller.removeEventListener('touchstart', this._onTouchStart, {
        passive: true
      });
      this.off('touchstart', this._onTouchStart);
      this._onTouchStart = undefined;
      this.scroller.removeEventListener('touchmove', this._onTouchMove, {
        passive: true
      });
      this.off('touchmove', this._onTouchMove);
      this._onTouchMove = undefined;
      this.scroller.removeEventListener('touchend', this._onTouchEnd, {
        passive: true
      });
      this.off('touchend', this._onTouchEnd);
      this._onTouchEnd = undefined;
      this.manager.off(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
      this._afterDisplayed = undefined;
    }
  }, {
    key: "afterDisplayed",
    value: function afterDisplayed(view) {
      var _this = this;

      var contents = view.contents;
      ["touchstart", "touchmove", "touchend"].forEach(function (e) {
        contents.on(e, function (ev) {
          return _this.triggerViewEvent(ev, contents);
        });
      });
    }
  }, {
    key: "triggerViewEvent",
    value: function triggerViewEvent(e, contents) {
      this.emit(e.type, e, contents);
    }
  }, {
    key: "onScroll",
    value: function onScroll(e) {
      this.scrollLeft = this.fullsize ? window.scrollX : this.scroller.scrollLeft;
      this.scrollTop = this.fullsize ? window.scrollY : this.scroller.scrollTop;
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      this.resizeCanceler = true;
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var _e$touches$ = e.touches[0],
          screenX = _e$touches$.screenX,
          screenY = _e$touches$.screenY;

      if (this.fullsize) {
        this.enableScroll();
      }

      this.touchCanceler = true;

      if (!this.startTouchX) {
        this.startTouchX = screenX;
        this.startTouchY = screenY;
        this.startTime = this.now();
      }

      this.endTouchX = screenX;
      this.endTouchY = screenY;
      this.endTime = this.now();
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var _e$touches$2 = e.touches[0],
          screenX = _e$touches$2.screenX,
          screenY = _e$touches$2.screenY;
      var deltaY = Math.abs(screenY - this.endTouchY);
      this.touchCanceler = true;

      if (!this.fullsize && deltaY < 10) {
        this.element.scrollLeft -= screenX - this.endTouchX;
      }

      this.endTouchX = screenX;
      this.endTouchY = screenY;
      this.endTime = this.now();
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      if (this.fullsize) {
        this.disableScroll();
      }

      this.touchCanceler = false;
      var swipped = this.wasSwiped();

      if (swipped !== 0) {
        this.snap(swipped);
      } else {
        this.snap();
      }

      this.startTouchX = undefined;
      this.startTouchY = undefined;
      this.startTime = undefined;
      this.endTouchX = undefined;
      this.endTouchY = undefined;
      this.endTime = undefined;
    }
  }, {
    key: "wasSwiped",
    value: function wasSwiped() {
      var snapWidth = this.layout.pageWidth * this.layout.divisor;
      var distance = this.endTouchX - this.startTouchX;
      var absolute = Math.abs(distance);
      var time = this.endTime - this.startTime;
      var velocity = distance / time;
      var minVelocity = this.settings.minVelocity;

      if (absolute <= this.settings.minDistance || absolute >= snapWidth) {
        return 0;
      }

      if (velocity > minVelocity) {
        // previous
        return -1;
      } else if (velocity < -minVelocity) {
        // next
        return 1;
      }
    }
  }, {
    key: "needsSnap",
    value: function needsSnap() {
      var left = this.scrollLeft;
      var snapWidth = this.layout.pageWidth * this.layout.divisor;
      return left % snapWidth !== 0;
    }
  }, {
    key: "snap",
    value: function snap() {
      var howMany = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var left = this.scrollLeft;
      var snapWidth = this.layout.pageWidth * this.layout.divisor;
      var snapTo = Math.round(left / snapWidth) * snapWidth;

      if (howMany) {
        snapTo += howMany * snapWidth;
      }

      return this.smoothScrollTo(snapTo);
    }
  }, {
    key: "smoothScrollTo",
    value: function smoothScrollTo(destination) {
      var deferred = new defer();
      var start = this.scrollLeft;
      var startTime = this.now();
      var duration = this.settings.duration;
      var easing = this.settings.easing;
      this.snapping = true; // add animation loop

      function tick() {
        var now = this.now();
        var time = Math.min(1, (now - startTime) / duration);
        var timeFunction = easing(time);

        if (this.touchCanceler || this.resizeCanceler) {
          this.resizeCanceler = false;
          this.snapping = false;
          deferred.resolve();
          return;
        }

        if (time < 1) {
          window.requestAnimationFrame(tick.bind(this));
          this.scrollTo(start + (destination - start) * time, 0);
        } else {
          this.scrollTo(destination, 0);
          this.snapping = false;
          deferred.resolve();
        }
      }

      tick.call(this);
      return deferred.promise;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo() {
      var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.fullsize) {
        window.scroll(left, top);
      } else {
        this.scroller.scrollLeft = left;
        this.scroller.scrollTop = top;
      }
    }
  }, {
    key: "now",
    value: function now() {
      return 'now' in window.performance ? performance.now() : new Date().getTime();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.scroller) {
        return;
      }

      if (this.fullsize) {
        this.enableScroll();
      }

      this.removeListeners();
      this.scroller = undefined;
    }
  }]);

  return Snap;
}();

event_emitter_default()(Snap.prototype);
/* harmony default export */ const snap = (Snap);
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__(3279);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// CONCATENATED MODULE: ./src/managers/continuous/index.js
function continuous_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { continuous_typeof = function _typeof(obj) { return typeof obj; }; } else { continuous_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return continuous_typeof(obj); }



















function continuous_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function continuous_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function continuous_createClass(Constructor, protoProps, staticProps) { if (protoProps) continuous_defineProperties(Constructor.prototype, protoProps); if (staticProps) continuous_defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (continuous_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var ContinuousViewManager = /*#__PURE__*/function (_DefaultViewManager) {
  _inherits(ContinuousViewManager, _DefaultViewManager);

  var _super = _createSuper(ContinuousViewManager);

  function ContinuousViewManager(options) {
    var _this;

    continuous_classCallCheck(this, ContinuousViewManager);

    _this = _super.call(this, options);
    _this.name = "continuous";
    _this.settings = extend(_this.settings || {}, {
      infinite: true,
      overflow: undefined,
      axis: undefined,
      writingMode: undefined,
      flow: "scrolled",
      offset: 500,
      offsetDelta: 250,
      width: undefined,
      height: undefined,
      snap: false,
      afterScrolledTimeout: 10
    });
    extend(_this.settings, options.settings || {}); // Gap can be 0, but defaults doesn't handle that

    if (options.settings.gap != "undefined" && options.settings.gap === 0) {
      _this.settings.gap = options.settings.gap;
    }

    _this.viewSettings = {
      ignoreClass: _this.settings.ignoreClass,
      axis: _this.settings.axis,
      flow: _this.settings.flow,
      layout: _this.layout,
      width: 0,
      height: 0,
      forceEvenPages: false
    };
    _this.scrollTop = 0;
    _this.scrollLeft = 0;
    return _this;
  }

  continuous_createClass(ContinuousViewManager, [{
    key: "display",
    value: function display(section, target) {
      return managers_default.prototype.display.call(this, section, target).then(function () {
        return this.fill();
      }.bind(this));
    }
  }, {
    key: "fill",
    value: function fill(_full) {
      var _this2 = this;

      var full = _full || new defer();
      this.q.enqueue(function () {
        return _this2.check();
      }).then(function (result) {
        if (result) {
          _this2.fill(full);
        } else {
          full.resolve();
        }
      });
      return full.promise;
    }
  }, {
    key: "moveTo",
    value: function moveTo(offset) {
      // var bounds = this.stage.bounds();
      // var dist = Math.floor(offset.top / bounds.height) * bounds.height;
      var distX = 0,
          distY = 0;
      var offsetX = 0,
          offsetY = 0;

      if (!this.isPaginated) {
        distY = offset.top;
        offsetY = offset.top + this.settings.offsetDelta;
      } else {
        distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
        offsetX = distX + this.settings.offsetDelta;
      }

      if (distX > 0 || distY > 0) {
        this.scrollBy(distX, distY, true);
      }
    }
  }, {
    key: "afterResized",
    value: function afterResized(view) {
      this.emit(EVENTS.MANAGERS.RESIZE, view.section);
    } // Remove Previous Listeners if present

  }, {
    key: "removeShownListeners",
    value: function removeShownListeners(view) {
      // view.off("shown", this.afterDisplayed);
      // view.off("shown", this.afterDisplayedAbove);
      view.onDisplayed = function () {};
    }
  }, {
    key: "add",
    value: function add(section) {
      var _this3 = this;

      var view = this.createView(section);
      this.views.append(view);
      view.on(EVENTS.VIEWS.RESIZED, function (bounds) {
        view.expanded = true;
      });
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this3.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this3.updateWritingMode(mode);
      }); // view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));

      view.onDisplayed = this.afterDisplayed.bind(this);
      view.onResize = this.afterResized.bind(this);
      return view.display(this.request);
    }
  }, {
    key: "append",
    value: function append(section) {
      var _this4 = this;

      var view = this.createView(section);
      view.on(EVENTS.VIEWS.RESIZED, function (bounds) {
        view.expanded = true;
      });
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this4.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this4.updateWritingMode(mode);
      });
      this.views.append(view);
      view.onDisplayed = this.afterDisplayed.bind(this);
      return view;
    }
  }, {
    key: "prepend",
    value: function prepend(section) {
      var _this5 = this;

      var view = this.createView(section);
      view.on(EVENTS.VIEWS.RESIZED, function (bounds) {
        _this5.counter(bounds);

        view.expanded = true;
      });
      view.on(EVENTS.VIEWS.AXIS, function (axis) {
        _this5.updateAxis(axis);
      });
      view.on(EVENTS.VIEWS.WRITING_MODE, function (mode) {
        _this5.updateWritingMode(mode);
      });
      this.views.prepend(view);
      view.onDisplayed = this.afterDisplayed.bind(this);
      return view;
    }
  }, {
    key: "counter",
    value: function counter(bounds) {
      if (this.settings.axis === "vertical") {
        this.scrollBy(0, bounds.heightDelta, true);
      } else {
        this.scrollBy(bounds.widthDelta, 0, true);
      }
    }
  }, {
    key: "update",
    value: function update(_offset) {
      var container = this.bounds();
      var views = this.views.all();
      var viewsLength = views.length;
      var visible = [];
      var offset = typeof _offset != "undefined" ? _offset : this.settings.offset || 0;
      var isVisible;
      var view;
      var updating = new defer();
      var promises = [];

      for (var i = 0; i < viewsLength; i++) {
        view = views[i];
        isVisible = this.isVisible(view, offset, offset, container);

        if (isVisible === true) {
          // console.log("visible " + view.index, view.displayed);
          if (!view.displayed) {
            var displayed = view.display(this.request).then(function (view) {
              view.show();
            }, function (err) {
              view.hide();
            });
            promises.push(displayed);
          } else {
            view.show();
          }

          visible.push(view);
        } else {
          this.q.enqueue(view.destroy.bind(view)); // console.log("hidden " + view.index, view.displayed);

          clearTimeout(this.trimTimeout);
          this.trimTimeout = setTimeout(function () {
            this.q.enqueue(this.trim.bind(this));
          }.bind(this), 250);
        }
      }

      if (promises.length) {
        return Promise.all(promises).catch(function (err) {
          updating.reject(err);
        });
      } else {
        updating.resolve();
        return updating.promise;
      }
    }
  }, {
    key: "check",
    value: function check(_offsetLeft, _offsetTop) {
      var _this6 = this;

      var checking = new defer();
      var newViews = [];
      var horizontal = this.settings.axis === "horizontal";
      var delta = this.settings.offset || 0;

      if (_offsetLeft && horizontal) {
        delta = _offsetLeft;
      }

      if (_offsetTop && !horizontal) {
        delta = _offsetTop;
      }

      var bounds = this._bounds; // bounds saved this until resize

      var offset = horizontal ? this.scrollLeft : this.scrollTop;
      var visibleLength = horizontal ? Math.floor(bounds.width) : bounds.height;
      var contentLength = horizontal ? this.container.scrollWidth : this.container.scrollHeight;
      var writingMode = this.writingMode && this.writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
      var rtlScrollType = this.settings.rtlScrollType;
      var rtl = this.settings.direction === "rtl";

      if (!this.settings.fullsize) {
        // Scroll offset starts at width of element
        if (rtl && rtlScrollType === "default" && writingMode === "horizontal") {
          offset = contentLength - visibleLength - offset;
        } // Scroll offset starts at 0 and goes negative


        if (rtl && rtlScrollType === "negative" && writingMode === "horizontal") {
          offset = offset * -1;
        }
      } else {
        // Scroll offset starts at 0 and goes negative
        if (horizontal && rtl && rtlScrollType === "negative" || !horizontal && rtl && rtlScrollType === "default") {
          offset = offset * -1;
        }
      }

      var prepend = function prepend() {
        var first = _this6.views.first();

        var prev = first && first.section.prev();

        if (prev) {
          newViews.push(_this6.prepend(prev));
        }
      };

      var append = function append() {
        var last = _this6.views.last();

        var next = last && last.section.next();

        if (next) {
          newViews.push(_this6.append(next));
        }
      };

      var end = offset + visibleLength + delta;
      var start = offset - delta;

      if (end >= contentLength) {
        append();
      }

      if (start < 0) {
        prepend();
      }

      var promises = newViews.map(function (view) {
        return view.display(_this6.request);
      });

      if (newViews.length) {
        return Promise.all(promises).then(function () {
          return _this6.check();
        }).then(function () {
          // Check to see if anything new is on screen after rendering
          return _this6.update(delta);
        }, function (err) {
          return err;
        });
      } else {
        this.q.enqueue(function () {
          this.update();
        }.bind(this));
        checking.resolve(false);
        return checking.promise;
      }
    }
  }, {
    key: "trim",
    value: function trim() {
      var task = new defer();
      var displayed = this.views.displayed();
      var first = displayed[0];
      var last = displayed[displayed.length - 1];
      var firstIndex = this.views.indexOf(first);
      var lastIndex = this.views.indexOf(last);
      var above = this.views.slice(0, firstIndex);
      var below = this.views.slice(lastIndex + 1); // Erase all but last above

      for (var i = 0; i < above.length - 1; i++) {
        this.erase(above[i], above);
      } // Erase all except first below


      for (var j = 1; j < below.length; j++) {
        this.erase(below[j]);
      }

      task.resolve();
      return task.promise;
    }
  }, {
    key: "erase",
    value: function erase(view, above) {
      //Trim
      var prevTop;
      var prevLeft;

      if (!this.settings.fullsize) {
        prevTop = this.container.scrollTop;
        prevLeft = this.container.scrollLeft;
      } else {
        prevTop = window.scrollY;
        prevLeft = window.scrollX;
      }

      var bounds = view.bounds();
      this.views.remove(view);

      if (above) {
        if (this.settings.axis === "vertical") {
          this.scrollTo(0, prevTop - bounds.height, true);
        } else {
          if (this.settings.direction === 'rtl') {
            if (!this.settings.fullsize) {
              this.scrollTo(prevLeft, 0, true);
            } else {
              this.scrollTo(prevLeft + Math.floor(bounds.width), 0, true);
            }
          } else {
            this.scrollTo(prevLeft - Math.floor(bounds.width), 0, true);
          }
        }
      }
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(stage) {
      window.addEventListener("unload", function (e) {
        this.ignore = true; // this.scrollTo(0,0);

        this.destroy();
      }.bind(this));
      this.addScrollListeners();

      if (this.isPaginated && this.settings.snap) {
        this.snapper = new snap(this, this.settings.snap && continuous_typeof(this.settings.snap) === "object" && this.settings.snap);
      }
    }
  }, {
    key: "addScrollListeners",
    value: function addScrollListeners() {
      var scroller;
      this.tick = core_requestAnimationFrame;
      var dir = this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" ? -1 : 1;
      this.scrollDeltaVert = 0;
      this.scrollDeltaHorz = 0;

      if (!this.settings.fullsize) {
        scroller = this.container;
        this.scrollTop = this.container.scrollTop;
        this.scrollLeft = this.container.scrollLeft;
      } else {
        scroller = window;
        this.scrollTop = window.scrollY * dir;
        this.scrollLeft = window.scrollX * dir;
      }

      this._onScroll = this.onScroll.bind(this);
      scroller.addEventListener("scroll", this._onScroll);
      this._scrolled = debounce_default()(this.scrolled.bind(this), 30); // this.tick.call(window, this.onScroll.bind(this));

      this.didScroll = false;
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var scroller;

      if (!this.settings.fullsize) {
        scroller = this.container;
      } else {
        scroller = window;
      }

      scroller.removeEventListener("scroll", this._onScroll);
      this._onScroll = undefined;
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var scrollTop;
      var scrollLeft;
      var dir = this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" ? -1 : 1;

      if (!this.settings.fullsize) {
        scrollTop = this.container.scrollTop;
        scrollLeft = this.container.scrollLeft;
      } else {
        scrollTop = window.scrollY * dir;
        scrollLeft = window.scrollX * dir;
      }

      this.scrollTop = scrollTop;
      this.scrollLeft = scrollLeft;

      if (!this.ignore) {
        this._scrolled();
      } else {
        this.ignore = false;
      }

      this.scrollDeltaVert += Math.abs(scrollTop - this.prevScrollTop);
      this.scrollDeltaHorz += Math.abs(scrollLeft - this.prevScrollLeft);
      this.prevScrollTop = scrollTop;
      this.prevScrollLeft = scrollLeft;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(function () {
        this.scrollDeltaVert = 0;
        this.scrollDeltaHorz = 0;
      }.bind(this), 150);
      clearTimeout(this.afterScrolled);
      this.didScroll = false;
    }
  }, {
    key: "scrolled",
    value: function scrolled() {
      this.q.enqueue(function () {
        return this.check();
      }.bind(this));
      this.emit(EVENTS.MANAGERS.SCROLL, {
        top: this.scrollTop,
        left: this.scrollLeft
      });
      clearTimeout(this.afterScrolled);
      this.afterScrolled = setTimeout(function () {
        // Don't report scroll if we are about the snap
        if (this.snapper && this.snapper.supportsTouch && this.snapper.needsSnap()) {
          return;
        }

        this.emit(EVENTS.MANAGERS.SCROLLED, {
          top: this.scrollTop,
          left: this.scrollLeft
        });
      }.bind(this), this.settings.afterScrolledTimeout);
    }
  }, {
    key: "next",
    value: function next() {
      var delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
      if (!this.views.length) return;

      if (this.isPaginated && this.settings.axis === "horizontal") {
        this.scrollBy(delta, 0, true);
      } else {
        this.scrollBy(0, this.layout.height, true);
      }

      this.q.enqueue(function () {
        return this.check();
      }.bind(this));
    }
  }, {
    key: "prev",
    value: function prev() {
      var delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
      if (!this.views.length) return;

      if (this.isPaginated && this.settings.axis === "horizontal") {
        this.scrollBy(-delta, 0, true);
      } else {
        this.scrollBy(0, -this.layout.height, true);
      }

      this.q.enqueue(function () {
        return this.check();
      }.bind(this));
    }
  }, {
    key: "updateFlow",
    value: function updateFlow(flow) {
      if (this.rendered && this.snapper) {
        this.snapper.destroy();
        this.snapper = undefined;
      }

      _get(_getPrototypeOf(ContinuousViewManager.prototype), "updateFlow", this).call(this, flow, "scroll");

      if (this.rendered && this.isPaginated && this.settings.snap) {
        this.snapper = new snap(this, this.settings.snap && continuous_typeof(this.settings.snap) === "object" && this.settings.snap);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ContinuousViewManager.prototype), "destroy", this).call(this);

      if (this.snapper) {
        this.snapper.destroy();
      }
    }
  }]);

  return ContinuousViewManager;
}(managers_default);

/* harmony default export */ const continuous = (ContinuousViewManager);
;// CONCATENATED MODULE: ./src/rendition.js












function rendition_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { rendition_typeof = function _typeof(obj) { return typeof obj; }; } else { rendition_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return rendition_typeof(obj); }

function rendition_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rendition_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function rendition_createClass(Constructor, protoProps, staticProps) { if (protoProps) rendition_defineProperties(Constructor.prototype, protoProps); if (staticProps) rendition_defineProperties(Constructor, staticProps); return Constructor; }






 // import Mapping from "./mapping";




 // Default Views

 // Default View Managers



/**
 * Displays an Epub as a series of Views for each Section.
 * Requires Manager and View class to handle specifics of rendering
 * the section content.
 * @class
 * @param {Book} book
 * @param {object} [options]
 * @param {number} [options.width]
 * @param {number} [options.height]
 * @param {string} [options.ignoreClass] class for the cfi parser to ignore
 * @param {string | function | object} [options.manager='default']
 * @param {string | function} [options.view='iframe']
 * @param {string} [options.layout] layout to force
 * @param {string} [options.spread] force spread value
 * @param {number} [options.minSpreadWidth] overridden by spread: none (never) / both (always)
 * @param {string} [options.stylesheet] url of stylesheet to be injected
 * @param {boolean} [options.resizeOnOrientationChange] false to disable orientation events
 * @param {string} [options.script] url of script to be injected
 * @param {boolean | object} [options.snap=false] use snap scrolling
 */

var Rendition = /*#__PURE__*/function () {
  function Rendition(book, options) {
    rendition_classCallCheck(this, Rendition);

    this.settings = extend(this.settings || {}, {
      width: null,
      height: null,
      ignoreClass: "",
      manager: "default",
      view: "iframe",
      flow: null,
      layout: null,
      spread: null,
      minSpreadWidth: 800,
      stylesheet: null,
      resizeOnOrientationChange: true,
      script: null,
      snap: false,
      defaultDirection: "ltr"
    });
    extend(this.settings, options);

    if (rendition_typeof(this.settings.manager) === "object") {
      this.manager = this.settings.manager;
    }

    this.book = book;
    /**
     * Adds Hook methods to the Rendition prototype
     * @member {object} hooks
     * @property {Hook} hooks.content
     * @memberof Rendition
     */

    this.hooks = {};
    this.hooks.display = new hook(this);
    this.hooks.serialize = new hook(this);
    this.hooks.content = new hook(this);
    this.hooks.unloaded = new hook(this);
    this.hooks.layout = new hook(this);
    this.hooks.render = new hook(this);
    this.hooks.show = new hook(this);
    this.hooks.content.register(this.handleLinks.bind(this));
    this.hooks.content.register(this.passEvents.bind(this));
    this.hooks.content.register(this.adjustImages.bind(this));
    this.book.spine.hooks.content.register(this.injectIdentifier.bind(this));

    if (this.settings.stylesheet) {
      this.book.spine.hooks.content.register(this.injectStylesheet.bind(this));
    }

    if (this.settings.script) {
      this.book.spine.hooks.content.register(this.injectScript.bind(this));
    }
    /**
     * @member {Themes} themes
     * @memberof Rendition
     */


    this.themes = new themes(this);
    /**
     * @member {Annotations} annotations
     * @memberof Rendition
     */

    this.annotations = new annotations(this);
    this.epubcfi = new epubcfi();
    this.q = new queue(this);
    /**
     * A Rendered Location Range
     * @typedef location
     * @type {Object}
     * @property {object} start
     * @property {string} start.index
     * @property {string} start.href
     * @property {object} start.displayed
     * @property {EpubCFI} start.cfi
     * @property {number} start.location
     * @property {number} start.percentage
     * @property {number} start.displayed.page
     * @property {number} start.displayed.total
     * @property {object} end
     * @property {string} end.index
     * @property {string} end.href
     * @property {object} end.displayed
     * @property {EpubCFI} end.cfi
     * @property {number} end.location
     * @property {number} end.percentage
     * @property {number} end.displayed.page
     * @property {number} end.displayed.total
     * @property {boolean} atStart
     * @property {boolean} atEnd
     * @memberof Rendition
     */

    this.location = undefined; // Hold queue until book is opened

    this.q.enqueue(this.book.opened);
    this.starting = new defer();
    /**
     * @member {promise} started returns after the rendition has started
     * @memberof Rendition
     */

    this.started = this.starting.promise; // Block the queue until rendering is started

    this.q.enqueue(this.start);
  }
  /**
   * Set the manager function
   * @param {function} manager
   */


  rendition_createClass(Rendition, [{
    key: "setManager",
    value: function setManager(manager) {
      this.manager = manager;
    }
    /**
     * Require the manager from passed string, or as a class function
     * @param  {string|object} manager [description]
     * @return {method}
     */

  }, {
    key: "requireManager",
    value: function requireManager(manager) {
      var viewManager; // If manager is a string, try to load from imported managers

      if (typeof manager === "string" && manager === "default") {
        viewManager = managers_default;
      } else if (typeof manager === "string" && manager === "continuous") {
        viewManager = continuous;
      } else {
        // otherwise, assume we were passed a class function
        viewManager = manager;
      }

      return viewManager;
    }
    /**
     * Require the view from passed string, or as a class function
     * @param  {string|object} view
     * @return {view}
     */

  }, {
    key: "requireView",
    value: function requireView(view) {
      var View; // If view is a string, try to load from imported views,

      if (typeof view == "string" && view === "iframe") {
        View = iframe;
      } else {
        // otherwise, assume we were passed a class function
        View = view;
      }

      return View;
    }
    /**
     * Start the rendering
     * @return {Promise} rendering has started
     */

  }, {
    key: "start",
    value: function start() {
      if (!this.settings.layout && (this.book.package.metadata.layout === "pre-paginated" || this.book.displayOptions.fixedLayout === "true")) {
        this.settings.layout = "pre-paginated";
      }

      switch (this.book.package.metadata.spread) {
        case 'none':
          this.settings.spread = 'none';
          break;

        case 'both':
          this.settings.spread = true;
          break;
      }

      if (!this.manager) {
        this.ViewManager = this.requireManager(this.settings.manager);
        this.View = this.requireView(this.settings.view);
        this.manager = new this.ViewManager({
          view: this.View,
          queue: this.q,
          request: this.book.load.bind(this.book),
          settings: this.settings
        });
      }

      this.direction(this.book.package.metadata.direction || this.settings.defaultDirection); // Parse metadata to get layout props

      this.settings.globalLayoutProperties = this.determineLayoutProperties(this.book.package.metadata);
      this.flow(this.settings.globalLayoutProperties.flow);
      this.layout(this.settings.globalLayoutProperties); // Listen for displayed views

      this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
      this.manager.on(EVENTS.MANAGERS.REMOVED, this.afterRemoved.bind(this)); // Listen for resizing

      this.manager.on(EVENTS.MANAGERS.RESIZED, this.onResized.bind(this)); // Listen for rotation

      this.manager.on(EVENTS.MANAGERS.ORIENTATION_CHANGE, this.onOrientationChange.bind(this)); // Listen for scroll changes

      this.manager.on(EVENTS.MANAGERS.SCROLLED, this.reportLocation.bind(this));
      /**
       * Emit that rendering has started
       * @event started
       * @memberof Rendition
       */

      this.emit(EVENTS.RENDITION.STARTED); // Start processing queue

      this.starting.resolve();
    }
    /**
     * Call to attach the container to an element in the dom
     * Container must be attached before rendering can begin
     * @param  {element} element to attach to
     * @return {Promise}
     */

  }, {
    key: "attachTo",
    value: function attachTo(element) {
      return this.q.enqueue(function () {
        // Start rendering
        this.manager.render(element, {
          "width": this.settings.width,
          "height": this.settings.height
        });
        /**
         * Emit that rendering has attached to an element
         * @event attached
         * @memberof Rendition
         */

        this.emit(EVENTS.RENDITION.ATTACHED);
      }.bind(this));
    }
    /**
     * Display a point in the book
     * The request will be added to the rendering Queue,
     * so it will wait until book is opened, rendering started
     * and all other rendering tasks have finished to be called.
     * @param  {string} target Url or EpubCFI
     * @return {Promise}
     */

  }, {
    key: "display",
    value: function display(target) {
      if (this.displaying) {
        this.displaying.resolve();
      }

      return this.q.enqueue(this._display, target);
    }
    /**
     * Tells the manager what to display immediately
     * @private
     * @param  {string} target Url or EpubCFI
     * @return {Promise}
     */

  }, {
    key: "_display",
    value: function _display(target) {
      var _this = this;

      if (!this.book) {
        return;
      }

      var isCfiString = this.epubcfi.isCfiString(target);
      var displaying = new defer();
      var displayed = displaying.promise;
      var section;
      var moveTo;
      this.displaying = displaying; // Check if this is a book percentage

      if (this.book.locations.length() && isFloat(target)) {
        target = this.book.locations.cfiFromPercentage(parseFloat(target));
      }

      section = this.book.spine.get(target);

      if (!section) {
        displaying.reject(new Error("No Section Found"));
        return displayed;
      }

      this.manager.display(section, target).then(function () {
        displaying.resolve(section);
        _this.displaying = undefined;
        /**
         * Emit that a section has been displayed
         * @event displayed
         * @param {Section} section
         * @memberof Rendition
         */

        _this.emit(EVENTS.RENDITION.DISPLAYED, section);

        _this.reportLocation();
      }, function (err) {
        /**
         * Emit that has been an error displaying
         * @event displayError
         * @param {Section} section
         * @memberof Rendition
         */
        _this.emit(EVENTS.RENDITION.DISPLAY_ERROR, err);
      });
      return displayed;
    }
    /*
    render(view, show) {
    		// view.onLayout = this.layout.format.bind(this.layout);
    	view.create();
    		// Fit to size of the container, apply padding
    	this.manager.resizeView(view);
    		// Render Chain
    	return view.section.render(this.book.request)
    		.then(function(contents){
    			return view.load(contents);
    		}.bind(this))
    		.then(function(doc){
    			return this.hooks.content.trigger(view, this);
    		}.bind(this))
    		.then(function(){
    			this.layout.format(view.contents);
    			return this.hooks.layout.trigger(view, this);
    		}.bind(this))
    		.then(function(){
    			return view.display();
    		}.bind(this))
    		.then(function(){
    			return this.hooks.render.trigger(view, this);
    		}.bind(this))
    		.then(function(){
    			if(show !== false) {
    				this.q.enqueue(function(view){
    					view.show();
    				}, view);
    			}
    			// this.map = new Map(view, this.layout);
    			this.hooks.show.trigger(view, this);
    			this.trigger("rendered", view.section);
    			}.bind(this))
    		.catch(function(e){
    			this.trigger("loaderror", e);
    		}.bind(this));
    	}
    */

    /**
     * Report what section has been displayed
     * @private
     * @param  {*} view
     */

  }, {
    key: "afterDisplayed",
    value: function afterDisplayed(view) {
      var _this2 = this;

      view.on(EVENTS.VIEWS.MARK_CLICKED, function (cfiRange, data) {
        return _this2.triggerMarkEvent(cfiRange, data, view.contents);
      });
      this.hooks.render.trigger(view, this).then(function () {
        if (view.contents) {
          _this2.hooks.content.trigger(view.contents, _this2).then(function () {
            /**
             * Emit that a section has been rendered
             * @event rendered
             * @param {Section} section
             * @param {View} view
             * @memberof Rendition
             */
            _this2.emit(EVENTS.RENDITION.RENDERED, view.section, view);
          });
        } else {
          _this2.emit(EVENTS.RENDITION.RENDERED, view.section, view);
        }
      });
    }
    /**
     * Report what has been removed
     * @private
     * @param  {*} view
     */

  }, {
    key: "afterRemoved",
    value: function afterRemoved(view) {
      var _this3 = this;

      this.hooks.unloaded.trigger(view, this).then(function () {
        /**
         * Emit that a section has been removed
         * @event removed
         * @param {Section} section
         * @param {View} view
         * @memberof Rendition
         */
        _this3.emit(EVENTS.RENDITION.REMOVED, view.section, view);
      });
    }
    /**
     * Report resize events and display the last seen location
     * @private
     */

  }, {
    key: "onResized",
    value: function onResized(size, epubcfi) {
      /**
       * Emit that the rendition has been resized
       * @event resized
       * @param {number} width
       * @param {height} height
       * @param {string} epubcfi (optional)
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.RESIZED, {
        width: size.width,
        height: size.height
      }, epubcfi);

      if (this.location && this.location.start) {
        this.display(epubcfi || this.location.start.cfi);
      }
    }
    /**
     * Report orientation events and display the last seen location
     * @private
     */

  }, {
    key: "onOrientationChange",
    value: function onOrientationChange(orientation) {
      /**
       * Emit that the rendition has been rotated
       * @event orientationchange
       * @param {string} orientation
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.ORIENTATION_CHANGE, orientation);
    }
    /**
     * Move the Rendition to a specific offset
     * Usually you would be better off calling display()
     * @param {object} offset
     */

  }, {
    key: "moveTo",
    value: function moveTo(offset) {
      this.manager.moveTo(offset);
    }
    /**
     * Trigger a resize of the views
     * @param {number} [width]
     * @param {number} [height]
     * @param {string} [epubcfi] (optional)
     */

  }, {
    key: "resize",
    value: function resize(width, height, epubcfi) {
      if (width) {
        this.settings.width = width;
      }

      if (height) {
        this.settings.height = height;
      }

      this.manager.resize(width, height, epubcfi);
    }
    /**
     * Clear all rendered views
     */

  }, {
    key: "clear",
    value: function clear() {
      this.manager.clear();
    }
    /**
     * Go to the next "page" in the rendition
     * @return {Promise}
     */

  }, {
    key: "next",
    value: function next() {
      return this.q.enqueue(this.manager.next.bind(this.manager)).then(this.reportLocation.bind(this));
    }
    /**
     * Go to the previous "page" in the rendition
     * @return {Promise}
     */

  }, {
    key: "prev",
    value: function prev() {
      return this.q.enqueue(this.manager.prev.bind(this.manager)).then(this.reportLocation.bind(this));
    } //-- http://www.idpf.org/epub/301/spec/epub-publications.html#meta-properties-rendering

    /**
     * Determine the Layout properties from metadata and settings
     * @private
     * @param  {object} metadata
     * @return {object} properties
     */

  }, {
    key: "determineLayoutProperties",
    value: function determineLayoutProperties(metadata) {
      var properties;
      var layout = this.settings.layout || metadata.layout || "reflowable";
      var spread = this.settings.spread || metadata.spread || "auto";
      var orientation = this.settings.orientation || metadata.orientation || "auto";
      var flow = this.settings.flow || metadata.flow || "auto";
      var viewport = metadata.viewport || "";
      var minSpreadWidth = this.settings.minSpreadWidth || metadata.minSpreadWidth || 800;
      var direction = this.settings.direction || metadata.direction || "ltr";

      if ((this.settings.width === 0 || this.settings.width > 0) && (this.settings.height === 0 || this.settings.height > 0)) {// viewport = "width="+this.settings.width+", height="+this.settings.height+"";
      }

      properties = {
        layout: layout,
        spread: spread,
        orientation: orientation,
        flow: flow,
        viewport: viewport,
        minSpreadWidth: minSpreadWidth,
        direction: direction
      };
      return properties;
    }
    /**
     * Adjust the flow of the rendition to paginated or scrolled
     * (scrolled-continuous vs scrolled-doc are handled by different view managers)
     * @param  {string} flow
     */

  }, {
    key: "flow",
    value: function flow(_flow2) {
      var _flow = _flow2;

      if (_flow2 === "scrolled" || _flow2 === "scrolled-doc" || _flow2 === "scrolled-continuous") {
        _flow = "scrolled";
      }

      if (_flow2 === "auto" || _flow2 === "paginated") {
        _flow = "paginated";
      }

      this.settings.flow = _flow2;

      if (this._layout) {
        this._layout.flow(_flow);
      }

      if (this.manager && this._layout) {
        this.manager.applyLayout(this._layout);
      }

      if (this.manager) {
        this.manager.updateFlow(_flow);
      }

      if (this.manager && this.manager.isRendered() && this.location) {
        this.manager.clear();
        this.display(this.location.start.cfi);
      }
    }
    /**
     * Adjust the layout of the rendition to reflowable or pre-paginated
     * @param  {object} settings
     */

  }, {
    key: "layout",
    value: function layout(settings) {
      var _this4 = this;

      if (settings) {
        this._layout = new src_layout(settings);

        this._layout.spread(settings.spread, this.settings.minSpreadWidth); // this.mapping = new Mapping(this._layout.props);


        this._layout.on(EVENTS.LAYOUT.UPDATED, function (props, changed) {
          _this4.emit(EVENTS.RENDITION.LAYOUT, props, changed);
        });
      }

      if (this.manager && this._layout) {
        this.manager.applyLayout(this._layout);
      }

      return this._layout;
    }
    /**
     * Adjust if the rendition uses spreads
     * @param  {string} spread none | auto (TODO: implement landscape, portrait, both)
     * @param  {int} [min] min width to use spreads at
     */

  }, {
    key: "spread",
    value: function spread(_spread, min) {
      this.settings.spread = _spread;

      if (min) {
        this.settings.minSpreadWidth = min;
      }

      if (this._layout) {
        this._layout.spread(_spread, min);
      }

      if (this.manager && this.manager.isRendered()) {
        this.manager.updateLayout();
      }
    }
    /**
     * Adjust the direction of the rendition
     * @param  {string} dir
     */

  }, {
    key: "direction",
    value: function direction(dir) {
      this.settings.direction = dir || "ltr";

      if (this.manager) {
        this.manager.direction(this.settings.direction);
      }

      if (this.manager && this.manager.isRendered() && this.location) {
        this.manager.clear();
        this.display(this.location.start.cfi);
      }
    }
    /**
     * Report the current location
     * @fires relocated
     * @fires locationChanged
     */

  }, {
    key: "reportLocation",
    value: function reportLocation() {
      return this.q.enqueue(function reportedLocation() {
        requestAnimationFrame(function reportedLocationAfterRAF() {
          var location = this.manager.currentLocation();

          if (location && location.then && typeof location.then === "function") {
            location.then(function (result) {
              var located = this.located(result);

              if (!located || !located.start || !located.end) {
                return;
              }

              this.location = located;
              this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
                index: this.location.start.index,
                href: this.location.start.href,
                start: this.location.start.cfi,
                end: this.location.end.cfi,
                percentage: this.location.start.percentage
              });
              this.emit(EVENTS.RENDITION.RELOCATED, this.location);
            }.bind(this));
          } else if (location) {
            var located = this.located(location);

            if (!located || !located.start || !located.end) {
              return;
            }

            this.location = located;
            /**
             * @event locationChanged
             * @deprecated
             * @type {object}
             * @property {number} index
             * @property {string} href
             * @property {EpubCFI} start
             * @property {EpubCFI} end
             * @property {number} percentage
             * @memberof Rendition
             */

            this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
              index: this.location.start.index,
              href: this.location.start.href,
              start: this.location.start.cfi,
              end: this.location.end.cfi,
              percentage: this.location.start.percentage
            });
            /**
             * @event relocated
             * @type {displayedLocation}
             * @memberof Rendition
             */

            this.emit(EVENTS.RENDITION.RELOCATED, this.location);
          }
        }.bind(this));
      }.bind(this));
    }
    /**
     * Get the Current Location object
     * @return {displayedLocation | promise} location (may be a promise)
     */

  }, {
    key: "currentLocation",
    value: function currentLocation() {
      var location = this.manager.currentLocation();

      if (location && location.then && typeof location.then === "function") {
        location.then(function (result) {
          var located = this.located(result);
          return located;
        }.bind(this));
      } else if (location) {
        var located = this.located(location);
        return located;
      }
    }
    /**
     * Creates a Rendition#locationRange from location
     * passed by the Manager
     * @returns {displayedLocation}
     * @private
     */

  }, {
    key: "located",
    value: function located(location) {
      if (!location.length) {
        return {};
      }

      var start = location[0];
      var end = location[location.length - 1];
      var located = {
        start: {
          index: start.index,
          href: start.href,
          cfi: start.mapping.start,
          displayed: {
            page: start.pages[0] || 1,
            total: start.totalPages
          }
        },
        end: {
          index: end.index,
          href: end.href,
          cfi: end.mapping.end,
          displayed: {
            page: end.pages[end.pages.length - 1] || 1,
            total: end.totalPages
          }
        }
      };
      var locationStart = this.book.locations.locationFromCfi(start.mapping.start);
      var locationEnd = this.book.locations.locationFromCfi(end.mapping.end);

      if (locationStart != null) {
        located.start.location = locationStart;
        located.start.percentage = this.book.locations.percentageFromLocation(locationStart);
      }

      if (locationEnd != null) {
        located.end.location = locationEnd;
        located.end.percentage = this.book.locations.percentageFromLocation(locationEnd);
      }

      var pageStart = this.book.pageList.pageFromCfi(start.mapping.start);
      var pageEnd = this.book.pageList.pageFromCfi(end.mapping.end);

      if (pageStart != -1) {
        located.start.page = pageStart;
      }

      if (pageEnd != -1) {
        located.end.page = pageEnd;
      }

      if (end.index === this.book.spine.last().index && located.end.displayed.page >= located.end.displayed.total) {
        located.atEnd = true;
      }

      if (start.index === this.book.spine.first().index && located.start.displayed.page === 1) {
        located.atStart = true;
      }

      return located;
    }
    /**
     * Remove and Clean Up the Rendition
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // Clear the queue
      // this.q.clear();
      // this.q = undefined;
      this.manager && this.manager.destroy();
      this.book = undefined; // this.views = null;
      // this.hooks.display.clear();
      // this.hooks.serialize.clear();
      // this.hooks.content.clear();
      // this.hooks.layout.clear();
      // this.hooks.render.clear();
      // this.hooks.show.clear();
      // this.hooks = {};
      // this.themes.destroy();
      // this.themes = undefined;
      // this.epubcfi = undefined;
      // this.starting = undefined;
      // this.started = undefined;
    }
    /**
     * Pass the events from a view's Contents
     * @private
     * @param  {Contents} view contents
     */

  }, {
    key: "passEvents",
    value: function passEvents(contents) {
      var _this5 = this;

      DOM_EVENTS.forEach(function (e) {
        contents.on(e, function (ev) {
          return _this5.triggerViewEvent(ev, contents);
        });
      });
      contents.on(EVENTS.CONTENTS.SELECTED, function (e) {
        return _this5.triggerSelectedEvent(e, contents);
      });
    }
    /**
     * Emit events passed by a view
     * @private
     * @param  {event} e
     */

  }, {
    key: "triggerViewEvent",
    value: function triggerViewEvent(e, contents) {
      this.emit(e.type, e, contents);
    }
    /**
     * Emit a selection event's CFI Range passed from a a view
     * @private
     * @param  {string} cfirange
     */

  }, {
    key: "triggerSelectedEvent",
    value: function triggerSelectedEvent(cfirange, contents) {
      /**
       * Emit that a text selection has occured
       * @event selected
       * @param {string} cfirange
       * @param {Contents} contents
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.SELECTED, cfirange, contents);
    }
    /**
     * Emit a markClicked event with the cfiRange and data from a mark
     * @private
     * @param  {EpubCFI} cfirange
     */

  }, {
    key: "triggerMarkEvent",
    value: function triggerMarkEvent(cfiRange, data, contents) {
      /**
       * Emit that a mark was clicked
       * @event markClicked
       * @param {EpubCFI} cfirange
       * @param {object} data
       * @param {Contents} contents
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.MARK_CLICKED, cfiRange, data, contents);
    }
    /**
     * Get a Range from a Visible CFI
     * @param  {string} cfi EpubCfi String
     * @param  {string} ignoreClass
     * @return {range}
     */

  }, {
    key: "getRange",
    value: function getRange(cfi, ignoreClass) {
      var _cfi = new epubcfi(cfi);

      var found = this.manager.visible().filter(function (view) {
        if (_cfi.spinePos === view.index) return true;
      }); // Should only every return 1 item

      if (found.length) {
        return found[0].contents.range(_cfi, ignoreClass);
      }
    }
    /**
     * Hook to adjust images to fit in columns
     * @param  {Contents} contents
     * @private
     */

  }, {
    key: "adjustImages",
    value: function adjustImages(contents) {
      if (this._layout.name === "pre-paginated") {
        return new Promise(function (resolve) {
          resolve();
        });
      }

      var computed = contents.window.getComputedStyle(contents.content, null);
      var height = (contents.content.offsetHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom))) * .95;
      var horizontalPadding = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);
      contents.addStylesheetRules({
        "img": {
          "max-width": (this._layout.columnWidth ? this._layout.columnWidth - horizontalPadding + "px" : "100%") + "!important",
          "max-height": height + "px" + "!important",
          "object-fit": "contain",
          "page-break-inside": "avoid",
          "break-inside": "avoid",
          "box-sizing": "border-box"
        },
        "svg": {
          "max-width": (this._layout.columnWidth ? this._layout.columnWidth - horizontalPadding + "px" : "100%") + "!important",
          "max-height": height + "px" + "!important",
          "page-break-inside": "avoid",
          "break-inside": "avoid"
        }
      });
      return new Promise(function (resolve, reject) {
        // Wait to apply
        setTimeout(function () {
          resolve();
        }, 1);
      });
    }
    /**
     * Get the Contents object of each rendered view
     * @returns {Contents[]}
     */

  }, {
    key: "getContents",
    value: function getContents() {
      return this.manager ? this.manager.getContents() : [];
    }
    /**
     * Get the views member from the manager
     * @returns {Views}
     */

  }, {
    key: "views",
    value: function views() {
      var views = this.manager ? this.manager.views : undefined;
      return views || [];
    }
    /**
     * Hook to handle link clicks in rendered content
     * @param  {Contents} contents
     * @private
     */

  }, {
    key: "handleLinks",
    value: function handleLinks(contents) {
      var _this6 = this;

      if (contents) {
        contents.on(EVENTS.CONTENTS.LINK_CLICKED, function (href) {
          var relative = _this6.book.path.relative(href);

          _this6.display(relative);
        });
      }
    }
    /**
     * Hook to handle injecting stylesheet before
     * a Section is serialized
     * @param  {document} doc
     * @param  {Section} section
     * @private
     */

  }, {
    key: "injectStylesheet",
    value: function injectStylesheet(doc, section) {
      var style = doc.createElement("link");
      style.setAttribute("type", "text/css");
      style.setAttribute("rel", "stylesheet");
      style.setAttribute("href", this.settings.stylesheet);
      doc.getElementsByTagName("head")[0].appendChild(style);
    }
    /**
     * Hook to handle injecting scripts before
     * a Section is serialized
     * @param  {document} doc
     * @param  {Section} section
     * @private
     */

  }, {
    key: "injectScript",
    value: function injectScript(doc, section) {
      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", this.settings.script);
      script.textContent = " "; // Needed to prevent self closing tag

      doc.getElementsByTagName("head")[0].appendChild(script);
    }
    /**
     * Hook to handle the document identifier before
     * a Section is serialized
     * @param  {document} doc
     * @param  {Section} section
     * @private
     */

  }, {
    key: "injectIdentifier",
    value: function injectIdentifier(doc, section) {
      var ident = this.book.packaging.metadata.identifier;
      var meta = doc.createElement("meta");
      meta.setAttribute("name", "dc.relation.ispartof");

      if (ident) {
        meta.setAttribute("content", ident);
      }

      doc.getElementsByTagName("head")[0].appendChild(meta);
    }
  }]);

  return Rendition;
}(); //-- Enable binding events to Renderer


event_emitter_default()(Rendition.prototype);
/* harmony default export */ const rendition = (Rendition);
// EXTERNAL MODULE: external "jszip"
var external_jszip_ = __webpack_require__(4547);
var external_jszip_default = /*#__PURE__*/__webpack_require__.n(external_jszip_);
;// CONCATENATED MODULE: ./src/archive.js








function archive_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function archive_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function archive_createClass(Constructor, protoProps, staticProps) { if (protoProps) archive_defineProperties(Constructor.prototype, protoProps); if (staticProps) archive_defineProperties(Constructor, staticProps); return Constructor; }






/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @class
 */

var Archive = /*#__PURE__*/function () {
  function Archive() {
    archive_classCallCheck(this, Archive);

    this.zip = undefined;
    this.urlCache = {};
    this.checkRequirements();
  }
  /**
   * Checks to see if JSZip exists in global namspace,
   * Requires JSZip if it isn't there
   * @private
   */


  archive_createClass(Archive, [{
    key: "checkRequirements",
    value: function checkRequirements() {
      try {
        this.zip = new (external_jszip_default())();
      } catch (e) {
        throw new Error("JSZip lib not loaded");
      }
    }
    /**
     * Open an archive
     * @param  {binary} input
     * @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
     * @return {Promise} zipfile
     */

  }, {
    key: "open",
    value: function open(input, isBase64) {
      return this.zip.loadAsync(input, {
        "base64": isBase64
      });
    }
    /**
     * Load and Open an archive
     * @param  {string} zipUrl
     * @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
     * @return {Promise} zipfile
     */

  }, {
    key: "openUrl",
    value: function openUrl(zipUrl, isBase64) {
      return utils_request(zipUrl, "binary").then(function (data) {
        return this.zip.loadAsync(data, {
          "base64": isBase64
        });
      }.bind(this));
    }
    /**
     * Request a url from the archive
     * @param  {string} url  a url to request from the archive
     * @param  {string} [type] specify the type of the returned result
     * @return {Promise<Blob | string | JSON | Document | XMLDocument>}
     */

  }, {
    key: "request",
    value: function request(url, type) {
      var deferred = new defer();
      var response;
      var path = new utils_path(url); // If type isn't set, determine it from the file extension

      if (!type) {
        type = path.extension;
      }

      if (type == "blob") {
        response = this.getBlob(url);
      } else {
        response = this.getText(url);
      }

      if (response) {
        response.then(function (r) {
          var result = this.handleResponse(r, type);
          deferred.resolve(result);
        }.bind(this));
      } else {
        deferred.reject({
          message: "File not found in the epub: " + url,
          stack: new Error().stack
        });
      }

      return deferred.promise;
    }
    /**
     * Handle the response from request
     * @private
     * @param  {any} response
     * @param  {string} [type]
     * @return {any} the parsed result
     */

  }, {
    key: "handleResponse",
    value: function handleResponse(response, type) {
      var r;

      if (type == "json") {
        r = JSON.parse(response);
      } else if (isXml(type)) {
        r = parse(response, "text/xml");
      } else if (type == "xhtml") {
        r = parse(response, "application/xhtml+xml");
      } else if (type == "html" || type == "htm") {
        r = parse(response, "text/html");
      } else {
        r = response;
      }

      return r;
    }
    /**
     * Get a Blob from Archive by Url
     * @param  {string} url
     * @param  {string} [mimeType]
     * @return {Blob}
     */

  }, {
    key: "getBlob",
    value: function getBlob(url, mimeType) {
      var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash

      var entry = this.zip.file(decodededUrl);

      if (entry) {
        mimeType = mimeType || mime.lookup(entry.name);
        return entry.async("uint8array").then(function (uint8array) {
          return new Blob([uint8array], {
            type: mimeType
          });
        });
      }
    }
    /**
     * Get Text from Archive by Url
     * @param  {string} url
     * @param  {string} [encoding]
     * @return {string}
     */

  }, {
    key: "getText",
    value: function getText(url, encoding) {
      var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash

      var entry = this.zip.file(decodededUrl);

      if (entry) {
        return entry.async("string").then(function (text) {
          return text;
        });
      }
    }
    /**
     * Get a base64 encoded result from Archive by Url
     * @param  {string} url
     * @param  {string} [mimeType]
     * @return {string} base64 encoded
     */

  }, {
    key: "getBase64",
    value: function getBase64(url, mimeType) {
      var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash

      var entry = this.zip.file(decodededUrl);

      if (entry) {
        mimeType = mimeType || mime.lookup(entry.name);
        return entry.async("base64").then(function (data) {
          return "data:" + mimeType + ";base64," + data;
        });
      }
    }
    /**
     * Create a Url from an unarchived item
     * @param  {string} url
     * @param  {object} [options.base64] use base64 encoding or blob url
     * @return {Promise} url promise with Url string
     */

  }, {
    key: "createUrl",
    value: function createUrl(url, options) {
      var deferred = new defer();

      var _URL = window.URL || window.webkitURL || window.mozURL;

      var tempUrl;
      var response;
      var useBase64 = options && options.base64;

      if (url in this.urlCache) {
        deferred.resolve(this.urlCache[url]);
        return deferred.promise;
      }

      if (useBase64) {
        response = this.getBase64(url);

        if (response) {
          response.then(function (tempUrl) {
            this.urlCache[url] = tempUrl;
            deferred.resolve(tempUrl);
          }.bind(this));
        }
      } else {
        response = this.getBlob(url);

        if (response) {
          response.then(function (blob) {
            tempUrl = _URL.createObjectURL(blob);
            this.urlCache[url] = tempUrl;
            deferred.resolve(tempUrl);
          }.bind(this));
        }
      }

      if (!response) {
        deferred.reject({
          message: "File not found in the epub: " + url,
          stack: new Error().stack
        });
      }

      return deferred.promise;
    }
    /**
     * Revoke Temp Url for a achive item
     * @param  {string} url url of the item in the archive
     */

  }, {
    key: "revokeUrl",
    value: function revokeUrl(url) {
      var _URL = window.URL || window.webkitURL || window.mozURL;

      var fromCache = this.urlCache[url];
      if (fromCache) _URL.revokeObjectURL(fromCache);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _URL = window.URL || window.webkitURL || window.mozURL;

      for (var fromCache in this.urlCache) {
        _URL.revokeObjectURL(fromCache);
      }

      this.zip = undefined;
      this.urlCache = {};
    }
  }]);

  return Archive;
}();

/* harmony default export */ const archive = (Archive);
// EXTERNAL MODULE: ./node_modules/localforage/dist/localforage.js
var localforage = __webpack_require__(1365);
var localforage_default = /*#__PURE__*/__webpack_require__.n(localforage);
;// CONCATENATED MODULE: ./src/store.js










function store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function store_createClass(Constructor, protoProps, staticProps) { if (protoProps) store_defineProperties(Constructor.prototype, protoProps); if (staticProps) store_defineProperties(Constructor, staticProps); return Constructor; }







/**
 * Handles saving and requesting files from local storage
 * @class
 * @param {string} name This should be the name of the application for modals
 * @param {function} [requester]
 * @param {function} [resolver]
 */

var Store = /*#__PURE__*/function () {
  function Store(name, requester, resolver) {
    store_classCallCheck(this, Store);

    this.urlCache = {};
    this.storage = undefined;
    this.name = name;
    this.requester = requester || utils_request;
    this.resolver = resolver;
    this.online = true;
    this.checkRequirements();
    this.addListeners();
  }
  /**
   * Checks to see if localForage exists in global namspace,
   * Requires localForage if it isn't there
   * @private
   */


  store_createClass(Store, [{
    key: "checkRequirements",
    value: function checkRequirements() {
      try {
        var store;

        if (typeof (localforage_default()) === "undefined") {
          store = (localforage_default());
        }

        this.storage = store.createInstance({
          name: this.name
        });
      } catch (e) {
        throw new Error("localForage lib not loaded");
      }
    }
    /**
     * Add online and offline event listeners
     * @private
     */

  }, {
    key: "addListeners",
    value: function addListeners() {
      this._status = this.status.bind(this);
      window.addEventListener('online', this._status);
      window.addEventListener('offline', this._status);
    }
    /**
     * Remove online and offline event listeners
     * @private
     */

  }, {
    key: "removeListeners",
    value: function removeListeners() {
      window.removeEventListener('online', this._status);
      window.removeEventListener('offline', this._status);
      this._status = undefined;
    }
    /**
     * Update the online / offline status
     * @private
     */

  }, {
    key: "status",
    value: function status(event) {
      var online = navigator.onLine;
      this.online = online;

      if (online) {
        this.emit("online", this);
      } else {
        this.emit("offline", this);
      }
    }
    /**
     * Add all of a book resources to the store
     * @param  {Resources} resources  book resources
     * @param  {boolean} [force] force resaving resources
     * @return {Promise<object>} store objects
     */

  }, {
    key: "add",
    value: function add(resources, force) {
      var _this = this;

      var mapped = resources.resources.map(function (item) {
        var href = item.href;

        var url = _this.resolver(href);

        var encodedUrl = window.encodeURIComponent(url);
        return _this.storage.getItem(encodedUrl).then(function (item) {
          if (!item || force) {
            return _this.requester(url, "binary").then(function (data) {
              return _this.storage.setItem(encodedUrl, data);
            });
          } else {
            return item;
          }
        });
      });
      return Promise.all(mapped);
    }
    /**
     * Put binary data from a url to storage
     * @param  {string} url  a url to request from storage
     * @param  {boolean} [withCredentials]
     * @param  {object} [headers]
     * @return {Promise<Blob>}
     */

  }, {
    key: "put",
    value: function put(url, withCredentials, headers) {
      var _this2 = this;

      var encodedUrl = window.encodeURIComponent(url);
      return this.storage.getItem(encodedUrl).then(function (result) {
        if (!result) {
          return _this2.requester(url, "binary", withCredentials, headers).then(function (data) {
            return _this2.storage.setItem(encodedUrl, data);
          });
        }

        return result;
      });
    }
    /**
     * Request a url
     * @param  {string} url  a url to request from storage
     * @param  {string} [type] specify the type of the returned result
     * @param  {boolean} [withCredentials]
     * @param  {object} [headers]
     * @return {Promise<Blob | string | JSON | Document | XMLDocument>}
     */

  }, {
    key: "request",
    value: function request(url, type, withCredentials, headers) {
      var _this3 = this;

      if (this.online) {
        // From network
        return this.requester(url, type, withCredentials, headers).then(function (data) {
          // save to store if not present
          _this3.put(url);

          return data;
        });
      } else {
        // From store
        return this.retrieve(url, type);
      }
    }
    /**
     * Request a url from storage
     * @param  {string} url  a url to request from storage
     * @param  {string} [type] specify the type of the returned result
     * @return {Promise<Blob | string | JSON | Document | XMLDocument>}
     */

  }, {
    key: "retrieve",
    value: function retrieve(url, type) {
      var _this4 = this;

      var deferred = new defer();
      var response;
      var path = new utils_path(url); // If type isn't set, determine it from the file extension

      if (!type) {
        type = path.extension;
      }

      if (type == "blob") {
        response = this.getBlob(url);
      } else {
        response = this.getText(url);
      }

      return response.then(function (r) {
        var deferred = new defer();
        var result;

        if (r) {
          result = _this4.handleResponse(r, type);
          deferred.resolve(result);
        } else {
          deferred.reject({
            message: "File not found in storage: " + url,
            stack: new Error().stack
          });
        }

        return deferred.promise;
      });
    }
    /**
     * Handle the response from request
     * @private
     * @param  {any} response
     * @param  {string} [type]
     * @return {any} the parsed result
     */

  }, {
    key: "handleResponse",
    value: function handleResponse(response, type) {
      var r;

      if (type == "json") {
        r = JSON.parse(response);
      } else if (isXml(type)) {
        r = parse(response, "text/xml");
      } else if (type == "xhtml") {
        r = parse(response, "application/xhtml+xml");
      } else if (type == "html" || type == "htm") {
        r = parse(response, "text/html");
      } else {
        r = response;
      }

      return r;
    }
    /**
     * Get a Blob from Storage by Url
     * @param  {string} url
     * @param  {string} [mimeType]
     * @return {Blob}
     */

  }, {
    key: "getBlob",
    value: function getBlob(url, mimeType) {
      var encodedUrl = window.encodeURIComponent(url);
      return this.storage.getItem(encodedUrl).then(function (uint8array) {
        if (!uint8array) return;
        mimeType = mimeType || mime.lookup(url);
        return new Blob([uint8array], {
          type: mimeType
        });
      });
    }
    /**
     * Get Text from Storage by Url
     * @param  {string} url
     * @param  {string} [mimeType]
     * @return {string}
     */

  }, {
    key: "getText",
    value: function getText(url, mimeType) {
      var encodedUrl = window.encodeURIComponent(url);
      mimeType = mimeType || mime.lookup(url);
      return this.storage.getItem(encodedUrl).then(function (uint8array) {
        var deferred = new defer();
        var reader = new FileReader();
        var blob;
        if (!uint8array) return;
        blob = new Blob([uint8array], {
          type: mimeType
        });
        reader.addEventListener("loadend", function () {
          deferred.resolve(reader.result);
        });
        reader.readAsText(blob, mimeType);
        return deferred.promise;
      });
    }
    /**
     * Get a base64 encoded result from Storage by Url
     * @param  {string} url
     * @param  {string} [mimeType]
     * @return {string} base64 encoded
     */

  }, {
    key: "getBase64",
    value: function getBase64(url, mimeType) {
      var encodedUrl = window.encodeURIComponent(url);
      mimeType = mimeType || mime.lookup(url);
      return this.storage.getItem(encodedUrl).then(function (uint8array) {
        var deferred = new defer();
        var reader = new FileReader();
        var blob;
        if (!uint8array) return;
        blob = new Blob([uint8array], {
          type: mimeType
        });
        reader.addEventListener("loadend", function () {
          deferred.resolve(reader.result);
        });
        reader.readAsDataURL(blob, mimeType);
        return deferred.promise;
      });
    }
    /**
     * Create a Url from a stored item
     * @param  {string} url
     * @param  {object} [options.base64] use base64 encoding or blob url
     * @return {Promise} url promise with Url string
     */

  }, {
    key: "createUrl",
    value: function createUrl(url, options) {
      var deferred = new defer();

      var _URL = window.URL || window.webkitURL || window.mozURL;

      var tempUrl;
      var response;
      var useBase64 = options && options.base64;

      if (url in this.urlCache) {
        deferred.resolve(this.urlCache[url]);
        return deferred.promise;
      }

      if (useBase64) {
        response = this.getBase64(url);

        if (response) {
          response.then(function (tempUrl) {
            this.urlCache[url] = tempUrl;
            deferred.resolve(tempUrl);
          }.bind(this));
        }
      } else {
        response = this.getBlob(url);

        if (response) {
          response.then(function (blob) {
            tempUrl = _URL.createObjectURL(blob);
            this.urlCache[url] = tempUrl;
            deferred.resolve(tempUrl);
          }.bind(this));
        }
      }

      if (!response) {
        deferred.reject({
          message: "File not found in storage: " + url,
          stack: new Error().stack
        });
      }

      return deferred.promise;
    }
    /**
     * Revoke Temp Url for a achive item
     * @param  {string} url url of the item in the store
     */

  }, {
    key: "revokeUrl",
    value: function revokeUrl(url) {
      var _URL = window.URL || window.webkitURL || window.mozURL;

      var fromCache = this.urlCache[url];
      if (fromCache) _URL.revokeObjectURL(fromCache);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _URL = window.URL || window.webkitURL || window.mozURL;

      for (var fromCache in this.urlCache) {
        _URL.revokeObjectURL(fromCache);
      }

      this.urlCache = {};
      this.removeListeners();
    }
  }]);

  return Store;
}();

event_emitter_default()(Store.prototype);
/* harmony default export */ const src_store = (Store);
;// CONCATENATED MODULE: ./src/displayoptions.js



function displayoptions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function displayoptions_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function displayoptions_createClass(Constructor, protoProps, staticProps) { if (protoProps) displayoptions_defineProperties(Constructor.prototype, protoProps); if (staticProps) displayoptions_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Open DisplayOptions Format Parser
 * @class
 * @param {document} displayOptionsDocument XML
 */

var DisplayOptions = /*#__PURE__*/function () {
  function DisplayOptions(displayOptionsDocument) {
    displayoptions_classCallCheck(this, DisplayOptions);

    this.interactive = "";
    this.fixedLayout = "";
    this.openToSpread = "";
    this.orientationLock = "";

    if (displayOptionsDocument) {
      this.parse(displayOptionsDocument);
    }
  }
  /**
   * Parse XML
   * @param  {document} displayOptionsDocument XML
   * @return {DisplayOptions} self
   */


  displayoptions_createClass(DisplayOptions, [{
    key: "parse",
    value: function parse(displayOptionsDocument) {
      var _this = this;

      if (!displayOptionsDocument) {
        return this;
      }

      var displayOptionsNode = qs(displayOptionsDocument, "display_options");

      if (!displayOptionsNode) {
        return this;
      }

      var options = qsa(displayOptionsNode, "option");
      options.forEach(function (el) {
        var value = "";

        if (el.childNodes.length) {
          value = el.childNodes[0].nodeValue;
        }

        switch (el.attributes.name.value) {
          case "interactive":
            _this.interactive = value;
            break;

          case "fixed-layout":
            _this.fixedLayout = value;
            break;

          case "open-to-spread":
            _this.openToSpread = value;
            break;

          case "orientation-lock":
            _this.orientationLock = value;
            break;
        }
      });
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.interactive = undefined;
      this.fixedLayout = undefined;
      this.openToSpread = undefined;
      this.orientationLock = undefined;
    }
  }]);

  return DisplayOptions;
}();

/* harmony default export */ const displayoptions = (DisplayOptions);
;// CONCATENATED MODULE: ./src/book.js











function book_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function book_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function book_createClass(Constructor, protoProps, staticProps) { if (protoProps) book_defineProperties(Constructor.prototype, protoProps); if (staticProps) book_defineProperties(Constructor, staticProps); return Constructor; }



















var CONTAINER_PATH = "META-INF/container.xml";
var IBOOKS_DISPLAY_OPTIONS_PATH = "META-INF/com.apple.ibooks.display-options.xml";
var INPUT_TYPE = {
  BINARY: "binary",
  BASE64: "base64",
  EPUB: "epub",
  OPF: "opf",
  MANIFEST: "json",
  DIRECTORY: "directory"
};
/**
 * An Epub representation with methods for the loading, parsing and manipulation
 * of its contents.
 * @class
 * @param {string} [url]
 * @param {object} [options]
 * @param {method} [options.requestMethod] a request function to use instead of the default
 * @param {boolean} [options.requestCredentials=undefined] send the xhr request withCredentials
 * @param {object} [options.requestHeaders=undefined] send the xhr request headers
 * @param {string} [options.encoding=binary] optional to pass 'binary' or base64' for archived Epubs
 * @param {string} [options.replacements=none] use base64, blobUrl, or none for replacing assets in archived Epubs
 * @param {method} [options.canonical] optional function to determine canonical urls for a path
 * @param {string} [options.openAs] optional string to determine the input type
 * @param {string} [options.store=false] cache the contents in local storage, value should be the name of the reader
 * @returns {Book}
 * @example new Book("/path/to/book.epub", {})
 * @example new Book({ replacements: "blobUrl" })
 */

var Book = /*#__PURE__*/function () {
  function Book(url, options) {
    var _this = this;

    book_classCallCheck(this, Book);

    // Allow passing just options to the Book
    if (typeof options === "undefined" && typeof url !== "string" && url instanceof Blob === false && url instanceof ArrayBuffer === false) {
      options = url;
      url = undefined;
    }

    this.settings = extend(this.settings || {}, {
      requestMethod: undefined,
      requestCredentials: undefined,
      requestHeaders: undefined,
      encoding: undefined,
      replacements: undefined,
      canonical: undefined,
      openAs: undefined,
      store: undefined
    });
    extend(this.settings, options); // Promises

    this.opening = new defer();
    /**
     * @member {promise} opened returns after the book is loaded
     * @memberof Book
     */

    this.opened = this.opening.promise;
    this.isOpen = false;
    this.loading = {
      manifest: new defer(),
      spine: new defer(),
      metadata: new defer(),
      cover: new defer(),
      navigation: new defer(),
      pageList: new defer(),
      resources: new defer(),
      displayOptions: new defer()
    };
    this.loaded = {
      manifest: this.loading.manifest.promise,
      spine: this.loading.spine.promise,
      metadata: this.loading.metadata.promise,
      cover: this.loading.cover.promise,
      navigation: this.loading.navigation.promise,
      pageList: this.loading.pageList.promise,
      resources: this.loading.resources.promise,
      displayOptions: this.loading.displayOptions.promise
    };
    /**
     * @member {promise} ready returns after the book is loaded and parsed
     * @memberof Book
     * @private
     */

    this.ready = Promise.all([this.loaded.manifest, this.loaded.spine, this.loaded.metadata, this.loaded.cover, this.loaded.navigation, this.loaded.resources, this.loaded.displayOptions]); // Queue for methods used before opening

    this.isRendered = false; // this._q = queue(this);

    /**
     * @member {method} request
     * @memberof Book
     * @private
     */

    this.request = this.settings.requestMethod || utils_request;
    /**
     * @member {Spine} spine
     * @memberof Book
     */

    this.spine = new spine();
    /**
     * @member {Locations} locations
     * @memberof Book
     */

    this.locations = new locations(this.spine, this.load.bind(this));
    /**
     * @member {Navigation} navigation
     * @memberof Book
     */

    this.navigation = undefined;
    /**
     * @member {PageList} pagelist
     * @memberof Book
     */

    this.pageList = undefined;
    /**
     * @member {Url} url
     * @memberof Book
     * @private
     */

    this.url = undefined;
    /**
     * @member {Path} path
     * @memberof Book
     * @private
     */

    this.path = undefined;
    /**
     * @member {boolean} archived
     * @memberof Book
     * @private
     */

    this.archived = false;
    /**
     * @member {Archive} archive
     * @memberof Book
     * @private
     */

    this.archive = undefined;
    /**
     * @member {Store} storage
     * @memberof Book
     * @private
     */

    this.storage = undefined;
    /**
     * @member {Resources} resources
     * @memberof Book
     * @private
     */

    this.resources = undefined;
    /**
     * @member {Rendition} rendition
     * @memberof Book
     * @private
     */

    this.rendition = undefined;
    /**
     * @member {Container} container
     * @memberof Book
     * @private
     */

    this.container = undefined;
    /**
     * @member {Packaging} packaging
     * @memberof Book
     * @private
     */

    this.packaging = undefined;
    /**
     * @member {DisplayOptions} displayOptions
     * @memberof DisplayOptions
     * @private
     */

    this.displayOptions = undefined; // this.toc = undefined;

    if (this.settings.store) {
      this.store(this.settings.store);
    }

    if (url) {
      this.open(url, this.settings.openAs).catch(function (error) {
        var err = new Error("Cannot load book at " + url);

        _this.emit(EVENTS.BOOK.OPEN_FAILED, err);
      });
    }
  }
  /**
   * Open a epub or url
   * @param {string | ArrayBuffer} input Url, Path or ArrayBuffer
   * @param {string} [what="binary", "base64", "epub", "opf", "json", "directory"] force opening as a certain type
   * @returns {Promise} of when the book has been loaded
   * @example book.open("/path/to/book.epub")
   */


  book_createClass(Book, [{
    key: "open",
    value: function open(input, what) {
      var opening;
      var type = what || this.determineType(input);

      if (type === INPUT_TYPE.BINARY) {
        this.archived = true;
        this.url = new utils_url("/", "");
        opening = this.openEpub(input);
      } else if (type === INPUT_TYPE.BASE64) {
        this.archived = true;
        this.url = new utils_url("/", "");
        opening = this.openEpub(input, type);
      } else if (type === INPUT_TYPE.EPUB) {
        this.archived = true;
        this.url = new utils_url("/", "");
        opening = this.request(input, "binary", this.settings.requestCredentials, this.settings.requestHeaders).then(this.openEpub.bind(this));
      } else if (type == INPUT_TYPE.OPF) {
        this.url = new utils_url(input);
        opening = this.openPackaging(this.url.Path.toString());
      } else if (type == INPUT_TYPE.MANIFEST) {
        this.url = new utils_url(input);
        opening = this.openManifest(this.url.Path.toString());
      } else {
        this.url = new utils_url(input);
        opening = this.openContainer(CONTAINER_PATH).then(this.openPackaging.bind(this));
      }

      return opening;
    }
    /**
     * Open an archived epub
     * @private
     * @param  {binary} data
     * @param  {string} [encoding]
     * @return {Promise}
     */

  }, {
    key: "openEpub",
    value: function openEpub(data, encoding) {
      var _this2 = this;

      return this.unarchive(data, encoding || this.settings.encoding).then(function () {
        return _this2.openContainer(CONTAINER_PATH);
      }).then(function (packagePath) {
        return _this2.openPackaging(packagePath);
      });
    }
    /**
     * Open the epub container
     * @private
     * @param  {string} url
     * @return {string} packagePath
     */

  }, {
    key: "openContainer",
    value: function openContainer(url) {
      var _this3 = this;

      return this.load(url).then(function (xml) {
        _this3.container = new container(xml);
        return _this3.resolve(_this3.container.packagePath);
      });
    }
    /**
     * Open the Open Packaging Format Xml
     * @private
     * @param  {string} url
     * @return {Promise}
     */

  }, {
    key: "openPackaging",
    value: function openPackaging(url) {
      var _this4 = this;

      this.path = new utils_path(url);
      return this.load(url).then(function (xml) {
        _this4.packaging = new packaging(xml);
        return _this4.unpack(_this4.packaging);
      });
    }
    /**
     * Open the manifest JSON
     * @private
     * @param  {string} url
     * @return {Promise}
     */

  }, {
    key: "openManifest",
    value: function openManifest(url) {
      var _this5 = this;

      this.path = new utils_path(url);
      return this.load(url).then(function (json) {
        _this5.packaging = new packaging();

        _this5.packaging.load(json);

        return _this5.unpack(_this5.packaging);
      });
    }
    /**
     * Load a resource from the Book
     * @param  {string} path path to the resource to load
     * @return {Promise}     returns a promise with the requested resource
     */

  }, {
    key: "load",
    value: function load(path) {
      var resolved = this.resolve(path);

      if (this.archived) {
        return this.archive.request(resolved);
      } else {
        return this.request(resolved, null, this.settings.requestCredentials, this.settings.requestHeaders);
      }
    }
    /**
     * Resolve a path to it's absolute position in the Book
     * @param  {string} path
     * @param  {boolean} [absolute] force resolving the full URL
     * @return {string}          the resolved path string
     */

  }, {
    key: "resolve",
    value: function resolve(path, absolute) {
      if (!path) {
        return;
      }

      var resolved = path;
      var isAbsolute = path.indexOf("://") > -1;

      if (isAbsolute) {
        return path;
      }

      if (this.path) {
        resolved = this.path.resolve(path);
      }

      if (absolute != false && this.url) {
        resolved = this.url.resolve(resolved);
      }

      return resolved;
    }
    /**
     * Get a canonical link to a path
     * @param  {string} path
     * @return {string} the canonical path string
     */

  }, {
    key: "canonical",
    value: function canonical(path) {
      var url = path;

      if (!path) {
        return "";
      }

      if (this.settings.canonical) {
        url = this.settings.canonical(path);
      } else {
        url = this.resolve(path, true);
      }

      return url;
    }
    /**
     * Determine the type of they input passed to open
     * @private
     * @param  {string} input
     * @return {string}  binary | directory | epub | opf
     */

  }, {
    key: "determineType",
    value: function determineType(input) {
      var url;
      var path;
      var extension;

      if (this.settings.encoding === "base64") {
        return INPUT_TYPE.BASE64;
      }

      if (typeof input != "string") {
        return INPUT_TYPE.BINARY;
      }

      url = new utils_url(input);
      path = url.path();
      extension = path.extension; // If there's a search string, remove it before determining type

      if (extension) {
        extension = extension.replace(/\?.*$/, "");
      }

      if (!extension) {
        return INPUT_TYPE.DIRECTORY;
      }

      if (extension === "epub") {
        return INPUT_TYPE.EPUB;
      }

      if (extension === "opf") {
        return INPUT_TYPE.OPF;
      }

      if (extension === "json") {
        return INPUT_TYPE.MANIFEST;
      }
    }
    /**
     * unpack the contents of the Books packaging
     * @private
     * @param {Packaging} packaging object
     */

  }, {
    key: "unpack",
    value: function unpack(packaging) {
      var _this6 = this;

      this.package = packaging; //TODO: deprecated this

      if (this.packaging.metadata.layout === "") {
        // rendition:layout not set - check display options if book is pre-paginated
        this.load(this.url.resolve(IBOOKS_DISPLAY_OPTIONS_PATH)).then(function (xml) {
          _this6.displayOptions = new displayoptions(xml);

          _this6.loading.displayOptions.resolve(_this6.displayOptions);
        }).catch(function (err) {
          _this6.displayOptions = new displayoptions();

          _this6.loading.displayOptions.resolve(_this6.displayOptions);
        });
      } else {
        this.displayOptions = new displayoptions();
        this.loading.displayOptions.resolve(this.displayOptions);
      }

      this.spine.unpack(this.packaging, this.resolve.bind(this), this.canonical.bind(this));
      this.resources = new resources(this.packaging.manifest, {
        archive: this.archive,
        resolver: this.resolve.bind(this),
        request: this.request.bind(this),
        replacements: this.settings.replacements || (this.archived ? "blobUrl" : "base64")
      });
      this.loadNavigation(this.packaging).then(function () {
        // this.toc = this.navigation.toc;
        _this6.loading.navigation.resolve(_this6.navigation);
      });

      if (this.packaging.coverPath) {
        this.cover = this.resolve(this.packaging.coverPath);
      } // Resolve promises


      this.loading.manifest.resolve(this.packaging.manifest);
      this.loading.metadata.resolve(this.packaging.metadata);
      this.loading.spine.resolve(this.spine);
      this.loading.cover.resolve(this.cover);
      this.loading.resources.resolve(this.resources);
      this.loading.pageList.resolve(this.pageList);
      this.isOpen = true;

      if (this.archived || this.settings.replacements && this.settings.replacements != "none") {
        this.replacements().then(function () {
          _this6.loaded.displayOptions.then(function () {
            _this6.opening.resolve(_this6);
          });
        }).catch(function (err) {
          console.error(err);
        });
      } else {
        // Resolve book opened promise
        this.loaded.displayOptions.then(function () {
          _this6.opening.resolve(_this6);
        });
      }
    }
    /**
     * Load Navigation and PageList from package
     * @private
     * @param {Packaging} packaging
     */

  }, {
    key: "loadNavigation",
    value: function loadNavigation(packaging) {
      var _this7 = this;

      var navPath = packaging.navPath || packaging.ncxPath;
      var toc = packaging.toc; // From json manifest

      if (toc) {
        return new Promise(function (resolve, reject) {
          _this7.navigation = new navigation(toc);

          if (packaging.pageList) {
            _this7.pageList = new pagelist(packaging.pageList); // TODO: handle page lists from Manifest
          }

          resolve(_this7.navigation);
        });
      }

      if (!navPath) {
        return new Promise(function (resolve, reject) {
          _this7.navigation = new navigation();
          _this7.pageList = new pagelist();
          resolve(_this7.navigation);
        });
      }

      return this.load(navPath, "xml").then(function (xml) {
        _this7.navigation = new navigation(xml);
        _this7.pageList = new pagelist(xml);
        return _this7.navigation;
      });
    }
    /**
     * Gets a Section of the Book from the Spine
     * Alias for `book.spine.get`
     * @param {string} target
     * @return {Section}
     */

  }, {
    key: "section",
    value: function section(target) {
      return this.spine.get(target);
    }
    /**
     * Sugar to render a book to an element
     * @param  {element | string} element element or string to add a rendition to
     * @param  {object} [options]
     * @return {Rendition}
     */

  }, {
    key: "renderTo",
    value: function renderTo(element, options) {
      this.rendition = new rendition(this, options);
      this.rendition.attachTo(element);
      return this.rendition;
    }
    /**
     * Set if request should use withCredentials
     * @param {boolean} credentials
     */

  }, {
    key: "setRequestCredentials",
    value: function setRequestCredentials(credentials) {
      this.settings.requestCredentials = credentials;
    }
    /**
     * Set headers request should use
     * @param {object} headers
     */

  }, {
    key: "setRequestHeaders",
    value: function setRequestHeaders(headers) {
      this.settings.requestHeaders = headers;
    }
    /**
     * Unarchive a zipped epub
     * @private
     * @param  {binary} input epub data
     * @param  {string} [encoding]
     * @return {Archive}
     */

  }, {
    key: "unarchive",
    value: function unarchive(input, encoding) {
      this.archive = new archive();
      return this.archive.open(input, encoding);
    }
    /**
     * Store the epubs contents
     * @private
     * @param  {binary} input epub data
     * @param  {string} [encoding]
     * @return {Store}
     */

  }, {
    key: "store",
    value: function store(name) {
      var _this8 = this;

      // Use "blobUrl" or "base64" for replacements
      var replacementsSetting = this.settings.replacements && this.settings.replacements !== "none"; // Save original url

      var originalUrl = this.url; // Save original request method

      var requester = this.settings.requestMethod || utils_request.bind(this); // Create new Store

      this.storage = new src_store(name, requester, this.resolve.bind(this)); // Replace request method to go through store

      this.request = this.storage.request.bind(this.storage);
      this.opened.then(function () {
        if (_this8.archived) {
          _this8.storage.requester = _this8.archive.request.bind(_this8.archive);
        } // Substitute hook


        var substituteResources = function substituteResources(output, section) {
          section.output = _this8.resources.substitute(output, section.url);
        }; // Set to use replacements


        _this8.resources.settings.replacements = replacementsSetting || "blobUrl"; // Create replacement urls

        _this8.resources.replacements().then(function () {
          return _this8.resources.replaceCss();
        });

        _this8.storage.on("offline", function () {
          // Remove url to use relative resolving for hrefs
          _this8.url = new utils_url("/", ""); // Add hook to replace resources in contents

          _this8.spine.hooks.serialize.register(substituteResources);
        });

        _this8.storage.on("online", function () {
          // Restore original url
          _this8.url = originalUrl; // Remove hook

          _this8.spine.hooks.serialize.deregister(substituteResources);
        });
      });
      return this.storage;
    }
    /**
     * Get the cover url
     * @return {Promise<?string>} coverUrl
     */

  }, {
    key: "coverUrl",
    value: function coverUrl() {
      var _this9 = this;

      return this.loaded.cover.then(function () {
        if (!_this9.cover) {
          return null;
        }

        if (_this9.archived) {
          return _this9.archive.createUrl(_this9.cover);
        } else {
          return _this9.cover;
        }
      });
    }
    /**
     * Load replacement urls
     * @private
     * @return {Promise} completed loading urls
     */

  }, {
    key: "replacements",
    value: function replacements() {
      var _this10 = this;

      this.spine.hooks.serialize.register(function (output, section) {
        section.output = _this10.resources.substitute(output, section.url);
      });
      return this.resources.replacements().then(function () {
        return _this10.resources.replaceCss();
      });
    }
    /**
     * Find a DOM Range for a given CFI Range
     * @param  {EpubCFI} cfiRange a epub cfi range
     * @return {Promise}
     */

  }, {
    key: "getRange",
    value: function getRange(cfiRange) {
      var cfi = new epubcfi(cfiRange);
      var item = this.spine.get(cfi.spinePos);

      var _request = this.load.bind(this);

      if (!item) {
        return new Promise(function (resolve, reject) {
          reject("CFI could not be found");
        });
      }

      return item.load(_request).then(function (contents) {
        var range = cfi.toRange(item.document);
        return range;
      });
    }
    /**
     * Generates the Book Key using the identifer in the manifest or other string provided
     * @param  {string} [identifier] to use instead of metadata identifier
     * @return {string} key
     */

  }, {
    key: "key",
    value: function key(identifier) {
      var ident = identifier || this.packaging.metadata.identifier || this.url.filename;
      return "epubjs:".concat(EPUBJS_VERSION, ":").concat(ident);
    }
    /**
     * Destroy the Book and all associated objects
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.opened = undefined;
      this.loading = undefined;
      this.loaded = undefined;
      this.ready = undefined;
      this.isOpen = false;
      this.isRendered = false;
      this.spine && this.spine.destroy();
      this.locations && this.locations.destroy();
      this.pageList && this.pageList.destroy();
      this.archive && this.archive.destroy();
      this.resources && this.resources.destroy();
      this.container && this.container.destroy();
      this.packaging && this.packaging.destroy();
      this.rendition && this.rendition.destroy();
      this.displayOptions && this.displayOptions.destroy();
      this.spine = undefined;
      this.locations = undefined;
      this.pageList = undefined;
      this.archive = undefined;
      this.resources = undefined;
      this.container = undefined;
      this.packaging = undefined;
      this.rendition = undefined;
      this.navigation = undefined;
      this.url = undefined;
      this.path = undefined;
      this.archived = false;
    }
  }]);

  return Book;
}(); //-- Enable binding events to book


event_emitter_default()(Book.prototype);
/* harmony default export */ const book = (Book);
;// CONCATENATED MODULE: ./src/epub.js









/**
 * Creates a new Book
 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
 * @param {object} options to pass to the book
 * @returns {Book} a new Book object
 * @example ePub("/path/to/book.epub", {})
 */

function ePub(url, options) {
  return new book(url, options);
}

ePub.VERSION = EPUBJS_VERSION;

if (typeof __webpack_require__.g !== "undefined") {
  __webpack_require__.g.EPUBJS_VERSION = EPUBJS_VERSION;
}

ePub.Book = book;
ePub.Rendition = rendition;
ePub.Contents = contents;
ePub.CFI = epubcfi;
ePub.utils = core_namespaceObject;
/* harmony default export */ const epub = (ePub);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=epub.js.map