const jsonServer = require('json-server');
const catalogues = require('../catalogues/example.json');
const users = require('../users/example.json');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const rewriter = jsonServer.rewriter({
    '/api/*': '/$1'
});

const router = jsonServer.router({
    Catalogues: catalogues,
    Users: users
});

router.render = (request, response) => {
    response.jsonp(
        response.locals.data
    )
};

const port = 3000;

server.use(middlewares);
server.use(rewriter)
server.use(router);
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});