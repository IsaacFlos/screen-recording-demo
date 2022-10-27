import React from 'react';
import { useRef } from 'react';

import { start, stop, download } from '../utils/screen';

export default function Index() {
  const videoRef = useRef(null);

  return (
    <div>
      <video controls width="1000" height="auto" ref={videoRef} src="" />
      <br />
      <button style={{ marginTop: '20px' }} onClick={() => start(videoRef)}>开始屏幕录制</button>
      <button onClick={() => stop()}>结束屏幕录制</button>
      <button onClick={() => videoRef.current.play()}>播放屏幕录制视频</button>
      <button onClick={() => download()}>下载屏幕录制视频</button>
    </div>
  )
}
