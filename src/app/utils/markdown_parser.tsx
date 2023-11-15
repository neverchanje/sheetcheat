import { marked } from 'marked';

export class Element {
    // ### title
    title: string;
    // content
    markdown: string;

    constructor(title: string, markdown: string) {
        this.title = title;
        this.markdown = markdown;
    }
}

export class Block {
    // ## title
    title: string;
    // Its `### title` children
    elements: Element[];
    /// The column index of the block.
    /// If there are 3 columns, the index should range from 1 to 3.
    columnIndex?: number;

    constructor(title: string, columnIndex?: number) {
        this.title = title;
        this.columnIndex = columnIndex;
        this.elements = [];
    }

    addElement(element: Element) {
        this.elements.push(element);
    }
}

export class Sheet {
    // # title
    title: string;
    // content
    markdown: string;
    // Its `## title` children.
    blocks: Block[];

    constructor(title: string, markdown: string) {
        this.title = title;
        this.markdown = markdown;
        this.blocks = [];
    }

    addBlock(block: Block) {
        this.blocks.push(block);
    }

    validate() {
        this.blocks.forEach(block => {
            if (!block.columnIndex) {
                throw new Error(`missing column-index in block '${block.title}'`);
            }
        })
    }
}

function parseAttributes(markdown: string): Array<{ key: string, value: string }> {
    // Regex pattern to match the entire attribute set
    const setPattern = /{([^}]+)}/g;
    // Regex pattern to match each key-value pair within the set
    const pairPattern = /([\w-]+)=([\w-]+)/g;

    const attributes: Array<{ key: string, value: string }> = [];

    let setMatch;
    // Find each attribute set
    while ((setMatch = setPattern.exec(markdown)) !== null) {
        let pairMatch;
        // Find each key-value pair within the set
        while ((pairMatch = pairPattern.exec(setMatch[1])) !== null) {
            attributes.push({ key: pairMatch[1], value: pairMatch[2] });
        }
    }

    return attributes;
}

function removeAttributes(text: string): string {
    // Regex pattern to match text enclosed in {}
    const pattern = /{[^}]*}/g;

    // Replace all occurrences of the pattern with an empty string
    return text.replace(pattern, '');
}

export function parseMarkdownToSheet(markdown: string): Sheet {
    const tokens = marked.lexer(markdown);
    let currentBlock: Block | null = null;
    let currentElement: Element | null = null;
    let sheet: Sheet | null = null;

    tokens.forEach(token => {
        if (token.type === 'heading') {
            switch (token.depth) {
                case 1:
                    sheet = new Sheet(token.text, '');
                    break;
                case 2:
                    if (!sheet) {
                        throw new Error('Should specify a sheet title first');
                    }
                    currentBlock = new Block(token.text);
                    sheet.addBlock(currentBlock);
                    currentElement = null;
                    break;
                case 3:
                    if (!currentBlock) {
                        throw new Error('Should specify a block title first');
                    }
                    currentElement = new Element(token.text, '');
                    currentBlock.addElement(currentElement);
                    break;
            }
        } else {
            if (currentElement) {
                currentElement.markdown += token.raw;
                console.log(token.raw)
            } else if (currentBlock) {
                // Check for column index
                const attributes = parseAttributes(token.raw);
                attributes.forEach(attribute => {
                    if (attribute.key === 'column-index' && currentBlock) {
                        currentBlock.columnIndex = parseInt(attribute.value);
                    }
                });
            } else if (sheet) {
                sheet.markdown += token.raw;
            }
        }
    });
    if (!sheet) {
        throw new Error('Invalid markdown structure');
    }
    return sheet;
}
