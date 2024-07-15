"use client";
import React, { useEffect, useState } from "react";
import { DirectionAwareHover } from "./direction-aware-hover";
import { cn } from "@/utils/cn";
import Link from "next/link";

/**
 * Renders a grid masonry layout with optional random placement.
 *
 * @param {Object} options - Configuration options for the grid masonry.
 * @param {boolean} [options.random=true] - Determines whether the placement of items is random or not.
 * @param {Array} [options.data=[]] - An array of objects representing the items to be placed in the grid.
 * @param {string} options.data[].src - The source URL for the image.
 * @param {number} options.data[].col - The column position for the item.
 * @param {number} options.data[].row - The row position for the item.
 * @param {string} options.data[].link - A URL link associated with the item.
 *
 * @example
 * const data = [
 *   { src: "/images/3d_cgi.jpg", col: 1, row: 1, link: "https://example.com" },
 *   { src: "/images/another_image.jpg", col: 2, row: 1, link: "https://example.com/another" }
 * ];
 *
 * GridMasonry({ random: false, data });
 */
function GridMasonry({ random = true, data = [], fill = true }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    // const li = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const items = data.map((item) => {
      if (random) {
        return {
          ...item,
          row: item.row ? item.row : Math.floor(Math.random() * 3) + 1,
          col: item.col ? item.col : Math.floor(Math.random() * 3) + 1,
        };
      } else {
        return {
          ...item,
          row: item.row ?? 1,
          col: item.col ?? 1,
        };
      }
    });

    setList(items);
    // setList(li.map((l) => Math.floor(Math.random() * 3) + 1));
  }, []);

  return (
    <div className=" pb-4  rounded-lg grid gap-3 grid-cols-12 grid-flow-row-dense ">
      {list.map((g, i) => {
        return <GridCard key={i} item={g} fill={fill} />;
      })}
    </div>
  );
}

function GridCard({ item, className, fill }) {
  // src = "/images/3d_cgi.jpg", num = 1
  return (
    <>
      <div
        id={"portfolio-card"}
        className={cn(
          className,
          `rounded-lg wow animate zoomIn hidden  md:block col-span-12`
        )}
        style={{
          gridRow: `span ${item.row}`,
          gridColumn: `span ${item.col}`,
        }}
      >
        {item.link ? (
          <Link href={item.link}>
            <DirectionAwareHover
              imageUrl={item.src}
              type={item.type}
              fill={fill}
            ></DirectionAwareHover>
          </Link>
        ) : (
          <DirectionAwareHover
            imageUrl={item.src}
            type={item.type}
            fill={fill}
          ></DirectionAwareHover>
        )}
      </div>

      <div
        className={cn(
          className,
          `rounded-lg wow animate zoomIn block md:hidden col-span-12`
        )}
      >
        {item.link ? (
          <Link href={item.link}>
            <DirectionAwareHover
              imageUrl={item.src}
              type={item.type}
              fill={fill}
            ></DirectionAwareHover>
          </Link>
        ) : (
          <DirectionAwareHover
            imageUrl={item.src}
            type={item.type}
            fill={fill}
          ></DirectionAwareHover>
        )}
      </div>
    </>
  );
}

export default GridMasonry;
