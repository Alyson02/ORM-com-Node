const pessoaRoute = require('./pessoaRoute');

module.exports = app => {
    app.use(pessoaRoute)
}