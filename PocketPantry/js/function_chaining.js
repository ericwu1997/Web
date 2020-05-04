var db;
var dbDays;
var dbUser;
var dbMealTime;
var dbMealOption;

//Connect to user
function connectUser(username){
//    console.log("connectUser called : " + username);
    Database.db_connectUser(username);
}

//Connect to date (day_id)
function connectDate(day_id){
//    console.log("connectDate called : " + day_id);
    Database.db_connectDate(day_id);
}

//Connect to date (day_id) & update the calendar status of that date
function init_mealStatus(day_id){
//    console.log("init_mealStatus called : " + day_id);
    Database.db_connectDate(day_id).db_calender_statusUpdate();
}


//Connect to date (day_id) & update meal selection mode image 
function retrieve_mealStatus(day_id){  
//    console.log("retrieve_mealStatus : called");
    Database.db_connectDate(day_id).db_mealPlanned_imageUpdate();
}

//Connect to meal & display list of options
function retrieve_mealOption(mealtime){
  Database.db_connectMealOption().db_mealPlanned_optionUpdate(mealtime);
}

//Add meal from firebase & update date calendar status
function addMeal(mealtime, mealoption){
//    console.log("addMeal called: " + mealtime + ", " + mealoption);
    Database.db_mealPlanned_imageUpdate().db_mealPlanned_mealUpdate(mealtime, mealoption).db_calender_statusUpdate();
}

//Add meal from firebase & update date calendar status
function removeMeal(mealtime){
    Database.db_mealPlanned_imageUpdate().db_mealPlanned_mealRemove(mealtime).db_calender_statusUpdate();
}




