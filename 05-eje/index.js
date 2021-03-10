const express = require('express');
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const defaultHandler = (req, res) => {
    res.sendStatus(404);
}
const paramsHandler = (req, res) => {
    const { src } = req.query;
    if (src) {
        const url = src.split('/').splice(2);
        const host_port = url[0].split(':');
        const path = url.splice(1).reduce((p, c) => p += `/${c}`, '');
        const options = {
            hostname: host_port[0],
            port: host_port[1],
            path,
            method: 'GET'
        };
        const respon = http.request(options, (urlResponse) => {
            urlResponse.pipe(res, {
                end: true
            });
        });
        respon.end();
    } else {
        res.sendStatus(401);
    }
};
app.get('/', paramsHandler);
app.all('*', defaultHandler);
app.listen(port, () => {
    console.log(`app litening on ${port}`);
});
app.on('error', (err) => {
    console.log(`app unable to start on port: ${port}`);
});