  const fs = require('fs');
  const path = require('path');
  const sendMail = require('./gmail');
  
  const sendEmail = async (toEmail,subject,message) => {
   /*  const fileAttachments = [
      {
        filename: 'attachment1.txt',
        content: 'This is a plain text file sent as an attachment',
      },
      {
        path: path.join(__dirname, './attachment2.txt'),
      },
      {
        filename: 'websites.pdf',
        path: 'https://www.labnol.org/files/cool-websites.pdf',
      },
  
      {
        filename: 'image.png',
        content: fs.createReadStream(path.join(__dirname, './attach.png')),
      },
    ]; */
  
    const options = {
      to: toEmail,
     // cc: 'cc1@example.com, cc2@example.com',
      //replyTo: 'amit@labnol.org',
      subject: subject,
     // text: 'This email is sent from the command line',
      html: message,
      //attachments: fileAttachments,
      textEncoding: 'base64',
      headers: [
        { key: 'X-Application-Developer', value: 'JB' },
        { key: 'X-Application-Version', value: 'v1.0.0.2' },
      ],
    };
  
    const messageId = await sendMail(options);
    return messageId;
  };
  
  exports.sendEmail = sendEmail;