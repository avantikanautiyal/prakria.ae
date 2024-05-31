import React from "react";
import MeteorCard from "@/components/global/cards/MetiorCard";

function CardsSection({ data }) {
  return (
    <>
      {!!data && (
        <div className="footer-section style-2 px-4 py-7">
          <div className="container p-4 flex flex-col items-center justify-center">
            <div className="text-center max-w-[850px!important]">
              <h3 className="text-3xl">{data?.title}</h3>
              <p className="text-sm">{data?.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center  p-4">
              {data?.cards.map((card, index) => (
                <MeteorCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardsSection;
