import { toRaw } from 'vue'
import { open } from '@tauri-apps/api/shell'
import { isTauri } from './index.js'
import { dexieClear } from '@/db/dexie.js'

export function openUrl(url) {
  if(!url || !isTauri()) return false
  open(url)
}


export function addField(list) {
  return list.map(i => {
    return {
      ...i,
      checked: false,
      content: '',
      content_temp: ''
    }
  })
}

export function delField(proxy) {
  const row = { ...toRaw(proxy) }
  delete row.checked
  delete row.content
  delete row.content_temp
  return row
}

export const clearAllData = async () => {
  try {
    await  Promise.all([await dexieClear('notes'), await dexieClear('books')])
    return Promise.resolve()
  } catch (error) {
    console.error(error)
    return Promise.reject()
  }
}