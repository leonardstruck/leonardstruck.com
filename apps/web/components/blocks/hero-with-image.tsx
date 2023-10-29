import type { HeroWithImage } from "cms/src/payload-types";
import Image from "next/image";
import { P, match } from "ts-pattern";
import { HeroWithImage as HeroWithImageComponent } from "ui";

interface HeroWithImageProps {
    block: HeroWithImage;
}

type Image = Exclude<HeroWithImage["image"], number>;

function AsImage(props: { image: Image }): JSX.Element {
    const imageData = props.image.sizes?.large;

    if (!imageData?.url || !imageData.width || !imageData.height) {
        throw new Error("Not hydrated");
    }

    return <Image alt={props.image.alt ?? ""} height={imageData.height} src={imageData.url} width={imageData.width} {...props} />;
}

export function HeroWithImage({ block }: HeroWithImageProps): JSX.Element {
    /* eslint-disable -- ts-pattern is not yet supported by eslint */
    const image = match(block.image)
        .with({ sizes: { large: { url: P.string } } }, (media) => media)
        .otherwise(() => {
            throw new Error("Not hydrated")
        });

    return <HeroWithImageComponent imageSrc={image.sizes.large.url} title={block.title} asImage={(props) => AsImage({ image, ...props })} />;
}