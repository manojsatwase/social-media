const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) =>{

    // const transporter = nodeMailer.createTransport({
    //    host: process.env.SMPT_HOST,
    //    port:process.env.SMPT_PORT,
    //    auth:{
    //     user:process.env.SMPT_MAIL,
    //     pass:process.env.SMPT_PASSWORD
    //    },
    //    service: process.env.SMPT_SERVICE
    // });

    const transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "caa3f142513484",
          pass: "0bfb313d3f8620"
        }
      });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}

// https://mailtrap.io/
// step - registration with email
