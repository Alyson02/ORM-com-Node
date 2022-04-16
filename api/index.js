const expres = require('express');

const app = expres();

app.use(expres.json())

app.use('/', (req, res) =>{
    res.send({mensagem: 'Safe!'})
})

const port = 3000;

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));