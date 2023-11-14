'use client'

import Markdown from 'react-markdown'
import { TwoColumnLayout } from './components/two_column_layout';

interface ElementContent {
  icon?: string,
  title: string,
  description: string,
  longDescription?: string,
  officialDocLink?: string,
}

interface BlockContent {
  title: string,
  elements: ElementContent[]
  customStyles?: string,

  /// The column index of the block.
  /// If there are 3 columns, the index should range from 1 to 3.
  columnIndex: number,
}

interface CheatsheetContent {
  title: string,
  // Cheatsheet description in markdown.
  description: string,
  blocks: BlockContent[]
}

export default function Home() {
  const pageSize = {
    width: '210mm',
    height: '297mm',
  };
  const content: CheatsheetContent = {
    title: 'FlinkSQL Cheatsheet',
    description: `
**FlinkSQL** is an SQL engine built on top of **Apache Flink**, enabling standard SQL queries on batch and streaming data.
It supports full ANSI SQL, continuous queries, and real-time analytics. FlinkSQL brings easy SQL support to Flink applications without compromising performance.
`,
    blocks: [
      {
        title: 'Data Definition Language (DDL)',
        columnIndex: 2,
        elements: [
          {
            title: 'Create a MySQL source',
            description: `
\`\`\`sql
CREATE TABLE my_flink_table (
  id INT,
  name STRING,
  age INT,
  PRIMARY KEY (id) NOT ENFORCED
) WITH (
  'connector' = 'jdbc',
  'url' = 'jdbc:mysql://[hostname]:[port]/[database]',
  'table-name' = 'my_mysql_table',
  'username' = '[username]',
  'password' = '[password]',
  'driver' = 'com.mysql.jdbc.Driver'
);
\`\`\`
`
          },
          {
            title: 'Create a Debezium Avro source',
            description: `
\`\`\`sql
WITH (
  'connector' = 'kafka',
  'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
  'format' = 'debezium-avro',
  'debezium-avro-confluent.url' = 'http://your-schema-registry:8081',
)
\`\`\`
`},
          {
            title: 'Create a Protobuf source',
            description: `
\`\`\`sql
WITH (
  'connector' = 'kafka',
  'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
  'format' = 'protobuf',
  'protobuf.class-name' = 'com.yourcompany.YourProtobufMessage'
);
\`\`\`
`},
          {
            title: 'Create a table with a watermark column',
            description: `
Watermark marks a specific point in a data stream, ensuring that all events up to that point have been received.
\`\`\`sql
CREATE TABLE MyEventTable (
  eventTime TIMESTAMP,
  eventValue INT,
  WATERMARK FOR eventTime AS eventTime - INTERVAL '5' SECOND
)
\`\`\`
`},
          {
            title: 'Add a column to a table',
            description: `
\`\`\`sql
ALTER TABLE MyEventTable ADD COLUMN newField INT;
\`\`\`
`},
        ]
      },
      {
        title: 'Queries',
        columnIndex: 1,
        elements: [
          {
            title: 'OVER window clause',
            description: `
\`\`\`sql
SELECT orderId, orderDate, orderAmount, SUM(orderAmount) OVER (
  PARTITION BY customerId ORDER BY orderDate
  ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
) AS rollingSum FROM orders; 
\`\`\`
`
          }
        ]
      },
    ]
  };


  return <div>

    {/** Cheatsheet Editor */}
    {/** OUTER FRAME */}
    <div className='flex justify-center'>
      <div className='m-2 border border-solid border-black' style={{
        maxWidth: pageSize.width,
        maxHeight: pageSize.height,
        overflow: 'auto',
      }}>
        {/*** INNER FRAME ***/}
        <TwoColumnLayout className='cheatsheet-editor p-6 gap-x-6' style={{
          width: pageSize.width,
          height: pageSize.height,
        }}>
          {/*** CONTENT ***/}

          {/** Cheatsheet Header */}
          <div className="column-1 pb-4">
            <div className="pb-4 prose"><h1>{content.title.trim()}</h1></div>
            <Markdown className="prose">{content.description.trim()}</Markdown>
          </div>

          {/** Cheatsheet Blocks */}
          {content.blocks.map((block, blockIdx) => {
            return <div key={blockIdx} className={`pb-2 column-${block.columnIndex}`}>
              <div className="prose pb-2"><h2>{block.title.trim()}</h2></div>
              {block.elements.map((element, elementIdx) => {
                {/** Cheatsheet Elements */ }
                return <div key={elementIdx} className='pb-2'>
                  <div className="prose pb-1"><h3>{element.title.trim()}</h3></div>
                  <Markdown className="prose prose-sm">{element.description.trim()}</Markdown>
                </div>
              })}
            </div>;
          })}
        </TwoColumnLayout>
      </div>
    </div>

  </div>
}
