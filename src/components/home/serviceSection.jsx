"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/layout-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LayoutGridDemo({
  title,
  link,
  content = [],
  className,
}) {
  return (
    <div className="h-auto w-full bg-black flex flex-col p-10">
      <h1 className="z-[1000] p-4 sticky flex md:hidden justify-center items-center top-[75px] font-bold bg-gradient-to-b from-black text-center text-4xl uppercase">
        {title}
      </h1>
      <div className="  p-6 gap-3 flex flex-col text-neutral-200">
        <h1 className=" md:flex hidden font-bold justify-center items-center text-center text-4xl uppercase">
          {title}
        </h1>
        <p className="flex justify-center items-center text-center text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          quam laborum, illo incidunt odit placeat commodi quidem libero
          laudantium magni, exercitationem dolores ea provident, dolorum modi
          sequi quasi? Debitis, quisquam.
        </p>
      </div>
      <LayoutGrid
        cards={content?.map((card) => ({
          ...card,
          content: (
            <SkeletonOne
              title={card.title}
              description={card.description}
              Link={card.link}
            />
          ),
        }))}
      />
      <div className="flex justify-center items-center ">
        <Button variant="outline">
          <Link href={link ?? "#"}>view all</Link>
        </Button>
      </div>
    </div>
  );
}

const SkeletonOne = ({ title, description }) => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {description}
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">House above the clouds</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Greens all over</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Rivers are serene</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

// const cards = [
//   {
//     id: 1,
//     content: <SkeletonOne />,
//     className: "md:col-span-2",
//     thumbnail: "/images/digital_marketing.jpg",
//   },
//   {
//     id: 2,
//     content: <SkeletonTwo />,
//     className: "col-span-1",
//     thumbnail: "/images/digital_marketing.jpg",
//   },
//   {
//     id: 3,
//     content: <SkeletonThree />,
//     className: "col-span-1",
//     thumbnail: "/images/digital_marketing.jpg",
//   },
//   {
//     id: 4,
//     content: <SkeletonFour />,
//     className: "md:col-span-2",
//     thumbnail: "/images/digital_marketing.jpg",
//   },
//   // {
//   //   id: 4,
//   //   content: <SkeletonFour />,
//   //   className: "md:col-span-2",
//   //   thumbnail: "/images/digital_marketing.jpg",
//   // },
//   // {
//   //   id: 77,
//   //   content: <SkeletonFour />,
//   //   className: "md:col-span-1 ",
//   //   thumbnail: "/images/digital_marketing.jpg",
//   // },
// ];
