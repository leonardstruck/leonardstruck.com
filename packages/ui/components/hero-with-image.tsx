interface HeroWithImageProps {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    asImage?: (props: { src: string, alt?: string }) => React.ReactNode;
}

export function HeroWithImage({ title, imageSrc, imageAlt, asImage }: HeroWithImageProps): React.ReactNode {
    const Image = asImage || "img";
    return (
        <div className="grid grid-cols-6 items-center">
            <h1 className="font-mono [text-wrap:balance] translate-y-3/4 sm:translate-y-1/3 lg:translate-y-0 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mix-blend-difference z-10 row-span-full col-span-4 col-start-1">{title}</h1>
            <Image alt={imageAlt} className="rounded-4xl col-start-2 md:col-start-3 lg:col-start-4 col-end-7 row-span-full" src={imageSrc} />
        </div >
    )
};


