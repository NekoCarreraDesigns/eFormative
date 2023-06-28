const nodemailer = require("nodemailer");

async function sendEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    host: "smtp.eformative.com",
    port: 587,
    secure: false,
    auth: {
      username: "username",
      password: "password",
    },
  });

  const mailOptions = {
    from: "no-reply@eformative.com",
    to,
    subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("email sent:", info.response);
    return true;
  } catch {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = { sendEmail };
