import Error404 from "@/components/error-404";
import RootLayout from "./[locale]/layout";

export default function NotFound(): React.ReactNode {
    return (
        <RootLayout params={{ locale: "en" }}>
            <Error404 />
        </RootLayout>
    )
}