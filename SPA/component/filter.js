 import productList from './productlist.js';
 import routing from './navigation.js';

let filterCriteria = [];

$('.filters button').click(function (e) {
    e.preventDefault();
    window.location.hash = '#';
    $('#myInput').val('');
});

export const filtersFunctions  = {
    createFilterDropDown : (data) =>  {
        let a = data[0].specs;
        Object.keys(a);
        filterCriteria =  Object.keys(a);
        let b = filterCriteria;
        let filterDropdownList = [];
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < b.length; j++) {
                let index;
                index = filterDropdownList.findIndex(x => x.name ==  b[j]);
                if (index == -1) filterDropdownList.push({ 'name' : b[j], 'value': []});
                index = filterDropdownList.findIndex(x => x.name ==  b[j]);
                if(!filterDropdownList[index].value.includes(data[i].specs[b[j]])) {
                    filterDropdownList[index].value.push(data[i].specs[b[j]]);
                }
            }
        }
        let list = $('.all-products .filters');
        let theTemplateScript = $("#products-filters-template").html();
        let theTemplate = Handlebars.compile (theTemplateScript);
        list.append (theTemplate(filterDropdownList));
    
        //	Checkbox filtering
        window.checkboxes = $('.filters input[type=checkbox]');
        window.checkboxes.click(function () {
            let that = $(this),
                specName = that.parents('.filter-criteria ').find('.dropdown-label span:first-child').text();
            // When a checkbox is checked we need to write that in the filters object;
            if(that.is(":checked")) {
                if(!(window.filters[specName] && window.filters[specName].length)){
                    window.filters[specName] = [];
                }
                window.filters[specName].push(that.val());
                routing.createQueryHash(window.filters);
            } else if(!that.is(":checked")) {
                if(window.filters[specName] && window.filters[specName].length && (window.filters[specName].indexOf(that.val()) != -1)){
                    let index = window.filters[specName].indexOf(that.val());
                    window.filters[specName].splice(index, 1);
                    if(!window.filters[specName].length){
                        delete window.filters[specName];
                    }
                }
                routing.createQueryHash(window.filters);
            }
        });
    
        //dropdown click
        let dropdownClick = $('.dropdown-label');
        dropdownClick.click(function() {
            let that = $(this).find('.icon-change');
            that.parent().next('.dropdown-option').slideToggle();
            that.toggleClass('rotatedropdownArrow');
        })
    },
    
     renderFilterResults : (filters, products) =>  {
        filterCriteria.push('search');
        let	results = [], isFiltered = false;
    
        window.checkboxes.prop('checked', false);
        filterCriteria.forEach(function (c) {
            if(filters[c] && filters[c].length){
                if(isFiltered){
                    products = results;
                    results = [];
                }
                filters[c].forEach(function (filter) {
                    products.forEach(function (item){
                        if(typeof item.specs[c] == 'number'){
                            if(item.specs[c] == filter){
                                results.push(item);
                                isFiltered = true;
                            }
                        } if(typeof item.specs[c] == 'string'){
                            if(item.specs[c].indexOf(filter) != -1){
                                results.push(item);
                                isFiltered = true;
                            }
                        } if(c == "search") {
                            if(item.name.toUpperCase().indexOf(filters[c]) > -1) {
                                results.push(item);
                                isFiltered = true;
                            }
                        }
                    });
                    if(c && filter){
                        $('input[value='+filter+']').prop('checked',true);
                    }
                });
            }
        });
        productList.renderProductsPage(results);
    }
}

export default filtersFunctions;