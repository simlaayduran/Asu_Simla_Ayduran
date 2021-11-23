
function queryArtist () {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')){
        let artistName = params.get('artist'); 
        console.log(artistName);
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName; 
        console.log(queryURL);
        httpGet(queryURL, getMBID);
    }
}
function queryAlbums(artistMBID) {
    let mbBaseURL = "https://musicbrainz.org/ws/2/";
    let mbBrowse = "release-group?artist=";
    let mbType = "&limit=200";
    let queryURL = mbBaseURL + mbBrowse + artistMBID + mbType;
    httpGet(queryURL, getAlbData);
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
    console.log(retrievedData);
    let artistData = retrievedData.getElementsByTagName("artist")[0]; 
    console.log(artistData);
    let artistName = artistData.getElementsByTagName('name')[0].innerHTML; 
    console.log(artistName);
    let artistMBID = artistData.id; 
    console.log(artistMBID);
    queryAlbums(artistMBID);
}

function getAlbData(xhttp) {
   let retrievedData = xhttp.responseXML; 
    console.log(retrievedData);
    let releases = retrievedData.getElementsByTagName("release-group-list")[0]; 
    console.log(releases);
    let groups = releases.getElementsByTagName("release-group");
    let count = groups.length;
    console.log(count);
    var Names = []; 
    var Dates = [];

    for (let index = 0; index < count; index++) {
        let data = releases.getElementsByTagName("release-group")[index];
        let name = data.getElementsByTagName('title')[0].innerHTML; 
        console.log(name);
        Names[index] = name;
        let date = data.getElementsByTagName('first-release-date')[0].innerHTML; 
        console.log(date);
        Dates[index] = date;
    }
    console.log(Names); console.log(Dates);
    album_table = "<tr><th>Released Album</th><th>Released in</th></tr>";
    for (i = 0; i < Names.length; i++) {
        album_table += "<tr><td> " + Names[i] + "</td>";
        album_table += "<td> " + Dates [i] + "</td></tr>";
    }
    let disco = document.getElementById('disco'); 
    disco.innerHTML = album_table;
}
window.onload = queryArtist;
