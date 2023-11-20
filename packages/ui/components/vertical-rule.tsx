import { cn } from "../cn";

interface VerticalRuleProps {
    className?: string;
}

export function VerticalRule({ className }: VerticalRuleProps): JSX.Element {
    return (
        <div className={cn("w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-800", className)} />
    )
}