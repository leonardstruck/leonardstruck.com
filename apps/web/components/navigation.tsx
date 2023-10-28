"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as UINavigation } from "ui";
import type { NavigationLink } from "ui/components/navigation";

export interface NavigationProps {
    links: NavigationLink[];
}


function Anchor(props: { href: string; children: React.ReactNode, link: NavigationLink }): JSX.Element {
    return <Link {...props} target={props.link.external ? "_blank" : undefined} />
}

export function Navigation({ links }: NavigationProps): JSX.Element {
    const pathname = usePathname();

    const linksWithHomepage = [{
        label: "Home",
        href: "/"
    }, ...links];

    const activeLinks = linksWithHomepage.map((link) => ({
        ...link,
        active: pathname === link.href,
    }));


    return (
        <UINavigation
            asAnchor={Anchor}
            links={activeLinks}
        />
    );
}