import Script from "next/script";
import env from "@/lib/env";

export default function Tracking(): React.ReactNode {
    if (env.NODE_ENV === "production") {
        return (
            <Script data-domain="leonardstruck.com" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )
    }
    return null;
}