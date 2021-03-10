const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 3200;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}

const cities = [
    {
        id: '1',
        name: 'madrid'
    },
    {
        id: '2',
        name: 'london'
    },
    {
        id: '3',
        name: 'new york'
    }
]

app.get('/city/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        const city = cities.filter((city) => city.id === id).shift();
        if (city) {
            res.status(200).json(city);
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
