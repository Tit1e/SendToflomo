<template>
  <div class="right-content-bar no-select">
    <div class="flex-1 flex flex-center">
      <el-tooltip effect="dark" placement="left">
        <template #content>
          <div style="width:180px;line-height: 1.5em;">
            {{t('import-tip')}}
          </div>
        </template>
        <div class="mr-10 highlight pointer select-all" @click="toggleSelectedAll">{{t(selectAll ? 'not-all' : 'all')}}</div>
      </el-tooltip>
      <span class="total-item">{{t('selected')}} <span class="highlight">{{ selectedNum }}</span></span>
      <span class="total-item">{{t('imported')}} <span class="highlight">{{ importCount }} / 100</span></span>
      <div class="flex-1 transparent" data-tauri-drag-region>drag</div>
    </div>
    <div class="bar-right">
      <a v-if="!isTauri" class="mr-16" href="https://tit1e.github.io/kindle2Flomo/old/">{{t('back-to-old-version')}}</a>
      <template v-if="isTauri">
        <el-tooltip
          effect="dark"
          :content="t('put-on-the-top')"
          placement="bottom"
        >
          <div class="fixed k-icon" :class="{'active': winTop}" @click="toggleWinTop"></div>
        </el-tooltip>
      </template>
      <template v-if="isTauri">
        <el-dropdown @command="handleOpen" size="large">
          <div class="website k-icon"></div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="old">{{t('old-web')}}</el-dropdown-item>
              <el-dropdown-item command="new">{{t('new-web')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <el-dropdown @command="handleExport" size="large">
        <div class="export k-icon"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="copy-markdown">{{t('copy-md')}}</el-dropdown-item>
            <el-dropdown-item command="markdown">{{t('export-md')}}</el-dropdown-item>
            <el-dropdown-item command="csv">{{t('export-csv')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="help k-icon" @click="showDrawer('help')"></div>
      <div class="setting k-icon ml-16" @click="showDrawer('setting')"></div>
    </div>
    <el-drawer v-model="drawer" :title="t(currentDrawer)" :with-header="true" :show-close="false" :modal="true" :size="360">
      <component :is='comp'></component>
    </el-drawer>
  </div>
</template>

<script setup>
import Help from '@/components/Help/index.vue'
import Setting from '@/components/Setting/index.vue'
import {openUrl} from '@/utils/utils.js'
import { ref, computed, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
const store = useStore()
const isTauri = store.getters.isTauri
const compMap = {
  'help': Help,
  'setting': Setting
}
const drawer = ref(false)
const currentDrawer = ref('help')
const comp = shallowRef(Help)
const showDrawer = type => {
  currentDrawer.value = type
  comp.value = compMap[type]
  drawer.value = true
}

const winTop = computed(() => store.getters.winTop)

const $emit = defineEmits([ 'export' ])


const selectAll = ref(false)

function toggleSelectedAll(){
  selectAll.value = !selectAll.value
  store.commit('SELECT_ALL', selectAll.value)
}

function handleOpen(command) {
  const urlMap = {
    'old': 'https://tit1e.github.io/kindle2Flomo/old/',
    'new': 'https://tit1e.github.io/kindle2Flomo/'
  }
  openUrl(urlMap[command])
}

function handleExport(command){
  $emit('export', command)
}

function toggleWinTop() {
  store.commit('UPDATE_WIN_TOP')
}


const { t } = useI18n()


store.commit('GET_IMPORT_COUNT')
const selectedNum = computed(() =>store.getters.selectedList.length)
const importCount = computed(() =>store.getters.importCount)

const urlMap = {
  blog: 'https://evolly.one/',
  photo: 'https://album.animalcrossing.life/',
  jike: 'https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017',
  thank: 'https://mp.weixin.qq.com/s/o793lUsBaWc61fLZzFDlxg'
}

</script>

<style lang="scss" scoped>
.right-content-bar {
  width: 100%;
  height: 40px;
  background-color: transparent;
  line-height: 40px;
  padding: 0 10px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  align-items: center;
  .total-item{
    & + .total-item{
      margin-left: 10px;
    }
  }
  .bar-right{
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .thanks{
      margin-right: 16px;
      text-decoration: underline;
    }
  }
  .k-icon{
    width: 22px;
    height: 22px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
      cursor: pointer;
    }
    &.fixed {
      margin-right: 16px;
      background-image: url(../../assets/icons/fixed.png);
    }
    &.fixed.active {
      margin-right: 16px;
      background-image: url(../../assets/icons/fixed-active.png);
    }
    &.help {
      margin-right: 16px;
      background-image: url(../../assets/icons/help.png);
    }
    &.website {
      margin-right: 16px;
      background-image: url(../../assets/icons/website.png);
    }
    &.export {
      margin-right: 16px;
      background-image: url(../../assets/icons/export.png);
    }
    &.link {
      margin-right: 16px;
      background-image: url(../../assets/icons/link.png);
    }
    &.setting {
      background-image: url(../../assets/icons/setting.png);
    }
  }
  :deep(.el-drawer){
    .el-drawer__body{
      // padding-top: 0px;
    }
  }
}
</style>
