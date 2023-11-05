"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation as UINavigation } from "ui";
import type { NavigationLink } from "ui/components/navigation";

export interface NavigationProps {
    links: NavigationLink[];
}


export function Anchor(props: { href: string; children: React.ReactNode, link?: NavigationLink }): JSX.Element {
    return <Link {...props} />
}

export function Navigation({ links }: NavigationProps): JSX.Element {
    const t = useTranslations("navigation");
    const pathname = usePathname();

    const linksWithHomepage = [{
        label: t("home"),
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