const expect = require('expect');
const request = require('supertest');

const app = require('./../index');

describe('POST /message', () => {
  it('Posts a new message to topic', done => {
    var topicMessage = {
      topic: 'test-topic',
      format: 'avro',
      message: 'hello world'
    };
    request(app)
      .post('/produce')
      .send(topicMessage)
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe('Success');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      });
  });
});
