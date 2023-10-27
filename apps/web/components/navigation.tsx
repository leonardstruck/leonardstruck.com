"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as UINavigation } from "ui";

export function Navigation(): JSX.Element {
    const pathname = usePathname();

    const links = [
        { text: "home", href: "/" },
        { text: "about", href: "/about" },
    ].map((link) => ({
        ...link,
        active: pathname === link.href,
    }));


    return (
        <UINavigation asAnchor={Link}
            links={links}
        />
    );
}