import { cn } from "../cn";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps): JSX.Element {
    return (
        <div className={cn("bg-neutral-900 rounded-xl shadow-lg p-8", className)}>
            {children}
        </div>
    );
}