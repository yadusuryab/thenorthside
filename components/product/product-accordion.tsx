"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccordionItem {
  title: string;
  content: string;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

const ProductAccordion = ({ items }: ProductAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-[#e0e0e0]">
      {items.map((item, index) => (
        <div key={index} className="border-b border-[#e0e0e0]">
          <Button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center py-6 px-0 text-[#111111] hover:no-underline font-light uppercase tracking-wide text-sm"
            variant="ghost"
          >
            {item.title}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </Button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-6 text-sm text-[#666666] leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;