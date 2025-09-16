const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../src/index');

test('create meeting and retrieve transcript', async () => {
  const res = await request(app).post('/meetings');
  assert.equal(res.status, 200);
  const id = res.body.meeting_id;
  assert.ok(id);

  const transcriptRes = await request(app).get(`/meetings/${id}/transcript`);
  assert.equal(transcriptRes.status, 200);
  assert.equal(transcriptRes.body.transcript, 'Processing...');
});

test('upload file to meeting', async () => {
  const createRes = await request(app).post('/meetings');
  const id = createRes.body.meeting_id;

  const uploadRes = await request(app)
    .post(`/meetings/${id}/upload`)
    .attach('file', Buffer.from('test'), 'test.txt');
  assert.equal(uploadRes.status, 200);
  assert.equal(uploadRes.body.message, 'File received');
});
