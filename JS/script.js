$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCqinq2_pCLmF9c6kZMkIonjJPlIpTmIpw",
    authDomain: "evaluate-chat.firebaseapp.com",
    databaseURL: "https://evaluate-chat.firebaseio.com",
    projectId: "evaluate-chat",
    storageBucket: "evaluate-chat.appspot.com",
    messagingSenderId: "385071038843",
    appId: "1:385071038843:web:0f81180ad3a8e7bfa9fdde",
    measurementId: "G-MH41MFMXEZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();
  const auth = firebase.auth();
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  //const $signInfo = $('#sign-info');
  const $avatarName = $('#avatar-name');
  const $avatarEmail = $('#avatar-email');



  // SignIn
  $btnSignIn.click(function (e) {
    auth.signInWithEmailAndPassword($email.val(), $password.val())

      .then(function () {       
        window.location.href = "https://chinjiangin.github.io";
      })
      .catch(function (e) {
        //$signInfo.html(e.message);
      });
  })
  //SignUp
  $btnSignUp.click(function (e) {
    auth.createUserWithEmailAndPassword($email.val(), $password.val())
      .then(function () {
        const user = auth.currentUser;
        if (user) {
          user.updateProfile({
            displayName: $('#userName').val()
          })
            .then(function () {
              $email.val('');
              $password.val('');
              $('#userName').val('');
              window.location.href = "https://chinjiangin.github.io";
            })
        } else {
          //$signInfo.html(e.message);
        }

      })

      .catch(function (e) {
        //$signInfo.html(e.message);
      });
  })
  // Signout
  $btnSignOut.click(function () {
    auth.signOut();
    $email.val('');
    $password.val('');
    //$signInfo.html('No one login...');
    window.location.href = "https://chinjiangin.github.io/";
  })


  auth.onAuthStateChanged(function (user) {
    var user = auth.currentUser;    
    if (user != null) {
      $signInfo.html(`${user.email} is login...`)
      user.providerData.forEach(function (profile){
        $avatarName.html(profile.displayName);
        $avatarEmail.html(profile.email);
      })
    } else {
     // $signInfo.html("not logged in");
    }
  });

  // let usersRef = db.collection("users");
  // let docRef = usersRef.doc("1167");
  // docRef.onSnapshot(function (doc) {
  //   $(`#title`).html(`user name = ${doc.data().age}`);
  // })
  // docRef.update({
  //   "age": 26,
  //   "name": "Martin Lee"
  // })

  // usersRef.doc("1167").set({
  //   "name": "Alex",
  //   "age": 27,
  //   "tel": {
  //     "tel1": "111-111",
  //     "tel2": "222-222"
  //   }
  // })
});
