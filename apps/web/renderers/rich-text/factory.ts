import type { QueryClient } from "@tanstack/react-query";
import type { NodeInterface, BaseNode, NodeType } from "./types";

export class NodeRendererFactory {
    private nodeTypes = new Map<NodeType, NodeInterface<BaseNode>>();

    public registerNode<TProps extends BaseNode>(nodeType: NodeType, node: NodeInterface<TProps>): void {
        this.nodeTypes.set(nodeType, node as NodeInterface<BaseNode>);
    }

    public getNode(nodeType: NodeType): NodeInterface<BaseNode> {
        const node = this.nodeTypes.get(nodeType);
        if (!node) {
            throw new Error(`Node with type ${nodeType} not found`);
        }

        return node;
    }

    public renderNode(nodeType: NodeType, props: BaseNode, key?: React.Key): React.ReactNode {
        const node = this.getNode(nodeType);
        return node.render(props, key);
    }

    public async prefetchNode(nodeType: NodeType, props: BaseNode, queryClient: QueryClient): Promise<void> {
        const node = this.getNode(nodeType);

        // if a node has children, per default we prefetch them
        if (props.children) {
            if (Array.isArray(props.children)) {
                const children = props.children as BaseNode[];
                await Promise.all(children.map(child => this.prefetchNode(child.type, child, queryClient)));
            }
        }

        return node.prefetch?.(props, queryClient) ?? Promise.resolve();
    }
}