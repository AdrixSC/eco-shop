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

  login = (e) => {
      e.preventDefault();
      firebase.auth()
          .signInWithPopup(provider)
          .then(function(e) {
              e.preventDefault;
              const btnLogin = document.getElementById("login");
              const btnLogout = document.getElementById("logout");
              btnLogout.classList.remove("d-none");
              btnLogout.classList.add("d-block");
              btnLogin.classList.remove("d-block");
              btnLogin.classList.add("d-none");
          });
  };

  let btnLogin = document.getElementById("login").addEventListener("click", login);