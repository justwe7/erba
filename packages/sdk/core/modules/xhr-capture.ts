// https://github.com/rrweb-io/rrweb/issues/552
type XHRRequestBody = string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;

interface XHRLog {
  method: string;
  url: string;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  requestBody: XHRRequestBody;
  responseBody: any;
  status?: number;
  statusText?: string;
  xhrLogCounter: string;
  performance?: PerformanceResourceTiming;
  payloadsCaptured: boolean;
}

interface XHRCaptureOptions {
  capturePayload: boolean;
  redactFunction?: (xhrLog: XHRLog) => XHRLog;
  suppressFunction?: (xhrLog: XHRLog) => boolean;
}

type PerformanceResourceTimingList = Array<PerformanceResourceTiming>;

(function(opts?: XHRCaptureOptions) {
  // Init options if not specified
  const options = opts || {
    capturePayload: false,
  };

  // Store a reference to the native method
  const oldOpen = XMLHttpRequest.prototype.open;

  let xhrLogCounter = 1;

  // Overwrite the native method
  XMLHttpRequest.prototype.open = function(method: string, url: string, async = true, username?: string | null, password?: string | null) {
    const that: XMLHttpRequest = this;

    let xhrLog: XHRLog = {
      method,
      url,
      requestHeaders: {},
      requestBody: null,
      responseHeaders: {},
      responseBody: null,
      xhrLogCounter: `xhrLog${xhrLogCounter}`,
      payloadsCaptured: options.capturePayload || false
    };

    xhrLogCounter++;

    // Capture headers set
    const oldSetRequestHeader = that.setRequestHeader;
    that.setRequestHeader = function(name: string, value: string) {
      xhrLog.requestHeaders[name] = value;

      oldSetRequestHeader.call(this, name, value);
    };

    // Capture what is sent up
    const oldSend = that.send;
    that.send = function(body?: XHRRequestBody) {
      if (typeof body !== 'undefined' && options.capturePayload) {
        xhrLog.requestBody = body;
      }

      // Set a mark before we trigger the XHR so we can find the performance data easier
      window.performance.mark(xhrLog.xhrLogCounter);

      oldSend.call(this, body);
    }

    // Assign an event listener
    that.addEventListener('load', function(/*event*/) {
      if (options.capturePayload) {
        xhrLog.responseBody = that.response;
      }
    }, false);

    that.addEventListener('loadend', function(/*event*/) {

      // Get the raw header string
      const rawHeaders: string = that.getAllResponseHeaders();

      // Convert the header string into an array
      // of individual headers
      const headers: Array<string> = rawHeaders.trim().split(/[\r\n]+/);

      // Create a map of header names to values
      headers.forEach((line) => {
        const parts = line.split(': ');
        const header = parts.shift();
        const value = parts.join(': ');
        if (typeof header === 'string') {
          xhrLog.responseHeaders[header] = value;
        }
      });


      xhrLog.status = that.status;
      xhrLog.statusText = that.statusText;

      // It seems that getEntries() really returns Array<PerformanceResourceTiming>, but it is
      // defined as returning PerformanceEntryList, which does not expose the 'initiatorType'
      // property. Cast to PerformanceResourceTimingList so typescript knows about 'initiatorType'
      const entries = window.performance.getEntries() as PerformanceResourceTimingList;
      let markIndex = -1;
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.name === xhrLog.xhrLogCounter) {
          markIndex = i;
          break;
        }
      }
      if (markIndex >= 0) {
        for (let i = markIndex; i < entries.length; i++) {
          const entry = entries[i];
          if (
            entry.initiatorType === 'xmlhttprequest'
            && entry.name
            && entry.name.indexOf(xhrLog.url) >= 0
          ) {
            xhrLog.performance = entry;
            break;
          }
        }
      }

      window.performance.clearMarks(xhrLog.xhrLogCounter);

      // Opportunity to redact anything on the record
      if (typeof options.redactFunction === 'function') {
        xhrLog = options.redactFunction(xhrLog);
      } else if(typeof options.redactFunction !== 'undefined') {
        console.warn('options.redactFunction must be a function.');
      }

      // Opportunity to suppress
      if (typeof options.suppressFunction === 'function') {
        if (options.suppressFunction(xhrLog)) return;
      } else if(typeof options.suppressFunction !== 'undefined') {
        console.warn('options.suppressFunction must be a function.');
      }

      // Fire an event with this XHR capture
      const xhrEvent = new CustomEvent('xhrLog', {
        detail: xhrLog,
      });
      document.dispatchEvent(xhrEvent);
    }, false);

    // Call the stored reference to the native method
    oldOpen.call(this, method, url, async, username, password);
  };

})();

// Sample listener to collect the xhrLog records
document.addEventListener('xhrLog', (event: CustomEventInit<XHRLog>) => {
  console.log('xhrLog', JSON.stringify(event.detail, null, 2));
}, false);
