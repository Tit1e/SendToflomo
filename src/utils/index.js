import { ElLoading } from 'element-plus'
import { writeText } from '@tauri-apps/api/clipboard';
import { ElMessage } from 'element-plus'
export const copy = async (text, msg = '已复制') => {
  try {
    await writeText(text)
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
    text: '正在加载',
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