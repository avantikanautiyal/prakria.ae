"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/layout-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LayoutGridDemo({ title, link, content = [] }) {
  return (
    <div className="py-4 container bg-black">
      <div className="pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className=" md:flex  font-bold uppercase">
            {title}
          </h2>
          <Link href={link ?? "#"}>
            <button
              className="primary-btn2 capitalize"
              type="submit"
              data-text="View all"
            >
              view all
            </button>
          </Link>
        </div>
      </div>

      <div className="h-full">
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
