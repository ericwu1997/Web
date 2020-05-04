//Draw calendar
function drawCalendar(date) {
    connectUser(uid);
    
	//Enumeration sets
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var dayofweek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	//Create dates
	var d = new Date(date);
	d.setDate(1);
	var today = new Date();
    
    //Table header
    var calendar = 
	"<tr id='calendar_days_headings'>" +
		"<th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>" +
	"</tr>";
	
	
	// Calendar start
	calendar += "<tr>"; 
	//Correct placement of first week
	var weekday = d.getDay();
	if (weekday > 0 && weekday < 7) {
		calendar += "<td class='not_clickable' colspan = " + weekday + "></td>";
	}
	
	//Print days until end of month
	do {	
		// Print on next row if end of week
		if (d.getDay() == 0) {
			calendar += "</tr><tr>";
		}
		calendar += 
			"<td id='" + (d.getMonth() + 1) + "_" + d.getDate() + "'>" +
				"<span class='day'>" + d.getDate() + "</span>" +
			"</td>";
		//Increment day
		d.setDate(d.getDate() + 1);
		
	} while (d.getDate() > 1);

	// Fill last row with empty box
	if (d.getDay() > 0 && d.getDay() <= 6) {
		calendar += "<td class='not_clickable' colspan = " + (7 - d.getDay()) + "></td>";
	}
    
    //Table start, Month navigation,
    calendar += 
	"<tr>" +
		"<th colspan = '7'>" +
			"<button id='next' onclick='previousMonth()' >" +
				"<img src='img/mealPlannerArrowLeft.png' alt='left arrow' height='59' width='46'>" +
			"</button>" + 
			"<span id='month'>" + 
				months[d.getMonth() - 1] + 
			"</span>" +
			"<button id='previous' onclick='nextMonth()'>" +
				"<img src='img/mealPlannerArrowRight.png' alt='right arrow' height='59' width='46'>"
			"</button>" + 
		"</th>" +
	"</tr>";
    
	// Calendar end
	calendar += "</tr>";

	//Print Calendar
	document.getElementById("calendar").innerHTML = calendar;

	//Highlight today
	if (d.getMonth() - 1 == today.getMonth() && d.getFullYear() == today.getFullYear()) {
        document.getElementById("" + (today.getMonth() + 1) + "_" + today.getDate()).style.backgroundColor = "#DFEBFA";
        document.getElementById("" + (today.getMonth() + 1) + "_" + today.getDate()).classList.add('selected_date'); 
	}

	// Color previous days, addEventListener to every say & draw in dots
	do {	
		d.setDate(d.getDate() - 1);
		if (d.getFullYear() < today.getFullYear() ||
            d.getFullYear() == today.getFullYear() && d.getMonth() < today.getMonth() ||
            d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() < today.getDate()){
            document.getElementById("" + (d.getMonth() + 1) + "_" + d.getDate()).classList.add('greyout_date');
		} else {
            document.getElementById("" + (d.getMonth() + 1) + "_" + d.getDate()).addEventListener("click", function(e) {retrieve_mealStatus(this.id);change_today(this.id);}, false);
            document.getElementById("" + (d.getMonth() + 1) + "_" + d.getDate()).classList.add('not_past');
            document.getElementById("" + (d.getMonth() + 1) + "_" + d.getDate()).innerHTML += 
                "<div class='dot_container'>" + 
                    "<div id='" + 
                        "breakfast_" + "" + (d.getMonth() + 1) + "_" + d.getDate() + 
                            "' class='dot un_planned'>&#9679;</div>" +
                    "<div id='" + 
                        "lunch_" + "" + (d.getMonth() + 1) + "_" + d.getDate() + 
                            "' class='dot un_planned'>&#9679;</div>" +
                    "<div id='" + 
                        "dinner_" + "" + (d.getMonth() + 1) + "_" + d.getDate() + 
                            "' class='dot un_planned'>&#9679;</div>" +
                "</div>";
		}
		
		
		init_mealStatus("" + (d.getMonth() + 1) + "_" + d.getDate());
	} while(d.getDate() > 1);
    
    document.getElementById("getToday").addEventListener("click", function(e) {currentMonth();retrieve_mealStatus("" + (today.getMonth()+1) + "_" + today.getDate());}, false);
	retrieve_mealStatus("" + (today.getMonth()+1) + "_" + today.getDate());
    document.getElementById('selected_date_header').innerHTML = "" + dayofweek[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate();
}

//todayTab click fucntion
function change_today(selected_day){
    var d = new Date();
    var selected_month = parseInt(selected_day.split("_")[0]);
    var selected_date = parseInt(selected_day.split("_")[1]);
    d.setDate(selected_date);
    d.setMonth(selected_month - 1);
    var dayofweek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    document.getElementById('selected_date_header').innerHTML = "" + dayofweek[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
}

// Show current month
function currentMonth() {
	d = new Date();
	// calls function to // Display current chosen meals or add meal (null) pic
	// mealPlan("" + (d.getMonth() + 1) + "_" + d.getDate());
	drawCalendar(d);
}

// Show previous month
function previousMonth() {
	d.setMonth(d.getMonth()-1);
	// mealPlan("" + (d.getMonth() + 1) + "_" + 1);
	drawCalendar(d);
}

// Show next month
function nextMonth() {
	d.setMonth(d.getMonth()+1);
	// mealPlan("" + (d.getMonth() + 1) + "_" + 1);
	drawCalendar(d);
}

//On Window load, call currentMonth
onload = currentMonth, init_dbLibrary();
