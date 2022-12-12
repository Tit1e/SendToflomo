<template>
  <div class="right-content-bar">
    <div class="flex-1 flex flex-center">
      <el-tooltip effect="dark" placement="left">
        <template #content>
          <div style="width:200px;line-height: 1.5em;">
            未经审视的生活不值得过，未经审视的思想也不应该汇入你的大脑。建议在导入前审视一遍内容。
          </div>
        </template>
        <el-button type="text" class="mr-10" @click="toggleSelectedAll">{{t(selectAll ? 'not-all' : 'all')}}</el-button>
      </el-tooltip>
      已选择 <span class="highlight">{{ selectedNum }}</span> 条，共
      <span class="highlight">{{ total }}</span> 条。已导入
      <span class="highlight">{{ importCount }} / 100</span>
      <div class="flex-1 transparent" data-tauri-drag-region>drag</div>
    </div>
    <div class="bar-right">
      <div v-if="isTauri" class="fixed k-icon" :class="{'active': winTop}" @click="toggleWinTop"></div>
      <el-dropdown @command="handleExport">
        <div class="export k-icon"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="markdown">导出 Markdown</el-dropdown-item>
            <el-dropdown-item command="csv">导出 CSV</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip
          effect="dark"
          placement="bottom"
        >
          <template #content>
            <div class="help-box">
              <div class="mb-10">注意事项：</div>
              <div class="mb-6">1. 导入前必须填写 Api 与选择要导入的笔记</div>
              <div class="mb-6">2. 双击笔记可进入编辑状态，编辑过的笔记右下角显示编辑图标</div>
              <div class="mb-6">3. 已导入的笔记右下角显示 flomo 图标，且不可再编辑</div>
              <div class="mb-6">4. 点击右下角图标可还原内容，重置笔记状态</div>
              <div class="mb-6">5. 已导入或编辑过的笔记将不再参与格式调整，如需调整请先重置笔记状态</div>
              <div class="mb-10">常见问题解答：</div>
              <div class="mb-6">
                <span class="bold text-highlight">JSON:</span> KOReader 导出的 JSON 文件
              </div>
              <div class="mb-6">
                <span class="bold text-highlight">HTML:</span> Kindle 或 Kindle App 导出的 HTML 文件
              </div>
              <div class="mb-10">
                <span class="bold text-highlight">TXT:</span> Kindle 的 My Clippings.txt 文件
              </div>
              <div class="mb-6 bold text-highlight">
                My Clippings.txt 在哪？
              </div>
              <div class="mb-10">
                <div class="mb-4">
                  将 Kindle 通过数据线连接至电脑
                </div>
                文件位于：Kindle根目录 - document - My Clippings.txt
              </div>
              <div class="link pointer underline bold text-highlight" @click="openUrl('https://mp.weixin.qq.com/s/CPIYoGItJVWJGk30MoVNXA')">
                {{ t('how-export') }}
              </div>
              <div class="mb-10">还有其他问题？扫码进群反馈</div>
              <img
                class="block block-center"
                width="200"
                height="200"
                src="../../assets/img/qrcode.png"
              />
            </div>
          </template>
          <div class="help k-icon" :title="t('help')" @click=""></div>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          placement="bottom"
          content="中/英文切换"
        >
          <div class="translate k-icon" @click="toggleLanguage"></div>
        </el-tooltip>
      <el-dropdown @command="handleCommand">
        <div class="setting k-icon"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="isTauri">
              <el-dropdown-item command="update">{{t('check-update')}}</el-dropdown-item>
              <el-dropdown-item command="blog" divided>
                {{t('blog')}}
              </el-dropdown-item>
              <el-dropdown-item command="photo">
                Tit1e's Photo Studio
              </el-dropdown-item>
              <el-dropdown-item command="jike">
                {{t('jike')}}
              </el-dropdown-item>
              <el-dropdown-item command="thank" divided>{{t('thanks')}}</el-dropdown-item>
            </template>
            <template v-else>
              <el-dropdown-item
                ><a href="https://evolly.one" target="_blank"
                  >{{t('blog')}}</a
                ></el-dropdown-item
              >
              <el-dropdown-item>
                <a href="https://album.animalcrossing.life" target="_blank"
                  >Tit1e's Photo Studio</a
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <a
                  href="https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017"
                  target="_blank"
                >
                  {{t('jike')}}
                </a>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <a href="https://mp.weixin.qq.com/s/o793lUsBaWc61fLZzFDlxg" target="_blank" rel="noopener noreferrer">{{t('thanks')}}</a>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, nextTick, onMounted, computed } from 'vue'
import { ElLoading } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { openUrl } from '@/utils/utils.js'
const store = useStore()
const isTauri = store.getters.isTauri

const winTop = computed(() => store.getters.winTop)

const $emit = defineEmits([ 'export' ])


const selectAll = ref(false)

function toggleSelectedAll(){
  selectAll.value = !selectAll.value
  store.commit('SELECT_ALL', selectAll.value)
}

function handleExport(command){
  $emit('export', command)
}

function toggleWinTop() {
  store.commit('UPDATE_WIN_TOP')
}


const { t, locale } = useI18n()
function toggleLanguage () {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  window.localStorage.setItem('locale', locale.value)
}

store.commit('GET_IMPORT_COUNT')
const selectedNum = computed(() =>store.getters.selectedList.length)
const total = computed(() =>store.getters.textList.length)
const importCount = computed(() =>store.getters.importCount)

const urlMap = {
  blog: 'https://evolly.one/',
  photo: 'https://album.animalcrossing.life/',
  jike: 'https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017',
  thank: 'https://mp.weixin.qq.com/s/o793lUsBaWc61fLZzFDlxg'
}

function handleCommand(type){
  if(isTauri){
    if(type === 'update') {
      ipcRenderer.send('update')
    } else {
      openUrl(urlMap[type])
    }
  }
}


</script>

<style lang="scss" scoped>
.right-content-bar {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  line-height: 40px;
  padding: 0 10px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  align-items: center;
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
    &.translate {
      margin-right: 16px;
      background-image: url(../../assets/icons/translate.png);
    }
    &.export {
      margin-right: 16px;
      background-image: url(../../assets/icons/export.png);
    }
    &.setting {
      background-image: url(../../assets/icons/setting.png);
    }
  }
}
.help-box{
  width: 300px;
  line-height: 1.5rem;
}
</style>
