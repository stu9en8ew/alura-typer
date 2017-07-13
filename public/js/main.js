// jQuery

// Criação de uma variável para armazenar o tempo inicial
var tempoInicial = $("#tempo-digitacao").text();

// Recuperando um campo com jQuery por classe do HTML
var campo = $(".campo-digitacao");



//$(documento.ready(function(){
$(function(){	
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	// Criação do evento click do botão para reiniciar o jogo
	$("#botao-reiniciar").click(reiniciaJogo);

	// Função para atualização do placar
	atualizaPlacar();

	// Invocando a chamada para o plugin do Selectize
	$("#usuarios").selectize({
	    create: true,
	    sortField: 'text'
	});

	// Invocando a chamada para o plugin do Tooltipster
	$(".tooltip").tooltipster({
		trigger: "custom"
	});

});




// Atualização do tamanho da frase
function atualizaTamanhoFrase(){

	// Pegando o texto com jQuery por classe de um elemento do HTML
	var frase = $(".frase").text(); 

	// Construindo um array considerando o " " como separador e contando o número de palavras.
	var numPalavras = frase.split(" ").length; 

	// Localizando no jQuery um elemento HTML por identificador
	var tamanhoPalavras = $("#tamanho-frase"); 

	// Atribuindo um valor para um elemento do HTML
	tamanhoPalavras.text(numPalavras); 

	// Printando no console a quantidade de palavras
	console.log(numPalavras);

}


// Inicialização de contadores
function inicializaContadores(){

	// Adicionando um evento ao campo
	campo.on("input", function(){

	// Recuperação do valor do campo Textarea
	var conteudo = campo.val();

	// Contagem do número de palavras
	var qtdPalavras = conteudo.split(/\S+/).length -1;
	
	// Atribuição da quantidade de palavras para o meu campo contador-palavras.
	$("#contador-palavras").text(qtdPalavras);

	// Contagem de caracteres
	var qtdCaracteres = conteudo.length;

	// Atribuição da quantidade de caracteres para o meu campo contador-caracteres.
	$("#contador-caracteres").text(qtdCaracteres);

	});

}

// Função para inicializar os marcadores, controlando a cor da borda do textarea
function inicializaMarcadores(){
	// Chamada o evento de input do textarea
	campo.on("input",function(){

	// Recuperamos a frase
	var frase = $(".frase").text();
	// Recuperação do valor digitado no textarea
	var digitado = campo.val();
	// Recuperação de um substring da frase com base no tamanho do que foi digitado pelo usuário
	var comparavel = frase.substring(0, digitado.length);

	if(digitado == comparavel){
		campo.addClass("borda-verde");
		campo.removeClass("borda-vermelha");
	}else{
		campo.addClass("borda-vermelha");
		campo.removeClass("borda-verde");
	}

	});

}






// Inicialização do cronômetro
function inicializaCronometro(){

	// A execução do evento ocorrerá uma única vez
	campo.one("focus",function(){

		// Pegando o texto de um spam com jQuery por ID
		var tempoRestante = $("#tempo-digitacao").text();


		// Setamos na variável cronometroID o retorno da função setInterval() do JavaScript que é um inteiro.
		// A função setInterval recebe como argumentos uma função anônima e um valor que representa qual o tempo em que
		// o intervalo será chamado

		// Desabilitar o campo de reinicio do jogo
		$("#botao-reiniciar").attr("disabled", true);


		var cronometroID = setInterval(function(){
			
			// Efetuo o decremento do tempoRestante de digitação do usuário
			tempoRestante--;
			
			// Atribuição do valor de tempo restante no DOM
			$("#tempo-digitacao").text(tempoRestante);

			
			// Verificação se o tempoRestante zerou
			if(tempoRestante < 1){

				// Chamada da função clearInterval do javaScript para limpar o intervalo.
				clearInterval(cronometroID);
				finalizaJogo();
				
			}

		}, 1000);

	});

}


// Função que manipula elementos do jogo para a sua finalização
function finalizaJogo(){
	// Execução do método attr fornecendo dois parâmetros: a propriedade do componente a ser manipulada no DOM e 
	// o seu respectivo valor
	campo.attr("disabled", true);
	// Habilito o botão para o reinicio do jogo
	$("#botao-reiniciar").removeAttr("disabled");
	// Usando a propriedade toggleClass para ativar e desativar um estilo
	campo.toggleClass("campo-desativado");
	// Chamada da função inserePlacar()
	inserePlacar();
}


// Remoção das linhas pré-definidas na tabela de placar
$(".botao-remover").click(function(){
	$(this).parent().parent().remove();
});
    



// Reinicio do Jogo
function reiniciaJogo(){
	// Habilitar o campo textarea para input de dados
	campo.attr("disabled", false);
	// Limpar o conteúdo do textarea
	campo.val("");
	// Zerar o contador de caracteres
	$("#contador-caracteres").text("0");
	// Zerar o contador de palavras
	$("#contador-palavras").text("0");
	// Redefinir o tempo inicial
	$("#tempo-digitacao").text(tempoInicial);
	// Chama a função que atribui o evento de focus ao campo textarea
	inicializaCronometro();
	// Usando a propriedade toggleClass para ativar e desativar um estilo
	campo.toggleClass("campo-desativado");
	// Remove a borda vermelha
	campo.removeClass("borda-vermelha");
	// Remove a borda verde
	campo.removeClass("borda-verde");

}

// Atualização do tempo de digitação
function atualizaTempoInicial(tempo){

	// Para o tempo de digitação continuar se o jogo for reiniciado
	tempoInicial = tempo;
	
	$("#tempo-digitacao").text(tempo);
}

