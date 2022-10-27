let mediaStream = null;
let mediaRecorder = null;
let chunks = [];
let file = "";

// 开始录制
const start = async (videoRef) => {
  if(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
    console.log('当前浏览器不支持屏幕捕捉');
    return;
  }

  mediaStream = await navigator.mediaDevices.getDisplayMedia()
  
  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: 'video/webm;codecs=vp9',
    audioBitsPerSecond: 128000, //音频码率
    videoBitsPerSecond: 250000000, //视频码率
  })

  // 开始录制媒体
  mediaRecorder.start();

  // 用来处理 start 事件，该事件再媒体开始录制时触发
  mediaRecorder.onstart = () => {
    console.log('screen start');
  }

  // 改时间可用于获取录制的媒体资源（在事件的 data 属性中会提供一个可用的 Blob 对象）
  mediaRecorder.ondataavailable = e => {
    chunks.push(e.data);
  }

  // 用来处理 stop 事件，改时间再媒体录制结束时、媒体流结束时、或调用 stop 方法后触发
  mediaRecorder.onstop = e=> {
    // 获取到录音的 blob
    let blob = new Blob(chunks, { type: 'video/webm;codecs=vp9' });

    //  将 blob 转换为 file 对象，名字可以自己改，一般用于需要将文件上传到后台的情况
    file = new window.File([blob], "screen.mp4");

    // 将 blob 转换为地址，一般用于页面上面的回显，这个 url 可以直接被 audio 标签使用
    const url = window.URL.createObjectURL(blob);
    videoRef.current.src = url;

    console.log('videoRef', videoRef.current, file);
  }
};

// 停止录制
const stop = () => {
  if (mediaRecorder) {
    mediaStream = null;
    mediaRecorder.stop();
    mediaRecorder = null;
  }
};

// 下载视频
const download = () => {
  if(!file) {
    console.log('请进行视频录制');
    return;
  }
  let a = document.createElement('a');
  a.download = file.name;
  let href = URL.createObjectURL(file);
  a.href = href;
  a.click();

  URL.revokeObjectURL(href);
  file = "";
};

export {
  start,
  stop,
  download
}