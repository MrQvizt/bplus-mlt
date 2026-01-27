import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type PagePanelProps = PropsWithChildren<{
  className?: string;
}>;

/**
 * A consistent translucent surface to keep content readable on top of the global pattern background.
 */
const PagePanel = ({ className, children }: PagePanelProps) => {
  return (
    <section
      className={cn(
        "bg-background/95 backdrop-blur-sm border border-border/60 rounded-3xl shadow-card",
        className
      )}
    >
      {children}
    </section>
  );
};

export default PagePanel;
