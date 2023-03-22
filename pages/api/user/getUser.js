import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";

export default async function handler(req, res) {
    const { email } = req.body;
    var search = { email: email }
    await connectDB();
    const checkUser = await userSchema.findOne(search);
    if (checkUser) {
        return res.status(200).json({ data: checkUser });
    }
    else {
        return res.status(404).json({ error: "User not found" });
    }
}
