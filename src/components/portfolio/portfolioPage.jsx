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
      {props?.herosection && <HeroSectionPortfolio {...props.herosection} />}
      {props?.storySection && <StorySection {...props.storySection} />}
      {props?.challenge && (
        <ResultSection  {...props.challenge} />
      )}
      {props?.startageySection && <StartageySection  {...props.startageySection} />}
      {props?.executionSection && <ExecutionSection  {...props.executionSection} />}
      {props?.resultSection && <ResultSection {...props.resultSection} />}
      {props?.whySection && <WhySection  {...props.whySection} />}
    </>
  )
}

export default PortfolioPage