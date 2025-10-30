import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';


const faqData = [
    {
      question:
        "What makes PRAKRIA different from other digital marketing agencies?",
      answer:
        "We execute a combination of more than 20 years of creative work with data-driven implementation. Contrary to many PPC or SEO companies, we do not treat each digital marketing aspect as an independent one but rather create an integrated strategy that fits your brand.",
    },
    {
      question: "How long does it take to see results from SEO?",
      answer:
        "SEO is a long-term strategy, and results typically start appearing within 3-6 months, with significant improvements often seen after 6-12 months. Factors like competition, current website health, and industry play a role.",
    },
    {
      question: "Is PPC marketing expensive?",
      answer:
        "PPC costs vary widely based on industry, keywords, and competition. However, it offers immediate visibility and measurable ROI, allowing for precise budget control and optimization to ensure cost-effectiveness.",
    },
    {
      question: "Can social media really help my business?",
      answer:
        "Absolutely! Social media is crucial for brand awareness, customer engagement, lead generation, and driving traffic to your website. A well-executed social media strategy can significantly boost your brand's online presence and sales.",
    },
  ];
function ServiceFAQSection(props) {
  return (
    <section className="mb-20 sm:mb-32">
          {/* Section Header */}

          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
             {props?.title}
            </h2>
            <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
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
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </section>
  )
}

export default ServiceFAQSection