import { getSession } from 'next-auth/react'
import UserSchema from '../../../Database/userSchema'
import connectDB from '../../../Database/connect'

const handler = async (req, res) => {

    const session = await getSession({ req })

    if (session) {

        var email = req.query.email;

        await connectDB();

        var user = await UserSchema.findOne({ email: email })

        if (user) {
            res.status(200).json({ data: user })
        }

    } else {
        // Not Signed in
        res.status(401).json({ data: 'Not Authenticated' })
    }

}

export default handler