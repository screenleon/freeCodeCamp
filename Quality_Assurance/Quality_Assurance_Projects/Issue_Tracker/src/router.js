const mongooseFunction = require('./dbConn');

module.exports = function (app) {
    app.use((req, res, next) => {
        console.log('\n', req.method + " " + req.path + " - " + req.ip);
        console.log('queries:', req.query);
        console.log('body: ', req.body);
        console.log();
        next();
    })

    app.route('/api/issues/:project')
        .get((req, res) => {
            mongooseFunction.getIssues(req.params.project)
                .then(issues => {
                    res.json(issues);
                    return;
                })
        })

    app.route('/api/issues/:project')
        .post((req, res) => {
            const projectName = req.params.project;
            const properties = ['issue_title', 'issue_text', 'created_by'];
            for (let property of properties) {
                if (!req.body.hasOwnProperty(property)) {
                    res.json({ error: 'Properties not meet the requirements' });
                    return;
                }
            }

            const issue = { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
            mongooseFunction.postIssue(projectName, issue).then(issue => {
                issue = issue.toObject();
                delete issue.__v;
                delete issue.project;
                res.json(issue);
                return;
            }).catch(e => {
                console.error(e);
            });
        })

    app.route('/api/issues/:project')
        .put((req, res) => {
            const property = '_id';
            if (!req.body.hasOwnProperty(property)) {
                res.json({ error: 'Properties not meet the requirements' });
                return;
            }

            const issue = { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;
            if (Object.keys(issue).length === 1) {
                res.json({ result: 'no updated field sent' })
                return;
            }
            mongooseFunction.updateIssue(req.params.project, issue)
                .then(_issue => {
                    console.log('update issue:', _issue);
                    if (!_issue)
                        res.json({ result: 'could not update ' + req.body._id });
                    else
                        res.json({ result: 'successfully updated' });
                    return;
                }).catch(e => {
                    res.json({ result: 'could not update ' + req.body._id });
                })

        })

    app.route('/api/issues/:project')
        .delete((req, res) => {
            mongooseFunction.deleteIssue(req.params.project, req.body._id)
                .then(issue => {
                    if (issue) {
                        res.json({ success: 'deleted ' + issue._id })
                    } else {
                        res.json({ error: '_id error' });
                    }
                    return;
                }).catch(e => {
                    res.json({ failed: 'could not delete ' + req.body._id });
                    return;
                })
        })
}