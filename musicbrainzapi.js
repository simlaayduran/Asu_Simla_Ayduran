
function queryArtist() {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        httpGet(queryURL, getMBID);
    }
}
function httpGet(theURL, cbFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cbFunction(this);
        }
    };
}
function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML; 
    let artistData = retrievedData.getElementsByTagName("artist")[0];
    let artistName = artistData.getElementsByTagName("name")[0].innerHTML; 
    let artistMBID = artistData.id;
    queryAlbums(artistMBID);
}
function queryAlbums(artistMBID) {
        let mbBaseURL = 'https://musicbrainz.org/ws/2/';
        let mbSearch = 'release-group?artist=';
        let mbType = '&type=album|ep';
        let queryURL = mbBaseURL + mbSearch + artistMBID + mbType;
        httpGet(queryURL, getData);
    }
function getData(xhttp) {
    let retrievedData = xhttp.responseXML;
    let releases = retrievedData.getElementsByTagName('release-group');
    let discography = document.getElementById('discography');
    let album_table = "<table> <tr><th>Album Name</th><th>Released in</th></tr>";
    for (i = 0; i < releases.length; i++){
    let call = releases[i];
    let names = call.getElementsByTagName("title")[0].innerHTML;
    let dates = call.getElementsByTagName("first-release-date")[0].innerHTML;
    album_table += `<tr><td>${names}</td><td>${dates}"</td></tr>`;
}
album_table += "</table>";

discography.innerHTML= album_table;


}


window.onload = queryArtist;
