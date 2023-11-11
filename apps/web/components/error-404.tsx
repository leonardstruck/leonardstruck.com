import Link from "next/link";
import Prose from "./prose";

export default function Error404(): React.ReactNode {
    return (
        <Prose>
            <h1>404: Resource not found.</h1>
            <h2>I apologize for the inconvenience. The page you are trying to access does not exist or has been moved.</h2>
            <Link href="/">Return to home</Link>
        </Prose>
    )
}