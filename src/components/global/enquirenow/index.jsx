import Link from "next/link";
import React from "react";

function EnquireBtn() {
  return (
    <Link href="/contact-us/#contactForm">
      <button
        className="primary-btn2 capitalize"
        type="submit"
        data-text="Enquire Now"
      >
        Enquire Now
      </button>
    </Link>
  );
}

export default EnquireBtn;
