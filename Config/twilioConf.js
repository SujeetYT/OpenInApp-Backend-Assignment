const { Twilio } = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.MY_PHONE_NUMBER
const client = new Twilio(accountSid, authToken);


const callUser = async (user, task = "some task") => {
  try {
    console.log("calling user", "+91"+user.phoneNumber);
    await client.calls.create({
      twiml:
        `<Response>
          <Say>Hello ${user.name} your task with name ${task} is due</Say>
        </Response>`,
      to: "+91"+user.phoneNumber,
      from: number,
      timeout: 30,
    });
  } catch (error) {
    console.log("Error calling user", error);
  }

};

module.exports = { callUser };