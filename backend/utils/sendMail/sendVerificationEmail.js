const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationEmail = (user, sixdigit) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: { name: "Traditee", address: process.env.EMAIL },
    to: user.email,
    subject: "Verify you email",
    html: `<p>Hello ${user.username}, you verification passcode is ${sixdigit}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sent");
    }
  });
};

module.exports = { sendVerificationEmail };
