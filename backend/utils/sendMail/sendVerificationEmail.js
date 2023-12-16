const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationEmail = (user, sixdigit) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: { name: "Traditee", address: process.env.EMAIL },
    to: user.email,
    subject: "Verify your email",
    html: `<p>Hello ${user.username}, your verification code is ${sixdigit}</p>`,
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
