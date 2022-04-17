const pessoaRoute = require('./pessoaRoute');
const nivelRoute = require('./nivelRoute');
const turmaRoute = require('./turma1Route');

module.exports = app => {
    app.use(pessoaRoute,
            nivelRoute,
            turmaRoute);
}