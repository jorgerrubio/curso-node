const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}

const pathCountry = 'http://localhost:3100/country';
const pathCity = 'http://localhost:3200/city';

const getRequets = async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) {
        res.status(400).json({
            message: 'No country has been provided'
        });
    } else {
        try {
            const country = await getCountry(id);
            const city = await getCity(id);
            country.cities = [city];
            res.status(200).json(country);
        } catch (err) {
            const message = err.message.split(':');
            res.sendStatus(parseInt(message[1]) || 500);
        }
    }
}

const getCountry = async (id) => {
    try {
        return (await axios.get(`${pathCountry}/${id}`)).data;
    } catch (err) {
        const e = new Error(`ERR-COUNTRY:${err.response.status}`);
        throw e;
    }
}

const getCity = async (id) => {
    try {
        return (await axios.get(`${pathCity}/${id}`)).data;
    } catch (err) {
        throw new Error('ERR-CITY');
    }
}

app.get('/country/:id', getRequets);
app.get('/country', getRequets);

app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app listening on ${port}`);
});

app.on('error', (err) => {
    console.log(`app unable on start to port: ${port}`, err);
});