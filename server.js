const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema({
    hour: Number,
    isSelected: Boolean
});

const daySchema = new mongoose.Schema({
    hours: [hourSchema],
    isSelected: Boolean
});

const weekSchema = new mongoose.Schema({
    days: [daySchema]
});

const Week = mongoose.model('Week', weekSchema);

mongoose.connect('mongodb://localhost:27017/schedule', {
    useNewUrlParser: true
});

app.get('/api/week', async (req, res) => {
    try {
        let week = await Week.find();
        res.send(week);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/week', async (req, res) => {
    try {
        mongoose.connection.db.collection('schedule').countDocuments(async function (err, count) {
            // console.dir(err);
            // console.dir(count);

            if (count == 0) {
                const week = new Week({
                    days: req.body.days
                });
                await week.save();
                res.send(week);
            }
            else {
                //console.log("Found Records : " + count);
                const week = Week.findOne()
                week.days = req.body.days
                await week.save();
                res.send(week);
            }

        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/week', async (req, res) => {
    try {
        await Week.deleteMany({});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));