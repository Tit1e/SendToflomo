<template>
  <div class="setting">
    <div>
      <div class="setting-title">{{t('lang')}}</div>
      <el-radio-group v-model="lang" size="default" @change="handleLangChange">
        <el-radio-button label="zh-CN">中文</el-radio-button>
        <el-radio-button label="en-US">English</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="isTauri">
      <div class="setting-title">{{t('update')}}</div>
        <div>
          <el-button :loading="loading" type="primary" size="default" @click="handleCheckUpdate">{{t('check-update')}}</el-button>
        </div>
        <el-checkbox v-model="autoUpdate" :label="t('auto-check')" size="small" @change="handleAutoUpdate" />
        <div class="flex manual-update">
          <b>{{t('update-by-yourself')}}：</b>
          <div>
            <a class="link"  v-for="(value, key) in downloadLinks" :key="key" :href="value" rel="noopener noreferrer" target="_blank" @click="handleCommand(value, key)">{{t(key)}}</a>
          </div>
        </div>
    </div>
    <div class="setting-title">{{t('about')}}</div>
    <ul class="links">
      <li v-for="(value, key) in links" :key="key">
        <a :href="value" target="_blank" rel="noopener noreferrer" @click="handleCommand(value)">{{t(key)}}</a>
      </li>
    </ul>
    <ByMeACoffee />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { openUrl } from '@/utils/utils.js'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { copy, isAutoUpdate } from '@/utils/index.js'
import checkUpdate from '@/utils/checkUpdate.js'
import ByMeACoffee from '@/components/ByMeACoffee/index.vue'
const { t, locale } = useI18n()
const lang = ref(window.localStorage.getItem('locale') || 'zh-CN')
const autoUpdate = ref(isAutoUpdate())
const store = useStore()
const isTauri = store.getters.isTauri
const handleAutoUpdate = val => {
  window.localStorage.setItem('autoUpdate', `${val}`)
}
const handleLangChange = (lang) => {
  locale.value = lang
  window.localStorage.setItem('locale', lang)
}

const downloadLinks =reactive({
  netdisc: 'https://wwyh.lanzoue.com/b02e0ddbe',
  release: 'https://github.com/Tit1e/SendToflomo/releases'
})
const links = reactive({
  github: 'https://github.com/Tit1e',
  blog: 'https://evolly.one/',
  photo: 'https://album.animalcrossing.life/',
  jike: 'https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017',
  thanks: 'https://mp.weixin.qq.com/s/o793lUsBaWc61fLZzFDlxg',
})

const handleCommand = async (url, key) => {
  if(isTauri){
    if (key === 'netdisc') {
      copy('g1ce', '')
      ElMessageBox.alert('密码 g1ce 已复制到粘贴板', '密码已复制', {
        autofocus: false,
        confirmButtonText: '打开网盘地址',
        callback: action => {
          if (action === 'confirm') {
            openUrl(url)
            return
          }
        }
      })
    } else {
      openUrl(url)
    }
  }
}

const loading = ref(false)
const handleCheckUpdate = async () => {
  checkUpdate(loading)
}
</script>

<style lang="scss" scoped>
.setting{
  .manual-update{
    line-height: 30px;
    font-size: 12px;
    font-weight: 500;
    a + a{
      margin-left: 10px;;
    }
  }
  &-title{
    margin-top: 10px;
    font-size: 15px;
    font-weight: 400;
    &:first-child{
      margin-top: 0px;
    }
  }
  .links{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    li{
      transition: ease-in-out 0.35s;
      line-height: 30px;
      cursor: pointer;
      &:hover{
        opacity: 0.7;
        text-decoration: underline;
      }
    }
  }
}
</style>