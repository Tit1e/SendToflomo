import { dexieGet, dexieAdd, dexiePut } from '@/db/dexie'
export default async function importData({ books, notes }) {
  try {
    if (books.length) {
      for (let i = 0; i < books.length; i++) {
        let book = books[i];
        const newInfo = await dexieGet(book.uuid, 'books')
        if (newInfo) {
          book = {
            ...newInfo,
            ...book,
            // 修正原本 from错误问题
            from: newInfo.from
          }
          await dexiePut(book, 'books')
          continue
        }
        await dexieAdd(book, 'books')
      }
    }
    if (notes.length) {
      for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        const newInfo = await dexieGet(note.uuid)
        if (newInfo) {
          note = {
            ...newInfo,
            ...note,
            // 修正原本 from错误问题
            from: newInfo.from
          }
          await dexiePut(note)
          continue
        }
        await dexieAdd(note)
      }
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}