const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const exampleIp = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/green');
        console.log(response.data);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(err.response.status);
    }
}

const exampleId = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/id');
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (err) {
        res.sendStatus(err.response.status);
    }
}

app.get('/', exampleIp);
app.get('/id', exampleId)

const defaultHandler = (req, res) => {
    res.sendStatus(404);
};
app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app listening on ${port}`);
});
app.on('error', (err) => {
    console.log(`app unable to start on port ${port}`, err);
});