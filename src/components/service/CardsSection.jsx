import React from "react";
import MeteorCard from "@/components/global/cards/MetiorCard";

function CardsSection({ data }) {
  return (
    <>
      {!!data && (
        <div className="container style-2 pb-5">
          <div className="flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-3xl">{data?.title}</h3>
              <p className="text-sm">{data?.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center ">
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
