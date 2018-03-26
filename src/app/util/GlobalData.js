// 从全局存储取出对应的值
export function getLocalData (key) {
  return JSON.parse(localStorage.getItem(key))
}

// 存放对应的值到全局对象
export function setLocalData (key, value) {
  localStorage.setItem(key, value ? JSON.stringify(value): null)
}