<template>
  <div
    class="content-wrap"
    :class="{'pt-40': isTauri}"
    @dragenter="dragenterEvent"
    @dragover="dragoverEvent"
    @dragleave="dragleaveEvent"
    @drop="dropEvent"
  >
    <left-bar
      class="left-bar"
      ref="leftContent"
      @submit="submit"
      @parse="parse"
      @list-update="listUpdate"
      @update-tag="updateTag"
    />
    <right-content class="right-content" />
    <div id="g-cover" v-if="cover">
    </div>
  </div>
</template>

<script setup>
import LeftBar from '@/components/LeftBar/index.vue'
import RightContent from '@/components/RightContent/index.vue'
import init from '@/utils/init.js'
import readFile from '@/utils/readFile.js'
import readJSON from '@/utils/readJSON.js'
import paresClip from '@/utils/paresClip.js'
import parseAppleBooks from '@/utils/parseAppleBooks.js'
import parseWeread from '@/utils/parseWeread.js'
import {
  ref,
  computed,
  onMounted
} from 'vue'
import { ElMessage, ElLoading} from 'element-plus'
import addMemo from '@/utils/addMemo'
import { useStore } from 'vuex'
import { dexiePut } from '@/db/dexie'
import { delField } from '@/utils/utils'
import { isAutoUpdate } from '@/utils/index.js'
import checkUpdate from '@/utils/checkUpdate.js'
import { Loading, testFile } from '@/utils/index.js'
import { useI18n } from 'vue-i18n'
import { indexOf } from 'lodash'
const { t } = useI18n()
const store = useStore()
const isTauri = store.getters.isTauri

if (isTauri) {
  if (isAutoUpdate()) {
    // 触发自动更新
    checkUpdate()
  }
  // 自动读取 Apple Books 笔记
  parseAppleBooks()
}

let loadingInstance = null
const parseNum = ref(0)
const cover = ref(false)


const dragenterEvent = (event) => {
  event.stopPropagation();
  event.preventDefault();
}
const dragoverEvent = (event) => {
  event.stopPropagation();
  event.preventDefault();
  cover.value = true
}
const dragleaveEvent = (event) => {
  event.stopPropagation();
  event.preventDefault();
  cover.value = false
}

const isWeread = text =>{
  const a = text[0] === '《'
  const b = text.indexOf('◆') >= 0
  const c = text.indexOf('>>') >= 0
  return a && b && c
}

onMounted(() => {
  document.body.addEventListener('paste', async (event) => {
    if (!event.target.type || event.target.type === undefined) {
      const text = event.clipboardData.getData('text')
      if (text && isWeread(text)) {
        loadingInstance = Loading({text: t('reading-notes')})
        await parseWeread(text)
        loadingInstance.close()
      }
    }
  })
})

const handleFile = (file, ext = '') => {
    if(!ext) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        if (ext === 'txt') {
          await paresClip(reader.result)
        }
        if (ext === 'html') {
          await readFile(reader.result)
        }
        if (ext === 'json') {
          await readJSON(reader.result)
        }
        parseNum.value -= 1
        if(parseNum.value === 0) loadingInstance.close()
      } catch (error) {
        console.log(`${file.name} 解析出错：${error}`)
        parseNum.value -= 1
        if(parseNum.value === 0) loadingInstance.close()
      }
    }
    reader.readAsText(file)
}

const dropEvent = event => {
  cover.value = false
  event.stopPropagation();
  event.preventDefault();
  const files = event.dataTransfer.files;
  if(!files.length) return
  loadingInstance = Loading({text: t('reading-notes')})
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const r = testFile(file.name)
    if (r) {
      handleFile(file, r)
      parseNum.value += 1
    }
  }
}




const bookSort = JSON.parse(localStorage.getItem('bookSort') || '[]').reverse()
init(bookSort)

const importCount = computed(() => store.getters.importCount)
const selectedList = computed(() => store.getters.selectedList)
const tag = ref('')
let index = ref(0)
const total = ref(0)


const loadingText = computed(() => {
  return `${t('progress')}： ${index.value + 1}/${total.value}`
})


const loading = ref(null)

function submit (url) {
  total.value = selectedList.value.length
  loading.value = ElLoading.service({
    lock: true,
    text: loadingText,
  })
  index.value = 0
  sendMemo(url, selectedList.value, index.value)
}
async function sendMemo (url, list, _index) {
  loading.value.setText(loadingText)
  try {
    const item = list[_index]
    const { data: {code, message} } = await addMemo(url, item.content_update || item.content)
    if(code === 0){
      item.uploaded = true
      item.checked = false
      item.content_update = item.content
      store.commit('SET_IMPORT_COUNT', importCount.value + 1)
      store.commit('UPDATE_TEXT_LIST', {uuid: item.uuid, uploaded: true, checked: false, content_update: item.content})
      await dexiePut(delField(item))
      if (_index < list.length - 1) {
        setTimeout(() => {
          index.value += 1
          sendMemo(url, list, index.value)
        }, 1000)
      } else {
        loading.value.close()
        ElMessage.success(t('import-success'))
      }
    } else {
      console.error(message)
      ElMessage.error(t('import-failure'))
    }
  } catch (error) {
    console.error(error)
    ElMessage.error(t('import-failure'))
    loading.value.close()
  }
}
function parse (options) {
  store.commit('UPDATE_PARSE_OPTIONS', {
    options,
    tag: tag.value
  })
}

function listUpdate ({ list, options }) {
  store.commit('UPDATE_PARSE_OPTIONS', {
    options,
    tag: tag.value
  })
}
function updateTag (_tag) {
  tag.value = _tag
}

</script>

<style lang="scss">
#app {
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fafafa;
  .content-wrap {
    &.pt-40{
      padding-top: 40px;
    }
    height: 0px;
    flex: 1;
    display: flex;
    .left-bar {
      width: 280px;
    }
    .right-content {
      width: 0;
      flex: 1;
    }
  }
  #g-cover{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: rgba($color: #fff, $alpha: 1);
    z-index: 99999;
    pointer-events: none;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      background-image: url(./assets/img/import2.png);
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.65;
    }
  }
}
</style>