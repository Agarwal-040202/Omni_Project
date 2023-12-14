import React, { useState, useRef } from 'react';

const Corporatevideo = () => {
  const [muteVideo, setMuteVideo] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setMuteVideo(prevMute => !prevMute);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muteVideo}
        playsInline
        src="./OmniCorporate.mp4"
        style={{
          width: '100%',
          height: 'auto',
        }}
        onClick={toggleMute}
      ></video>
    </div>
  );
};

export default Corporatevideo;
