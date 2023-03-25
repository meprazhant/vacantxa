import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    var session = await getSession({ req });
    await connectDB();
    if (!session) {
        return res.status(401).json({ error: "Not Authenticated" });
    }
    var emailUser = session.user?.email;
    const { email } = req.body;
    var search = { email: email }
    console.log(search)


    if (emailUser != email) {
        return res.status(401).json({ error: "Not Authenticated" });
    }
    const checkUser = await userSchema.findOne({ email: email });
    if (checkUser) {
        return res.status(200).json({ data: checkUser });
    }
    else {
        return res.status(404).json({ error: "User not found" });
    }
}
