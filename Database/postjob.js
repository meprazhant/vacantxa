import mongoose from "mongoose";

const postjob = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    orgnData: {
        type: Object,
        required: true,
    },
    applies: {
        userid: {
            type: String,
        },
        cover: {
            type: String,

        },
        date: {
            type: Date,
        },
    }
    ,
    postedOn: {
        type: Date,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    }
});

// export schema
const PostJob = mongoose.models.postjob || mongoose.model("postjob", postjob);

export default PostJob;
