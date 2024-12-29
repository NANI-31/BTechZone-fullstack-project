const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const session = require('express-session');
const bcrypt = require("bcrypt");


const studentsModel = require('../schemas/students/studentsDetails')
const teachersModel = require('../schemas/teachers/teachersDetails')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'darkbutterflystar31@gmail.com',
        pass: 'gqardumwdzfbyahu'
    }
})

router.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

let code = '';

const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


router.post('/signup', async (req, res) => {
    const { name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch } = req.body;
    const existingUser1 = await studentsModel.findOne({ email });
    const existingUser2 = await teachersModel.findOne({ email });
    const existingName = await studentsModel.findOne({ name });
    if (existingUser1) {
        return res.json("email fail");
    }
    else if (existingUser2) {
        return res.json("email fail")
    }
    // else if (existingUser3) {
    //     return res.json("name fail")
    // }
    else if (existingName) {
        return res.json("name fail")
    }
    const randomCode = generateRandomCode();
    code = randomCode;
    const person = "student";
    const signupData = { name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch, person, randomCode }
    const mailOptions = {
        from: 'darkbutterflystar31@gmail.com',
        to: email,
        subject: 'Your 6-digit Code',
        html: `<div style="margin:0;padding:0" bgcolor="#FFFFFF">
        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
            <tbody>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
                <tr align="center">
                    <td>
                        <div>
                            <div></div>
                        </div>
                        <table border="0" cellspacing="0" cellpadding="0"
                            style="padding-bottom:20px;max-width:380px;min-width:220px">
                            <tbody>
                                <tr>
                                    <td width="8" style="width:8px"></td>
                                    <td>
                                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_4104678102433049159mdv2rw"> 
                                            <div style="background-color:black;width: 50px;height: 50px;border-radius: 8vh; margin-top: 0px;position: relative; top: -.5em;">
                                                    <img src="cid:logo" style="margin-top: 10px;width: 30px;height: 30px;">
                                            </div>
                                            <div
                                                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                                                <div style="font-size:24px">Verification </div>
                                                <table align="center" style="margin-top:8px">
                                                    <tbody>
                                                        <tr style="line-height:normal">
                                                            <td align="right" style="padding-right:8px">
                                                            </td>
                                                            <td><a
                                                                    style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${email}</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align: left;">
                                                <p>Dear <b>${name},</b></p>
            <p class="p1" style="margin-left: 20px; margin-top: 20px;">Welcome to our digital library of
                knowledge! Dive into a treasure trove of PDF documents covering a wide range of subjects.
                Explore, learn, and expand your horizons with our collection of informative resources.</p>
            <p style="margin-left: 20px;">Your verification OTP is: <b>${randomCode}</b></p>
            <br><b>With regrads,<br>Nani</b><div
                                                    style="padding-top:32px;text-align:center"><a
                                                        href="https://accounts.google.com/AccountChooser?Email=education13331@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1707549979000?rfn%3D325%26rfnc%3D1%26eid%3D1731593439640181822%26et%3D0"
                                                        style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:18px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline;padding:10px 24px;background-color:#4184f3;border-radius:5px;width:90px"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Deducation13331@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1707549979000?rfn%253D325%2526rfnc%253D1%2526eid%253D1731593439640181822%2526et%253D0&amp;source=gmail&amp;ust=1707877341757000&amp;usg=AOvVaw3RY8wu4IZadb_GN2L0HDMc">Check
                                                        activity</a></div>
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td width="8" style="width:8px"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
            </tbody>
        </table>
        </div>`,
        attachments: [
            {
                filename: "p.png",
                path: "C:/Users/Chowd/OneDrive/Desktop/react2/server/p.png",
                cid: "logo",
            }
        ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email: ' + error);

        } else {
            console.log(email);
            console.log('Verification email sent successfully: ' + info.response);
        }
    });
    try {
        res.json(signupData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.post('/verification', async (req, res) => {
    let person = req.body.person;
    console.log(person)
    if (person === 'student') {
        const { otpcode, name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch, person, randomCode } = req.body;
        globalperson = person;
        const c = "111111"
        try {
            const user = studentsModel.findOne({ email });

            if (!user) {
                res.status(401).send('User not found');
                return;
            }
            if (otpcode === code) {
                const latestEmployee = await studentsModel.findOne({}, {}, { sort: { id: -1 } });
                const newUserId = (latestEmployee && latestEmployee.id ? latestEmployee.id : 0) + 1;
                const hash = await bcrypt.hash(password, 10);
                const status = "1";

                const newEmployee = new studentsModel({
                    id: newUserId,
                    name: name,
                    email: email,
                    password: hash,
                    phoneno: phoneno,
                    status: status,
                    year: selectedYear,
                    semester: selectedSemester,
                    branch: selectedBranch,
                    person: person,
                });

                const studentsDetails = await newEmployee.save();

                console.log(`document(s) was/were updated.`);
                res.status(200).send(studentsDetails);
            } else {
                res.status(402).send('Incorrect code');
            }

        } catch (error) {
            console.log(error);

        }

    }
    else if (person === 'teacher') {
        const { otpcode, name, email, password, phoneno, selectedBranch, person, randomCode } = req.body;
        globalperson = person;
        const c = "111111"
        try {
            const user = teachersModel.findOne({ email });

            if (!user) {
                res.status(401).send('User not found');
                return;
            }
            if (otpcode === c) {
                const latestEmployee = await teachersModel.findOne({}, {}, { sort: { id: -1 } });
                const newUserId = (latestEmployee && latestEmployee.id ? latestEmployee.id : 0) + 1;
                const hash = await bcrypt.hash(password, 10);
                const status = "1";

                const newEmployee = new teachersModel({
                    id: newUserId,
                    name: name,
                    email: email,
                    password: hash,
                    phoneno: phoneno,
                    status: status,
                    branch: selectedBranch,
                    person: person,
                });

                const teachersDetails = await newEmployee.save();

                console.log(`document(s) was/were updated.`);
                res.status(200).send(teachersDetails);
            } else {
                res.status(402).send('Incorrect code');
            }

        } catch (error) {
            console.log(error);

        }

    }

});

module.exports = router;