"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import {}

export const LayoutGrid = ({ cards }) => {
  const router = useRouter();
  console.log(cards, "ghghgh");
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log("open ", open);
  // }, [open]);

  return (
    <div className="row">
      {/* <DialogDemo /> */}
      {cards.map((card, i) => (
        // <Link
        //   key={i}
        //   href={`/portfolio_item/${card.id.toString()}`}
        //   className={card.className}
        // >
        <BlurImage
          card={card}
          // imageUrl={card.id}
          onClick={() => {
            if (card?.id) router.push(`/portfolio-item/${card?.id}`);
          }}
          onHover={() => {}}
          key={i}
          className={card.className}
        />
        // </Link>
      ))}
      {/* <DialogDemo open={open} setOpen={setOpen} card={selectedImage} /> */}
    </div>
  );
};

const BlurImage = ({ card, open, onClick, className, onHover }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        className={className + " mb-4 " + "image-container"}
        onClick={onClick}
      >
        <img
          src={card.thumbnail}
          height="900"
          width="900"
          onLoad={() => setLoaded(true)}
          alt="thumbnail"
          style={{ height: "100%" }}
        />
        <div className="overlay">
          <div className="text">{card.title}</div>
        </div>
      </span>
    </>
  );
};

// export function DialogDemo({ open, setOpen, card }) {
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="">
//         <div className=" flex justify-center items-center">
//           <img src={card?.thumbnail} />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
