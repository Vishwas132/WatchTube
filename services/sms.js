import config from "config";

const accountSid = config.get("twilio.accountSid"); // Your Account SID from www.twilio.com/console
const authToken = config.get("twilio.authToken"); // Your Auth Token from www.twilio.com/console

import twilio from "twilio";
const client = twilio(accountSid, authToken);
console.log("client", client);

const message = await client.messages.create({
  body: "Hello from Node",
  to: "+919999999999", // Text this number
  from: config.get("twilio.phoneNumber"), // From a valid Twilio number
});

console.log("message", message);
console.log(message.sid);
