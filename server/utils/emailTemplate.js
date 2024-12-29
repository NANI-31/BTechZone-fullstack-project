// const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//             }
//             .container {
//                 max-width: 600px;
//                 margin: auto;
//                 padding: 20px;
//                 border: 1px solid #ddd;
//                 border-radius: 5px;
//             }
//             .header {
//                 background-color: #f7f7f7;
//                 padding: 10px;
//                 text-align: center;
//             }
//             .content {
//                 margin: 20px 0;
//             }
//             .footer {
//                 text-align: center;
//                 font-size: 12px;
//                 color: #666;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>Password Reset</h1>
//             </div>
//             <div class="content">
//                 <p>Your verification code is: <strong>here</strong></p>
//             </div>
//             <div class="footer">
//                 <p>© 2024 Your Company. All rights reserved.</p>
//             </div>
//         </div>
//     </body>
//     </html>
// `;

// module.exports = html;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #FFFFFF;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #dadce0;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header-logo {
            background-color: black;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0 auto 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .header-logo img {
            width: 30px;
            height: 30px;
        }
        .header-title {
            font-size: 24px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.87);
            border-bottom: 1px solid #dadce0;
            padding-bottom: 10px;
        }
        .content {
            color: rgba(0, 0, 0, 0.87);
            font-size: 14px;
            line-height: 1.6;
            margin-top: 20px;
            text-align: left;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #4184f3;
            color: #ffffff;
            font-size: 14px;
            text-decoration: none;
            padding: 10px 24px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-logo">
                <img src="cid:logo" alt="Logo">
            </div>
            <div class="header-title">Verification</div>
        </div>
        <div class="content">
            <p>Dear <b>{{email}},</b></p>
            <p>Welcome to our digital library of knowledge! Dive into a treasure trove of PDF documents covering a wide range of subjects. Explore, learn, and expand your horizons with our collection of informative resources.</p>
            <p>Your verification OTP is: <b>{{randomCode}}</b></p>
            <br>
            <p>With regards,</p>
            <p><b>Nani</b></p>
            <a href="https://accounts.google.com/AccountChooser?Email=education13331@gmail.com" target="_blank" class="button">
                Check activity
            </a>
        </div>
        <div class="footer">
            © 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

module.exports = html;

