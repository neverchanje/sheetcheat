import assert from "assert";
import React, { ReactElement } from "react";
import { CSSProperties, ReactNode } from "react";

function flattenChildren(children: ReactNode[]): ReactElement[] {
    if (!Array.isArray(children)) {
        return [children];
    }

    const flatChildren: ReactElement[] = [];

    children.forEach(child => {
        if (React.isValidElement(child)) {
            flatChildren.push(child);
        } else if (Array.isArray(child)) {
            flatChildren.push(...flattenChildren(child));
        }
    });

    return flatChildren;
}

function splitChildren(children: ReactElement[], cols: number): BlockElement[][] {
    const columnArrays: BlockElement[][] = Array.from({ length: cols }, () => []);

    children.forEach((child, _index) => {
        if (child.type !== Block) {
            throw new Error("Invalid child type: " + child.type);
        }

        const columnIndex = child.props.columnIndex - 1;
        columnArrays[columnIndex].push(child as BlockElement);
    });

    // Flatten the columnArrays to get the final array with columns in round-robin order
    return columnArrays;
}

interface BlockProps {
    children: ReactNode[];
    className?: string;
    style?: CSSProperties;
    columnIndex: number;
}

export const Block: React.FC<BlockProps> = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
};

type BlockElement = React.ReactElement<BlockProps, typeof Block>;

// TODO: Support Section (a full-width region that can be further divided into multiple blocks). 
// The hierachy is: Cheatsheet -> Section -> Block -> Element. The default section number is 1 if not specified.

export const MultiColumnLayout: React.FC<{
    children: ReactNode[],
    className?: string,
    style?: CSSProperties,
    columnNumber: number
}> = ({ children, className, style, columnNumber }) => {
    if (columnNumber < 1 || columnNumber > 12) {
        // tailwind supports at maximum 12 columns.
        throw new Error("Invalid column number: " + columnNumber)
    }

    let flatChildren = flattenChildren(children);
    let splittedChildren = splitChildren(flatChildren, columnNumber);
    assert(splittedChildren.length === columnNumber);

    return (
        <div className={`grid grid-cols-${columnNumber} ${className}`} style={style}>
            {splittedChildren.map((e, index) => <div key={index}>{e}</div>)}
        </div>
    );
};
