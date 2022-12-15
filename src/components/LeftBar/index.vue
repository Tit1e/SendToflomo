<template>
  <div class="left-bar no-select" :class="{ 'pt-10': !isTauri, electron: isTauri }">
    <div class="drag-bar" data-tauri-drag-region></div>
    <div class="left-bar-form">
      <el-form
        :model="options"
        ref="form"
        size="default"
        label-suffix="："
        label-position="top"
      >
        <div class="left-bar-form-content">
          <div class="left-bar-form-content-top">
            <el-form-item label-width="0" v-if="!isTauri">
              <div class="pointer text-center border pd-10 radius">
                <el-tooltip effect="dark" placement="right">
                  <template #content>
                    <div slot="content" style="line-height: 1.5em">
                      <b>点击下载应用</b>
                      <br>
                      由于 Apple Books 笔记的读取方式限制，
                      <br>
                      必须安装客户端才能使用。
                    </div>
                  </template>
                  <a
                    class="link"
                    href="https://github.com/Tit1e/kindle2Flomo/releases"
                    target="_blank"
                  >
                    从 Apple Books 导入
                  </a>
                </el-tooltip>
              </div>
              <a
                class="how link"
                href="https://evolly.one/2021/05/30/158-mac-handle-bad-app/"
                target="_blank"
              >
                Send2flomo.app 打不开？
              </a>
            </el-form-item>
          </div>
          <div class="left-bar-form-content-body">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1">
                <template #title>
                  <div>
                    <i class="el-icon-set-up mr-4"></i>{{ t('parse-options') }}
                  </div>
                </template>
                <el-divider>{{ t('api-options') }}</el-divider>
                <el-form-item label="" label-width="0px">
                  <el-input
                    v-model="options.api"
                    type="password"
                    show-password
                    :placeholder="t('api-record')"
                  ></el-input>
                </el-form-item>
                <el-divider>{{ t('tag-options') }}</el-divider>
                <el-form-item label="Tag">
                  <div class="flex">
                    <div class="flex-1">
                      <el-input
                        v-model="options.tag"
                        :disabled="options.noTag"
                        :placeholder="t('tag-name')"
                        clearable
                      ></el-input>
                    </div>
                    <div class="flex-1 pl-10">
                      <el-checkbox v-model="options.noTag">{{
                        t('hide-tag')
                      }}</el-checkbox>
                    </div>
                  </div>
                </el-form-item>
                <template v-if="!options.noTag">
                  <el-form-item :label="t('position-of-tag')">
                    <el-radio-group v-model="options.tagPosition">
                      <el-radio-button :label="true">{{
                        t('top')
                      }}</el-radio-button>
                      <el-radio-button :label="false">{{
                        t('bottom')
                      }}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="t('blank-line')">
                    <el-radio-group v-model="options.noEmptyLine">
                      <el-radio-button :label="false">{{
                        t('on')
                      }}</el-radio-button>
                      <el-radio-button :label="true">{{
                        t('off')
                      }}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </template>
                <el-divider>{{ t('notes-options') }}</el-divider>
                <el-form-item :label="t('position-of-tag')">
                  <el-radio-group v-model="options.notePosition">
                    <el-radio-button :label="true">{{t('above-the-excerpt')}}</el-radio-button>
                    <el-radio-button :label="false">{{t('below-the-excerpt')}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('separatist')">
                  <el-input
                    v-model="options.split"
                    :placeholder="t('separatist-placeholder')"
                    clearable
                  ></el-input>
                  <span class="fz-12 separatist-tip"
                    >{{t('separatist-tip')}}</span
                  >
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <div>
                    <i class="el-icon-notebook-2 mr-4"></i>{{ t('book-list') }}
                  </div>
                </template>

                <template v-if="!!bookList.length">
                  <el-form-item :label="t('book-name')">
                    <el-input v-model="options.book" @blur="updateBook"></el-input>
                  </el-form-item>
                  <el-form-item :label="t('book-list')" label-width="0">
                    <div class="list-wrap">
                      <el-radio-group
                        class="book-list"
                        v-model="options.title"
                        size="default"
                        @change="selectChange"
                      >
                        <el-radio
                          v-for="item in bookList"
                          :key="item.uuid"
                          :label="item.title"
                          border
                          >{{ item.title }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </el-form-item>
                </template>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-form>
    </div>
    <div class="left-bar-bottom">
      <template v-if="disabledSend">
        <el-tooltip
          effect="dark"
          :disabled="false"
          :content="
            importDisabled
              ? '导入数量已达 100 条限额'
              : '请确保 API 已填写，需要导入的 MEMO 已勾选'
          "
          placement="top"
        >
          <el-button type="primary" :disabled="disabledSend"  size="small">{{
            t('import')
          }}</el-button>
        </el-tooltip>
      </template>
      <template v-else>
        <el-button type="primary"  size="small" @click="submit">{{
          t('import')
        }}</el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { dexiePut } from '@/db/dexie.js'
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const $emit = defineEmits([
  'update-tag',
  'parse',
  'submit',
  'list-update'
])
const store = useStore()
const selectedList = computed(() => store.getters.selectedList)
const importDisabled = computed(() => store.getters.importCount >= 100)
const bookList = computed(() => store.getters.bookList.filter(i => i.texts.length))
// 图书列表更新自动选中第一项
watch(() => bookList.value[0], (val, old = {}) => {
  if(val && (val.title !== old.title)) {
    updateData(val)
  }
})
// 更新图书名称
function updateBook(e){
  let bookData = bookList.value.find(item => item.title === options.title)
  if(bookData){
    bookData = {
      ...bookData,
      book: e.target.value
    }
    delete bookData.texts
  }
  store.commit('UPDATE_BOOK', bookData)
  dexiePut(bookData, 'books')
}

const isTauri = store.getters.isTauri
let options = reactive({
  book: '',
  title: '',
  split: '',
  tag: 'kindle',
  api: '',
  noTag: false,
  // false 底部，true 顶部
  tagPosition: false,
  notePosition: false,
  noEmptyLine: true,
})

let activeName = ref('1')

watch(
  () => activeName.value,
  val => {
    window.localStorage.setItem('activeName', val)
  }
)

const disabledSend = computed(
  () => !selectedList.value.length || !options.api || importDisabled.value
)

function setOptions () {
  const _options = JSON.parse(localStorage.getItem('options') || '{}')
  options = reactive({
    ...options,
    ..._options
  })
  activeName.value = window.localStorage.getItem('activeName') || '1'
}

setOptions()

watch(
  () => options,
  () => {
    computedTag()
    parse()
  },
  { deep: true }
)

function selectChange (val) {
  const data = bookList.value.find(i => i.title === val)
  if (!data) return false
  updateData(data)
}


function updateData (data) {
  const { title, texts, bookId, book } = data
  options.title = title
  options.book = book
  computedTag()
  $emit('list-update', { list: texts, options })
  parse(true)
}

function parse (showBookList = false) {
  if (showBookList) {
    activeName.value = '2'
  }
  updateOptions()
  $emit('parse', options)
}
function submit () {
  $emit('submit', options.api)
}
function updateOptions () {
  const { noTag, api, tag, split, tagPosition, noEmptyLine } = options
  const optionsData = {
    noTag,
    api,
    tag,
    split,
    tagPosition,
    noEmptyLine,
  }
  localStorage.setItem('options', JSON.stringify(optionsData))
}
const Tag = ref('')
function computedTag () {
  let _tag = ''
  const { tag, book, noTag } = options
  if (noTag) {
    $emit('update-tag', _tag)
    Tag.value = _tag
    return
  }
  if (!tag) {
    _tag = `#${book}`
  } else {
    _tag = `#${tag}/${book}`
  }
  $emit('update-tag', _tag)
  Tag.value = _tag
}

</script>

<style lang="scss" scoped>
.left-bar {
  background-color: #e4f5ef;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  .drag-bar{
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    left: 0;
  }
  &.electron {
    margin-top: -40px;
    padding-top: 40px;
  }
  &-form {
    height: 0px;
    flex: 1;
    overflow: hidden;
    padding-bottom: 10px;
    :deep(.el-form) {
      height: 100%;
      .el-form-item {
        &__label {
          padding-bottom: 4px;
        }
        &--default {
          margin-bottom: 8px;
        }
        .separatist-tip{
          line-height: 1.5em;
          margin-top: 4px;
        }
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      &-body {
        height: 0;
        flex: 1;
        overflow: auto;
      }
    }
    :deep(.el-divider) {
      .el-divider__text {
        background-color: #e4f5ef;
      }
    }
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item {
        &__wrap {
          background-color: #e4f5ef;
          border-bottom: none!important;
        }
        &__header {
          background-color: #e4f5ef;
          border-bottom: none!important;
        }
        &__content {
          background-color: #e4f5ef;
          border: none;
          padding-bottom: 10px;
        }
      }
    }
    .list-wrap {
      max-height: calc(100vh - 306px);
      overflow: scroll;
      margin-bottom: -16px;
      width: 100%;
      .book-list {
        width: 100%;
        :deep(.el-radio) {
          background-color: var(--default-bg);
          width: 100%;
          margin: 0 0 10px 0;
          .el-radio__label {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
          .el-radio__input {
            display: none;
          }
        }
        :deep(.el-radio.is-bordered){
          border: none;
        }
        :deep(.el-radio.is-bordered + .el-radio.is-bordered) {
          margin-left: 0px;
        }
        :deep(.el-radio.is-bordered.is-checked){
          background-color: var(--el-color-primary);
          .el-radio__label{
            color: #fff;
          }
        }
      }
    }
  }
  &-bottom {
    text-align: center;
    padding-top: 10px;
    box-shadow: 0 -10px 10px -16px rgba($color: #000000, $alpha: 0.4);
  }
}
</style>
