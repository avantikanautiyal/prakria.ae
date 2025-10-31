import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";
import Home1Blog from "@/components/home/blogCard";
import Link from "next/link";
import EnquireBtn from "@/components/global/enquirenow";

export const metadata = {
  title : {
    absolute : "PRAKRIA – About Us | 360° Marketing & Creative Agency in Delhi"
  },
  keywords : "Prakria,  360° marketing agency in Delhi, creative agency Delhi, branding agency Delhi, digital marketing services, packaging design agency, 3D CGI AR VR studio, web development Delhi,about Prakria",
  description: "PRAKRIA is a leading 360° marketing and creative agency in Delhi, delivering branding, digital marketing, packaging design, 3D/CGI, AR/VR, and web development solutions with strategy, speed, and innovation. Learn more about our story and vision."
};

function Page() {
  return (
    <>
      <div className="service-page-hero">
        <div className="container text-center">
          <div className="banner-wrapper">
            <div className="banner-content">
              <h1>Curious About Us?</h1>
              <p>
                An independent and multidisciplinary creative agency has been on
                a journey with a Modus Operandi that has flexibly carved out a
                niche in the creative design world.
              </p>
              <EnquireBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div className="p-4 grid gap-4 container grid-cols-1 md:grid-cols-2">
          <div className="">
            {/* <span className="sub-title5 two">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
              >
                <path d="M3.7081 12.9544C3.41861 13.1128 3.09011 12.8352 3.14861 12.4808L3.7711 8.69694L1.12886 6.01223C0.882112 5.76104 1.01036 5.30186 1.34111 5.25226L5.0146 4.69548L6.6526 1.23399C6.80035 0.922003 7.2001 0.922003 7.34785 1.23399L8.98584 4.69548L12.6593 5.25226C12.9901 5.30186 13.1183 5.76104 12.8708 6.01223L10.2293 8.69694L10.8518 12.4808C10.9103 12.8352 10.5818 13.1128 10.2923 12.9544L6.9991 11.1497L3.7081 12.9544Z" />
              </svg>
              EXPERTISE YOU CAN TRUST
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
              >
                <path d="M3.7081 12.9544C3.41861 13.1128 3.09011 12.8352 3.14861 12.4808L3.7711 8.69694L1.12886 6.01223C0.882112 5.76104 1.01036 5.30186 1.34111 5.25226L5.0146 4.69548L6.6526 1.23399C6.80035 0.922003 7.2001 0.922003 7.34785 1.23399L8.98584 4.69548L12.6593 5.25226C12.9901 5.30186 13.1183 5.76104 12.8708 6.01223L10.2293 8.69694L10.8518 12.4808C10.9103 12.8352 10.5818 13.1128 10.2923 12.9544L6.9991 11.1497L3.7081 12.9544Z" />
              </svg>
            </span> */}
            <MDXRemote
              source={`
                # We Love Madness at Work

A well-planned and controlled madness — that’s what we’ve perfected over two decades. As a packaging design agency, our creative chaos fuels everything we do, from brand building to web designing, and even venturing into spaces like mobile game development where imagination meets innovation.

And for all the madness that goes inside creating a well-thought-of campaign or a creative, we still retain our composure by pondering over this Spiderman-thought-tweaked-as-per-us:  
> “With great design responsibility comes greater ‘Deliver on time’ responsibilities.”

We’re big enough to incubate some of the most innovative ideas and small enough to service them personally for every client. Whether it’s a custom packaging design project that demands artistry and precision, or a high-energy digital campaign that calls for quick execution, we can go all berserk thinking out of the box for the creative ones — and come back faster than Bolt’s sprint for the deadline-oriented ones.

There are things we always look up to and believe in —  
**Clients. Brainstorming. Design Aesthetics. Commitments. Coffee (why not?)**

Then there are things you won’t find in our design studio —  
**Panic Button. Hierarchical Slavery. Unethical Credit-Takers. Deliberate Soldiers. Irresponsible Designers… (Did we mention PANIC BUTTON?)**

We thrive at the intersection of creativity and strategy — the sweet spot where great design, storytelling, and functionality meet. Whether it’s elevating brands through powerful brand building, crafting identities as a packaging design agency, designing seamless experiences through web designing, or exploring the future of engagement through mobile game development — we bring purpose, play, and precision into everything we create.

Because for us, **“madness” isn’t chaos — it’s our method.**

      `}
            />
          </div>

          <div className=" flex-grow hidden md:flex sticky top-[100px]  rounded-lg overflow-hidden  justify-center items-center">
            <img className="rounded" src="/assets_main/about1.jpeg" />
          </div>
        </div>
        <LogoMarquee />
        <HomeTestimonial
          style={{
            paddingBottom: "0px",
            backgroundImage:
              "url(../img/home1/testimonial-bg.png), linear-gradient(180deg, #000 0%, #000 100%)",
          }}
        />
        <Home1Blog />
      </div>
    </>
  );
}

export default Page;
