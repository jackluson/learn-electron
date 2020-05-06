const { app, screen } = require('electron').remote;
console.log('getAppPath', app.getAppPath());
const appPathEl = document.getElementById('app-path');
appPathEl.innerHTML = app.getAppPath();

const size = screen.getPrimaryDisplay().size;
const message = `当前屏幕是: ${size.width}px x ${size.height}px`
document.getElementById('got-screen-info').innerHTML = message;



// process
console.log(process)
console.log('process.version', process.versions)

document.getElementById('version').innerHTML = process.versions.v8

// node
document.getElementById('module').innerHTML = require('os').homedir();




