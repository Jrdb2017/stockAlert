const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials =  require('../../config/googleSecrets.json');
const {authUrl} = require('./auth');

// Replace with the code you received from Google
const code = '4/0AWgavdcmExR0jGRWvNsK4PmooVIEkNAmjb-AXzb6TQ-LY7PLrqj2oeF4D0gNvfvqUN2ucg';
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.getToken(code).then(({ tokens }) => {
  const tokenPath = path.join(__dirname, '../../config/emailTokens.json');
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  console.log('Access token and refresh token stored to token.json');
});