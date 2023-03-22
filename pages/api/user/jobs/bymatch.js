
import connectDB from "../../../../Database/connect";
import userSchema from "../../../../Database/userSchema";
import PostJob from "../../../../Database/postjob";

export default async function handler(req, res) {
    var body = req.body;
    var email = body.email;
    await connectDB();

    var user = await userSchema.findOne({ email: email })

    if (user) {
        var subject = user.subject;
        subject = subject.toLowerCase();
        var postjob = await PostJob.find({ subject: subject })
        if (postjob) {
            res.status(200).json({ data: postjob });
        } else {
            res.status(404).json({ error: "No job posted" });
        }
    }
}