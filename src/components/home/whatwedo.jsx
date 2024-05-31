"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function Whatwedo({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const ref = useRef(null);
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <div className="bg-black py-6">
      <div className=" sticky top-[75px] bg-gradient-to-b from-black p-6 z-10">
        <h1 className="font-bold text-center text-4xl uppercase">what we Do</h1>
      </div>
      <div className=" flex  justify-center gap-6">
        <div className=" p-4 flex items-center flex-col grow md:w-auto">
          {content.map((item, index) => {
            return (
              <ContentCard
                key={index}
                item={item}
                index={index}
                onActive={(cont) => {
                  setActiveIndex(cont);
                }}
              />
            );
          })}
        </div>
        <div className="p-10 hidden md:block">
          <div className="rounded-md sticky lg:top-[150px] md:top-[200px] md:w-[100%] md:h-[400px] max-w-[600px]    overflow-hidden">
            <AnimatePresence>
              {!(activeIndex === null) && (
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  <img
                    src={content?.[activeIndex]?.src}
                    className="w-full h-full"
                  />
                  {/* {content?.[activeIndex]?.content} */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContentCard = ({ item, onActive, index }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const checkMiddleContainer = () => {
      const windowHeight = window.innerHeight;

      if (ref.current) {
        const { top, bottom } = ref.current.getBoundingClientRect();
        if (top < windowHeight / 2 && bottom > windowHeight / 2) {
          setActive(true);
          onActive?.(index);
        } else {
          //   onActive?.(null);

          setActive(false);
        }
      }
    };

    window.addEventListener("scroll", checkMiddleContainer);
    window.addEventListener("resize", checkMiddleContainer);

    // Initial check
    checkMiddleContainer();

    return () => {
      window.removeEventListener("scroll", checkMiddleContainer);
      window.removeEventListener("resize", checkMiddleContainer);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="flex flex-col gap-6  h-[500px] max-w-[500px] min-w-[200px]"
    >
      <h2
        className={`text-3xl font-bold capitalize transition-all duration-300 ${
          active ? "text-current" : "text-gray-600"
        }`}
      >
        <Link href={item.link ?? "#"}>{item.title}</Link>
      </h2>
      <p
        className={`text-pretty transition-all duration-300  ${
          active ? "text-current" : "text-gray-600"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
};

export default Whatwedo;
