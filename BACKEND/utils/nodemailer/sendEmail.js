const nodemailer = require('nodemailer');
const handlebar = require('handlebar');
const fs = require('fs');
const path = require('path');
const sendEmail = async () => {
    const source = fs.readFileSync(path.join(__dirname, `/templates/${data.htmlTemplateFileName}.hbs`),
        "utf8"
    );
    const template = await handlebar.compile(source);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NOREPLY_EMAIL_ADDRESS,
            pass: process.env.NOREPLY_EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const templ = template({templateData: data.templateData});
    const mailOptions = await transporter.sendMail({
        from: `<${process.env.NOREPLY_EMAIL_ADDRESS}>`,
        to: data.receiveMailAddress,
        subject: data.subject,
        html: templ,
    })
    transporter.sendMail( mailOptions, ( err, success ) => {
        if (err) {
            console.log(err)
        }
    })
}
module.exports.sendEmail = sendEmail;