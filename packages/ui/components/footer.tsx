import { HorizontalRule } from "./horizontal-rule"
import type { NavigationLink } from "./navigation";

type FooterNavLink = Omit<NavigationLink, "active">;

interface FooterProps {
    links?: FooterNavLink[];
    asAnchor?: (props: { href: string; children: React.ReactNode, link?: NavigationLink }) => JSX.Element;
};

export function Footer({ links, asAnchor }: FooterProps): JSX.Element {
    return (
        <div className="container mt-24">
            <HorizontalRule />
            <div className="font-mono text-sm text-neutral-500 py-6 flex justify-between">
                <span>Leonard Struck</span>
                <div>
                    {links?.map((link) => {
                        const Anchor = asAnchor || "a";
                        return (
                            <Anchor className="py-4 font-black font-mono transition-transform hover:-translate-y-0.5 hover:underline underline-offset-4 decoration-4" href={link.href} key={link.href} target={link.external ? "_blank" : undefined}>
                                {link.label}
                            </Anchor>
                        );
                    })}
                </div>
            </div>
        </div>

    );
};