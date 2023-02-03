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
const salvaTentativa = []
const letrasUtilizadas = []

// selecionando uma dica e resposta no aleatório
let posicao = parseInt(Math.random() * respostas.length) // vou utilizar isso para sorteio de palavras depois
const respostaAdivinha = respostas[posicao]
const dica = dicas[posicao]

// pegando elementos do HTML para manipular
const textoResposta = document.querySelector('[data-resposta="resposta"]')
const dicaTexto = document.querySelector('[data-resposta="dica"]')
const textoInfo = document.querySelector('[data-resposta="info"]')
const textoUtilizadas = document.querySelector('[data-resposta="utilizadas"]')
const ativar = document.querySelector('[data-botao="ativar"]')


// preparando a página para receber os dados
dicaTexto.textContent = dica


const inserirDadosForca = () =>{
    for(let espacoTexto in respostaAdivinha){
        salvaTentativa[espacoTexto] = '_ '
        textoResposta.textContent += salvaTentativa[espacoTexto]
    }
    
}

const verificaLetraUtilizada = (letra) =>{

    if(letrasUtilizadas == ""){

        letrasUtilizadas.push(letra)
        textoUtilizadas.textContent = `Letras utilizadas: ${JSON.stringify(letrasUtilizadas)}`

    }else if(letrasUtilizadas.includes(letra)){

        textoInfo.innerHTML += `<span> Letra ${letra} já utilizada. / </span>`   

    }else{

        letrasUtilizadas.push(letra)
        textoUtilizadas.textContent = `Letras utilizadas: ${JSON.stringify(letrasUtilizadas)}`
    
    }
    
}

inserirDadosForca()

// evento de click para ler a letra/palavra
ativar.addEventListener('click', () => {
    
    // recebe a palavra digitada
    let palavraTentativa = document.querySelector('[data-tentativa="tentativa"]').value
    palavraTentativa = palavraTentativa.toLowerCase()
    console.log(palavraTentativa)
    
    // verifica se a palavra é igual a resposta certa
    if(palavraTentativa == respostaAdivinha){
        return textoResposta.textContent = `A resposta é ${respostaAdivinha}. Acertou de primeira!`
        
    }

    // reseta o texto
    textoInfo.innerHTML = ""

    // faz um loop for of de cada letra da palavra digitada para ver se está certo
    // vou criar depois uma função para deixar o laço de repetição separado, enviando a palavraTentativa
    for(let letraTentativa of palavraTentativa){
        
        // limpeza do textoResposta para inserir dados no loop
        textoResposta.textContent = ""
        
        // verifico se a letra já foi utilizada
        verificaLetraUtilizada(letraTentativa)    

        // laço para verificar se a letra está na resposta 
        for(let letraResposta in respostaAdivinha){
        
            if(letraTentativa == salvaTentativa[letraResposta]){

                // textoInfo.textContent = `a letra ${letraTentativa} já foi utilizada`
                textoResposta.textContent += `${salvaTentativa[letraResposta]}`

            }else if(letraTentativa == respostaAdivinha[letraResposta]){

                salvaTentativa[letraResposta] = letraTentativa
                textoResposta.textContent += `${salvaTentativa[letraResposta]}`

            }else{

                textoResposta.textContent += salvaTentativa[letraResposta]
            }
            
        }
        
        
    }

    // operador ternário para verificar se a resposta já está completa
    textoResposta.textContent == respostaAdivinha ? 
    textoResposta.textContent = `A resposta é ${respostaAdivinha}. Parabéns!` 
    : textoResposta.textContent = textoResposta.textContent
    
})




