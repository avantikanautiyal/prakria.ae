import React from "react";
import AuraBackgroundSection from "@/components/global/aurabackground/aurabackground";

function Template({ children, ...props }) {
  return (
    <div className="">
      <div className="sticky top-0 w-[100%] z-[1]">
        {/* <AuraBackgroundSection /> */}
      </div>
      <div id="main" className="sticky z-10 bg-black">
        {children}
      </div>
    </div>
  );
}

export default Template;
