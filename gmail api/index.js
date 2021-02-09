const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const creds = require('./creds');
const form = require('./form');
const resp = require('./resp');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const oAuth2Client = new google.auth.OAuth2(creds.CLIENT_ID, creds.CLIENT_SECRET, creds.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: creds.REFRESH_TOKEN })

async function sendMail(name, email, subject, body){
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: '',
                clientId: creds.CLIENT_ID,
                clientSecret: creds.CLIENT_SECRET,
                refreshToken: creds.REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'Bio Sting Mangement <>',
            to: email,
            subject: subject,
            text: body,

        };

        const result = transport.sendMail(mailOptions)
        return result

    } catch(error){
        return error
    }
}

app.get('/', (req, res) => {
    res.send(form());
});

app.post('/sendEmail', async (req, res) => {
    var senderName = req.body.Name;
    var senderEmail = req.body.emailId;
    var senderPhone = req.body.Phone;
    var subject = req.body.Subject;
    var emailBody = req.body.body;

    var emailBodyLines = emailBody.split('\n');

    var greetings = /(Good Morning)|(Good Afternoon)|(Good Evening)|(Good Day)|(Greetings of the day)|(Good Night)^/.test(emailBody);
    var secondLastLine = /(Thanking You)|(thanking you)|(thank you)|(Thank You)/.test(emailBodyLines[emailBodyLines.length -1]);
    var lastLine = /(Thanking You)|(thanking you)|(thank you)|(Thank You)/.test(emailBodyLines[emailBodyLines.length -2]);
    
    if(!greetings){
        emailBody = 'Greetings of the day,\n\t'+emailBody;
    }
    
    if (!(lastLine|secondLastLine)){
        emailBody = emailBody + '\n\nThanking You\n' + senderName;
        emailBody = emailBody + '\n' + senderPhone;
    } else {
        emailBody = emailBody + '\n' + senderPhone;
    }

   sendMail(senderName, senderEmail, subject, emailBody)
    .then((result)=>console.log('Email sent...', result))
    .catch((error) => console.log(error.message));

    res.send(resp());
});

app.listen(8080, () => {
    console.log("Server Started");
});