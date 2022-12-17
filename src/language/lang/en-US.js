const ByMeACoffee = {
  'alipay': 'Alipay',
  'wechat-pay': 'WeChat pay',
}
const Help = {
  'help': 'Help',
  'warning': 'Warning',
  'warning-1': 'Drag txt, html, json files into the application, and the software will automatically parse them',
  'warning-2': 'Apple Books are automatically read when the software starts, no manual triggering required',
  'warning-3': 'Before importing, you must fill in the API and select the notes to be imported',
  'warning-4': 'Double-clicking on a note enters edit mode, and an edited note shows an edit icon in the lower right corner',
  'warning-5': 'Imported notes show a flomo icon in the lower right corner and cannot be edited',
  'warning-6': "Clicking the icon in the lower right corner restores the content and resets the note's status",
  'warning-7': "Imported or edited notes will no longer participate in formatting adjustments, please reset the note's status if you need to adjust it",
  'file': 'File',
  'json-file': 'Exported by KO Reader',
  'html-file': 'Exported by Kindle or Kindle App',
  'txt-file': 'My Clippings.txt file on Kindle',
  'where-is-txt': 'Where is My Clippings.txt?',
  'where-is-txt-1': 'Connect Kindle to the computer via a data cable',
  'where-is-txt-2': 'The file is located at: Kindle root directory - document - My Clippings.txt',
  'other-questions': 'Feedback by WeCom',
  'how-export': 'How to export HTML?',
  'why-few-book': 'Why are there fewer notes in Apple Books?',
  'handle-few-book': 'This is caused by unsynchronized data. Open Apple Books, double-click the unsynchronized book to open it, and then restart SendToflomo.'
}
const LeftBar = {
  'click-to-download': 'Click to download the application',
  'download-reason': 'Due to limitations of Apple Books, please install the client.',
  'import-from-apple-books': 'Import from Apple Books',
  'can-not-open': "Can't open SendToflomo.app?",
  'parse-options': 'Parse Options',
  'tag-name': 'Tag Name',
  'hide-tag': 'Hide Tag',
  'position-of-tag': 'Position Of Tag',
  'above-the-excerpt': 'Above The Excerpt',
  'below-the-excerpt': 'Below The Excerpt',
  'top': 'Top',
  'bottom': 'Bottom',
  'on': 'On',
  'off': 'OFF',
  'book-name': 'Book Name',
  'book-list': 'Book List',
  'import': 'Import',
  'api-record': 'Api is recorded locally',
  'api-options': 'Api Options',
  'blank-line': 'Blank Line',
  'separatist': 'Separatist',
  'separatist-tip': 'Effective only with notes, always between notes and excerpts',
  'separatist-placeholder': "If empty, fill with blank line and can't be disabled",
  'tag-options': 'Tag Options',
  'notes-options': 'Notes Options',
}
const MemoCard = {
  'view-in-apple-books': 'View in Apple Books'
}
const RightContent = {
  'save': 'Save',
  'cancel': 'Cancel',
}
const RightContentBar = {
  'import-tip': 'Unchanging life is not worth living, and unruly thoughts should not be remitted into your brain. It is recommended to review the content before importing.',
  'all': 'All',
  'not-all': 'DESELECT ALL',
  'selected': 'Selected:',
  'imported': 'Imported:',
  'put-on-the-top': 'Put on the top',
  'copy-md': 'Copy Markdown',
  'export-md': 'Export Markdown',
  'export-csv': 'Export CSV',
  'setting': 'Setting',
}
const Setting = {
  'update-by-yourself': 'Update By Yourself',
  'release': 'Release',
  'netdisc': 'Netdisc',
  'lang': 'Language',
  'about': 'About',
  'update': 'Update',
  'thanks': 'Thanks for lupeng',
  'github': 'GitHub',
  'blog': 'Blog',
  'photo': "Tit1e's Photo Studio",
  'jike': 'JIKE',
  'buy-me-a-coffee': 'Buy Me A Coffee',
  'check-update': 'Check Update',
  'auto-check': 'Automatic Check Update',
}
const System = {
  'reading-notes': 'reading',
  'update-failed': 'Update failed, please try again later',
  'restart-now-tip': 'The download has been completed, do you restart immediately?',
  'install': 'Install',
  'restart-now': 'Restart Now',
  'talk-about-later': 'Not Now',
  'download-now': 'Download Now',
  'find-new-version': 'New Version!',
  'new-version': 'The new version {version} is ready, is it updated now?',
  'copied': 'Copied',
  'loading': 'Loading',
  'progress': 'Progress',
  'import-failure': 'Import failure',
  'import-success': 'Success'
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