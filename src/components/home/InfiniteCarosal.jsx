import React from "react";
import Marquee from "react-fast-marquee";
import "../../styles/marque.css";
const LogoMarquee = () => {
  return (
    <div
      className="wow animate fadeInUp bg-white p-6"
      data-wow-delay="200ms"
      data-wow-duration="1500ms"
    >
      <div>
        <div className="flex flex-col py-4 ">
          <div className="">
            <h6 className="text-3xl text-center text-gray-900 font-bold">
              BRANDS WHO LOVE WORKING WITH US
            </h6>
          </div>
          <div className="flex flex-col justify-center items-center">
            <MyMarquee />
          </div>
        </div>
      </div>
    </div>
  );
};

function MyMarquee() {
  const ClinetList = [
    {
      src: "/images/3d_cgi.jpg",
      id: 1,
    },
    {
      src: "/images/3d_cgi.jpg",

      id: 2,
    },
    {
      src: "/images/3d_cgi.jpg",

      id: 2,
    },
    {
      src: "/images/3d_cgi.jpg",

      id: 2,
    },
    {
      src: "/images/3d_cgi.jpg",

      id: 2,
    },
    {
      src: "/images/3d_cgi.jpg",

      id: 2,
    },
  ];

  return (
    <div className={"scroller  m-auto"} data-speed="slow" data-animated="true">
      <ul className={`${"tag-list"} ${"scroller__inner"} text-black`}>
        {[...ClinetList, ...ClinetList].map((item, index) => (
          <li key={index}>
            <img className="aspect-auto w-[100px]" src={item.src} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogoMarquee;
