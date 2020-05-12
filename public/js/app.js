/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/cash-dom/dist/cash.js":
/*!********************************************!*\
  !*** ./node_modules/cash-dom/dist/cash.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT https://github.com/kenwheeler/cash */
(function(){
"use strict";

var propMap = {
  /* GENERAL */
  "class": 'className',
  contenteditable: 'contentEditable',

  /* LABEL */
  "for": 'htmlFor',

  /* INPUT */
  readonly: 'readOnly',
  maxlength: 'maxLength',
  tabindex: 'tabIndex',

  /* TABLE */
  colspan: 'colSpan',
  rowspan: 'rowSpan',

  /* IMAGE */
  usemap: 'useMap'
};

function attempt(fn, arg) {
  try {
    return fn(arg);
  } catch (_a) {
    return arg;
  }
}

var doc = document,
    win = window,
    docEle = doc.documentElement,
    createElement = doc.createElement.bind(doc),
    div = createElement('div'),
    table = createElement('table'),
    tbody = createElement('tbody'),
    tr = createElement('tr'),
    isArray = Array.isArray,
    ArrayPrototype = Array.prototype,
    concat = ArrayPrototype.concat,
    filter = ArrayPrototype.filter,
    indexOf = ArrayPrototype.indexOf,
    map = ArrayPrototype.map,
    push = ArrayPrototype.push,
    slice = ArrayPrototype.slice,
    some = ArrayPrototype.some,
    splice = ArrayPrototype.splice;
var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.ts

function find(selector, context) {
  return !selector || !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.ts
// @require ./variables.ts


var Cash =
/** @class */
function () {
  function Cash(selector, context) {
    if (!selector) return;
    if (isCash(selector)) return selector;
    var eles = selector;

    if (isString(selector)) {
      var ctx = (isCash(context) ? context[0] : context) || doc;
      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
      if (!eles) return;
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (eles.nodeType || eles === win) eles = [eles];
    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  Cash.prototype.init = function (selector, context) {
    return new Cash(selector, context);
  };

  return Cash;
}();

var fn = Cash.prototype,
    cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if (typeof Symbol === 'function') {
  // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}

fn.map = function (callback) {
  return cash(concat.apply([], map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  })));
};

fn.slice = function (start, end) {
  return cash(slice.call(this, start, end));
}; // @require ./cash.ts


var dashAlphaRe = /-([a-z])/g;

function camelCase(str) {
  return str.replace(dashAlphaRe, function (match, letter) {
    return letter.toUpperCase();
  });
}

function each(arr, callback, _reverse) {
  if (_reverse) {
    var i = arr.length;

    while (i--) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  } else {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  }

  return arr;
}

cash.each = each;

fn.each = function (callback) {
  return each(this, callback);
};

fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[propMap[prop] || prop];
  });
};

function extend(target) {
  var objs = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    objs[_i - 1] = arguments[_i];
  }

  var length = arguments.length;
  if (!length) return {};
  if (length === 1) return extend(cash, target);

  for (var i = 1; i < length; i++) {
    for (var key in arguments[i]) {
      target[key] = arguments[i][key];
    }
  }

  return target;
}

cash.extend = extend;

fn.extend = function (plugins) {
  return extend(fn, plugins);
};

cash.guid = 1; // @require ./cash.ts

function matches(ele, selector) {
  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
  return !!matches && !!selector && matches.call(ele, selector);
}

function isCash(x) {
  return x instanceof Cash;
}

function isWindow(x) {
  return !!x && x === x.window;
}

function isDocument(x) {
  return !!x && x.nodeType === 9;
}

function isElement(x) {
  return !!x && x.nodeType === 1;
}

function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}

function isUndefined(x) {
  return x === undefined;
}

function isNull(x) {
  return x === null;
}

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isNumeric = isNumeric;
cash.isArray = isArray;

fn.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    prop = propMap[prop] || prop;
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
};

fn.get = function (index) {
  if (isUndefined(index)) return slice.call(this);
  index = Number(index);
  return this[index < 0 ? index + this.length : index];
};

fn.eq = function (index) {
  return cash(this.get(index));
};

fn.first = function () {
  return this.eq(0);
};

fn.last = function () {
  return this.eq(-1);
}; // @require ./matches.ts
// @require ./type_checking.ts


function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : !comparator ? function () {
    return false;
  } : function (i, ele) {
    return ele === comparator;
  };
}

fn.filter = function (comparator) {
  var compare = getCompareFunction(comparator);
  return cash(filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
}; // @require collection/filter.ts


function filtered(collection, comparator) {
  return !comparator ? collection : collection.filter(comparator);
} // @require ./type_checking.ts


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
}

fn.hasClass = function (cls) {
  return !!cls && some.call(this, function (ele) {
    return isElement(ele) && ele.classList.contains(cls);
  });
};

fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(attrs, function (i, a) {
      ele.removeAttribute(a);
    });
  });
};

function attr(attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0] || !isElement(this[0])) return;
      var value_1 = this[0].getAttribute(attr);
      return isNull(value_1) ? undefined : value_1;
    }

    if (isUndefined(value)) return this;
    if (isNull(value)) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}

fn.attr = attr;

fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = !isUndefined(force);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(classes, function (i, c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

fn.removeClass = function (cls) {
  if (arguments.length) return this.toggleClass(cls, false);
  return this.attr('class', '');
};

function pluck(arr, prop, deep, until) {
  var plucked = [],
      isCallback = isFunction(prop),
      compare = until && getCompareFunction(until);

  for (var i = 0, l = arr.length; i < l; i++) {
    if (isCallback) {
      var val_1 = prop(arr[i]);
      if (val_1.length) push.apply(plucked, val_1);
    } else {
      var val_2 = arr[i][prop];

      while (val_2 != null) {
        if (until && compare(-1, val_2)) break;
        plucked.push(val_2);
        val_2 = deep ? val_2[prop] : null;
      }
    }
  }

  return plucked;
}

function unique(arr) {
  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
    return indexOf.call(self, item) === index;
  }) : arr;
}

cash.unique = unique;

fn.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/type_checking.ts
// @require core/variables.ts


function computeStyle(ele, prop, isVariable) {
  if (!isElement(ele)) return;
  var style = win.getComputedStyle(ele, null);
  return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
} // @require ./compute_style.ts


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.ts

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts


var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC[0].toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

; // @require core/type_checking.ts
// @require ./is_css_variable.ts

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
}

function css(prop, value) {
  if (isString(prop)) {
    var isVariable_1 = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable_1);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable_1);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;

      if (isVariable_1) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

;
fn.css = css; // @optional ./css.ts
// @require core/attempt.ts
// @require core/camel_case.ts

var JSONStringRe = /^\s+|\s+$/;

function getData(ele, key) {
  var value = ele.dataset[key] || ele.dataset[camelCase(key)];
  if (JSONStringRe.test(value)) return value;
  return attempt(JSON.parse, value);
} // @require core/attempt.ts
// @require core/camel_case.ts


function setData(ele, key, value) {
  value = attempt(JSON.stringify, value);
  ele.dataset[camelCase(key)] = value;
}

function data(name, value) {
  if (!name) {
    if (!this[0]) return;
    var datas = {};

    for (var key in this[0].dataset) {
      datas[key] = getData(this[0], key);
    }

    return datas;
  }

  if (isString(name)) {
    if (arguments.length < 2) return this[0] && getData(this[0], name);
    if (isUndefined(value)) return this;
    return this.each(function (i, ele) {
      setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}

fn.data = data; // @optional ./data.ts

function getDocumentDimension(doc, dimension) {
  var docEle = doc.documentElement;
  return Math.max(doc.body["scroll" + dimension], docEle["scroll" + dimension], doc.body["offset" + dimension], docEle["offset" + dimension], docEle["client" + dimension]);
} // @require css/helpers/compute_style_int.ts


function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

each([true, false], function (i, outer) {
  each(['Width', 'Height'], function (i, prop) {
    var name = "" + (outer ? 'outer' : 'inner') + prop;

    fn[name] = function (includeMargins) {
      if (!this[0]) return;
      if (isWindow(this[0])) return outer ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0]["" + (outer ? 'offset' : 'client') + prop] + (includeMargins && outer ? computeStyleInt(this[0], "margin" + (i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin" + (i ? 'Bottom' : 'Right')) : 0);
    };
  });
});
each(['Width', 'Height'], function (index, prop) {
  var propLC = prop.toLowerCase();

  fn[propLC] = function (value) {
    if (!this[0]) return isUndefined(value) ? undefined : this;

    if (!arguments.length) {
      if (isWindow(this[0])) return this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
    }

    var valueNumber = parseInt(value, 10);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
}); // @optional ./inner_outer.ts
// @optional ./normal.ts
// @require css/helpers/compute_style.ts

var defaultDisplay = {};

function getDefaultDisplay(tagName) {
  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
  var ele = createElement(tagName);
  doc.body.insertBefore(ele, null);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
} // @require css/helpers/compute_style.ts


function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

var displayProperty = '___cd';

fn.toggle = function (force) {
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    var show = isUndefined(force) ? isHidden(ele) : force;

    if (show) {
      ele.style.display = ele[displayProperty] || '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele[displayProperty] = computeStyle(ele, 'display');
      ele.style.display = 'none';
    }
  });
};

fn.hide = function () {
  return this.toggle(false);
};

fn.show = function () {
  return this.toggle(true);
}; // @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces(ns1, ns2) {
  return !ns2 || !some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var eventsNamespace = '___ce',
    eventsNamespacesSeparator = '.',
    eventsFocus = {
  focus: 'focusin',
  blur: 'focusout'
},
    eventsHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
},
    eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

function getEventNameBubbling(name) {
  return eventsHover[name] || eventsFocus[name] || name;
} // @require ./variables.ts


function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.ts
// @require events/helpers/get_events_cache.ts


function addEvent(ele, name, namespaces, selector, callback) {
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.ts


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
} // @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts


function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_a) {
      var ns = _a[0],
          sel = _a[1],
          cb = _a[2];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
      ele.removeEventListener(name, cb);
    });
  }
}

fn.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (isUndefined(eventFullName)) {
    this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
      removeEvent(ele);
    });
  } else if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.off(key, eventFullName[key]);
    }
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _a = parseEventName(eventFullName),
          nameOriginal = _a[0],
          namespaces = _a[1],
          name = getEventNameBubbling(nameOriginal),
          isEventBubblingProxy = nameOriginal !== name;

      _this.each(function (i, ele) {
        if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
        removeEvent(ele, name, namespaces, selector, callback);
        if (isEventBubblingProxy) removeEvent(ele, nameOriginal, namespaces, selector, callback);
      });
    });
  }

  return this;
};

function on(eventFullName, selector, data, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, data, eventFullName[key], _one);
    }

    return this;
  }

  if (!isString(selector)) {
    if (isUndefined(selector) || isNull(selector)) {
      selector = '';
    } else if (isUndefined(data)) {
      data = selector;
      selector = '';
    } else {
      callback = data;
      data = selector;
      selector = '';
    }
  }

  if (!isFunction(callback)) {
    callback = data;
    data = undefined;
  }

  if (!callback) return this;
  each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _a = parseEventName(eventFullName),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name = getEventNameBubbling(nameOriginal),
        isEventBubblingProxy = nameOriginal !== name,
        isEventFocus = nameOriginal in eventsFocus;

    if (!name) return;

    _this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;

      var finalCallback = function finalCallback(event) {
        if (isEventBubblingProxy && (event.___ot ? event.___ot !== nameOriginal : event.type !== nameOriginal || event.target["___i" + nameOriginal] && (delete event.target["___i" + nameOriginal], event.stopImmediatePropagation(), true))) return;
        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
          event.___cd = true; // Delegate
        } else if (isEventFocus && event.___ot === nameOriginal && ele !== event.target && ele.contains(event.target)) {
          return;
        }

        if (event.___cd) {
          Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        Object.defineProperty(event, 'data', {
          configurable: true,
          get: function get() {
            return data;
          }
        });
        var returnValue = callback.call(thisArg, event, event.___td);

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || cash.guid++;
      addEvent(ele, name, namespaces, selector, finalCallback);
      if (isEventBubblingProxy) addEvent(ele, nameOriginal, namespaces, selector, finalCallback);
    });
  });
  return this;
}

fn.on = on;

function one(eventFullName, selector, data, callback) {
  return this.on(eventFullName, selector, data, callback, true);
}

;
fn.one = one;

fn.ready = function (callback) {
  var cb = function cb() {
    return setTimeout(callback, 0, cash);
  };

  if (doc.readyState !== 'loading') {
    cb();
  } else {
    doc.addEventListener('DOMContentLoaded', cb);
  }

  return this;
};

fn.trigger = function (event, data) {
  if (isString(event)) {
    var _a = parseEventName(event),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name_1 = getEventNameBubbling(nameOriginal);

    if (!name_1) return this;
    var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
    event = doc.createEvent(type);
    event.initEvent(name_1, true, true);
    event.namespace = namespaces.join(eventsNamespacesSeparator);
    event.___ot = nameOriginal;
  }

  event.___td = data;
  var isEventFocus = event.___ot in eventsFocus;
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[event.___ot])) {
      ele["___i" + event.___ot] = true; // Ensuring this event gets ignored

      ele[event.___ot]();
    }

    ele.dispatchEvent(event);
  });
}; // @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts


function getValue(ele) {
  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
    return option.selected && !option.disabled && !option.parentNode.disabled;
  }), 'value');
  return ele.value || '';
}

var queryEncodeSpaceRe = /%20/g,
    queryEncodeCRLFRe = /\r?\n/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+');
}

var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

fn.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (i, ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);

      if (!isUndefined(value)) {
        var values = isArray(value) ? value : [value];
        each(values, function (i, value) {
          query += queryEncode(ele.name, value);
        });
      }
    });
  });
  return query.slice(1);
};

function val(value) {
  if (!arguments.length) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    var isSelect = ele.multiple && ele.options;

    if (isSelect || checkableRe.test(ele.type)) {
      var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];

      if (isSelect) {
        each(ele.options, function (i, option) {
          option.selected = eleValue_1.indexOf(option.value) >= 0;
        }, true);
      } else {
        ele.checked = eleValue_1.indexOf(ele.value) >= 0;
      }
    } else {
      ele.value = isUndefined(value) || isNull(value) ? '' : value;
    }
  });
}

fn.val = val;

fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

fn.detach = function (comparator) {
  filtered(this, comparator).each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
  return this;
};

var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
var containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
}; //TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML(html) {
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML;

fn.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

function html(html) {
  if (!arguments.length) return this[0] && this[0].innerHTML;
  if (isUndefined(html)) return this;
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.innerHTML = html;
  });
}

fn.html = html;

fn.remove = function (comparator) {
  filtered(this, comparator).detach().off();
  return this;
};

function text(text) {
  if (isUndefined(text)) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.textContent = text;
  });
}

;
fn.text = text;

fn.unwrap = function () {
  this.parent().each(function (i, ele) {
    if (ele.tagName === 'BODY') return;
    var $ele = cash(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
};

fn.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
};

fn.offsetParent = function () {
  return this.map(function (i, ele) {
    var offsetParent = ele.offsetParent;

    while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docEle;
  });
};

fn.position = function () {
  var ele = this[0];
  if (!ele) return;
  var isFixed = computeStyle(ele, 'position') === 'fixed',
      offset = isFixed ? ele.getBoundingClientRect() : this.offset();

  if (!isFixed) {
    var doc_1 = ele.ownerDocument;
    var offsetParent = ele.offsetParent || doc_1.documentElement;

    while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent !== ele && isElement(offsetParent)) {
      var parentOffset = cash(offsetParent).offset();
      offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
      offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
    }
  }

  return {
    top: offset.top - computeStyleInt(ele, 'marginTop'),
    left: offset.left - computeStyleInt(ele, 'marginLeft')
  };
};

fn.children = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return ele.children;
  }))), comparator);
};

fn.contents = function () {
  return cash(unique(pluck(this, function (ele) {
    return ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes;
  })));
};

fn.find = function (selector) {
  return cash(unique(pluck(this, function (ele) {
    return find(selector, ele);
  })));
}; // @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts


var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
    scriptAttributes = ['type', 'src', 'nonce', 'noModule'];

function evalScripts(node, doc) {
  var collection = cash(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
      // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
      var script_1 = createElement('script');
      script_1.text = ele.textContent.replace(HTMLCDATARe, '');
      each(scriptAttributes, function (i, attr) {
        if (ele[attr]) script_1[attr] = ele[attr];
      });
      doc.head.insertBefore(script_1, null);
      doc.head.removeChild(script_1);
    }
  });
} // @require ./eval_scripts.ts


function insertElement(anchor, target, left, inside, evaluate) {
  if (inside) {
    // prepend/append
    anchor.insertBefore(target, left ? anchor.firstChild : null);
  } else {
    // before/after
    anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
  }

  if (evaluate) {
    evalScripts(target, anchor.ownerDocument);
  }
} // @require ./insert_element.ts


function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
  each(selectors, function (si, selector) {
    each(cash(selector), function (ti, target) {
      each(cash(anchors), function (ai, anchor) {
        var anchorFinal = inverse ? target : anchor,
            targetFinal = inverse ? anchor : target,
            indexFinal = inverse ? ti : ai;
        insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
      }, reverseLoop3);
    }, reverseLoop2);
  }, reverseLoop1);
  return anchors;
}

fn.after = function () {
  return insertSelectors(arguments, this, false, false, false, true, true);
};

fn.append = function () {
  return insertSelectors(arguments, this, false, false, true);
};

fn.appendTo = function (selector) {
  return insertSelectors(arguments, this, true, false, true);
};

fn.before = function () {
  return insertSelectors(arguments, this, false, true);
};

fn.insertAfter = function (selector) {
  return insertSelectors(arguments, this, true, false, false, false, false, true);
};

fn.insertBefore = function (selector) {
  return insertSelectors(arguments, this, true, true);
};

fn.prepend = function () {
  return insertSelectors(arguments, this, false, true, true, true, true);
};

fn.prependTo = function (selector) {
  return insertSelectors(arguments, this, true, true, true, false, false, true);
};

fn.replaceWith = function (selector) {
  return this.before(selector).remove();
};

fn.replaceAll = function (selector) {
  cash(selector).replaceWith(this);
  return this;
};

fn.wrapAll = function (selector) {
  var structure = cash(selector),
      wrapper = structure[0];

  while (wrapper.children.length) {
    wrapper = wrapper.firstElementChild;
  }

  this.first().before(structure);
  return this.appendTo(wrapper);
};

fn.wrap = function (selector) {
  return this.each(function (i, ele) {
    var wrapper = cash(selector)[0];
    cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
  });
};

fn.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = cash(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

fn.is = function (comparator) {
  var compare = getCompareFunction(comparator);
  return some.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  });
};

fn.next = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};

fn.nextAll = function (comparator) {
  return this.next(comparator, true);
};

fn.nextUntil = function (until, comparator) {
  return this.next(comparator, true, until);
};

fn.not = function (comparator) {
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
  });
};

fn.parent = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};

fn.index = function (selector) {
  var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
};

fn.closest = function (comparator) {
  var filtered = this.filter(comparator);
  if (filtered.length) return filtered;
  var $parent = this.parent();
  if (!$parent.length) return filtered;
  return $parent.closest(comparator);
};

fn.parents = function (comparator, _until) {
  return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};

fn.parentsUntil = function (until, comparator) {
  return this.parents(comparator, until);
};

fn.prev = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};

fn.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

fn.prevUntil = function (until, comparator) {
  return this.prev(comparator, true, until);
};

fn.siblings = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return cash(ele).parent().children().not(ele);
  }))), comparator);
}; // @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
// @require ./variables.ts


if (true) {
  // Node.js
  module.exports = cash;
} else {}
})();

/***/ }),

/***/ "./node_modules/clipboard/dist/clipboard.min.js":
/*!******************************************************!*\
  !*** ./node_modules/clipboard/dist/clipboard.min.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){ true?module.exports=e():undefined}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});

/***/ }),

/***/ "./node_modules/dropzone/dist/dropzone.js":
/*!************************************************!*\
  !*** ./node_modules/dropzone/dist/dropzone.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
// The Emitter class provides the ability to call `.on()` on Dropzone to listen
// to events.
// It is strongly based on component's emitter class, and I removed the
// functionality because of the dependency hell with different frameworks.
var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
  }

  _createClass(Emitter, [{
    key: "on",
    // Add an event listener for given event
    value: function on(event, fn) {
      this._callbacks = this._callbacks || {}; // Create namespace for this event

      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }

      this._callbacks[event].push(fn);

      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      this._callbacks = this._callbacks || {};
      var callbacks = this._callbacks[event];

      if (callbacks) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var callback = _step.value;
            callback.apply(this, args);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return this;
    } // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.

  }, {
    key: "off",
    value: function off(event, fn) {
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      } // specific event


      var callbacks = this._callbacks[event];

      if (!callbacks) {
        return this;
      } // remove all handlers


      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      } // remove specific handler


      for (var i = 0; i < callbacks.length; i++) {
        var callback = callbacks[i];

        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }

      return this;
    }
  }]);

  return Emitter;
}();

var Dropzone =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Dropzone, _Emitter);

  _createClass(Dropzone, null, [{
    key: "initClass",
    value: function initClass() {
      // Exposing the emitter class, mainly for tests
      this.prototype.Emitter = Emitter;
      /*
       This is a list of all available events you can register on a dropzone object.
        You can register an event handler like this:
        dropzone.on("dragEnter", function() { });
        */

      this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];
      this.prototype.defaultOptions = {
        /**
         * Has to be specified on elements other than form (or when the form
         * doesn't have an `action` attribute). You can also
         * provide a function that will be called with `files` and
         * must return the url (since `v3.12.0`)
         */
        url: null,

        /**
         * Can be changed to `"put"` if necessary. You can also provide a function
         * that will be called with `files` and must return the method (since `v3.12.0`).
         */
        method: "post",

        /**
         * Will be set on the XHRequest.
         */
        withCredentials: false,

        /**
         * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
         */
        timeout: 30000,

        /**
         * How many file uploads to process in parallel (See the
         * Enqueuing file uploads documentation section for more info)
         */
        parallelUploads: 2,

        /**
         * Whether to send multiple files in one request. If
         * this it set to true, then the fallback file input element will
         * have the `multiple` attribute as well. This option will
         * also trigger additional events (like `processingmultiple`). See the events
         * documentation section for more information.
         */
        uploadMultiple: false,

        /**
         * Whether you want files to be uploaded in chunks to your server. This can't be
         * used in combination with `uploadMultiple`.
         *
         * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
         */
        chunking: false,

        /**
         * If `chunking` is enabled, this defines whether **every** file should be chunked,
         * even if the file size is below chunkSize. This means, that the additional chunk
         * form data will be submitted and the `chunksUploaded` callback will be invoked.
         */
        forceChunking: false,

        /**
         * If `chunking` is `true`, then this defines the chunk size in bytes.
         */
        chunkSize: 2000000,

        /**
         * If `true`, the individual chunks of a file are being uploaded simultaneously.
         */
        parallelChunkUploads: false,

        /**
         * Whether a chunk should be retried if it fails.
         */
        retryChunks: false,

        /**
         * If `retryChunks` is true, how many times should it be retried.
         */
        retryChunksLimit: 3,

        /**
         * If not `null` defines how many files this Dropzone handles. If it exceeds,
         * the event `maxfilesexceeded` will be called. The dropzone element gets the
         * class `dz-max-files-reached` accordingly so you can provide visual feedback.
         */
        maxFilesize: 256,

        /**
         * The name of the file param that gets transferred.
         * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
         * Dropzone will append `[]` to the name.
         */
        paramName: "file",

        /**
         * Whether thumbnails for images should be generated
         */
        createImageThumbnails: true,

        /**
         * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
         */
        maxThumbnailFilesize: 10,

        /**
         * If `null`, the ratio of the image will be used to calculate it.
         */
        thumbnailWidth: 120,

        /**
         * The same as `thumbnailWidth`. If both are null, images will not be resized.
         */
        thumbnailHeight: 120,

        /**
         * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
         * Can be either `contain` or `crop`.
         */
        thumbnailMethod: 'crop',

        /**
         * If set, images will be resized to these dimensions before being **uploaded**.
         * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
         * ratio of the file will be preserved.
         *
         * The `options.transformFile` function uses these options, so if the `transformFile` function
         * is overridden, these options don't do anything.
         */
        resizeWidth: null,

        /**
         * See `resizeWidth`.
         */
        resizeHeight: null,

        /**
         * The mime type of the resized image (before it gets uploaded to the server).
         * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
         * See `resizeWidth` for more information.
         */
        resizeMimeType: null,

        /**
         * The quality of the resized images. See `resizeWidth`.
         */
        resizeQuality: 0.8,

        /**
         * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
         * Can be either `contain` or `crop`.
         */
        resizeMethod: 'contain',

        /**
         * The base that is used to calculate the filesize. You can change this to
         * 1024 if you would rather display kibibytes, mebibytes, etc...
         * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
         * You can change this to `1024` if you don't care about validity.
         */
        filesizeBase: 1000,

        /**
         * Can be used to limit the maximum number of files that will be handled by this Dropzone
         */
        maxFiles: null,

        /**
         * An optional object to send additional headers to the server. Eg:
         * `{ "My-Awesome-Header": "header value" }`
         */
        headers: null,

        /**
         * If `true`, the dropzone element itself will be clickable, if `false`
         * nothing will be clickable.
         *
         * You can also pass an HTML element, a CSS selector (for multiple elements)
         * or an array of those. In that case, all of those elements will trigger an
         * upload when clicked.
         */
        clickable: true,

        /**
         * Whether hidden files in directories should be ignored.
         */
        ignoreHiddenFiles: true,

        /**
         * The default implementation of `accept` checks the file's mime type or
         * extension against this list. This is a comma separated list of mime
         * types or file extensions.
         *
         * Eg.: `image/*,application/pdf,.psd`
         *
         * If the Dropzone is `clickable` this option will also be used as
         * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
         * parameter on the hidden file input as well.
         */
        acceptedFiles: null,

        /**
         * **Deprecated!**
         * Use acceptedFiles instead.
         */
        acceptedMimeTypes: null,

        /**
         * If false, files will be added to the queue but the queue will not be
         * processed automatically.
         * This can be useful if you need some additional user input before sending
         * files (or if you want want all files sent at once).
         * If you're ready to send the file simply call `myDropzone.processQueue()`.
         *
         * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
         * section for more information.
         */
        autoProcessQueue: true,

        /**
         * If false, files added to the dropzone will not be queued by default.
         * You'll have to call `enqueueFile(file)` manually.
         */
        autoQueue: true,

        /**
         * If `true`, this will add a link to every file preview to remove or cancel (if
         * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
         * and `dictRemoveFile` options are used for the wording.
         */
        addRemoveLinks: false,

        /**
         * Defines where to display the file previews – if `null` the
         * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
         * selector. The element should have the `dropzone-previews` class so
         * the previews are displayed properly.
         */
        previewsContainer: null,

        /**
         * This is the element the hidden input field (which is used when clicking on the
         * dropzone to trigger file selection) will be appended to. This might
         * be important in case you use frameworks to switch the content of your page.
         *
         * Can be a selector string, or an element directly.
         */
        hiddenInputContainer: "body",

        /**
         * If null, no capture type will be specified
         * If camera, mobile devices will skip the file selection and choose camera
         * If microphone, mobile devices will skip the file selection and choose the microphone
         * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
         * On apple devices multiple must be set to false.  AcceptedFiles may need to
         * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
         */
        capture: null,

        /**
         * **Deprecated**. Use `renameFile` instead.
         */
        renameFilename: null,

        /**
         * A function that is invoked before the file is uploaded to the server and renames the file.
         * This function gets the `File` as argument and can use the `file.name`. The actual name of the
         * file that gets used during the upload can be accessed through `file.upload.filename`.
         */
        renameFile: null,

        /**
         * If `true` the fallback will be forced. This is very useful to test your server
         * implementations first and make sure that everything works as
         * expected without dropzone if you experience problems, and to test
         * how your fallbacks will look.
         */
        forceFallback: false,

        /**
         * The text used before any files are dropped.
         */
        dictDefaultMessage: "Drop files here to upload",

        /**
         * The text that replaces the default message text it the browser is not supported.
         */
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",

        /**
         * The text that will be added before the fallback form.
         * If you provide a  fallback element yourself, or if this option is `null` this will
         * be ignored.
         */
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",

        /**
         * If the filesize is too big.
         * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
         */
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",

        /**
         * If the file doesn't match the file type.
         */
        dictInvalidFileType: "You can't upload files of this type.",

        /**
         * If the server response was invalid.
         * `{{statusCode}}` will be replaced with the servers status code.
         */
        dictResponseError: "Server responded with {{statusCode}} code.",

        /**
         * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
         */
        dictCancelUpload: "Cancel upload",

        /**
         * The text that is displayed if an upload was manually canceled
         */
        dictUploadCanceled: "Upload canceled.",

        /**
         * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
         */
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",

        /**
         * If `addRemoveLinks` is true, the text to be used to remove a file.
         */
        dictRemoveFile: "Remove file",

        /**
         * If this is not null, then the user will be prompted before removing a file.
         */
        dictRemoveFileConfirmation: null,

        /**
         * Displayed if `maxFiles` is st and exceeded.
         * The string `{{maxFiles}}` will be replaced by the configuration value.
         */
        dictMaxFilesExceeded: "You can not upload any more files.",

        /**
         * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
         * `b` for bytes.
         */
        dictFileSizeUnits: {
          tb: "TB",
          gb: "GB",
          mb: "MB",
          kb: "KB",
          b: "b"
        },

        /**
         * Called when dropzone initialized
         * You can add event listeners here
         */
        init: function init() {},

        /**
         * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
         * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
         * of a function, this needs to return a map.
         *
         * The default implementation does nothing for normal uploads, but adds relevant information for
         * chunked uploads.
         *
         * This is the same as adding hidden input fields in the form element.
         */
        params: function params(files, xhr, chunk) {
          if (chunk) {
            return {
              dzuuid: chunk.file.upload.uuid,
              dzchunkindex: chunk.index,
              dztotalfilesize: chunk.file.size,
              dzchunksize: this.options.chunkSize,
              dztotalchunkcount: chunk.file.upload.totalChunkCount,
              dzchunkbyteoffset: chunk.index * this.options.chunkSize
            };
          }
        },

        /**
         * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
         * and a `done` function as parameters.
         *
         * If the done function is invoked without arguments, the file is "accepted" and will
         * be processed. If you pass an error message, the file is rejected, and the error
         * message will be displayed.
         * This function will not be called if the file is too big or doesn't match the mime types.
         */
        accept: function accept(file, done) {
          return done();
        },

        /**
         * The callback that will be invoked when all chunks have been uploaded for a file.
         * It gets the file for which the chunks have been uploaded as the first parameter,
         * and the `done` function as second. `done()` needs to be invoked when everything
         * needed to finish the upload process is done.
         */
        chunksUploaded: function chunksUploaded(file, done) {
          done();
        },

        /**
         * Gets called when the browser is not supported.
         * The default implementation shows the fallback input field and adds
         * a text.
         */
        fallback: function fallback() {
          // This code should pass in IE7... :(
          var messageElement;
          this.element.className = "".concat(this.element.className, " dz-browser-not-supported");
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.element.getElementsByTagName("div")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var child = _step2.value;

              if (/(^| )dz-message($| )/.test(child.className)) {
                messageElement = child;
                child.className = "dz-message"; // Removes the 'dz-default' class

                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (!messageElement) {
            messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
            this.element.appendChild(messageElement);
          }

          var span = messageElement.getElementsByTagName("span")[0];

          if (span) {
            if (span.textContent != null) {
              span.textContent = this.options.dictFallbackMessage;
            } else if (span.innerText != null) {
              span.innerText = this.options.dictFallbackMessage;
            }
          }

          return this.element.appendChild(this.getFallbackForm());
        },

        /**
         * Gets called to calculate the thumbnail dimensions.
         *
         * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
         *
         *  - `srcWidth` & `srcHeight` (required)
         *  - `trgWidth` & `trgHeight` (required)
         *  - `srcX` & `srcY` (optional, default `0`)
         *  - `trgX` & `trgY` (optional, default `0`)
         *
         * Those values are going to be used by `ctx.drawImage()`.
         */
        resize: function resize(file, width, height, resizeMethod) {
          var info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
          };
          var srcRatio = file.width / file.height; // Automatically calculate dimensions if not specified

          if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
          } else if (width == null) {
            width = height * srcRatio;
          } else if (height == null) {
            height = width / srcRatio;
          } // Make sure images aren't upscaled


          width = Math.min(width, info.srcWidth);
          height = Math.min(height, info.srcHeight);
          var trgRatio = width / height;

          if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === 'crop') {
              if (srcRatio > trgRatio) {
                info.srcHeight = file.height;
                info.srcWidth = info.srcHeight * trgRatio;
              } else {
                info.srcWidth = file.width;
                info.srcHeight = info.srcWidth / trgRatio;
              }
            } else if (resizeMethod === 'contain') {
              // Method 'contain'
              if (srcRatio > trgRatio) {
                height = width / srcRatio;
              } else {
                width = height * srcRatio;
              }
            } else {
              throw new Error("Unknown resizeMethod '".concat(resizeMethod, "'"));
            }
          }

          info.srcX = (file.width - info.srcWidth) / 2;
          info.srcY = (file.height - info.srcHeight) / 2;
          info.trgWidth = width;
          info.trgHeight = height;
          return info;
        },

        /**
         * Can be used to transform the file (for example, resize an image if necessary).
         *
         * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
         * images according to those dimensions.
         *
         * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
         * to be invoked with the file when the transformation is done.
         */
        transformFile: function transformFile(file, done) {
          if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
            return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
          } else {
            return done(file);
          }
        },

        /**
         * A string that contains the template used for each dropped
         * file. Change it to fulfill your needs but make sure to properly
         * provide all elements.
         *
         * If you want to use an actual HTML element instead of providing a String
         * as a config option, you could create a div with the id `tpl`,
         * put the template inside it and provide the element like this:
         *
         *     document
         *       .querySelector('#tpl')
         *       .innerHTML
         *
         */
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Check</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n      <title>Error</title>\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",
        // END OPTIONS
        // (Required by the dropzone documentation parser)

        /*
         Those functions register themselves to the events on init and handle all
         the user interface specific stuff. Overwriting them won't break the upload
         but can break the way it's displayed.
         You can overwrite them if you don't like the default behavior. If you just
         want to add an additional event handler, register it on the dropzone object
         and don't overwrite those options.
         */
        // Those are self explanatory and simply concern the DragnDrop.
        drop: function drop(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        dragstart: function dragstart(e) {},
        dragend: function dragend(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        dragenter: function dragenter(e) {
          return this.element.classList.add("dz-drag-hover");
        },
        dragover: function dragover(e) {
          return this.element.classList.add("dz-drag-hover");
        },
        dragleave: function dragleave(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        paste: function paste(e) {},
        // Called whenever there are no files left in the dropzone anymore, and the
        // dropzone should be displayed as if in the initial state.
        reset: function reset() {
          return this.element.classList.remove("dz-started");
        },
        // Called when a file is added to the queue
        // Receives `file`
        addedfile: function addedfile(file) {
          var _this2 = this;

          if (this.element === this.previewsContainer) {
            this.element.classList.add("dz-started");
          }

          if (this.previewsContainer) {
            file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility

            this.previewsContainer.appendChild(file.previewElement);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = file.previewElement.querySelectorAll("[data-dz-name]")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var node = _step3.value;
                node.textContent = file.name;
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = file.previewElement.querySelectorAll("[data-dz-size]")[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                node = _step4.value;
                node.innerHTML = this.filesize(file.size);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            if (this.options.addRemoveLinks) {
              file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>".concat(this.options.dictRemoveFile, "</a>"));
              file.previewElement.appendChild(file._removeLink);
            }

            var removeFileEvent = function removeFileEvent(e) {
              e.preventDefault();
              e.stopPropagation();

              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function () {
                  return _this2.removeFile(file);
                });
              } else {
                if (_this2.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function () {
                    return _this2.removeFile(file);
                  });
                } else {
                  return _this2.removeFile(file);
                }
              }
            };

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = file.previewElement.querySelectorAll("[data-dz-remove]")[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var removeLink = _step5.value;
                removeLink.addEventListener("click", removeFileEvent);
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          }
        },
        // Called whenever a file is removed.
        removedfile: function removedfile(file) {
          if (file.previewElement != null && file.previewElement.parentNode != null) {
            file.previewElement.parentNode.removeChild(file.previewElement);
          }

          return this._updateMaxFilesReachedClass();
        },
        // Called when a thumbnail has been generated
        // Receives `file` and `dataUrl`
        thumbnail: function thumbnail(file, dataUrl) {
          if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = file.previewElement.querySelectorAll("[data-dz-thumbnail]")[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var thumbnailElement = _step6.value;
                thumbnailElement.alt = file.name;
                thumbnailElement.src = dataUrl;
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                  _iterator6["return"]();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }

            return setTimeout(function () {
              return file.previewElement.classList.add("dz-image-preview");
            }, 1);
          }
        },
        // Called whenever an error occurs
        // Receives `file` and `message`
        error: function error(file, message) {
          if (file.previewElement) {
            file.previewElement.classList.add("dz-error");

            if (typeof message !== "String" && message.error) {
              message = message.error;
            }

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = file.previewElement.querySelectorAll("[data-dz-errormessage]")[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var node = _step7.value;
                node.textContent = message;
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                  _iterator7["return"]();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }
        },
        errormultiple: function errormultiple() {},
        // Called when a file gets processed. Since there is a cue, not all added
        // files are processed immediately.
        // Receives `file`
        processing: function processing(file) {
          if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");

            if (file._removeLink) {
              return file._removeLink.innerHTML = this.options.dictCancelUpload;
            }
          }
        },
        processingmultiple: function processingmultiple() {},
        // Called whenever the upload progress gets updated.
        // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
        // To get the total number of bytes of the file, use `file.size`
        uploadprogress: function uploadprogress(file, progress, bytesSent) {
          if (file.previewElement) {
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = file.previewElement.querySelectorAll("[data-dz-uploadprogress]")[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var node = _step8.value;
                node.nodeName === 'PROGRESS' ? node.value = progress : node.style.width = "".concat(progress, "%");
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }
          }
        },
        // Called whenever the total upload progress gets updated.
        // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
        totaluploadprogress: function totaluploadprogress() {},
        // Called just before the file is sent. Gets the `xhr` object as second
        // parameter, so you can modify it (for example to add a CSRF token) and a
        // `formData` object to add additional information.
        sending: function sending() {},
        sendingmultiple: function sendingmultiple() {},
        // When the complete upload is finished and successful
        // Receives `file`
        success: function success(file) {
          if (file.previewElement) {
            return file.previewElement.classList.add("dz-success");
          }
        },
        successmultiple: function successmultiple() {},
        // When the upload is canceled.
        canceled: function canceled(file) {
          return this.emit("error", file, this.options.dictUploadCanceled);
        },
        canceledmultiple: function canceledmultiple() {},
        // When the upload is finished, either with success or an error.
        // Receives `file`
        complete: function complete(file) {
          if (file._removeLink) {
            file._removeLink.innerHTML = this.options.dictRemoveFile;
          }

          if (file.previewElement) {
            return file.previewElement.classList.add("dz-complete");
          }
        },
        completemultiple: function completemultiple() {},
        maxfilesexceeded: function maxfilesexceeded() {},
        maxfilesreached: function maxfilesreached() {},
        queuecomplete: function queuecomplete() {},
        addedfiles: function addedfiles() {}
      };
      this.prototype._thumbnailQueue = [];
      this.prototype._processingThumbnail = false;
    } // global utility

  }, {
    key: "extend",
    value: function extend(target) {
      for (var _len2 = arguments.length, objects = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objects[_key2 - 1] = arguments[_key2];
      }

      for (var _i = 0, _objects = objects; _i < _objects.length; _i++) {
        var object = _objects[_i];

        for (var key in object) {
          var val = object[key];
          target[key] = val;
        }
      }

      return target;
    }
  }]);

  function Dropzone(el, options) {
    var _this;

    _classCallCheck(this, Dropzone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropzone).call(this));
    var fallback, left;
    _this.element = el; // For backwards compatibility since the version was in the prototype previously

    _this.version = Dropzone.version;
    _this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, "");
    _this.clickableElements = [];
    _this.listeners = [];
    _this.files = []; // All files

    if (typeof _this.element === "string") {
      _this.element = document.querySelector(_this.element);
    } // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.


    if (!_this.element || _this.element.nodeType == null) {
      throw new Error("Invalid dropzone element.");
    }

    if (_this.element.dropzone) {
      throw new Error("Dropzone already attached.");
    } // Now add this dropzone to the instances.


    Dropzone.instances.push(_assertThisInitialized(_this)); // Put the dropzone inside the element itself.

    _this.element.dropzone = _assertThisInitialized(_this);
    var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};
    _this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {}); // If the browser failed, just call the fallback and leave

    if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
      return _possibleConstructorReturn(_this, _this.options.fallback.call(_assertThisInitialized(_this)));
    } // @options.url = @element.getAttribute "action" unless @options.url?


    if (_this.options.url == null) {
      _this.options.url = _this.element.getAttribute("action");
    }

    if (!_this.options.url) {
      throw new Error("No URL provided.");
    }

    if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
      throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
    }

    if (_this.options.uploadMultiple && _this.options.chunking) {
      throw new Error('You cannot set both: uploadMultiple and chunking.');
    } // Backwards compatibility


    if (_this.options.acceptedMimeTypes) {
      _this.options.acceptedFiles = _this.options.acceptedMimeTypes;
      delete _this.options.acceptedMimeTypes;
    } // Backwards compatibility


    if (_this.options.renameFilename != null) {
      _this.options.renameFile = function (file) {
        return _this.options.renameFilename.call(_assertThisInitialized(_this), file.name, file);
      };
    }

    _this.options.method = _this.options.method.toUpperCase();

    if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
      // Remove the fallback
      fallback.parentNode.removeChild(fallback);
    } // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false


    if (_this.options.previewsContainer !== false) {
      if (_this.options.previewsContainer) {
        _this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, "previewsContainer");
      } else {
        _this.previewsContainer = _this.element;
      }
    }

    if (_this.options.clickable) {
      if (_this.options.clickable === true) {
        _this.clickableElements = [_this.element];
      } else {
        _this.clickableElements = Dropzone.getElements(_this.options.clickable, "clickable");
      }
    }

    _this.init();

    return _this;
  } // Returns all files that have been accepted


  _createClass(Dropzone, [{
    key: "getAcceptedFiles",
    value: function getAcceptedFiles() {
      return this.files.filter(function (file) {
        return file.accepted;
      }).map(function (file) {
        return file;
      });
    } // Returns all files that have been rejected
    // Not sure when that's going to be useful, but added for completeness.

  }, {
    key: "getRejectedFiles",
    value: function getRejectedFiles() {
      return this.files.filter(function (file) {
        return !file.accepted;
      }).map(function (file) {
        return file;
      });
    }
  }, {
    key: "getFilesWithStatus",
    value: function getFilesWithStatus(status) {
      return this.files.filter(function (file) {
        return file.status === status;
      }).map(function (file) {
        return file;
      });
    } // Returns all files that are in the queue

  }, {
    key: "getQueuedFiles",
    value: function getQueuedFiles() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    }
  }, {
    key: "getUploadingFiles",
    value: function getUploadingFiles() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    }
  }, {
    key: "getAddedFiles",
    value: function getAddedFiles() {
      return this.getFilesWithStatus(Dropzone.ADDED);
    } // Files that are either queued or uploading

  }, {
    key: "getActiveFiles",
    value: function getActiveFiles() {
      return this.files.filter(function (file) {
        return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
      }).map(function (file) {
        return file;
      });
    } // The function that gets called when Dropzone is initialized. You
    // can (and should) setup event listeners inside this function.

  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      // In case it isn't set already
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }

      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><button class=\"dz-button\" type=\"button\">".concat(this.options.dictDefaultMessage, "</button></div>")));
      }

      if (this.clickableElements.length) {
        var setupHiddenFileInput = function setupHiddenFileInput() {
          if (_this3.hiddenFileInput) {
            _this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
          }

          _this3.hiddenFileInput = document.createElement("input");

          _this3.hiddenFileInput.setAttribute("type", "file");

          if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
            _this3.hiddenFileInput.setAttribute("multiple", "multiple");
          }

          _this3.hiddenFileInput.className = "dz-hidden-input";

          if (_this3.options.acceptedFiles !== null) {
            _this3.hiddenFileInput.setAttribute("accept", _this3.options.acceptedFiles);
          }

          if (_this3.options.capture !== null) {
            _this3.hiddenFileInput.setAttribute("capture", _this3.options.capture);
          } // Not setting `display="none"` because some browsers don't accept clicks
          // on elements that aren't displayed.


          _this3.hiddenFileInput.style.visibility = "hidden";
          _this3.hiddenFileInput.style.position = "absolute";
          _this3.hiddenFileInput.style.top = "0";
          _this3.hiddenFileInput.style.left = "0";
          _this3.hiddenFileInput.style.height = "0";
          _this3.hiddenFileInput.style.width = "0";
          Dropzone.getElement(_this3.options.hiddenInputContainer, 'hiddenInputContainer').appendChild(_this3.hiddenFileInput);
          return _this3.hiddenFileInput.addEventListener("change", function () {
            var files = _this3.hiddenFileInput.files;

            if (files.length) {
              var _iteratorNormalCompletion9 = true;
              var _didIteratorError9 = false;
              var _iteratorError9 = undefined;

              try {
                for (var _iterator9 = files[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  var file = _step9.value;

                  _this3.addFile(file);
                }
              } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                    _iterator9["return"]();
                  }
                } finally {
                  if (_didIteratorError9) {
                    throw _iteratorError9;
                  }
                }
              }
            }

            _this3.emit("addedfiles", files);

            return setupHiddenFileInput();
          });
        };

        setupHiddenFileInput();
      }

      this.URL = window.URL !== null ? window.URL : window.webkitURL; // Setup all event listeners on the Dropzone object itself.
      // They're not in @setupEventListeners() because they shouldn't be removed
      // again when the dropzone gets disabled.

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.events[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var eventName = _step10.value;
          this.on(eventName, this.options[eventName]);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      this.on("uploadprogress", function () {
        return _this3.updateTotalUploadProgress();
      });
      this.on("removedfile", function () {
        return _this3.updateTotalUploadProgress();
      });
      this.on("canceled", function (file) {
        return _this3.emit("complete", file);
      }); // Emit a `queuecomplete` event if all files finished uploading.

      this.on("complete", function (file) {
        if (_this3.getAddedFiles().length === 0 && _this3.getUploadingFiles().length === 0 && _this3.getQueuedFiles().length === 0) {
          // This needs to be deferred so that `queuecomplete` really triggers after `complete`
          return setTimeout(function () {
            return _this3.emit("queuecomplete");
          }, 0);
        }
      });

      var containsFiles = function containsFiles(e) {
        return e.dataTransfer.types && e.dataTransfer.types.some(function (type) {
          return type == "Files";
        });
      };

      var noPropagation = function noPropagation(e) {
        // If there are no files, we don't want to stop
        // propagation so we don't interfere with other
        // drag and drop behaviour.
        if (!containsFiles(e)) return;
        e.stopPropagation();

        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      }; // Create the listeners


      this.listeners = [{
        element: this.element,
        events: {
          "dragstart": function dragstart(e) {
            return _this3.emit("dragstart", e);
          },
          "dragenter": function dragenter(e) {
            noPropagation(e);
            return _this3.emit("dragenter", e);
          },
          "dragover": function dragover(e) {
            // Makes it possible to drag files from chrome's download bar
            // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
            // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
            var efct;

            try {
              efct = e.dataTransfer.effectAllowed;
            } catch (error) {}

            e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
            noPropagation(e);
            return _this3.emit("dragover", e);
          },
          "dragleave": function dragleave(e) {
            return _this3.emit("dragleave", e);
          },
          "drop": function drop(e) {
            noPropagation(e);
            return _this3.drop(e);
          },
          "dragend": function dragend(e) {
            return _this3.emit("dragend", e);
          }
        } // This is disabled right now, because the browsers don't implement it properly.
        // "paste": (e) =>
        //   noPropagation e
        //   @paste e

      }];
      this.clickableElements.forEach(function (clickableElement) {
        return _this3.listeners.push({
          element: clickableElement,
          events: {
            "click": function click(evt) {
              // Only the actual dropzone or the message element should trigger file selection
              if (clickableElement !== _this3.element || evt.target === _this3.element || Dropzone.elementInside(evt.target, _this3.element.querySelector(".dz-message"))) {
                _this3.hiddenFileInput.click(); // Forward the click

              }

              return true;
            }
          }
        });
      });
      this.enable();
      return this.options.init.call(this);
    } // Not fully tested yet

  }, {
    key: "destroy",
    value: function destroy() {
      this.disable();
      this.removeAllFiles(true);

      if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }

      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    }
  }, {
    key: "updateTotalUploadProgress",
    value: function updateTotalUploadProgress() {
      var totalUploadProgress;
      var totalBytesSent = 0;
      var totalBytes = 0;
      var activeFiles = this.getActiveFiles();

      if (activeFiles.length) {
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = this.getActiveFiles()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var file = _step11.value;
            totalBytesSent += file.upload.bytesSent;
            totalBytes += file.upload.total;
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }

      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    } // @options.paramName can be a function taking one parameter rather than a string.
    // A parameter name for a file is obtained simply by calling this with an index number.

  }, {
    key: "_getParamName",
    value: function _getParamName(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "".concat(this.options.paramName).concat(this.options.uploadMultiple ? "[".concat(n, "]") : "");
      }
    } // If @options.renameFile is a function,
    // the function will be used to rename the file.name before appending it to the formData

  }, {
    key: "_renameFile",
    value: function _renameFile(file) {
      if (typeof this.options.renameFile !== "function") {
        return file.name;
      }

      return this.options.renameFile(file);
    } // Returns a form that can be used as fallback if the browser does not support DragnDrop
    //
    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
    // This code has to pass in IE7 :(

  }, {
    key: "getFallbackForm",
    value: function getFallbackForm() {
      var existingFallback, form;

      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }

      var fieldsString = "<div class=\"dz-fallback\">";

      if (this.options.dictFallbackText) {
        fieldsString += "<p>".concat(this.options.dictFallbackText, "</p>");
      }

      fieldsString += "<input type=\"file\" name=\"".concat(this._getParamName(0), "\" ").concat(this.options.uploadMultiple ? 'multiple="multiple"' : undefined, " /><input type=\"submit\" value=\"Upload!\"></div>");
      var fields = Dropzone.createElement(fieldsString);

      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"".concat(this.options.url, "\" enctype=\"multipart/form-data\" method=\"").concat(this.options.method, "\"></form>"));
        form.appendChild(fields);
      } else {
        // Make sure that the enctype and method attributes are set properly
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }

      return form != null ? form : fields;
    } // Returns the fallback elements if they exist already
    //
    // This code has to pass in IE7 :(

  }, {
    key: "getExistingFallback",
    value: function getExistingFallback() {
      var getFallback = function getFallback(elements) {
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = elements[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var el = _step12.value;

            if (/(^| )fallback($| )/.test(el.className)) {
              return el;
            }
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
              _iterator12["return"]();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      };

      for (var _i2 = 0, _arr = ["div", "form"]; _i2 < _arr.length; _i2++) {
        var tagName = _arr[_i2];
        var fallback;

        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    } // Activates all listeners stored in @listeners

  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      return this.listeners.map(function (elementListeners) {
        return function () {
          var result = [];

          for (var event in elementListeners.events) {
            var listener = elementListeners.events[event];
            result.push(elementListeners.element.addEventListener(event, listener, false));
          }

          return result;
        }();
      });
    } // Deactivates all listeners stored in @listeners

  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      return this.listeners.map(function (elementListeners) {
        return function () {
          var result = [];

          for (var event in elementListeners.events) {
            var listener = elementListeners.events[event];
            result.push(elementListeners.element.removeEventListener(event, listener, false));
          }

          return result;
        }();
      });
    } // Removes all event listeners and cancels all files in the queue or being processed.

  }, {
    key: "disable",
    value: function disable() {
      var _this4 = this;

      this.clickableElements.forEach(function (element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      this.disabled = true;
      return this.files.map(function (file) {
        return _this4.cancelUpload(file);
      });
    }
  }, {
    key: "enable",
    value: function enable() {
      delete this.disabled;
      this.clickableElements.forEach(function (element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    } // Returns a nicely formatted filesize

  }, {
    key: "filesize",
    value: function filesize(size) {
      var selectedSize = 0;
      var selectedUnit = "b";

      if (size > 0) {
        var units = ['tb', 'gb', 'mb', 'kb', 'b'];

        for (var i = 0; i < units.length; i++) {
          var unit = units[i];
          var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

          if (size >= cutoff) {
            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
            selectedUnit = unit;
            break;
          }
        }

        selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
      }

      return "<strong>".concat(selectedSize, "</strong> ").concat(this.options.dictFileSizeUnits[selectedUnit]);
    } // Adds or removes the `dz-max-files-reached` class from the form.

  }, {
    key: "_updateMaxFilesReachedClass",
    value: function _updateMaxFilesReachedClass() {
      if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }

        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    }
  }, {
    key: "drop",
    value: function drop(e) {
      if (!e.dataTransfer) {
        return;
      }

      this.emit("drop", e); // Convert the FileList to an Array
      // This is necessary for IE11

      var files = [];

      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        files[i] = e.dataTransfer.files[i];
      } // Even if it's a folder, files.length will contain the folders.


      if (files.length) {
        var items = e.dataTransfer.items;

        if (items && items.length && items[0].webkitGetAsEntry != null) {
          // The browser supports dropping of folders, so handle items instead of files
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }

      this.emit("addedfiles", files);
    }
  }, {
    key: "paste",
    value: function paste(e) {
      if (__guard__(e != null ? e.clipboardData : undefined, function (x) {
        return x.items;
      }) == null) {
        return;
      }

      this.emit("paste", e);
      var items = e.clipboardData.items;

      if (items.length) {
        return this._addFilesFromItems(items);
      }
    }
  }, {
    key: "handleFiles",
    value: function handleFiles(files) {
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = files[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var file = _step13.value;
          this.addFile(file);
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    } // When a folder is dropped (or files are pasted), items must be handled
    // instead of files.

  }, {
    key: "_addFilesFromItems",
    value: function _addFilesFromItems(items) {
      var _this5 = this;

      return function () {
        var result = [];
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = items[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var item = _step14.value;
            var entry;

            if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
              if (entry.isFile) {
                result.push(_this5.addFile(item.getAsFile()));
              } else if (entry.isDirectory) {
                // Append all files from that directory to files
                result.push(_this5._addFilesFromDirectory(entry, entry.name));
              } else {
                result.push(undefined);
              }
            } else if (item.getAsFile != null) {
              if (item.kind == null || item.kind === "file") {
                result.push(_this5.addFile(item.getAsFile()));
              } else {
                result.push(undefined);
              }
            } else {
              result.push(undefined);
            }
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
              _iterator14["return"]();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        return result;
      }();
    } // Goes through the directory, and adds each file it finds recursively

  }, {
    key: "_addFilesFromDirectory",
    value: function _addFilesFromDirectory(directory, path) {
      var _this6 = this;

      var dirReader = directory.createReader();

      var errorHandler = function errorHandler(error) {
        return __guardMethod__(console, 'log', function (o) {
          return o.log(error);
        });
      };

      var readEntries = function readEntries() {
        return dirReader.readEntries(function (entries) {
          if (entries.length > 0) {
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
              for (var _iterator15 = entries[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                var entry = _step15.value;

                if (entry.isFile) {
                  entry.file(function (file) {
                    if (_this6.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                      return;
                    }

                    file.fullPath = "".concat(path, "/").concat(file.name);
                    return _this6.addFile(file);
                  });
                } else if (entry.isDirectory) {
                  _this6._addFilesFromDirectory(entry, "".concat(path, "/").concat(entry.name));
                }
              } // Recursively call readEntries() again, since browser only handle
              // the first 100 entries.
              // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries

            } catch (err) {
              _didIteratorError15 = true;
              _iteratorError15 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
                  _iterator15["return"]();
                }
              } finally {
                if (_didIteratorError15) {
                  throw _iteratorError15;
                }
              }
            }

            readEntries();
          }

          return null;
        }, errorHandler);
      };

      return readEntries();
    } // If `done()` is called without argument the file is accepted
    // If you call it with an error message, the file is rejected
    // (This allows for asynchronous validation)
    //
    // This function checks the filesize, and if the file.type passes the
    // `acceptedFiles` check.

  }, {
    key: "accept",
    value: function accept(file, done) {
      if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1024 * 1024) {
        done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        done(this.options.dictInvalidFileType);
      } else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        this.emit("maxfilesexceeded", file);
      } else {
        this.options.accept.call(this, file, done);
      }
    }
  }, {
    key: "addFile",
    value: function addFile(file) {
      var _this7 = this;

      file.upload = {
        uuid: Dropzone.uuidv4(),
        progress: 0,
        // Setting the total upload size to file.size for the beginning
        // It's actual different than the size to be transmitted.
        total: file.size,
        bytesSent: 0,
        filename: this._renameFile(file) // Not setting chunking information here, because the acutal data — and
        // thus the chunks — might change if `options.transformFile` is set
        // and does something to the data.

      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);

      this._enqueueThumbnail(file);

      this.accept(file, function (error) {
        if (error) {
          file.accepted = false;

          _this7._errorProcessing([file], error); // Will set the file.status

        } else {
          file.accepted = true;

          if (_this7.options.autoQueue) {
            _this7.enqueueFile(file);
          } // Will set .accepted = true

        }

        _this7._updateMaxFilesReachedClass();
      });
    } // Wrapper for enqueueFile

  }, {
    key: "enqueueFiles",
    value: function enqueueFiles(files) {
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = files[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var file = _step16.value;
          this.enqueueFile(file);
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      return null;
    }
  }, {
    key: "enqueueFile",
    value: function enqueueFile(file) {
      var _this8 = this;

      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;

        if (this.options.autoProcessQueue) {
          return setTimeout(function () {
            return _this8.processQueue();
          }, 0); // Deferring the call
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    }
  }, {
    key: "_enqueueThumbnail",
    value: function _enqueueThumbnail(file) {
      var _this9 = this;

      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);

        return setTimeout(function () {
          return _this9._processThumbnailQueue();
        }, 0); // Deferring the call
      }
    }
  }, {
    key: "_processThumbnailQueue",
    value: function _processThumbnailQueue() {
      var _this10 = this;

      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }

      this._processingThumbnail = true;

      var file = this._thumbnailQueue.shift();

      return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, function (dataUrl) {
        _this10.emit("thumbnail", file, dataUrl);

        _this10._processingThumbnail = false;
        return _this10._processThumbnailQueue();
      });
    } // Can be called by the user to remove a file

  }, {
    key: "removeFile",
    value: function removeFile(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }

      this.files = without(this.files, file);
      this.emit("removedfile", file);

      if (this.files.length === 0) {
        return this.emit("reset");
      }
    } // Removes all files that aren't currently processed from the list

  }, {
    key: "removeAllFiles",
    value: function removeAllFiles(cancelIfNecessary) {
      // Create a copy of files since removeFile() changes the @files array.
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }

      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = this.files.slice()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var file = _step17.value;

          if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
            this.removeFile(file);
          }
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      return null;
    } // Resizes an image before it gets sent to the server. This function is the default behavior of
    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
    // the resized blob.

  }, {
    key: "resizeImage",
    value: function resizeImage(file, width, height, resizeMethod, callback) {
      var _this11 = this;

      return this.createThumbnail(file, width, height, resizeMethod, true, function (dataUrl, canvas) {
        if (canvas == null) {
          // The image has not been resized
          return callback(file);
        } else {
          var resizeMimeType = _this11.options.resizeMimeType;

          if (resizeMimeType == null) {
            resizeMimeType = file.type;
          }

          var resizedDataURL = canvas.toDataURL(resizeMimeType, _this11.options.resizeQuality);

          if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
            // Now add the original EXIF information
            resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
          }

          return callback(Dropzone.dataURItoBlob(resizedDataURL));
        }
      });
    }
  }, {
    key: "createThumbnail",
    value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
      var _this12 = this;

      var fileReader = new FileReader();

      fileReader.onload = function () {
        file.dataURL = fileReader.result; // Don't bother creating a thumbnail for SVG images since they're vector

        if (file.type === "image/svg+xml") {
          if (callback != null) {
            callback(fileReader.result);
          }

          return;
        }

        _this12.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
      };

      fileReader.readAsDataURL(file);
    } // `mockFile` needs to have these attributes:
    // 
    //     { name: 'name', size: 12345, imageUrl: '' }
    //
    // `callback` will be invoked when the image has been downloaded and displayed.
    // `crossOrigin` will be added to the `img` tag when accessing the file.

  }, {
    key: "displayExistingFile",
    value: function displayExistingFile(mockFile, imageUrl, callback, crossOrigin) {
      var _this13 = this;

      var resizeThumbnail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      this.emit("addedfile", mockFile);
      this.emit("complete", mockFile);

      if (!resizeThumbnail) {
        this.emit("thumbnail", mockFile, imageUrl);
        if (callback) callback();
      } else {
        var onDone = function onDone(thumbnail) {
          _this13.emit('thumbnail', mockFile, thumbnail);

          if (callback) callback();
        };

        mockFile.dataURL = imageUrl;
        this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.resizeMethod, this.options.fixOrientation, onDone, crossOrigin);
      }
    }
  }, {
    key: "createThumbnailFromUrl",
    value: function createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
      var _this14 = this;

      // Not using `new Image` here because of a bug in latest Chrome versions.
      // See https://github.com/enyo/dropzone/pull/226
      var img = document.createElement("img");

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.onload = function () {
        var loadExif = function loadExif(callback) {
          return callback(1);
        };

        if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
          loadExif = function loadExif(callback) {
            return EXIF.getData(img, function () {
              return callback(EXIF.getTag(this, 'Orientation'));
            });
          };
        }

        return loadExif(function (orientation) {
          file.width = img.width;
          file.height = img.height;

          var resizeInfo = _this14.options.resize.call(_this14, file, width, height, resizeMethod);

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;

          if (orientation > 4) {
            canvas.width = resizeInfo.trgHeight;
            canvas.height = resizeInfo.trgWidth;
          }

          switch (orientation) {
            case 2:
              // horizontal flip
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              break;

            case 3:
              // 180° rotate left
              ctx.translate(canvas.width, canvas.height);
              ctx.rotate(Math.PI);
              break;

            case 4:
              // vertical flip
              ctx.translate(0, canvas.height);
              ctx.scale(1, -1);
              break;

            case 5:
              // vertical flip + 90 rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.scale(1, -1);
              break;

            case 6:
              // 90° rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(0, -canvas.width);
              break;

            case 7:
              // horizontal flip + 90 rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(canvas.height, -canvas.width);
              ctx.scale(-1, 1);
              break;

            case 8:
              // 90° rotate left
              ctx.rotate(-0.5 * Math.PI);
              ctx.translate(-canvas.height, 0);
              break;
          } // This is a bugfix for iOS' scaling bug.


          drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          var thumbnail = canvas.toDataURL("image/png");

          if (callback != null) {
            return callback(thumbnail, canvas);
          }
        });
      };

      if (callback != null) {
        img.onerror = callback;
      }

      return img.src = file.dataURL;
    } // Goes through the queue and processes files if there aren't too many already.

  }, {
    key: "processQueue",
    value: function processQueue() {
      var parallelUploads = this.options.parallelUploads;
      var processingLength = this.getUploadingFiles().length;
      var i = processingLength; // There are already at least as many files uploading than should be

      if (processingLength >= parallelUploads) {
        return;
      }

      var queuedFiles = this.getQueuedFiles();

      if (!(queuedFiles.length > 0)) {
        return;
      }

      if (this.options.uploadMultiple) {
        // The files should be uploaded in one request
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          } // Nothing left to process


          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    } // Wrapper for `processFiles`

  }, {
    key: "processFile",
    value: function processFile(file) {
      return this.processFiles([file]);
    } // Loads the file, then calls finishedLoading()

  }, {
    key: "processFiles",
    value: function processFiles(files) {
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = files[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var file = _step18.value;
          file.processing = true; // Backwards compatibility

          file.status = Dropzone.UPLOADING;
          this.emit("processing", file);
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }

      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }

      return this.uploadFiles(files);
    }
  }, {
    key: "_getFilesWithXhr",
    value: function _getFilesWithXhr(xhr) {
      var files;
      return files = this.files.filter(function (file) {
        return file.xhr === xhr;
      }).map(function (file) {
        return file;
      });
    } // Cancels the file upload and sets the status to CANCELED
    // **if** the file is actually being uploaded.
    // If it's still in the queue, the file is being removed from it and the status
    // set to CANCELED.

  }, {
    key: "cancelUpload",
    value: function cancelUpload(file) {
      if (file.status === Dropzone.UPLOADING) {
        var groupedFiles = this._getFilesWithXhr(file.xhr);

        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
          for (var _iterator19 = groupedFiles[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
            var groupedFile = _step19.value;
            groupedFile.status = Dropzone.CANCELED;
          }
        } catch (err) {
          _didIteratorError19 = true;
          _iteratorError19 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
              _iterator19["return"]();
            }
          } finally {
            if (_didIteratorError19) {
              throw _iteratorError19;
            }
          }
        }

        if (typeof file.xhr !== 'undefined') {
          file.xhr.abort();
        }

        var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
          for (var _iterator20 = groupedFiles[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
            var _groupedFile = _step20.value;
            this.emit("canceled", _groupedFile);
          }
        } catch (err) {
          _didIteratorError20 = true;
          _iteratorError20 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
              _iterator20["return"]();
            }
          } finally {
            if (_didIteratorError20) {
              throw _iteratorError20;
            }
          }
        }

        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);

        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    }
  }, {
    key: "resolveOption",
    value: function resolveOption(option) {
      if (typeof option === 'function') {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return option.apply(this, args);
      }

      return option;
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(file) {
      return this.uploadFiles([file]);
    }
  }, {
    key: "uploadFiles",
    value: function uploadFiles(files) {
      var _this15 = this;

      this._transformFiles(files, function (transformedFiles) {
        if (_this15.options.chunking) {
          // Chunking is not allowed to be used with `uploadMultiple` so we know
          // that there is only __one__file.
          var transformedFile = transformedFiles[0];
          files[0].upload.chunked = _this15.options.chunking && (_this15.options.forceChunking || transformedFile.size > _this15.options.chunkSize);
          files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / _this15.options.chunkSize);
        }

        if (files[0].upload.chunked) {
          // This file should be sent in chunks!
          // If the chunking option is set, we **know** that there can only be **one** file, since
          // uploadMultiple is not allowed with this option.
          var file = files[0];
          var _transformedFile = transformedFiles[0];
          var startedChunkCount = 0;
          file.upload.chunks = [];

          var handleNextChunk = function handleNextChunk() {
            var chunkIndex = 0; // Find the next item in file.upload.chunks that is not defined yet.

            while (file.upload.chunks[chunkIndex] !== undefined) {
              chunkIndex++;
            } // This means, that all chunks have already been started.


            if (chunkIndex >= file.upload.totalChunkCount) return;
            startedChunkCount++;
            var start = chunkIndex * _this15.options.chunkSize;
            var end = Math.min(start + _this15.options.chunkSize, file.size);
            var dataBlock = {
              name: _this15._getParamName(0),
              data: _transformedFile.webkitSlice ? _transformedFile.webkitSlice(start, end) : _transformedFile.slice(start, end),
              filename: file.upload.filename,
              chunkIndex: chunkIndex
            };
            file.upload.chunks[chunkIndex] = {
              file: file,
              index: chunkIndex,
              dataBlock: dataBlock,
              // In case we want to retry.
              status: Dropzone.UPLOADING,
              progress: 0,
              retries: 0 // The number of times this block has been retried.

            };

            _this15._uploadData(files, [dataBlock]);
          };

          file.upload.finishedChunkUpload = function (chunk) {
            var allFinished = true;
            chunk.status = Dropzone.SUCCESS; // Clear the data from the chunk

            chunk.dataBlock = null; // Leaving this reference to xhr intact here will cause memory leaks in some browsers

            chunk.xhr = null;

            for (var i = 0; i < file.upload.totalChunkCount; i++) {
              if (file.upload.chunks[i] === undefined) {
                return handleNextChunk();
              }

              if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
                allFinished = false;
              }
            }

            if (allFinished) {
              _this15.options.chunksUploaded(file, function () {
                _this15._finished(files, '', null);
              });
            }
          };

          if (_this15.options.parallelChunkUploads) {
            for (var i = 0; i < file.upload.totalChunkCount; i++) {
              handleNextChunk();
            }
          } else {
            handleNextChunk();
          }
        } else {
          var dataBlocks = [];

          for (var _i3 = 0; _i3 < files.length; _i3++) {
            dataBlocks[_i3] = {
              name: _this15._getParamName(_i3),
              data: transformedFiles[_i3],
              filename: files[_i3].upload.filename
            };
          }

          _this15._uploadData(files, dataBlocks);
        }
      });
    } /// Returns the right chunk for given file and xhr

  }, {
    key: "_getChunk",
    value: function _getChunk(file, xhr) {
      for (var i = 0; i < file.upload.totalChunkCount; i++) {
        if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
          return file.upload.chunks[i];
        }
      }
    } // This function actually uploads the file(s) to the server.
    // If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
    // files, or individual chunks for chunked upload).

  }, {
    key: "_uploadData",
    value: function _uploadData(files, dataBlocks) {
      var _this16 = this;

      var xhr = new XMLHttpRequest(); // Put the xhr object in the file objects to be able to reference it later.

      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = files[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var file = _step21.value;
          file.xhr = xhr;
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }

      if (files[0].upload.chunked) {
        // Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
      }

      var method = this.resolveOption(this.options.method, files);
      var url = this.resolveOption(this.options.url, files);
      xhr.open(method, url, true); // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8

      xhr.timeout = this.resolveOption(this.options.timeout, files); // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179

      xhr.withCredentials = !!this.options.withCredentials;

      xhr.onload = function (e) {
        _this16._finishedUploading(files, xhr, e);
      };

      xhr.ontimeout = function () {
        _this16._handleUploadError(files, xhr, "Request timedout after ".concat(_this16.options.timeout, " seconds"));
      };

      xhr.onerror = function () {
        _this16._handleUploadError(files, xhr);
      }; // Some browsers do not have the .upload property


      var progressObj = xhr.upload != null ? xhr.upload : xhr;

      progressObj.onprogress = function (e) {
        return _this16._updateFilesUploadProgress(files, xhr, e);
      };

      var headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };

      if (this.options.headers) {
        Dropzone.extend(headers, this.options.headers);
      }

      for (var headerName in headers) {
        var headerValue = headers[headerName];

        if (headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        }
      }

      var formData = new FormData(); // Adding all @options parameters

      if (this.options.params) {
        var additionalParams = this.options.params;

        if (typeof additionalParams === 'function') {
          additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
        }

        for (var key in additionalParams) {
          var value = additionalParams[key];
          formData.append(key, value);
        }
      } // Let the user add additional data if necessary


      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = files[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var _file = _step22.value;
          this.emit("sending", _file, xhr, formData);
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }

      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }

      this._addFormElementData(formData); // Finally add the files
      // Has to be last because some servers (eg: S3) expect the file to be the last parameter


      for (var i = 0; i < dataBlocks.length; i++) {
        var dataBlock = dataBlocks[i];
        formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
      }

      this.submitRequest(xhr, formData, files);
    } // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.

  }, {
    key: "_transformFiles",
    value: function _transformFiles(files, done) {
      var _this17 = this;

      var transformedFiles = []; // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.

      var doneCounter = 0;

      var _loop = function _loop(i) {
        _this17.options.transformFile.call(_this17, files[i], function (transformedFile) {
          transformedFiles[i] = transformedFile;

          if (++doneCounter === files.length) {
            done(transformedFiles);
          }
        });
      };

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }
    } // Takes care of adding other input elements of the form to the AJAX request

  }, {
    key: "_addFormElementData",
    value: function _addFormElementData(formData) {
      // Take care of other input elements
      if (this.element.tagName === "FORM") {
        var _iteratorNormalCompletion23 = true;
        var _didIteratorError23 = false;
        var _iteratorError23 = undefined;

        try {
          for (var _iterator23 = this.element.querySelectorAll("input, textarea, select, button")[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            var input = _step23.value;
            var inputName = input.getAttribute("name");
            var inputType = input.getAttribute("type");
            if (inputType) inputType = inputType.toLowerCase(); // If the input doesn't have a name, we can't use it.

            if (typeof inputName === 'undefined' || inputName === null) continue;

            if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
              // Possibly multiple values
              var _iteratorNormalCompletion24 = true;
              var _didIteratorError24 = false;
              var _iteratorError24 = undefined;

              try {
                for (var _iterator24 = input.options[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                  var option = _step24.value;

                  if (option.selected) {
                    formData.append(inputName, option.value);
                  }
                }
              } catch (err) {
                _didIteratorError24 = true;
                _iteratorError24 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
                    _iterator24["return"]();
                  }
                } finally {
                  if (_didIteratorError24) {
                    throw _iteratorError24;
                  }
                }
              }
            } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) {
              formData.append(inputName, input.value);
            }
          }
        } catch (err) {
          _didIteratorError23 = true;
          _iteratorError23 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
              _iterator23["return"]();
            }
          } finally {
            if (_didIteratorError23) {
              throw _iteratorError23;
            }
          }
        }
      }
    } // Invoked when there is new progress information about given files.
    // If e is not provided, it is assumed that the upload is finished.

  }, {
    key: "_updateFilesUploadProgress",
    value: function _updateFilesUploadProgress(files, xhr, e) {
      var progress;

      if (typeof e !== 'undefined') {
        progress = 100 * e.loaded / e.total;

        if (files[0].upload.chunked) {
          var file = files[0]; // Since this is a chunked upload, we need to update the appropriate chunk progress.

          var chunk = this._getChunk(file, xhr);

          chunk.progress = progress;
          chunk.total = e.total;
          chunk.bytesSent = e.loaded;
          var fileProgress = 0,
              fileTotal,
              fileBytesSent;
          file.upload.progress = 0;
          file.upload.total = 0;
          file.upload.bytesSent = 0;

          for (var i = 0; i < file.upload.totalChunkCount; i++) {
            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
              file.upload.progress += file.upload.chunks[i].progress;
              file.upload.total += file.upload.chunks[i].total;
              file.upload.bytesSent += file.upload.chunks[i].bytesSent;
            }
          }

          file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
        } else {
          var _iteratorNormalCompletion25 = true;
          var _didIteratorError25 = false;
          var _iteratorError25 = undefined;

          try {
            for (var _iterator25 = files[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
              var _file2 = _step25.value;
              _file2.upload.progress = progress;
              _file2.upload.total = e.total;
              _file2.upload.bytesSent = e.loaded;
            }
          } catch (err) {
            _didIteratorError25 = true;
            _iteratorError25 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
                _iterator25["return"]();
              }
            } finally {
              if (_didIteratorError25) {
                throw _iteratorError25;
              }
            }
          }
        }

        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
          for (var _iterator26 = files[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            var _file3 = _step26.value;
            this.emit("uploadprogress", _file3, _file3.upload.progress, _file3.upload.bytesSent);
          }
        } catch (err) {
          _didIteratorError26 = true;
          _iteratorError26 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
              _iterator26["return"]();
            }
          } finally {
            if (_didIteratorError26) {
              throw _iteratorError26;
            }
          }
        }
      } else {
        // Called when the file finished uploading
        var allFilesFinished = true;
        progress = 100;
        var _iteratorNormalCompletion27 = true;
        var _didIteratorError27 = false;
        var _iteratorError27 = undefined;

        try {
          for (var _iterator27 = files[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
            var _file4 = _step27.value;

            if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
              allFilesFinished = false;
            }

            _file4.upload.progress = progress;
            _file4.upload.bytesSent = _file4.upload.total;
          } // Nothing to do, all files already at 100%

        } catch (err) {
          _didIteratorError27 = true;
          _iteratorError27 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
              _iterator27["return"]();
            }
          } finally {
            if (_didIteratorError27) {
              throw _iteratorError27;
            }
          }
        }

        if (allFilesFinished) {
          return;
        }

        var _iteratorNormalCompletion28 = true;
        var _didIteratorError28 = false;
        var _iteratorError28 = undefined;

        try {
          for (var _iterator28 = files[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
            var _file5 = _step28.value;
            this.emit("uploadprogress", _file5, progress, _file5.upload.bytesSent);
          }
        } catch (err) {
          _didIteratorError28 = true;
          _iteratorError28 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
              _iterator28["return"]();
            }
          } finally {
            if (_didIteratorError28) {
              throw _iteratorError28;
            }
          }
        }
      }
    }
  }, {
    key: "_finishedUploading",
    value: function _finishedUploading(files, xhr, e) {
      var response;

      if (files[0].status === Dropzone.CANCELED) {
        return;
      }

      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
        response = xhr.responseText;

        if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
          try {
            response = JSON.parse(response);
          } catch (error) {
            e = error;
            response = "Invalid JSON response from server.";
          }
        }
      }

      this._updateFilesUploadProgress(files);

      if (!(200 <= xhr.status && xhr.status < 300)) {
        this._handleUploadError(files, xhr, response);
      } else {
        if (files[0].upload.chunked) {
          files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
        } else {
          this._finished(files, response, e);
        }
      }
    }
  }, {
    key: "_handleUploadError",
    value: function _handleUploadError(files, xhr, response) {
      if (files[0].status === Dropzone.CANCELED) {
        return;
      }

      if (files[0].upload.chunked && this.options.retryChunks) {
        var chunk = this._getChunk(files[0], xhr);

        if (chunk.retries++ < this.options.retryChunksLimit) {
          this._uploadData(files, [chunk.dataBlock]);

          return;
        } else {
          console.warn('Retried this chunk too often. Giving up.');
        }
      }

      this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
    }
  }, {
    key: "submitRequest",
    value: function submitRequest(xhr, formData, files) {
      xhr.send(formData);
    } // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.

  }, {
    key: "_finished",
    value: function _finished(files, responseText, e) {
      var _iteratorNormalCompletion29 = true;
      var _didIteratorError29 = false;
      var _iteratorError29 = undefined;

      try {
        for (var _iterator29 = files[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
          var file = _step29.value;
          file.status = Dropzone.SUCCESS;
          this.emit("success", file, responseText, e);
          this.emit("complete", file);
        }
      } catch (err) {
        _didIteratorError29 = true;
        _iteratorError29 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }
        } finally {
          if (_didIteratorError29) {
            throw _iteratorError29;
          }
        }
      }

      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    } // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.

  }, {
    key: "_errorProcessing",
    value: function _errorProcessing(files, message, xhr) {
      var _iteratorNormalCompletion30 = true;
      var _didIteratorError30 = false;
      var _iteratorError30 = undefined;

      try {
        for (var _iterator30 = files[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
          var file = _step30.value;
          file.status = Dropzone.ERROR;
          this.emit("error", file, message, xhr);
          this.emit("complete", file);
        }
      } catch (err) {
        _didIteratorError30 = true;
        _iteratorError30 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
            _iterator30["return"]();
          }
        } finally {
          if (_didIteratorError30) {
            throw _iteratorError30;
          }
        }
      }

      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    }
  }], [{
    key: "uuidv4",
    value: function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }]);

  return Dropzone;
}(Emitter);

Dropzone.initClass();
Dropzone.version = "5.7.0"; // This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// To disable autoDiscover for a specific element, you can set `false` as an option:
//
//     Dropzone.options.myDisabledElementId = false;
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>

Dropzone.options = {}; // Returns the options for an element or undefined if none available.

Dropzone.optionsForElement = function (element) {
  // Get the `Dropzone.options.elementId` for this element if it exists
  if (element.getAttribute("id")) {
    return Dropzone.options[camelize(element.getAttribute("id"))];
  } else {
    return undefined;
  }
}; // Holds a list of all dropzone instances


Dropzone.instances = []; // Returns the dropzone for given element if any

Dropzone.forElement = function (element) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }

  if ((element != null ? element.dropzone : undefined) == null) {
    throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
  }

  return element.dropzone;
}; // Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.


Dropzone.autoDiscover = true; // Looks for all .dropzone elements and creates a dropzone for them

Dropzone.discover = function () {
  var dropzones;

  if (document.querySelectorAll) {
    dropzones = document.querySelectorAll(".dropzone");
  } else {
    dropzones = []; // IE :(

    var checkElements = function checkElements(elements) {
      return function () {
        var result = [];
        var _iteratorNormalCompletion31 = true;
        var _didIteratorError31 = false;
        var _iteratorError31 = undefined;

        try {
          for (var _iterator31 = elements[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
            var el = _step31.value;

            if (/(^| )dropzone($| )/.test(el.className)) {
              result.push(dropzones.push(el));
            } else {
              result.push(undefined);
            }
          }
        } catch (err) {
          _didIteratorError31 = true;
          _iteratorError31 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
              _iterator31["return"]();
            }
          } finally {
            if (_didIteratorError31) {
              throw _iteratorError31;
            }
          }
        }

        return result;
      }();
    };

    checkElements(document.getElementsByTagName("div"));
    checkElements(document.getElementsByTagName("form"));
  }

  return function () {
    var result = [];
    var _iteratorNormalCompletion32 = true;
    var _didIteratorError32 = false;
    var _iteratorError32 = undefined;

    try {
      for (var _iterator32 = dropzones[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
        var dropzone = _step32.value;

        // Create a dropzone unless auto discover has been disabled for specific element
        if (Dropzone.optionsForElement(dropzone) !== false) {
          result.push(new Dropzone(dropzone));
        } else {
          result.push(undefined);
        }
      }
    } catch (err) {
      _didIteratorError32 = true;
      _iteratorError32 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
          _iterator32["return"]();
        }
      } finally {
        if (_didIteratorError32) {
          throw _iteratorError32;
        }
      }
    }

    return result;
  }();
}; // Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
// but not correctly.
// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
//


Dropzone.blacklistedBrowsers = [// The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
/opera.*(Macintosh|Windows Phone).*version\/12/i]; // Checks if the browser is supported

Dropzone.isBrowserSupported = function () {
  var capableBrowser = true;

  if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
    if (!("classList" in document.createElement("a"))) {
      capableBrowser = false;
    } else {
      // The browser supports the API, but may be blacklisted.
      var _iteratorNormalCompletion33 = true;
      var _didIteratorError33 = false;
      var _iteratorError33 = undefined;

      try {
        for (var _iterator33 = Dropzone.blacklistedBrowsers[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
          var regex = _step33.value;

          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      } catch (err) {
        _didIteratorError33 = true;
        _iteratorError33 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
            _iterator33["return"]();
          }
        } finally {
          if (_didIteratorError33) {
            throw _iteratorError33;
          }
        }
      }
    }
  } else {
    capableBrowser = false;
  }

  return capableBrowser;
};

Dropzone.dataURItoBlob = function (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]); // separate out the mime component

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // write the bytes of the string to an ArrayBuffer

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
    ia[i] = byteString.charCodeAt(i);
  } // write the ArrayBuffer to a blob


  return new Blob([ab], {
    type: mimeString
  });
}; // Returns an array without the rejected item


var without = function without(list, rejectedItem) {
  return list.filter(function (item) {
    return item !== rejectedItem;
  }).map(function (item) {
    return item;
  });
}; // abc-def_ghi -> abcDefGhi


var camelize = function camelize(str) {
  return str.replace(/[\-_](\w)/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}; // Creates an element from string


Dropzone.createElement = function (string) {
  var div = document.createElement("div");
  div.innerHTML = string;
  return div.childNodes[0];
}; // Tests if given element is inside (or simply is) the container


Dropzone.elementInside = function (element, container) {
  if (element === container) {
    return true;
  } // Coffeescript doesn't support do/while loops


  while (element = element.parentNode) {
    if (element === container) {
      return true;
    }
  }

  return false;
};

Dropzone.getElement = function (el, name) {
  var element;

  if (typeof el === "string") {
    element = document.querySelector(el);
  } else if (el.nodeType != null) {
    element = el;
  }

  if (element == null) {
    throw new Error("Invalid `".concat(name, "` option provided. Please provide a CSS selector or a plain HTML element."));
  }

  return element;
};

Dropzone.getElements = function (els, name) {
  var el, elements;

  if (els instanceof Array) {
    elements = [];

    try {
      var _iteratorNormalCompletion34 = true;
      var _didIteratorError34 = false;
      var _iteratorError34 = undefined;

      try {
        for (var _iterator34 = els[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
          el = _step34.value;
          elements.push(this.getElement(el, name));
        }
      } catch (err) {
        _didIteratorError34 = true;
        _iteratorError34 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
            _iterator34["return"]();
          }
        } finally {
          if (_didIteratorError34) {
            throw _iteratorError34;
          }
        }
      }
    } catch (e) {
      elements = null;
    }
  } else if (typeof els === "string") {
    elements = [];
    var _iteratorNormalCompletion35 = true;
    var _didIteratorError35 = false;
    var _iteratorError35 = undefined;

    try {
      for (var _iterator35 = document.querySelectorAll(els)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
        el = _step35.value;
        elements.push(el);
      }
    } catch (err) {
      _didIteratorError35 = true;
      _iteratorError35 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
          _iterator35["return"]();
        }
      } finally {
        if (_didIteratorError35) {
          throw _iteratorError35;
        }
      }
    }
  } else if (els.nodeType != null) {
    elements = [els];
  }

  if (elements == null || !elements.length) {
    throw new Error("Invalid `".concat(name, "` option provided. Please provide a CSS selector, a plain HTML element or a list of those."));
  }

  return elements;
}; // Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.


Dropzone.confirm = function (question, accepted, rejected) {
  if (window.confirm(question)) {
    return accepted();
  } else if (rejected != null) {
    return rejected();
  }
}; // Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept


Dropzone.isValidFile = function (file, acceptedFiles) {
  if (!acceptedFiles) {
    return true;
  } // If there are no accepted mime types, it's OK


  acceptedFiles = acceptedFiles.split(",");
  var mimeType = file.type;
  var baseMimeType = mimeType.replace(/\/.*$/, "");
  var _iteratorNormalCompletion36 = true;
  var _didIteratorError36 = false;
  var _iteratorError36 = undefined;

  try {
    for (var _iterator36 = acceptedFiles[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
      var validType = _step36.value;
      validType = validType.trim();

      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
  } catch (err) {
    _didIteratorError36 = true;
    _iteratorError36 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
        _iterator36["return"]();
      }
    } finally {
      if (_didIteratorError36) {
        throw _iteratorError36;
      }
    }
  }

  return false;
}; // Augment jQuery


if (typeof jQuery !== 'undefined' && jQuery !== null) {
  jQuery.fn.dropzone = function (options) {
    return this.each(function () {
      return new Dropzone(this, options);
    });
  };
}

if ( true && module !== null) {
  module.exports = Dropzone;
} else {
  window.Dropzone = Dropzone;
} // Dropzone file status codes


Dropzone.ADDED = "added";
Dropzone.QUEUED = "queued"; // For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.

Dropzone.ACCEPTED = Dropzone.QUEUED;
Dropzone.UPLOADING = "uploading";
Dropzone.PROCESSING = Dropzone.UPLOADING; // alias

Dropzone.CANCELED = "canceled";
Dropzone.ERROR = "error";
Dropzone.SUCCESS = "success";
/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */
// Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel

var detectVerticalSquash = function detectVerticalSquash(img) {
  var iw = img.naturalWidth;
  var ih = img.naturalHeight;
  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = ih;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
      data = _ctx$getImageData.data; // search image edge pixel position in case it is squashed vertically.


  var sy = 0;
  var ey = ih;
  var py = ih;

  while (py > sy) {
    var alpha = data[(py - 1) * 4 + 3];

    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }

    py = ey + sy >> 1;
  }

  var ratio = py / ih;

  if (ratio === 0) {
    return 1;
  } else {
    return ratio;
  }
}; // A replacement for context.drawImage
// (args are for source and destination).


var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
  var vertSquashRatio = detectVerticalSquash(img);
  return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
}; // Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html


var ExifRestore =
/*#__PURE__*/
function () {
  function ExifRestore() {
    _classCallCheck(this, ExifRestore);
  }

  _createClass(ExifRestore, null, [{
    key: "initClass",
    value: function initClass() {
      this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
  }, {
    key: "encode64",
    value: function encode64(input) {
      var output = '';
      var chr1 = undefined;
      var chr2 = undefined;
      var chr3 = '';
      var enc1 = undefined;
      var enc2 = undefined;
      var enc3 = undefined;
      var enc4 = '';
      var i = 0;

      while (true) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';

        if (!(i < input.length)) {
          break;
        }
      }

      return output;
    }
  }, {
    key: "restore",
    value: function restore(origFileBase64, resizedFileBase64) {
      if (!origFileBase64.match('data:image/jpeg;base64,')) {
        return resizedFileBase64;
      }

      var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
      var segments = this.slice2Segments(rawImage);
      var image = this.exifManipulation(resizedFileBase64, segments);
      return "data:image/jpeg;base64,".concat(this.encode64(image));
    }
  }, {
    key: "exifManipulation",
    value: function exifManipulation(resizedFileBase64, segments) {
      var exifArray = this.getExifArray(segments);
      var newImageArray = this.insertExif(resizedFileBase64, exifArray);
      var aBuffer = new Uint8Array(newImageArray);
      return aBuffer;
    }
  }, {
    key: "getExifArray",
    value: function getExifArray(segments) {
      var seg = undefined;
      var x = 0;

      while (x < segments.length) {
        seg = segments[x];

        if (seg[0] === 255 & seg[1] === 225) {
          return seg;
        }

        x++;
      }

      return [];
    }
  }, {
    key: "insertExif",
    value: function insertExif(resizedFileBase64, exifArray) {
      var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
      var buf = this.decode64(imageData);
      var separatePoint = buf.indexOf(255, 3);
      var mae = buf.slice(0, separatePoint);
      var ato = buf.slice(separatePoint);
      var array = mae;
      array = array.concat(exifArray);
      array = array.concat(ato);
      return array;
    }
  }, {
    key: "slice2Segments",
    value: function slice2Segments(rawImageArray) {
      var head = 0;
      var segments = [];

      while (true) {
        var length;

        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
          break;
        }

        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
          head += 2;
        } else {
          length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
          var endPoint = head + length + 2;
          var seg = rawImageArray.slice(head, endPoint);
          segments.push(seg);
          head = endPoint;
        }

        if (head > rawImageArray.length) {
          break;
        }
      }

      return segments;
    }
  }, {
    key: "decode64",
    value: function decode64(input) {
      var output = '';
      var chr1 = undefined;
      var chr2 = undefined;
      var chr3 = '';
      var enc1 = undefined;
      var enc2 = undefined;
      var enc3 = undefined;
      var enc4 = '';
      var i = 0;
      var buf = []; // remove all characters that are not A-Z, a-z, 0-9, +, /, or =

      var base64test = /[^A-Za-z0-9\+\/\=]/g;

      if (base64test.exec(input)) {
        console.warn('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\nExpect errors in decoding.');
      }

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      while (true) {
        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
        enc4 = this.KEY_STR.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        buf.push(chr1);

        if (enc3 !== 64) {
          buf.push(chr2);
        }

        if (enc4 !== 64) {
          buf.push(chr3);
        }

        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';

        if (!(i < input.length)) {
          break;
        }
      }

      return buf;
    }
  }]);

  return ExifRestore;
}();

ExifRestore.initClass();
/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */
// @win window reference
// @fn function reference

var contentLoaded = function contentLoaded(win, fn) {
  var done = false;
  var top = true;
  var doc = win.document;
  var root = doc.documentElement;
  var add = doc.addEventListener ? "addEventListener" : "attachEvent";
  var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
  var pre = doc.addEventListener ? "" : "on";

  var init = function init(e) {
    if (e.type === "readystatechange" && doc.readyState !== "complete") {
      return;
    }

    (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);

    if (!done && (done = true)) {
      return fn.call(win, e.type || e);
    }
  };

  var poll = function poll() {
    try {
      root.doScroll("left");
    } catch (e) {
      setTimeout(poll, 50);
      return;
    }

    return init("poll");
  };

  if (doc.readyState !== "complete") {
    if (doc.createEventObject && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (error) {}

      if (top) {
        poll();
      }
    }

    doc[add](pre + "DOMContentLoaded", init, false);
    doc[add](pre + "readystatechange", init, false);
    return win[add](pre + "load", init, false);
  }
}; // As a single function to be able to write tests.


Dropzone._autoDiscoverFunction = function () {
  if (Dropzone.autoDiscover) {
    return Dropzone.discover();
  }
};

contentLoaded(window, Dropzone._autoDiscoverFunction);

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/laravel-echo/dist/echo.js":
/*!************************************************!*\
  !*** ./node_modules/laravel-echo/dist/echo.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Connector {
    /**
     * Create a new class instance.
     */
    constructor(options) {
        /**
         * Default connector options.
         */
        this._defaultOptions = {
            auth: {
                headers: {},
            },
            authEndpoint: '/broadcasting/auth',
            broadcaster: 'pusher',
            csrfToken: null,
            host: null,
            key: null,
            namespace: 'App.Events',
        };
        this.setOptions(options);
        this.connect();
    }
    /**
     * Merge the custom options with the defaults.
     */
    setOptions(options) {
        this.options = Object.assign(this._defaultOptions, options);
        if (this.csrfToken()) {
            this.options.auth.headers['X-CSRF-TOKEN'] = this.csrfToken();
        }
        return options;
    }
    /**
     * Extract the CSRF token from the page.
     */
    csrfToken() {
        let selector;
        if (typeof window !== 'undefined' && window['Laravel'] && window['Laravel'].csrfToken) {
            return window['Laravel'].csrfToken;
        }
        else if (this.options.csrfToken) {
            return this.options.csrfToken;
        }
        else if (typeof document !== 'undefined' &&
            typeof document.querySelector === 'function' &&
            (selector = document.querySelector('meta[name="csrf-token"]'))) {
            return selector.getAttribute('content');
        }
        return null;
    }
}

/**
 * This class represents a basic channel.
 */
class Channel {
    /**
     * Listen for a whisper event on the channel instance.
     */
    listenForWhisper(event, callback) {
        return this.listen('.client-' + event, callback);
    }
    /**
     * Listen for an event on the channel instance.
     */
    notification(callback) {
        return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
    }
    /**
     * Stop listening for a whispser event on the channel instance.
     */
    stopListeningForWhisper(event) {
        return this.stopListening('.client-' + event);
    }
}

/**
 * Event name formatter
 */
class EventFormatter {
    /**
     * Create a new class instance.
     */
    constructor(namespace) {
        this.setNamespace(namespace);
    }
    /**
     * Format the given event name.
     */
    format(event) {
        if (event.charAt(0) === '.' || event.charAt(0) === '\\') {
            return event.substr(1);
        }
        else if (this.namespace) {
            event = this.namespace + '.' + event;
        }
        return event.replace(/\./g, '\\');
    }
    /**
     * Set the event namespace.
     */
    setNamespace(value) {
        this.namespace = value;
    }
}

/**
 * This class represents a Pusher channel.
 */
class PusherChannel extends Channel {
    /**
     * Create a new class instance.
     */
    constructor(pusher, name, options) {
        super();
        this.name = name;
        this.pusher = pusher;
        this.options = options;
        this.eventFormatter = new EventFormatter(this.options.namespace);
        this.subscribe();
    }
    /**
     * Subscribe to a Pusher channel.
     */
    subscribe() {
        this.subscription = this.pusher.subscribe(this.name);
    }
    /**
     * Unsubscribe from a Pusher channel.
     */
    unsubscribe() {
        this.pusher.unsubscribe(this.name);
    }
    /**
     * Listen for an event on the channel instance.
     */
    listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event) {
        this.subscription.unbind(this.eventFormatter.format(event));
        return this;
    }
    /**
     * Bind a channel to an event.
     */
    on(event, callback) {
        this.subscription.bind(event, callback);
        return this;
    }
}

/**
 * This class represents a Pusher private channel.
 */
class PusherPrivateChannel extends PusherChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
    }
}

/**
 * This class represents a Pusher private channel.
 */
class PusherEncryptedPrivateChannel extends PusherChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
    }
}

/**
 * This class represents a Pusher presence channel.
 */
class PusherPresenceChannel extends PusherChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback) {
        this.on('pusher:subscription_succeeded', data => {
            callback(Object.keys(data.members).map(k => data.members[k]));
        });
        return this;
    }
    /**
     * Listen for someone joining the channel.
     */
    joining(callback) {
        this.on('pusher:member_added', member => {
            callback(member.info);
        });
        return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback) {
        this.on('pusher:member_removed', member => {
            callback(member.info);
        });
        return this;
    }
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
    }
}

/**
 * This class represents a Socket.io channel.
 */
class SocketIoChannel extends Channel {
    /**
     * Create a new class instance.
     */
    constructor(socket, name, options) {
        super();
        /**
         * The event callbacks applied to the channel.
         */
        this.events = {};
        this.name = name;
        this.socket = socket;
        this.options = options;
        this.eventFormatter = new EventFormatter(this.options.namespace);
        this.subscribe();
        this.configureReconnector();
    }
    /**
     * Subscribe to a Socket.io channel.
     */
    subscribe() {
        this.socket.emit('subscribe', {
            channel: this.name,
            auth: this.options.auth || {},
        });
    }
    /**
     * Unsubscribe from channel and ubind event callbacks.
     */
    unsubscribe() {
        this.unbind();
        this.socket.emit('unsubscribe', {
            channel: this.name,
            auth: this.options.auth || {},
        });
    }
    /**
     * Listen for an event on the channel instance.
     */
    listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event) {
        const name = this.eventFormatter.format(event);
        this.socket.removeListener(name);
        delete this.events[name];
        return this;
    }
    /**
     * Bind the channel's socket to an event and store the callback.
     */
    on(event, callback) {
        let listener = (channel, data) => {
            if (this.name == channel) {
                callback(data);
            }
        };
        this.socket.on(event, listener);
        this.bind(event, listener);
    }
    /**
     * Attach a 'reconnect' listener and bind the event.
     */
    configureReconnector() {
        const listener = () => {
            this.subscribe();
        };
        this.socket.on('reconnect', listener);
        this.bind('reconnect', listener);
    }
    /**
     * Bind the channel's socket to an event and store the callback.
     */
    bind(event, callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }
    /**
     * Unbind the channel's socket from all stored event callbacks.
     */
    unbind() {
        Object.keys(this.events).forEach(event => {
            this.events[event].forEach(callback => {
                this.socket.removeListener(event, callback);
            });
            delete this.events[event];
        });
    }
}

/**
 * This class represents a Socket.io presence channel.
 */
class SocketIoPrivateChannel extends SocketIoChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        this.socket.emit('client event', {
            channel: this.name,
            event: `client-${eventName}`,
            data: data,
        });
        return this;
    }
}

/**
 * This class represents a Socket.io presence channel.
 */
class SocketIoPresenceChannel extends SocketIoPrivateChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback) {
        this.on('presence:subscribed', (members) => {
            callback(members.map(m => m.user_info));
        });
        return this;
    }
    /**
     * Listen for someone joining the channel.
     */
    joining(callback) {
        this.on('presence:joining', member => callback(member.user_info));
        return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback) {
        this.on('presence:leaving', member => callback(member.user_info));
        return this;
    }
}

/**
 * This class represents a null channel.
 */
class NullChannel extends Channel {
    /**
     * Subscribe to a channel.
     */
    subscribe() {
        //
    }
    /**
     * Unsubscribe from a channel.
     */
    unsubscribe() {
        //
    }
    /**
     * Listen for an event on the channel instance.
     */
    listen(event, callback) {
        return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event) {
        return this;
    }
    /**
     * Bind a channel to an event.
     */
    on(event, callback) {
        return this;
    }
}

/**
 * This class represents a null private channel.
 */
class NullPrivateChannel extends NullChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        return this;
    }
}

/**
 * This class represents a null presence channel.
 */
class NullPresenceChannel extends NullChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback) {
        return this;
    }
    /**
     * Listen for someone joining the channel.
     */
    joining(callback) {
        return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback) {
        return this;
    }
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName, data) {
        return this;
    }
}

/**
 * This class creates a connector to Pusher.
 */
class PusherConnector extends Connector {
    constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
    }
    /**
     * Create a fresh Pusher connection.
     */
    connect() {
        if (typeof this.options.client !== 'undefined') {
            this.pusher = this.options.client;
        }
        else {
            this.pusher = new Pusher(this.options.key, this.options);
        }
    }
    /**
     * Listen for an event on a channel instance.
     */
    listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
    }
    /**
     * Get a channel instance by name.
     */
    channel(name) {
        if (!this.channels[name]) {
            this.channels[name] = new PusherChannel(this.pusher, name, this.options);
        }
        return this.channels[name];
    }
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name) {
        if (!this.channels['private-' + name]) {
            this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
    }
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name) {
        if (!this.channels['private-encrypted-' + name]) {
            this.channels['private-encrypted-' + name] = new PusherEncryptedPrivateChannel(this.pusher, 'private-encrypted-' + name, this.options);
        }
        return this.channels['private-encrypted-' + name];
    }
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
            this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name) {
        let channels = [name, 'private-' + name, 'presence-' + name];
        channels.forEach((name, index) => {
            this.leaveChannel(name);
        });
    }
    /**
     * Leave the given channel.
     */
    leaveChannel(name) {
        if (this.channels[name]) {
            this.channels[name].unsubscribe();
            delete this.channels[name];
        }
    }
    /**
     * Get the socket ID for the connection.
     */
    socketId() {
        return this.pusher.connection.socket_id;
    }
    /**
     * Disconnect Pusher connection.
     */
    disconnect() {
        this.pusher.disconnect();
    }
}

/**
 * This class creates a connnector to a Socket.io server.
 */
class SocketIoConnector extends Connector {
    constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
    }
    /**
     * Create a fresh Socket.io connection.
     */
    connect() {
        let io = this.getSocketIO();
        this.socket = io(this.options.host, this.options);
        return this.socket;
    }
    /**
     * Get socket.io module from global scope or options.
     */
    getSocketIO() {
        if (typeof this.options.client !== 'undefined') {
            return this.options.client;
        }
        if (typeof io !== 'undefined') {
            return io;
        }
        throw new Error('Socket.io client not found. Should be globally available or passed via options.client');
    }
    /**
     * Listen for an event on a channel instance.
     */
    listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
    }
    /**
     * Get a channel instance by name.
     */
    channel(name) {
        if (!this.channels[name]) {
            this.channels[name] = new SocketIoChannel(this.socket, name, this.options);
        }
        return this.channels[name];
    }
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name) {
        if (!this.channels['private-' + name]) {
            this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
    }
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
            this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name) {
        let channels = [name, 'private-' + name, 'presence-' + name];
        channels.forEach(name => {
            this.leaveChannel(name);
        });
    }
    /**
     * Leave the given channel.
     */
    leaveChannel(name) {
        if (this.channels[name]) {
            this.channels[name].unsubscribe();
            delete this.channels[name];
        }
    }
    /**
     * Get the socket ID for the connection.
     */
    socketId() {
        return this.socket.id;
    }
    /**
     * Disconnect Socketio connection.
     */
    disconnect() {
        this.socket.disconnect();
    }
}

/**
 * This class creates a null connector.
 */
class NullConnector extends Connector {
    constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
    }
    /**
     * Create a fresh connection.
     */
    connect() {
        //
    }
    /**
     * Listen for an event on a channel instance.
     */
    listen(name, event, callback) {
        return new NullChannel();
    }
    /**
     * Get a channel instance by name.
     */
    channel(name) {
        return new NullChannel();
    }
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name) {
        return new NullPrivateChannel();
    }
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name) {
        return new NullPresenceChannel();
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name) {
        //
    }
    /**
     * Leave the given channel.
     */
    leaveChannel(name) {
        //
    }
    /**
     * Get the socket ID for the connection.
     */
    socketId() {
        return 'fake-socket-id';
    }
    /**
     * Disconnect the connection.
     */
    disconnect() {
        //
    }
}

/**
 * This class is the primary API for interacting with broadcasting.
 */
class Echo {
    /**
     * Create a new class instance.
     */
    constructor(options) {
        this.options = options;
        this.connect();
        if (!this.options.withoutInterceptors) {
            this.registerInterceptors();
        }
    }
    /**
     * Get a channel instance by name.
     */
    channel(channel) {
        return this.connector.channel(channel);
    }
    /**
     * Create a new connection.
     */
    connect() {
        if (this.options.broadcaster == 'pusher') {
            this.connector = new PusherConnector(this.options);
        }
        else if (this.options.broadcaster == 'socket.io') {
            this.connector = new SocketIoConnector(this.options);
        }
        else if (this.options.broadcaster == 'null') {
            this.connector = new NullConnector(this.options);
        }
        else if (typeof this.options.broadcaster == 'function') {
            this.connector = new this.options.broadcaster(this.options);
        }
    }
    /**
     * Disconnect from the Echo server.
     */
    disconnect() {
        this.connector.disconnect();
    }
    /**
     * Get a presence channel instance by name.
     */
    join(channel) {
        return this.connector.presenceChannel(channel);
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(channel) {
        this.connector.leave(channel);
    }
    /**
     * Leave the given channel.
     */
    leaveChannel(channel) {
        this.connector.leaveChannel(channel);
    }
    /**
     * Listen for an event on a channel instance.
     */
    listen(channel, event, callback) {
        return this.connector.listen(channel, event, callback);
    }
    /**
     * Get a private channel instance by name.
     */
    private(channel) {
        return this.connector.privateChannel(channel);
    }
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel) {
        return this.connector.encryptedPrivateChannel(channel);
    }
    /**
     * Get the Socket ID for the connection.
     */
    socketId() {
        return this.connector.socketId();
    }
    /**
     * Register 3rd party request interceptiors. These are used to automatically
     * send a connections socket id to a Laravel app with a X-Socket-Id header.
     */
    registerInterceptors() {
        if (typeof Vue === 'function' && Vue.http) {
            this.registerVueRequestInterceptor();
        }
        if (typeof axios === 'function') {
            this.registerAxiosRequestInterceptor();
        }
        if (typeof jQuery === 'function') {
            this.registerjQueryAjaxSetup();
        }
    }
    /**
     * Register a Vue HTTP interceptor to add the X-Socket-ID header.
     */
    registerVueRequestInterceptor() {
        Vue.http.interceptors.push((request, next) => {
            if (this.socketId()) {
                request.headers.set('X-Socket-ID', this.socketId());
            }
            next();
        });
    }
    /**
     * Register an Axios HTTP interceptor to add the X-Socket-ID header.
     */
    registerAxiosRequestInterceptor() {
        axios.interceptors.request.use((config) => {
            if (this.socketId()) {
                config.headers['X-Socket-Id'] = this.socketId();
            }
            return config;
        });
    }
    /**
     * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
     */
    registerjQueryAjaxSetup() {
        if (typeof jQuery.ajax != 'undefined') {
            jQuery.ajaxPrefilter((options, originalOptions, xhr) => {
                if (this.socketId()) {
                    xhr.setRequestHeader('X-Socket-Id', this.socketId());
                }
            });
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Echo);


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/pusher-js/dist/web/pusher.js":
/*!***************************************************!*\
  !*** ./node_modules/pusher-js/dist/web/pusher.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Pusher JavaScript Library v6.0.2
 * https://pusher.com/
 *
 * Copyright 2017, Pusher
 * Released under the MIT licence.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Package base64 implements Base64 encoding and decoding.
 */
// Invalid character used in decoding to indicate
// that the character to decode is out of range of
// alphabet and cannot be decoded.
var INVALID_BYTE = 256;
/**
 * Implements standard Base64 encoding.
 *
 * Operates in constant time.
 */
var Coder = /** @class */ (function () {
    // TODO(dchest): methods to encode chunk-by-chunk.
    function Coder(_paddingCharacter) {
        if (_paddingCharacter === void 0) { _paddingCharacter = "="; }
        this._paddingCharacter = _paddingCharacter;
    }
    Coder.prototype.encodedLength = function (length) {
        if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
        }
        return (length + 2) / 3 * 4 | 0;
    };
    Coder.prototype.encode = function (data) {
        var out = "";
        var i = 0;
        for (; i < data.length - 2; i += 3) {
            var c = (data[i] << 16) | (data[i + 1] << 8) | (data[i + 2]);
            out += this._encodeByte((c >>> 3 * 6) & 63);
            out += this._encodeByte((c >>> 2 * 6) & 63);
            out += this._encodeByte((c >>> 1 * 6) & 63);
            out += this._encodeByte((c >>> 0 * 6) & 63);
        }
        var left = data.length - i;
        if (left > 0) {
            var c = (data[i] << 16) | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte((c >>> 3 * 6) & 63);
            out += this._encodeByte((c >>> 2 * 6) & 63);
            if (left === 2) {
                out += this._encodeByte((c >>> 1 * 6) & 63);
            }
            else {
                out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
        }
        return out;
    };
    Coder.prototype.maxDecodedLength = function (length) {
        if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
        }
        return length / 4 * 3 | 0;
    };
    Coder.prototype.decodedLength = function (s) {
        return this.maxDecodedLength(s.length - this._getPaddingLength(s));
    };
    Coder.prototype.decode = function (s) {
        if (s.length === 0) {
            return new Uint8Array(0);
        }
        var paddingLength = this._getPaddingLength(s);
        var length = s.length - paddingLength;
        var out = new Uint8Array(this.maxDecodedLength(length));
        var op = 0;
        var i = 0;
        var haveBad = 0;
        var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
        for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = (v0 << 2) | (v1 >>> 4);
            out[op++] = (v1 << 4) | (v2 >>> 2);
            out[op++] = (v2 << 6) | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
        }
        if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = (v0 << 2) | (v1 >>> 4);
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
        }
        if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = (v1 << 4) | (v2 >>> 2);
            haveBad |= v2 & INVALID_BYTE;
        }
        if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = (v2 << 6) | v3;
            haveBad |= v3 & INVALID_BYTE;
        }
        if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
        }
        return out;
    };
    // Standard encoding have the following encoded/decoded ranges,
    // which we need to convert between.
    //
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
    // Index:   0 - 25                    26 - 51              52 - 61   62  63
    // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
    //
    // Encode 6 bits in b into a new character.
    Coder.prototype._encodeByte = function (b) {
        // Encoding uses constant time operations as follows:
        //
        // 1. Define comparison of A with B using (A - B) >>> 8:
        //          if A > B, then result is positive integer
        //          if A <= B, then result is 0
        //
        // 2. Define selection of C or 0 using bitwise AND: X & C:
        //          if X == 0, then result is 0
        //          if X != 0, then result is C
        //
        // 3. Start with the smallest comparison (b >= 0), which is always
        //    true, so set the result to the starting ASCII value (65).
        //
        // 4. Continue comparing b to higher ASCII values, and selecting
        //    zero if comparison isn't true, otherwise selecting a value
        //    to add to result, which:
        //
        //          a) undoes the previous addition
        //          b) provides new value to add
        //
        var result = b;
        // b >= 0
        result += 65;
        // b > 25
        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
        // b > 51
        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
        // b > 61
        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 43);
        // b > 62
        result += ((62 - b) >>> 8) & ((62 - 43) - 63 + 47);
        return String.fromCharCode(result);
    };
    // Decode a character code into a byte.
    // Must return 256 if character is out of alphabet range.
    Coder.prototype._decodeChar = function (c) {
        // Decoding works similar to encoding: using the same comparison
        // function, but now it works on ranges: result is always incremented
        // by value, but this value becomes zero if the range is not
        // satisfied.
        //
        // Decoding starts with invalid value, 256, which is then
        // subtracted when the range is satisfied. If none of the ranges
        // apply, the function returns 256, which is then checked by
        // the caller to throw error.
        var result = INVALID_BYTE; // start with invalid character
        // c == 43 (c > 42 and c < 44)
        result += (((42 - c) & (c - 44)) >>> 8) & (-INVALID_BYTE + c - 43 + 62);
        // c == 47 (c > 46 and c < 48)
        result += (((46 - c) & (c - 48)) >>> 8) & (-INVALID_BYTE + c - 47 + 63);
        // c > 47 and c < 58
        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
        // c > 64 and c < 91
        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
        // c > 96 and c < 123
        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
        return result;
    };
    Coder.prototype._getPaddingLength = function (s) {
        var paddingLength = 0;
        if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] !== this._paddingCharacter) {
                    break;
                }
                paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
                throw new Error("Base64Coder: incorrect padding");
            }
        }
        return paddingLength;
    };
    return Coder;
}());
exports.Coder = Coder;
var stdCoder = new Coder();
function encode(data) {
    return stdCoder.encode(data);
}
exports.encode = encode;
function decode(s) {
    return stdCoder.decode(s);
}
exports.decode = decode;
/**
 * Implements URL-safe Base64 encoding.
 * (Same as Base64, but '+' is replaced with '-', and '/' with '_').
 *
 * Operates in constant time.
 */
var URLSafeCoder = /** @class */ (function (_super) {
    __extends(URLSafeCoder, _super);
    function URLSafeCoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // URL-safe encoding have the following encoded/decoded ranges:
    //
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -   _
    // Index:   0 - 25                    26 - 51              52 - 61   62  63
    // ASCII:  65 - 90                    97 - 122             48 - 57   45  95
    //
    URLSafeCoder.prototype._encodeByte = function (b) {
        var result = b;
        // b >= 0
        result += 65;
        // b > 25
        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
        // b > 51
        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
        // b > 61
        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 45);
        // b > 62
        result += ((62 - b) >>> 8) & ((62 - 45) - 63 + 95);
        return String.fromCharCode(result);
    };
    URLSafeCoder.prototype._decodeChar = function (c) {
        var result = INVALID_BYTE;
        // c == 45 (c > 44 and c < 46)
        result += (((44 - c) & (c - 46)) >>> 8) & (-INVALID_BYTE + c - 45 + 62);
        // c == 95 (c > 94 and c < 96)
        result += (((94 - c) & (c - 96)) >>> 8) & (-INVALID_BYTE + c - 95 + 63);
        // c > 47 and c < 58
        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
        // c > 64 and c < 91
        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
        // c > 96 and c < 123
        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
        return result;
    };
    return URLSafeCoder;
}(Coder));
exports.URLSafeCoder = URLSafeCoder;
var urlSafeCoder = new URLSafeCoder();
function encodeURLSafe(data) {
    return urlSafeCoder.encode(data);
}
exports.encodeURLSafe = encodeURLSafe;
function decodeURLSafe(s) {
    return urlSafeCoder.decode(s);
}
exports.decodeURLSafe = decodeURLSafe;
exports.encodedLength = function (length) {
    return stdCoder.encodedLength(length);
};
exports.maxDecodedLength = function (length) {
    return stdCoder.maxDecodedLength(length);
};
exports.decodedLength = function (s) {
    return stdCoder.decodedLength(s);
};
//# sourceMappingURL=base64.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Package utf8 implements UTF-8 encoding and decoding.
 */
var INVALID_UTF16 = "utf8: invalid string";
var INVALID_UTF8 = "utf8: invalid source encoding";
/**
 * Encodes the given string into UTF-8 byte array.
 * Throws if the source string has invalid UTF-16 encoding.
 */
function encode(s) {
    // Calculate result length and allocate output array.
    // encodedLength() also validates string and throws errors,
    // so we don't need repeat validation here.
    var arr = new Uint8Array(encodedLength(s));
    var pos = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c < 0x80) {
            arr[pos++] = c;
        }
        else if (c < 0x800) {
            arr[pos++] = 0xc0 | c >> 6;
            arr[pos++] = 0x80 | c & 0x3f;
        }
        else if (c < 0xd800) {
            arr[pos++] = 0xe0 | c >> 12;
            arr[pos++] = 0x80 | (c >> 6) & 0x3f;
            arr[pos++] = 0x80 | c & 0x3f;
        }
        else {
            i++; // get one more character
            c = (c & 0x3ff) << 10;
            c |= s.charCodeAt(i) & 0x3ff;
            c += 0x10000;
            arr[pos++] = 0xf0 | c >> 18;
            arr[pos++] = 0x80 | (c >> 12) & 0x3f;
            arr[pos++] = 0x80 | (c >> 6) & 0x3f;
            arr[pos++] = 0x80 | c & 0x3f;
        }
    }
    return arr;
}
exports.encode = encode;
/**
 * Returns the number of bytes required to encode the given string into UTF-8.
 * Throws if the source string has invalid UTF-16 encoding.
 */
function encodedLength(s) {
    var result = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c < 0x80) {
            result += 1;
        }
        else if (c < 0x800) {
            result += 2;
        }
        else if (c < 0xd800) {
            result += 3;
        }
        else if (c <= 0xdfff) {
            if (i >= s.length - 1) {
                throw new Error(INVALID_UTF16);
            }
            i++; // "eat" next character
            result += 4;
        }
        else {
            throw new Error(INVALID_UTF16);
        }
    }
    return result;
}
exports.encodedLength = encodedLength;
/**
 * Decodes the given byte array from UTF-8 into a string.
 * Throws if encoding is invalid.
 */
function decode(arr) {
    var chars = [];
    for (var i = 0; i < arr.length; i++) {
        var b = arr[i];
        if (b & 0x80) {
            var min = void 0;
            if (b < 0xe0) {
                // Need 1 more byte.
                if (i >= arr.length) {
                    throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                if ((n1 & 0xc0) !== 0x80) {
                    throw new Error(INVALID_UTF8);
                }
                b = (b & 0x1f) << 6 | (n1 & 0x3f);
                min = 0x80;
            }
            else if (b < 0xf0) {
                // Need 2 more bytes.
                if (i >= arr.length - 1) {
                    throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                var n2 = arr[++i];
                if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80) {
                    throw new Error(INVALID_UTF8);
                }
                b = (b & 0x0f) << 12 | (n1 & 0x3f) << 6 | (n2 & 0x3f);
                min = 0x800;
            }
            else if (b < 0xf8) {
                // Need 3 more bytes.
                if (i >= arr.length - 2) {
                    throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                var n2 = arr[++i];
                var n3 = arr[++i];
                if ((n1 & 0xc0) !== 0x80 || (n2 & 0xc0) !== 0x80 || (n3 & 0xc0) !== 0x80) {
                    throw new Error(INVALID_UTF8);
                }
                b = (b & 0x0f) << 18 | (n1 & 0x3f) << 12 | (n2 & 0x3f) << 6 | (n3 & 0x3f);
                min = 0x10000;
            }
            else {
                throw new Error(INVALID_UTF8);
            }
            if (b < min || (b >= 0xd800 && b <= 0xdfff)) {
                throw new Error(INVALID_UTF8);
            }
            if (b >= 0x10000) {
                // Surrogate pair.
                if (b > 0x10ffff) {
                    throw new Error(INVALID_UTF8);
                }
                b -= 0x10000;
                chars.push(String.fromCharCode(0xd800 | (b >> 10)));
                b = 0xdc00 | (b & 0x3ff);
            }
        }
        chars.push(String.fromCharCode(b));
    }
    return chars.join("");
}
exports.decode = decode;
//# sourceMappingURL=utf8.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// required so we don't have to do require('pusher').default etc.
module.exports = __webpack_require__(3).default;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/runtimes/web/dom/script_receiver_factory.ts
var ScriptReceiverFactory = (function () {
    function ScriptReceiverFactory(prefix, name) {
        this.lastId = 0;
        this.prefix = prefix;
        this.name = name;
    }
    ScriptReceiverFactory.prototype.create = function (callback) {
        this.lastId++;
        var number = this.lastId;
        var id = this.prefix + number;
        var name = this.name + '[' + number + ']';
        var called = false;
        var callbackWrapper = function () {
            if (!called) {
                callback.apply(null, arguments);
                called = true;
            }
        };
        this[number] = callbackWrapper;
        return { number: number, id: id, name: name, callback: callbackWrapper };
    };
    ScriptReceiverFactory.prototype.remove = function (receiver) {
        delete this[receiver.number];
    };
    return ScriptReceiverFactory;
}());

var ScriptReceivers = new ScriptReceiverFactory('_pusher_script_', 'Pusher.ScriptReceivers');

// CONCATENATED MODULE: ./src/core/defaults.ts
var Defaults = {
    VERSION: "6.0.2",
    PROTOCOL: 7,
    wsPort: 80,
    wssPort: 443,
    wsPath: '',
    httpHost: 'sockjs.pusher.com',
    httpPort: 80,
    httpsPort: 443,
    httpPath: '/pusher',
    stats_host: 'stats.pusher.com',
    authEndpoint: '/pusher/auth',
    authTransport: 'ajax',
    activityTimeout: 120000,
    pongTimeout: 30000,
    unavailableTimeout: 10000,
    cluster: 'mt1',
    cdn_http: "http://js.pusher.com",
    cdn_https: "https://js.pusher.com",
    dependency_suffix: ""
};
/* harmony default export */ var defaults = (Defaults);

// CONCATENATED MODULE: ./src/runtimes/web/dom/dependency_loader.ts


var dependency_loader_DependencyLoader = (function () {
    function DependencyLoader(options) {
        this.options = options;
        this.receivers = options.receivers || ScriptReceivers;
        this.loading = {};
    }
    DependencyLoader.prototype.load = function (name, options, callback) {
        var self = this;
        if (self.loading[name] && self.loading[name].length > 0) {
            self.loading[name].push(callback);
        }
        else {
            self.loading[name] = [callback];
            var request = runtime.createScriptRequest(self.getPath(name, options));
            var receiver = self.receivers.create(function (error) {
                self.receivers.remove(receiver);
                if (self.loading[name]) {
                    var callbacks = self.loading[name];
                    delete self.loading[name];
                    var successCallback = function (wasSuccessful) {
                        if (!wasSuccessful) {
                            request.cleanup();
                        }
                    };
                    for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i](error, successCallback);
                    }
                }
            });
            request.send(receiver);
        }
    };
    DependencyLoader.prototype.getRoot = function (options) {
        var cdn;
        var protocol = runtime.getDocument().location.protocol;
        if ((options && options.useTLS) || protocol === 'https:') {
            cdn = this.options.cdn_https;
        }
        else {
            cdn = this.options.cdn_http;
        }
        return cdn.replace(/\/*$/, '') + '/' + this.options.version;
    };
    DependencyLoader.prototype.getPath = function (name, options) {
        return this.getRoot(options) + '/' + name + this.options.suffix + '.js';
    };
    return DependencyLoader;
}());
/* harmony default export */ var dependency_loader = (dependency_loader_DependencyLoader);

// CONCATENATED MODULE: ./src/runtimes/web/dom/dependencies.ts



var DependenciesReceivers = new ScriptReceiverFactory('_pusher_dependencies', 'Pusher.DependenciesReceivers');
var Dependencies = new dependency_loader({
    cdn_http: defaults.cdn_http,
    cdn_https: defaults.cdn_https,
    version: defaults.VERSION,
    suffix: defaults.dependency_suffix,
    receivers: DependenciesReceivers
});

// CONCATENATED MODULE: ./src/core/base64.ts
function encode(s) {
    return btoa(utob(s));
}
var fromCharCode = String.fromCharCode;
var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var b64tab = {};
for (var base64_i = 0, l = b64chars.length; base64_i < l; base64_i++) {
    b64tab[b64chars.charAt(base64_i)] = base64_i;
}
var cb_utob = function (c) {
    var cc = c.charCodeAt(0);
    return cc < 0x80
        ? c
        : cc < 0x800
            ? fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))
            : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
                fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                fromCharCode(0x80 | (cc & 0x3f));
};
var utob = function (u) {
    return u.replace(/[^\x00-\x7F]/g, cb_utob);
};
var cb_encode = function (ccc) {
    var padlen = [0, 2, 1][ccc.length % 3];
    var ord = (ccc.charCodeAt(0) << 16) |
        ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) |
        (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
    var chars = [
        b64chars.charAt(ord >>> 18),
        b64chars.charAt((ord >>> 12) & 63),
        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
    ];
    return chars.join('');
};
var btoa = window.btoa ||
    function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };

// CONCATENATED MODULE: ./src/core/utils/timers/abstract_timer.ts
var Timer = (function () {
    function Timer(set, clear, delay, callback) {
        var _this = this;
        this.clear = clear;
        this.timer = set(function () {
            if (_this.timer) {
                _this.timer = callback(_this.timer);
            }
        }, delay);
    }
    Timer.prototype.isRunning = function () {
        return this.timer !== null;
    };
    Timer.prototype.ensureAborted = function () {
        if (this.timer) {
            this.clear(this.timer);
            this.timer = null;
        }
    };
    return Timer;
}());
/* harmony default export */ var abstract_timer = (Timer);

// CONCATENATED MODULE: ./src/core/utils/timers/index.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

function timers_clearTimeout(timer) {
    window.clearTimeout(timer);
}
function timers_clearInterval(timer) {
    window.clearInterval(timer);
}
var OneOffTimer = (function (_super) {
    __extends(OneOffTimer, _super);
    function OneOffTimer(delay, callback) {
        return _super.call(this, setTimeout, timers_clearTimeout, delay, function (timer) {
            callback();
            return null;
        }) || this;
    }
    return OneOffTimer;
}(abstract_timer));

var PeriodicTimer = (function (_super) {
    __extends(PeriodicTimer, _super);
    function PeriodicTimer(delay, callback) {
        return _super.call(this, setInterval, timers_clearInterval, delay, function (timer) {
            callback();
            return timer;
        }) || this;
    }
    return PeriodicTimer;
}(abstract_timer));


// CONCATENATED MODULE: ./src/core/util.ts

var Util = {
    now: function () {
        if (Date.now) {
            return Date.now();
        }
        else {
            return new Date().valueOf();
        }
    },
    defer: function (callback) {
        return new OneOffTimer(0, callback);
    },
    method: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var boundArguments = Array.prototype.slice.call(arguments, 1);
        return function (object) {
            return object[name].apply(object, boundArguments.concat(arguments));
        };
    }
};
/* harmony default export */ var util = (Util);

// CONCATENATED MODULE: ./src/core/utils/collections.ts


function extend(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
        var extensions = sources[i];
        for (var property in extensions) {
            if (extensions[property] &&
                extensions[property].constructor &&
                extensions[property].constructor === Object) {
                target[property] = extend(target[property] || {}, extensions[property]);
            }
            else {
                target[property] = extensions[property];
            }
        }
    }
    return target;
}
function stringify() {
    var m = ['Pusher'];
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') {
            m.push(arguments[i]);
        }
        else {
            m.push(safeJSONStringify(arguments[i]));
        }
    }
    return m.join(' : ');
}
function arrayIndexOf(array, item) {
    var nativeIndexOf = Array.prototype.indexOf;
    if (array === null) {
        return -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) {
        return array.indexOf(item);
    }
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
}
function objectApply(object, f) {
    for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            f(object[key], key, object);
        }
    }
}
function keys(object) {
    var keys = [];
    objectApply(object, function (_, key) {
        keys.push(key);
    });
    return keys;
}
function values(object) {
    var values = [];
    objectApply(object, function (value) {
        values.push(value);
    });
    return values;
}
function apply(array, f, context) {
    for (var i = 0; i < array.length; i++) {
        f.call(context || window, array[i], i, array);
    }
}
function map(array, f) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(f(array[i], i, array, result));
    }
    return result;
}
function mapObject(object, f) {
    var result = {};
    objectApply(object, function (value, key) {
        result[key] = f(value);
    });
    return result;
}
function filter(array, test) {
    test =
        test ||
            function (value) {
                return !!value;
            };
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i], i, array, result)) {
            result.push(array[i]);
        }
    }
    return result;
}
function filterObject(object, test) {
    var result = {};
    objectApply(object, function (value, key) {
        if ((test && test(value, key, object, result)) || Boolean(value)) {
            result[key] = value;
        }
    });
    return result;
}
function flatten(object) {
    var result = [];
    objectApply(object, function (value, key) {
        result.push([key, value]);
    });
    return result;
}
function any(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (test(array[i], i, array)) {
            return true;
        }
    }
    return false;
}
function collections_all(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (!test(array[i], i, array)) {
            return false;
        }
    }
    return true;
}
function encodeParamsObject(data) {
    return mapObject(data, function (value) {
        if (typeof value === 'object') {
            value = safeJSONStringify(value);
        }
        return encodeURIComponent(encode(value.toString()));
    });
}
function buildQueryString(data) {
    var params = filterObject(data, function (value) {
        return value !== undefined;
    });
    var query = map(flatten(encodeParamsObject(params)), util.method('join', '=')).join('&');
    return query;
}
function decycleObject(object) {
    var objects = [], paths = [];
    return (function derez(value, path) {
        var i, name, nu;
        switch (typeof value) {
            case 'object':
                if (!value) {
                    return null;
                }
                for (i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return { $ref: paths[i] };
                    }
                }
                objects.push(value);
                paths.push(path);
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                }
                else {
                    nu = {};
                    for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            case 'number':
            case 'string':
            case 'boolean':
                return value;
        }
    })(object, '$');
}
function safeJSONStringify(source) {
    try {
        return JSON.stringify(source);
    }
    catch (e) {
        return JSON.stringify(decycleObject(source));
    }
}

// CONCATENATED MODULE: ./src/core/logger.ts


var logger_Logger = (function () {
    function Logger() {
        this.globalLog = function (message) {
            if (window.console && window.console.log) {
                window.console.log(message);
            }
        };
    }
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(this.globalLog, args);
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(this.globalLogWarn, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log(this.globalLogError, args);
    };
    Logger.prototype.globalLogWarn = function (message) {
        if (window.console && window.console.warn) {
            window.console.warn(message);
        }
        else {
            this.globalLog(message);
        }
    };
    Logger.prototype.globalLogError = function (message) {
        if (window.console && window.console.error) {
            window.console.error(message);
        }
        else {
            this.globalLogWarn(message);
        }
    };
    Logger.prototype.log = function (defaultLoggingFunction) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var message = stringify.apply(this, arguments);
        if (core_pusher.log) {
            core_pusher.log(message);
        }
        else if (core_pusher.logToConsole) {
            var log = defaultLoggingFunction.bind(this);
            log(message);
        }
    };
    return Logger;
}());
/* harmony default export */ var logger = (new logger_Logger());

// CONCATENATED MODULE: ./src/core/utils/url_store.ts
var urlStore = {
    baseUrl: 'https://pusher.com',
    urls: {
        authenticationEndpoint: {
            path: '/docs/authenticating_users'
        },
        javascriptQuickStart: {
            path: '/docs/javascript_quick_start'
        },
        triggeringClientEvents: {
            path: '/docs/client_api_guide/client_events#trigger-events'
        },
        encryptedChannelSupport: {
            fullUrl: 'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support'
        }
    }
};
var buildLogSuffix = function (key) {
    var urlPrefix = 'See:';
    var urlObj = urlStore.urls[key];
    if (!urlObj)
        return '';
    var url;
    if (urlObj.fullUrl) {
        url = urlObj.fullUrl;
    }
    else if (urlObj.path) {
        url = urlStore.baseUrl + urlObj.path;
    }
    if (!url)
        return '';
    return urlPrefix + " " + url;
};
/* harmony default export */ var url_store = ({ buildLogSuffix: buildLogSuffix });

// CONCATENATED MODULE: ./src/runtimes/isomorphic/auth/xhr_auth.ts



var ajax = function (context, socketId, callback) {
    var self = this, xhr;
    xhr = runtime.createXHR();
    xhr.open('POST', self.options.authEndpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    for (var headerName in this.authOptions.headers) {
        xhr.setRequestHeader(headerName, this.authOptions.headers[headerName]);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data, parsed = false;
                try {
                    data = JSON.parse(xhr.responseText);
                    parsed = true;
                }
                catch (e) {
                    callback(true, 'JSON returned from auth endpoint was invalid, yet status code was 200. Data was: ' +
                        xhr.responseText);
                }
                if (parsed) {
                    callback(false, data);
                }
            }
            else {
                var suffix = url_store.buildLogSuffix('authenticationEndpoint');
                logger.error('Unable to retrieve auth string from auth endpoint - ' +
                    ("received status " + xhr.status + " from " + self.options.authEndpoint + ". ") +
                    ("Clients must be authenticated to join private or presence channels. " + suffix));
                callback(true, xhr.status);
            }
        }
    };
    xhr.send(this.composeQuery(socketId));
    return xhr;
};
/* harmony default export */ var xhr_auth = (ajax);

// CONCATENATED MODULE: ./src/runtimes/web/auth/jsonp_auth.ts

var jsonp = function (context, socketId, callback) {
    if (this.authOptions.headers !== undefined) {
        logger.warn('To send headers with the auth request, you must use AJAX, rather than JSONP.');
    }
    var callbackName = context.nextAuthCallbackID.toString();
    context.nextAuthCallbackID++;
    var document = context.getDocument();
    var script = document.createElement('script');
    context.auth_callbacks[callbackName] = function (data) {
        callback(false, data);
    };
    var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
    script.src =
        this.options.authEndpoint +
            '?callback=' +
            encodeURIComponent(callback_name) +
            '&' +
            this.composeQuery(socketId);
    var head = document.getElementsByTagName('head')[0] || document.documentElement;
    head.insertBefore(script, head.firstChild);
};
/* harmony default export */ var jsonp_auth = (jsonp);

// CONCATENATED MODULE: ./src/runtimes/web/dom/script_request.ts
var ScriptRequest = (function () {
    function ScriptRequest(src) {
        this.src = src;
    }
    ScriptRequest.prototype.send = function (receiver) {
        var self = this;
        var errorString = 'Error loading ' + self.src;
        self.script = document.createElement('script');
        self.script.id = receiver.id;
        self.script.src = self.src;
        self.script.type = 'text/javascript';
        self.script.charset = 'UTF-8';
        if (self.script.addEventListener) {
            self.script.onerror = function () {
                receiver.callback(errorString);
            };
            self.script.onload = function () {
                receiver.callback(null);
            };
        }
        else {
            self.script.onreadystatechange = function () {
                if (self.script.readyState === 'loaded' ||
                    self.script.readyState === 'complete') {
                    receiver.callback(null);
                }
            };
        }
        if (self.script.async === undefined &&
            document.attachEvent &&
            /opera/i.test(navigator.userAgent)) {
            self.errorScript = document.createElement('script');
            self.errorScript.id = receiver.id + '_error';
            self.errorScript.text = receiver.name + "('" + errorString + "');";
            self.script.async = self.errorScript.async = false;
        }
        else {
            self.script.async = true;
        }
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(self.script, head.firstChild);
        if (self.errorScript) {
            head.insertBefore(self.errorScript, self.script.nextSibling);
        }
    };
    ScriptRequest.prototype.cleanup = function () {
        if (this.script) {
            this.script.onload = this.script.onerror = null;
            this.script.onreadystatechange = null;
        }
        if (this.script && this.script.parentNode) {
            this.script.parentNode.removeChild(this.script);
        }
        if (this.errorScript && this.errorScript.parentNode) {
            this.errorScript.parentNode.removeChild(this.errorScript);
        }
        this.script = null;
        this.errorScript = null;
    };
    return ScriptRequest;
}());
/* harmony default export */ var script_request = (ScriptRequest);

// CONCATENATED MODULE: ./src/runtimes/web/dom/jsonp_request.ts


var jsonp_request_JSONPRequest = (function () {
    function JSONPRequest(url, data) {
        this.url = url;
        this.data = data;
    }
    JSONPRequest.prototype.send = function (receiver) {
        if (this.request) {
            return;
        }
        var query = buildQueryString(this.data);
        var url = this.url + '/' + receiver.number + '?' + query;
        this.request = runtime.createScriptRequest(url);
        this.request.send(receiver);
    };
    JSONPRequest.prototype.cleanup = function () {
        if (this.request) {
            this.request.cleanup();
        }
    };
    return JSONPRequest;
}());
/* harmony default export */ var jsonp_request = (jsonp_request_JSONPRequest);

// CONCATENATED MODULE: ./src/runtimes/web/timeline/jsonp_timeline.ts


var getAgent = function (sender, useTLS) {
    return function (data, callback) {
        var scheme = 'http' + (useTLS ? 's' : '') + '://';
        var url = scheme + (sender.host || sender.options.host) + sender.options.path;
        var request = runtime.createJSONPRequest(url, data);
        var receiver = runtime.ScriptReceivers.create(function (error, result) {
            ScriptReceivers.remove(receiver);
            request.cleanup();
            if (result && result.host) {
                sender.host = result.host;
            }
            if (callback) {
                callback(error, result);
            }
        });
        request.send(receiver);
    };
};
var jsonp_timeline_jsonp = {
    name: 'jsonp',
    getAgent: getAgent
};
/* harmony default export */ var jsonp_timeline = (jsonp_timeline_jsonp);

// CONCATENATED MODULE: ./src/core/transports/url_schemes.ts

function getGenericURL(baseScheme, params, path) {
    var scheme = baseScheme + (params.useTLS ? 's' : '');
    var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
    return scheme + '://' + host + path;
}
function getGenericPath(key, queryString) {
    var path = '/app/' + key;
    var query = '?protocol=' +
        defaults.PROTOCOL +
        '&client=js' +
        '&version=' +
        defaults.VERSION +
        (queryString ? '&' + queryString : '');
    return path + query;
}
var ws = {
    getInitial: function (key, params) {
        var path = (params.httpPath || '') + getGenericPath(key, 'flash=false');
        return getGenericURL('ws', params, path);
    }
};
var http = {
    getInitial: function (key, params) {
        var path = (params.httpPath || '/pusher') + getGenericPath(key);
        return getGenericURL('http', params, path);
    }
};
var sockjs = {
    getInitial: function (key, params) {
        return getGenericURL('http', params, params.httpPath || '/pusher');
    },
    getPath: function (key, params) {
        return getGenericPath(key);
    }
};

// CONCATENATED MODULE: ./src/core/events/callback_registry.ts

var callback_registry_CallbackRegistry = (function () {
    function CallbackRegistry() {
        this._callbacks = {};
    }
    CallbackRegistry.prototype.get = function (name) {
        return this._callbacks[prefix(name)];
    };
    CallbackRegistry.prototype.add = function (name, callback, context) {
        var prefixedEventName = prefix(name);
        this._callbacks[prefixedEventName] =
            this._callbacks[prefixedEventName] || [];
        this._callbacks[prefixedEventName].push({
            fn: callback,
            context: context
        });
    };
    CallbackRegistry.prototype.remove = function (name, callback, context) {
        if (!name && !callback && !context) {
            this._callbacks = {};
            return;
        }
        var names = name ? [prefix(name)] : keys(this._callbacks);
        if (callback || context) {
            this.removeCallback(names, callback, context);
        }
        else {
            this.removeAllCallbacks(names);
        }
    };
    CallbackRegistry.prototype.removeCallback = function (names, callback, context) {
        apply(names, function (name) {
            this._callbacks[name] = filter(this._callbacks[name] || [], function (binding) {
                return ((callback && callback !== binding.fn) ||
                    (context && context !== binding.context));
            });
            if (this._callbacks[name].length === 0) {
                delete this._callbacks[name];
            }
        }, this);
    };
    CallbackRegistry.prototype.removeAllCallbacks = function (names) {
        apply(names, function (name) {
            delete this._callbacks[name];
        }, this);
    };
    return CallbackRegistry;
}());
/* harmony default export */ var callback_registry = (callback_registry_CallbackRegistry);
function prefix(name) {
    return '_' + name;
}

// CONCATENATED MODULE: ./src/core/events/dispatcher.ts


var dispatcher_Dispatcher = (function () {
    function Dispatcher(failThrough) {
        this.callbacks = new callback_registry();
        this.global_callbacks = [];
        this.failThrough = failThrough;
    }
    Dispatcher.prototype.bind = function (eventName, callback, context) {
        this.callbacks.add(eventName, callback, context);
        return this;
    };
    Dispatcher.prototype.bind_global = function (callback) {
        this.global_callbacks.push(callback);
        return this;
    };
    Dispatcher.prototype.unbind = function (eventName, callback, context) {
        this.callbacks.remove(eventName, callback, context);
        return this;
    };
    Dispatcher.prototype.unbind_global = function (callback) {
        if (!callback) {
            this.global_callbacks = [];
            return this;
        }
        this.global_callbacks = filter(this.global_callbacks || [], function (c) { return c !== callback; });
        return this;
    };
    Dispatcher.prototype.unbind_all = function () {
        this.unbind();
        this.unbind_global();
        return this;
    };
    Dispatcher.prototype.emit = function (eventName, data, metadata) {
        for (var i = 0; i < this.global_callbacks.length; i++) {
            this.global_callbacks[i](eventName, data);
        }
        var callbacks = this.callbacks.get(eventName);
        var args = [];
        if (metadata) {
            args.push(data, metadata);
        }
        else if (data) {
            args.push(data);
        }
        if (callbacks && callbacks.length > 0) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].fn.apply(callbacks[i].context || window, args);
            }
        }
        else if (this.failThrough) {
            this.failThrough(eventName, data);
        }
        return this;
    };
    return Dispatcher;
}());
/* harmony default export */ var dispatcher = (dispatcher_Dispatcher);

// CONCATENATED MODULE: ./src/core/transports/transport_connection.ts
var transport_connection_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var transport_connection_TransportConnection = (function (_super) {
    transport_connection_extends(TransportConnection, _super);
    function TransportConnection(hooks, name, priority, key, options) {
        var _this = _super.call(this) || this;
        _this.initialize = runtime.transportConnectionInitializer;
        _this.hooks = hooks;
        _this.name = name;
        _this.priority = priority;
        _this.key = key;
        _this.options = options;
        _this.state = 'new';
        _this.timeline = options.timeline;
        _this.activityTimeout = options.activityTimeout;
        _this.id = _this.timeline.generateUniqueID();
        return _this;
    }
    TransportConnection.prototype.handlesActivityChecks = function () {
        return Boolean(this.hooks.handlesActivityChecks);
    };
    TransportConnection.prototype.supportsPing = function () {
        return Boolean(this.hooks.supportsPing);
    };
    TransportConnection.prototype.connect = function () {
        var _this = this;
        if (this.socket || this.state !== 'initialized') {
            return false;
        }
        var url = this.hooks.urls.getInitial(this.key, this.options);
        try {
            this.socket = this.hooks.getSocket(url, this.options);
        }
        catch (e) {
            util.defer(function () {
                _this.onError(e);
                _this.changeState('closed');
            });
            return false;
        }
        this.bindListeners();
        logger.debug('Connecting', { transport: this.name, url: url });
        this.changeState('connecting');
        return true;
    };
    TransportConnection.prototype.close = function () {
        if (this.socket) {
            this.socket.close();
            return true;
        }
        else {
            return false;
        }
    };
    TransportConnection.prototype.send = function (data) {
        var _this = this;
        if (this.state === 'open') {
            util.defer(function () {
                if (_this.socket) {
                    _this.socket.send(data);
                }
            });
            return true;
        }
        else {
            return false;
        }
    };
    TransportConnection.prototype.ping = function () {
        if (this.state === 'open' && this.supportsPing()) {
            this.socket.ping();
        }
    };
    TransportConnection.prototype.onOpen = function () {
        if (this.hooks.beforeOpen) {
            this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
        }
        this.changeState('open');
        this.socket.onopen = undefined;
    };
    TransportConnection.prototype.onError = function (error) {
        this.emit('error', { type: 'WebSocketError', error: error });
        this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
    };
    TransportConnection.prototype.onClose = function (closeEvent) {
        if (closeEvent) {
            this.changeState('closed', {
                code: closeEvent.code,
                reason: closeEvent.reason,
                wasClean: closeEvent.wasClean
            });
        }
        else {
            this.changeState('closed');
        }
        this.unbindListeners();
        this.socket = undefined;
    };
    TransportConnection.prototype.onMessage = function (message) {
        this.emit('message', message);
    };
    TransportConnection.prototype.onActivity = function () {
        this.emit('activity');
    };
    TransportConnection.prototype.bindListeners = function () {
        var _this = this;
        this.socket.onopen = function () {
            _this.onOpen();
        };
        this.socket.onerror = function (error) {
            _this.onError(error);
        };
        this.socket.onclose = function (closeEvent) {
            _this.onClose(closeEvent);
        };
        this.socket.onmessage = function (message) {
            _this.onMessage(message);
        };
        if (this.supportsPing()) {
            this.socket.onactivity = function () {
                _this.onActivity();
            };
        }
    };
    TransportConnection.prototype.unbindListeners = function () {
        if (this.socket) {
            this.socket.onopen = undefined;
            this.socket.onerror = undefined;
            this.socket.onclose = undefined;
            this.socket.onmessage = undefined;
            if (this.supportsPing()) {
                this.socket.onactivity = undefined;
            }
        }
    };
    TransportConnection.prototype.changeState = function (state, params) {
        this.state = state;
        this.timeline.info(this.buildTimelineMessage({
            state: state,
            params: params
        }));
        this.emit(state, params);
    };
    TransportConnection.prototype.buildTimelineMessage = function (message) {
        return extend({ cid: this.id }, message);
    };
    return TransportConnection;
}(dispatcher));
/* harmony default export */ var transport_connection = (transport_connection_TransportConnection);

// CONCATENATED MODULE: ./src/core/transports/transport.ts

var transport_Transport = (function () {
    function Transport(hooks) {
        this.hooks = hooks;
    }
    Transport.prototype.isSupported = function (environment) {
        return this.hooks.isSupported(environment);
    };
    Transport.prototype.createConnection = function (name, priority, key, options) {
        return new transport_connection(this.hooks, name, priority, key, options);
    };
    return Transport;
}());
/* harmony default export */ var transports_transport = (transport_Transport);

// CONCATENATED MODULE: ./src/runtimes/isomorphic/transports/transports.ts




var WSTransport = new transports_transport({
    urls: ws,
    handlesActivityChecks: false,
    supportsPing: false,
    isInitialized: function () {
        return Boolean(runtime.getWebSocketAPI());
    },
    isSupported: function () {
        return Boolean(runtime.getWebSocketAPI());
    },
    getSocket: function (url) {
        return runtime.createWebSocket(url);
    }
});
var httpConfiguration = {
    urls: http,
    handlesActivityChecks: false,
    supportsPing: true,
    isInitialized: function () {
        return true;
    }
};
var streamingConfiguration = extend({
    getSocket: function (url) {
        return runtime.HTTPFactory.createStreamingSocket(url);
    }
}, httpConfiguration);
var pollingConfiguration = extend({
    getSocket: function (url) {
        return runtime.HTTPFactory.createPollingSocket(url);
    }
}, httpConfiguration);
var xhrConfiguration = {
    isSupported: function () {
        return runtime.isXHRSupported();
    }
};
var XHRStreamingTransport = new transports_transport((extend({}, streamingConfiguration, xhrConfiguration)));
var XHRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xhrConfiguration));
var Transports = {
    ws: WSTransport,
    xhr_streaming: XHRStreamingTransport,
    xhr_polling: XHRPollingTransport
};
/* harmony default export */ var transports = (Transports);

// CONCATENATED MODULE: ./src/runtimes/web/transports/transports.ts






var SockJSTransport = new transports_transport({
    file: 'sockjs',
    urls: sockjs,
    handlesActivityChecks: true,
    supportsPing: false,
    isSupported: function () {
        return true;
    },
    isInitialized: function () {
        return window.SockJS !== undefined;
    },
    getSocket: function (url, options) {
        return new window.SockJS(url, null, {
            js_path: Dependencies.getPath('sockjs', {
                useTLS: options.useTLS
            }),
            ignore_null_origin: options.ignoreNullOrigin
        });
    },
    beforeOpen: function (socket, path) {
        socket.send(JSON.stringify({
            path: path
        }));
    }
});
var xdrConfiguration = {
    isSupported: function (environment) {
        var yes = runtime.isXDRSupported(environment.useTLS);
        return yes;
    }
};
var XDRStreamingTransport = new transports_transport((extend({}, streamingConfiguration, xdrConfiguration)));
var XDRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xdrConfiguration));
transports.xdr_streaming = XDRStreamingTransport;
transports.xdr_polling = XDRPollingTransport;
transports.sockjs = SockJSTransport;
/* harmony default export */ var transports_transports = (transports);

// CONCATENATED MODULE: ./src/runtimes/web/net_info.ts
var net_info_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NetInfo = (function (_super) {
    net_info_extends(NetInfo, _super);
    function NetInfo() {
        var _this = _super.call(this) || this;
        var self = _this;
        if (window.addEventListener !== undefined) {
            window.addEventListener('online', function () {
                self.emit('online');
            }, false);
            window.addEventListener('offline', function () {
                self.emit('offline');
            }, false);
        }
        return _this;
    }
    NetInfo.prototype.isOnline = function () {
        if (window.navigator.onLine === undefined) {
            return true;
        }
        else {
            return window.navigator.onLine;
        }
    };
    return NetInfo;
}(dispatcher));

var net_info_Network = new NetInfo();

// CONCATENATED MODULE: ./src/core/transports/assistant_to_the_transport_manager.ts


var assistant_to_the_transport_manager_AssistantToTheTransportManager = (function () {
    function AssistantToTheTransportManager(manager, transport, options) {
        this.manager = manager;
        this.transport = transport;
        this.minPingDelay = options.minPingDelay;
        this.maxPingDelay = options.maxPingDelay;
        this.pingDelay = undefined;
    }
    AssistantToTheTransportManager.prototype.createConnection = function (name, priority, key, options) {
        var _this = this;
        options = extend({}, options, {
            activityTimeout: this.pingDelay
        });
        var connection = this.transport.createConnection(name, priority, key, options);
        var openTimestamp = null;
        var onOpen = function () {
            connection.unbind('open', onOpen);
            connection.bind('closed', onClosed);
            openTimestamp = util.now();
        };
        var onClosed = function (closeEvent) {
            connection.unbind('closed', onClosed);
            if (closeEvent.code === 1002 || closeEvent.code === 1003) {
                _this.manager.reportDeath();
            }
            else if (!closeEvent.wasClean && openTimestamp) {
                var lifespan = util.now() - openTimestamp;
                if (lifespan < 2 * _this.maxPingDelay) {
                    _this.manager.reportDeath();
                    _this.pingDelay = Math.max(lifespan / 2, _this.minPingDelay);
                }
            }
        };
        connection.bind('open', onOpen);
        return connection;
    };
    AssistantToTheTransportManager.prototype.isSupported = function (environment) {
        return this.manager.isAlive() && this.transport.isSupported(environment);
    };
    return AssistantToTheTransportManager;
}());
/* harmony default export */ var assistant_to_the_transport_manager = (assistant_to_the_transport_manager_AssistantToTheTransportManager);

// CONCATENATED MODULE: ./src/core/connection/protocol/protocol.ts
var Protocol = {
    decodeMessage: function (messageEvent) {
        try {
            var messageData = JSON.parse(messageEvent.data);
            var pusherEventData = messageData.data;
            if (typeof pusherEventData === 'string') {
                try {
                    pusherEventData = JSON.parse(messageData.data);
                }
                catch (e) { }
            }
            var pusherEvent = {
                event: messageData.event,
                channel: messageData.channel,
                data: pusherEventData
            };
            if (messageData.user_id) {
                pusherEvent.user_id = messageData.user_id;
            }
            return pusherEvent;
        }
        catch (e) {
            throw { type: 'MessageParseError', error: e, data: messageEvent.data };
        }
    },
    encodeMessage: function (event) {
        return JSON.stringify(event);
    },
    processHandshake: function (messageEvent) {
        var message = Protocol.decodeMessage(messageEvent);
        if (message.event === 'pusher:connection_established') {
            if (!message.data.activity_timeout) {
                throw 'No activity timeout specified in handshake';
            }
            return {
                action: 'connected',
                id: message.data.socket_id,
                activityTimeout: message.data.activity_timeout * 1000
            };
        }
        else if (message.event === 'pusher:error') {
            return {
                action: this.getCloseAction(message.data),
                error: this.getCloseError(message.data)
            };
        }
        else {
            throw 'Invalid handshake';
        }
    },
    getCloseAction: function (closeEvent) {
        if (closeEvent.code < 4000) {
            if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
                return 'backoff';
            }
            else {
                return null;
            }
        }
        else if (closeEvent.code === 4000) {
            return 'tls_only';
        }
        else if (closeEvent.code < 4100) {
            return 'refused';
        }
        else if (closeEvent.code < 4200) {
            return 'backoff';
        }
        else if (closeEvent.code < 4300) {
            return 'retry';
        }
        else {
            return 'refused';
        }
    },
    getCloseError: function (closeEvent) {
        if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
            return {
                type: 'PusherError',
                data: {
                    code: closeEvent.code,
                    message: closeEvent.reason || closeEvent.message
                }
            };
        }
        else {
            return null;
        }
    }
};
/* harmony default export */ var protocol_protocol = (Protocol);

// CONCATENATED MODULE: ./src/core/connection/connection.ts
var connection_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var connection_Connection = (function (_super) {
    connection_extends(Connection, _super);
    function Connection(id, transport) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.transport = transport;
        _this.activityTimeout = transport.activityTimeout;
        _this.bindListeners();
        return _this;
    }
    Connection.prototype.handlesActivityChecks = function () {
        return this.transport.handlesActivityChecks();
    };
    Connection.prototype.send = function (data) {
        return this.transport.send(data);
    };
    Connection.prototype.send_event = function (name, data, channel) {
        var event = { event: name, data: data };
        if (channel) {
            event.channel = channel;
        }
        logger.debug('Event sent', event);
        return this.send(protocol_protocol.encodeMessage(event));
    };
    Connection.prototype.ping = function () {
        if (this.transport.supportsPing()) {
            this.transport.ping();
        }
        else {
            this.send_event('pusher:ping', {});
        }
    };
    Connection.prototype.close = function () {
        this.transport.close();
    };
    Connection.prototype.bindListeners = function () {
        var _this = this;
        var listeners = {
            message: function (messageEvent) {
                var pusherEvent;
                try {
                    pusherEvent = protocol_protocol.decodeMessage(messageEvent);
                }
                catch (e) {
                    _this.emit('error', {
                        type: 'MessageParseError',
                        error: e,
                        data: messageEvent.data
                    });
                }
                if (pusherEvent !== undefined) {
                    logger.debug('Event recd', pusherEvent);
                    switch (pusherEvent.event) {
                        case 'pusher:error':
                            _this.emit('error', {
                                type: 'PusherError',
                                data: pusherEvent.data
                            });
                            break;
                        case 'pusher:ping':
                            _this.emit('ping');
                            break;
                        case 'pusher:pong':
                            _this.emit('pong');
                            break;
                    }
                    _this.emit('message', pusherEvent);
                }
            },
            activity: function () {
                _this.emit('activity');
            },
            error: function (error) {
                _this.emit('error', { type: 'WebSocketError', error: error });
            },
            closed: function (closeEvent) {
                unbindListeners();
                if (closeEvent && closeEvent.code) {
                    _this.handleCloseEvent(closeEvent);
                }
                _this.transport = null;
                _this.emit('closed');
            }
        };
        var unbindListeners = function () {
            objectApply(listeners, function (listener, event) {
                _this.transport.unbind(event, listener);
            });
        };
        objectApply(listeners, function (listener, event) {
            _this.transport.bind(event, listener);
        });
    };
    Connection.prototype.handleCloseEvent = function (closeEvent) {
        var action = protocol_protocol.getCloseAction(closeEvent);
        var error = protocol_protocol.getCloseError(closeEvent);
        if (error) {
            this.emit('error', error);
        }
        if (action) {
            this.emit(action, { action: action, error: error });
        }
    };
    return Connection;
}(dispatcher));
/* harmony default export */ var connection_connection = (connection_Connection);

// CONCATENATED MODULE: ./src/core/connection/handshake/index.ts



var handshake_Handshake = (function () {
    function Handshake(transport, callback) {
        this.transport = transport;
        this.callback = callback;
        this.bindListeners();
    }
    Handshake.prototype.close = function () {
        this.unbindListeners();
        this.transport.close();
    };
    Handshake.prototype.bindListeners = function () {
        var _this = this;
        this.onMessage = function (m) {
            _this.unbindListeners();
            var result;
            try {
                result = protocol_protocol.processHandshake(m);
            }
            catch (e) {
                _this.finish('error', { error: e });
                _this.transport.close();
                return;
            }
            if (result.action === 'connected') {
                _this.finish('connected', {
                    connection: new connection_connection(result.id, _this.transport),
                    activityTimeout: result.activityTimeout
                });
            }
            else {
                _this.finish(result.action, { error: result.error });
                _this.transport.close();
            }
        };
        this.onClosed = function (closeEvent) {
            _this.unbindListeners();
            var action = protocol_protocol.getCloseAction(closeEvent) || 'backoff';
            var error = protocol_protocol.getCloseError(closeEvent);
            _this.finish(action, { error: error });
        };
        this.transport.bind('message', this.onMessage);
        this.transport.bind('closed', this.onClosed);
    };
    Handshake.prototype.unbindListeners = function () {
        this.transport.unbind('message', this.onMessage);
        this.transport.unbind('closed', this.onClosed);
    };
    Handshake.prototype.finish = function (action, params) {
        this.callback(extend({ transport: this.transport, action: action }, params));
    };
    return Handshake;
}());
/* harmony default export */ var connection_handshake = (handshake_Handshake);

// CONCATENATED MODULE: ./src/core/auth/pusher_authorizer.ts

var pusher_authorizer_PusherAuthorizer = (function () {
    function PusherAuthorizer(channel, options) {
        this.channel = channel;
        var authTransport = options.authTransport;
        if (typeof runtime.getAuthorizers()[authTransport] === 'undefined') {
            throw "'" + authTransport + "' is not a recognized auth transport";
        }
        this.type = authTransport;
        this.options = options;
        this.authOptions = options.auth || {};
    }
    PusherAuthorizer.prototype.composeQuery = function (socketId) {
        var query = 'socket_id=' +
            encodeURIComponent(socketId) +
            '&channel_name=' +
            encodeURIComponent(this.channel.name);
        for (var i in this.authOptions.params) {
            query +=
                '&' +
                    encodeURIComponent(i) +
                    '=' +
                    encodeURIComponent(this.authOptions.params[i]);
        }
        return query;
    };
    PusherAuthorizer.prototype.authorize = function (socketId, callback) {
        PusherAuthorizer.authorizers =
            PusherAuthorizer.authorizers || runtime.getAuthorizers();
        PusherAuthorizer.authorizers[this.type].call(this, runtime, socketId, callback);
    };
    return PusherAuthorizer;
}());
/* harmony default export */ var pusher_authorizer = (pusher_authorizer_PusherAuthorizer);

// CONCATENATED MODULE: ./src/core/timeline/timeline_sender.ts

var timeline_sender_TimelineSender = (function () {
    function TimelineSender(timeline, options) {
        this.timeline = timeline;
        this.options = options || {};
    }
    TimelineSender.prototype.send = function (useTLS, callback) {
        if (this.timeline.isEmpty()) {
            return;
        }
        this.timeline.send(runtime.TimelineTransport.getAgent(this, useTLS), callback);
    };
    return TimelineSender;
}());
/* harmony default export */ var timeline_sender = (timeline_sender_TimelineSender);

// CONCATENATED MODULE: ./src/core/errors.ts
var errors_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BadEventName = (function (_super) {
    errors_extends(BadEventName, _super);
    function BadEventName(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return BadEventName;
}(Error));

var RequestTimedOut = (function (_super) {
    errors_extends(RequestTimedOut, _super);
    function RequestTimedOut(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return RequestTimedOut;
}(Error));

var TransportPriorityTooLow = (function (_super) {
    errors_extends(TransportPriorityTooLow, _super);
    function TransportPriorityTooLow(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TransportPriorityTooLow;
}(Error));

var TransportClosed = (function (_super) {
    errors_extends(TransportClosed, _super);
    function TransportClosed(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TransportClosed;
}(Error));

var UnsupportedFeature = (function (_super) {
    errors_extends(UnsupportedFeature, _super);
    function UnsupportedFeature(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return UnsupportedFeature;
}(Error));

var UnsupportedTransport = (function (_super) {
    errors_extends(UnsupportedTransport, _super);
    function UnsupportedTransport(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return UnsupportedTransport;
}(Error));

var UnsupportedStrategy = (function (_super) {
    errors_extends(UnsupportedStrategy, _super);
    function UnsupportedStrategy(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return UnsupportedStrategy;
}(Error));


// CONCATENATED MODULE: ./src/core/channels/channel.ts
var channel_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var channel_Channel = (function (_super) {
    channel_extends(Channel, _super);
    function Channel(name, pusher) {
        var _this = _super.call(this, function (event, data) {
            logger.debug('No callbacks on ' + name + ' for ' + event);
        }) || this;
        _this.name = name;
        _this.pusher = pusher;
        _this.subscribed = false;
        _this.subscriptionPending = false;
        _this.subscriptionCancelled = false;
        return _this;
    }
    Channel.prototype.authorize = function (socketId, callback) {
        return callback(false, { auth: '' });
    };
    Channel.prototype.trigger = function (event, data) {
        if (event.indexOf('client-') !== 0) {
            throw new BadEventName("Event '" + event + "' does not start with 'client-'");
        }
        if (!this.subscribed) {
            var suffix = url_store.buildLogSuffix('triggeringClientEvents');
            logger.warn("Client event triggered before channel 'subscription_succeeded' event . " + suffix);
        }
        return this.pusher.send_event(event, data, this.name);
    };
    Channel.prototype.disconnect = function () {
        this.subscribed = false;
        this.subscriptionPending = false;
    };
    Channel.prototype.handleEvent = function (event) {
        var eventName = event.event;
        var data = event.data;
        if (eventName === 'pusher_internal:subscription_succeeded') {
            this.handleSubscriptionSucceededEvent(event);
        }
        else if (eventName.indexOf('pusher_internal:') !== 0) {
            var metadata = {};
            this.emit(eventName, data, metadata);
        }
    };
    Channel.prototype.handleSubscriptionSucceededEvent = function (event) {
        this.subscriptionPending = false;
        this.subscribed = true;
        if (this.subscriptionCancelled) {
            this.pusher.unsubscribe(this.name);
        }
        else {
            this.emit('pusher:subscription_succeeded', event.data);
        }
    };
    Channel.prototype.subscribe = function () {
        var _this = this;
        if (this.subscribed) {
            return;
        }
        this.subscriptionPending = true;
        this.subscriptionCancelled = false;
        this.authorize(this.pusher.connection.socket_id, function (error, data) {
            if (error) {
                logger.error(data);
                _this.emit('pusher:subscription_error', data);
            }
            else {
                data = data;
                _this.pusher.send_event('pusher:subscribe', {
                    auth: data.auth,
                    channel_data: data.channel_data,
                    channel: _this.name
                });
            }
        });
    };
    Channel.prototype.unsubscribe = function () {
        this.subscribed = false;
        this.pusher.send_event('pusher:unsubscribe', {
            channel: this.name
        });
    };
    Channel.prototype.cancelSubscription = function () {
        this.subscriptionCancelled = true;
    };
    Channel.prototype.reinstateSubscription = function () {
        this.subscriptionCancelled = false;
    };
    return Channel;
}(dispatcher));
/* harmony default export */ var channels_channel = (channel_Channel);

// CONCATENATED MODULE: ./src/core/channels/private_channel.ts
var private_channel_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var private_channel_PrivateChannel = (function (_super) {
    private_channel_extends(PrivateChannel, _super);
    function PrivateChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrivateChannel.prototype.authorize = function (socketId, callback) {
        var authorizer = factory.createAuthorizer(this, this.pusher.config);
        return authorizer.authorize(socketId, callback);
    };
    return PrivateChannel;
}(channels_channel));
/* harmony default export */ var private_channel = (private_channel_PrivateChannel);

// CONCATENATED MODULE: ./src/core/channels/members.ts

var members_Members = (function () {
    function Members() {
        this.reset();
    }
    Members.prototype.get = function (id) {
        if (Object.prototype.hasOwnProperty.call(this.members, id)) {
            return {
                id: id,
                info: this.members[id]
            };
        }
        else {
            return null;
        }
    };
    Members.prototype.each = function (callback) {
        var _this = this;
        objectApply(this.members, function (member, id) {
            callback(_this.get(id));
        });
    };
    Members.prototype.setMyID = function (id) {
        this.myID = id;
    };
    Members.prototype.onSubscription = function (subscriptionData) {
        this.members = subscriptionData.presence.hash;
        this.count = subscriptionData.presence.count;
        this.me = this.get(this.myID);
    };
    Members.prototype.addMember = function (memberData) {
        if (this.get(memberData.user_id) === null) {
            this.count++;
        }
        this.members[memberData.user_id] = memberData.user_info;
        return this.get(memberData.user_id);
    };
    Members.prototype.removeMember = function (memberData) {
        var member = this.get(memberData.user_id);
        if (member) {
            delete this.members[memberData.user_id];
            this.count--;
        }
        return member;
    };
    Members.prototype.reset = function () {
        this.members = {};
        this.count = 0;
        this.myID = null;
        this.me = null;
    };
    return Members;
}());
/* harmony default export */ var members = (members_Members);

// CONCATENATED MODULE: ./src/core/channels/presence_channel.ts
var presence_channel_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var presence_channel_PresenceChannel = (function (_super) {
    presence_channel_extends(PresenceChannel, _super);
    function PresenceChannel(name, pusher) {
        var _this = _super.call(this, name, pusher) || this;
        _this.members = new members();
        return _this;
    }
    PresenceChannel.prototype.authorize = function (socketId, callback) {
        var _this = this;
        _super.prototype.authorize.call(this, socketId, function (error, authData) {
            if (!error) {
                authData = authData;
                if (authData.channel_data === undefined) {
                    var suffix = url_store.buildLogSuffix('authenticationEndpoint');
                    logger.error("Invalid auth response for channel '" + _this.name + "'," +
                        ("expected 'channel_data' field. " + suffix));
                    callback('Invalid auth response');
                    return;
                }
                var channelData = JSON.parse(authData.channel_data);
                _this.members.setMyID(channelData.user_id);
            }
            callback(error, authData);
        });
    };
    PresenceChannel.prototype.handleEvent = function (event) {
        var eventName = event.event;
        if (eventName.indexOf('pusher_internal:') === 0) {
            this.handleInternalEvent(event);
        }
        else {
            var data = event.data;
            var metadata = {};
            if (event.user_id) {
                metadata.user_id = event.user_id;
            }
            this.emit(eventName, data, metadata);
        }
    };
    PresenceChannel.prototype.handleInternalEvent = function (event) {
        var eventName = event.event;
        var data = event.data;
        switch (eventName) {
            case 'pusher_internal:subscription_succeeded':
                this.handleSubscriptionSucceededEvent(event);
                break;
            case 'pusher_internal:member_added':
                var addedMember = this.members.addMember(data);
                this.emit('pusher:member_added', addedMember);
                break;
            case 'pusher_internal:member_removed':
                var removedMember = this.members.removeMember(data);
                if (removedMember) {
                    this.emit('pusher:member_removed', removedMember);
                }
                break;
        }
    };
    PresenceChannel.prototype.handleSubscriptionSucceededEvent = function (event) {
        this.subscriptionPending = false;
        this.subscribed = true;
        if (this.subscriptionCancelled) {
            this.pusher.unsubscribe(this.name);
        }
        else {
            this.members.onSubscription(event.data);
            this.emit('pusher:subscription_succeeded', this.members);
        }
    };
    PresenceChannel.prototype.disconnect = function () {
        this.members.reset();
        _super.prototype.disconnect.call(this);
    };
    return PresenceChannel;
}(private_channel));
/* harmony default export */ var presence_channel = (presence_channel_PresenceChannel);

// EXTERNAL MODULE: ./node_modules/@stablelib/utf8/lib/utf8.js
var utf8 = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@stablelib/base64/lib/base64.js
var base64 = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/channels/encrypted_channel.ts
var encrypted_channel_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var encrypted_channel_EncryptedChannel = (function (_super) {
    encrypted_channel_extends(EncryptedChannel, _super);
    function EncryptedChannel(name, pusher, nacl) {
        var _this = _super.call(this, name, pusher) || this;
        _this.key = null;
        _this.nacl = nacl;
        return _this;
    }
    EncryptedChannel.prototype.authorize = function (socketId, callback) {
        var _this = this;
        _super.prototype.authorize.call(this, socketId, function (error, authData) {
            if (error) {
                callback(true, authData);
                return;
            }
            var sharedSecret = authData['shared_secret'];
            if (!sharedSecret) {
                var errorMsg = "No shared_secret key in auth payload for encrypted channel: " + _this.name;
                callback(true, errorMsg);
                return;
            }
            _this.key = Object(base64["decode"])(sharedSecret);
            delete authData['shared_secret'];
            callback(false, authData);
        });
    };
    EncryptedChannel.prototype.trigger = function (event, data) {
        throw new UnsupportedFeature('Client events are not currently supported for encrypted channels');
    };
    EncryptedChannel.prototype.handleEvent = function (event) {
        var eventName = event.event;
        var data = event.data;
        if (eventName.indexOf('pusher_internal:') === 0 ||
            eventName.indexOf('pusher:') === 0) {
            _super.prototype.handleEvent.call(this, event);
            return;
        }
        this.handleEncryptedEvent(eventName, data);
    };
    EncryptedChannel.prototype.handleEncryptedEvent = function (event, data) {
        var _this = this;
        if (!this.key) {
            logger.debug('Received encrypted event before key has been retrieved from the authEndpoint');
            return;
        }
        if (!data.ciphertext || !data.nonce) {
            logger.error('Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: ' +
                data);
            return;
        }
        var cipherText = Object(base64["decode"])(data.ciphertext);
        if (cipherText.length < this.nacl.secretbox.overheadLength) {
            logger.error("Expected encrypted event ciphertext length to be " + this.nacl.secretbox.overheadLength + ", got: " + cipherText.length);
            return;
        }
        var nonce = Object(base64["decode"])(data.nonce);
        if (nonce.length < this.nacl.secretbox.nonceLength) {
            logger.error("Expected encrypted event nonce length to be " + this.nacl.secretbox.nonceLength + ", got: " + nonce.length);
            return;
        }
        var bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
        if (bytes === null) {
            logger.debug('Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...');
            this.authorize(this.pusher.connection.socket_id, function (error, authData) {
                if (error) {
                    logger.error("Failed to make a request to the authEndpoint: " + authData + ". Unable to fetch new key, so dropping encrypted event");
                    return;
                }
                bytes = _this.nacl.secretbox.open(cipherText, nonce, _this.key);
                if (bytes === null) {
                    logger.error("Failed to decrypt event with new key. Dropping encrypted event");
                    return;
                }
                _this.emitJSON(event, Object(utf8["decode"])(bytes));
                return;
            });
            return;
        }
        this.emitJSON(event, Object(utf8["decode"])(bytes));
    };
    EncryptedChannel.prototype.emitJSON = function (eventName, data) {
        try {
            this.emit(eventName, JSON.parse(data));
        }
        catch (e) {
            this.emit(eventName, data);
        }
        return this;
    };
    return EncryptedChannel;
}(private_channel));
/* harmony default export */ var encrypted_channel = (encrypted_channel_EncryptedChannel);

// CONCATENATED MODULE: ./src/core/connection/connection_manager.ts
var connection_manager_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var connection_manager_ConnectionManager = (function (_super) {
    connection_manager_extends(ConnectionManager, _super);
    function ConnectionManager(key, options) {
        var _this = _super.call(this) || this;
        _this.state = 'initialized';
        _this.connection = null;
        _this.key = key;
        _this.options = options;
        _this.timeline = _this.options.timeline;
        _this.usingTLS = _this.options.useTLS;
        _this.errorCallbacks = _this.buildErrorCallbacks();
        _this.connectionCallbacks = _this.buildConnectionCallbacks(_this.errorCallbacks);
        _this.handshakeCallbacks = _this.buildHandshakeCallbacks(_this.errorCallbacks);
        var Network = runtime.getNetwork();
        Network.bind('online', function () {
            _this.timeline.info({ netinfo: 'online' });
            if (_this.state === 'connecting' || _this.state === 'unavailable') {
                _this.retryIn(0);
            }
        });
        Network.bind('offline', function () {
            _this.timeline.info({ netinfo: 'offline' });
            if (_this.connection) {
                _this.sendActivityCheck();
            }
        });
        _this.updateStrategy();
        return _this;
    }
    ConnectionManager.prototype.connect = function () {
        if (this.connection || this.runner) {
            return;
        }
        if (!this.strategy.isSupported()) {
            this.updateState('failed');
            return;
        }
        this.updateState('connecting');
        this.startConnecting();
        this.setUnavailableTimer();
    };
    ConnectionManager.prototype.send = function (data) {
        if (this.connection) {
            return this.connection.send(data);
        }
        else {
            return false;
        }
    };
    ConnectionManager.prototype.send_event = function (name, data, channel) {
        if (this.connection) {
            return this.connection.send_event(name, data, channel);
        }
        else {
            return false;
        }
    };
    ConnectionManager.prototype.disconnect = function () {
        this.disconnectInternally();
        this.updateState('disconnected');
    };
    ConnectionManager.prototype.isUsingTLS = function () {
        return this.usingTLS;
    };
    ConnectionManager.prototype.startConnecting = function () {
        var _this = this;
        var callback = function (error, handshake) {
            if (error) {
                _this.runner = _this.strategy.connect(0, callback);
            }
            else {
                if (handshake.action === 'error') {
                    _this.emit('error', {
                        type: 'HandshakeError',
                        error: handshake.error
                    });
                    _this.timeline.error({ handshakeError: handshake.error });
                }
                else {
                    _this.abortConnecting();
                    _this.handshakeCallbacks[handshake.action](handshake);
                }
            }
        };
        this.runner = this.strategy.connect(0, callback);
    };
    ConnectionManager.prototype.abortConnecting = function () {
        if (this.runner) {
            this.runner.abort();
            this.runner = null;
        }
    };
    ConnectionManager.prototype.disconnectInternally = function () {
        this.abortConnecting();
        this.clearRetryTimer();
        this.clearUnavailableTimer();
        if (this.connection) {
            var connection = this.abandonConnection();
            connection.close();
        }
    };
    ConnectionManager.prototype.updateStrategy = function () {
        this.strategy = this.options.getStrategy({
            key: this.key,
            timeline: this.timeline,
            useTLS: this.usingTLS
        });
    };
    ConnectionManager.prototype.retryIn = function (delay) {
        var _this = this;
        this.timeline.info({ action: 'retry', delay: delay });
        if (delay > 0) {
            this.emit('connecting_in', Math.round(delay / 1000));
        }
        this.retryTimer = new OneOffTimer(delay || 0, function () {
            _this.disconnectInternally();
            _this.connect();
        });
    };
    ConnectionManager.prototype.clearRetryTimer = function () {
        if (this.retryTimer) {
            this.retryTimer.ensureAborted();
            this.retryTimer = null;
        }
    };
    ConnectionManager.prototype.setUnavailableTimer = function () {
        var _this = this;
        this.unavailableTimer = new OneOffTimer(this.options.unavailableTimeout, function () {
            _this.updateState('unavailable');
        });
    };
    ConnectionManager.prototype.clearUnavailableTimer = function () {
        if (this.unavailableTimer) {
            this.unavailableTimer.ensureAborted();
        }
    };
    ConnectionManager.prototype.sendActivityCheck = function () {
        var _this = this;
        this.stopActivityCheck();
        this.connection.ping();
        this.activityTimer = new OneOffTimer(this.options.pongTimeout, function () {
            _this.timeline.error({ pong_timed_out: _this.options.pongTimeout });
            _this.retryIn(0);
        });
    };
    ConnectionManager.prototype.resetActivityCheck = function () {
        var _this = this;
        this.stopActivityCheck();
        if (this.connection && !this.connection.handlesActivityChecks()) {
            this.activityTimer = new OneOffTimer(this.activityTimeout, function () {
                _this.sendActivityCheck();
            });
        }
    };
    ConnectionManager.prototype.stopActivityCheck = function () {
        if (this.activityTimer) {
            this.activityTimer.ensureAborted();
        }
    };
    ConnectionManager.prototype.buildConnectionCallbacks = function (errorCallbacks) {
        var _this = this;
        return extend({}, errorCallbacks, {
            message: function (message) {
                _this.resetActivityCheck();
                _this.emit('message', message);
            },
            ping: function () {
                _this.send_event('pusher:pong', {});
            },
            activity: function () {
                _this.resetActivityCheck();
            },
            error: function (error) {
                _this.emit('error', { type: 'WebSocketError', error: error });
            },
            closed: function () {
                _this.abandonConnection();
                if (_this.shouldRetry()) {
                    _this.retryIn(1000);
                }
            }
        });
    };
    ConnectionManager.prototype.buildHandshakeCallbacks = function (errorCallbacks) {
        var _this = this;
        return extend({}, errorCallbacks, {
            connected: function (handshake) {
                _this.activityTimeout = Math.min(_this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
                _this.clearUnavailableTimer();
                _this.setConnection(handshake.connection);
                _this.socket_id = _this.connection.id;
                _this.updateState('connected', { socket_id: _this.socket_id });
            }
        });
    };
    ConnectionManager.prototype.buildErrorCallbacks = function () {
        var _this = this;
        var withErrorEmitted = function (callback) {
            return function (result) {
                if (result.error) {
                    _this.emit('error', { type: 'WebSocketError', error: result.error });
                }
                callback(result);
            };
        };
        return {
            tls_only: withErrorEmitted(function () {
                _this.usingTLS = true;
                _this.updateStrategy();
                _this.retryIn(0);
            }),
            refused: withErrorEmitted(function () {
                _this.disconnect();
            }),
            backoff: withErrorEmitted(function () {
                _this.retryIn(1000);
            }),
            retry: withErrorEmitted(function () {
                _this.retryIn(0);
            })
        };
    };
    ConnectionManager.prototype.setConnection = function (connection) {
        this.connection = connection;
        for (var event in this.connectionCallbacks) {
            this.connection.bind(event, this.connectionCallbacks[event]);
        }
        this.resetActivityCheck();
    };
    ConnectionManager.prototype.abandonConnection = function () {
        if (!this.connection) {
            return;
        }
        this.stopActivityCheck();
        for (var event in this.connectionCallbacks) {
            this.connection.unbind(event, this.connectionCallbacks[event]);
        }
        var connection = this.connection;
        this.connection = null;
        return connection;
    };
    ConnectionManager.prototype.updateState = function (newState, data) {
        var previousState = this.state;
        this.state = newState;
        if (previousState !== newState) {
            var newStateDescription = newState;
            if (newStateDescription === 'connected') {
                newStateDescription += ' with new socket ID ' + data.socket_id;
            }
            logger.debug('State changed', previousState + ' -> ' + newStateDescription);
            this.timeline.info({ state: newState, params: data });
            this.emit('state_change', { previous: previousState, current: newState });
            this.emit(newState, data);
        }
    };
    ConnectionManager.prototype.shouldRetry = function () {
        return this.state === 'connecting' || this.state === 'connected';
    };
    return ConnectionManager;
}(dispatcher));
/* harmony default export */ var connection_manager = (connection_manager_ConnectionManager);

// CONCATENATED MODULE: ./src/core/channels/channels.ts




var channels_Channels = (function () {
    function Channels() {
        this.channels = {};
    }
    Channels.prototype.add = function (name, pusher) {
        if (!this.channels[name]) {
            this.channels[name] = createChannel(name, pusher);
        }
        return this.channels[name];
    };
    Channels.prototype.all = function () {
        return values(this.channels);
    };
    Channels.prototype.find = function (name) {
        return this.channels[name];
    };
    Channels.prototype.remove = function (name) {
        var channel = this.channels[name];
        delete this.channels[name];
        return channel;
    };
    Channels.prototype.disconnect = function () {
        objectApply(this.channels, function (channel) {
            channel.disconnect();
        });
    };
    return Channels;
}());
/* harmony default export */ var channels = (channels_Channels);
function createChannel(name, pusher) {
    if (name.indexOf('private-encrypted-') === 0) {
        if (pusher.config.nacl) {
            return factory.createEncryptedChannel(name, pusher, pusher.config.nacl);
        }
        var errMsg = 'Tried to subscribe to a private-encrypted- channel but no nacl implementation available';
        var suffix = url_store.buildLogSuffix('encryptedChannelSupport');
        throw new UnsupportedFeature(errMsg + ". " + suffix);
    }
    else if (name.indexOf('private-') === 0) {
        return factory.createPrivateChannel(name, pusher);
    }
    else if (name.indexOf('presence-') === 0) {
        return factory.createPresenceChannel(name, pusher);
    }
    else {
        return factory.createChannel(name, pusher);
    }
}

// CONCATENATED MODULE: ./src/core/utils/factory.ts










var Factory = {
    createChannels: function () {
        return new channels();
    },
    createConnectionManager: function (key, options) {
        return new connection_manager(key, options);
    },
    createChannel: function (name, pusher) {
        return new channels_channel(name, pusher);
    },
    createPrivateChannel: function (name, pusher) {
        return new private_channel(name, pusher);
    },
    createPresenceChannel: function (name, pusher) {
        return new presence_channel(name, pusher);
    },
    createEncryptedChannel: function (name, pusher, nacl) {
        return new encrypted_channel(name, pusher, nacl);
    },
    createTimelineSender: function (timeline, options) {
        return new timeline_sender(timeline, options);
    },
    createAuthorizer: function (channel, options) {
        if (options.authorizer) {
            return options.authorizer(channel, options);
        }
        return new pusher_authorizer(channel, options);
    },
    createHandshake: function (transport, callback) {
        return new connection_handshake(transport, callback);
    },
    createAssistantToTheTransportManager: function (manager, transport, options) {
        return new assistant_to_the_transport_manager(manager, transport, options);
    }
};
/* harmony default export */ var factory = (Factory);

// CONCATENATED MODULE: ./src/core/transports/transport_manager.ts

var transport_manager_TransportManager = (function () {
    function TransportManager(options) {
        this.options = options || {};
        this.livesLeft = this.options.lives || Infinity;
    }
    TransportManager.prototype.getAssistant = function (transport) {
        return factory.createAssistantToTheTransportManager(this, transport, {
            minPingDelay: this.options.minPingDelay,
            maxPingDelay: this.options.maxPingDelay
        });
    };
    TransportManager.prototype.isAlive = function () {
        return this.livesLeft > 0;
    };
    TransportManager.prototype.reportDeath = function () {
        this.livesLeft -= 1;
    };
    return TransportManager;
}());
/* harmony default export */ var transport_manager = (transport_manager_TransportManager);

// CONCATENATED MODULE: ./src/core/strategies/sequential_strategy.ts



var sequential_strategy_SequentialStrategy = (function () {
    function SequentialStrategy(strategies, options) {
        this.strategies = strategies;
        this.loop = Boolean(options.loop);
        this.failFast = Boolean(options.failFast);
        this.timeout = options.timeout;
        this.timeoutLimit = options.timeoutLimit;
    }
    SequentialStrategy.prototype.isSupported = function () {
        return any(this.strategies, util.method('isSupported'));
    };
    SequentialStrategy.prototype.connect = function (minPriority, callback) {
        var _this = this;
        var strategies = this.strategies;
        var current = 0;
        var timeout = this.timeout;
        var runner = null;
        var tryNextStrategy = function (error, handshake) {
            if (handshake) {
                callback(null, handshake);
            }
            else {
                current = current + 1;
                if (_this.loop) {
                    current = current % strategies.length;
                }
                if (current < strategies.length) {
                    if (timeout) {
                        timeout = timeout * 2;
                        if (_this.timeoutLimit) {
                            timeout = Math.min(timeout, _this.timeoutLimit);
                        }
                    }
                    runner = _this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: _this.failFast }, tryNextStrategy);
                }
                else {
                    callback(true);
                }
            }
        };
        runner = this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: this.failFast }, tryNextStrategy);
        return {
            abort: function () {
                runner.abort();
            },
            forceMinPriority: function (p) {
                minPriority = p;
                if (runner) {
                    runner.forceMinPriority(p);
                }
            }
        };
    };
    SequentialStrategy.prototype.tryStrategy = function (strategy, minPriority, options, callback) {
        var timer = null;
        var runner = null;
        if (options.timeout > 0) {
            timer = new OneOffTimer(options.timeout, function () {
                runner.abort();
                callback(true);
            });
        }
        runner = strategy.connect(minPriority, function (error, handshake) {
            if (error && timer && timer.isRunning() && !options.failFast) {
                return;
            }
            if (timer) {
                timer.ensureAborted();
            }
            callback(error, handshake);
        });
        return {
            abort: function () {
                if (timer) {
                    timer.ensureAborted();
                }
                runner.abort();
            },
            forceMinPriority: function (p) {
                runner.forceMinPriority(p);
            }
        };
    };
    return SequentialStrategy;
}());
/* harmony default export */ var sequential_strategy = (sequential_strategy_SequentialStrategy);

// CONCATENATED MODULE: ./src/core/strategies/best_connected_ever_strategy.ts


var best_connected_ever_strategy_BestConnectedEverStrategy = (function () {
    function BestConnectedEverStrategy(strategies) {
        this.strategies = strategies;
    }
    BestConnectedEverStrategy.prototype.isSupported = function () {
        return any(this.strategies, util.method('isSupported'));
    };
    BestConnectedEverStrategy.prototype.connect = function (minPriority, callback) {
        return connect(this.strategies, minPriority, function (i, runners) {
            return function (error, handshake) {
                runners[i].error = error;
                if (error) {
                    if (allRunnersFailed(runners)) {
                        callback(true);
                    }
                    return;
                }
                apply(runners, function (runner) {
                    runner.forceMinPriority(handshake.transport.priority);
                });
                callback(null, handshake);
            };
        });
    };
    return BestConnectedEverStrategy;
}());
/* harmony default export */ var best_connected_ever_strategy = (best_connected_ever_strategy_BestConnectedEverStrategy);
function connect(strategies, minPriority, callbackBuilder) {
    var runners = map(strategies, function (strategy, i, _, rs) {
        return strategy.connect(minPriority, callbackBuilder(i, rs));
    });
    return {
        abort: function () {
            apply(runners, abortRunner);
        },
        forceMinPriority: function (p) {
            apply(runners, function (runner) {
                runner.forceMinPriority(p);
            });
        }
    };
}
function allRunnersFailed(runners) {
    return collections_all(runners, function (runner) {
        return Boolean(runner.error);
    });
}
function abortRunner(runner) {
    if (!runner.error && !runner.aborted) {
        runner.abort();
        runner.aborted = true;
    }
}

// CONCATENATED MODULE: ./src/core/strategies/cached_strategy.ts




var cached_strategy_CachedStrategy = (function () {
    function CachedStrategy(strategy, transports, options) {
        this.strategy = strategy;
        this.transports = transports;
        this.ttl = options.ttl || 1800 * 1000;
        this.usingTLS = options.useTLS;
        this.timeline = options.timeline;
    }
    CachedStrategy.prototype.isSupported = function () {
        return this.strategy.isSupported();
    };
    CachedStrategy.prototype.connect = function (minPriority, callback) {
        var usingTLS = this.usingTLS;
        var info = fetchTransportCache(usingTLS);
        var strategies = [this.strategy];
        if (info && info.timestamp + this.ttl >= util.now()) {
            var transport = this.transports[info.transport];
            if (transport) {
                this.timeline.info({
                    cached: true,
                    transport: info.transport,
                    latency: info.latency
                });
                strategies.push(new sequential_strategy([transport], {
                    timeout: info.latency * 2 + 1000,
                    failFast: true
                }));
            }
        }
        var startTimestamp = util.now();
        var runner = strategies
            .pop()
            .connect(minPriority, function cb(error, handshake) {
            if (error) {
                flushTransportCache(usingTLS);
                if (strategies.length > 0) {
                    startTimestamp = util.now();
                    runner = strategies.pop().connect(minPriority, cb);
                }
                else {
                    callback(error);
                }
            }
            else {
                storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp);
                callback(null, handshake);
            }
        });
        return {
            abort: function () {
                runner.abort();
            },
            forceMinPriority: function (p) {
                minPriority = p;
                if (runner) {
                    runner.forceMinPriority(p);
                }
            }
        };
    };
    return CachedStrategy;
}());
/* harmony default export */ var cached_strategy = (cached_strategy_CachedStrategy);
function getTransportCacheKey(usingTLS) {
    return 'pusherTransport' + (usingTLS ? 'TLS' : 'NonTLS');
}
function fetchTransportCache(usingTLS) {
    var storage = runtime.getLocalStorage();
    if (storage) {
        try {
            var serializedCache = storage[getTransportCacheKey(usingTLS)];
            if (serializedCache) {
                return JSON.parse(serializedCache);
            }
        }
        catch (e) {
            flushTransportCache(usingTLS);
        }
    }
    return null;
}
function storeTransportCache(usingTLS, transport, latency) {
    var storage = runtime.getLocalStorage();
    if (storage) {
        try {
            storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
                timestamp: util.now(),
                transport: transport,
                latency: latency
            });
        }
        catch (e) {
        }
    }
}
function flushTransportCache(usingTLS) {
    var storage = runtime.getLocalStorage();
    if (storage) {
        try {
            delete storage[getTransportCacheKey(usingTLS)];
        }
        catch (e) {
        }
    }
}

// CONCATENATED MODULE: ./src/core/strategies/delayed_strategy.ts

var delayed_strategy_DelayedStrategy = (function () {
    function DelayedStrategy(strategy, _a) {
        var number = _a.delay;
        this.strategy = strategy;
        this.options = { delay: number };
    }
    DelayedStrategy.prototype.isSupported = function () {
        return this.strategy.isSupported();
    };
    DelayedStrategy.prototype.connect = function (minPriority, callback) {
        var strategy = this.strategy;
        var runner;
        var timer = new OneOffTimer(this.options.delay, function () {
            runner = strategy.connect(minPriority, callback);
        });
        return {
            abort: function () {
                timer.ensureAborted();
                if (runner) {
                    runner.abort();
                }
            },
            forceMinPriority: function (p) {
                minPriority = p;
                if (runner) {
                    runner.forceMinPriority(p);
                }
            }
        };
    };
    return DelayedStrategy;
}());
/* harmony default export */ var delayed_strategy = (delayed_strategy_DelayedStrategy);

// CONCATENATED MODULE: ./src/core/strategies/if_strategy.ts
var IfStrategy = (function () {
    function IfStrategy(test, trueBranch, falseBranch) {
        this.test = test;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    }
    IfStrategy.prototype.isSupported = function () {
        var branch = this.test() ? this.trueBranch : this.falseBranch;
        return branch.isSupported();
    };
    IfStrategy.prototype.connect = function (minPriority, callback) {
        var branch = this.test() ? this.trueBranch : this.falseBranch;
        return branch.connect(minPriority, callback);
    };
    return IfStrategy;
}());
/* harmony default export */ var if_strategy = (IfStrategy);

// CONCATENATED MODULE: ./src/core/strategies/first_connected_strategy.ts
var FirstConnectedStrategy = (function () {
    function FirstConnectedStrategy(strategy) {
        this.strategy = strategy;
    }
    FirstConnectedStrategy.prototype.isSupported = function () {
        return this.strategy.isSupported();
    };
    FirstConnectedStrategy.prototype.connect = function (minPriority, callback) {
        var runner = this.strategy.connect(minPriority, function (error, handshake) {
            if (handshake) {
                runner.abort();
            }
            callback(error, handshake);
        });
        return runner;
    };
    return FirstConnectedStrategy;
}());
/* harmony default export */ var first_connected_strategy = (FirstConnectedStrategy);

// CONCATENATED MODULE: ./src/runtimes/web/default_strategy.ts







function testSupportsStrategy(strategy) {
    return function () {
        return strategy.isSupported();
    };
}
var getDefaultStrategy = function (config, baseOptions, defineTransport) {
    var definedTransports = {};
    function defineTransportStrategy(name, type, priority, options, manager) {
        var transport = defineTransport(config, name, type, priority, options, manager);
        definedTransports[name] = transport;
        return transport;
    }
    var ws_options = Object.assign({}, baseOptions, {
        hostNonTLS: config.wsHost + ':' + config.wsPort,
        hostTLS: config.wsHost + ':' + config.wssPort,
        httpPath: config.wsPath
    });
    var wss_options = Object.assign({}, ws_options, {
        useTLS: true
    });
    var sockjs_options = Object.assign({}, baseOptions, {
        hostNonTLS: config.httpHost + ':' + config.httpPort,
        hostTLS: config.httpHost + ':' + config.httpsPort,
        httpPath: config.httpPath
    });
    var timeouts = {
        loop: true,
        timeout: 15000,
        timeoutLimit: 60000
    };
    var ws_manager = new transport_manager({
        lives: 2,
        minPingDelay: 10000,
        maxPingDelay: config.activityTimeout
    });
    var streaming_manager = new transport_manager({
        lives: 2,
        minPingDelay: 10000,
        maxPingDelay: config.activityTimeout
    });
    var ws_transport = defineTransportStrategy('ws', 'ws', 3, ws_options, ws_manager);
    var wss_transport = defineTransportStrategy('wss', 'ws', 3, wss_options, ws_manager);
    var sockjs_transport = defineTransportStrategy('sockjs', 'sockjs', 1, sockjs_options);
    var xhr_streaming_transport = defineTransportStrategy('xhr_streaming', 'xhr_streaming', 1, sockjs_options, streaming_manager);
    var xdr_streaming_transport = defineTransportStrategy('xdr_streaming', 'xdr_streaming', 1, sockjs_options, streaming_manager);
    var xhr_polling_transport = defineTransportStrategy('xhr_polling', 'xhr_polling', 1, sockjs_options);
    var xdr_polling_transport = defineTransportStrategy('xdr_polling', 'xdr_polling', 1, sockjs_options);
    var ws_loop = new sequential_strategy([ws_transport], timeouts);
    var wss_loop = new sequential_strategy([wss_transport], timeouts);
    var sockjs_loop = new sequential_strategy([sockjs_transport], timeouts);
    var streaming_loop = new sequential_strategy([
        new if_strategy(testSupportsStrategy(xhr_streaming_transport), xhr_streaming_transport, xdr_streaming_transport)
    ], timeouts);
    var polling_loop = new sequential_strategy([
        new if_strategy(testSupportsStrategy(xhr_polling_transport), xhr_polling_transport, xdr_polling_transport)
    ], timeouts);
    var http_loop = new sequential_strategy([
        new if_strategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy([
            streaming_loop,
            new delayed_strategy(polling_loop, { delay: 4000 })
        ]), polling_loop)
    ], timeouts);
    var http_fallback_loop = new if_strategy(testSupportsStrategy(http_loop), http_loop, sockjs_loop);
    var wsStrategy;
    if (baseOptions.useTLS) {
        wsStrategy = new best_connected_ever_strategy([
            ws_loop,
            new delayed_strategy(http_fallback_loop, { delay: 2000 })
        ]);
    }
    else {
        wsStrategy = new best_connected_ever_strategy([
            ws_loop,
            new delayed_strategy(wss_loop, { delay: 2000 }),
            new delayed_strategy(http_fallback_loop, { delay: 5000 })
        ]);
    }
    return new cached_strategy(new first_connected_strategy(new if_strategy(testSupportsStrategy(ws_transport), wsStrategy, http_fallback_loop)), definedTransports, {
        ttl: 1800000,
        timeline: baseOptions.timeline,
        useTLS: baseOptions.useTLS
    });
};
/* harmony default export */ var default_strategy = (getDefaultStrategy);

// CONCATENATED MODULE: ./src/runtimes/web/transports/transport_connection_initializer.ts

/* harmony default export */ var transport_connection_initializer = (function () {
    var self = this;
    self.timeline.info(self.buildTimelineMessage({
        transport: self.name + (self.options.useTLS ? 's' : '')
    }));
    if (self.hooks.isInitialized()) {
        self.changeState('initialized');
    }
    else if (self.hooks.file) {
        self.changeState('initializing');
        Dependencies.load(self.hooks.file, { useTLS: self.options.useTLS }, function (error, callback) {
            if (self.hooks.isInitialized()) {
                self.changeState('initialized');
                callback(true);
            }
            else {
                if (error) {
                    self.onError(error);
                }
                self.onClose();
                callback(false);
            }
        });
    }
    else {
        self.onClose();
    }
});

// CONCATENATED MODULE: ./src/runtimes/web/http/http_xdomain_request.ts

var http_xdomain_request_hooks = {
    getRequest: function (socket) {
        var xdr = new window.XDomainRequest();
        xdr.ontimeout = function () {
            socket.emit('error', new RequestTimedOut());
            socket.close();
        };
        xdr.onerror = function (e) {
            socket.emit('error', e);
            socket.close();
        };
        xdr.onprogress = function () {
            if (xdr.responseText && xdr.responseText.length > 0) {
                socket.onChunk(200, xdr.responseText);
            }
        };
        xdr.onload = function () {
            if (xdr.responseText && xdr.responseText.length > 0) {
                socket.onChunk(200, xdr.responseText);
            }
            socket.emit('finished', 200);
            socket.close();
        };
        return xdr;
    },
    abortRequest: function (xdr) {
        xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
        xdr.abort();
    }
};
/* harmony default export */ var http_xdomain_request = (http_xdomain_request_hooks);

// CONCATENATED MODULE: ./src/core/http/http_request.ts
var http_request_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MAX_BUFFER_LENGTH = 256 * 1024;
var http_request_HTTPRequest = (function (_super) {
    http_request_extends(HTTPRequest, _super);
    function HTTPRequest(hooks, method, url) {
        var _this = _super.call(this) || this;
        _this.hooks = hooks;
        _this.method = method;
        _this.url = url;
        return _this;
    }
    HTTPRequest.prototype.start = function (payload) {
        var _this = this;
        this.position = 0;
        this.xhr = this.hooks.getRequest(this);
        this.unloader = function () {
            _this.close();
        };
        runtime.addUnloadListener(this.unloader);
        this.xhr.open(this.method, this.url, true);
        if (this.xhr.setRequestHeader) {
            this.xhr.setRequestHeader('Content-Type', 'application/json');
        }
        this.xhr.send(payload);
    };
    HTTPRequest.prototype.close = function () {
        if (this.unloader) {
            runtime.removeUnloadListener(this.unloader);
            this.unloader = null;
        }
        if (this.xhr) {
            this.hooks.abortRequest(this.xhr);
            this.xhr = null;
        }
    };
    HTTPRequest.prototype.onChunk = function (status, data) {
        while (true) {
            var chunk = this.advanceBuffer(data);
            if (chunk) {
                this.emit('chunk', { status: status, data: chunk });
            }
            else {
                break;
            }
        }
        if (this.isBufferTooLong(data)) {
            this.emit('buffer_too_long');
        }
    };
    HTTPRequest.prototype.advanceBuffer = function (buffer) {
        var unreadData = buffer.slice(this.position);
        var endOfLinePosition = unreadData.indexOf('\n');
        if (endOfLinePosition !== -1) {
            this.position += endOfLinePosition + 1;
            return unreadData.slice(0, endOfLinePosition);
        }
        else {
            return null;
        }
    };
    HTTPRequest.prototype.isBufferTooLong = function (buffer) {
        return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
    };
    return HTTPRequest;
}(dispatcher));
/* harmony default export */ var http_request = (http_request_HTTPRequest);

// CONCATENATED MODULE: ./src/core/http/state.ts
var State;
(function (State) {
    State[State["CONNECTING"] = 0] = "CONNECTING";
    State[State["OPEN"] = 1] = "OPEN";
    State[State["CLOSED"] = 3] = "CLOSED";
})(State || (State = {}));
/* harmony default export */ var state = (State);

// CONCATENATED MODULE: ./src/core/http/http_socket.ts



var autoIncrement = 1;
var http_socket_HTTPSocket = (function () {
    function HTTPSocket(hooks, url) {
        this.hooks = hooks;
        this.session = randomNumber(1000) + '/' + randomString(8);
        this.location = getLocation(url);
        this.readyState = state.CONNECTING;
        this.openStream();
    }
    HTTPSocket.prototype.send = function (payload) {
        return this.sendRaw(JSON.stringify([payload]));
    };
    HTTPSocket.prototype.ping = function () {
        this.hooks.sendHeartbeat(this);
    };
    HTTPSocket.prototype.close = function (code, reason) {
        this.onClose(code, reason, true);
    };
    HTTPSocket.prototype.sendRaw = function (payload) {
        if (this.readyState === state.OPEN) {
            try {
                runtime.createSocketRequest('POST', getUniqueURL(getSendURL(this.location, this.session))).start(payload);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        else {
            return false;
        }
    };
    HTTPSocket.prototype.reconnect = function () {
        this.closeStream();
        this.openStream();
    };
    HTTPSocket.prototype.onClose = function (code, reason, wasClean) {
        this.closeStream();
        this.readyState = state.CLOSED;
        if (this.onclose) {
            this.onclose({
                code: code,
                reason: reason,
                wasClean: wasClean
            });
        }
    };
    HTTPSocket.prototype.onChunk = function (chunk) {
        if (chunk.status !== 200) {
            return;
        }
        if (this.readyState === state.OPEN) {
            this.onActivity();
        }
        var payload;
        var type = chunk.data.slice(0, 1);
        switch (type) {
            case 'o':
                payload = JSON.parse(chunk.data.slice(1) || '{}');
                this.onOpen(payload);
                break;
            case 'a':
                payload = JSON.parse(chunk.data.slice(1) || '[]');
                for (var i = 0; i < payload.length; i++) {
                    this.onEvent(payload[i]);
                }
                break;
            case 'm':
                payload = JSON.parse(chunk.data.slice(1) || 'null');
                this.onEvent(payload);
                break;
            case 'h':
                this.hooks.onHeartbeat(this);
                break;
            case 'c':
                payload = JSON.parse(chunk.data.slice(1) || '[]');
                this.onClose(payload[0], payload[1], true);
                break;
        }
    };
    HTTPSocket.prototype.onOpen = function (options) {
        if (this.readyState === state.CONNECTING) {
            if (options && options.hostname) {
                this.location.base = replaceHost(this.location.base, options.hostname);
            }
            this.readyState = state.OPEN;
            if (this.onopen) {
                this.onopen();
            }
        }
        else {
            this.onClose(1006, 'Server lost session', true);
        }
    };
    HTTPSocket.prototype.onEvent = function (event) {
        if (this.readyState === state.OPEN && this.onmessage) {
            this.onmessage({ data: event });
        }
    };
    HTTPSocket.prototype.onActivity = function () {
        if (this.onactivity) {
            this.onactivity();
        }
    };
    HTTPSocket.prototype.onError = function (error) {
        if (this.onerror) {
            this.onerror(error);
        }
    };
    HTTPSocket.prototype.openStream = function () {
        var _this = this;
        this.stream = runtime.createSocketRequest('POST', getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
        this.stream.bind('chunk', function (chunk) {
            _this.onChunk(chunk);
        });
        this.stream.bind('finished', function (status) {
            _this.hooks.onFinished(_this, status);
        });
        this.stream.bind('buffer_too_long', function () {
            _this.reconnect();
        });
        try {
            this.stream.start();
        }
        catch (error) {
            util.defer(function () {
                _this.onError(error);
                _this.onClose(1006, 'Could not start streaming', false);
            });
        }
    };
    HTTPSocket.prototype.closeStream = function () {
        if (this.stream) {
            this.stream.unbind_all();
            this.stream.close();
            this.stream = null;
        }
    };
    return HTTPSocket;
}());
function getLocation(url) {
    var parts = /([^\?]*)\/*(\??.*)/.exec(url);
    return {
        base: parts[1],
        queryString: parts[2]
    };
}
function getSendURL(url, session) {
    return url.base + '/' + session + '/xhr_send';
}
function getUniqueURL(url) {
    var separator = url.indexOf('?') === -1 ? '?' : '&';
    return url + separator + 't=' + +new Date() + '&n=' + autoIncrement++;
}
function replaceHost(url, hostname) {
    var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
    return urlParts[1] + hostname + urlParts[3];
}
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}
function randomString(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(randomNumber(32).toString(32));
    }
    return result.join('');
}
/* harmony default export */ var http_socket = (http_socket_HTTPSocket);

// CONCATENATED MODULE: ./src/core/http/http_streaming_socket.ts
var http_streaming_socket_hooks = {
    getReceiveURL: function (url, session) {
        return url.base + '/' + session + '/xhr_streaming' + url.queryString;
    },
    onHeartbeat: function (socket) {
        socket.sendRaw('[]');
    },
    sendHeartbeat: function (socket) {
        socket.sendRaw('[]');
    },
    onFinished: function (socket, status) {
        socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
    }
};
/* harmony default export */ var http_streaming_socket = (http_streaming_socket_hooks);

// CONCATENATED MODULE: ./src/core/http/http_polling_socket.ts
var http_polling_socket_hooks = {
    getReceiveURL: function (url, session) {
        return url.base + '/' + session + '/xhr' + url.queryString;
    },
    onHeartbeat: function () {
    },
    sendHeartbeat: function (socket) {
        socket.sendRaw('[]');
    },
    onFinished: function (socket, status) {
        if (status === 200) {
            socket.reconnect();
        }
        else {
            socket.onClose(1006, 'Connection interrupted (' + status + ')', false);
        }
    }
};
/* harmony default export */ var http_polling_socket = (http_polling_socket_hooks);

// CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http_xhr_request.ts

var http_xhr_request_hooks = {
    getRequest: function (socket) {
        var Constructor = runtime.getXHRAPI();
        var xhr = new Constructor();
        xhr.onreadystatechange = xhr.onprogress = function () {
            switch (xhr.readyState) {
                case 3:
                    if (xhr.responseText && xhr.responseText.length > 0) {
                        socket.onChunk(xhr.status, xhr.responseText);
                    }
                    break;
                case 4:
                    if (xhr.responseText && xhr.responseText.length > 0) {
                        socket.onChunk(xhr.status, xhr.responseText);
                    }
                    socket.emit('finished', xhr.status);
                    socket.close();
                    break;
            }
        };
        return xhr;
    },
    abortRequest: function (xhr) {
        xhr.onreadystatechange = null;
        xhr.abort();
    }
};
/* harmony default export */ var http_xhr_request = (http_xhr_request_hooks);

// CONCATENATED MODULE: ./src/runtimes/isomorphic/http/http.ts





var HTTP = {
    createStreamingSocket: function (url) {
        return this.createSocket(http_streaming_socket, url);
    },
    createPollingSocket: function (url) {
        return this.createSocket(http_polling_socket, url);
    },
    createSocket: function (hooks, url) {
        return new http_socket(hooks, url);
    },
    createXHR: function (method, url) {
        return this.createRequest(http_xhr_request, method, url);
    },
    createRequest: function (hooks, method, url) {
        return new http_request(hooks, method, url);
    }
};
/* harmony default export */ var http_http = (HTTP);

// CONCATENATED MODULE: ./src/runtimes/web/http/http.ts


http_http.createXDR = function (method, url) {
    return this.createRequest(http_xdomain_request, method, url);
};
/* harmony default export */ var web_http_http = (http_http);

// CONCATENATED MODULE: ./src/runtimes/web/runtime.ts












var Runtime = {
    nextAuthCallbackID: 1,
    auth_callbacks: {},
    ScriptReceivers: ScriptReceivers,
    DependenciesReceivers: DependenciesReceivers,
    getDefaultStrategy: default_strategy,
    Transports: transports_transports,
    transportConnectionInitializer: transport_connection_initializer,
    HTTPFactory: web_http_http,
    TimelineTransport: jsonp_timeline,
    getXHRAPI: function () {
        return window.XMLHttpRequest;
    },
    getWebSocketAPI: function () {
        return window.WebSocket || window.MozWebSocket;
    },
    setup: function (PusherClass) {
        var _this = this;
        window.Pusher = PusherClass;
        var initializeOnDocumentBody = function () {
            _this.onDocumentBody(PusherClass.ready);
        };
        if (!window.JSON) {
            Dependencies.load('json2', {}, initializeOnDocumentBody);
        }
        else {
            initializeOnDocumentBody();
        }
    },
    getDocument: function () {
        return document;
    },
    getProtocol: function () {
        return this.getDocument().location.protocol;
    },
    getAuthorizers: function () {
        return { ajax: xhr_auth, jsonp: jsonp_auth };
    },
    onDocumentBody: function (callback) {
        var _this = this;
        if (document.body) {
            callback();
        }
        else {
            setTimeout(function () {
                _this.onDocumentBody(callback);
            }, 0);
        }
    },
    createJSONPRequest: function (url, data) {
        return new jsonp_request(url, data);
    },
    createScriptRequest: function (src) {
        return new script_request(src);
    },
    getLocalStorage: function () {
        try {
            return window.localStorage;
        }
        catch (e) {
            return undefined;
        }
    },
    createXHR: function () {
        if (this.getXHRAPI()) {
            return this.createXMLHttpRequest();
        }
        else {
            return this.createMicrosoftXHR();
        }
    },
    createXMLHttpRequest: function () {
        var Constructor = this.getXHRAPI();
        return new Constructor();
    },
    createMicrosoftXHR: function () {
        return new ActiveXObject('Microsoft.XMLHTTP');
    },
    getNetwork: function () {
        return net_info_Network;
    },
    createWebSocket: function (url) {
        var Constructor = this.getWebSocketAPI();
        return new Constructor(url);
    },
    createSocketRequest: function (method, url) {
        if (this.isXHRSupported()) {
            return this.HTTPFactory.createXHR(method, url);
        }
        else if (this.isXDRSupported(url.indexOf('https:') === 0)) {
            return this.HTTPFactory.createXDR(method, url);
        }
        else {
            throw 'Cross-origin HTTP requests are not supported';
        }
    },
    isXHRSupported: function () {
        var Constructor = this.getXHRAPI();
        return (Boolean(Constructor) && new Constructor().withCredentials !== undefined);
    },
    isXDRSupported: function (useTLS) {
        var protocol = useTLS ? 'https:' : 'http:';
        var documentProtocol = this.getProtocol();
        return (Boolean(window['XDomainRequest']) && documentProtocol === protocol);
    },
    addUnloadListener: function (listener) {
        if (window.addEventListener !== undefined) {
            window.addEventListener('unload', listener, false);
        }
        else if (window.attachEvent !== undefined) {
            window.attachEvent('onunload', listener);
        }
    },
    removeUnloadListener: function (listener) {
        if (window.addEventListener !== undefined) {
            window.removeEventListener('unload', listener, false);
        }
        else if (window.detachEvent !== undefined) {
            window.detachEvent('onunload', listener);
        }
    }
};
/* harmony default export */ var runtime = (Runtime);

// CONCATENATED MODULE: ./src/core/timeline/level.ts
var TimelineLevel;
(function (TimelineLevel) {
    TimelineLevel[TimelineLevel["ERROR"] = 3] = "ERROR";
    TimelineLevel[TimelineLevel["INFO"] = 6] = "INFO";
    TimelineLevel[TimelineLevel["DEBUG"] = 7] = "DEBUG";
})(TimelineLevel || (TimelineLevel = {}));
/* harmony default export */ var timeline_level = (TimelineLevel);

// CONCATENATED MODULE: ./src/core/timeline/timeline.ts



var timeline_Timeline = (function () {
    function Timeline(key, session, options) {
        this.key = key;
        this.session = session;
        this.events = [];
        this.options = options || {};
        this.sent = 0;
        this.uniqueID = 0;
    }
    Timeline.prototype.log = function (level, event) {
        if (level <= this.options.level) {
            this.events.push(extend({}, event, { timestamp: util.now() }));
            if (this.options.limit && this.events.length > this.options.limit) {
                this.events.shift();
            }
        }
    };
    Timeline.prototype.error = function (event) {
        this.log(timeline_level.ERROR, event);
    };
    Timeline.prototype.info = function (event) {
        this.log(timeline_level.INFO, event);
    };
    Timeline.prototype.debug = function (event) {
        this.log(timeline_level.DEBUG, event);
    };
    Timeline.prototype.isEmpty = function () {
        return this.events.length === 0;
    };
    Timeline.prototype.send = function (sendfn, callback) {
        var _this = this;
        var data = extend({
            session: this.session,
            bundle: this.sent + 1,
            key: this.key,
            lib: 'js',
            version: this.options.version,
            cluster: this.options.cluster,
            features: this.options.features,
            timeline: this.events
        }, this.options.params);
        this.events = [];
        sendfn(data, function (error, result) {
            if (!error) {
                _this.sent++;
            }
            if (callback) {
                callback(error, result);
            }
        });
        return true;
    };
    Timeline.prototype.generateUniqueID = function () {
        this.uniqueID++;
        return this.uniqueID;
    };
    return Timeline;
}());
/* harmony default export */ var timeline_timeline = (timeline_Timeline);

// CONCATENATED MODULE: ./src/core/strategies/transport_strategy.ts




var transport_strategy_TransportStrategy = (function () {
    function TransportStrategy(name, priority, transport, options) {
        this.name = name;
        this.priority = priority;
        this.transport = transport;
        this.options = options || {};
    }
    TransportStrategy.prototype.isSupported = function () {
        return this.transport.isSupported({
            useTLS: this.options.useTLS
        });
    };
    TransportStrategy.prototype.connect = function (minPriority, callback) {
        var _this = this;
        if (!this.isSupported()) {
            return failAttempt(new UnsupportedStrategy(), callback);
        }
        else if (this.priority < minPriority) {
            return failAttempt(new TransportPriorityTooLow(), callback);
        }
        var connected = false;
        var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
        var handshake = null;
        var onInitialized = function () {
            transport.unbind('initialized', onInitialized);
            transport.connect();
        };
        var onOpen = function () {
            handshake = factory.createHandshake(transport, function (result) {
                connected = true;
                unbindListeners();
                callback(null, result);
            });
        };
        var onError = function (error) {
            unbindListeners();
            callback(error);
        };
        var onClosed = function () {
            unbindListeners();
            var serializedTransport;
            serializedTransport = safeJSONStringify(transport);
            callback(new TransportClosed(serializedTransport));
        };
        var unbindListeners = function () {
            transport.unbind('initialized', onInitialized);
            transport.unbind('open', onOpen);
            transport.unbind('error', onError);
            transport.unbind('closed', onClosed);
        };
        transport.bind('initialized', onInitialized);
        transport.bind('open', onOpen);
        transport.bind('error', onError);
        transport.bind('closed', onClosed);
        transport.initialize();
        return {
            abort: function () {
                if (connected) {
                    return;
                }
                unbindListeners();
                if (handshake) {
                    handshake.close();
                }
                else {
                    transport.close();
                }
            },
            forceMinPriority: function (p) {
                if (connected) {
                    return;
                }
                if (_this.priority < p) {
                    if (handshake) {
                        handshake.close();
                    }
                    else {
                        transport.close();
                    }
                }
            }
        };
    };
    return TransportStrategy;
}());
/* harmony default export */ var transport_strategy = (transport_strategy_TransportStrategy);
function failAttempt(error, callback) {
    util.defer(function () {
        callback(error);
    });
    return {
        abort: function () { },
        forceMinPriority: function () { }
    };
}

// CONCATENATED MODULE: ./src/core/strategies/strategy_builder.ts





var strategy_builder_Transports = runtime.Transports;
var strategy_builder_defineTransport = function (config, name, type, priority, options, manager) {
    var transportClass = strategy_builder_Transports[type];
    if (!transportClass) {
        throw new UnsupportedTransport(type);
    }
    var enabled = (!config.enabledTransports ||
        arrayIndexOf(config.enabledTransports, name) !== -1) &&
        (!config.disabledTransports ||
            arrayIndexOf(config.disabledTransports, name) === -1);
    var transport;
    if (enabled) {
        options = Object.assign({ ignoreNullOrigin: config.ignoreNullOrigin }, options);
        transport = new transport_strategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options);
    }
    else {
        transport = strategy_builder_UnsupportedStrategy;
    }
    return transport;
};
var strategy_builder_UnsupportedStrategy = {
    isSupported: function () {
        return false;
    },
    connect: function (_, callback) {
        var deferred = util.defer(function () {
            callback(new UnsupportedStrategy());
        });
        return {
            abort: function () {
                deferred.ensureAborted();
            },
            forceMinPriority: function () { }
        };
    }
};

// CONCATENATED MODULE: ./src/core/config.ts


function getConfig(opts) {
    var config = {
        activityTimeout: opts.activityTimeout || defaults.activityTimeout,
        authEndpoint: opts.authEndpoint || defaults.authEndpoint,
        authTransport: opts.authTransport || defaults.authTransport,
        cluster: opts.cluster || defaults.cluster,
        httpPath: opts.httpPath || defaults.httpPath,
        httpPort: opts.httpPort || defaults.httpPort,
        httpsPort: opts.httpsPort || defaults.httpsPort,
        pongTimeout: opts.pongTimeout || defaults.pongTimeout,
        statsHost: opts.statsHost || defaults.stats_host,
        unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
        wsPath: opts.wsPath || defaults.wsPath,
        wsPort: opts.wsPort || defaults.wsPort,
        wssPort: opts.wssPort || defaults.wssPort,
        enableStats: getEnableStatsConfig(opts),
        httpHost: getHttpHost(opts),
        useTLS: shouldUseTLS(opts),
        wsHost: getWebsocketHost(opts)
    };
    if ('auth' in opts)
        config.auth = opts.auth;
    if ('authorizer' in opts)
        config.authorizer = opts.authorizer;
    if ('disabledTransports' in opts)
        config.disabledTransports = opts.disabledTransports;
    if ('enabledTransports' in opts)
        config.enabledTransports = opts.enabledTransports;
    if ('ignoreNullOrigin' in opts)
        config.ignoreNullOrigin = opts.ignoreNullOrigin;
    if ('timelineParams' in opts)
        config.timelineParams = opts.timelineParams;
    if ('nacl' in opts) {
        config.nacl = opts.nacl;
    }
    return config;
}
function getHttpHost(opts) {
    if (opts.httpHost) {
        return opts.httpHost;
    }
    if (opts.cluster) {
        return "sockjs-" + opts.cluster + ".pusher.com";
    }
    return defaults.httpHost;
}
function getWebsocketHost(opts) {
    if (opts.wsHost) {
        return opts.wsHost;
    }
    if (opts.cluster) {
        return getWebsocketHostFromCluster(opts.cluster);
    }
    return getWebsocketHostFromCluster(defaults.cluster);
}
function getWebsocketHostFromCluster(cluster) {
    return "ws-" + cluster + ".pusher.com";
}
function shouldUseTLS(opts) {
    if (runtime.getProtocol() === 'https:') {
        return true;
    }
    else if (opts.forceTLS === false) {
        return false;
    }
    return true;
}
function getEnableStatsConfig(opts) {
    if ('enableStats' in opts) {
        return opts.enableStats;
    }
    if ('disableStats' in opts) {
        return !opts.disableStats;
    }
    return false;
}

// CONCATENATED MODULE: ./src/core/pusher.ts












var pusher_Pusher = (function () {
    function Pusher(app_key, options) {
        var _this = this;
        checkAppKey(app_key);
        options = options || {};
        if (!options.cluster && !(options.wsHost || options.httpHost)) {
            var suffix = url_store.buildLogSuffix('javascriptQuickStart');
            logger.warn("You should always specify a cluster when connecting. " + suffix);
        }
        if ('disableStats' in options) {
            logger.warn('The disableStats option is deprecated in favor of enableStats');
        }
        this.key = app_key;
        this.config = getConfig(options);
        this.channels = factory.createChannels();
        this.global_emitter = new dispatcher();
        this.sessionID = Math.floor(Math.random() * 1000000000);
        this.timeline = new timeline_timeline(this.key, this.sessionID, {
            cluster: this.config.cluster,
            features: Pusher.getClientFeatures(),
            params: this.config.timelineParams || {},
            limit: 50,
            level: timeline_level.INFO,
            version: defaults.VERSION
        });
        if (this.config.enableStats) {
            this.timelineSender = factory.createTimelineSender(this.timeline, {
                host: this.config.statsHost,
                path: '/timeline/v2/' + runtime.TimelineTransport.name
            });
        }
        var getStrategy = function (options) {
            return runtime.getDefaultStrategy(_this.config, options, strategy_builder_defineTransport);
        };
        this.connection = factory.createConnectionManager(this.key, {
            getStrategy: getStrategy,
            timeline: this.timeline,
            activityTimeout: this.config.activityTimeout,
            pongTimeout: this.config.pongTimeout,
            unavailableTimeout: this.config.unavailableTimeout,
            useTLS: Boolean(this.config.useTLS)
        });
        this.connection.bind('connected', function () {
            _this.subscribeAll();
            if (_this.timelineSender) {
                _this.timelineSender.send(_this.connection.isUsingTLS());
            }
        });
        this.connection.bind('message', function (event) {
            var eventName = event.event;
            var internal = eventName.indexOf('pusher_internal:') === 0;
            if (event.channel) {
                var channel = _this.channel(event.channel);
                if (channel) {
                    channel.handleEvent(event);
                }
            }
            if (!internal) {
                _this.global_emitter.emit(event.event, event.data);
            }
        });
        this.connection.bind('connecting', function () {
            _this.channels.disconnect();
        });
        this.connection.bind('disconnected', function () {
            _this.channels.disconnect();
        });
        this.connection.bind('error', function (err) {
            logger.warn(err);
        });
        Pusher.instances.push(this);
        this.timeline.info({ instances: Pusher.instances.length });
        if (Pusher.isReady) {
            this.connect();
        }
    }
    Pusher.ready = function () {
        Pusher.isReady = true;
        for (var i = 0, l = Pusher.instances.length; i < l; i++) {
            Pusher.instances[i].connect();
        }
    };
    Pusher.getClientFeatures = function () {
        return keys(filterObject({ ws: runtime.Transports.ws }, function (t) {
            return t.isSupported({});
        }));
    };
    Pusher.prototype.channel = function (name) {
        return this.channels.find(name);
    };
    Pusher.prototype.allChannels = function () {
        return this.channels.all();
    };
    Pusher.prototype.connect = function () {
        this.connection.connect();
        if (this.timelineSender) {
            if (!this.timelineSenderTimer) {
                var usingTLS = this.connection.isUsingTLS();
                var timelineSender = this.timelineSender;
                this.timelineSenderTimer = new PeriodicTimer(60000, function () {
                    timelineSender.send(usingTLS);
                });
            }
        }
    };
    Pusher.prototype.disconnect = function () {
        this.connection.disconnect();
        if (this.timelineSenderTimer) {
            this.timelineSenderTimer.ensureAborted();
            this.timelineSenderTimer = null;
        }
    };
    Pusher.prototype.bind = function (event_name, callback, context) {
        this.global_emitter.bind(event_name, callback, context);
        return this;
    };
    Pusher.prototype.unbind = function (event_name, callback, context) {
        this.global_emitter.unbind(event_name, callback, context);
        return this;
    };
    Pusher.prototype.bind_global = function (callback) {
        this.global_emitter.bind_global(callback);
        return this;
    };
    Pusher.prototype.unbind_global = function (callback) {
        this.global_emitter.unbind_global(callback);
        return this;
    };
    Pusher.prototype.unbind_all = function (callback) {
        this.global_emitter.unbind_all();
        return this;
    };
    Pusher.prototype.subscribeAll = function () {
        var channelName;
        for (channelName in this.channels.channels) {
            if (this.channels.channels.hasOwnProperty(channelName)) {
                this.subscribe(channelName);
            }
        }
    };
    Pusher.prototype.subscribe = function (channel_name) {
        var channel = this.channels.add(channel_name, this);
        if (channel.subscriptionPending && channel.subscriptionCancelled) {
            channel.reinstateSubscription();
        }
        else if (!channel.subscriptionPending &&
            this.connection.state === 'connected') {
            channel.subscribe();
        }
        return channel;
    };
    Pusher.prototype.unsubscribe = function (channel_name) {
        var channel = this.channels.find(channel_name);
        if (channel && channel.subscriptionPending) {
            channel.cancelSubscription();
        }
        else {
            channel = this.channels.remove(channel_name);
            if (channel && this.connection.state === 'connected') {
                channel.unsubscribe();
            }
        }
    };
    Pusher.prototype.send_event = function (event_name, data, channel) {
        return this.connection.send_event(event_name, data, channel);
    };
    Pusher.prototype.shouldUseTLS = function () {
        return this.config.useTLS;
    };
    Pusher.instances = [];
    Pusher.isReady = false;
    Pusher.logToConsole = false;
    Pusher.Runtime = runtime;
    Pusher.ScriptReceivers = runtime.ScriptReceivers;
    Pusher.DependenciesReceivers = runtime.DependenciesReceivers;
    Pusher.auth_callbacks = runtime.auth_callbacks;
    return Pusher;
}());
/* harmony default export */ var core_pusher = __webpack_exports__["default"] = (pusher_Pusher);
function checkAppKey(key) {
    if (key === null || key === undefined) {
        throw 'You must pass your app key when you instantiate Pusher.';
    }
}
runtime.setup(pusher_Pusher);


/***/ })
/******/ ]);
});

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.app = {
  init: function init() {
    __webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

    __webpack_require__(/*! ./components/comments */ "./resources/js/components/comments.js");

    __webpack_require__(/*! ./components/dropzone */ "./resources/js/components/dropzone.js");

    __webpack_require__(/*! ./components/clipboard */ "./resources/js/components/clipboard.js");
  }
};
window.app.init();

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var laravel_echo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! laravel-echo */ "./node_modules/laravel-echo/dist/echo.js");
window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.Dropzone = __webpack_require__(/*! dropzone/dist/dropzone */ "./node_modules/dropzone/dist/dropzone.js");
Dropzone.autoDiscover = false;

window.Pusher = __webpack_require__(/*! pusher-js */ "./node_modules/pusher-js/dist/web/pusher.js");
window.Echo = new laravel_echo__WEBPACK_IMPORTED_MODULE_0__["default"]({
  broadcaster: 'pusher',
  key: "ad7b362d910c26173c80",
  cluster: "us2",
  encrypted: true
});

/***/ }),

/***/ "./resources/js/components/clipboard.js":
/*!**********************************************!*\
  !*** ./resources/js/components/clipboard.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
Clipboard = __webpack_require__(/*! clipboard/dist/clipboard.min */ "./node_modules/clipboard/dist/clipboard.min.js");

cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var clipboard = new Clipboard('#share-url-button');
});

/***/ }),

/***/ "./resources/js/components/comments.js":
/*!*********************************************!*\
  !*** ./resources/js/components/comments.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);

cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var $image = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#imageCanvas');
  var $uploadId = $image.data('upload-id'); //Create point and comment

  $image.on('click', function (event) {
    var height = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).height();
    var width = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).width();
    var positionX = event.offsetX;
    var positionY = event.offsetY;
    var coordinateX = positionX / width;
    var coordinateY = positionY / height;
    var position = {
      coordinateX: coordinateX,
      coordinateY: coordinateY
    };
    var target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).data('target');
    axios.post(target, position).then(function (response) {
      var commentId = response.data;
      var url = '/comments/' + commentId;
      var submitCommentForm = '<div class="rounded-md mt-2">\n' + '    <textarea\n' + '        class="resize-none focus:outline-none p-1 text-sm rounded-md focus:opacity-100 opacity-75"\n' + '        name="body"\n' + '        placeholder="Type your comment"' + '        data-comment-url="' + url + '"' + '></textarea>\n' + '</div>';
      var $comment = '<div class="comment"\n' + '     style="position: absolute;\n' + '         top: ' + coordinateY * 100 + '%;\n' + '         left: ' + coordinateX * 100 + '%;">\n' + '    <div class="flex -ml-2 -mt-2">\n' + '        <div style="min-width: 1rem" title="Remove" class="comment-pointer cursor-pointer w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">X</div>\n' + submitCommentForm + '    </div>\n' + '</div>';
      $image.closest('div').append($comment);
    })["catch"](function (error) {
      window.location.href = '/login';
    });
  }); //Update comment content

  $image.closest('div').on('click', '.comment textarea', function (event) {
    var url = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).data('comment-url');
    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).on('focusout', function () {
      var body = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
      axios.post(url, {
        body: body,
        _method: 'put'
      }).then(function (response) {})["catch"](function (error) {});
    });
  }); //Destroy comment

  $image.closest('div').on('click', '.comment-pointer', function () {
    var $comment = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.comment');
    var url = $comment.find('textarea').data('comment-url');
    $comment.remove();
    axios.post(url, {
      _method: 'delete'
    }).then(function (response) {})["catch"](function (error) {});
  }); // Broadcast comments

  window.Echo["private"]("comments." + $uploadId).listen('CommentUpdated', function (e) {
    var $comment = '<div class="comment" id="comment-1" style="position: absolute;\n' + '             top:' + e.comment.coordinate_y * 100 + '%;\n' + '             left:' + e.comment.coordinate_x * 100 + '%;">\n' + '        <div class="flex -ml-2 -mt-2">\n' + '            <div style="min-width: 1rem"\n' + '                 class="w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">\n' + '                !\n' + '            </div>\n' + '\n' + '            <div class=" rounded-md mt-2 ">\n' + '                <div class="bg-white text-sm rounded-t-md p-1 opacity-75 text-xs font-bold flex items-center"\n' + '                     title="1 minute ago on 2020-05-12 19:31:38">\n' + '                    <img src="//localhost:3000/img/avatar.png" class="mr-1"\n' + '                         style="max-width: 1rem;height: 1rem; display: inline">\n' + '\n' + '                    <p class="text-xs leading-none">' + e.commentAuthor.name + '</p>\n' + '                </div>\n' + '\n' + '                <div class="bg-white p-1 text-sm rounded-b-md opacity-75 border-t-2">\n' + '                    ' + e.comment.body + '\n' + '                </div>\n' + '            </div>\n' + '        </div>\n' + '    </div>';
    $image.closest('div').append($comment);
  });
});

/***/ }),

/***/ "./resources/js/components/dropzone.js":
/*!*********************************************!*\
  !*** ./resources/js/components/dropzone.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);

cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var options = {
    maxFiles: 1,
    dictDefaultMessage: 'Drop or upload your visual here',
    paramName: "image",
    previewTemplate: '<div class="dz-preview dz-file-preview">\n' + '                    <div class="dz-details">\n' + '                        <img class="m-auto" data-dz-thumbnail />\n' + '                    </div>\n' + '                    <div class="dz-error-message hidden"><span data-dz-errormessage></span></div>\n' + '                </div>',
    init: function init() {
      this.on('maxfilesexceeded', function (file) {
        this.removeAllFiles();
        this.addFile(file);
      });
      this.on('success', function (file, response) {
        window.location.href = 'uploads/' + response;
      });
      this.on('error', function (file, response) {
        if (response.errors !== undefined) {
          cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.dropzone .dz-preview .dz-error-message').addClass('block').removeClass('hidden');
          cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.dropzone .dz-preview .dz-error-message span').text(response.errors['image'][0]);
        }
      });
    }
  };

  if (cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.dropzone').length > 0) {
    new Dropzone('.dropzone', options);
  }
});

/***/ }),

/***/ 0:
/*!***********************************************************!*\
  !*** multi ./resources/js/app.js ./resources/css/app.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Projects\annotation-image\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\Projects\annotation-image\resources\css\app.css */"./resources/css/app.css");


/***/ })

/******/ });