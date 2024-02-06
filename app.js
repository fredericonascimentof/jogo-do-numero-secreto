// Variáveis globais
let listaDeNumeroSorteados = [];
const numeroLimite = 200;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto na tela com suporte a voz
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 200');
}

// Chama a função para exibir a mensagem inicial ao carregar a página
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    const chute = parseInt(document.querySelector('input').value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    const numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;

    if (listaDeNumeroSorteados.length === numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de input
function limparCampo() {
    document.querySelector('input').value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
