import connectDB from "../../../Database/connect";
import userSchema from "../../../Database/userSchema";



export default async function handler(req, res) {
    await connectDB();
    const { data, type, provider } = req.body;

    var username = data.name + Math.floor(Math.random() * 1000);
    username = username.replace(/\s/g, '');

    const { name, email, image } = data;

    if (!name || !email || !type || !provider) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    if (type !== "Organization" && type !== "Teacher") {
        return res.status(422).json({ error: "Please add a valid type" });
    }
    const checkUser = await userSchema.findOne({ email: email });
    if (checkUser) {
        // return res.status(422).json({ error: "User already exists with that email" });
        return res.status(200).json({ data: checkUser });

    }
    const user = new userSchema({
        name,
        email,
        type,
        username,
        image,
        provider
    });
    try {
        await user.save();
        return res.status(201).json({ data: user });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}