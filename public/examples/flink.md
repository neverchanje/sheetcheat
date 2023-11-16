# FlinkSQL Cheatsheet

**FlinkSQL** is an SQL engine built on top of **Apache Flink**, enabling standard SQL queries on batch and streaming data.
It supports full ANSI SQL, continuous queries, and real-time analytics. FlinkSQL brings easy SQL support to Flink applications without compromising performance.

## Data Definition Language (DDL)
{column-index=2}

### Create a MySQL source

```sql
CREATE TABLE my_flink_table (
  id INT,
  name STRING,
  age INT,
  PRIMARY KEY (id) NOT ENFORCED
) WITH (
  'connector' = 'mysql-cdc',
  'hostname' = '[hostname]',
  'port' = '3306',
  'table-name' = '[my_table]',
  'username' = '[username]',
  'password' = '[password]',
  'database-name' = '[my_db]');
```

### Create a Debezium Avro source

```sql
WITH (
 'connector' = 'kafka',
 'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
 'format' = 'debezium-avro-confluent',
 'debezium-avro-confluent.url' = 'http://your-schema-registry:8081'
)
```

### Create a Protobuf source

```sql
WITH (
 'connector' = 'kafka',
 'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
 'format' = 'protobuf',
 'protobuf.message-class-name' = 'com.example.SimpleTest',
 'protobuf.ignore-parse-errors' = 'true'
);
```

### Create a table with a watermark column

Watermark marks a specific point in a data stream, ensuring that all events up to that point have been received.

```sql
CREATE TABLE my_event_table (
  event_time TIMESTAMP,
  event_value INT,
  WATERMARK FOR event_time AS event_time - INTERVAL '5' SECOND
)
```

### Add a column to a table

```sql
ALTER TABLE my_event_table ADD COLUMN new_field INT;
```

## SQL Syntax
{column-index=1}

### OVER Windowed Aggregation

Example: The sum of amounts of all orders for the same product that were received within one hour before the current order.

```sql
SELECT order_id, order_time, amount,
  SUM(amount) OVER (
    PARTITION BY product
    ORDER BY order_time
    RANGE BETWEEN INTERVAL '1' HOUR PRECEDING AND CURRENT ROW
  ) AS one_hour_prod_amount_sum
FROM orders
```

### Top-N Per-group

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() 
    OVER (PARTITION BY category ORDER BY sales DESC) AS row_num
  FROM shop_sales)
WHERE row_num <= 5
```

### Deduplication

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() 
    OVER (PARTITION BY b, d ORDER BY rowtime DESC) as row_num
  FROM T)
WHERE row_num = 1
```

## Time Window Function
{column-index=1}

### TUMBLE

The **TUMBLE** function is used for windowing time-series data into fixed-size, non-overlapping intervals. For example:

```sql
SELECT window_start, window_end, SUM(price)
FROM TABLE(
  TUMBLE(TABLE Bid, DESCRIPTOR(bidtime), 
  INTERVAL '10' MINUTES))
GROUP BY window_start, window_end;
```

### HOP

The **HOP** function creates sliding windows for time-series data, where windows overlap and slide at a specified interval. For example:

```sql
SELECT window_start, window_end, SUM(price)
FROM TABLE(
  HOP(TABLE Bid, DESCRIPTOR(bidtime), 
      INTERVAL '5' MINUTES, INTERVAL '10' MINUTES))
GROUP BY window_start, window_end;
```

### CUMULATE

The **CUMULATE** function aggregates data over cumulative, expanding time windows with a specified step and maximum size. For example:

```sql
SELECT window_start, window_end, SUM(price)
FROM TABLE(
  CUMULATE(TABLE Bid, DESCRIPTOR(bidtime),
  INTERVAL '2' MINUTES, INTERVAL '10' MINUTES))
GROUP BY window_start, window_end;
```

## Functions/Expressions
{column-index=2}

### JSON Access

```sql
SELECT JSON_VALUE(json_column, '$.glossary.GlossDiv.GlossList.GlossEntry.ID') AS gloss_entry_id
```

### BIGINT to UTC+8 TIMESTAMP

```sql
SELECT TO_TIMESTAMP_LTZ(your_bigint_column, 8) AS converted_timestamp
```

### Array Unnesting

The UNNEST function expands an array into multiple rows. For example:

```sql
SELECT * FROM unnest(array[1,2,3]);
---
1
2
3
```
