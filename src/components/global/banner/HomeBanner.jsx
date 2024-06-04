import React from "react";

function HomeBanner() {
  return (
    <div>
      <video
        src="/images/home_video.mp4"
        muted
        autoPlay
        loop
        className="h-auto md:h-[100dvh] w-[100dvw] object-cover"
      />
    </div>
  );
}

export default HomeBanner;
