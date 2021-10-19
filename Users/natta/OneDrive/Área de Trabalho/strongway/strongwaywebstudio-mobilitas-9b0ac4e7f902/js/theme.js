(function($){
	$(".lazy").lazyload({ failure_limit: $(".lazy").length });

	//===============
	//  VARIÁVEIS GLOBAIS
	//  Declaradas como propriedades de objeto para
	//  dar namespace
	//===============
	g.dimensions = {
		width: window.innerWidth,
		height: window.innerHeight,
		inner_limiter_width: $('.main-menu__navigation').outerWidth(),
		inner_limiter_offset_x: $('.main-menu__navigation').offset().left
	}

	// Atualiza as dimensões da tela ao redimensioná-la
	$(window).on('resize', function () {
		g.dimensions.width = window.innerWidth;
		g.dimensions.height = window.innerHeight;
		g.dimensions.inner_limiter_width = $('.main-menu__navigation').outerWidth();
		g.dimensions.inner_limiter_offset_x = $('.main-menu__navigation').offset().left;
	})

	//===============
	//  SMART FILTER TOGGLE
	//  Filtro inicia fechado, depois define o estado de acordo com
	//  o breakpoint. Se for mobile, se mantém fechado até o toggle. Se maior que mobile, remove classe .is-hidden
	//===============

	if (g.dimensions.width >= g.bp['md']
	&& $('.smart-filter__toggle, .filter__toggle').length > 0) {
		$("#filter").removeClass('is-hidden');
	}

	if (
		g.dimensions.width <= g.bp['md']
		&& $('.smart-filter__toggle, .filter__toggle').length > 0
	) {
		$('.smart-filter__toggle, .filter__toggle').attr('data-expanded', 'false');
	}

	// Depois de definido o estado, inicializa o toggle
	$('.smart-filter__toggle, .filter__toggle').toggleItem({type:'aria'});

	//===============
	//  CUSTOMER MENU TOGGLE
	//  Primeiro, define o estado de acordo com
	//  o breakpoint. Se for mobile, inicia fechado
	//===============
	if (
		g.dimensions.width <= g.bp['md']
		&& $('.customer-menu__toggle').length > 0
	) {
		$('.customer-menu__toggle').attr('data-expanded', 'false');
	}

	// Depois de definido o estado, inicializa o toggle
	$('.customer-menu__toggle').toggleItem({type:'aria'});

	// Abrir o modal de login da tray
	$('#login-button').on('click', function(event) {
		if ( $('tray-login').html().trim() != '' ) {
			event.preventDefault();
			$('tray-login').show();
		}
	});

	//===============
	// VÍDEOS RESPONSIVOS
	// Usando o FitVids.js
	//===============
	$('.fitvids, .produto-video .bloco').fitVids();

	if ( $('#visualBlock').length > 0 ) {
		// Verifica se houve mudanças nas imagens
		var target = document.querySelector('#visualBlock');

		// cria uma nova instância de observador
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				$('#visualBlock .produto-video .bloco').fitVids();
			});
		});

		// configuração do observador:
		var config = { attributes: true, childList: true, characterData: true };

		// passar o nó alvo, bem como as opções de observação
		observer.observe(target, config);		
	}

	//===============
	//  TOGGLES SIMPLES
	//  Elemento a ser aberto e seu toggle são filhos
	//  pertencentes ao mesmo pai
	//  [DESKTOP/MOBILE]
	//===============
	var toggleElementsNames = '.cart__toggle, .user-account__toggle, .menu-toggle'
	var toggleElements = [toggleElementsNames]; // Registrar os toggles aqui

	$(toggleElements).each(function(index, el) {
		$(el).on('click', function( event ) {
			// Para o bubble javascript no seu clique
			event.stopPropagation();
			$(this).toggleClass('is-opened');

			// Define o valor do atributo aria-expanded
			$(this).attr('aria-expanded', function(i, attr) {
				return attr == 'true' ? 'false' : 'true'
			});

			// Se for o toggle do carrinho, calcula a altura máxima do dropdown
			if ($(this).hasClass('cart__toggle')) {
				resizeDropdownCart();
			}

			// Se for o toggle do menu mobile iremos abrimos o seu 'target'
			// Caso se o mesmo estiver aberto e outros toggles forem abertos,
			// deverão ser fechados
			if ($(this).hasClass('menu-toggle')) {
				resizeDropdownMenu();
				target = $(this).attr('aria-controls');
				$("#"+target).toggleClass('is-opened');
				$("#"+target).children().on('click', function(e) {
					e.stopPropagation();
				})
			} else if (false === $(this).hasClass('menu-mobile__toggle')) {
				if ($('#menuMobile').hasClass('is-opened')) {
					$('#menuMobile').removeClass('is-opened');
				}
			}

			// Fecha todos os outros toggles simples
			$(el).not($(this)).removeClass('is-opened');
			$(el).not($(this)).attr('aria-expanded', false);

			$(this).parent().children().on('click', function(e) {
				// Para o bubble javascript no 
				// clique de todos os filhos
				e.stopPropagation();
			})

			if ( g.dimensions.width <= g.bp['md']) {
				if ($(this).hasClass('is-opened')) {
					$('html').addClass('is-mobile-opened');
				} else {
					$('html').removeClass('is-mobile-opened');
				}
			}
		})
	})

	// Toggle menu mobile
	$('.menu-mobile__toggle').on('click', function() {
		// Define o valor do atributo aria-expanded
		$(this).attr('aria-expanded', function(i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});

		$(this).toggleClass('is-opened');
	})

	// Fecha o dropdown que está aberto no clique do close
	$(".js-close-dropdown").on('click', function(ev) {
		$(toggleElements).each(function(index, el) {
			if ($(el).hasClass('is-opened')) {
				$(el).removeClass('is-opened');
				$(el).attr('aria-expanded', false);
			}
		})

		if ( g.dimensions.width <= g.bp['md'] ) {
			if ($('html').hasClass('is-mobile-opened')) {
				$('html').removeClass('is-mobile-opened');
			}
		}
	})

	//===============
	//  POSICIONAMENTO DE SUBMENUS
	//===============
	// Apenas em desktop
	if ( g.dimensions.width >= g.bp['md'] + 1 ) {
		$('.main-menu__item-lvl1.has-subnivel').on({
			// Ao passar o mouse
			mouseenter: function () {
				resizeDropdownSubMenu();

				var submenu = $(this).find('> .main-menu__subnivel');
				var parent_width = submenu.parent().outerWidth();
				var offset_x = submenu.offset().left;
				var largura = submenu.outerWidth();

				// Se o submenu transbordar da tela
				if ( (offset_x + largura) > ( g.dimensions.inner_limiter_width + g.dimensions.inner_limiter_offset_x ) ) {
					// Se não couber à direita...
					if ( largura <= ( offset_x + parent_width - g.dimensions.inner_limiter_offset_x ) ) {
						// Adiciona classe para abri-lo à esquerda
						$(submenu).addClass('open-left');
					} else {
						// Se não couber nem à direita nem à esquerda
						// Compensa o posicionamento com margens
						$(submenu).addClass('open-center').css({
							'margin-left': ( -( (offset_x + largura) - ( g.dimensions.inner_limiter_width + g.dimensions.inner_limiter_offset_x ) ) ) + 'px'
						});
					}
				}
			},
			mouseleave: function () {
				// Ao tirar o mouse
				var submenu = $(this).find('> .main-menu__subnivel');

				if ( $(submenu).hasClass('open-left') ) {
					// Remove a classe
					$(submenu).removeClass('open-left');               
				}

				if ( $(submenu).hasClass('open-center') ) {
					// Remove a classe
					$(submenu).removeClass('open-center'); 
					$(submenu).attr('style', ''); 
				}
			}
		})
	}

	// Ao redimensionar, refaz o setup ou reseta
	$(window).on('resize', function () {
		if ( g.dimensions.width <= g.bp['md'] ) {
			// Caso esteja aberto no desktop e é mudado para o mobile
			$(toggleElements).each(function(index, el) {
				if ($(el).hasClass('is-opened')) {
					$('html').addClass('is-mobile-opened');
				}
			});

			// Ajusta espaçamento do header caso seja fixo
			headerCheckFixed();

			// Puxa o banner para trás do header, se se aplicar
			pullBannerUp();

			// Impede de fechar os dropdowns no clique do header
			$('.header').on('click', function(event) {
				event.stopPropagation();
			});
		} else {
			// Caso o html tenha a classe is-mobile-opened deve ser removido no desktop
			if ($('html').hasClass('is-mobile-opened')) {
				$('html').removeClass('is-mobile-opened');
			}
			
			// Menu mobile só pode continuar aberto no mobile
			if ($('.menu-mobile').hasClass('is-opened') || $('.js-toggle-mobile').hasClass('is-opened')) {
				$('.menu-mobile').removeClass('is-opened');
				$('.js-toggle-mobile').removeClass('is-opened');
			}

			// Ajusta espaçamento do header caso seja fixo
			headerCheckFixed();

			// Puxa o banner para trás do header, se se aplicar
			pullBannerUp();
		}
	})

	// Eventos de clique no documento
	$(document).on('click', function(event) {
		// Fecha qualquer dropdown aberto
		$(toggleElements).each(function(index, el) {
			if ($(el).hasClass('is-opened')) {
				$(el).removeClass('is-opened');
				$(el).attr('aria-expanded', 'false');
			}
		});
	});

	//===============
	// Aplica classe quando o menu estiver em hover
	//===============
	if ( g.dimensions.width >= g.bp['md'] + 1 ) {
		$('.main-menu__navigation').on({
			// Ao passar o mouse
			mouseenter: function () {
				$(this).addClass('is-opened');
			},
			mouseleave: function () {
				$(this).removeClass('is-opened');
			}
		})
	}

	// Overlay corpo no mobile e do header sem propagação do bubble
	$('.wrapper__overlay').on('click', function(event) {
		event.stopPropagation();
	});

	// Modal de login sem propagação do bubble
	$('.tray-container').on('click', function(event) {
		event.stopPropagation();
	});

	// Impede de fechar os dropdowns no clique do header
	if (g.dimensions.width <= g.bp['md']) {
		$('.header').on('click', function(event) {
			event.stopPropagation();
		});
	}

	// Configurações do toastr notificações
	toastr.options.closeButton = true;
	toastr.options.closeHtml = "<span aria-label='Fechar notifica&ccedil;&atilde;o' class='icon icon-close'></span>";
	toastr.options.timeOut = 5000;

	$.ajax({
		method: "GET",
		url: "/nocache/app.php?loja="+settings.store_id,
	}).done(function( response, textStatus, jqXHR ) {
		
		dataSession = JSON.parse( response );
		dataSession = (dataSession.hash === undefined || dataSession.hash === null || dataSession.hash === '') 
		? dataLayer[0].visitorId : dataSession.hash;

		// Instância do Carrinho Vue
		CarrinhoVue = new Vue({
			el: ".js-vue-cart",
			data: {
				products: [], // Lista de produtos do carrinho
				totalPrice: 0, // Preço Total
				totalQuantity: 0, // Quantidade total de itens do carrinho
				loading: false, // Carregamento
			},
			methods: {
				// Busca os produtos que estão no carrinho do usuário e associa-os
				// a variável de products, fazendo os cálculos de preço 
				// e quantidade totais
				fetchCarrinho: function() {
					this.loading = true;
					var self = this;
					$.ajax({
						method: "GET",
						url: "/web_api/cart/"+dataSession
					}).done(function(responseCart, textStatusCart, jqXHRCart) {
						self.totalPrice = 0;
						self.totalQuantity = 0;
						arrayProdutos = [];
						$(responseCart).each(function(index, produto) {
							self.totalPrice = self.totalPrice + (parseFloat(produto.Cart.price) * produto.Cart.quantity);
							self.totalQuantity = self.totalQuantity + parseInt(produto.Cart.quantity);
							$.ajax({
								method: "GET",
								url: "/web_api/products/"+produto.Cart.product_id
							}).done(function(responseProduct, textStatusProduct, jqXHRProduct) {
								// Se existe informações de variação no produto comprado
								// busca detalhes sobre ela
								if (produto.Cart.variant_id != 0) {
									$.ajax({
										method: "GET",
										url: "/web_api/variants/"+produto.Cart.variant_id
									}).done(function(responseVariant, textStatusVariant, jqXHRVariant) {
										objetoFormatado = {
											productDetails: responseProduct.Product,
											productImage: produto.Cart.product_image,
											cart: produto.Cart,
											cartPrice: parseFloat(produto.Cart.price),
											productVariant: responseVariant.Variant,
											quantity: produto.Cart.quantity
										}

										arrayProdutos.push(objetoFormatado);
									});
								} else {
									objetoFormatado = {
										productDetails: responseProduct.Product,
										productImage: produto.Cart.product_image,
										cart: produto.Cart,
										cartPrice: parseFloat(produto.Cart.price),
										quantity: produto.Cart.quantity
									}

									arrayProdutos.push(objetoFormatado);
								}
								if (index == ($(responseCart).length - 1)) {
									self.products = arrayProdutos;
									self.loading = false;
									$('.js-cart-price').text(self.totalPrice.toFixed(2).replace('.',','));
									$('.cart__icon-wrapper').addClass('has-itens');
									$('.js-qtd-cart').text(self.totalQuantity);
								}
							});
						});
					}).fail(function( jqXHR, status, errorThrown ){
						var response = JSON.parse( jqXHR.responseText );
						// Se o carrinho estiver vazio
						if (response.code == 404) {
							self.resetCart(); // Reseta o carrinho
						}
						self.loading = false;
					});
				},
				deleteProduct: function(product_id, variant_id, product_name, additional_information) {
					var self = this;
					$.ajax({
						type: "DELETE",
						url: "/web_api/carts/"+dataSession+"/"+product_id+"/"+variant_id+"?additional_information="+additional_information,
						contentType: "application/json; charset=utf-8",
					}).done(function( response, textStatus, jqXHR ) {
						toastr.success('Removido com sucesso do carrinho!');
						self.fetchCarrinho();
					}).fail(function( jqXHR, status, errorThrown ){
						var response = JSON.parse( jqXHR.responseText );
						toastr.error('Para remover produtos vinculados, utilize a op&ccedil;&atilde;o \"Remover Tudo\", ou clique em \"Avan&ccedil;ar\" e remova na tela do carrinho.');
					});
				},
				deleteAll: function() {
					var self = this;
					$.ajax({
						type: "DELETE",
						url: "/web_api/carts/"+dataSession,
						contentType: "application/json; charset=utf-8",
					}).done(function( response, textStatus, jqXHR ) {
						toastr.success('Todos os produtos foram removidos com sucesso!');
						self.fetchCarrinho();
						$('.js-cart-price').text('0,00');
						$('.cart__icon-wrapper').removeClass('has-itens');
						$('.js-qtd-cart').text('0');
					}).fail(function( jqXHR, status, errorThrown ){
						var response = JSON.parse( jqXHR.responseText );
					});
				},
				resetCart: function() {
					this.products = [];
					this.totalPrice = 0;
					$('.js-cart-price').text('0,00');
					$('.cart__icon-wrapper').removeClass('has-itens');
					$('.js-qtd-cart').text('0');
				},
				closeDropdown: function() {
					toggleEl = $('.cart__toggle');
					$(toggleEl).removeClass('is-opened');
					$(toggleEl).attr('aria-expanded', false);
					if ( g.dimensions.width <= g.bp['md'] ) {
						if ($('html').hasClass('is-mobile-opened')) {
							$('html').removeClass('is-mobile-opened');
						}
					}
				},
			},
			mounted: function() {
				// Ao iniciar o vue busca se existem itens no carrinho
				this.fetchCarrinho();
			}
		});

		$(document).on(
			'tray:cart_preview:added_item tray:cart_preview:removed_item tray:cart_preview:removing_item tray:cart_preview_modal:removing_item continue_shopping',
		function(event){
			CarrinhoVue.fetchCarrinho();
		})
	});

	//  BOTÕES
	//  Substitui botões padrão da Tray por outros mais bonitos
	//===============
	//  Remove o style arbitrário da Tray no texto do botão de "Avançar"
	if ( $('.botao-prosseguir-compra').length > 0 ) {
		$('.botao-prosseguir-compra').find('a').attr('style', '');
	}

	//  Remove o style arbitrário da Tray no texto do botão de "Avançar"
	if ( $('a[href^="navegacao_visitados"]').parents('.central-icons').length > 0 ) {
		$('a[href^="navegacao_visitados"]').parents('.central-icons').remove();
	}

	//===============
	//  AJUSTE DE TAMANHO TOPO FIXO
	//===============
	var header_settings = {};
	header_settings.reference_scroll = $(window).scrollTop();
	header_settings.is_fixed = $('.header').hasClass('is-fixed');

	function headerCheckFixed() {
		if ( header_settings.is_fixed ) {
			$('.header__fixer').imagesLoaded( function() {
				heightHeaderFixed = $('.header__fixer').outerHeight();
				$('.header__placeholder').css({'height': heightHeaderFixed});
			});
			return true;
		}
	}

	// Popula o objeto de configurações do header e o mostra
	function showHeader() {
		if ( header_settings.is_fixed ) {
			if ( $('.header').hasClass('is-scrolled') ) {
				$('.header').removeClass('is-scrolled');
			}

			header_settings.reference_scroll = $(window).scrollTop();
		}
	}

	// Esconde o header
	function hideHeader() {
		if ( header_settings.is_fixed ) {
			if ( !$(toggleElementsNames + ', .main-menu__navigation').hasClass('is-opened') ) {
				if ( !$('.header').hasClass('is-scrolled') ) {
					$('.header').addClass('is-scrolled'); 
				}
			}
		
			header_settings.reference_scroll = $(window).scrollTop();
		}
	}

	headerCheckFixed();
	showHeader();

	if ( header_settings.is_fixed ) {
		$(window).on('scroll', function () {
			var current_scroll = $(window).scrollTop();

			// Se a rolagem tiver passado da altura de referência
			if ( current_scroll >= ( header_settings.reference_scroll + 100 ) ) {
				hideHeader();
			} else if ( current_scroll < ( header_settings.reference_scroll - 30 ) ) {
				showHeader();
			}
		})
	}

	//===============
	//  AJUSTE DE POSIÇÃO DO BANNER POR TRÁS DO HEADER
	//===============
	function pullBannerUp() {
		if (
			g.page.hasClass('has-banner-under-header')
			&& g.dimensions.width >= g.bp['xl'] + 1
		) {
			$('.header__line-2').imagesLoaded( function() {
				headerLine1Height = $('.header__line-1').outerHeight();
				headerLine2Height = $('.header__line-2').outerHeight();
				headerLine3Height = $('.header__line-3').outerHeight();
				negativeBannerMargin = -(headerLine1Height + headerLine2Height + headerLine3Height);
				$('.wrapper').css({
					'top': negativeBannerMargin,
					'margin-bottom': negativeBannerMargin
				});
			});
			return true;
		} else {
			$('.wrapper').css({
				'top': '',
				'margin-bottom': ''
			});
			return false;
		}
	}

	pullBannerUp();

	//===============
	//  Ajusta a dimensão do dropdown do carrinho
	//===============
	function resizeDropdownCart() {
		if ( header_settings.is_fixed ) {
			var topOfDiv = $('.cart__dropdown').offset().top - $(window).scrollTop();
			var divPadding = parseInt( $('.cart__dropdown').css('padding-top') ) + parseInt( $('.cart__dropdown').css('padding-bottom') );
			var cartHeading = $('.cart__heading').outerHeight();
			var cartFooter = $('.cart__footer').outerHeight() + parseInt($('.cart__footer').css('margin-top'));
			var bottomOfVisibleWindow = $(window).height();
			$('.cart__produtos').css('max-height', bottomOfVisibleWindow - topOfDiv - divPadding - cartHeading - cartFooter - 20);
		} else {
			$('.cart__produtos').css('max-height', 350);
		}
	}

	//===============
	//  Ajusta a dimensão do dropdown de sugestões
	//===============
	function resizeDropdownSuggestion() {
		if (
			header_settings.is_fixed
			&& $('.suggestion').length > 0
		) {
			var topOfDiv = $('.suggestion').offset().top - $(window).scrollTop();
			var bottomOfVisibleWindow = $(window).height();
			$('.suggestion').css('max-height', (bottomOfVisibleWindow - topOfDiv) - 20);
		}
	}

	// Verifica se houve mudanças na busca
	var target = document.querySelector('.search-form__form');

	// cria uma nova instância de observador
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			// Redimensiona a caixa de sugestões se houver mudanças na busca
			resizeDropdownSuggestion();
		});
	});

	// configuração do observador:
	var config = { attributes: true, childList: true, characterData: true };

	// passar o nó alvo, bem como as opções de observação
	observer.observe(target, config);

	//===============
	//  Ajusta a dimensão do dropdown de menu
	//===============
	function resizeDropdownMenu() {
		if ( header_settings.is_fixed ) {
			var topOfDiv = $('.menu-mobile').offset().top - $(window).scrollTop();
			var divPadding = parseInt( $('.menu-mobile').css('padding-top') ) + parseInt( $('.menu-mobile').css('padding-bottom') );
			var bottomOfVisibleWindow = $(window).height();
			$('.menu-mobile').css('max-height', bottomOfVisibleWindow - topOfDiv - divPadding - 20);
		}
	}

	//===============
	//  Ajusta a dimensão do dropdown de menu
	//===============
	function resizeDropdownSubMenu() {
		if ( header_settings.is_fixed ) {
			var topOfDiv = $('.main-menu__subnivel').offset().top - $(window).scrollTop();
			var divPadding = parseInt( $('.main-menu__subnivel').css('padding-top') ) + parseInt( $('.main-menu__subnivel').css('padding-bottom') );
			var bottomOfVisibleWindow = $(window).height();
			$('.main-menu__subnivel-wrapper').css('max-height', bottomOfVisibleWindow - topOfDiv - divPadding - 20);
		}
	}

	//===============
	// AJUSTE DE ALTURAS DE PRODUTOS
	//===============
	if (
		localStorage.showcase_mode != 'list'
		|| ( !g.page.hasClass('page--catalog') && !g.page.hasClass('page--search') )
	) {
		$('.showcase').adjustHeights({
			selector: '.product__info-inner'
		});
	}

	// // Executa os ajustes ao redimensionar a tela
	$(window).on('resize', function() {
		if (
			localStorage.showcase_mode != 'list'
			|| ( !g.page.hasClass('page--catalog') && !g.page.hasClass('page--search') )
		) {
			$('.showcase').adjustHeights({
				selector: '.product__info-inner'
			});
		}
	});

	$(window).on('load', function() {
		if (
			localStorage.showcase_mode != 'list'
			|| ( !g.page.hasClass('page--catalog') && !g.page.hasClass('page--search') )
		) {
			$('.showcase').adjustHeights({
				selector: '.product__info-inner'
			});
		}
	});

	// Ajusta altura dos produtos após carregar os preços
	$(document).ajaxComplete(function( event, xhr, settings ) {
		if (
			localStorage.showcase_mode != 'list'
			|| ( !g.page.hasClass('page--catalog') && !g.page.hasClass('page--search') )
		) {
			if ( settings.url.indexOf('snippets/price') != -1 ) {
				$('.showcase').adjustHeights({
					selector: '.product__info-inner'
				});
			}
		}
	})

	//===============
	//  HONEYPOT DE NEWSLETTER
	//===============
	$('.newsletter-form').on('submit', function () {    
		if ( $('.newsletter-form__pot').val().length != 0 ) {
			return false;
		} 
	});
})(jQuery);