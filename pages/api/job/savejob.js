import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";
import PostJob from "../../../Database/postjob";

export default async function handler(req, res) {
    var { id, email, action } = req.query;
    await connectDB();

    var user = await userSchema.findOne({ email: email })

    if (action == "save") {
        if (user.saveJobs.includes(id)) {
            res.status(200).json({ message: "Already applied" })
            return;
        } else {
            user.saveJobs.push(id)
            await user.save()
            res.status(200).json({ message: "Saved Job" })
        }
    } else if (action == "unsave") {
        var index = user.saveJobs.indexOf(id);
        if (index > -1) {
            user.saveJobs.splice(index, 1);
        }
        await user.save()
        res.status(200).json({ message: "Unsaved Job" })

    }


}