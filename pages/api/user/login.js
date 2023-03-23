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
        const token = jwt.sign({ token: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET);
        // your code to set the session token or JWT as a cookie on the response
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
        await user.save();
        res.status(201).json({ message: "User registered successfully", data: user });
    }
    catch (err) {
        console.log(err);
    }
}