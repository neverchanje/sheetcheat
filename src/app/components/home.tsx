'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { MultiColumnLayout, Block } from "@/components/multi_column_layout";
import { Sheet, parseMarkdownToSheet } from "@/utils/markdown_parser";
import { PageSize, PageSizeStates as PageSizeConfig } from "@/config";
import dynamic from "next/dynamic";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import MarkdownWithHighlight from "./markdown_with_highlight";

// Dynamically import the 'NavBar' function without server-side rendering
const NavBar = dynamic(
  () => import('@/components/navbar'),
  { ssr: false }
);

function Home() {
  // The sheetRef will be used to export to PNG.
  const sheetRef = useRef<HTMLDivElement>(null);

  const [markdown, setMarkdown] = useState('');
  const pageSizeCfg = useMemo(() => new PageSizeConfig(), []);
  const [pageSize, setPageSize] = useState<PageSize>(pageSizeCfg.determinePageSize());

  // Effect to update localStorage when state changes
  useEffect(() => {
    pageSizeCfg.saveToLocal()
  }, [pageSizeCfg, pageSizeCfg.layoutType, pageSizeCfg.pageSizeType]);

  const navbar = (
    <NavBar
      sheetRef={sheetRef}
      setPageSizeType={(t) => {
        pageSizeCfg.updatePageSizeType(t);
        setPageSize(pageSizeCfg.determinePageSize());
      }}
      setLayoutType={(t) => {
        pageSizeCfg.updateLayoutType(t);
        setPageSize(pageSizeCfg.determinePageSize());
      }}
      setMarkdown={setMarkdown}
    />
  );

  if (!markdown) {
    return <div>{navbar}</div>
  }

  let sheet: Sheet;
  try {
    sheet = parseMarkdownToSheet(markdown);
    sheet.validate();
  } catch (e) {
    alert(e);
    return (
      <div>{navbar}</div>
    )
  }

  const innerSheet = (
    <MultiColumnLayout columnNumber={2} className='cheatsheet-editor p-6 gap-x-6' >
      {/*** CONTENT ***/}

      {/** Cheatsheet Header */}
      <Block className="pb-4" columnIndex={1}>
        <div className="pb-4 prose"><h1>{sheet.title.trim()}</h1></div>
        <MarkdownWithHighlight className="prose">{sheet.markdown.trim()}</MarkdownWithHighlight>
      </Block>

      {/** Cheatsheet Blocks */}
      {
        sheet.blocks.map((block, blockIdx) => {
          return <Block key={blockIdx} className='pb-2' columnIndex={block.columnIndex}>
            <div className="prose pb-2"><h2>{block.title.trim()}</h2></div>
            {block.elements.map((element, elementIdx) => {
              {/** Cheatsheet Elements */ }
              return <div key={elementIdx} className='pb-2'>
                <div className="prose pb-1"><h3>{element.title.trim()}</h3></div>
                <MarkdownWithHighlight className="prose prose-sm">{element.markdown.trim()}</MarkdownWithHighlight>
              </div>
            })}
          </Block>;
        })
      }
    </MultiColumnLayout>
  );

  return <div>
    {navbar}

    {/** Cheatsheet Editor */}
    {/** OUTER FRAME */}
    <div className='flex justify-center'>

      <QuickPinchZoom onUpdate={({ x, y, scale }) => {
        if (sheetRef.current) {
          sheetRef.current.style.transform = make3dTransformValue({ x, y, scale });
        }
      }}>
        <div className='border border-solid border-black shadow-lg' ref={sheetRef} style={{
          width: pageSize.width,
          height: pageSize.height,
          minWidth: pageSize.width,
          minHeight: pageSize.height,
          overflow: 'hidden',
        }}>
          {innerSheet}
        </div>
      </QuickPinchZoom>

    </div>
  </div>
}

export default Home;
