import nodemailer, {Transporter} from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
require('dotenv').config();

interface EmailOptions{
    email: string;
    subject: string;
    template: string;
    data: {[key: string]:any}
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMIP_HOST,
        port: parseInt(process.env.SMIP_PORT || '587'),
        service: process.env.SMIP_SERVICE,
        auth: {
            user: process.env.SMIP_MAIL,
            pass: process.env.SMIP_PASSWORD,
        },
    });

    const {email, subject, template, data} = options;

    const templatePath = path.join(__dirname, '../mails', template);

    const html:string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMIP_MAIL,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;