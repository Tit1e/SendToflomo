const ByMeACoffee = {
  'alipay': '支付宝',
  'wechat-pay': '微信支付',
}
const Help = {
  'help': '常见问题解答',
  'warning': '使用说明',
  'warning-1': '将 txt、html、json 文件拖入应用，软件自动解析',
  'warning-2': 'Apple Books 在软件启动时会自动读取，无需手动触发',
  'warning-3': '导入前必须填写 Api 与选择要导入的笔记',
  'warning-4': '双击笔记可进入编辑状态，编辑过的笔记右下角显示编辑图标',
  'warning-5': '已导入的笔记右下角显示 flomo 图标，且不可再编辑',
  'warning-6': '点击右下角图标可还原内容，重置笔记状态',
  'warning-7': '已导入或编辑过的笔记将不再参与格式调整，如需调整请先重置笔记状态',
  'file': '文件格式',
  'json-file': 'KOReader 导出的 JSON 文件',
  'html-file': 'Kindle 或 Kindle App 导出的 HTML 文件',
  'txt-file': 'Kindle 中的 My Clippings.txt 文件',
  'where-is-txt': 'My Clippings.txt 在哪？',
  'where-is-txt-1': '将 Kindle 通过数据线连接至电脑',
  'where-is-txt-2': '文件位于：Kindle根目录 - document - My Clippings.txt',
  'other-questions': '还有其他问题？扫码进群反馈',
  'how-export': '如何导出 HTML？',
  'why-few-book': '为什么 Apple Books 笔记数量偏少？',
  'handle-few-book': '数据未同步导致，打开 Apple Books，将未同步的书本进行双击打开，然后重启 SendToflomo。'
}
const LeftBar = {
  'click-to-download': '点击下载应用',
  'import-from-apple-books': '从 Apple Books 导入',
  'download-reason': '由于 Apple Books 笔记的读取方式限制，请安装客户端使用。',
  'can-not-open': "SendToflomo.app 打不开？",
  'parse-options': '解析设置',
  'tag-name': 'Tag 名称',
  'hide-tag': '隐藏 Tag',
  'position-of-tag': '位置',
  'above-the-excerpt': '摘录上方',
  'below-the-excerpt': '摘录下方',
  'top': '顶部',
  'bottom': '底部',
  'on': '启用',
  'off': '禁用',
  'book-name': '书名',
  'book-list': '书籍列表',
  'import': '导入',
  'api-record': 'API 采用本地存储',
  'api-options': 'Api 设置',
  'blank-line': '空行',
  'separatist': '分隔符',
  'separatist-tip': '仅在有笔记时生效，且总在笔记与摘录之间',
  'separatist-placeholder': '为空则以空行填充，此空行无法禁用',
  'tag-options': 'Tag 设置',
  'notes-options': '笔记设置',
}
const MemoCard = {
  'view-in-apple-books': '在 Apple Books 中查看'
}
const RightContent = {
  'save': '保 存',
  'cancel': '取 消',
}
const RightContentBar = {
  'import-tip': '未经审视的生活不值得过，未经审视的思想也不应该汇入你的大脑。建议在导入前审视一遍内容。',
  'all': '全选',
  'not-all': '全不选',
  'selected': '已选：',
  'imported': '已导入：',
  'put-on-the-top': '置顶',
  'copy-md': '复制 Markdown 文本',
  'export-md': '导出 Markdown',
  'export-csv': '导出 CSV',
  'setting': '设置',
}
const Setting = {
  'update-by-yourself': '手动更新',
  'release': 'Release',
  'netdisc': '网盘',
  'thanks': '感谢 lupeng',
  'github': 'GitHub',
  'blog': '博客',
  'photo': "Tit1e's Photo Studio",
  'jike': '即刻',
  'buy-me-a-coffee': '请作者喝杯咖啡',
  'lang': '语言',
  'about': '关于',
  'update': '更新',
  'check-update': '检查更新',
  'auto-check': '自动检查更新',
}
const System = {
  'reading-notes': '正在读取',
  'update-failed': '更新失败，请稍后重试',
  'restart-now-tip': '下载完成，是否立即重启？',
  'install': '安装更新',
  'restart-now': '立即重启',
  'talk-about-later': '以后再说',
  'download-now': '立即下载',
  'find-new-version': '发现新版本！',
  'new-version': '新版本 {version} 可供使用，是否现在更新？',
  'copied': '已复制',
  'loading': '正在加载',
  'progress': '导入进度',
  'import-failure': '导入失败',
  'import-success': '已记录'
}
export default {
  ...ByMeACoffee,
  ...Help,
  ...LeftBar,
  ...MemoCard,
  ...RightContent,
  ...RightContentBar,
  ...Setting,
  ...System
}