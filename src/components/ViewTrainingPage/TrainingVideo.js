import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'

const TrainingVideo = ({ filePath }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if(videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  return (
    <div>
      <video
        controls
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={filePath} type="video/mp4" /> {/* Update the type according to your video format */}
        Your browser does not support the video tag.
      </video>
      <p>Current Time: {currentTime.toFixed(2)}</p>
    </div>
  )
}

export default TrainingVideo