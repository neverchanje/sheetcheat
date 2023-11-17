'use client'

import { useEffect, useRef, useState } from "react";
import { MultiColumnLayout, Block } from "@/components/multi_column_layout";
import { parseMarkdownToSheet } from "@/utils/markdown_parser";
import Markdown from 'react-markdown'
import dynamic from "next/dynamic";
import Config, { getPageSize } from "@/config";

// Dynamically import the 'NavBar' function without server-side rendering
const NavBar = dynamic(
  () => import('@/components/navbar'),
  { ssr: false }
);

export default function Home() {
  const sheetRef = useRef<HTMLDivElement>(null);

  const [pageSize, setPageSize] = useState(Config.pageSizes.A4);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    const filePath = '/examples/flink.md';
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        setFileContent(data);
      })
      .catch((error) => {
        console.error('Error loading file:', error);
      });
  }, []);

  if (!fileContent) {
    return <></>
  }
  const sheet = parseMarkdownToSheet(fileContent);
  sheet.validate();

  return <div>
    <NavBar
      sheetRef={sheetRef}
      setPageSize={(ps) => { setPageSize(getPageSize(ps)); }} />

    {/** Cheatsheet Editor */}
    {/** OUTER FRAME */}
    <div className='flex justify-center'>
      <div className='m-2 border border-solid border-black' ref={sheetRef} style={{
        maxWidth: pageSize.width,
        maxHeight: pageSize.height,
        overflow: 'auto',
      }}>
        {/*** INNER FRAME ***/}
        <MultiColumnLayout columnNumber={2} className='cheatsheet-editor p-6 gap-x-6' style={{
          width: pageSize.width,
          height: pageSize.height,
        }}>
          {/*** CONTENT ***/}

          {/** Cheatsheet Header */}
          <Block className="pb-4" columnIndex={1}>
            <div className="pb-4 prose"><h1>{sheet.title.trim()}</h1></div>
            <Markdown className="prose">{sheet.markdown.trim()}</Markdown>
          </Block>

          {/** Cheatsheet Blocks */}
          {sheet.blocks.map((block, blockIdx) => {
            return <Block key={blockIdx} className='pb-2' columnIndex={block.columnIndex}>
              <div className="prose pb-2"><h2>{block.title.trim()}</h2></div>
              {block.elements.map((element, elementIdx) => {
                {/** Cheatsheet Elements */ }
                return <div key={elementIdx} className='pb-2'>
                  <div className="prose pb-1"><h3>{element.title.trim()}</h3></div>
                  <Markdown className="prose prose-sm">{element.markdown.trim()}</Markdown>
                </div>
              })}
            </Block>;
          })}
        </MultiColumnLayout>
      </div>
    </div>

  </div>
}
