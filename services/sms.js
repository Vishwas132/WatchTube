import config from "../config/default.json" assert { type: "json" };

const accountSid = config.twilio.accountSid; // Your Account SID from www.twilio.com/console
const authToken = config.twilio.authToken; // Your Auth Token from www.twilio.com/console

import twilio from "twilio";
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "Hello from Node",
    to: "+918923267778", // Text this number
    from: "+15109014980", // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
