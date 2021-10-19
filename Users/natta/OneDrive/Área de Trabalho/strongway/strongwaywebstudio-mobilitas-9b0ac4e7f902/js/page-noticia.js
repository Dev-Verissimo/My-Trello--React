(function($){
	//===============
	//  TRANSFORMA ARQUIVOS DAS NOTÍCIAS EM ACCORDION
	//===============
	if ( g.page.hasClass('page--noticia') && $('#noticiaArquivos').length > 0 ) {
		
		$('#listaNoticiaArquivos').addClass('is-hidden');

		document.querySelector('#noticiaArquivos h2').addEventListener('click', function () {
			$('#listaNoticiaArquivos').toggleClass('is-hidden');
		});
	}
})(jQuery);