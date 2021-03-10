const express = require('express');

const Users = require('./users.cjs');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}

const getUser = (req, res) => {
    const id = req.params.id;
    if (id) {
        const user = Users.get(id);
        if (user) {
            console.log('user', user);
            res.status(200).json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
};

app.get('/user/:id', getUser);

app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app litening on ${port}`);
});
app.on('error', (err) => {
    console.log(`app unable to start on port: ${port}`);
});