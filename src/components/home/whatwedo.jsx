"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Whatwedo({}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const ref = useRef(null);
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const content = [
    {
      tilte: "title 1",
      description: "description 1",
      content: (
        <img src="/images/digital_marketing.jpg" className="w-full h-full" />
      ),
    },
    {
      tilte: "title 2",
      description: "description 2",
      content: <img src="/images/branding.jpg" className="w-full h-full" />,
    },
    {
      tilte: "title 3",
      description: "description 3",
      content: (
        <img src="/images/digital_marketing.jpg" className="w-full h-full" />
      ),
    },
  ];
  return (
    <div className="bg-black py-6">
      <div className=" sticky top-[75px] bg-gradient-to-b from-black p-6 z-10">
        <h1 className="font-bold text-center text-4xl uppercase">what we Do</h1>
      </div>
      <div className=" flex  justify-center gap-6">
        <div className=" p-4 flex items-center flex-col">
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
          <div className="rounded-md sticky lg:top-[250px] md:top-[200px] md:w-[400px] md:h-[400px]  lg:w-[6    00px]   overflow-hidden">
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
                  {content?.[activeIndex]?.content}
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
        {item.tilte}
      </h2>
      <p
        className={`text-pretty transition-all duration-300  ${
          active ? "text-current" : "text-gray-600"
        }`}
      >
        {item.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis a
        modi voluptatibus beatae architecto quis officia nobis saepe praesentium
        sint sequi, laboriosam inventore fuga similique?
      </p>
    </div>
  );
};

export default Whatwedo;
