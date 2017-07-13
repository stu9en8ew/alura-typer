// Função para inserir valores na tabela de placar
function inserePlacar(){

	// Recupera a section do HTML com jQuery por classe
	var placar = $(".placar");
	// Executa o método do jquery chamado find para pegar os elementos filhos
	var corpoTabela = placar.find("tbody");
	// Cria uma variável para guardar o nome do usuário do jogo
	//var usuario = "Márcio";
	var usuario = $("#usuarios").val();

	// Cria uma variável para armazenar o número de palavras digitadas pelo usuário
	var numPalavras = $("#contador-palavras").text();
	
	// Criando um botão para remover elementos
	//var botaoRemover = "<a href='#' class=''><i class='small material-icons'>delete</i></a>";

	// Montagem de uma nova linha dinamicamente para ser inserida na tabela do jogo com jQuery
	var linha = novaLinha(usuario,numPalavras);
	linha.find(".botao-remover").click(removeLinha);


	// Montagem de uma nova linha para ser inserida na tabela do jogo
	//var linha = "<tr>"+
					//"<td>"+usuario+"</td>"+
					//"<td>"+numPalavras+"</td>"+
					//"<td>"+botaoRemover+"</td>"+
				//"</tr>";

	// Inserção de uma nova linha na tabela com a função do jQuery chamada append
	//corpoTabela.append(linha);
	
	// Inserção de uma nova linha na tabela com a função do jQuery chamada prepend
	corpoTabela.prepend(linha);

	// Nova Linha
	$(".placar").slideDown(500);
	scrollPlacar();

}


// Criando um objeto HTML dinamicamente com jQuery
function novaLinha(usuario,numPalavras){
	// Criação da tag <tr>
	var linha = $("<tr>");
	// Criação da tag td com texto do usuário
	var colunaUsuario = $("<td>").text(usuario);
	// Criação da tag td com texto do número de palavras
	var colunaPalavras = $("<td>").text(numPalavras);
	// Criação da tag td de remoção
	var colunaRemover = $("<td>");
	// Criação da tag a com atributo href e classe
	var link = $("<a>").addClass("botao-remover").attr("href","#");
	// Criação da tag i com classes css
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	// Efetuo a inclusão da tag i dentro da tag a
	link.append(icone);
	// Efetua a inclução da tag a dentro da tag td de remoção
	colunaRemover.append(link);
	// Efetuo a inclusão da tag td do usuário na tag tr
	linha.append(colunaUsuario);
	// Efetuo a inclusão da tag td do número de palavras na tag tr
	linha.append(colunaPalavras);
	// Efetuo a inclusão da tag td do link de remoção na tag tr
	linha.append(colunaRemover);

	return linha;
}


// Função genérica para a remoção de linha
function removeLinha(event){
	event.preventDefault();

	//$(this).parent().parent().remove();

	// Efetuando a remoção de modo suave
	var linha = $(this).parent().parent();

	// Efetuando o fadeOut
	linha.fadeOut(1000);

	// Efetuando a remoção após 1s
	 linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
	
}


// Função para controlar a exibição do placar com animações
$("#botao-placar").click(mostraPlacar);


function mostraPlacar(){
	
	//$(".placar").css("display", "block");
	//$(".placar").show();
	//$(".placar").toggle();
	//$(".placar").slideDown();
	//$(".placar").slideDown(600);
	//$(".placar").slideUp(600);
	$(".placar").stop().slideToggle(600);


}


// Função que realiza o scroll do placar
function scrollPlacar(){

	 var posicaoPlacar = $(".placar").offset().top;

	 $("body").animate(
	 {

	 	scrollTop: posicaoPlacar + "px"

	 },1000);
}


// Acionamento do botão para sincronizar o placar
$("#botao-sync").click(sincronizaPlacar);

function sincronizaPlacar(){

	// Criação de um array
	var placar = [];

	// Buscando as linhas do placar com seletores avançados de CSS
	var linhas = $("tbody>tr");

	// Percorrendo as linhas com $.each
	linhas.each(function(){
		
		// Buscando nos filhos com seletores avançados de CSS
		var usuario = $(this).find("td:nth-child(1)").text();
		
		// Buscando nos filhos com seletores avançados de CSS
		var palavras = $(this).find("td:nth-child(2)").text();


		// Montando um array de objetos com dois elementos (usuarios e pontos)
		var score = {

			usuario: usuario,
			pontos: palavras

		};


		// Inserindo o objeto score dentro do array placar
		placar.push(score);

	});

	// Construir um objeto dados com o array placar para enviar na requisição
	var dados = {
		placar : placar
	};

	// Realizando um POST com AJAX usando a função $.post do jQuery
	$.post("http://localhost:3000/placar", dados, function(){

		// Registrando uma mensagem de sucesso na função de conclusão de $.post
		console.log("Placar sincronizado com sucesso.")

		// Invocando o tooltip de forma programaticamente para o usuário
		$(".tooltip").tooltipster("open");

	}).fail(function(){
		// Exibindo uma mensagem personalizada quando ocorrer um erro de execução
		$(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");

	}).always(function(){
		setTimeout(function(){
			// Escondendo a mensagem depois de um tempo de exibição
			$(".tooltip").tooltipster("close");
		}, 1200);
	});


}


function atualizaPlacar(){

	$.get("http://localhost:3000/placar", function(data){

		$(data).each(function(){

			var linha = novaLinha(this.usuario, this.pontos);

			//modificado aqui
            linha.find(".botao-remover").click(removeLinha);

			$("tbody").append(linha);

		});

	});
}