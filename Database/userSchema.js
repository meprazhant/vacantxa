import mongoose, { model, models } from 'mongoose';

// build schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    saveJobs: {
        type: Array,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        // required: true,
        default: 0,
    },
    address: {
        type: String,
        // required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        // required: true,
        default: "N/A",
    },
    experience: {
        type: String,
        // required: true,
    },
    qualification: {
        type: Object,
        // required: true,
    },
    applies: {
        type: Array,
        // required: true,
    },
    joined: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
    }
});

// export schema

const UserSchema = models.userData || model('userData', userSchema);

export default UserSchema;

