import Link from 'next/link'
import React from 'react'

function Whatsapp() {
  // Encode the default message for the WhatsApp URL
  const defaultMessage = encodeURIComponent(
    "Hi team PRAKRIA, I wish to enquire about my Website Development requirement."
  );
  const whatsappUrl = `https://wa.me/+919810810034?text=${defaultMessage}`;

  return (
    <div id="whatsappp">
      <Link target='_blank' href={whatsappUrl}>
        <img src="/images/whatsapp.png" alt="WhatsApp" />
      </Link>
    </div>
  );
}

export default Whatsapp