"use client";

import { useQuery } from "@tanstack/react-query";
import type { IHeroWithImageBlock } from "cms/src/payload-types";
import Image from "next/image";
import { HeroWithImage } from "ui";
import resolveImage from "@/actions/resolve-image";
import { imageQueryKey } from "@/lib/query-keys";

interface HeroWithImageProps {
    block: IHeroWithImageBlock;
}

type Image = Exclude<IHeroWithImageBlock["image"], number>;

function AsImage(props: { image: Image }): JSX.Element {
    const imageData = props.image.sizes?.large;

    if (!imageData?.url || !imageData.width || !imageData.height) {
        throw new Error("Not hydrated");
    }

    return <Image alt={props.image.alt ?? ""} height={imageData.height} src={imageData.url} width={imageData.width} {...props} />;
}

export function HeroWithImageBlock({ block }: HeroWithImageProps): React.ReactNode {
    const { data: res, isLoading } = useQuery({
        queryKey: imageQueryKey(block.image),
        queryFn: async () => resolveImage(block.image),
    })

    if (isLoading || !res?.data) {
        return null;
    }

    const image = res.data;

    if (!image.sizes?.large?.url) {
        return null;
    }

    return (
        <HeroWithImage
            asImage={(props) => AsImage({ image, ...props })}
            imageAlt={image.alt ?? ""}
            imageSrc={image.sizes.large.url}
            title={block.title} />
    );
}