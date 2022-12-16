<template>
  <img class="hide" src="https://personal-1251959693.cos.ap-chengdu.myqcloud.com/2022-12-15-alipay.jpg" alt="" srcset="">
  <img class="hide" src="https://personal-1251959693.cos.ap-chengdu.myqcloud.com/2022-12-15-wechat.jpg" alt="" srcset="">
  <el-tooltip placement="top" effect="light">
    <template #content>
      <div class="qrcode-box flex">
        <div class="qr-code alipay">
          <img src="https://personal-1251959693.cos.ap-chengdu.myqcloud.com/2022-12-15-alipay.jpg" alt="" srcset="">
          <div class="text-center">
            {{t('alipay')}}
          </div>
        </div>
        <div class="qr-code wechat">
          <img src="https://personal-1251959693.cos.ap-chengdu.myqcloud.com/2022-12-15-wechat.jpg" alt="" srcset="">
          <div class="text-center">
            {{t('wechat-pay')}}
          </div>
        </div>
      </div>
    </template>
    <div class="coffee-card flex flex-center">
      <img src="../../assets/img/coffee.png">
      {{t('buy-me-a-coffee')}}
    </div>
  </el-tooltip>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.qrcode-box{
  padding: 4px 0;
}
.coffee-card{
  color: #4F49A1;
  font-size: 20px;
  padding: 10px;
  // background-color: rgb(64, 233, 249);
  background-color: rgb(126, 244, 255);
  border-radius: 6px;
  margin-top: 20px;
  cursor: default;
  letter-spacing: 0.1em;
  img{
    margin-right: 10px;
  }
}
.qr-code {
  color: #fff;
  border-radius: 4px;
  & + .qr-code{
    margin-left: 10px;
  }
  &.alipay{
    background-color: #186FFA;
    padding: 10px;
  }
  &.wechat{
    background-color: #10B85D;
    padding: 10px;
  }
  img{
    width: 120px;
    border: 8px solid #fff;
    border-radius: 4px;
  }
}
</style>