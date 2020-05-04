var Database;

function init_dbLibrary(){
    console.log("Init: DB Library");
    Database = new Database_obj();
}

var Database_obj = function(){
    this.db_connectUser = function (username){
        db_connectUser(username);
        return this;
    }
    this.db_connectDate = function (day_id){
        db_connectDate(day_id);
        return this;
    }
    this.db_connectMealTime = function (mealtime){
        db_connectMealTime(mealtime);
        return this;
    }
    this.db_connectMealOption = function (){
        db_connectMealOption();
        return this;
    }
    this.db_calender_statusUpdate = function (day_id){
        db_calender_statusUpdate(day_id);
        return this;
    }
    this.db_mealPlanned_imageUpdate = function (){
        db_mealPlanned_imageUpdate();
        return this;
    }
    this.db_mealPlanned_mealUpdate = function (mealtime, mealoption){
        db_mealPlanned_mealUpdate(mealtime, mealoption);
        return this;
    }
    this.db_mealPlanned_mealRemove = function (mealtime){
        db_mealPlanned_mealRemove(mealtime);
        return this;
    }
    this.db_mealPlanned_optionUpdate = function (mealtime){
        db_mealPlanned_optionUpdate(mealtime);
        return this;
    }
}