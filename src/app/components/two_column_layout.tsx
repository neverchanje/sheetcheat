import assert from "assert";
import React from "react";
import { CSSProperties, ReactElement, ReactNode } from "react";

function flattenChildren(children: ReactNode[]): ReactElement[] {
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

function extractColumnIndex(element: ReactElement): number {
    // Get the className of the ReactElement
    const className = element.props.className;

    // Use a regular expression to extract the column index
    const match = className.match(/column-(\d+)/);

    if (match) {
        // Extracted column index as a string; parse it to an integer
        const columnIndex = parseInt(match[1], 10);
        return columnIndex;
    }

    throw new Error(`Invalid column index: ${className}`);
}

function splitChildren(children: ReactElement[], cols: number): ReactElement[][] {
    const columnArrays: ReactElement[][] = Array.from({ length: cols }, () => []);

    children.forEach((child, index) => {
        const columnIndex = extractColumnIndex(child) - 1;
        columnArrays[columnIndex].push(child);
    });

    // Flatten the columnArrays to get the final array with columns in round-robin order
    return columnArrays;
}


// TODO: Support Section (a full-width region that can be further divided into multiple blocks). 
// The hierachy is: Cheatsheet -> Section -> Block -> Element. The default section number is 1 if not specified.

// TODO: Support more columns in the layout.

export const TwoColumnLayout: React.FC<{
    children: ReactNode[],
    className?: string,
    style?: CSSProperties
}> = ({ children, className, style }) => {
    let children2 = splitChildren(flattenChildren(children), 2);
    assert(children2.length === 2);

    return (
        <div className={`grid grid-cols-2 ${className}`} style={style}>
            {children2.map((e, index) => <div key={index}>{e}</div>)}
        </div>
    );
};
