"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aura-background";
import { FaAngleDoubleDown } from "react-icons/fa";
import Link from "next/link";

import data from "@/data/data_service.json";
import animation from "@/styles/animation.module.css";
import { usePathname } from "next/navigation";
export default function AuraBackgroundSection() {
  const pathname = usePathname();
  console.log(pathname);
  const service = data?.[pathname];
  // console.log(service);
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" container relative flex flex-col gap-3 items-center justify-center pt-10 px-4"
      >
        <div className="text-2xl md:text-6xl font-bold dark:text-white text-center">
          {/* Coffee or Beer ? It's on us! */}
          {service?.title}
        </div>
        <div className="font-extralight text-md dark:text-neutral-200 py-4 text-center">
          {service?.description}
          {/* Our studio doesn’t have a reception. Just barge in and say Hi! (We
          don’t mind receiving gifts from clients unless it’s a law firm we’re
          working with!) */}
        </div>
        <a href="#main">
          <div
            className={`z-10 text-white border-2 border-white rounded-full p-2 h-[90px] flex items-center justify-center transition-all duration-1000 ${animation?.["animate-scroll"]}`}
          >
            <FaAngleDoubleDown />
          </div>
        </a>
        {/* <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button> */}
      </motion.div>
    </AuroraBackground>
  );
}
