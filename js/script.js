/*=======================Consts Settings=======================*/

var mario = document.querySelector('.mario'); //pegando a classe que contem a imagem do mario
var pipe = document.querySelector('.pipe'); //pegando a classe que contem a imagem do pipe
var clouds = document.querySelector('.clouds'); //pegando a classe que contem a imagem das clouds
var text = document.querySelector('.start'); //pegando a classe que contem o texto
var button = document.querySelector('.button-invisivel'); //pegando a classe que contem o botão
var audioJump = document.querySelector('.audiojump'); //pegando a classe que contem o audio do pulo
var gameOver = document.querySelector('.gameover'); //pegando a classe que contem o audio de derrota
var score = document.querySelector('.score');

var count = 0;
/*=============================================================*/

/*========================Jump Settings========================*/

//definindo uma constante que aplica um (função) de adicionar a classe 'jump'
const jump = () =>{
    mario.classList.add('jump'); //adicionando a classe de pular na imagem do mario

    audioJump.currentTime = 0.1; //definindo o tempo do audio
    audioJump.volume = 0.1; //definindo o volume do audio
    audioJump.play(); //rodar o audio quando pular
    
    setTimeout(removeClass,500); //removendo a classe depois de 500 milisegundos
}

//definindo uma constante que aplica um (função) de remover a classe 'jump'
const removeClass = () =>{
    mario.classList.remove('jump');
}
/*=============================================================*/

/*========================Loop Settings========================*/

//looping para verificar se o jogador perdeu, com uma função anonima na função 'setInterval'
const loop = setInterval(() =>{
    const cloudsPosition = clouds.offsetLeft; //pegando o deslocamento esquerdo das clouds
    const pipePosition = pipe.offsetLeft; //pegando o deslocamento esquerdo do pipe

    //pegando qualquer propriedade css que estaja aplicada ao 'parametro', serve como um objeto css
    //usando a função 'replace' para tirar o px do final e converter para numero com o '+'
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');
    
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        
        clouds.style.animation = 'none'; //tirando toda a animação
        clouds.style.left = `${cloudsPosition}px`; //definindo o ponto de parada que é onde ta o deslocamento

        pipe.style.animation = 'none'; //tirando toda a animação
        pipe.style.left = `${pipePosition}px`; //definindo o ponto de parada que é onde ta o deslocamento

        mario.style.animation = 'none'; //tirando toda a animação
        mario.style.bottom = `${marioPosition}px` //definindo o ponto de parada, onde ta o deslocamento do bottom
        
        mario.src = './assets/game-over.png'; //mundando o link do 'src' quando o jogador perder
        mario.style.width = '75px'; //formatando o tamanho da nova 'imagem' do src
        mario.style.marginLeft = '50px'; //definindo a margin da esquerda da nova 'imagem' do src

        text.textContent = 'GAME OVER' //adicionando a palavra 'GAME OVER'
        text.classList.add('start-gameover'); // adicionando alguns estilos a palavra

        gameOver.currentTime = 0.1; //definindo o tempo do audio
        gameOver.volume = 0.2; //definindo o volume do audio
        gameOver.play(); //rodar o audio quando perder

        button.classList.add('button'); //adicionando o botão visivel
        button.classList.remove('button-invisivel'); //removendo o botão invisivel
        

        clearInterval(loop); //limpando o intervalo quando o jogador perder

    }
    count++;
    score.innerHTML = `SCORE: ${count}`;
    
},10) //definindo a função e o intervalo de tempo dela
/*=============================================================*/

/*===========================Keydown===========================*/

//adicionando um escutador, quando pressionar alguma 'tecla'
document.addEventListener('keydown',jump);

function jumpAgain(){
    window.location.reload(true); //função para resetar a window 'janela'
}
/*=============================================================*/