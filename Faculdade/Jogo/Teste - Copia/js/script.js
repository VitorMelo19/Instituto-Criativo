// Seleciona o elemento com a classe 'mario'
const mario = document.querySelector('.mario');

// Seleciona o elemento com a classe 'pipe'
const pipe = document.querySelector('.pipe');

// Função que faz o Mario pular
const jump = () => {
    // Adiciona a classe 'jump' ao Mario para iniciar a animação de pulo
    mario.classList.add('jump');

    // Remove a classe 'jump' após 500ms para que o Mario possa pular novamente
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// Função que verifica continuamente a posição do Mario e do cano
const loop = setInterval(() => {

    // Log para depuração
    console.log('loop)')

    // Obtém a posição atual do cano em relação à esquerda da tela
    const pipePosition = pipe.offsetLeft;

    // Obtém a posição atual do Mario em relação ao fundo da tela
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    // Log para depuração
    console.log(marioPosition);

    // Verifica se o Mario colidiu com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Para a animação do cano
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // Para a animação do Mario
        mario.style.animation = 'none';
        mario.style.bottom = `${pipePosition}px`;

        // Muda a imagem do Mario para 'game over'
        mario.src = './Imagens/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft ='50px'

        // Para o loop de verificação
        clearInterval(loop);
    }
}, 10);

// Adiciona um evento de teclado para fazer o Mario pular quando as teclas especificadas são pressionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === ' ') {
        jump();
    }
});