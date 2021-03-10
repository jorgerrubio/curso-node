const express = require('express');
const http = require('http');
const url = require('url');

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
        const parseurl = url.parse(src);
        const options = {
            headers: req.headers,
            hostname: parseurl.hostname,
            port: parseurl.port,
            path: parseurl.pathname,
            method: req.method
        };
        const respon = http.request(options, (urlResponse) => {
            res.writeHead(urlResponse.statusCode, urlResponse.headers);
            urlResponse.pipe(res).on('error', (err) => {
                console.log('error', err);
            });
        });
        req.pipe(respon).on('error', (err) => { console.log('error', err); });
    } else {
        res.sendStatus(400);
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