"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import {}

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  // useEffect(() => {
  //   console.log("handle scroll");
  //   const handleScroll = () => {
  //     console.log("scroll");
  //     setLastSelected(null);
  //     setSelected(null);
  //     // Add your scroll handling logic here
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    console.log("open ", open);
  }, [open]);

  return (
    <div
      // onMouseLeave={() => handleOutsideClick()}
      className="flex-grow w-full h-full p-0 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative auto-rows-[200px] md:auto-rows-[330px]"
    >
      <DialogDemo />
      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(card.className, "")}
          onClick={() => {
            setSelectedImage(card);
            setOpen(true);
            console.log("clicked", open);
          }}
        >
          <motion.div
            // onMouseEnter={() => handleClick(card)}
            // onHover={handleClick(card)}
            // onClick={() => handleClick(card)}

            className={cn(
              card.className,
              "relative overflow-hidden  g-dark rounded-xl h-full w-full"
            )}
            layout
          >
            {/* {selected?.id === card.id && <SelectedCard selected={selected} />} */}
            <div className={""}>
              <BlurImage card={card} />
            </div>
          </motion.div>
        </div>
      ))}
      <DialogDemo open={open} setOpen={setOpen} card={selectedImage} />
      {/* <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      /> */}
    </div>
  );
};

const BlurImage = ({ card, open }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={card.thumbnail}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        " aspect-auto object-cover object-top absolute inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};

export function DialogDemo({ open, setOpen, card }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <div className=" flex justify-center items-center">
          <img src={card?.thumbnail} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
