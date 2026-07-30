import { cn } from "@/utils/cn";

/**
 * Consistent max-width + horizontal padding wrapper used by every
 * section, so spacing never drifts between components.
 */
export default function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
