const assert = require('assert');
const axios = require('axios');
const fs = require('fs');

// Backup original methods
const originalPost = axios.post;
const originalReadFile = fs.promises.readFile;

// Set required env vars for accessToken
process.env.CLIENT_ID = 'dummy';
process.env.CLIENT_SECRET = 'dummy';
process.env.USER_NAME = 'dummy';
process.env.PASSWORD = 'dummy';
process.env.TENANT_ID = 'dummy';

// Mock axios.post to handle token and sendMail requests
axios.post = async (url, data) => {
  if (url.includes('oauth2')) {
    return { data: { access_token: 'token' } };
  }
  const error = new Error('send failed');
  error.response = { status: 500, data: 'fail', headers: {} };
  throw error;
};

// Mock fs.readFile
fs.promises.readFile = async () => Buffer.from('file');

const { sendFile } = require('../v1/src/utils/mailGraphApi');

(async () => {
  try {
    await sendFile('a@a.com', 'body', 'subject', 'dummy.txt', []);
    assert.fail('Expected sendFile to throw');
  } catch (err) {
    assert.ok(err.message.startsWith('Failed to send email'));
    console.log('Test passed');
  } finally {
    axios.post = originalPost;
    fs.promises.readFile = originalReadFile;
  }
})();
