import { getHomepage } from "../data/pages"

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();
    return <div>{homepage.title}</div>
}