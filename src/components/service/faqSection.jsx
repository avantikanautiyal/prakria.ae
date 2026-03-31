import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';



function ServiceFAQSection(props) {
  return (
    <section className="mb-20 sm:mb-32">
          {/* Section Header */}

          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-4xl tracking-tight mb-6">
             {props?.title}
            </h2>
            <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed whitespace-pre-line">
             {props?.description}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="container mx-auto space-y-6">
            {props?.list?.map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className="border-[#2b2b2b]">
                  <AccordionTrigger className="text-start text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </section>
  )
}

export default ServiceFAQSection
