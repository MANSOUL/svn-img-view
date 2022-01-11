/*
 * @Author: kuanggf
 * @Date: 2022-01-11 15:15:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2022-01-11 15:18:40
 * @Description: file content
 */
function attachEvent() {
  const KEY_SUFFIX = '_svn_img'
  chrome.tabs.onRemoved.addListener((tabId) => {
    const attr = tabId + KEY_SUFFIX
    chrome.storage.local.remove(attr)
  })
  chrome.tabs.onUpdated.addListener((tabId) => {
    const attr = tabId + KEY_SUFFIX
    chrome.storage.local.remove(attr)
  })
}

attachEvent()