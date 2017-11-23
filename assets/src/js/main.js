$( document ).ready(function() {
//$('.js-json').on('click', function () {
    // http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetRecentlyAddedMovies
    $.ajax({
        type: 'GET',
        url: 'http://192.168.0.2:8080/jsonrpc',
        data: {
            "request": JSON.stringify({
                "jsonrpc": "2.0",
                //"method": "VideoLibrary.GetRecentlyAddedMovies",
                "method": "VideoLibrary.GetMovies",
                "params": {
                    //                    "filter": {
                    //                        "field": "playcount",
                    //                        "operator": "is",
                    //                        "value": "0"
                    //                    },
                    "filter": {
                        "field": "genre",
                        "operator": "is",
                        "value": "Family"
                    },
                    "limits": {
                        "start": 0,
                        "end": 300
                    },
                    "properties": ["thumbnail", "art", "playcount", "file", "genre"],
                    "sort": {
                        "order": "ascending",
                        "method": "label",
                        "ignorearticle": true
                    }
                },
                "id": "libMovies"
            })
        },
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            $.each(data.result.movies, function (key, movie) {
                $('.movies').append(renderMovieCard(movie));
//                $.map(movie.genre, function (elem, index) {
//                    if (elem == "Family") {
//                        //   console.log(movie);
//                        $('.movies').append(renderMovieCard(movie));
//                    }
//                });
            });
        }
    });

});

function renderMovieCard(movie) {
    var htmlResults = '';

    // Work out the image placeholder
    if (Object.keys(movie.art).length) {
        var str = movie.art.poster;
        //console.log(str);
        var image = decodeURIComponent(str.substring(8, str.length - 1));
    } else {
        var image = 'http://192.168.0.2:8080/images/thumbnail_default.png';
    }

    //console.log(movie);
    htmlResults += ' <div class="col-md-3"><div class="card">';
    htmlResults += '<img class="card-img-top img-fluid" src="' + image + '" alt="Card image cap">';
    htmlResults += ' <div class="card-body">';
    htmlResults += '<h4 class="card-title">' + movie.label + '</h4>';
    var genre = '';
    $.each(movie.genre, function (k, value) {
        genre += value + ' ';
    });
    htmlResults += ' <p class="card-text">' + genre + '</p>';
    htmlResults += '<a href="#" class="btn btn-primary">Go somewhere</a>';
    htmlResults += '</div>';
    htmlResults += '</div>';
    htmlResults += '</div>';
    return htmlResults;
}
/*
Run Chrome
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

*/


/*
List movies

http://192.168.1.66:8080/jsonrpc?request={"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "params": { "filter": {"field": "playcount", "operator": "is", "value": "0"}, "limits": { "start" : 0, "end": 75 }, "properties" : ["art", "rating", "thumbnail", "playcount", "file"], "sort": { "order": "ascending", "method": "label", "ignorearticle": true } }, "id": "libMovies"}


Play File

http://192.168.1.66:8080/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "file": "smb://serveur/movie/movie.mkv" } }, "id": 1 }


Pause Resume Currently Playing

http://192.168.1.66:8080/jsonrpc?request={"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": 1 }, "id": 1}


Update Library
http://192.168.1.64:8080/jsonrpc?request={ "jsonrpc": "2.0", "method": "VideoLibrary.Scan", "id": "mybash"}

Play Item

http://192.168.1.25/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "file": "smb://dan-svr/movies/Kids/My Little Pony Equestria Girls - Rainbow Rocks [2014 480p BDRip].mkv" } }, "id": 1 }

*/
