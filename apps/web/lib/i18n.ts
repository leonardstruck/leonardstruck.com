import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig, unstable_setRequestLocale as setLocale } from "next-intl/server";

interface Module {
    default: AbstractIntlMessages;
}

export default getRequestConfig(async ({ locale }) => {
    const mod = await import(`../messages/${locale}.json`) as Module;
    return {
        messages: mod.default,
    }
})

export const locales = ['en', 'de'] as const;

export type Locale = typeof locales[number];

export function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

export function setRequestLocale(locale: Locale): void {
    setLocale(locale);
}