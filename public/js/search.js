

$(document).on("click", ".searchBtn", function () {
    event.preventDefault();
    var product = {
        name: $("#searchBar").val().trim()
    }

    $.post("api/search", product, function (data) {
        console.log(data)
    }).then(function (results) {
        console.log(results);

        if (results.Items.Item.length > 10) {
            var resultHtml = "";

            for (var i = 0; i < results.Items.Item.length; i++) {
                resultHtml += "<tr>";
                resultHtml += "<td> <img class='responsive-img image-result' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>";
                resultHtml += "<td id='title-result'>" + results.Items.Item[i].ItemAttributes.Title + "</td>";
                resultHtml += "<td><a class='modal-action modal-close btn-floating btn-small waves-effect waves-light cyan' id='add' data-asin='" + results.Items.Item[i].ASIN +
                    "' data-name='" + results.Items.Item[i].ItemAttributes.Title +
                    "' data-url='" + results.Items.Item[i].DetailPageURL +
                    "' data-image='" + results.Items.Item[i].LargeImage.URL +
                    "'><i class='material-icons'>add</i></a></td>";
                resultHtml += "</tr>";

            };

            $(".results").append(resultHtml);
        }
        else {


            // var items = $("<tbody>")

            // for (var i = 0; i < results.Items.Item.length; i++) {
            //     console.log("Product Name: " + results.Items.Item[i].ItemAttributes.Title);
            //     console.log("Amazon Link: " + results.Items.Item[i].DetailPageURL);
            //     console.log("ASIN #: " + results.Items.Item[i].ASIN);
            //     console.log("Image: " + results.Items.Item[i].LargeImage.URL);
            //     console.log("---------------")

            //     $(items).append("<tr><td> <img class='responsive-img' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>")
            //     $(items).append("<td>" + results.Items.Item[i].ItemAttributes.Title + "</td>")
            //     // $(items).append("<td> ASIN #: " + results.Items.Item[i].ASIN + "</td>")
            //     $(items).append("<a class='btn-floating btn-large waves-effect waves-light red modal-action modal-close' id='add' data-asin='" + results.Items.Item[i].ASIN + 
            //     "' data-name='" + results.Items.Item[i].ItemAttributes.Title + 
            //     "' data-url='" + results.Items.Item[i].DetailPageURL +
            //     "' data-image='" + results.Items.Item[i].LargeImage.URL +
            //     "'><i class='material-icons'>add</i></a></tr>")

            //     //id will be changed to the search result div id
            //     $(".results").append(items);
            // };
            var resultHtml = "";

            for (var i = 0; i < results.Items.Item.length; i++) {
                resultHtml += "<tr>";
                resultHtml += "<td> <img class='responsive-img image-result' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>";
                resultHtml += "<td id='title-result'>" + results.Items.Item[i].ItemAttributes.Title + "</td>";
                resultHtml += "<td><a class='modal-action modal-close btn-floating btn-small waves-effect waves-light cyan' id='add' data-asin='" + results.Items.Item[i].ASIN +
                    "' data-name='" + results.Items.Item[i].ItemAttributes.Title +
                    "' data-url='" + results.Items.Item[i].DetailPageURL +
                    "' data-image='" + results.Items.Item[i].LargeImage.URL +
                    "'><i class='material-icons'>add</i></a></td>";
                resultHtml += "</tr>";

            };
            $(".results").append(resultHtml);
        }
    }
    )

});




var cart = [];
var listId;
var number = 1;

$(document).on("click", "#add", function () {
    $(".results").empty();
    var newItem = {
        asin: $(this).data("asin"),
        name: $(this).data("name"),
        image: $(this).data("image"),
        url: $(this).data("url"),
        ListId: listId
    }
    
    var newDiv = $("<div class='col l12' id='" + newItem.asin + "'>")

    $(newDiv).append("<p id='added-header'>Product # " + number + ":</p>");
    $(newDiv).append("<p id='added-title'>" + newItem.name + "</p>");
    $(newDiv).append('<div class="added-desc input-field col s10"><textarea id="textarea2"  class="materialize-textarea ta' + newItem.asin + '"></textarea><label for="textarea2">Product #' + number + " Description</label><a class='btn-floating btn-small green' id='update-btn' data-asin='" + newItem.asin + "'><i class='material-icons'>add</i></a><a class='btn-floating btn-small red' id='delete-btn' data-asin='" + newItem.asin + "'><i class='material-icons'>delete</i></a></div>");
    $("#finish-btn").html("<div class='btn cyan finish-btn'>Finish List</div>")

    $(".addItem").append(newDiv)

    number++;



    console.log(newItem);

    $.post("/api/item/" + newItem.ListId, newItem).then(function (data) {
        console.log("this is add " + data)
    })


})


$(document).on("click", "#create", function () {
    var id = window.localStorage.getItem("profileID");
    var total = {
        title: $("#title").val().trim(),
        description: $("#textarea1").val().trim()

    }
    $(".title").html("<p id='title-header'>Title:</p>");
    $(".title").append("<p id='user-title'>" + total.title + "</p>");
    $(".description").html("<p id='desc-header'>Description:</p>");
    $(".description").append("<p id='user-desc'>" + total.description + "</p>");
    $("#product-search").empty();
    $("#product-search").html("<div class='input-field col s6'><input id='searchBar' type='text' class='validate'><label for='searchBar'>Product Search</label></div>");
    $("#product-search").append("<div data-target='modal1' class='btn modal-trigger searchBtn cyan'>Search</div>")


    $.post("/api/list/" + id, total).then(function (data) {
        console.log("this is create " + data)
        window.localStorage.setItem("listid", data)
        listId = data;
    })

})

$(document).ready(function () {
    $.post("/api/nav", { token: window.localStorage.getItem("token") }).then(function (data) {

        console.log("frontend data" + JSON.stringify(data));
        if (!data) {
            window.localStorage.clear();
        }
        else {

            $('.name').html(data.first_name + "&nbsp;&nbsp;" + data.last_name);
            $('.email').html(data.email + "&nbsp;&nbsp;");

        }
    });
});

$(document).ready(function () {



    $(document).on("click", "#delete-btn", deleteItem)

    function deleteItem(event) {
        event.stopPropagation();
        var asin = $(this).data("asin");
        $.ajax({
            method: "DELETE",
            url: "/api/item/" + asin
        }).then(function () {
            console.log("item deleted")
            $("#" + asin).empty();

        });
    }

    $(document).on("click", "#update-btn", function () {

        var asin = $(this).data("asin");
        var itemDescription = $(".ta" + asin).val();


        $("#addItem").append("<p>" + itemDescription + "</p>")
        M.toast({html: 'Description Saved'});

        $.ajax({
            method: "PUT",
            url: "/api/info/" + asin,
            data: {
                description: itemDescription,
                tempASIN: asin
            }
        }).then(function (data) {
            console.log(data)
        })


    })

    $(document).on("click", "#finish-btn", function() {
        window.location.href = "/finished";
    })

    $(document).on("click", "#mylist", function() {
        window.location.href = "/finished";
    })
})

