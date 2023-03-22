
import connectDB from "../../../../Database/connect";
import userSchema from "../../../../Database/userSchema";
import PostJob from "../../../../Database/postjob";

export default async function handler(req, res) {
    await connectDB();
    var job = await PostJob.find({}).sort({ views: -1 })
    if (job) {
        res.status(200).json({ data: job });
    }

}