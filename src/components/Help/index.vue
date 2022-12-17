<template>
  <div class="help">
    <div class="help-title">{{t('data-migration')}}</div>
    <div class="text-danger text-indent">{{t('data-migration-tip')}}</div>
    <ol>
      <li>{{t('data-migration-1')}} <a class="link pointer bold underline text-highlight" @click="handleDownload">Send2Flomo v2.5.5</a></li>
      <li>{{t('data-migration-2')}}</li>
      <li>{{t('data-migration-3')}}</li>
    </ol>
    <div class="help-title">{{t('warning')}}</div>
    <ol>
      <li v-for="i in 6">{{t(`warning-${i + 1}`)}}</li>
    </ol>
    <div class="help-title">{{t('file')}}</div>
    <ol>
      <li><span class="bold text-highlight">JSON:</span> {{t('json-file')}}</li>
      <li><span class="bold text-highlight">HTML:</span>  {{t('html-file')}}</li>
      <li><span class="bold text-highlight">TXT:</span> {{t('txt-file')}} </li>
      <li class="pointer">
        <a class="text-highlight underline" target="_blank" href="https://mp.weixin.qq.com/s/CPIYoGItJVWJGk30MoVNXA" @click="openUrl('https://mp.weixin.qq.com/s/CPIYoGItJVWJGk30MoVNXA')">
          {{ t('how-export') }}
        </a>
      </li>
    </ol>
    <div class="mb-6 help-title">
      {{t('where-is-txt')}}
    </div>
    <div class="mb-10">
      <ol>
        <li>{{t('where-is-txt-1')}}</li>
        <li>{{t('where-is-txt-2')}}</li>
      </ol>
    </div>
    <div class="mb-6 help-title">
      {{t('why-few-book')}}
    </div>
    <div class="mb-10 text-indent">
      {{ t('handle-few-book') }}
    </div>
    <div class="help-title mb-10">{{t('other-questions')}}</div>
    <img
      class="block block-center"
      width="180"
      height="180"
      src="../../assets/img/qrcode.png"
    />
  </div>
</template>

<script setup>
import { openUrl } from '@/utils/utils.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const handleDownload = () => {
  openUrl('https://github.com/Tit1e/kindle2Flomo/releases/download/v2.5.5/Send2flomo-2.5.5.dmg')
}
</script>

<style lang="scss" scoped>
.help{
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5rem;
  &-title{
    font-size: 14px;
  }
  ol{
    padding-left: 30px;
  }
}
</style>