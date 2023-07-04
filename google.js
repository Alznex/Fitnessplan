 // Discovery doc URL for APIs used by the quickstart
 const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
 let gapiInited = false;

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    let API_KEY = document.getElementById("API_KEY").value
    let client_id = "992099953263-kfvfhm63aige76ilpjlp2upt62cfigg6.apps.googleusercontent.com"

    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    gapiInited = true;
  }

 /**
       * Print metadata for first 10 files.
       */
 async function listFiles() {

    let response;
    try {
      response = await gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'files(id, name)',
      });
    } catch (err) {
      document.getElementById('main').innerText = JSON.parse(err.body).error.message;
      return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
      document.getElementById('main').innerText = 'No files found.';
      return;
    }
    // Flatten to string to display
    const output = files.reduce(
        (str, file) => `${str}${file.name} (${file.id})\n`,
        'Files:\n');
    document.getElementById('main').innerText = output;
  }


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
    localStorage.setItem("user_id", ID);
}

function saveToGoogle(){
}