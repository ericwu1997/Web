window.onload = firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		user = firebase.auth().currentUser;
		name = user.displayName;
		uid = user.uid;
		console.log("Welcome " + name);
		connectUser(uid);
//        document.getElementById("sign_in_button").style.display = "none";
	} else {
//        document.getElementById("sign_in_container").innerHTML = "Hello, Potato";
//        document.getElementById("sign_in_button").style.display = "block";
		if ((String(window.location.href).includes("PocketPantry")) && !(String(window.location.href).includes("sign_in"))) {
			window.location.replace("sign_in.html");
		}
	}
});

