import { cn } from "../cn";

export interface NavigationLink {
    href: string;
    label: string;
    active?: boolean;
    external?: boolean;
};

interface NavigationProps {
    links: NavigationLink[];
    asAnchor?: (props: { href: string; children: React.ReactNode, link?: NavigationLink }) => JSX.Element;
};


export function Navigation({ links, asAnchor }: NavigationProps): JSX.Element {
    const Anchor = asAnchor || "a";

    return (
        <div className="w-full bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent before:backdrop-blur-sm before:-z-10 before:absolute before:inset-x-0 before:inset-0 before:gradient-mask-b-60 pb-5 sticky top-0">
            <nav className="container flex gap-4">
                {links.map((link) => (
                    <Anchor className={cn("py-4 font-black font-mono transition-transform", link.active ? "text-neutral-500 cursor-default" : "hover:-translate-y-0.5 hover:underline underline-offset-4 decoration-4")} href={link.href} key={link.href} link={link}>
                        {link.label}
                    </Anchor>
                ))}
            </nav>
        </div>
    );
}