let usuario = {};
let mensagens = {};

function nomeUsuario() {
    let nome = "Digite seu nome"
    usuario.name = prompt(nome)
};

nomeUsuario();

axios
    .post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
    .then(processarMensagens)
    .catch(nomeUsuario);

function processarMensagens() {
	axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(recebeMensagens)
};

function recebeMensagens(res) {
    mensagens = res.data
};

setInterval(function () {
    axios
        .post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
}, 5000)
