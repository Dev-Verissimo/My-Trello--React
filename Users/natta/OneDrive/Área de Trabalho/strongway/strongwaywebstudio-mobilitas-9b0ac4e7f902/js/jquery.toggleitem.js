(function($){
	//===============
	//  TOGGLES GENÉRICOS
	//  Abre e fecha itens por clique
	//  Depende da aplicação de data-attributes
	//  ou aria-roles específicos
	//===============
	$.fn.toggleItem = function (options) {
		var defaults = {
			type: 'aria'
			// 'aria' apenas manipula os atributos ARIA,
			// 'class' adiciona classe ao toggle.
			// 'toggle' utiliza a função .toggle() do jQuery
		};

		var settings = $.extend( {}, defaults, options );

		function ariaSetup (toggle, target) {
			if ( settings.type == 'aria' ) {
				if ( toggle.attr('data-expanded') == 'false' ) {
					toggle.attr('aria-expanded', 'false');
					target.attr('aria-hidden', 'true').addClass('is-hidden');
				} else {
					toggle.attr('aria-expanded', 'true').addClass('is-active');
					target.attr('aria-hidden', 'false');
				}

			} else {
				toggle.removeAttr('aria-controls').removeAttr('aria-expanded');
			}
		}

		// Destrói Toggle
		this.destroyToggle = function () {
			this.each( function () {
				var target = $('#' + $(this).attr('aria-controls') );

				$(this).unbind('click');
				$(this).attr('aria-expanded', '');
				$(this).attr('data-expanded', 'false');
				target.removeAttr('aria-hidden');
			});
		}

		// Retorna em um .each para que o plugin
		// se aplique independentemente a cada
		// instância da collection selecionada
		return this.each( function () {
			var toggle = $(this);
			var target = $('#' + toggle.attr('aria-controls') );

			ariaSetup( toggle, target );

			this.addEventListener('click', () => {
				if ( settings.type == 'aria' ) {
					if ( toggle.attr('aria-expanded') == 'false' ) {
						toggle.attr('aria-expanded', 'true');
						target.attr('aria-hidden', 'false');
					} else {
						toggle.attr('aria-expanded', 'false');
						target.attr('aria-hidden', 'true');
					}

					toggle.toggleClass('is-active');
					target.toggleClass('is-hidden');
				}
				else if ( settings.type == 'toggle' ) {
					target.toggle();
				} else if ( settings.type == 'class' ) {
					toggle.toggleClass('is-opened'); 
				}
			})
		})
	}
})(jQuery);