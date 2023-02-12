import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import globalComponents from '@/components'
import router from './router'
import store from './store'
import i18n from './locale'
import directive from './directive'
import './mock'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/styles/tailwind.css'
import '@/styles/global.less'
import '@/api/interceptor'

const app = createApp(App)

app.use(ArcoVue, {}).use(ArcoVueIcon)

app.use(router).use(store).use(i18n).use(globalComponents).use(directive)

app.mount('#app')

window.gvm = app
