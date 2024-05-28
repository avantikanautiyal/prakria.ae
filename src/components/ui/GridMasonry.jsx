"use client";
import React, { useEffect, useState } from "react";
import { DirectionAwareHover } from "./direction-aware-hover";
import { cn } from "@/utils/cn";
function GridMasonry() {
  // const [render, setRender] = useState(false);

  const [list, setList] = useState([]);
  useEffect(() => {
    const li = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setList(li.map((l) => "row-span-" + (Math.floor(Math.random() * 3) + 1)));
  }, []);
  useEffect(() => {
    console.log("list", list);
  }, [list]);
  return (
    <div className=" p-4  rounded-lg grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3   grid-flow-row-dense auto-rows-[150px]">
      {list.map((g, i) => {
        return (
          <GridCard
            key={i}
            className={g}
            num={Math.floor(Math.random() * 3) + 1}
          />
        );
      })}
    </div>
  );
}

function GridCard({
  wide = false,
  tall = false,
  imageURL = "/images/3d_cgi.jpg",
  // num = Math.floor(Math.random() * 3) + 1,
  num = 1,
  className,
}) {
  console.log("num", num);
  return (
    <div className={cn(className, `rounded-lg`)}>
      <DirectionAwareHover imageUrl={imageURL}>
        {/* <p>title</p> */}
      </DirectionAwareHover>
    </div>
  );
}

export default GridMasonry;
