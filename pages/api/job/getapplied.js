import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";
import userSchema from "../../../Database/userSchema";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    await connectDB();
    var session = await getSession({ req });
    var { id } = req.query;
    var email
    if (session) {
        email = session.user.email;
        var user = await userSchema.findOne({ email: email });
        var job = await PostJob.findById(id);
        if (job) {
            if (!user.verified || !job.verified) {
                var myObj = job.applies;
                var stringObj = JSON.stringify(myObj);
                stringObj = stringObj.replace("[", "")
                stringObj = stringObj.replace("]", "")
                var addbraces = "[" + stringObj + "]"
                addbraces = JSON.parse(addbraces);
                res.json({ status: "unpaid", length: (addbraces.length) })
            } else {
                var applies = job.applies;
                res.json({ applies: applies, status: "paid" })
            }
        }
    } else {
        res.json({ error: "UnAuthorized" })
    }

}