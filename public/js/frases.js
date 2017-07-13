// Evento de click do botão que invoca as frases de modo randômico
$("#botao-frase").click(fraseAleatoria);

// Evento de click no botão que invoca a busca de uma frase baseada no seu id
$("#botao-frase-id").click(buscaFrase);

// Função para a busca das frases
function fraseAleatoria(){

	// Gerenciando a exibição do spinnner
	$("#spinner").toggle();

	// Efetuando uma requisição do tipo get com jQuery
	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	 .fail(function(){
	 	
	 	$("#erro").toggle();

	 	setTimeout(function(){
	 		
	 		$("#erro").toggle();

	 	}, 2000);
	 })
	 .always(function(){
	 	$("#spinner").toggle();
	 });
}

// Função para efetuar a troca das frases de forma aleatória
function trocaFraseAleatoria(data){
	
	// Mapeando o elemento com a classe frase
	var frase = $(".frase");

	// Pegando um número aleatório com Math.random baseado no tamanho do array de frases e arredondando o valor 
	// com Math.floor
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	
	// Efetuando a substituição da frase no jogo
	frase.text(data[numeroAleatorio].texto);

	// Chamando a função de contagem de palavras
	atualizaTamanhoFrase();

	// Chamando a função que atualiza o tempo de digitação
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}


// Função para a busca de frases pelo seu id
function buscaFrase(){

	$("#spinner").toggle();

	var fraseId = $("#frase-id").val();

	// Criação do objeto JS que guarda o id
	var dados = {id : fraseId};

	// Vinculando o objeto na requisiçào GET
	$.get("http://localhost:3000/frases", dados, trocaFrase)
	 .fail(function(){

	 	$("erro").toggle();

	 	setTimeout(function(){

	 		$("erro").toggle();

	 	}, 2000);
	 })
	 .always(function(){
	 	
	 	$("#spinner").toggle();

	 });
}


// Função para a troca da frase
function trocaFrase(data){

	var frase = $(".frase");

	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);

}