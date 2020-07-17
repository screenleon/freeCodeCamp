const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }
};

const IssueSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String
    },
    open: {
        type: Boolean,
        default: true
    },
    status_text: {
        type: String
    }
}, schemaOptions);

export const IssueModel = mongoose.model('Issue', IssueSchema);