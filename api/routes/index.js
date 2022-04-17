const pessoaRoute = require('./pessoaRoute');
const nivelRoute = require('./nivelRoute');
const turmaRoute = require('./turmaRoute');

module.exports = app => {
    app.use(pessoaRoute,
            nivelRoute,
            turmaRoute);
}