import Tracking from "@/components/tracking";

export default function Layout({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <>
            {children}
            <Tracking />
        </>
    )
}