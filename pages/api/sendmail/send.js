const nodemailer = require("nodemailer");
export default async function handler(req, res) {
    var { code } = req.query;
    async function main() {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'bhetiyo.info@gmail.com',
                pass: 'lawhkuvpxvlsenni',
            },
        });


        let info = await transporter.sendMail({
            from: 'VacantXa ',
            to: 'meprazhant@gmail.com' || "meprazhant@gmail.com",
            subject: `Hey Prashant, Someone Purchased your Plan.`,
            text: "Hello world?",
            html: `
            <html>
            <head>
            <title>Purchased Plan</title>
           
            <body>
            <div class="body">
            <p>Hi <span>Prashant</span>, </p>
            <p>Somebody Has purchased the Plan. The Code of the plan is: ${code} </p>
            <a href="mailto:meprazhant@gmail.com" target="_blank">Mail Them</a>
            <p>HELLO.</p>
            </div>
            </body>
            </html>
            `, // html body
        });

        //     console.log("Message sent: %s", info.messageId);
        //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //     // Preview only available when sending through an Ethereal account
        //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

    res.status(200).json({ message: "Mail Sent" })
}