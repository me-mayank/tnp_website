"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface MagicTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export const MagicText: React.FC<MagicTextProps> = ({
    text,
    className,
    delay = 0,
    stagger = 0.018,
}) => {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, margin: "200px" });
    const words = text.split(" ");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: delay,
                staggerChildren: stagger,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 3 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    };

    return (
        <motion.p
            ref={container}
            className={cn(
                className,
                "leading-relaxed text-justify [text-align:justify] [text-align-last:left] [text-justify:inter-word]"
            )}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-pre">
                    <motion.span variants={wordVariants} className="inline-block">
                        {word}
                    </motion.span>
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </motion.p>
    );
};
