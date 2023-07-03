function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.gteEmail());
    $("#image").attr('src', profile.gteImageUrl());
    $(".g-signin2").css("display", "none");
    $(".data").css("display", "block");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You have been signet oud successfully")
      $(".g-signin2").css("display", "block");
      $(".data").css("display", "none");
    });
}