const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.set('trust proxy', true);

const defaultHandler = (req, res) => {
    res.sendStatus(404);
};

const routerOK = (req, res) => {
    res.sendStatus(200);
}

const badIps = ['::ffff:127.0.0.1'];

const filterIp = (req, res, next) => {
    if (badIps.indexOf(req.connection.remoteAddress) > -1) {
        res.sendStatus(403);
    } else {
        next();
    }
}

app.use(filterIp);

app.get('/green', routerOK);
app.get('/blue', routerOK);
app.get('/red', routerOK);

app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app listening on ${port}`);
});
app.on('error', (err) => {
    console.log(`app unable to start on port ${port}`, err);
});