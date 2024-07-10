"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {}

export const LayoutGrid = ({ cards }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("open ", open);
  }, [open]);

  return (
    <div
      // onMouseLeave={() => handleOutsideClick()}
      className="row"
    >
      <DialogDemo />
      {cards.map((card, i) => (
        <BlurImage
          card={card}
          key={i}
          className={card.className}
          onClick={() => {
            setSelectedImage(card);
            setOpen(true);
            console.log("clicked", open);
          }}
        />
      ))}
      <DialogDemo open={open} setOpen={setOpen} card={selectedImage} />
    </div>
  );
};

const BlurImage = ({ card, open, onClick, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
    <img
      className={className + " mb-4 "}
      onClick={onClick}
      src={card.thumbnail}
      height="900"
      width="900"
      onLoad={() => setLoaded(true)}
      alt="thumbnail"
    />
    </>
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
