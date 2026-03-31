import React from "react";

function HomeBanner() {
  return (
    <div className="pt-[76px] sm:pt-0 h-auto md:h-[100dvh]">
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
