// jogo da forca

// primeiro registrando dados
const respostas = ['bolo', 'guaraná', 'sorvete', 'macarrão', 'pizza', 'arroz']
const dicas = [
    'doce de festa', 
    'fruta usada em refrescos', 
    'doce bom para o verão', 
    'comida italiana feita com muito molho', 
    'Em São Paulo, é proibido botar ketchup',
    'Faz parte do almoço/jantar brasileiro'
]
let salvaTentativa = []
let letrasUtilizadas = []
let primeiraTentativa = true

// selecionando uma dica e resposta no aleatório
let posicao = parseInt(Math.random() * respostas.length) // vou utilizar isso para sorteio de palavras depois
let respostaAdivinha = respostas[posicao]
let dica = dicas[posicao]
let contadorErros = 0
let identificadorAcerto = 0
let valorAtualAcertos = 0

// pegando elementos do HTML para manipular
const textoResposta = document.querySelector('[data-resposta="resposta"]')
const dicaTexto = document.querySelector('[data-resposta="dica"]')
const textoInfo = document.querySelector('[data-resposta="info"]')
const textoUtilizadas = document.querySelector('[data-resposta="utilizadas"]')
const ativar = document.querySelector('[data-botao="ativar"]')
const mensagemResposta = document.querySelector('[data-resposta="mensagemResposta"]')
const caixaPalavraTentativa = document.querySelector('[data-tentativa="tentativa"]')
const novoJogo = document.querySelector('[data-botao="novo-jogo"]')
const contadorTexto = document.querySelector('[data-tentativa="contador"]')
const entradaTentativa = document.querySelector('[data-tentativa="tentativa"]')


// preparando a página para receber os dados
dicaTexto.textContent = dica
contadorTexto.textContent = `Contador de erros: ${contadorErros}/5`
caixaPalavraTentativa.maxLength = respostaAdivinha.length


const inserirDadosForca = () => {
    salvaTentativa = []
    textoResposta.textContent = ""
    
    for(let espacoTexto in respostaAdivinha){
        salvaTentativa[espacoTexto] = '_ '
    }
    textoResposta.textContent = "_ ".repeat(respostaAdivinha.length)
    
}

const verificaLetraUtilizada = (letra) => {

    if(!letrasUtilizadas.includes(letra)) {
        letrasUtilizadas.push(letra);
        textoUtilizadas.textContent = `Letras utilizadas: ${letrasUtilizadas.join(", ").toUpperCase()}`;
    } else if(!textoInfo.innerHTML.includes(`<span> Letra ${letra.toUpperCase()} já utilizada. / </span>`)){
        textoInfo.innerHTML += `<span> Letra ${letra.toUpperCase()} já utilizada. / </span>`;

    }
    
}

const jogoForca = () => {

    // recebe a palavra digitada
    let palavraTentativa = caixaPalavraTentativa.value
    palavraTentativa = palavraTentativa.toLowerCase()
    
    
    // verifica se a palavra é igual a resposta certa
    if(palavraTentativa == respostaAdivinha && primeiraTentativa){
        textoResposta.textContent = respostaAdivinha
        caixaPalavraTentativa.value = ""
        return mensagemResposta.textContent = `A resposta é ${respostaAdivinha}. Acertou de primeira!`
        
    }

    // reseta o texto
    textoInfo.innerHTML = ""
    textoResposta.textContent = ""
    

    // vou criar depois uma função para deixar o laço de repetição separado, enviando a palavraTentativa
    for(let letraTentativa of palavraTentativa){
        verificaLetraUtilizada(letraTentativa);   
        //enviar(letraTentativa)
        
        for(let letraResposta in respostaAdivinha){
            if(letraTentativa == respostaAdivinha[letraResposta]){
                salvaTentativa[letraResposta] = letraTentativa;
                identificadorAcerto++;
            }  
        } 
    }
    textoResposta.textContent = salvaTentativa.join("");

    // console.log(salvaTentativa)
    // operador ternário para verificar se a resposta já está completa
    textoResposta.textContent == respostaAdivinha ? 
        mensagemResposta.textContent = `A resposta é ${respostaAdivinha}. Parabéns!` : 
        textoResposta.textContent = textoResposta.textContent
    ;
    

    if(identificadorAcerto <= valorAtualAcertos){
        contadorErros++;
        contadorTexto.textContent = `Contador de erros: ${contadorErros}/5`
    };
    if (contadorErros == 5){
        mensagemResposta.textContent = `Sinto muito, a resposta era ${respostaAdivinha}.`
    };

    valorAtualAcertos = identificadorAcerto
    // console.log(valorAtualAcertos)
    primeiraTentativa = false
    caixaPalavraTentativa.value = ""
}

const resetaJogo = () => {

    primeiraTentativa = true

    posicao = parseInt(Math.random() * respostas.length)
    respostaAdivinha = respostas[posicao]
    dica = dicas[posicao]
    
    caixaPalavraTentativa.value = "";
    caixaPalavraTentativa.maxLength = respostaAdivinha.length;

    dicaTexto.textContent = dica;
    inserirDadosForca();
    letrasUtilizadas = [];
    mensagemResposta.textContent = "";
    textoUtilizadas.textContent = "";
    textoInfo.innerHTML = "";
    contadorErros = 0;
    contadorTexto.textContent = `Contador de erros: ${contadorErros}/5`;
    identificadorAcerto = 0;
    valorAtualAcertos = 0;

}


// Chamando as funções e eventos
inserirDadosForca()
ativar.addEventListener('click', () => {
    if(textoResposta.textContent != respostaAdivinha
        && caixaPalavraTentativa.value != ""
        && contadorErros < 5) {
        jogoForca()
    }
    
})

caixaPalavraTentativa.addEventListener('keypress', (evento) => {
    
    if(evento.key == 'Enter' 
    && textoResposta.textContent != respostaAdivinha
    && caixaPalavraTentativa.value != "" 
    && contadorErros < 5) {
        jogoForca()
    }

})


novoJogo.addEventListener('click', () => resetaJogo())


