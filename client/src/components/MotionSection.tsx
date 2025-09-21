import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";
import { stagger } from "./motionPresets";

export default function MotionSection({ children, className="" }: PropsWithChildren<{className?: string}>) {
  const reduce = useReducedMotion();
  if (reduce) return <section className={className}>{children}</section>;
  return (
    <motion.section
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
}