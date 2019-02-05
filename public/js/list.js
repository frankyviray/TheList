


$(document).ready(function() {
    
var listId = window.localStorage.getItem("listid")
var token = window.localStorage.getItem("token")

    $.get("/api/view/" + listId, function(data) {
        //console.log("NEW PAGE DATA" + JSON.stringify(data));

        //area where the list will be displayed

        var counter = 1;
        var dataName;
        var dataLink;
        var dataDescrip;
        var dataImage;

        for (var i = 0; i < data.length; i++) {

            //console.log("test!!!!!!!!" + data[i].name)

            dataName = "name" + counter;
            dataLink = "link" + counter;
            dataDescrip = "description" + counter;
            dataImage = "image" + counter;

            console.log(dataName);
            console.log(dataLink);
            console.log(dataDescrip);
            console.log(dataImage);

            $(".name" + counter).html(data[i].name)
            $(".link" + counter).attr("href", data[i].url)
            $("#description" + counter).html(data[i].description)
            $("#image" + counter).attr("src", data[i].image)

            counter++
        }        
    })

    $.get("api/listpage/" + listId, function(data) {
        //console.log(JSON.stringify(data))

        $("#list-name").text(data.title);
        $("#list-description").text(data.description);

    })

    $.get("/api/userpage/" + token, function (bata) {
        //console.log(JSON.stringify(bata))

        $(".list-name").html(bata.first_name + "'s List");
     })

})

