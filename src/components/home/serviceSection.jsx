"use client";
import { LayoutGrid } from "../ui/layout-grid";
import Link from "next/link";

export default function LayoutGridDemo({
  title,
  link,
  content = [],
  ctaText = "View all",
  ctaHoverText = "View all",
}) {
  return (
    <div className="pb-2 container bg-black">
      <div className="pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className=" md:flex  font-bold uppercase">
            {title}
          </h2>
          {link ? (
            <Link href={link}>
              <button
                className="primary-btn2 capitalize"
                type="submit"
                data-text={ctaHoverText || ctaText}
              >
                <span>{ctaText}</span>
              </button>
            </Link>
          ) : null}
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
