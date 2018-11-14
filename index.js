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
module.exports = Client;

const express = require('express');
const app = express();
var KafkaRest = require('.');
var api_url = 'http://ip-10-142-29-65.li.latam:8082';
var kafka = new KafkaRest({ url: api_url });

app.post('/produce', (req, res) => {
  var topicName = req.body.topic;
  if (!topicName) {
    res.status(400).send('No topic provided in the request');
  }
  if (req.body.format != 'binary' && req.body.format != 'avro') {
    res
      .status(400)
      .send('Format is requried, Invalid format: ' + req.body.format);
  }
  var target = kafka.topic(topicName);
});
