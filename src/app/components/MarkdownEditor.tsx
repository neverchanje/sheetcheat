import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownEditor: React.FC<{
    setMarkdown: (content: string) => void,
}> = (props) => {
    let [markdown, setMarkdown] = useState('');

    // `props` updates every time when the state is updated.
    const setExternalMarkdown = props.setMarkdown;
    useEffect(() => {
        const filePath = '/examples/flink.md';
        fetch(filePath)
            .then((response) => response.text())
            .then((data) => {
                console.log('refresh useEffect')
                setMarkdown(data);
                setExternalMarkdown(data);
            })
            .catch((error) => {
                console.error('Error loading file:', error);
            });
    }, [setExternalMarkdown]);

    return (
        <div className='max-w-full' style={{ position: 'relative' }}>
            <div
                className='overflow-hidden w-full'
            >
                <SyntaxHighlighter
                    customStyle={{
                        backgroundColor: 'transparent',
                    }}
                    wrapLines
                    wrapLongLines
                    language="markdown"
                    style={solarizedlight}>
                    {markdown}
                </SyntaxHighlighter>
            </div>
            <textarea
                style={{
                    position: 'absolute',
                    color: 'transparent',
                    background: 'transparent',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                    caretColor: 'black',
                    fontSize: '1em',
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    lineHeight: 1.5,
                    tabSize: 4,
                    margin: '0.5em 0em',
                    padding: '1em',
                    resize: 'none',
                    overflow: 'hidden',
                }}
                onChange={(e) => {
                    setMarkdown(e.target.value)
                    props.setMarkdown(e.target.value)
                }}
                value={markdown}
            />
        </div>
    )
}


export default MarkdownEditor;
