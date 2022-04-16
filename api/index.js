const expres = require('express');
const routes = require('./routes');

const app = expres();
const port = 3000;

app.use(expres.json())

routes(app);

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));