require('dotenv').config();
const nodemailer = require('nodemailer');

class mailServise {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "***REMOVED***",
            port: ***REMOVED***,
            secure: false,
            auth: {
                user: "***REMOVED***",
                pass: "***REMOVED***"
            }
        })
    }
    async sendActivationLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Account activation ${process.env.API_URL}`,
            text: "",
            html: `
                <div>
                    <h1>Follow the link to activate your accont: </h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })

    }
}

module.exports = new mailServise();