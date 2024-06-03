import React from "react";
import Marquee from "react-fast-marquee";
import "../../styles/marque.css";
const LogoMarquee = ({}) => {
  let list = Array.from(
    { length: 55 },
    (_, i) => "/assets_main/brands/" + i + ".jpg"
  );
  return (
    <div
      className="home1-testimonial-section wow animate fadeInUp  p-6"
      data-wow-delay="200ms"
      data-wow-duration="1500ms"
    >
      <div>
        <div className="flex flex-col py-4 ">
          <div className="">
            <h6 className="text-3xl text-center text-white font-bold">
              BRANDS WHO LOVE WORKING WITH US
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center">
            <MyMarquee list={list} />
          </div>
        </div>
      </div>
    </div>
  );
};

function MyMarquee({ list }) {
  return (
    <div className={"scroller  m-auto"} data-speed="slow" data-animated="true">
      <ul className={`${"tag-list"} ${"scroller__inner"} text-black`}>
        {[...list, ...list].map((item, index) => (
          <li key={index}>
            <img className="aspect-auto w-[100px] mix-blend-multiply bg-red-500" src={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogoMarquee;
