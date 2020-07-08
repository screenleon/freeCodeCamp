const Express = require('express');
const app = Express();
const Multer = require('multer');
const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = Multer({ storage: storage });

app.get('/', function (req, res) {
    res.send(`
    <form action="/api/fileanalyse" method="post" enctype="multipart/form-data">
        <input type="file" name="singleFile-upload" />
        <input type="submit" value="upload">
    </form>`)
})

app.post('/api/fileanalyse', upload.single('singleFile-upload'), function (req, res) {
    console.log(req.file);
    res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
})

const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port, 'port');
})