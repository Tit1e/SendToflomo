import updater from '@/utils/updater.js'
import { ElMessageBox, ElNotification } from 'element-plus'

import i18n from '@/language/index'
const t = i18n.global.t

export default async function handleCheckUpdate(loading) {
  updater.onUpdaterEvent(async ({ error, status }) => {
    if (error) {
      ElNotification({
        title: t('update-failed'),
        message: error,
        type: 'error',
        position: 'bottom-left'
      })
    }
    if (status === 'DONE') {
      try {
        const action = await ElMessageBox.alert(
          t('restart-now-tip'),
          `✨ ${t('install')}`,
          {
            showClose: false,
            autofocus: false,
            showCancelButton: true,
            confirmButtonText: t('restart-now'),
            cancelButtonText: t('talk-about-later'),
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
            title: t('update-failed'),
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
        `<div>${t('new-version', {version})}</div><pre>${body}</pre>`,
        `🎉${t('find-new-version')}`,
        {
          showClose: false,
          autofocus: false,
          showCancelButton: true,
          confirmButtonText: t('download-now'),
          cancelButtonText: t('talk-about-later'),
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