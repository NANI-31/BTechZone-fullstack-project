const nodemailer = require('nodemailer');
const textHtml = require('./emailTemplate')

require('dotenv').config();

const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.response}`);
        return { success: true };
    } catch (error) {
        console.error(`Error sending email to ${email}: ${error.message}`);
        return { success: false, error: error.message };
    }
};

const otpStore = {};

exports.sendEmailVerification = async ({email}) => {
    const randomCode = generateRandomCode();
    otpStore[email] = randomCode;
    console.log(otpStore[email])
    const subject = 'Password Reset';
    const text = textHtml
    .replace('{{randomCode}}', randomCode)
    .replace('{{email}}', email);

    const result = await sendEmail(email, subject, text);
    return { success: true, code: randomCode };
    // if (result.success) {
    // } else {
        // throw new Error(result.error);
    // }
}

exports.otpStore = otpStore;

// exports.sendEmailSignup = async ({email}) => {

    
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'signup success',
//         text: 'you are signed up successfully'
//     };

//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending verification email: ' + error);
    
//         } else {
//             console.log(email);
//             console.log('Verification email sent successfully: ' + info.response);
//         }
//     });

// }

