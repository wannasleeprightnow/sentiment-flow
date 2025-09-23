import { Accordion, AccordionItem } from "@heroui/react";

interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
  subtitle?: string;
}

interface CustomAccordionProps {
  sections: AccordionSection[];
}

function CustomAccordion({ sections }: CustomAccordionProps) {
  return (
    <Accordion>
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          aria-label={section.title}
        >
          {section.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CustomAccordion