(function($){
	//===============
	// Adiciona URL da imagem secundaria ao fazer hover no produto
	//===============
	$('.product__image-container').on('mouseover touchstart', function(){
		var imagemSecundaria = $(this).find('.product__image--sec');
		if (imagemSecundaria.length != 0) {
			imagemSecundaria.attr('src', $(imagemSecundaria).data('src'));
		}	
	});
})(jQuery);