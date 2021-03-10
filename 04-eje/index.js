const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(`${__dirname}/public`));
// app.use(express.static(`public`));
app.use(express.static(path.join(__dirname, '/public')));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}

app.listen(port, () => {
    console.log(`app listening on ${port}`);
});

app.all('*', defaultHandler);

app.on('error', (err) => {
    console.log(`app unable to start on port: ${port}`);
});