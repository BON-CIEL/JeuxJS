'use strict';

const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
expressWs(app); // Initialise WebSocket sur l'application Express

const PORT = 80;

// Servir les fichiers statiques depuis le dossier 'www'
app.use(express.static(path.join(__dirname, 'www')));

// Route principale
app.get('/', (req, res) => {
    console.log('Réponse à un client');
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// WebSocket /echo
app.ws('/echo', (ws, req) => {
    const ip = req.socket.remoteAddress;
    const port = req.socket.remotePort;

    console.log(`Connexion WebSocket depuis ${ip}:${port}`);

    ws.on('message', (message) => {
        console.log(`Message reçu de ${ip}:${port} : ${message}`);
        ws.send(message); // renvoie le message au client
    });

    ws.on('close', () => {
        console.log(`Déconnexion WebSocket de ${ip}:${port}`);
    });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur Express');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur Express + WebSocket en écoute sur le port ${PORT}`);
});
