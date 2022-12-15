<template>
  <div class="help">
    <div class="help-title">{{t('warning')}}</div>
    <ol>
      <li>{{t('warning-1')}}</li>
      <li>{{t('warning-2')}}</li>
      <li>{{t('warning-3')}}</li>
      <li>{{t('warning-4')}}</li>
      <li>{{t('warning-5')}}</li>
    </ol>
    <div class="help-title">{{t('file')}}</div>
    <ol>
      <li><span class="bold text-highlight">JSON:</span> {{t('json-file')}}</li>
      <li><span class="bold text-highlight">HTML:</span>  {{t('html-file')}}</li>
      <li><span class="bold text-highlight">TXT:</span> {{t('txt-file')}} </li>
      <li class="pointer " @click="openUrl('https://mp.weixin.qq.com/s/CPIYoGItJVWJGk30MoVNXA')">
        <span class="text-highlight underline bold">
          {{ t('how-export') }}
        </span>
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