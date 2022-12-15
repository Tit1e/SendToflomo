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
        <el-checkbox v-model="autoUpdate" :label="t('auto-check')" size="small" />
    </div>
    <div class="setting-title">{{t('about')}}</div>
    <ul class="links">
      <template v-if="isTauri">
        <li @click="handleCommand(key)" v-for="(value, key) in urlMap" :key="key">{{t(key)}}</li>
      </template>
      <template v-else>
        <li v-for="(value, key) in urlMap" :key="key">
          <a :href="value" target="_blank" rel="noopener noreferrer">{{t(key)}}</a>
        </li>
      </template>
    </ul>
    <ByMeACoffee />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus'
import { openUrl } from '@/utils/utils.js'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import updater from '@/utils/updater.js'
import ByMeACoffee from '@/components/ByMeACoffee/index.vue'
const { t, locale } = useI18n()
const lang = ref(window.localStorage.getItem('locale') || 'zh-CN')
const autoUpdate = ref(true)
const handleLangChange = (lang) => {
  locale.value = lang
  window.localStorage.setItem('locale', lang)
}
const store = useStore()
const isTauri = store.getters.isTauri

const urlMap =reactive({
  github: 'https://github.com/Tit1e',
  blog: 'https://evolly.one/',
  photo: 'https://album.animalcrossing.life/',
  jike: 'https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017',
  thanks: 'https://mp.weixin.qq.com/s/o793lUsBaWc61fLZzFDlxg'
})

const handleCommand = (type) => {
  if(isTauri){
    openUrl(urlMap[type])
  }
}
const handleInstallUpdate = async () => {
  try {
    console.log('安装更新');
    const res = await updater.installUpdate();
    console.log('res', res);
  } catch (error) {
    console.error(error);
  }
}
const handleOnListen = async () => {
  try {
    console.log('监听更新事件');
    const res = await updater.onUpdaterEvent();
    console.log('res', res);
  } catch (error) {
    console.error(error);
  }
}
handleOnListen()
const loading = ref(false)
const handleCheckUpdate = async () => {
  loading.value = true
  try {
    const { shouldUpdate, manifest: {body, version} } = await updater.checkUpdate();
    if (shouldUpdate) {
      const action = await ElMessageBox.alert(
        `<div>新版本 v${version} 可供使用，是否现在更新？</div><pre>${body}</pre>`,
        '🎉 发现新版本！',
        {
          showClose: false,
          showCancelButton: true,
          confirmButtonText: '立即下载',
          cancelButtonText: '以后再说',
          dangerouslyUseHTMLString: true,
          customClass: 'uppdate-msg',
        }
      )
      if (action === 'confirm') {
        handleInstallUpdate()
      }
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      ElNotification({
        title: '检查出错，请稍后重试',
        message: error,
        type: 'error',
        position: 'bottom-left'
      })
    }
    await updater.removeUpdaterEvent()
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.setting{
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