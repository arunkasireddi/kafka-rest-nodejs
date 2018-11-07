## How to use

- `git pull` from the repo.
- `npm install` to install all the required dependencies

To run the examples

- Console Producer - `node examples/console_producer.js --url localhost:8082 --topic test-topic --format avro/binary`
- Console Consumer - `node examples/console_consumer.js --url localhost:8082 --topic test-topic --format avro/binary`

## Examples

A few examples are included in the `examples/` directory:

- `metadata.js` - A simple demo of some of the metadata APIs, covering brokers,
  topics, and partitions.
- `console_producer.js` - Reads from stdin and produces each line as a message
  to a Kafka topic.
- `console_consumer.js` - Consumes a Kafka topic and writes each message to
  stdout.
- `twitter/stream_tweets.js` - Uses Twitter's API to get a realtime feed of
  tweets which it produces to a Kafka topic.
- `twitter/trending.js` - Uses the tweet data produced by the previous example
  to generate a list of trending hashtags, which it prints every 10 seconds to
  stdout.
