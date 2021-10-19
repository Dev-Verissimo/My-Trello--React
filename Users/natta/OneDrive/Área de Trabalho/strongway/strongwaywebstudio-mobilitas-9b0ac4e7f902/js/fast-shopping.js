(function($){
	Vue.component('fast-shopping', {
		data: function () {
			return {
				selected_primary: null,
				selected_primary_value: '',
				filtered_variants: null,
				selected_variant: '',
				quantity: 1,
				opened: false,
			}
		},
		props: {
			variants: this.variants,
			product_id: this.product_id,
			is_https: this.is_https,
		},
		computed: {
			// Tipos de caracteristica presentes no produto
			variant_types: function () {
				var variant_types = {};

				jQuery.each( this.variants[0].Sku, function (index, sku){
					variant_types[index] = sku.type;
				});
				
				return variant_types;
			},
			// Resgata todos os valores disponiveis para a caracteristica primaria
			primary_type_values: function () {
				var primary_type_values = {};
				var added_values = [];
				var iterator = 0;

				jQuery.each( this.variants, function (index, variant){
					if ( parseInt(variant.stock) > 0 ) {
						if ( jQuery.inArray( variant.Sku[0].value, added_values ) === -1 ) {
							added_values.push( variant.Sku[0].value );
							primary_type_values[iterator] = {};
							primary_type_values[iterator]['value'] = variant.Sku[0].value;

							if ( variant.Sku[0].image ) {
								primary_type_values[iterator]['image'] = variant.Sku[0].image;
								primary_type_values[iterator]['image_secure'] = variant.Sku[0].image_secure;
							}

							iterator++;
						}							
					}
				});

				return primary_type_values;
			}
		},
		methods: {
			// Filtra caracteristicas secundarias com base na primaria selecionada
			showVariantsByPrimaryType: function (primary_type, primary_type_value) {
				this.selected_variant = '';
				
				var filtered_variants = {};
				var iterator = 0;

				jQuery.each( this.variants, function (index, variant){
					if ( parseInt(variant.stock) > 0 ) {
						jQuery.each( variant.Sku, function (index2, sku){
							if ( sku.type == primary_type && sku.value == primary_type_value ) {
								filtered_variants[iterator] = variant;
								iterator++;
							}
						});							
					}
				});

				this.selected_primary = primary_type_value; // Define a caracteristica primaria selecionada
				this.filtered_variants = filtered_variants; // Guarda as variacoes filtradas

				if ( !this.variant_types[1] ) {
					this.selected_variant = filtered_variants[0].id;
				}
				
			},
			// Adicao do produto/variacao ao carrinho
			addToCart: function (quantity, product_id, variant_id) {
				var dataSession =  jQuery("html").attr("data-session");
				var variant_id = (typeof variant_id !== 'undefined') ? variant_id : 0;

				jQuery.ajax({
					method: "POST",
					url: "/web_api/cart/",
					contentType: "application/json; charset=utf-8",
					data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+product_id+'","quantity":"'+quantity+'","variant_id":"'+variant_id+'"}}'
				}).done(function( response, textStatus, jqXHR ) {
					CarrinhoVue.fetchCarrinho();
					toastr.success('Produto inclu&iacute;do no carrinho!');
				}).fail(function( jqXHR, status, errorThrown ){
					var error = JSON.parse( jqXHR.responseText );
					toastr.error(error.causes);
				});
			},
			// Abertura da interface
			openInterface: function () {
				this.opened = true;
			}
		},
		template: '#fast-shopping-template'
	})
})(jQuery);