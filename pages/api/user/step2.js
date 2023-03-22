import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";

export default async function handler(req, res) {
    let { data } = req.body;
    await connectDB();
    const { name, email, phone, address, experience, subject } = data;
    const { Bachelor, HSEB, Master, PhD, SLC } = data
    var qual = {
        Bachelor: Bachelor,
        HSEB: HSEB,
        Master: Master,
        PhD: PhD,
        SLC: SLC
    }
    if (!name || !email || !phone || !address) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    const checkUser = await userSchema.findOneAndUpdate({ email: email },
        {
            $set:
                { name: name, phone: phone, address: address, qualification: qual, experience: experience, subject: subject }
        });
    try {
        await checkUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.log(err);
    }


}