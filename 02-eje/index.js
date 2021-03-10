const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
};

// params /user/userId
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        setTimeout(() => {
            res.status(200).json(id.toUpperCase());
        }, 1000);
    } else {
        res.sendStatus(404);
    }
});

// query params /user/?id=userId
app.get('/user', (req, res) => {
    const { id } = req.query;
    if (id) {
        setTimeout(() => {
            res.status(200).json(id.toUpperCase());
        }, 1000);
    } else {
        res.sendStatus(404);
    }
});

app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`port lietening on ${port}`);
});
app.on('error', (err) => {
    console.log(`app unable to start on port: ${port}`, err);
});

