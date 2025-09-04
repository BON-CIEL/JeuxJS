'use strict';

console.log('TP CIEL');

const port = 80;
const express = require('express');
const exp = express();

// Servir les fichiers statiques depuis le dossier 'www'
exp.use(express.static(__dirname + '/www'));

// Route principale
exp.get('/', function (req, res) {
    console.log('R�ponse � un client');
    res.sendFile(__dirname + '/www/index.html');
});

// Middleware de gestion des erreurs
exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});

// D�marrage du serveur
exp.listen(port, function () {
    console.log(`Serveur en �coute sur le port ${port}`);
});
