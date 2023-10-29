interface HeroWithImageProps {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    asImage?: (props: { src: string, alt?: string }) => JSX.Element;
}

export function HeroWithImage({ title, imageSrc, imageAlt, asImage }: HeroWithImageProps): JSX.Element {
    const Image = asImage || "img";
    return (
        <div className="grid grid-cols-6 items-center">
            <h1 className="font-mono [text-wrap:balance] text-4xl md:text-7xl lg:text-9xl font-black mix-blend-difference z-10 row-span-full col-span-4 col-start-1">{title}</h1>
            <Image alt={imageAlt} className="rounded-4xl col-span-4 col-end-7 row-span-full" src={imageSrc} />
        </div >
    )
};


