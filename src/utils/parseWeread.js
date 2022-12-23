import { dexieGet, dexieAdd } from '@/db/dexie'
import md5 from 'md5'
import init from '@/utils/init.js'
export default async function parseWeread(text) {
  try {
    const notes = text.split('\n')
    let index = 0
    let uuid = ''
    let title = ''
    let isMind = false

    let noteItem = {
      uuid: '',
      title: '',
      text: '',
      note: '',
      content_update: '',
      uploaded: false,
      from: 'weread'
    }
    for (const item of notes) {
      if (item === '') {
        index++
        continue
      }
      // 判断是否是书名
      if (item[0] === '《' && index === 0) {
        title = item
        uuid = md5(title)
        const bookInfo = {
          uuid,
          title,
          book: title,
          from: 'wereader'
        }
        const res = await dexieGet(uuid, 'books')
        if (!res) {
          await dexieAdd(bookInfo, 'books')
        }
        index ++
        continue
      }
      // 判断是否是笔记
      if (item.indexOf('发表想法') > 0) {
        isMind = true
        index ++
        continue
      }
      if (item && isMind) {
        noteItem.note = item
        isMind = false
        index ++
        continue
      }
      if (item.indexOf('>>') === 0) {
        noteItem.uuid = md5(`${title}${item}`)
        noteItem.text = item.replace('>> ', '')
        noteItem.title = title

        const res = await dexieGet(noteItem.uuid)
        if (!res) {
          await dexieAdd(noteItem)
        }
        noteItem = {
          uuid: '',
          title: '',
          text: '',
          note: '',
          content_update: '',
          uploaded: false,
          from: 'weread'
        }
        index ++
      }
      index ++
    }
    init()
    return
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}