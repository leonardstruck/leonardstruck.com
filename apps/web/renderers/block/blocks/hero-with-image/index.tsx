import type { IHeroWithImageBlock } from "cms/src/payload-types";
import dynamic from "next/dynamic";
import { imageQueryKey } from "@/lib/query-keys";
import resolveImage from "@/actions/resolve-image";
import type { BlockInterface } from "../../types";

const ClientComponent = dynamic(() => import("./client"));

const HeroWithImageBlock: BlockInterface<IHeroWithImageBlock> = {
    render: (block, key) => <ClientComponent block={block} key={key} />,
    prefetch: (props, queryClient) => {
        return queryClient.prefetchQuery({
            queryKey: imageQueryKey(props.image),
            queryFn: () => resolveImage(props.image),
        })
    }
}

export default HeroWithImageBlock;