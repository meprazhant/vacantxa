import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

    var session = await getSession({ req });
    await connectDB();
    var { id } = req.query;



    if (session) {
        var em = session.user.email;
        var job = await PostJob.findById(id);
        if (job) {
            var jobem = job.orgnData.email;
            if (em == jobem) {
                await PostJob.findByIdAndDelete(id);
                res.status(200).json({ message: "Deleted" })
            } else {
                res.json({
                    error: "UnAuthorized Sorry"
                })
            }
        }
    }
}
