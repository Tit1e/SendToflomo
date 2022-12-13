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
import {
  ref,
  computed
} from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import addMemo from '@/utils/addMemo'
import { useStore } from 'vuex'
import { dexiePut } from '@/db/dexie'
import { delField} from '@/utils/utils'
import { Loading, testFile } from '@/utils/index.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

let loadingInstance = null

parseAppleBooks()

function handleFile(file, ext = '') {
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
        loadingInstance.close()
      } catch (error) {
        console.log(`${file.name} 解析出错：${error}`)
        loadingInstance.close()
      }
    }
    reader.readAsText(file)
}

const cover = ref(false)


function dragenterEvent(event) {
  event.stopPropagation();
  event.preventDefault();
}
function dragoverEvent(event) {
  event.stopPropagation();
  event.preventDefault();
  cover.value = true
}
function dragleaveEvent(event) {
  event.stopPropagation();
  event.preventDefault();
  cover.value = false
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
    if (r) handleFile(file, r)
    if(i === files.length - 1) loadingInstance.close()
  }
}




const store = useStore()
const bookSort = JSON.parse(localStorage.getItem('bookSort') || '[]').reverse()
init(bookSort)

const isTauri = store.getters.isTauri
const importCount = computed(() => store.getters.importCount)
const selectedList = computed(() => store.getters.selectedList)
const tag = ref('')
let index = ref(0)
const total = ref(0)


const loadingText = computed(() => {
  return `为减轻服务器压力，导入间隔为 1s。导入进度： ${index.value + 1}/${total.value}`
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
    const { code, message } = await addMemo(url, item.content_update || item.content)
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
        ElMessage.success(message)
      }
    }else{
      ElMessage.error(message)
    }
  } catch (error) {
    ElMessage.error('导入失败')
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