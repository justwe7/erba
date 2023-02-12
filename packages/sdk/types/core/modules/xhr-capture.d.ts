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
