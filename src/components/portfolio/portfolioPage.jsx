import React from 'react'
import HeroSectionPortfolio from './heroSection'
import StorySection from './storySection'
import StartageySection from './startagySection'
import ExecutionSection from './executionSection'
import ResultSection from './resultSection'
import WhySection from './whySection'

function PortfolioPage(props) {
  
  return (
    <>
     <HeroSectionPortfolio {...props?.herosection}/>
     <StorySection {...props?.storySection}/>
     <StartageySection  {...props?.startageySection}/>
     <ExecutionSection  {...props?.executionSection}/>
     <ResultSection {...props?.resultSection}/>
     <WhySection  {...props?.whySection} />
    </>
  )
}

export default PortfolioPage