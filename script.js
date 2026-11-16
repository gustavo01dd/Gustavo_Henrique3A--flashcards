// ==============================================
//  CONFERE AÍ - Flashcards de mito ou verdade
// ==============================================

// ----- 1. DADOS DOS CARTÕES -----
// Para criar um cartão novo é só copiar um bloco e mudar os textos.
// resposta: "mito" ou "verdade"
const cartoes = [
    {
        emoji: "🕵️",
        afirmacao: "O modo anônimo do navegador deixa você invisível na internet.",
        resposta: "mito",
        explicacao: "Ele só evita salvar o histórico no aparelho. Os sites e o provedor de internet ainda podem ver o que você acessa."
    },
    {
        emoji: "🔋",
        afirmacao: "Fechar todos os aplicativos abertos faz a bateria durar mais.",
        resposta: "mito",
        explicacao: "Na maioria dos celulares atuais o sistema já controla isso. Abrir tudo do zero de novo costuma gastar mais bateria."
    },
    {
        emoji: "🔑",
        afirmacao: "Uma senha longa, feita com uma frase, é mais segura que uma curta cheia de símbolos.",
        resposta: "verdade",
        explicacao: "Quanto maior a senha, mais difícil ela é de descobrir. Frases são fáceis de lembrar e difíceis de adivinhar."
    },
    {
        emoji: "🍎",
        afirmacao: "Computadores Mac e Linux não pegam vírus.",
        resposta: "mito",
        explicacao: "Eles têm menos ataques, mas vírus e golpes existem em qualquer sistema, inclusive no celular."
    },
    {
        emoji: "📶",
        afirmacao: "Usar o Wi-Fi aberto de uma praça é seguro para acessar o banco.",
        resposta: "mito",
        explicacao: "Redes abertas podem ser espionadas ou ser falsas. Para o banco, prefira os dados móveis do seu plano."
    },
    {
        emoji: "🔄",
        afirmacao: "Reiniciar o celular de vez em quando pode ajudar a resolver lentidão.",
        resposta: "verdade",
        explicacao: "Reiniciar limpa a memória e fecha processos travados, e muitas vezes resolve pequenos problemas."
    },
    {
        emoji: "🔁",
        afirmacao: "Usar a mesma senha em vários sites é perigoso.",
        resposta: "verdade",
        explicacao: "Se um site vazar sua senha, golpistas tentam a mesma senha em outros lugares. Use uma senha para cada conta."
    },
    {
        emoji: "⚠️",
        afirmacao: "Aquele aviso na tela dizendo “seu celular está infectado!” é sempre verdadeiro.",
        resposta: "mito",
        explicacao: "É um truque para você clicar ou instalar algo perigoso. Feche a página e não toque no aviso."
    }
];

// ----- 2. ELEMENTOS DA PÁGINA -----
const areaCartoes = document.getElementById("cartoes");
const spanContador = document.getElementById("contador");
const spanTotal = document.getElementById("total");
const mensagemFinal = document.getElementById("mensagem-final");
const btnEmbaralhar = document.getElementById("btnEmbaralhar");
const btnReiniciar = document.getElementById("btnReiniciar");

// Guarda a ordem em que os cartões estão aparecendo
let ordemAtual = cartoes;

// ----- 3. FUNÇÕES -----

// Cria um elemento HTML já com classe e texto
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    if (texto) {
        elemento.textContent = texto;
    }
    return elemento;
}

// Texto que aparece no "selo" do verso do cartão
function textoDoSelo(dados) {
    return dados.resposta === "mito" ? "❌ É MITO" : "✅ É VERDADE";
}

// Monta um cartão (botão com frente e verso)
function criarCartao(dados) {
    const botao = criarElemento("button", "cartao");
    botao.type = "button";
    botao.setAttribute("aria-pressed", "false");
    botao.setAttribute("aria-label", "Cartão: " + dados.afirmacao + " Clique para ver a resposta.");

    const interno = criarElemento("span", "cartao-interno");

    // Frente: a afirmação
    const frente = criarElemento("span", "cartao-frente");
    frente.appendChild(criarElemento("span", "cartao-emoji", dados.emoji));
    frente.appendChild(criarElemento("span", "cartao-texto", dados.afirmacao));
    frente.appendChild(criarElemento("span", "cartao-dica", "Clique para virar ↻"));

    // Verso: a resposta
    const verso = criarElemento("span", "cartao-verso");
    const classeSelo = dados.resposta === "mito" ? "selo selo-mito" : "selo selo-verdade";
    verso.appendChild(criarElemento("span", classeSelo, textoDoSelo(dados)));
    verso.appendChild(criarElemento("span", "cartao-texto", dados.explicacao));

    interno.appendChild(frente);
    interno.appendChild(verso);
    botao.appendChild(interno);

    botao.addEventListener("click", function () {
        virarCartao(botao, dados);
    });

    return botao;
}

// Vira (ou desvira) um cartão
function virarCartao(botao, dados) {
    const virado = botao.classList.toggle("virado");
    botao.setAttribute("aria-pressed", virado);

    // Atualiza o texto lido por leitores de tela
    if (virado) {
        botao.setAttribute("aria-label", "Resposta: " + textoDoSelo(dados) + ". " + dados.explicacao);
    } else {
        botao.setAttribute("aria-label", "Cartão: " + dados.afirmacao + " Clique para ver a resposta.");
    }

    atualizarPlacar();
}

// Conta quantos cartões estão virados
function atualizarPlacar() {
    const virados = document.querySelectorAll(".cartao.virado").length;

    spanContador.textContent = virados;
    spanTotal.textContent = cartoes.length;

    if (virados === cartoes.length) {
        mensagemFinal.textContent = "🎉 Parabéns! Você virou todos os cartões!";
    } else {
        mensagemFinal.textContent = "";
    }
}

// Desenha todos os cartões na tela
function mostrarCartoes(lista) {
    areaCartoes.innerHTML = "";

    lista.forEach(function (dados) {
        areaCartoes.appendChild(criarCartao(dados));
    });

    atualizarPlacar();
}

// Embaralha uma lista (sem mexer na original)
function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// ----- 4. BOTÕES -----
btnEmbaralhar.addEventListener("click", function () {
    ordemAtual = embaralhar(cartoes);
    mostrarCartoes(ordemAtual);
});

btnReiniciar.addEventListener("click", function () {
    mostrarCartoes(ordemAtual);
});

// ----- 5. COMEÇAR -----
mostrarCartoes(ordemAtual);
