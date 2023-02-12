export function addEventListen (
  target: Window | HTMLElement,
  event: string,
  // eslint-disable-next-line no-undef
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.addEventListener &&
    typeof target.addEventListener === 'function'
  ) {
    target.addEventListener(event, handler, capture)
  }
}

export function removeEventListen (
  target: Window | HTMLElement,
  event: string,
  // eslint-disable-next-line no-undef
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.removeEventListener &&
    typeof target.removeEventListener === 'function'
  ) {
    target.removeEventListener(event, handler, capture)
  }
}
