import React, { useRef, useState, useEffect } from 'react';

function AudioStreamPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioUrl =
    'http://175.10.24.157:8090/c/stream/19dea8e02e1b40cb9eee3d5b68f106e0/134416237948464/49';

  const handleCanPlay = () => setIsLoading(false);
  const handleError = (e) => {
    console.error('音频加载错误:', e);
    setIsLoading(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if(audio) {
      audio.load(); // 预加载音频
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('播放失败:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isLoading) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onCanPlay={handleCanPlay}
        onError={handleError}
        preload="auto"
      />
      <button onClick={togglePlay} disabled={isLoading}>
        {isLoading ? '加载中...' : isPlaying ? '暂停' : '播放'}
      </button>
    </div>
  );
}

export { AudioStreamPlayer };
