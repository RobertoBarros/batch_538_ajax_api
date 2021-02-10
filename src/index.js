const api_key = 'Se vira pra achar sua chave'; // https://www.last.fm/api/authentication

// Vou pegar o form
const formSearch = document.getElementById('search');
// Vou pegar a lista de divs (div master)
const listAlbums = document.getElementById('albums-container');
// Vou pegar o input
const inputArtist = document.getElementById('artist');

const fetchAlbums = (event) => {
    const keywordArtist = inputArtist.value
    event.preventDefault();
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${keywordArtist}&api_key=${api_key}&format=json&limit=5`)
      .then(response => response.json())
      .then( (data) =>{
        console.log(data);
        const albums = data.topalbums.album;
        listAlbums.innerHTML = "";
        return albums.forEach((album) => { listAlbums.insertAdjacentHTML('beforeend', generateAlbum(album));});
    });
};

const generateAlbum = (album) => {
  return `<div class="row m-t-1">
            <div class="col-xs-12">
              <img src="${album.image[2]["#text"]}" class='pull-left m-r-1'>
              <h2>${album.name}</h2>
              <p>${album.artist.name}</p>
            </div>
          </div>`
};

formSearch.addEventListener('submit', fetchAlbums);