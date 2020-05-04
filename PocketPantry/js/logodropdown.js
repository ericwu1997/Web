$(document).ready(function() {

var affiliates_tab = false;

// Affiliates page navigation toggle
    $("#mobile_home_page_nav").on("click", "img", function() {
        if(!affiliates_tab){
            $("#mobile_home_page_nav").find("img").css({'background-color' : '#719c6e','box-shadow' : 'inset 0px 0px 10px rgba(0,0,0,0.5)'});
            affiliates_tab = true;
        } else {
            $("#mobile_home_page_nav").find("img").css({'background-color' : '#8DC289','box-shadow' : 'none'});
            affiliates_tab = false;
        }
        $("#affiliates").slideToggle("slow");
    });
});