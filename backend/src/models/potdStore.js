const mongoose = require('mongoose');

const potdStoreSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'problem', //problems model
        required: true
    },
    dateString: {
        type: String, // Format: "YYYY-MM-DD" 
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PotdStore', potdStoreSchema);