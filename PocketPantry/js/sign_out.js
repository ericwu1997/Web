function signOut() {	

	firebase.auth().signOut().then(function() {
		window.location.replace("sign_in.html");		
	});
}