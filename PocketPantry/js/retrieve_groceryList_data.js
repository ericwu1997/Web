db = firebase.database();
dbDays = db.ref().child('days');
dbMeals = db.ref().child('meals');

var planned_days = new Array();
var meal_collection = new Array();

var dairy_list = new Array();
var meat_list = new Array();
var fruit_veg_list = new Array();
var other_list = new Array();
var added_list = new Array();

function retrieve_grocerylist(startDate, endDate){
    find_planned_days(dayRange_to_array(startDate, endDate));
    return_categorized_groceryList();
}

function return_categorized_groceryList(){
    dairy_list = new Array();
    meat_list = new Array();
    fruit_veg_list = new Array();
    other_list = new Array();
    
    setTimeout(
        function() {
            for(i = 0; i < planned_days.length; i++){
                dbUser.child(planned_days[i]).once("value").then(date_snapshot => { //5_23
//                    console.log(date_snapshot.key);
                    date_snapshot.forEach(function(mealtime_snapshot) { //breakfast
//                        console.log(mealtime_snapshot.key);
                        dbMeals.child(mealtime_snapshot.key).once("value").then(meal_snapshot => { //meals -> breakfast
//                            console.log(meal_snapshot.key);
                            meal_snapshot.ref.child(mealtime_snapshot.val()).once("value").then(function(dish_snapshot) {
//                                console.log(ingredientList_snapshot.key);
                                dish_snapshot.forEach(function(ingredient_snapshot) {
                                    ingredient_snapshot.ref.child("type").once("value").then(function(type_snapshot) {
                                        ingredient_snapshot.ref.child("qty").once("value").then(function(qty_snapshot) {
                                            ingredient_snapshot.ref.child("unit").once("value").then(function(unit_snapshot) {
                                                var item = ingredient_snapshot.key;
                                                var qty = qty_snapshot.val();
                                                var unit = unit_snapshot.val();
                                                foo = {}; 
                                                foo["name"] = item; 
                                                foo["amount"] = qty; 
                                                foo["unit"] = unit; 
                                                switch(type_snapshot.val()){
                                                    case "dairy":
                                                        if(!checkIfItem_added(item, qty, dairy_list)){
                                                            dairy_list.push(foo);
                                                        } 
                                                        break;
                                                    case "meat":
                                                        if(!checkIfItem_added(item, qty, meat_list)){
                                                            meat_list.push(foo);
                                                        } 
                                                        break;
                                                    case "fruitveg":
                                                        if(!checkIfItem_added(item, qty, fruit_veg_list)){
                                                            fruit_veg_list.push(foo);
                                                        } 
                                                        break;
                                                    case "assorted":
                                                        if(!checkIfItem_added(item, qty, other_list)){
                                                            other_list.push(foo);
                                                        } 
                                                        break;
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        },
        1000
    );
}

function checkIfItem_added(item, qty, type_array){
    for(i = 0; i < type_array.length; i++){
        if(type_array[i].name == item){
            type_array[i].amount += qty;
            return true;
        }
    }
    return false;
}

function find_planned_days(day_range){
    planned_days = new Array();
    for(i = 0; i < day_range.length; i++){
        dbUser.child(day_range[i]).once("value").then(snapshot => {
            if(snapshot.exists()){
                var date = snapshot.key;
                planned_days.push(date);
            }
        });
    } 
}


function dayRange_to_array(startDate, endDate){
    var day_array = new Array();
    
    var startDate_month = parseInt(startDate.split("_")[0]);
    var startDate_day   = parseInt(startDate.split("_")[1]);
    var endDate_month   = parseInt(endDate.split("_")[0]);
    var endDate_day     = parseInt(endDate.split("_")[1]);
    
    var first_month_days = new Date(2017, startDate_month, 0).getDate();
    
    var dateRange = new Array();
    var str = startDate + "_" + endDate;
    
    if(startDate_month < endDate_month){
    //start 
        for(i = startDate_day; i <= first_month_days; i++){
            day_array.push(startDate_month + "_" + i);
        }

        //end      
        for(i = 1; i <= endDate_day; i++){
            day_array.push(endDate_month + "_" + i);
        }
    } else {
        for(i = startDate_day; i <= endDate_day; i++){
            day_array.push(startDate_month + "_" + i);
        }
    }
    
    return day_array;
}

