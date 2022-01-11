/*
 * @Author: kuanggf
 * @Date: 2022-01-11 11:55:12
 * @LastEditors: kuanggf
 * @LastEditTime: 2022-01-11 15:18:23
 * @Description: file content
 */
const checkbox = document.getElementById('checkbox')
const checkboxDot = document.getElementById('checkbox__dot')
const CHECK_STATUS_OFF = 'off'
const CHECK_STATUS_ON = 'on'
const KEY_SUFFIX = '_svn_img'
let checkStatus = CHECK_STATUS_OFF

checkbox.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const attr = tab.id + KEY_SUFFIX
  if (checkStatus === CHECK_STATUS_OFF) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: previewImage,
    })
    checkStatus = CHECK_STATUS_ON
    checkboxDot.classList.add('checkbox__dot--on')
    chrome.storage.local.set({[attr]: '1'})
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: previewImageOff,
    })
    checkStatus = CHECK_STATUS_OFF
    checkboxDot.classList.remove('checkbox__dot--on')
    chrome.storage.local.remove(attr)
  }
})

function previewImage() {
  const links = document.querySelectorAll('a')
  if (!links) return
  links.forEach(item => {
    const href = item.getAttribute('href')
    if (!href) return
    if (href.includes('.png')
      || href.includes('.jpg')
      || href.includes('.jpeg')) {
      item.parentNode.insertAdjacentHTML('beforeend', `
        <img data-name="preview-image" src="${item.getAttribute('href')}" style="display:block; max-width: 200px;">
      `)
    }
  })
}

function previewImageOff() {
  const imgs = document.querySelectorAll('img[data-name=preview-image]')
  if (!imgs) return
  imgs.forEach(item => {
    item.parentNode.removeChild(item)
  })
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const attr = tab.id + KEY_SUFFIX
  chrome.storage.local.get(attr, (result) => {
    if (result[attr] === '1') {
      checkStatus = CHECK_STATUS_ON
      checkboxDot.classList.add('checkbox__dot--on')
    }
  })
}

function main() {
  init()
}

main()