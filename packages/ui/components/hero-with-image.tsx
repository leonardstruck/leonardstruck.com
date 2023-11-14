import { cn } from "../cn";

interface HeroWithImageProps {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    asImage?: (props: { src: string, alt?: string }) => React.ReactNode;
}

export function HeroWithImage({ title, imageSrc, imageAlt, asImage }: HeroWithImageProps): React.ReactNode {
    const Image = asImage || "img";
    return (
        <div className="grid grid-cols-6 grid-rows-4 items-center">
            <Image alt={imageAlt} className={cn(
                "col-span-5 col-start-2 row-span-4 row-start-1",
                "lg:col-span-4 lg:col-start-3",
                "rounded-xl"
            )} src={imageSrc} />
            <h1 className={cn(
                "font-mono font-black mix-blend-exclusion",
                "text-6xl md:text-8xl lg:text-9xl",
                "col-span-full row-span-2 row-start-3"
            )}>{title}</h1>
        </div >
    )
};


