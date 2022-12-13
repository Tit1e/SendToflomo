import { checkUpdate as check } from '@tauri-apps/api/updater';
export default async function checkUpdate() {
  try {
    const update = await check()
    // if (update.shouldUpdate) {
      // console.log(`Installing update ${update.manifest?.version}, ${update.manifest?.date}, ${update.manifest.body}`);
      // await installUpdate();
    // }
  } catch (error) {
    console.log(error)
  }
}
