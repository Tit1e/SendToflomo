import { ElLoading } from 'element-plus'
import { writeText } from '@tauri-apps/api/clipboard';
import { ElMessage } from 'element-plus'
import i18n from '@/language/index'
const t = i18n.global.t

export const copy = async (text, msg = t('copied')) => {
  try {
    await writeText(text)
    if(msg) ElMessage.success(msg)
    return true
  } catch (error) {
    console.error(error)
    return Promise.reject()
  }
}

export const copyContent = async (text, msg = t('copied')) => {
  try {
    await navigator.clipboard.writeText(text);
    if(msg) ElMessage.success(msg)
    return true
  } catch (error) {
    console.error(error)
    return Promise.reject()
  }
}

export const isTauri = () => {
  return Boolean(
    typeof window !== 'undefined' &&
      window !== undefined &&
      window.__TAURI_IPC__ !== undefined
  )
}

export const  Loading =  (options = {}) => {
  return ElLoading.service({
    body: true,
    lock: true,
    text: t('loading'),
    ...options
  })
}

export const testFile = (name) => {
  const whiteExt = ['html', 'txt', 'json']
  const ext = name
    .split('.')
    .pop()
    .toLowerCase()
  if (whiteExt.includes(ext)) return ext
  return ''
}

export const isAutoUpdate = () => {
  const val = window.localStorage.getItem('autoUpdate')
  if (val === 'true' || val === null) return true
  return false
}