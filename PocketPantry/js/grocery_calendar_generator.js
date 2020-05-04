//Draw calendar
function drawCalendar(date) {
    connectUser(uid);
    
	//Enumeration sets
	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	dayofweek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	//Create dates
	var d = new Date(date);
	d.setDate(1);
	var today = new Date();
	
    //Table start, Month navigation,
	var calendar = 
	"<tr>" +
		"<th colspan = '7'>" +
			"<button id='next' onclick='previousMonth()' >" +
				"<img src='img/mealPlannerArrowLeft.png' alt='left arrow' height='59' width='46'>" +
			"</button>" +
			"<button id='start_selector' onclick='slcFrom()'>From</button>" +
			"<span id='month'>" + 
				months[d.getMonth()] + 
			"</span>" +
			"<button id='end_selector' onclick='slcTo()'>To</button>" +
			"<button id='previous' onclick='nextMonth()'>" +
				"<img src='img/mealPlannerArrowRight.png' alt='right arrow' height='59' width='46'>"
			"</button>" + 
		"</th>" +
	"</tr>";
	
	//Table header
	calendar += 
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
		document.getElementById("" + (d.getMonth() + 1) + "_" + d.getDate()).addEventListener("click", function(e) {decider(this.id);}, false);


		
		init_mealStatus("" + (d.getMonth() + 1) + "_" + d.getDate());
	} while(d.getDate() > 1);
    
	retrieve_mealStatus("" + (today.getMonth()+1) + "_" + today.getDate());

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
	console.log("BACK");
	console.log(startDate);
	console.log(endDate);
	colorDateRange(startDate.date, endDate.date);
}

// Show next month
function nextMonth() {
	d.setMonth(d.getMonth()+1);
	// mealPlan("" + (d.getMonth() + 1) + "_" + 1);
	drawCalendar(d);
	console.log("NEXT");
	console.log(startDate);
	console.log(endDate);
	colorDateRange(startDate.date, endDate.date);
}

//On Window load, call currentMonth
onload = init_dbLibrary();