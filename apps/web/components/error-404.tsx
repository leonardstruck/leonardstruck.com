import Link from "next/link";
import { useTranslations } from "next-intl";
import Prose from "./prose";

export default function Error404(): React.ReactNode {
    const t = useTranslations("errors.404");
    return (
        <Prose>
            <h1>404: {t("message")}</h1>
            <h2>{t("description")}</h2>
            <Link href="/">{t("go_back")}</Link>
        </Prose>
    )
}