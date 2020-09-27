function start() {
    $("#inicio").hide()

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id='inimigo2' class='anima4'></div>")
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>")


    //Principais variáveis do jogo
    var jogo = {}
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    var velocidade = 5;
    //O inimigo terá uma posicao entre 0 e 334 na tela (funcao random: Math.random())
    var posicaoY = parseInt(Math.random() *334)

    //Define se o jogador pressionou ou não alguma tecla
    jogo.pressionou = []
    //Verifica se o usuário pressionou alguma tecla
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true
    })
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false
    })

    //Game loop
    //Chamando a função loop a cada 30milesegundos
    //setInterval é uma função temporizador que tem os parametros(nome da funçao, tempo em milesegundos)
    jogo.timer = setInterval(loop,30)

    // Inicio função loop
    function loop() {
        movefundo()
        movejogador()
        moveinimigo1()
        moveinimigo2()
        moveamigo()
    }// Fim função loop
    //Função que movimenta o fundo do jogo
    function movefundo() {
        //ParseInt = Transforma uma string em numero inteiro
        // a posição inicial do fundoGame é zero por padão,
        //então, esquerda = 0
        esquerda = parseInt($("#fundoGame").css("background-position"))
        //a posição do background vai ficar: 0(posição fundoGame) - 1(px)
        //o fundo vai andar 1px
        $("#fundoGame").css("background-position", esquerda-1)
    }//Fim da função que movimenta o fundo do jogo    
    
    //Função move jogador
    function movejogador() {
        if(jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"))
            $("#jogador").css("top", topo-10)
            if(topo <= 0){
                $("#jogador").css("top", topo+10)
            }
        }
        if(jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"))
            $("#jogador").css("top", topo+10)
            if(topo >= 540){
            $("#jogador").css("top", topo-10)
            }
        }
        if(jogo.pressionou[TECLA.D]) {
            //Chama função disparo
        }
    }//Fim função move jogador

    //Função move inimigo1
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left", posicaoX - velocidade)
        $("#inimigo1").css("top", posicaoY)
        if(posicaoX <= 0) {
            posicaoY = parseInt(Math.random() *334)
            $("#inimigo1").css("left", 735)
            $("#inimigo1").css("top", posicaoY)
        }
    }//Fim função move inimigo1

    //Função move inimigo2
    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"))
        $("#inimigo2").css("left", posicaoX - 3)
        if(posicaoX <= 0) {
            $("#inimigo2").css("left", 850)
        }
    }//Fim função move inimigo2

    function moveamigo() {
        posicaoX = parseInt($("$amigo").css("left"))
        $("#amigo").css("left", posicaoX + 1)
        if (condition) {
            
        }
    }

}//Fim da função start