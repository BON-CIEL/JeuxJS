console.log("Hello World!");

var ipServeur = '172.17.50.139'; // Adresse IP du serveur WebSocket
var ws; // Variable globale pour la WebSocket

// Fonction appel�e au chargement de la page
window.onload = function () {
    if (TesterLaCompatibilite()) {
        ConnexionAuServeurWebsocket();
    }
    ControleIHM();
};

// V�rifie si le navigateur supporte WebSocket
function TesterLaCompatibilite() {
    if (!('WebSocket' in window)) {
        window.alert('WebSocket non support� par le navigateur');
        return false;
    }
    return true;
}

// �tablit la connexion WebSocket avec le serveur
function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://' + ipServeur + '/echo');

    ws.onopen = function () {
        console.log('Connexion WebSocket �tablie');
    };

    ws.onmessage = function (evt) {
        document.getElementById('messageRecu').value = evt.data;
    };

    ws.onclose = function () {
        window.alert('Connexion WebSocket ferm�e');
    };
}

// Configure l�interface utilisateur (IHM)
function ControleIHM() {
    document.getElementById('Envoyer').onclick = BPEnvoyer;
}

// Fonction appel�e lors du clic sur le bouton "Envoyer"
function BPEnvoyer() {
    const message = document.getElementById('messageEnvoi').value;
    ws.send(message);
}
