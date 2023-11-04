import { cn } from "ui";

interface ProseProps {
    children: React.ReactNode;
    className?: string;
}

export default function Prose({ children, className }: ProseProps): React.ReactNode {
    return <div className={cn("prose prose-invert prose-neutral prose-headings:font-mono", className)}>{children}</div>;
}