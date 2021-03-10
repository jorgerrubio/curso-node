const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 3100;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}

const countries = [
    {
        id: '1',
        name: 'spain'
    },
    {
        id: '2',
        name: 'uk'
    },
    {
        id: '3',
        name: 'usa'
    }
]

app.get('/country/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        const country = countries.filter((country) => country.id === id).shift();
        if (country) {
            res.status(200).json(country);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(401);
    }
});

app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app listening on ${port}`);
});

app.on('error', (err) => {
    console.log(`app unable on start to port: ${port}`, err);
});
