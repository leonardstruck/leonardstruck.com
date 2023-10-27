"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as UINavigation } from "ui";
import type { NavigationLink } from "ui/components/navigation";

export interface NavigationProps {
    links: NavigationLink[];
}

export function Navigation({ links }: NavigationProps): JSX.Element {
    const pathname = usePathname();

    const activeLinks = links.map((link) => ({
        ...link,
        active: pathname === link.href,
    }));


    return (
        <UINavigation asAnchor={Link}
            links={activeLinks}
        />
    );
}