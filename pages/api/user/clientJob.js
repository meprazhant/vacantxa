import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";
import PostJob from "../../../Database/postjob";

export default async function handler(req, res) {
    var { email } = req.body;
    await connectDB();
    var user = userSchema.findOne({ email: email })
        .then((user) => {
            if (user) {
                var postjob = PostJob.find({ "orgnData.email": email })
                    .then((postjob) => {
                        if (postjob) {
                            res.status(200).json({ data: postjob });
                        } else {
                            res.status(404).json({ error: "No job posted" });
                        }
                    })
            }
        }
        )
        .catch((err) => {
            res.status(500).json({ error: err });
        }
        );
}
