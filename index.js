/**
 * Copyright 2014 Confluent Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var Client = require('./lib/client');
// module.exports = Client;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;
var KafkaRest = require('.'),
  utils = require('./lib/utils');
var api_url = 'http://ip-10-142-29-65.li.latam:8082';
var kafka = new KafkaRest({ url: api_url });

app.use(bodyParser.json());

app.post('/produce', (req, res) => {
  var topicName = req.body.topic,
    message = req.body.message;

  if (utils.validateIncomingMessage(req, res)) {
    res.status(400).send(res);
    return false;
  }
  var target = kafka.topic(topicName);
  if (req.body.format == 'avro') {
    try {
      var avroMessage = JSON.parse(req.body.message);
      //TODO: produce message to Kafka here
    } catch (error) {
      res.status(500).send('Cannot parse request message. ' + error.message);
      return false;
    }
  } else if (format == 'binary') {
    target.produce(message, function() {
      console.log('Message posted to Kafka');
    });
  }
  res.status(200).send('Success');
});
app.get('/', (req, res) => {
  return res.status(200).send('Hello From Kafka Service');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
