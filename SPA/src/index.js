import $ from 'jquery';
import "../assets/css/styles.css";
import jsonData from "../assets/products.json";
import filterFunction from '../component/filter.js';
import productList from '../component/productlist.js';
import routing from '../component/navigation.js';
import pagination from "../component/pagination.js"

// Globals letiables
window.filters = {};
window.products = [];
window.checkboxes = $('.filters input[type=checkbox]');

$(window).on('load', function(){
    window.products = jsonData;
    productList.createProductList(window.products);
    filterFunction.createFilterDropDown(window.products)
    $(window).trigger('hashchange');
    pagination.createPagination();
    
});

$(window).on('hashchange', function(){
    routing.render(decodeURI(window.location.hash));
});

$("#myInput").on("keyup", function() {
    let value = $(this).val().toUpperCase();
    window.filters['search'] = [value];
    filterFunction.renderFilterResults(window.filters, window.products);
    routing.createQueryHash(window.filters);
});
