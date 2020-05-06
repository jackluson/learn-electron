const { app, dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

var oCanvas = document.getElementById('canvas');
var ctx = oCanvas.getContext('2d');
var video = document.querySelector('#video');
var btnScreen = document.querySelector('#btn-record');

var constraints = { audio: false, video: { width: 640, height: 480 } };

function toBuffer(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

btnScreen.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    video.srcObject = mediaStream;

    video.onloadedmetadata = function (e) {
      video.play();
    };
    const track = mediaStream.getVideoTracks()[0];
    console.log(track, 'track');
    const imageCapture = new ImageCapture(track);
    return imageCapture.getPhotoSettings();
  })
    .then(photoSettings => {
      oCanvas.width = photoSettings.imageWidth;
      oCanvas.height = photoSettings.imageHeight;
    })
    .catch(function (err) {
      console.log('err', err);
      console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.

})

document.getElementById('btn-screen').onclick = function () {
  ctx.drawImage(video, 0, 0);

  // var base64Img = canvas.toDataURL();
  const options = {
    title: '保存图像',
    defaultPath: path.join(app.getAppPath(), '/assets/img'),
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'gif'] }
    ]
  };
  console.log(dialog);

  dialog.showSaveDialog(options).then(result => {
    canvas.toBlob((blob) => {
      console.log(blob);

      // fs.rename(toBuffer(rawData), result.filePath, (err) => {
      //   if (err) throw err;
      //   console.log('重命名完成');
      // })
      blob.arrayBuffer().then(res => {
        console.log('res', res);
        const buf = toBuffer(res);
        // var file = fs.createReadStream(buf);
        // fs.writeFile(result.filePath, buf, (err) => {
        //   if (err) throw err;
        //   console.log('文件已被保存');
        // });

        // var readStream = fs.createReadStream(buf); // buf 不是数据的形式，是路径的形式
        // var writeStream = fs.createWriteStream(result.filePath);
        // readStream.on("end", (e) => {
        //   console.log('end', e);

        // });
        // readStream.pipe(writeStream);
        var readStream = fs.createReadStream(path.join(app.getAppPath(), '/assets/img/programming.png')); // buf 不是数据的形式，是路径的形式
        var writeStream = fs.createWriteStream(result.filePath);
        readStream.on("end", () => {
          console.log('end');
        });
        readStream.pipe(writeStream);
      })
      return;
      // file Reader 方式
      var reader = new FileReader();

      reader.onload = function (e) {
        var rawData = reader.result;

        console.log(rawData);
        const buf = toBuffer(rawData);
        const un8 = new Uint8Array(rawData);
        console.log(buf)
        const targetPath = path.join(app.getAppPath(), '/assets/img/target2.png');
        // var file = fs.createReadStream(buf);
        fs.writeFile(targetPath, un8, (err) => {
          if (err) throw err;
          console.log('文件已被保存');
        });

      }

      reader.readAsArrayBuffer(blob);

      // 普通文件
      // var data = fs.readFileSync(path.join(app.getAppPath(), '/assets/img/test.txt'), 'utf8');
      // fs.writeFile(result.filePath, data, (err) => {
      //   if (err) {
      //     console.log(err);
      //     throw err;
      //   }
      //   console.log('saved success');
      // })

      // const readPath = path.join(app.getAppPath(), '/assets/img/programming.png');
      // const targetPath = path.join(app.getAppPath(), '/assets/img/target.png');
      // var file = fs.createReadStream(readPath);
      // var out = fs.createWriteStream(targetPath);
      // file.on('data', function (data) {
      //   console.log('data', data)
      //   out.write(data);
      // });
      // out.on('open', function (fd) {
      //   console.log('需要被写入的文件已打开');
      // });
      // file.on('end', function () {
      //   //将操作系统缓存区中的数据全部写入文件
      //   // out.end('再见', function () {
      //   //   console.log('文件全部写入完毕');
      //   //   console.log('共写入' + out.bytesWritten + '数据');
      //   // });
      //   out.end('', function () {
      //     console.log('文件全部写入完毕');
      //     console.log('共写入' + out.bytesWritten + '数据');
      //   });
      // });

    });

  }).catch(err => {
    console.log(err)
  })

};
