let usuario = {};
let mensagensNaoTratadas = [];
let mensagens = [];
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
    mensagensNaoTratadas = res.data;
    renderizandoMensagem();
};

setInterval(function () {
    axios
        .post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
}, 5000);

setInterval(function () {
    mensagens = [];
    processarMensagens();
}, 3000);

function gerandoMensagem(mensagens) {
    const mensagemPostada = document.createElement('div');
    const tempo = document.createElement('div');
    const tempoP = document.createElement('p'); 
    const status = document.createElement('div');
    const statusP = document.createElement('p'); 
    const texto = document.createElement('div');
    const textoP = document.createElement('p'); 

    if(mensagens.type === "status") {
        mensagemPostada.classList.add("entrouSaiu","mensagemPostada");
        statusP.innerHTML = `<b>${mensagens.from}</b>`;
    } else if(mensagens.type === "message") {
        mensagemPostada.classList.add("normais","mensagemPostada");
        statusP.innerHTML = `<b>${mensagens.from}</b> para <b>${mensagens.to}:</b>`;
    } else {
        mensagemPostada.classList.add("reservadas","mensagemPostada");
        statusP.innerHTML = `<b>${mensagens.from}</b> para <b>${mensagens.to}:</b>`;
    };
    tempo.className = 'tempo'; 
    status.className = 'status'; 
    texto.className = 'texto'; 

    tempoP.innerHTML = mensagens.time;
    textoP.innerHTML = mensagens.text;

    tempo.appendChild(tempoP);
    status.appendChild(statusP);
    texto.appendChild(textoP);
    mensagemPostada.appendChild(tempo);
    mensagemPostada.appendChild(status);
    mensagemPostada.appendChild(texto);

    mensagemPostada.setAttribute('data-test', "message");

    return mensagemPostada;
};

function renderizandoMensagem() {
    
    mensagens = mensagensNaoTratadas.filter(tratar); 

    mensagens.forEach(function(mensagens) {
        const mensagemRenderizada = gerandoMensagem(mensagens);
        sectionMSG.appendChild(mensagemRenderizada);
        sectionMSG.lastElementChild.scrollIntoView()
    });
};

function tratar (mensagensNaoTratadas) {
	if (mensagensNaoTratadas.to === "Todos" ||mensagensNaoTratadas.to === usuario.name) {
		return true;
	}
};

renderizandoMensagem() 

function enviarMensagem() {
    const textoDigitada = document.querySelector('#mensagemDigitada')
    let texto = textoDigitada. value;
    const aMensagem = {
        from: usuario.name,
        to: "Todos",
        text: texto,
        type: "message"
    };
    

    axios
        .post('https://mock-api.driven.com.br/api/v6/uol/messages', aMensagem)
        .then(function() {
        mensagens = [];
        processarMensagens();
        })
        .catch(function () {
            window.location.reload()
        });
};