import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";

export default async function handler(req, res) {
    await connectDB();
    var { id } = req.query;
    var job = await PostJob.findById(id);
    res.status(200).json({ job: job })
}