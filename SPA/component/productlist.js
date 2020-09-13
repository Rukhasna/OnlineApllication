import routing from './navigation.js';


function importAll(r) {
	let a =  r.keys().map(r);
	let imgN = r.keys();
	let b = [];
	a.map( function( item, index ) {
		item.imgname = imgN[index];
		b.push(item);
	})
	return b;
}
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

export const productList  = {
    createProductList : (data) =>  {
		let list = $('.all-products .products-list');
		let theTemplateScript = $("#products-template").html();
		let theTemplate = Handlebars.compile (theTemplateScript);
        list.append (theTemplate(data));
       
        for(let i= 0; i < window.products.length; i++){
			$.each(list.find('li'), function( index, item ) {
				if($(item).attr('data-index') == (i+1)) {
					var currindex = images.map(function(e) {return e.imgname}).indexOf(window.products[i].image.small);
					$(item).find('a.product-photo').append('<img src='+ images[currindex].default +' height="130" imgIndex = '+ currindex +'  alt='+ window.products[i].image.small +'/>')
				}
			})
        }

		list.find('li').on('click', function (e) {
			e.preventDefault();
			let productIndex = $(this).data('index');
			window.location.hash = 'product/' + productIndex;
		})
    },
    renderProductsPage: (data) =>  {
		let page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');
		allProducts.addClass('hidden');
		allProducts.each(function () {
			let that = $(this);
			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});
		page.addClass('visible');
    },
    renderSingleProductPage : (index, data) =>  {
		let page = $('.single-product'),
			container = $('.preview-large');
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					container.find('h3').text(item.name);
					container.find('img').attr('data-index')
					var currindex = images.map(function(e) {return e.imgname}).indexOf(item.image.large);
					container.find('img').attr('src', images[currindex].default);
					container.find('p').text(item.description);
				}
			});
		}
        page.addClass('visible');
        
        page.on('click', function (e) {
            if (page.hasClass('visible')) {
                let clicked = $(e.target);
                if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
                    routing.createQueryHash(window.filters);
                }
            }
        });
    }  
}

export default productList;