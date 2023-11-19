import { LegacyRef } from "react";
import Markdown from "react-markdown"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function MarkdownWithHighlight(props: {
    className?: string,
    children: string | null | undefined
}) {
    a11yLight.hljs.padding = 0;
    a11yLight.hljs.backgroundColor = 'rgba(0, 0, 0, 0)'; // fully transparent
    return (
        <Markdown
            className={props.className}
            components={{
                code(codeProps) {
                    const { children, className, node, ...rest } = codeProps
                    const match = /language-(\w+)/.exec(className || '')
                    const legacyRef = node as LegacyRef<SyntaxHighlighter> | undefined;
                    return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            language={match[1]}
                            ref={legacyRef}
                            style={a11yLight}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
        >
            {props.children}
        </Markdown>
    )
}

export default MarkdownWithHighlight;
