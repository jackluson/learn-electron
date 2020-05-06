const path = require('path');
const os = require('os');
const { shell } = require('electron');
const notificationOpt = {
  title: '附带图像的通知',
  body: '短消息附带自定义图片',
  icon: path.join(__dirname, 'assets/img/programming.png')
}

const notificationButton = document.getElementById('open-noti')

notificationButton.addEventListener('click', () => {
  console.log(Notification.permission);

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    // var notification = new Notification("Hi there!");
    const myNotification = new window.Notification(notificationOpt.title, notificationOpt)

    myNotification.onclick = () => {
      console.log('通知被点击')
      // shell.openItem(os.homedir() + '/personal')
      shell.openExternal('https://www.electronjs.org/docs/api/shell#shellopenexternalurl-options')
    }
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // 如果用户同意，就可以向他们发送通知
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

})
