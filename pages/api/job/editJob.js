import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";
import UserSchema from "../../../Database/userSchema";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

    var session = await getSession({ req });
    await connectDB();
    var { id } = req.query;
    var docs = req.body;
    var { desc, level, salary, subject } = docs;



    if (session) {
        var em = session.user.email;
        var job = await PostJob.findById(id);
        if (job) {
            var jobem = job.orgnData.email;
            if (em == jobem) {
                await PostJob.findByIdAndUpdate(id, { desc, level, salary, subject });
                res.status(200).json({ message: "Updated" })
            } else {
                res.json({
                    error: "UnAuthorized Sorry"
                })
            }
        }
    }
}
