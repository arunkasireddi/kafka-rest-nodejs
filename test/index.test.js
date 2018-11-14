const expect = require('expect');
const request = require('supertest');

const { app } = require('./../index');

describe('POST /message', () => {
  it('Posts a new binary message to topic', done => {
    var topicMessage = {
      topic: 'test-topic',
      format: 'binary',
      message: 'hello world'
    };
    request(app)
      .post('/produce')
      .send(topicMessage)
      .end(function(err, res) {
        if (err) done(err);
        expect(res.status).toBe(200);
        expect(res.text).toBe('Message Sent');
        done();
      });
  });
});
