//definem-se as variáveis
var alien;
var teclado;
var fogo;
var plataforma = [ 1, 2 ]; //adiciona estrutura de listas para se referir as duas plataformas
var moeda;
var pontuacao = 0;
var placar;

function preload() {
    //carrega os assets do game
    this.load.image('background', 'assets/bg.png');
    this.load.image('player', 'assets/alienigena.png');
    this.load.image('turbo_nave', 'assets/turbo.png');
    this.load.image('plataforma_tijolo', 'assets/tijolos.png');
    this.load.image('moeda', 'assets/moeda.png');
}

function create() {
    // adiciona as imagens ao canvas
    this.add.image(larguraJogo/2, alturaJogo/2, 'background');

    //cria o alien, turbo e define que o alien colide com o fim do mapa
    fogo = this.add.image(0,0, 'turbo_nave');
    
    fogo.setVisible(false) //torna o fogo da nave inicialmente não-visível

    alien = this.physics.add.sprite(larguraJogo/2, 0, 'player'); //adiciona o sprite do alien com física
    alien.body.setSize(100, 100) //define o tamanho da caixa de colisão

    this.physics.world.setBounds(0, 0, 700, 780); //define os limites do mundo

    alien.setCollideWorldBounds(true); //adiciona colisão com os limites do canvas
    
    teclado = this.input.keyboard.createCursorKeys(); //adiciona input das setas do mouse
    
    plataforma[2] = this.physics.add.staticImage(larguraJogo/3, alturaJogo/1.3, 'plataforma_tijolo') //adiciona uma plataforma ao game
    this.physics.add.collider(alien, plataforma[2]) //define colisão entre a plataforma e o alien

    plataforma[1] = this.physics.add.staticImage(larguraJogo/1.5, alturaJogo/2.6, 'plataforma_tijolo'); //adiciona  a plataforma de tijolos que segue os padrões físicos
    this.physics.add.collider(alien, plataforma[1]); //adiciona colisão entre plataforma e o alien

    moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda'); //adiciona moeda ao jogo que segue as físicas do game
    moeda.setCollideWorldBounds(true); //adiciona colisão com os limites do canvas
    moeda.setBounce(0.7); //faz com que a moeda pule
    this.physics.add.collider(moeda, plataforma[2]); //adiciona colisão entre moeda e plataforma
    this.physics.add.collider(moeda, plataforma[1]) //adiciona colisão entre moeda e a segunda plataforma 

    placar = this.add.text(50, 50, 'Moedas:' + pontuacao, {fontSize: '45px', fill: '#000000'}); //adiciona placar ao game

    this.physics.add.overlap(alien, moeda, function(){ //verifica se os objetos estão sobrepostos e se sim executa a função
        moeda.setVisible(false); //faz a moeda desaparecer
        var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); //define a variável em um intervalo aleatório entre 50 e 650 pixels
        moeda.setPosition(posicaoMoeda_Y, 100); //muda a posição da moeda entre esse intervalo
        pontuacao +=1; //adiciona 1 à pontuação
        placar.setText('Moedas:' + pontuacao); //da display do número de pontos na tela
        moeda.setVisible(true); //torna a moeda visível novamente
    });
}
    //define eventos que ocorrem constatemente no game
function update() {

//movimentação do alien através das setas do teclado e ao acionar a tecla para cima define através da função a visibilidade do fogo

    if(teclado.left.isDown){
        alien.setVelocityX(-200); }
    
    else if(teclado.right.isDown){
        alien.setVelocityX(200);}
    
    else{alien.setVelocityX(0)}

    if(teclado.up.isDown) {
        alien.setVelocityY(-250); 
        ativarTurbo();
    }
    
    else{ semTurbo(); }

    fogo.setPosition(alien.x, alien.y + alien.height/2);

}

function ativarTurbo() {
    fogo.setVisible(true);
}

function semTurbo() {
    fogo.setVisible(false);
}