import { DefineComponent } from 'vue'

declare global {
  interface Window {
    gvm: any;
  }
}

interface AnyObject {
  [key: string]: any;
}
