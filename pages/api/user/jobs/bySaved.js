import connectDB from "../../../../Database/connect";
import UserSchema from "../../../../Database/userSchema";

export default async function handler(req, res) {
    await connectDB();
    var { email } = req.body;
    var user = await UserSchema.findOne({ email: email });
    if (user) {
        var saveJobs = user.saveJobs;
        res.status(200).json({ data: saveJobs });
    }
}