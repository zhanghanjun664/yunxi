const resetScroll = () => {
  // 需等待虚拟dom innerHTML完成之后
  setTimeout(() => {
    let lct = document.getElementById('msgListItem')
    lct.scrollTop  = lct.scrollHeight + 10000
  }, 50)
}

export { resetScroll }