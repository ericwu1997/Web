var overlayElement = null;
var modalWindowElement = null;
window.addEventListener('load', initApp, false);

function initApp() {
  setTimeout(function() { window.scrollTo(0, 1); }, 10);
  // document.getElementById("popUpBtn").addEventListener("click", function() {
    // showPopUpMessage('<div id="calendar_container"><table id="calendar"></table></div><p id="calendar_instructions">Tap the first and last dates to shop for!</p>');
  // }, false);
  
	document.getElementsByClassName("popUpBtn")[0].addEventListener("click", function() {
    showPopUpMessage('<div id="calendar_container"><table id="calendar"></table></div><div id="done_btn">DONE</div>');
  }, false);
	document.getElementsByClassName("popUpBtn")[1].addEventListener("click", function() {
    showPopUpMessage('<div id="calendar_container"><table id="calendar"></table></div><div id="done_btn">DONE</div>');
  }, false);
}
//show the modal overlay and popup window
function showPopUpMessage(msg) {
  overlayElement = document.createElement("div");
  overlayElement.className = 'modalOverlay';
  modalWindowElement = document.createElement("div");
  modalWindowElement.className = 'modalWindow';
  modalWindowElement.innerHTML = msg;
  document.body.appendChild(overlayElement);
  document.body.appendChild(modalWindowElement);
  document.body.className = 'modal-open';
  doneBtn = document.getElementById("done_btn");
  setTimeout(function() {
    modalWindowElement.style.opacity = 1;
    overlayElement.style.opacity = 0.8;
    overlayElement.addEventListener("click", hidePopUpMessage, false);
    doneBtn.addEventListener("click", hidePopUpMessage, false);
  }, 300);
  currentMonth();
}
//hide the modal overlay and popup window
function hidePopUpMessage() {
  modalWindowElement.style.opacity = 0;
  overlayElement.style.opacity = 0;
  overlayElement.removeEventListener("click", hidePopUpMessage, false);
  setTimeout(function() {
    document.body.removeChild(overlayElement);
    document.body.removeChild(modalWindowElement);
  }, 400);
	document.body.className = '';
  
  if(endDate.date == "") {
	  endDate.date = startDate.date;
  }
  if(startDate.date == "") {
	  startDate.date = endDate.date;
  }
  
  console.log("startDate.date: " + startDate.date);
  console.log("endDate.date: " + endDate.date);
  
  	var str1 = startDate.date.split("_");
	var str2 = endDate.date.split("_");
  
    if(!((startDate.date == "") && (endDate.date == ""))) {
		document.getElementsByClassName("popUpBtn")[0].innerHTML = "" + months[str1[0] - 1] + " " + str1[1];
		document.getElementsByClassName("popUpBtn")[1].innerHTML = "" + months[str2[0] - 1] + " " + str2[1];
		retrieve_grocerylist(startDate.date, endDate.date);
		loadTable();
	}
	
}