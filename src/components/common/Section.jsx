import { cn } from "@/utils/cn";
import Container from "./Container";

/**
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {string} [props.containerClassName]
 * @param {React.ReactNode} props.children
 */
export default function Section({ id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
