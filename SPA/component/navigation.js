import filterFunction from './filter.js';
import productList from './productlist.js';

export const routing  = {
	render : (url) =>  {
		$('#pagin').css('display', 'inline-block')
		let temp = url.split('/')[0];
		$('.main-content .page').removeClass('visible');
		let	map = {
			'': function() {
				window.filters = {};
				window.checkboxes.prop('checked',false);
				productList.renderProductsPage(window.products);
			},

			'#product': function() {
				let index = url.split('#product/')[1].trim();
				productList.renderSingleProductPage(index, window.products);
			},

			'#filter': function() {
				url = url.split('#filter/')[1].trim();
				try {
					window.filters = JSON.parse(url);
				}
				catch(err) {
					window.location.hash = '#';
					return;
				}
				filterFunction.renderFilterResults(window.filters, window.products);
			},
			'#magzine' : function() {
				let page = $('.magzine');
				page.addClass('visible');
				$('#pagin').css('display', 'none')
			},

			'#shop': function() {
				let page = $('.shop');
				page.addClass('visible');
				$('#pagin').css('display', 'none')
			}
		};
		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]) map[temp]();
        else {
            let page = $('.error');
            page.addClass('visible');
        }
    },
    createQueryHash: (filters) =>  {
		if(!$.isEmptyObject(filters)) 	window.location.hash = '#filter/' + JSON.stringify(filters);
		else window.location.hash = '#';
    }
}

export default routing;