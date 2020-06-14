$(document).ready(function() {

    // setup variables
    // functions
    // main processes
    var authKey = "hUwEkfr33vBStqcVbX9tViOwhIeFLkVN";
    var userInput = "";
    var numResults = 0;
    var startYear = 0;
    var endYear = 0;
    var queryURL2 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;
    
    
    var articleCounter = 0;
    function clear() {
        $("#wellSection").empty();
        $(".clear").val("");
      }

    function runQuery(numArticles, queryURL2) {

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(NYTData) {

            $('#wellSection').empty();

            for (var i = 0; i < numArticles; i ++) {

                var wellSection = $('<div>');
                wellSection.addClass('well');
                wellSection.attr('id', 'articleWell-' + i);
                $('#wellSection').append(wellSection);

                if (NYTData.response.docs[i].headline != "null") {
                    $('#articleWell-' + i).append('<h3>' + NYTData.response.docs[i].headline.main + '</h3>');

                }
                if (NYTData.response.docs[i].byline &&NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                    $('#articleWell-' + i).append('<h5>' + NYTData.response.docs[i].byline.original + '</h5>');

                }

                $('#articleWell-' + i).append('<h5>' + NYTData.response.docs[i].section_name + '</h5>');
                $('#articleWell-' + i).append('<h5>' + NYTData.response.docs[i].pub_date + '</h5>');
                $('#articleWell-' + i).append('<a href=' + NYTData.response.docs[i].web_url + '>' + NYTData.response.docs[i].web_url + '</a>');

            }

        })
        
    }

    $("#searchBtn").on("click", function(event){
        event.preventDefault();

        userInput = $("#search").val().trim();
        var newURL = queryURL2 + "&q=" + userInput;

        numResults = $("#numResults").val();
        startYear = $("#startYear").val().trim();
        endYear = $("#endYear").val().trim();

        if (parseInt(startYear)) {
            newURL = newURL + "&begin_date=" + startYear + "0101";
        }
        if (parseInt(endYear)) {
            newURL = newURL + "&end_date=" + endYear + "1231";
        }
        //send the AJAX Call newURL
        runQuery(numResults, newURL);
        return false;
    })
    
    $("#clear").on("click", clear);


})
