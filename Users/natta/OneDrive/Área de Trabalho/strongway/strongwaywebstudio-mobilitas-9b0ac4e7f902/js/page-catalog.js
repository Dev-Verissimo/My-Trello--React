(function($){
	//===============
	// LIMITAÇÃO DE ALTURA DAS DESCRIÇÕES
	//===============
	function limitDescription () {
		if ( $('.page__description__limiter').length > 0 ) {
			$('.page__description__limiter').each( function () {
				var description_height = $(this).find('.page__description').outerHeight();

				if ( description_height > 80 ) {
					$(this).addClass('is-limited');
				} else {
					$(this).removeClass('is-limited');
				}
			});
		}        
	}

	limitDescription();

	$('.page__description__toggle').on('click', function () {
		var parent_limiter = $(this).parents('.page__description__limiter')
		
		if ( parent_limiter.hasClass('is-opened') ) {
			parent_limiter.removeClass('is-opened');                
			$(this).html('Ver mais');              
		}
		else {
			parent_limiter.addClass('is-opened');                
			$(this).html('Fechar');           
		}
	})
	
	//===============
	// ALTERNÂNCIA DE MODO DE LISTAGEM
	//===============
	function makeList(selector) {
		$(selector).find('.grid-spacer').attr('class', 'grid-spacer b-xs-12');
		$(selector).find('.product').addClass('product--list');
		$('[data-showcase-mode="list"]').prop('disabled', true)
		$('[data-showcase-mode="grid"]').removeAttr('disabled');
	}

	function setShowcaseMode(mode) {
		localStorage.showcase_mode = mode;
		window.location = window.location.href;
	}

	$('[data-showcase-mode]').on('click', function () {
		setShowcaseMode( $(this).data('showcase-mode') );
	})

	if (
		localStorage.showcase_mode == 'list'
		&& ( g.page.hasClass('page--catalog') || g.page.hasClass('page--search') )
	) {
		makeList('.showcase');
	}
})(jQuery);