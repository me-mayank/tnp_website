"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  value: string | null;
  setValue: (next: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<{ value: string } | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("Accordion components must be used within Accordion");
  return context;
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error("Accordion subcomponents must be used within AccordionItem");
  return context;
}

function Accordion({
  className,
  children,
  defaultValue,
  collapsible = false,
  ...props
}: React.ComponentProps<"div"> & { type?: "single"; defaultValue?: string; collapsible?: boolean }) {
  const [value, setValue] = React.useState<string | null>(defaultValue ?? null);

  return (
    <AccordionContext.Provider
      value={{
        value,
        setValue: (next) => setValue((current) => (current === next && collapsible ? null : next)),
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const AccordionItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { value: string }>(
  ({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
      <div ref={ref} className={cn("border-b border-slate-200", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, children, onClick, ...props }, ref) => {
    const { value, setValue } = useAccordionContext();
    const { value: itemValue } = useAccordionItemContext();
    const isOpen = value === itemValue;

    return (
      <button
        ref={ref}
        type="button"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-semibold transition-colors hover:text-brand-700",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setValue(itemValue);
        }}
        {...props}
      >
        {children}
        <svg
          className={cn("h-4 w-4 shrink-0 opacity-60 transition-transform duration-200", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
        </svg>
      </button>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionContext();
    const { value: itemValue } = useAccordionItemContext();
    const isOpen = value === itemValue;

    return (
      <div ref={ref} hidden={!isOpen} className={cn("overflow-hidden text-sm", className)} {...props}>
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
