import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center px-8 py-4 font-bold rounded-sm uppercase tracking-wide font-mono transition-all duration-200 outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ocean-950 disabled:opacity-50 disabled:pointer-events-none",

                    // Primary: Neon
                    variant === "primary" &&
                    "bg-neon text-ocean-950 border-2 border-neon shadow-[0px_0px_20px_rgba(163,230,53,0.3)] hover:bg-neon-hover hover:shadow-[0px_0px_30px_rgba(163,230,53,0.5)] active:translate-y-0.5",

                    // Secondary: Outline
                    variant === "secondary" &&
                    "bg-transparent text-neon border-2 border-neon/30 hover:border-neon hover:bg-neon/10",

                    // Ghost: Text only
                    variant === "ghost" &&
                    "bg-transparent text-gray-400 hover:text-neon hover:bg-white/5",

                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
