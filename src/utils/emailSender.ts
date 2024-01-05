import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  console.log(process.env);

  // Create a test account only if the SMTP settings are not set in .env
  let transporterOptions;
  let testAccount;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    transporterOptions = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };
  } else {
    // Create a test account using Ethereal
    testAccount = await nodemailer.createTestAccount();

    transporterOptions = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const info = await transporter.sendMail({
    from: `"AbdifatahCodes" <${process.env.SMTP_USER || testAccount.user}>`,
    replyTo: `"AbdifatahCodes" <${process.env.SMTP_USER || testAccount.user}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Info:->  %s', info);
  // If using Ethereal, log the test email URL
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};
