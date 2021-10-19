(function($){
	//===============
	//  SLIDER DE DEPOIMENTOS
	//===============
	if ( g.page.hasClass('page--home') ) {
		$('.customer-reviews .dep_lista').on('init', function (slick) {
			$(slick.currentTarget).adjustHeights({
				selector: '.dep_item'
			});
		});

		$('.customer-reviews .dep_lista').slick({
			slide: '.dep_item',
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			mobileFirst: true,
			respondTo: 'min',
			prevArrow: '<button type="button" class="slick-prev" aria-label="Anterior"><span class="icon icon-chevron-left slick-prev-icon"></span></button>',
			nextArrow: '<button type="button" class="slick-next" aria-label="Pr&oacute;ximo"><span class="icon icon-chevron-right slick-prev-icon"></span></button>',

			responsive: [
				{
					breakpoint: g.bp['md'],
					settings: {
						slidesToShow: 3,
					}
				},
			]
		});
	}

	//===============
	//  IMPORTAÇÃO DE NOTÍCIAS NA HOME
	//  Utiliza AJAX para resgatar notícias da página de notícias
	//  e permite então a exibição das imagens
	//===============
	// Conta quantas notícias devem ser exibidas na home
	var news_home_count = $("#listaUltimasNoticias li").length;

	// Carrega a lista de notícias na página correspondente
	if ( news_home_count > 0 ) {
		$(".news-ajax").load("/noticias .noticias", function(response, status, xhr){
			
			// Se há sucesso
			if(status == "success") {
				// Esconde as outras notícias da home
				$("#listaUltimasNoticias").hide();
				
				// Se o índice de uma notícia é maior do que o número original, ela é removida
				$(".noticias li").each(function(index) {
					if(index >= news_home_count) {
						$(this).remove();
					}
				})
			}
			// Senão, esconde o placeholder das notícias
			else if(status == "error") {
				$(".news-ajax").hide();
			}
		});		
	}

	//===============
	//  SLIDER DE MARCAS
	//===============
	if ( $('.site-brands .site-brand').length > 0 ) {
		$('.site-brands__slider').slick({
			slide: '.site-brand',
			slidesToShow: 2,
			slidesToScroll: 2,
			adaptiveHeight: true,
			mobileFirst: true,
			autoplay: true,
			autoplaySpeed: 3000,
			respondTo: 'slider',
			infinite: true,
			dots: true,
			lazyload: 'progressive',
			prevArrow: '<button type="button" class="slick-prev" aria-label="Anterior"><span class="icon icon-chevron-left slick-prev-icon"></span></button>',
			nextArrow: '<button type="button" class="slick-next" aria-label="Pr&oacute;ximo"><span class="icon icon-chevron-right slick-prev-icon"></span></button>',
			responsive: [
				{
					breakpoint: g.bp['sm'],
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: g.bp['md'],
					settings: {
						slidesToShow: 8,
						slidesToScroll: 4,
					}
				},
			]
		});
	}

	//===============
	// SLIDER DE CATEGORIAS DESTACADAS
	//===============
	if ( $('.featured-categories-slider').length > 0 ) {
		$('.featured-categories-slider').on('init', function (slick) {
			$(slick.currentTarget).adjustHeights({
				selector: '.featured-category'
			});
		});

		$('.featured-categories-slider').slick({
			slide: '.featured-category',
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			mobileFirst: true,
			respondTo: 'min',
			infinite: true,
			dots: true,
			lazyload: 'progressive',
			prevArrow: '<button type="button" class="slick-prev" aria-label="Anterior"><span class="icon icon-chevron-left slick-prev-icon"></span></button>',
			nextArrow: '<button type="button" class="slick-next" aria-label="Pr&oacute;ximo"><span class="icon icon-chevron-right slick-prev-icon"></span></button>',

			responsive: [
				{
					breakpoint: g.bp['md'],
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: g.bp['lg'],
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
			]
		});
	}

	//===============
	// AJUSTE DE ALTURAS
	//===============
	$(window).on('load', function() {
		$('.dep_lista').adjustHeights({
			selector: '.dep_item'
		});

		$('.featured-categories-slider').adjustHeights({
			selector: '.featured-category'
		});
	});

	$(window).on('resize', function() {
		$('.dep_lista').adjustHeights({
			selector: '.dep_item'
		});

		$('.featured-categories-slider').adjustHeights({
			selector: '.featured-category'
		});
	});
})(jQuery);