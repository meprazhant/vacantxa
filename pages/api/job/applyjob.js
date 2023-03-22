import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";
import UserSchema from "../../../Database/userSchema";

export default async function handler(req, res) {
    await connectDB();
    var { email, postid, desc } = req.body;
    var user = await UserSchema.findOne({ email: email });

    if (user) {
        for (var i = 0; i < user.applies.length; i++) {
            if (user.applies[i].postid == postid) {
                res.status(200).json({ message: "Already applied" })
                return;
            }
        }
        var job = await PostJob.findByIdAndUpdate({ _id: postid },
            { $push: { applies: { userid: user._id, cover: desc, date: new Date() } } })
        var userapplied = await UserSchema.findByIdAndUpdate({ _id: user._id },
            { $push: { applies: { postid } } })
        res.status(200).json({ message: "Applied", userapplied, job })

    } else {
        res.status(200).json({ message: "User not found" })
    }
}