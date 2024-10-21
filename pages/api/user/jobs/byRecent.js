import connectDB from "../../../../Database/connect";
import PostJob from "../../../../Database/postjob";

export default async function handler(req, res) {
  await connectDB();
  var jobs = await PostJob.find().sort({ postedOn: -1 });
  if (jobs) {
    return res.status(200).json({ data: jobs });
  }
}
