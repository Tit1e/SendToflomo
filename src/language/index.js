import { createI18n } from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
const modules = {
  'en-US': enUS,
  'zh-CN': zhCN
}

//注册i8n实例并引入语言文件
const locale = window.localStorage.getItem('locale') || 'zh-CN'
const i18n = createI18n({
  legacy: false,
  locale: locale,
  messages: modules
})

export default i18n