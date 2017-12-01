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

});

function getWikiId() {
    $("#back2").css("visibility", "visible");
    $("#page").css("visibility", "visible");
    

    //gets the link to the json format
    var userInput = $("#userInput").val();
    var link = pageId + userInput + format;

    //the arrays that will hold the pageID and page title and finished array once it goes through getURLArray which contains
    //the actual link the the wikipedia page
    var arrayOfId = [];
    var arrayOfTitles = [];
    var URLarray = [];
    $.getJSON(link, function (result) {
        var pageArrayLength = result.query.allpages.length;
        for (var i = 0; i < pageArrayLength; i++) {
            arrayOfId[i] = result.query.allpages[i].pageid;
            arrayOfTitles[i] = result.query.allpages[i].title;
        }
        URLarray = getURLArray(arrayOfId);

        for (var j = 0; j < URLarray.length; j++) {
            $("#page").append("<a href=\"" + URLarray[j] + "\">" + arrayOfTitles[j] + "<\a><br>");
        }

    });
}

function getURLArray(list) {
    //will empty the html prior to adding new data so
    //it doesn't pile ons
    $("#page").empty();

    //this array will hold all the URLs with the pageID, which will take user to desired wikipedia page
    var arrayOfURL = [];
    for (var i = 0; i < list.length; i++) {
        arrayOfURL[i] = url + list[i];
    }
    return arrayOfURL;
}