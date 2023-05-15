const express = require('express');

const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta: ' + PORT);
})