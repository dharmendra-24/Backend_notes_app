const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
//extended:false->NestedObject cant be solve;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = 5000;
app.use(cors());

const Note = require('./models/note');
const url = "mongodb://localhost:27017/notes";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(console.log('mongodb connected'))


app.get('/notes', async function (req, res) {
    const notes = await Note.find();
    return res.json(notes);
})
app.post('/notes/list', async function (req, res) {

    const notes = await Note.find({ userid: req.body.userid });
    return res.json(notes);
})
app.post('/add', async function (req, res) {
    console.log(req.body);
    try {
        var note = Note.findById(req.body.id);
        if (note) {
            Note.deleteOne({ id: req.body.id });
        }
        const newNote = new Note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content: req.body.content,

        })
        await newNote.save();
        const response = { message: "New note created" + `${req.body.userid}` }
        return res.json(req.body);
    } catch (e) {
        return res.json({ message: "failed" });
    }

})
app.post('/delete', async function (req, res) {
    await Note.deleteOne({ id: req.body.id });
    const response = { message: "note deleted" + `${req.body.id}` }
    res.json(response);

})
app.get('/', function (req, res) {
    return res.send(`port is listen at ${port}`);
})
app.listen(port, console.log('app is listen'));