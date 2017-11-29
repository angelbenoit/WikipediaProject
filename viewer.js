$(document).ready(function () {
    $('#randomArticle').click(function () {
        var url = "https://en.wikipedia.org/wiki/Special:Random";
        window.open(url);
    });
});


// this link uses wikipedias api to find whatever the user is looking for
//     https://en.wikipedia.org/w/api.php?action=query&list=allpages&apfrom=WHATEVERUSERWANTSTOSEE&format=json
//
// this link will give json formatted info and we can use the array to get the page id
// we then use the page id to find the url using:
//     https://en.wikipedia.org/?curid=PAGEID
//         replacing PAGEID with the id we got from the json array, we not get the wiki url

var pageId = "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=allpages&apfrom=";
var format = "&format=json";
var url = "https://en.wikipedia.org/?curid=";

$("#button").click(function () {
    $(this).fadeOut();
    $("#userInput").css("visibility", "visible");
    $("#search").css("visibility", "visible");
});

$("#search").click(function (event) {
    event.preventDefault();
    getWikiId();
    getURL();
});

function getWikiId() {
    $("#back2").css("visibility", "visible");
    var userInput = $("#userInput").val();
    var link = pageId + userInput + format;
    var arrayOfId = [];
    $.getJSON(link, function (result) {
        var pageArrayLength = result.query.allpages.length;
        for (var i = 0; i < pageArrayLength; i++) {
            arrayOfId[i] = result.query.allpages[i].pageid;
        }
        getURL(arrayOfId);
    });
}

function getURL(list) {
    var arrayOfURL = [];
    for (var i = 0; i < list.length; i++) {
        arrayOfURL[i] = url + list[i];
    }
    for (var x = 0; x < arrayOfURL.length; x++) {
        $("#back2").append(arrayOfURL[x] + "<br>");
    }
}

/* todo : get "title" from allpages array from json data and
       put it in as display in #back2 for when user clicks on it,
        another tab opens with the url*/
/*
    todo: fix the issue  of when user enters a data, it refreshes data when user enters new data 
 */
