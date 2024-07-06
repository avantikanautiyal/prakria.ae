import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import data_service from "@/data/data_service.json";

export function Faq({ data }) {
  //   const data = data_service["/digital-marketing"];
  return (
    <div className="container">
      <div class="text-center">
        <h2>Frequently Asked Questions</h2>
      </div>
      {data?.map((data, index) => {
        return (
          <Accordion key="index" type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start text-lg">{data.ques}</AccordionTrigger>
              <AccordionContent>{data.ans}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
