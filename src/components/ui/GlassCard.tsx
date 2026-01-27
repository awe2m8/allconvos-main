import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gradient?: boolean;
}

export function GlassCard({ children, className, gradient = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-ocean-900/50 backdrop-blur-md border border-white/10 rounded-sm p-6 relative overflow-hidden",
                className
            )}
            {...props}
        >
            {gradient && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
