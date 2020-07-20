const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error(e)
    })

const schemaOptions = {
    timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }
};

const ProjectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    }
}, schemaOptions);

const IssueSchema = new mongoose.Schema({
    project: {
        type: mongoose.Types.ObjectId,
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

const ProjectModel = mongoose.model('Project', ProjectSchema);
const IssueModel = mongoose.model('Issue', IssueSchema);

const getIssues = function (project_name) {
    return ProjectModel.findOne({ project_name })
        .exec()
        .then(project => {
            return IssueModel.find({ project: project._id }, '-__v -project', { lean: true }).exec();
        });
}

const postIssue = function (project_name, issue) {
    return ProjectModel.findOne({ project_name })
        .then(project => {
            if (!project)
                return ProjectModel.create({ project_name })
            return project;
        }).then(project => {
            const { issue_title, issue_text, created_by, assigned_to, open, status_text } = issue;
            const createIssue = { issue_title, issue_text, created_by, assigned_to, open, status_text, project: project._id };
            return IssueModel.create(createIssue);
        })
        .catch(e => {
            if (e) console.error(e);
        })
}

const updateIssue = function (project_name, issue) {
    return ProjectModel.findOne({ project_name })
        .exec()
        .then(project => {
            if (!project) throw new Error('Not found Project');
            return IssueModel.findByIdAndUpdate(issue._id, issue).exec();
        })
}

const deleteIssue = function (project_name, _id) {
    return ProjectModel.findOne({ project_name })
        .exec()
        .then(project => {
            if (!project) throw new Error('Not found Project');
            return IssueModel.findByIdAndDelete({ _id }).exec();
        })
}

module.exports = { postIssue, getIssues, deleteIssue, updateIssue };