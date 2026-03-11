"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ComingSoonButtonProps = {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    popoverClassName?: string;
};

export function ComingSoonButton({
    children,
    className,
    containerClassName,
    popoverClassName,
}: ComingSoonButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const timer = window.setTimeout(() => setIsOpen(false), 2200);
        return () => window.clearTimeout(timer);
    }, [isOpen]);

    return (
        <div className={cn("relative inline-flex", containerClassName)}>
            <button type="button" onClick={() => setIsOpen(true)} className={className}>
                {children}
            </button>
            {isOpen ? (
                <div
                    className={cn(
                        "pointer-events-none absolute left-0 top-full mt-2 whitespace-nowrap rounded-md border border-neon/30 bg-ocean-900/95 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-neon shadow-lg",
                        popoverClassName
                    )}
                >
                    Coming soon.
                </div>
            ) : null}
        </div>
    );
}
