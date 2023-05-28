const nodemailer = require('nodemailer')

exports.mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'learnrak2016@gmail.com',
        pass: "ediedvxlyqnscccb"
    }
});

// exports.mailDetails = {
//     from: 'learnrak2016@gmail.com',
//     to: 'learnrak2016@gmail.com',
//     subject: 'Test mail',
//     text: 'Node.js testing mail for GeeksforGeeks',
//     html: "<b>Hello world?</b>", 
// };
 

// exports.sendMail = (req, res, next)=>{
//     mailTransporter.sendMail(mailDetails, function(err, data) {
//         if(err) {
//             console.log(err);
//             console.log('Error Occurs');
//             res.send("error while sending")
//         } else {
//             res.send(data)
//             console.log('Email sent successfully');
//         }
//     });
// }
