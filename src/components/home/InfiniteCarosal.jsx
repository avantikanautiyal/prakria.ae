import React from "react";
import Marquee from "react-fast-marquee";
import "../../styles/marque.css";
const LogoMarquee = ({}) => {
  let list = Array.from(
    { length: 55 },
    (_, i) => "/assets_main/brands/" + i + ".jpg"
  );
  return (
    <div>
      <MyMarquee list={list} />
    </div>
  );
};

function MyMarquee({ list }) {
  return (
    <div className={"scroller   mb-30"}  data-speed="slow" data-animated="true">
      <ul className={`${"tag-list"} ${"scroller__inner"} text-black`}>
        {[...list, ...list].map((item, index) => (
          <li key={index}>
            <img
              className="rounded-full aspect-auto w-[100px] mix-blend-multiply bg-red-500"
              src={item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogoMarquee;
