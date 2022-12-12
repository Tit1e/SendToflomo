import axios from 'axios'
axios.defaults.baseURL = 'https://i.weread.qq.com'

function getUserVid() {
  return new Promise((r, j) => {
    try {
      // const { session } = require('@electron/remote')
      session.defaultSession.cookies.get({ url: 'https://weread.qq.com' }).then(res => {
        if (res && res.length) {
          const vid = res.find(i => i.name === 'wr_vid')
          if (vid) r(vid.value)
          j(false)
        }
        j(false)
      }).catch(() => j(false))
    } catch (error) {
      console.log(error)
      j(false)
    }
  })
}


const headers = {
  Host: 'i.weread.qq.com',
  Connection: 'keep-alive',
  'Upgrade-Insecure-Requests': 1,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}

axios.interceptors.request.use(
  function (config) {
    return {
      ...config
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // if no data
    // if ('synckey' in response.data && !response.data.synckey) {
    //   return Promise.reject('no data available')
    // }
    return response.data
  },
  function (error) {
    const { response } = error
    if (response) {
      console.log(response.statusText, response.data && response.data.errmsg)
      return Promise.reject(response.data)
    } else {
      console.log('something wrong')
    }
    // return Promise.reject(error.response);
  }
)
// 获取某本书你的全部笔记
export const get_bookmarklist = bookId => {
  return axios({
    method: 'get',
    url: '/book/bookmarklist',
    headers,
    params: {
      bookId
    }
  })
}
// 获取某一本书的热门划线
export const get_bestbookmarks = bookId => {
  return axios({
    method: 'get',
    url: '/book/bestbookmarks',
    headers,
    params: {
      bookId
    }
  })
}
// 获取书架上的书籍列表
export const get_bookshelf = async () => {
  const userVid = await getUserVid().catch(e => {})
  return axios({
    method: 'get',
    url: '/shelf/friendCommon',
    headers,
    params: {
      userVid
    }
  })
}
// 获取你的所有有笔记本书单
export const get_notebooklist = async () => {
  const userVid = await getUserVid().catch(e => {
    console.log(e)
  })
  if (!userVid) {
    return Promise.reject(401)
  }
  return axios({
    method: 'get',
    headers,
    url: '/user/notebooks'
  })
}
// 获取某本书的详情
export const get_bookinfo = bookId => {
  return axios({
    method: 'get',
    url: '/book/info',
    headers,
    params: {
      bookId
    }
  })
}

// 获取某本书的批注
export const get_reviewlist = async (params) => {
  const userVid = await getUserVid().catch(e => {})
  return axios({
    method: 'get',
    url: '/web/review/list',
    baseURL: 'https://weread.qq.com',
    headers,
    params: {
      userVid,
      ...params
    }
  })
}
