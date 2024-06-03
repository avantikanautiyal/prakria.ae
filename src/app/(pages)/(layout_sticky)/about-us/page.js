import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import HomeTestimonial from "@/components/home/ClientTestimonial";
import LogoMarquee from "@/components/home/InfiniteCarosal";

function Page() {
  return (
    <div className="pt-10">
      <div className="p-4 flex gap-4 container">
        <div>
          <span className="sub-title5 two">
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
          </span>
          <MDXRemote
            source={`

        # About PRAKRIA

We love madness at work. A well-planned and controlled madness that we’ve perfected over 2 decades. And for all the madness that goes inside creating a well-thought-of campaign or a creative, we still retain the composure by pondering over this Spiderman-thought-tweaked-as-per-us:

##### “With Great design responsibility comes greater ‘Deliver on time’ responsibilities”

We are big enough to incubate some of the most innovative ideas and small enough to service them personally to our clients. We can go all berserk thinking out of the box for extra creative projects and come back faster than Bolt’s sprint for deadline oriented ones.

#### There are things which we always look up to and believe in them-

 Clients, Brainstorming, Design Aesthetics, Commitments, Coffee (why not?)

#### Then there are things which you won’t find in our Design Studio-

 Panic Button, Hierarchal Slavery, Unethical Credit-takers, Deliberate Soldiers, Irresponsible Designers… (Did we mention PANIC BUTTON?)


      `}
          />
        </div>

        <div className="hidden md:block sticky top-[86px]  rounded-lg overflow-hidden h-fit">
          <img src="/assets_main/about1.jpeg" />
        </div>
      </div>
      <LogoMarquee />
      <HomeTestimonial />
    </div>
  );
}

export default Page;
