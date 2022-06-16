const APIController = (function() {
    
    const clientId = '0cf7c30ac4f142faadbd13dabe6401b5';
    const clientSecret = '33904478a35d44298f1ad89f3cad34f2';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.genres;
    }  

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genre) {
            return _getPlaylistByGenre(token, genre);
        },
    }
})();

async function _getPlaylistByGenre(token) {

    var countryID = document.querySelector(`#select_country`)
    var selectedCountry = countryID.options[countryID.selectedIndex].id
    var genreSeed = document.querySelector(`#select_genre`)
    var selectedGenre = genreSeed.options[genreSeed.selectedIndex].id

    const limit = 20;
    
    const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=${selectedCountry}&seed_genres=${selectedGenre}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.tracks;
}
