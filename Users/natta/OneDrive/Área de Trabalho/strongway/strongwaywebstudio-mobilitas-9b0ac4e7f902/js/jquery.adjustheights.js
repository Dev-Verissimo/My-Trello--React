(function($){
	//===============
    // ALTURAS DE PRODUTOS
    // Ajuste de altura de produtos nas listagens
    //===============
	$.fn.adjustHeights = function (options) {
		var defaults = {
			selector: '.product'
		};

		var settings = $.extend( {}, defaults, options );

		function setHeights (product_collection, selector) {
			var item = product_collection.find(selector);
			var itens = item.length; // Conta itens da lista
			var heights = []; // Inicia array de alturas (conjunto de alturas por linha)
			var offsets = []; // Inicia array de offsets (para contagem de linhas)
			
			// Limpa min-heights e paddings, para resetar quando for executado mais uma vez
			item.css({'min-height': ''});
			
			// Conta linhas
			item.each( function (index) {
			    var current_offset = $(this).offset().top; // Guarda o offset atual
			    
			    // Se o offset atual ainda não existe no array de offsets, é porque é uma nova linha
			    if ( $.inArray( current_offset, offsets ) == -1 ) {
			        // Guarda offset da linha na lista
			        offsets.push(current_offset);

			        // Se já tiver havido quebra de linha (evidenciado pelo aumento do tamanho do array de offsets)
			        if ( offsets.length == 2 ) {
			            // Determina o índice do item que quebra linha como quantidade de "itens por linha"
			            itens_by_line = index;
			        }    
			    }
			});

			// Caso não tenha havido nenhuma quebra de linha, é porque temos menos itens que o necessário para isso. Então, define-se a quantidade absoluta de itens como itens por linha
			if ( itens_by_line == undefined ) {
			    var itens_by_line = itens;
			}

			var line_amount = Math.ceil( itens / itens_by_line );
			line_number = 0; // Inicia a contagem de linhas em zero
			heights[line_number] = []; // Cria conjunto vazio de alturas no primeiro item do array de alturas
			var line_heights = []; // Inicia array com alturas de uma linha específica

			// Cria um array de alturas e um de paddings para cada linha
			// Para cada item
			item.each( function (index) {
			    // Verifica se o índice é divisível pela quantidade de itens da linha.
			    // Se for divisível, é porque é uma nova linha
			    if ( index % itens_by_line == 0 )   {
			        line_heights = []; // Reseta o array de alturas, para uma nova linha
			        
			        // Incrementa o número da linha, mas apenas se não for o primeiro item
			        if (index != 0) {
			            line_number++;
			        }
			        
			        // Ao fim do processo, guarda a lista de alturas no item do array de alturas, no índice correspondente ao número da linha, de modo que cada linha tenha um array de alturas correspondente aos seus itens. Faz o mesmo com o array de alturas dos product_info
			        heights[line_number] = line_heights;
			    }
			    
			    line_heights.push( $(this).outerHeight() ); // Inclui a altura do item atual, isso sempre ocorre
			});

			// O array de offsets tem que ter o mesmo número de itens que o de alturas, pois os itens correspondem à quantidade de linhas
			// console.log(offsets);
			// console.log(heights);
			// console.log(line_amount);

			// Circula pelos itens para aplicar alturas
			item.each( function (index) {
			    line_number_in_array = Math.floor(index / itens_by_line); // Verifica a qual linha este item pertence
			    line_max_height = Math.max.apply( null, heights[line_number_in_array] ); // Verifica a maior altura dentre os itens desta linha

			    // Aplica a maior altura e o maior padding ao item
			    $(this).css({
			        'min-height': line_max_height
			    });
			})
		}

		// Retorna em um .each para que o plugin
		// se aplique independentemente a cada
		// instância da collection selecionada
		return this.each( function () {
			var product_collection = $(this);
			var selector = settings.selector;

			setHeights(product_collection, selector);
		})
	}
})(jQuery);