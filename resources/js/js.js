function start() {
    $("#inicio").hide()

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id='inimigo2' class='anima4'></div>")
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>")


    //Principais variáveis do jogo
    var jogo = {}

    //game loop
    //Chamando a função loop a cada 30milesegundos
    //setInterval é uma função temporizador que tem os parametros(nome da funçao, tempo em milesegundos)
    jogo.timer = setInternal(loop,30)

    // Inicio função loop
    function loop() {
        movefundo()
    }
    // Fim função loop

    //Função que movimenta o fundo do jogo
    function movefundo() {
        //ParseInt = Transforma uma string em numero inteiro
        // a posição inicial do fundoGame é zero por padão,
        //então, esquerda = 0
        esquerda = parseInt($("fundoGame").css("background-position"))
        //a posição do background vai ficar: 0(posição fundoGame) - 1(px)
        //o fundo vai andar 1px
        $("$fundoGame").css("background-position", esquerda-1)
    }
    //Fim da função que movimenta o fundo do jogo

}