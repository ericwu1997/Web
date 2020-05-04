//Grocery list library obj
var GroceryList;
//all added category to be printed

//all category in one array
var categories = new Array();

//item check out
var checkOut_list = [[], [], [], []];
var addedItem_list = [];

var showList = new Array();

//promises
var category_promise = [
    true, true, true, true
];
var addedItem_promise = true;

// tip of the day
// tips taken from https://greatist.com/health/how-to-ways-reduce-food-waste
var tips = [
	"Avoid impulse purchases by planning meals in advance.", 
	"Don't buy foods just because they're on sale; buy only what you will actually eat.",
	"Follow the First-In-First-Out philosophy: use older groceries before newer ones.",
	"Keep track of your food expiration dates so you can use your groceries before they expire.",
	"If your fridge is operating at maximum efficiency, it can extend the shelf life of the foods in it."
	];

function init_groceryListLibrary(){
    console.log("Init: GroceryList Library");
    GroceryList = new GroceryList_obj();
	
	// print tip of the day
	var tip = daily_tip();
    document.getElementById("thought").innerHTML = tip;
}

// choose tip of the day
function daily_tip() {
	var choice = Math.floor(Math.random() * tips.length);
	return tips[choice];
}

//Object

var GroceryList_obj = function(){
    this.gl_categoryList_group = function (){
        gl_categoryList_group();
        return this;
    }
    this.gl_addToShowList = function (){
        gl_addToShowList();
        return this;
    }
    this.gl_listItems = function (){
        gl_listItems();
        return this;
    }
    this.gl_clearTable = function (){
        gl_clearTable();
		return this;
    }
	this.debug_check_arrayEmpty = function(){
        debug_check_arrayEmpty();
        return this;
    }
}

//Define

function gl_clearTable(){
    var node = document.getElementById("grocery_list");			
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function gl_categoryList_group(){
    categories = new Array();
	
    categories.push(dairy_list);
	checkMark(dairy_list, "dairy_checked", "dairy_num");
	
    categories.push(meat_list);
	checkMark(meat_list, "meat_checked", "meat_num");
	
    categories.push(fruit_veg_list);
	checkMark(fruit_veg_list, "fruits_vege_checked", "fruits_vege_num");

    categories.push(other_list);
	checkMark(other_list, "assorted_checked", "assorted_num");
    
    for(i = 0; i < categories.length; i++){
        for(j = 0; j < categories[i].length; j++){
            if(checkOut_list[i][j] != true && checkOut_list[i][j] != false){
                checkOut_list[i].push(false);
            }
        }
    }
	
	document.getElementById("dairy_num").innerHTML = itemCheckOut(0, "dairy");
    document.getElementById("meat_num").innerHTML = itemCheckOut(1 , "meat");
    document.getElementById("fruits_vege_num").innerHTML = itemCheckOut(2 , "fruits_vege");
    document.getElementById("assorted_num").innerHTML = itemCheckOut(3 , "assorted");    
}

function add_checkMark(){
    var add_number = document.getElementById("added_num");
    if(add_number.innerHTML == 0){
        document.getElementById("added_num").classList.remove('show');
        document.getElementById("added_num").classList.add('hide');
        document.getElementById("added_checked").classList.add('show');
        document.getElementById("added_checked").classList.remove('hide');
    } else {
        document.getElementById("added_num").classList.add('show');
        document.getElementById("added_num").classList.remove('hide');
        document.getElementById("added_checked").classList.remove('show');
        document.getElementById("added_checked").classList.add('hide');
    }
}

function checkMark(type_list, type_checked, type_num){
    if(type_list == null || type_list.length == 0){
        document.getElementById(type_checked).classList.add('show');
        document.getElementById(type_checked).classList.remove('hide');
        document.getElementById(type_num).classList.add('hide');
        document.getElementById(type_num).classList.remove('show');
    } else{
        document.getElementById(type_checked).classList.add('hide');
        document.getElementById(type_checked).classList.remove('show');
        document.getElementById(type_num).classList.add('show');
        document.getElementById(type_num).classList.remove('hide');
    }
}
function itemCheckOut(type, type_list){
    var count = 0;
    for(i = 0; i < checkOut_list[type].length; i++){
        if(checkOut_list[type][i] == false){
            count++;
        }
    }
    if(count == 0){
        checkMark(null, type_list + "_checked", type_list + "_num");
    }
    return count;
}

function gl_addToShowList(){
    showList = new Array();
    for(var i = 0; i < category_promise.length; i++){
        if(category_promise[i]){
            showList.push(categories[i]);
        } else {
            showList.push(new Array());
        }
    }
}

function checkOffItem(id){
    console.log(id);
    var type_list;
    var type = id.split("_")[0];
    var item = id.split("_")[1];
    var sign = 0;
    
    var check = document.getElementById(type + "_" + item + "_check").checked;
    document.getElementById(type + "_" + item + "_check").checked = !check;
    if(check){
        sign = 1;
        checkOut_list[type][item] = false;
//        console.log(JSON.stringify(checkOut_list));
    } else {
        sign = -1;
        checkOut_list[type][item] = true;
//        console.log(JSON.stringify(checkOut_list));
    }
    switch(type){
        case "0":
            var remain_num = document.getElementById("dairy_num");
            type_list = "dairy"
            break;
        case "1":
            var remain_num = document.getElementById("meat_num");
            type_list = "meat"
            break;
        case "2":
            var remain_num = document.getElementById("fruits_vege_num");
            type_list = "fruits_vege"
            break;
        case "3":
            var remain_num = document.getElementById("assorted_num");
            type_list = "assorted"
            break;
    }
    var item_num = parseInt(remain_num.innerHTML) + sign;
    remain_num.innerHTML = item_num;
    if(item_num == 0){
        checkMark(null, type_list + "_checked", type_list + "_num");
    } else {
        checkMark(type_list + "_list", type_list + "_checked", type_list + "_num");
    }
}

function added_checkOffItem(id){
    var item = id.split("_")[0];
    var item_check = id.split("_")[1];
    var add_number = document.getElementById("added_num");
    if(document.getElementById(item + "_check") != null){
        var check = document.getElementById(item + "_check").checked;
        document.getElementById(item + "_check").checked = !check;
        if(check){
            add_number.innerHTML = parseInt(add_number.innerHTML) + 1;
        } else {
            add_number.innerHTML = parseInt(add_number.innerHTML) - 1;
        }
    } else { 
        if(add_number.innerHTML != 0){
            var add_number = document.getElementById("added_num");
            add_number.innerHTML = parseInt(add_number.innerHTML) - 1;
        }
    }
    add_checkMark();
}

function gl_listItems(){
//    console.log("listItem called");
	
	var node = document.getElementById("grocery_list");
//    console.log(JSON.stringify(showList));

    for (var i = 0; i < showList.length; i++) {
        for (var j = 0; j < showList[i].length; j++) {
			var id;
            var inputObj = document.createElement("input");
            inputObj.setAttribute("type", "checkbox");
			if(checkOut_list[i][j]){
                inputObj.setAttribute("checked", true);
            }
            inputObj.setAttribute("id", "" + i + "_" + j + "_check");
            inputObj.style.pointerEvents = "none";
			
            var row = document.createElement("tr");
			row.setAttribute("id", "" + i + "_" + j);
            row.addEventListener("click", function(e) {checkOffItem(this.id);}, false);

            var checkBox = document.createElement("td");
            checkBox.appendChild(inputObj);

            var name = document.createElement("td");
            var ingredientsName = showList[i][j].name.replace(/([A-Z])/g, ' $1').slice(1);
            ingredientsName = showList[i][j].name.charAt(0).toUpperCase() + ingredientsName;
            name.appendChild(document.createTextNode(ingredientsName));

            var amount = document.createElement("td");
            amount.appendChild(document.createTextNode(showList[i][j].amount));

            var unit = document.createElement("td");
            unit.appendChild(document.createTextNode(showList[i][j].unit));

            row.appendChild(checkBox);
            row.appendChild(name);
            row.appendChild(amount);
            row.appendChild(unit);

            document.getElementById("grocery_list").appendChild(row);
        }
    }
}

// add the item the user typed
function gl_userItems() {
	var inputObj = document.createElement("input");
	inputObj.setAttribute("type", "checkbox");
    inputObj.setAttribute("id", "" + document.getElementById("item_name").value + "_check");
    inputObj.style.pointerEvents = "none";

	var row = document.createElement("tr");
    row.setAttribute("id", "" + document.getElementById("item_name").value);
    row.addEventListener("click", function(e) {added_checkOffItem(this.id);}, false);
    
	var checkBox = document.createElement("td");
	checkBox.appendChild(inputObj);

	var name = document.createElement("td");
	name.appendChild(document.createTextNode("" + document.getElementById("item_name").value));

	var qty = document.createElement("td");
	qty.appendChild(document.createTextNode("" + document.getElementById("item_quantity").value));

	var remove = document.createElement("td");
	remove.setAttribute("onclick", "remove_items(this)");
	remove.appendChild(document.createTextNode("\u00D7"));
	
	row.appendChild(checkBox);
	row.appendChild(name);
	row.appendChild(qty);
	row.appendChild(remove);

	document.getElementById("user_added_items").appendChild(row);
    var add_number = document.getElementById("added_num");
    
    add_number.innerHTML = parseInt(add_number.innerHTML) + 1;
    add_checkMark();
	
//    foo = {}; 
//    foo["name"] = document.getElementById("item_name").value; 
//    foo["amount"] = document.getElementById("item_quantity").value; 
//    foo["unit"] = "custome"; 
//    
//    addedItem_list.push(foo);
	
	if (!addedItem_promise) {
		addedItem_toggle();
	}
}

// remove items
function remove_items(td) {
	// remove the clicked item
	td.parentNode.parentNode.removeChild(td.parentNode);
	
	// clear any error messages, if shown
	document.getElementById("errorMessage").innerHTML = "";
	
	// clear easter egg, if shown
	document.getElementById("food_for_thought").style.display = "none";
	document.getElementById("easter").style.display = "none";
	document.getElementById("thought").innerHTML = "";
	
	// hide "Your items" text if no added items left
	if (!document.getElementById("user_added_items").firstChild) {
		addedItem_toggle();
	}
    
    add_checkMark();
}

//Chaining

function init_listToPrint(){
    GroceryList.gl_categoryList_group().gl_addToShowList().gl_clearTable().gl_listItems();
	
	print_user_added_table();
}

function category_select(id){
    var promise;
    switch(id){
        case "dairy_toggle":
            category_promise[0] = !category_promise[0];
            promise = category_promise[0];
            break;
        case "meat_toggle":
            category_promise[1] = !category_promise[1];
            promise = category_promise[1];
            break;
        case "fruits_vege_toggle":
            category_promise[2] = !category_promise[2];
            promise = category_promise[2];
            break;
        case "assorted_items_toggle":
            category_promise[3] = !category_promise[3];
            promise = category_promise[3];
            break;
    }
    if(promise){
        document.getElementById(id).classList.remove("selected_tab");
    } else {
        document.getElementById(id).classList.add("selected_tab");
    }
    GroceryList.gl_clearTable();
    init_listToPrint();
}

function addedItem_toggle(){
    var promise;
    addedItem_promise = !addedItem_promise;
    promise = addedItem_promise;
    if(promise){
        document.getElementById("added_items_toggle").classList.remove("selected_tab");
    } else {
        document.getElementById("added_items_toggle").classList.add("selected_tab");
    }
    print_user_added_table();
}

function addedItem(){
    var item = document.getElementById("item_name").value;
    var quantity = document.getElementById("item_quantity").value;
    name = item.toLowerCase();
    var message = "";
    var easter;
    if (/^2910$/.test(quantity)) {
        message = "Have you completed this week's sprint?";
        easter = true;
    } else if (name == "carly") {
        message = "MILLION DOLLAR TIP: Save our planet with Zero Food Waste!";
        easter = true;
    } else if (name == "darcy") {
        message = "You shouldn't be coding on weekends. -Darcy Smith, May 2017";
        easter = true;
    } else if (name == "qussay") {
        message = "Full marks for this Easter egg!";
        easter = true;
    } else if (name == "chris") {
        message = "Java is the best coding language!";
        easter = true;
    } else if (name == "pocket pantry" || name == "pocketpantry") {
        message = "Helping you plan meals and reduce waste.";
        easter = true;
    } else if (name == "food waste") {
        message = "What have you thrown away today?";
        easter = true;
    } else {
        var item_valid = validate_input();
    }
    document.getElementById("thought").innerHTML = message;
    if (easter) {
        document.getElementById("food_for_thought").style.display = "";
		document.getElementById("easter").style.display = "inline-block";
        document.getElementById("item_name").value = "";
        document.getElementById("item_quantity").value = "";
		document.getElementById("errorMessage").innerHTML = "";
    } else {
        document.getElementById("food_for_thought").style.display = "none";
		document.getElementById("easter").style.display = "none";
		
		if (item_valid) {
			gl_userItems();
			
			document.getElementById("item_name").value = "";
			document.getElementById("item_quantity").value = "";
		}
    }
}

function validate_input() {
	var name = document.getElementById("item_name").value;
	var qty = document.getElementById("item_quantity").value;
	var message = "";
	
	// item names allow only letters and spaces
	var patt1 = /[^a-zA-Z ]+/;
	// item quantities allow only numbers, letters, and spaces
	var patt2 = /[^0-9a-zA-Z ]+/;
	
	document.getElementById("errorMessage").innerHTML = "";
	
	if (name == "" || patt1.test(name)) {
		message = "Please enter an item name with only letters and spaces.<br>";
	} else if (name.length >= 24) {
		message = "Please limit the item name to less than 24 characters.<br>";
	}
	
	if (parseInt(qty) <= 0) {
		message += "Please use a positive, non-zero quantity.";
	} else if (patt2.test(qty)) {
		message += "Please enter an item quantity with only numbers, letters, and spaces.";
	} else if (qty.length >= 10 ) {
		message += "Please limit the item quantity to less than 10 characters.";
	}
	
	if (message == "") {
		return true;
	} else {
		document.getElementById("errorMessage").innerHTML = message;
		return false;
	}
}

// toggle visibility of added items section
function print_user_added_table() {
	if (addedItem_promise) {
		document.getElementById("add_list").style.display = "";
	} else {
		document.getElementById("add_list").style.display = "none";
	}
}

function loadTable(){
//    console.log("firstLoad called");
	checkOut_list = [[], [], [], [], []];
    init_groceryListLibrary();
    setTimeout(
        function() {
            init_listToPrint();
        },
        3000
    );
}

onload = init_groceryListLibrary();
