function queryArtist() {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        console.log(artistName);
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        console.log(queryURL);
        httpGet(queryURL, getMBID);
    }
}
function queryAlbums() {
        let mbBaseURL = 'https://musicbrainz.org/ws/2/';
        let mbSearch = 'release-group?artist=';
        let mbType = '&type=album|ep';
        let queryURL = mbBaseURL + mbSearch + artistMBID + mbType;
        httpGet(queryURL, getData);
    }
function httpGet(uRL, cbFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uRL);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cbFunction(this);
        }
    };
}
function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML; 
    console.log(retrievedData);
    let artistData = retrievedData.getElementsByTagName('artist')[0];
    console.log(artistData);
    let artistName = artistData.getElementsByTagName('name')[0].innerHTML; 
    console.log(artistName);
    let artistMBID = artistData.id;
    console.log(artistMBID);
    qAlbums(artistMBID);
}


function getData(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);
    let releases = retrievedData.getElementsByTagName('release-group');
    console.log(releases);
    let List = '<tr><th>Album Name</th><th>Released in</th></tr>';
    let discography = document.getElementById('Discography');
    
    for (i = 0; i < releases.length; i++){
    let call = releases[i];
    let names = call.getElementsByTagName('title')[0].innerHTML;
    let dates = call.getElementsByTagName('first-release-date')[0].innerHTML;
    List += `<tr><td>${names}</td><td>${dates}</td></tr>`;
}


discography.innerHTML=theList;


}


window.onload = queryArtist;
