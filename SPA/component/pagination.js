
let currentPageNo = 1;
export const pagination  = {
    createPagination : () =>  {
            let pageSize = 8,
            incremSlide = 8,
            startPage = 0,
            numberPage = 0;

            var pageCount =  $(".line-content").length / pageSize;
                
            for(var i = 0 ; i<pageCount;i++){
                $("#pagin").append('<li><a href="#">'+(i+1)+'</a></li> ');
                if(i > pageSize){
                $("#pagin li").eq(i).hide();
                }
            }

            var prev = $("<li/>").addClass("prev").html("Prev").click(function(){
                startPage -= pageSize;
                incremSlide -= pageSize;
                numberPage--;
                currentPageNo -= 1;
                slide(currentPageNo);
            });

            prev.hide();

            var next = $("<li/>").addClass("next").html("Next").click(function(){
                startPage += pageSize;
                incremSlide += pageSize;
                numberPage++;
                currentPageNo += 1;
                slide(currentPageNo);
            });

            $("#pagin").prepend(prev).append(next);


            let slide = function(sens){
                for(let t = startPage; t < incremSlide; t++){
                    $("#pagin li").eq(t+1).show();
                }
                showPage(currentPageNo);
            }

            let prevNextLink = function(){
                if(startPage == 0 || (startPage == incremSlide)){
                    next.show();
                    prev.hide();
                } else if(incremSlide == $(".line-content").length ){
                    next.hide();
                    prev.show();
                }else {
                    next.show();
                    prev.show();
                }
            }
            let showPage = function(page) {
                $(".line-content").hide();
                $("#pagin li a").removeClass("current");
                $("#pagin li a").eq(page - 1).addClass("current");
                incremSlide = pageSize * page;
                startPage = incremSlide / page;
                $(".line-content").each(function(n) {
                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $(this).show();
                });     
                prevNextLink();   
            }
                
            showPage(currentPageNo);
            $("#pagin li a").eq(0).addClass("current");

            $("#pagin li a").click(function() {
                $("#pagin li a").removeClass("current");
                $(this).addClass("current");
                currentPageNo = parseInt($(this).text());
                showPage(currentPageNo);
            });
        }  
    }
    
    export default pagination;