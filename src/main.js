import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus'

import './theme/index.scss'
import VueI18n from './language'
import store from '@/store/index.js'

import '@/assets/css/index.scss'

import { checkUpdate } from '@tauri-apps/api/updater';
checkUpdate().then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
console.log(111)
const app = createApp(App)
app.use(ElementPlus)
app.use(VueI18n)
app.use(store)
app.mount('#app')


export default app
