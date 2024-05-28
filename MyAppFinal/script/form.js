'use strict';

import musicService from'./music-group-service.js';

//module global variables
let url = new URL(window.location);
let params = url.searchParams;
 

const _musicservice = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

//Get Elements
const musicGroupName = document.querySelector("#musicGroupName");
const genre = document.querySelector("#genre");
const establishedYear = document.querySelector("#establishedYear");
const artistLength = document.querySelector("#artistLength");
const totalAlbum = document.querySelector("#totalAlbum");

//Init
(async() => {

    let id = params.get("id");

    if (id && id !== "")
    {
    let artistGroup = await _musicservice.readMusicGroupAsync(id, false);
    musicGroupName.value = artistGroup.name;
    genre.value = artistGroup.strGenre;
    establishedYear.value = artistGroup.establishedYear;
    artistLength.value = artistGroup.artists.length;
    totalAlbum.value = artistGroup.albums.length;

    }

})();


