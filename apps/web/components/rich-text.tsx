import { Serializer } from "ui";

interface RichTextProps {
    node: unknown;
}

export function RichText(_props: RichTextProps): JSX.Element {
    // const { node } = props;

    return (
        <div>
            <Serializer node={{ type: "root" }} parsers={parsers} />
        </div>
    );
}

const parsers = {};