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
  'connector' = 'jdbc',
  'url' = 'jdbc:mysql://[hostname]:[port]/[database]',
  'table-name' = 'my_mysql_table',
  'username' = '[username]',
  'password' = '[password]',
  'driver' = 'com.mysql.jdbc.Driver'
);
```

### Create a Debezium Avro source

```sql
WITH (
  'connector' = 'kafka',
  'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
  'format' = 'debezium-avro',
  'debezium-avro-confluent.url' = 'http://your-schema-registry:8081',
)
```

### Create a Protobuf source

```sql
WITH (
  'connector' = 'kafka',
  'topic' = 'your_kafka_topic',
  'properties.bootstrap.servers' = 'kafka-broker:9092',
  'format' = 'protobuf',
  'protobuf.class-name' = 'com.yourcompany.YourProtobufMessage'
);
```

### Create a table with a watermark column

Watermark marks a specific point in a data stream, ensuring that all events up to that point have been received.

```sql
CREATE TABLE MyEventTable (
  eventTime TIMESTAMP,
  eventValue INT,
  WATERMARK FOR eventTime AS eventTime - INTERVAL '5' SECOND
)
```

### Add a column to a table

```sql
ALTER TABLE MyEventTable ADD COLUMN newField INT;
```

## Queries
{column-index=2}

### OVER window clause

```sql
SELECT orderId, orderDate, orderAmount, SUM(orderAmount) OVER (
  PARTITION BY customerId ORDER BY orderDate
  ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
) AS rollingSum FROM orders; 
```
