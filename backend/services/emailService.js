import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.userEmail, 
        pass: config.userPassword
    }
});

export const sendEmail = async (mail_to, subject, text) => {
    try {
        const mailOptions = {
            from: config.userEmail,
            to: mail_to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!!!!!');
        return { success: true };

    } catch (error) {
        console.log('Error sending email:', error);
        return { success: false, error: error.message };
    }
};
