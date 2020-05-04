$(document).ready(function() {
    $("#dropdown_toggle").on("click", function(event) {
        $("#dropdown_content").stop().slideToggle("slow");
    });
});