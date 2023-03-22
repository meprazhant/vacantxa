import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";

export default async function handler(req, res) {
    var { id } = req.query;
    await connectDB();
    var job = await PostJob.findById(id);
    var views = job.views;
    views++;

    await PostJob.findByIdAndUpdate(id, { views: views });
    res.status(200).json({ view: job.views })
}
