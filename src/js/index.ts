// Import axios with response and error. These are used for the get requests to the spotify web api
import Axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index";

// Create a variable for the login button, and put an eventlistener on the element.
let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById('LoginBtn')
buttonElement.addEventListener('click', PerformLogin)

// Create variables for the params that is used in the get call for the authorize server of spotify
let client_id = '' // Get client id on dashboard
let response_type = "token" // Response type - Set to token according to spotify documentation
let redirect_uri = "localhost:3000/index.htm" // virker ikke med localhost - skift når det er lagt op til azure

// Get request to the authorize server, to get the user to a login page of spotify. The user will be redirected back to the redirect URI, with accesstoken in the URL
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
function PerformLogin() {
  let accessToken;
  let outputElement = document.getElementById('output');
  outputElement.innerHTML = '';
  Axios({
    method: 'get',
    url: "https://accounts.spotify.com/authorize",
    params:
    {
      client_id,
      redirect_uri,
      response_type
    }
  })
  console.log("Forsøg 1");
  var URLRedirect = "https://accounts.spotify.com/authorize?client_id=5010d7b27a714aa3940a634ecd2c0b32&response_type=token&redirect_uri=http:%2F%2localhost:3000%2F" // ændre localhost til azure delen
  document.location.href = URLRedirect

  console.log(getHashParams());
}

// Function to get the access token from the URL. The access token is in the URL when redirected from the Spotify Auth. 
function getHashParams() {
  // var hash = window.location.hash.substring(1, 2) // Skaffer hashen efter # i urlen
  var hash1 = window.location.hash.split("#&")
  var hash = decodeURIComponent(hash1[1])
  console.log(hash)
  return hash

}
// Get request to get the current playing track. The get request uses the accesstoken to provide auth for the request. 
function getCurrentPlayingSong() {
  let access_token = getHashParams();
  let outputElement = document.getElementById("output");
  outputElement.innerHTML = "";
  Axios({
    method: 'get',
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    params: { Authorization: access_token }
  })
    .then((response: AxiosResponse) => {
      let data = response.data;
      outputElement.innerHTML = JSON.stringify(data)
    })
    .catch((error: AxiosError) => { console.log(error.message) });

}
