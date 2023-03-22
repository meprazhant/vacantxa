import connectDB from "../../../Database/connect";
import PostJob from "../../../Database/postjob";
import userSchema from "../../../Database/userSchema";

export default async function handler(req, res) {

    var data = req.body;
    const { email } = data;

    await connectDB();

    var user = userSchema.findOne({ email: email })
        .then((user) => {
            if (user) {
                var exist = PostJob.findOne({ desc: data.description, subject: data.subject, salary: data.salary, email: email })
                    .then((exist) => {
                        if (exist) {
                            res.status(404).json({ error: "Job already posted", status: 'exist' });
                        } else {
                            var postjob = new PostJob({
                                desc: data.description,
                                subject: data.subject,
                                salary: data.salary,
                                level: data.level,
                                orgnData: user,
                                applied: data.applied,
                                postedOn: data.postedOn
                            });
                            postjob.save();
                            if (postjob) {
                                res.status(200).json({ message: "Job posted successfully", status: 'true' });
                            } else {
                                res.status(404).json({ error: "Error posting job", status: 'false' });
                            }
                        }
                    })

            } else {
                res.status(404).json({ error: "User not found", status: 'unauth' });
            }
        }
        )
        .catch((err) => {
            res.status(500).json({ error: err });
        }
        );




}