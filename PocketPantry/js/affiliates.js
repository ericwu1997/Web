var educational_tab_on = true;
var behavioral_tab_on = true;
var shopping_tab_on = true;

$(document).ready(function() {
    $("#expand_educational").click(function() {
        $("#educational_block").slideToggle("slow");
        if (educational_tab_on) {
            educational_tab_on = false;
            $("#expand_educational").html('Educational <img src="img/arrowDown.png" alt="collapse_arrow" height="52" width="72">');
        } else {
            $("#expand_educational").html('Educational <img src="img/arrowUp.png" alt="collapse_arrow" height="52" width="72">');
            educational_tab_on = true;
        }
    });
	$("#expand_behavioral").click(function() {
        $("#behavioral_block").slideToggle("slow");
        if (behavioral_tab_on) {
            behavioral_tab_on = false;
            $("#expand_behavioral").html('Behavioral <img src="img/arrowDown.png" alt="collapse_arrow" height="52" width="72">');
        } else {
            $("#expand_behavioral").html('Behavioral <img src="img/arrowUp.png" alt="collapse_arrow" height="52" width="72">');
            behavioral_tab_on = true;
        }
    });
	$("#expand_shopping").click(function() {
        $("#shopping_block").slideToggle("slow");
        if (shopping_tab_on) {
            shopping_tab_on = false;
            $("#expand_shopping").html('Shopping <img src="img/arrowDown.png" alt="collapse_arrow" height="52" width="72">');
        } else {
            $("#expand_shopping").html('Shopping <img src="img/arrowUp.png" alt="collapse_arrow" height="52" width="72">');
            shopping_tab_on = true;
        }
    });
});




