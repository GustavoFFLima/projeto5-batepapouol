let usuario = {};
let mensagens = [];
let mensagensTratadas = [];
const sectionMSG = document.querySelector('.sectionMSG');

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
    mensagens = res.data;
    renderizandoMensagem();
};

setInterval(function () {
    axios
        .post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
}, 5000)

function gerandoMensagem(mensagens) {
    const mensagemPostada = document.createElement('div');
    const tempo = document.createElement('div');
    const tempoP = document.createElement('p'); 
    const status = document.createElement('div');
    const statusP = document.createElement('p'); 
    const texto = document.createElement('div');
    const textoP = document.createElement('p'); 

    mensagemPostada.className = 'mensagemPostada';
    tempo.className = 'tempo'; 
    status.className = 'status'; 
    texto.className = 'texto'; 

    tempoP.innerHTML = mensagens.time;
    statusP.innerHTML = `${mensagens.from} para ${mensagens.to}:`;
    textoP.innerHTML = mensagens.text;

    tempo.appendChild(tempoP);
    status.appendChild(statusP);
    texto.appendChild(textoP);
    mensagemPostada.appendChild(tempo);
    mensagemPostada.appendChild(status);
    mensagemPostada.appendChild(texto);

    return mensagemPostada;
};

function renderizandoMensagem() {
    
    mensagens.forEach(function(mensagens) {
        const mensagemRenderizada = gerandoMensagem(mensagens);
        sectionMSG.appendChild(mensagemRenderizada);
    });
};
renderizandoMensagem() 