var calander_tab_on = true;

$(document).ready(function() {
	$("#expand_tab").click(function() {
		$("#calendar_container").slideToggle("slow");
		if (calander_tab_on) {
			calander_tab_on = false;
		} else {
			calander_tab_on = true;
		}
	});
});

//Background shifts during close. Unintended?