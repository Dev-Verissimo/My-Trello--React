(function($){
	//===============
	//  FORMULÁRIO DE DEPOIMENTO
	//===============
	if ( g.page.hasClass('page--depoimentos') ) {
		$('#comentario_cliente').addClass('is-hidden');
		
		document.querySelector('.page--depoimentos br + h2.color').addEventListener('click', function () {
			$('#comentario_cliente').toggleClass('is-hidden');
		});
	}

	// Botao de submit
	if ( $('#btn_submit').length > 0 ) {
		$('#btn_submit')
		.addClass('bt')
		.text('Enviar');
 	}
})(jQuery);
