const { shell } = require('electron');
const os = require('os');

const fileManagerBtn = document.getElementById('open-file-manager');
fileManagerBtn.addEventListener('click', () => {
  const openStatus = shell.openItem(os.homedir() + '/personal')
  shell.beep();
  console.log('openStatus', openStatus);
})
