'use client'

import { useState } from 'react';
import CheatsheetForm from './components/cheatsheet_form';
import NavBar from './components/navbar';
import Markdown from 'react-markdown'

// TODO: Provide a toolbox for customizing the theme.
const theme = {
  blockStyles: '',
  blockTitleStyles: '',
  blockContentStyles: '',

  // The cheatsheet header.
  cheatsheetTitleStyles: '',
  cheatsheetDescriptionStyles: '',
  cheatsheetHeaderStyles: '',
}

interface ElementContent {
  icon?: string,
  name: string,
  description: string,
  longDescription?: string,
  officialDocLink?: string,
}

interface BlockContent {
  title: string,
  elements: ElementContent[]
  customStyles?: string,
}

interface CheatsheetContent {
  title: string,
  // Cheatsheet description in markdown.
  description: string,
  blocks: BlockContent[]
}

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(true);

  const [content, setContent] = useState<CheatsheetContent>({
    title: '# Arrow',
    description: `
Apache Arrow is a multi-language toolbox for accelerated data interchange and processing. It specifies a standardized language-independent column-based memory format for flat and hierarchical data, organized for efficient analytic operations on modern hardware.

The **arrow** R package provides access to the Arrow C++ library from
R, and supplies an interface with **dplyr** and other familiar R functions.
`,
    blocks: [{
      title: 'Arrow Data Structures',
      elements: [{
        name: 'Arrow Array',
        description: 'array([1, 2, 3])',
      }, {
        name: 'Arrow ChunkedArray',
        description: 'chunked_array([1, 2, 3])',
      }, {
        name: 'Arrow RecordBatch',
        description: 'record_batch([1, 2, 3])',
      }, {
        name: 'Arrow Table',
        description: 'table([1, 2, 3])',
      }, {
        name: 'Arrow Schema',
        description: 'schema([1, 2, 3])',
      }]
    }]
  });

  return <div>
    <NavBar />

    {/** Form to create a new cheatsheet. Once submitted, it switches to the designer view. */}
    {
      showCreateForm &&
      <div className='flex justify-center items-center pt-12 lg:pt-24'>
        <CheatsheetForm onSubmit={(title: string, logoImage: string) => {
          setShowCreateForm(false);
        }} />
      </div>
    }

    {/** Cheatsheet Editor */}
    <div className='flex m-2 border border-solid border-black'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 p-6'>

        {/** Cheatsheet Header */}
        <div className={`prose ${theme.cheatsheetHeaderStyles}`}>
          <Markdown className={theme.cheatsheetTitleStyles}>{content.title}</Markdown>
          <Markdown className={theme.cheatsheetDescriptionStyles}>{content.description}</Markdown>
        </div>

        {/** Cheatsheet Blocks */}
        {content.blocks.map((block, blockIdx) => {
          return <div className={theme.blockStyles} key={blockIdx}>
            <Markdown className={theme.blockTitleStyles}>{block.title}</Markdown>
            {block.elements.map((element, elementIdx) => {
              return <div key={elementIdx}>
                <Markdown>{element.name}</Markdown>
                <Markdown>{element.description}</Markdown>
              </div>
            })}
          </div>;
        })}
        <div>
        </div>

      </div>
    </div>
  </div>
}
