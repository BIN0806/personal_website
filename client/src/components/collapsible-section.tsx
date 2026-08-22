import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type CollapsibleSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  isInView?: boolean;
  delay?: number;
  defaultOpen?: boolean;
  testId?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export default function CollapsibleSection({
  id,
  title,
  children,
  isInView = true,
  delay = 0,
  defaultOpen = false,
  testId,
  className = "",
  triggerClassName = "",
  contentClassName = "",
}: CollapsibleSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={`mt-24 lg:mt-32 ${className}`}
    >
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger
          className={`group w-full flex items-center justify-center gap-3 mb-10 ${triggerClassName}`}
          data-testid={testId ?? `${id}-toggle`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground transition-colors group-data-[state=open]:text-[var(--vintage-accent)]">
            {title}
          </h2>
          <ChevronDown className="w-6 h-6 text-muted-foreground transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--vintage-accent)]" />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={`overflow-hidden data-[state=open]:overflow-visible data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${contentClassName}`}
        >
          <div className="pt-4 pb-3 px-1">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
