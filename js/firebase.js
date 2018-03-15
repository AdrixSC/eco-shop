  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNSsnX7yIWo0itsMRhDQrIydY6hb7JD6Y",
    authDomain: "eco-shop-29e5c.firebaseapp.com",
    databaseURL: "https://eco-shop-29e5c.firebaseio.com",
    projectId: "eco-shop-29e5c",
    storageBucket: "",
    messagingSenderId: "876151682255"
  };
  firebase.initializeApp(config);

  let provider = new firebase.auth.GoogleAuthProvider();

login = (button) => {
    console.log("jala")
	e.preventDefault();

	firebase.auth()
		.signInWithPopup(provider)
		.then(function(result) {
      
		});
};

let btnLogin = document.getElementById("login").addEventListener("click", login);
