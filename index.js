'use strict';
var Client = require('./lib/client');
module.exports = Client;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
var KafkaRest = require('.'),
  utils = require('./lib/utils');
var api_url = 'http://localhost:8082'; //'http://ip-10-142-29-65.li.latam:8082';
var schema = require('./schemas/Starter_Schema.json');

app.use(bodyParser.json());

app.post('/produce', (req, res) => {
  var kafka = new KafkaRest({ url: api_url });
  var topicName = req.body.topic,
    message = req.body.message;
  // TODO: Add method to validate incoming message

  var target = kafka.topic(topicName);
  if (req.body.format == 'avro') {
    try {
      var infoValueSchema = new KafkaRest.AvroSchema(schema);
      var avroMessage = JSON.stringify(req.body.message);
      //TODO: produce message to Kafka here
      target.produce(infoValueSchema, avroMessage, handleProduceResponse);
    } catch (error) {
      res.status(500).send('Cannot parse request message. ' + error.message);
      return false;
    }
  } else if (req.body.format == 'binary') {
    target.produce(message, function() {
      console.log('Message posted to Kafka');
      res.status(200).send('Message Sent');
    });
  }
});
app.get('/', (req, res) => {
  return res.status(200).send('Hello From Kafka Service');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

function handleProduceResponse(err) {
  if (err) {
    console.log('Error producing message: ' + err);
    return 'Error producing message: ' + err;
  } else {
    return 'AVRO Message sent to topic';
  }
}
module.exports = { app };
