const msgList = [{
    type: 'receive',
    createAt: '3月29日 20:00',
    avatar: 'assets/images/staffs/girl.png',
    readStatus: 'readed',
    content: '我是客服【小福】，请问有什么可以帮到您？'
  },
  {
    type: 'receive',
    createAt: '昨天',
    avatar: 'assets/images/staffs/girl.png',
    readStatus: 'readed',
    content: `
          <div>常见问题：</div>
          <div class='msg-link'>
            <ul>
              <li><a href='about:blank;'>如何支付定金？</a></li>
              <li><a href='about:blank;'>如何完成尾款支付？</a></li>
              <li><a href='about:blank;'>预约试驾需要</a></li>
            </ul>
          </div>
        `
  },
  {
    type: 'send',
    createAt: '18:30',
    avatar: 'assets/images/staffs/boy.png',
    readStatus: 'reading',
    content: '请问经销商报价真实吗？到店是否有现车？'
  }
]

export default msgList