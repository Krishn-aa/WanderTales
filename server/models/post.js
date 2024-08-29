const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', PostSchema);
