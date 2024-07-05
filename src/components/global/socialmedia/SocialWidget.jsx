import Link from 'next/link'
import React from 'react'

function SocialWidget() {
  return (
    <div id="socialwidget">
        <Link target='_blank' href="https://www.facebook.com/prakria/"><img src="/images/facebook.jpg" alt="facebook" /></Link>
        <Link target='_blank' href="https://www.instagram.com/prakria/"><img src="/images/instagram.jpg" alt="instagram" /></Link>
        <Link target='_blank' href="https://in.linkedin.com/company/prakriauklimited"><img src="/images/linkedin.jpg" alt="linkedin" /></Link>
    </div>
  )
}

export default SocialWidget