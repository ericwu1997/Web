$(document).ready(function() {
    var meal_time_title = true;
    var meal_option_tab = false;
    var selectedDate = "";
    var edit_meal = "";
    
    // PC Meal Planner edit mode exit
    $("#PC_exit").on("click", function() {
        $("#meal_builder").css("display", "none");
    });
    // Calendar td onclick show indication of date selected
    $("#calendar").on("click", "td.not_past", function(event) {
        $("#calendar td.selected_date").removeClass('selected_date');
        $(event.target).addClass('selected_date');
        //Mobile - while in pre-set meal adding mode, if select other date (td), reset meal_time_block and meal_option to original //toggle state when meal selection mode is present
        if ($(window).width() < 600) {
          $("#meal_time_block").css("display", "inline");
          $("#meal_option").css("display", "none");
          meal_time_title = true;
          meal_option_tab = false;  
        } 
        //PC - edit mode pop up
        if ($(window).width() > 600) {
          $("#meal_builder").css("display", "inline");
        }
    });
    //Switching edit mode between pre-set meal adding mode & meal selection mode
    //boolean - meal_time_title
    $("#meal_time_block, #meal_option").on("click", "img", function(event) {
        // meal selection mode
        if (meal_time_title) {
            switch (event.target.id) {
                case 'breakfast':
                    $("#meal_time_title").html("Breakfast");
                    edit_meal = "breakfast";
                    retrieve_mealOption(edit_meal);
                    break;
                case 'lunch':
                    $("#meal_time_title").html("Lunch");
                    edit_meal = "lunch";
                    retrieve_mealOption(edit_meal);
                    break;
                case 'dinner':
                    $("#meal_time_title").html("Dinner");
                    edit_meal = "dinner";
                    retrieve_mealOption(edit_meal);
                    break;
            }
            // Show meal time 
            $("#default_title").animate({
                right: '100%'
            }, "slow");
            $("#meal_time_title").animate({
                left: '0'
            }, "slow");
            //Mobile hide Breakfast Lunch Dinner 
            if ($(window).width() < 600) {
                $("#meal_time_block").slideToggle("slow");
            }
            // show meal option 
            // PC meal_option toggle
            if ($(window).width() > 600) {
                $("#meal_option").slideToggle("slow").css("display", "flex");
            }
            // Mobile meal_option toggle
            if ($(window).width() < 600) {
                $("#meal_option").slideToggle("slow");
            }
            meal_time_title = false;
        } else {
            // pre-set meal adding mode
            if ((event.target.id != "breakfast") && (event.target.id != "lunch") && (event.target.id != "dinner")) {
                addMeal(edit_meal, event.target.id);
                switch (edit_meal) {
                    case "breakfast":
                        $("#breakfast_remove").removeClass("hide").addClass("show");
                        break;
                    case "lunch":
                        $("#lunch_remove").removeClass("hide").addClass("show");
                        break;
                    case "dinner":
                        $("#dinner_remove").removeClass("hide").addClass("show");
                        break;
                }
                $("#default_title").animate({
                    right: '0'
                }, "slow");
                $("#meal_time_title").animate({
                    left: '100%'
                }, "slow");
                // Mobile show Breakfast Lunch Dinner 
                if ($(window).width() < 600) {
                    $("#meal_time_block").slideToggle("slow");
                }
                // hide meal option 
                $("#meal_option").slideToggle("slow");
                meal_time_title = true;
            }
        }
    });
    $("#breakfast_remove, #lunch_remove, #dinner_remove").on("click", function(event) {
        if(meal_time_title){
            switch (event.target.id) {
                case 'breakfast_remove':
                    $("#breakfast_remove").removeClass("show").addClass("hide");
                    removeMeal("breakfast");
                    break;
                case 'lunch_remove': 
                    $("#lunch_remove").removeClass("show").addClass("hide");
                    removeMeal("lunch");
                    break;
                case 'dinner_remove':
                    $("#dinner_remove").removeClass("show").addClass("hide");
                    removeMeal("dinner");
                    break;
            }
        }
    });
});