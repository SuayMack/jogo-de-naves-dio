const { parse } = require("path")

function start() {
    $("#inicio").hide()

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>")
    $("#fundoGame").append("<div id='inimigo2' class='anima4'></div>")
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>")
    $("#fundoGame").append("<div id='placar'></div>")
    $("#fundoGame").append("<div id='energia'></div>")



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
    var podeAtirar = true
    var fimdejogo = false
    //variaveis placar
    var pontos = 0
    var salvos = 0 
    var perdidos = 0
    var energiaAtual = 3
    
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
        colisao()
        placar()
        energia()
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
            disparo()
        }
    }//Fim função move jogador

    //Função move inimigo1
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left", posicaoX-velocidade)
        $("#inimigo1").css("top", posicaoY)
        if(posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334)
            $("#inimigo1").css("left", 694)
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

    //Função moveamigo
    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"))
        $("#amigo").css("left", posicaoX + 1)
        if (posicaoX > 906) {
            $("#amigo").css("left", 0)
        }
    }//Fim função moveamigo

    //Função disparo
    function disparo() {
        //podeAtirar
        if(podeAtirar == true){
            somDisparo.play()
            podeAtirar = false
            //local onde vai sair o tiro do helicóptero
            //posicao top
            topo = parseInt($("#jogador").css("top"))
            //posicao left
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 220
            topoTiro=topo + 37
            // ap
            $("#fundoGame").append("<div id = 'disparo'></div>")
            $("#disparo").css("top", topoTiro)
            $("#disparo").css("left", tiroX)

            var tempoDisparo = window.setInterval(executaDisparo, 30)
        }//Fecha podeAtirar

        //Função executaDisparo
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"))
            $("#disparo").css("left", posicaoX + 20
            )

            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo)
                tempoDisparo = null
                $("#disparo").remove()
                podeAtirar = true
            }
        }//Fecha função executaDisparo   

    } //Fecha disparo

    //Inicio da função colisão
    function colisao() {
        //colisao1 = Jogador com o inimigo1
        var colisao1 = ($("#jogador").collision($("#inimigo1")))    
        var colisao2 = ($("#jogador").collision($("#inimigo2")))
        var colisao3 = ($("#disparo").collision($("#inimigo1")))
        var colisao4 = ($("#disparo").collision($("#inimigo2")))
        var colisao5 = ($("#jogador").collision($("#amigo")))
        var colisao6 = ($("#inimigo2").collision($("#amigo")))
        
        var somDisparo = document.getElementById("somDisparo")
        var somExplosao = document.getElementById("somExplosao")
        var musica = document.getElementById("musica")
        var somGameover = document.getElementById("somGameover")
        var somPerdido = document.getElementById("somPerdido")
        var somResgate = document.getElementById("somResgate")

        //Música em loop
        //ended = fim da musica
        musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false)
        musica.play()

        //Se houver colisao do jogador com o inimigo1
        if(colisao1.length > 0) {
            somExplosao.play()
            energiaAtual--
            //Capturo a posição atual do inimigo1
            inimigo1X = parseInt($("#inimigo1").css("left"))
            inimigo1Y = parseInt($("#inimigo1").css("top"))

            //Função explosao1 com o valor da posição do inimigo1
            explosao1(inimigo1X, inimigo1Y)
            
            //Reposicionar o inimigo1 em outro lugar
            posicaoY = parseInt(Math.random() * 334)
            $("#inimigo1").css("left", 694)
            $("#inimigo1").css("top", posicaoY)            
        }
        
        //Se houver colisao do jogador com o inimigo2
        if(colisao2.length > 0) {
            energiaAtual--
            //Capturo a posição atual do inimigo2
            inimigo2X = parseInt($("#inimigo2").css("left"))
            inimigo2Y = parseInt($("#inimigo2").css("top"))

            //Função explosao2 com o valor da posição do inimigo2
            explosao2(inimigo2X, inimigo2Y)
            
            $("#inimigo2").remove()  

            // Aguardar um tempo para reposicionar o inimigo2
            reposicionaInimigo2()
        }

        //Se houver disparo do jogador com o inimigo1
        if(colisao3.length > 0) {
            velocidade = velocidade + 0.3
            pontos = pontos + 100
            //Capturo a posição atual do inimigo1
            inimigo1X = parseInt($("#inimigo1").css("left"))
            inimigo1Y = parseInt($("#inimigo1").css("top"))

            //Função explosao1 com o valor da posição do inimigo1
            explosao1(inimigo1X, inimigo1Y)
            
            $("#disparo").css("left", 950)

            //Reposicionar o inimigo1 em outro lugar
            posicaoY = parseInt(Math.random() * 334)
            $("#inimigo1").css("left", 694)
            $("#inimigo1").css("top", posicaoY) 
        }

        //Se houver disparo do jogador com o inimigo2
        if(colisao4.length > 0) {            
            pontos = pontos + 50
            //Capturo a posição atual do inimigo2
            inimigo2X = parseInt($("#inimigo2").css("left"))
            inimigo2Y = parseInt($("#inimigo2").css("top"))
            $("#inimigo2").remove()

            //Função explosao2 com o valor da posição do inimigo2
            explosao2(inimigo2X, inimigo2Y)
            
            $("#disparo").css("left", 950)

            // Aguardar um tempo para reposicionar o inimigo2
            reposicionaInimigo2()
        }

        //Se houver colisão jogador com amigo
        if (colisao5.length > 0) {
            salvos++
            somResgate.play()
            reposicionaAmigo()
            $("#amigo").remove()
        }

        //Se houver colisão inimigo2 com amigo
        if (colisao6.length > 0) {
            perdidos++
            amigoX = parseInt($("#amigo").css("left"))
            amigoY = parseInt($("#amigo").css("top"))
            explosao3(amigoX, amigoY)
            $("#amigo").remove()
            reposicionaAmigo()
        }
        
    }//Fim da função colisão

    //Inicio função Explosão1
    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play()
        //Cria uma div explosao
        $("#fundoGame").append("<div id= 'explosao1'></div>")
        //Imagem da div explosao
        $("#explosao1").css("background-image", "url(/resources/img/explosao.png)")
        var div = $("#explosao1")
        //Cria a div explosao no lugar do inimigo1
        div.css("top", inimigo1Y)
        div.css("left", inimigo1X)
        //Animação da div
        div.animate({width:200, opacity:0}, "slow")

        var tempoExplosao = window.setInterval(removeExplosao, 1000)
        function removeExplosao() {
            div.remove()
            window.clearInterval(tempoExplosao)
            tempoExplosao = null
        }
    }//Fim função Explosão1

    //Inicio função Explosão2
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play()
        //Cria uma div explosao
        $("#fundoGame").append("<div id= 'explosao2'></div>")
        //Imagem da div explosao
        $("#explosao2").css("background-image", "url(/resources/img/explosao.png)")
        var div2 = $("#explosao2")
        //Cria a div explosao no lugar do inimigo2
        div2.css("top", inimigo2Y)
        div2.css("left", inimigo2X)
        //Animação da div
        div2.animate({width:200, opacity:0}, "slow")

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000)
        function removeExplosao2() {
            div2.remove()
            window.clearInterval(tempoExplosao2)
            tempoExplosao2 = null
        }
    }//Fim função Explosão2

    //Inicio função Explosão3
    function explosao3(amigoX, amigoY) {
        somPerdido.play()
        $("#fundoGame").append("<div id = 'explosao3' class = 'anima5'></div>")
        $("#explosao3").css("top", amigoY)
        $("#explosao3").css("left", amigoX)
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000)
        function resetaExplosao3() {
            $("#explosao3").remove()
            window.clearInterval(tempoExplosao3)
            tempoExplosao3 = null        }
    }//Fim função Explosão3
    
    //Reposiciona inimigo2
    function reposicionaInimigo2() {
        //variavel para dar um tempo (5 segundos)
        var tempoColisao4 = window.setInterval(reposiciona4, 3000)
        //apos 5 segundos remove a função de tempo e zera a variável
        function reposiciona4() {
            window.clearInterval(tempoColisao4)
            tempoColisao4 = null
            //só recriar a div se o jogo não estiver terminado
            if(fimdejogo == false){
                $("#fundoGame").append("<div id = inimigo2></div>")
            }
        }
    }//Fim reposiciona inimigo2

    //Inicio função reposicionaAmigo
    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 5000)
        function reposiciona6() {
            window.clearInterval(tempoAmigo)
            tempoAmigo = null
            if (fimdejogo == false) {
                $("#fundoGame").append("<div id = 'amigo' class = 'anima3'></div>")
            }
        }
    }//Fim função reposicionaAmigo

    //Função placar
    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>")
    }//Fim da função placar

    function energia() {
        if (energiaAtual == 3) {
            //Será exibido na div energia um background-image que estpa na url...
            $("#energia").css("background-image", "url(/resources/img/energia3.png)")
        }
        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(/resources/img/energia2.png)")
        }
        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(/resources/img/energia1.png)")
        }
        if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(/resources/img/energia0.png)")
            //Game Over
        }
    }

}//Fim da função start