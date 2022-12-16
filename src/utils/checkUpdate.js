import updater from '@/utils/updater.js'
import { ElMessageBox, ElNotification } from 'element-plus'

export default async function handleCheckUpdate(loading) {
  updater.onUpdaterEvent(async ({ error, status }) => {
    if (error) {
      ElNotification({
        title: '更新失败，请稍后重试',
        message: error,
        type: 'error',
        position: 'bottom-left'
      })
    }
    if (status === 'DONE') {
      try {
        const action = await ElMessageBox.alert(
          `下载完成，是否立即重启？`,
          '✨ 安装更新',
          {
            showClose: false,
            autofocus: false,
            showCancelButton: true,
            confirmButtonText: '立即重启',
            cancelButtonText: '以后再说',
            dangerouslyUseHTMLString: true,
            customClass: 'custom-msg-title',
          }
        )
        if (action === 'confirm') {
          await updater.relaunch()
        }
      } catch (error) {
        console.error(error);
        if (error !== 'cancel') {
          ElNotification({
            title: '更新失败，请稍后重试',
            message: error,
            type: 'error',
            position: 'bottom-left'
          })
        }
      }
    }
  })
  if(loading) loading.value = true
  try {
    const { shouldUpdate, manifest: {body, version} } = await updater.checkUpdate();
    if (shouldUpdate) {
      const action = await ElMessageBox.alert(
        `<div>新版本 v${version} 可供使用，是否现在更新？</div><pre>${body}</pre>`,
        '🎉 发现新版本！',
        {
          showClose: false,
          autofocus: false,
          showCancelButton: true,
          confirmButtonText: '立即下载',
          cancelButtonText: '以后再说',
          dangerouslyUseHTMLString: true,
          customClass: 'custom-msg-title',
        }
      )
      if (action === 'confirm') {
        if(loading) loading.value = false
        await updater.installUpdate()
      }
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
    }
  }
  if(loading) loading.value = false
}