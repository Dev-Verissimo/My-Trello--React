(function($){
	//===============
	//  ABAS DO PRODUTO
	//===============
	// Ativação geral das abas
	$('.tabs').accessibleTabs({
		wrapperClass: 'tabs__container', 
		currentClass: 'is-active', 
		tabhead: '.tab__header',
		tabheadClass: 'visuallyhidden',
		tabbody: '.tab__body', 
		fx:'fadeIn', 
		fxspeed: 600,
		currentInfoText: '',
		currentInfoClass: 'current-info',
		//syncheights: true 
	});

	//  BOTÕES
	//  Substitui botões padrão da Tray por outros mais bonitos
	//===============
	//  "Enviar" do formulário de comentários
	if ( $('#bt-submit-comments').length > 0 ) {
		var text = $('#bt-submit-comments').attr('alt');

		$('#bt-submit-comments').after('<button id="bt-submit-comments" class="image pointer bt bt--secondary">'+ text +'</button>').remove();
	}
})(jQuery);