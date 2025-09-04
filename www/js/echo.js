console.log("Hello World!");

var ipServeur = '172.17.50.139'; // Adresse IP du serveur WebSocket
var ws; // Variable globale pour la WebSocket

// Fonction appelée au chargement de la page
window.onload = function () {
    if (TesterLaCompatibilite()) {
        ConnexionAuServeurWebsocket();
    }
    ControleIHM();
};

// Vérifie si le navigateur supporte WebSocket
function TesterLaCompatibilite() {
    if (!('WebSocket' in window)) {
        window.alert('WebSocket non supporté par le navigateur');
        return false;
    }
    return true;
}

// Établit la connexion WebSocket avec le serveur
function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://' + ipServeur + '/echo');

    ws.onopen = function () {
        console.log('Connexion WebSocket établie');
    };

    ws.onmessage = function (evt) {
        document.getElementById('messageRecu').value = evt.data;
    };

    ws.onclose = function () {
        window.alert('Connexion WebSocket fermée');
    };
}

// Configure l’interface utilisateur (IHM)
function ControleIHM() {
    document.getElementById('Envoyer').onclick = BPEnvoyer;
}

// Fonction appelée lors du clic sur le bouton "Envoyer"
function BPEnvoyer() {
    const message = document.getElementById('messageEnvoi').value;
    ws.send(message);
}
