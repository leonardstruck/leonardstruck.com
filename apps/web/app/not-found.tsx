import Link from 'next/link'

export default function NotFound(): JSX.Element {
    return (
        <div className="prose prose-invert prose-headings:font-mono">
            <h1>404: Resource not found.</h1>
            <h2>I apologize for the inconvenience. The page you are trying to access does not exist or has been moved.</h2>
            <Link href="/">Return Home</Link>
        </div>
    )
}