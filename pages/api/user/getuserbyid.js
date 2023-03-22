import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";

export default async function handler(req, res) {
    await connectDB();
    const { id } = req.query;
    const checkUser = await userSchema.findById(id);
    if (checkUser) {
        return res.status(200).json({ data: checkUser });
    }
    else {
        return res.status(404).json({ error: "User not found" });
    }
}
