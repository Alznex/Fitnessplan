function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

function handleCredentialResponse(response){
    const responsePayload = decodeJwtResponse(response.credential);

    let ID = responsePayload.sub;
    let name = responsePayload.name;
    let alias = responsePayload.given_name;
    let familien_name = responsePayload.family_name;
    let img = responsePayload.picture;
    let email = responsePayload.email;
    console.log("ID:" & ID)
}