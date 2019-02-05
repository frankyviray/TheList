$(document).ready(function(){
  $('.modal').modal();
  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){


    if (!data){

      window.localStorage.clear();

    }
    else {

      $('#navLogin').html(data.first_name + "&nbsp;&nbsp;");
      $('#navLogin').attr("href", "/user");
      $('#navSignup').html("Sign Out");
      $('#navSignup').attr({"href": "/", "id":"logOutBtn"});
      $('#logOutBtn').on("click", function(){

        window.localStorage.clear();

      });

      $('#start-btn').html('<a href="/user" id="start-button" class="btn-large waves-effect waves-light cyan">Get Started</a>')
    }
  });  
});

// Sign up Submit Button
$("#signup-btn").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newUser = {
      first_name: $("#first_name").val().trim(),
      last_name: $("#last_name").val().trim(),
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    };

    //console.log(newUser);

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.

    $.post("/api/register", newUser,
      function(data) {
        console.log(data.token);
        // If a table is available... tell user they are booked.
        if (data) {
          // direct to profile page
          M.toast({html: 'Registration Successful'});
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("profileID", data.id);
          window.location = "/user";
        }
        else {
          M.toast({html: "Error occured: Try Again"});
        }

        // Clear the form when submitting
        $("#first_name").val("");
        $("#last_name").val("");
        $("#email").val("");
        $("#password").val("");

      });

});

// Login Submit Button
$("#login-btn").on("click", function(event) {
  event.preventDefault();

  // Here we grab the form elements
  var User = {
    email: $("#login-email").val().trim(),
    password: $("#login-password").val().trim()
  };

  //console.log(User);

  // This line is the magic. It"s very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  $.post("/api/login", User,
    function(data) {
      //console.log(data[0]);
      // If login successful
      if (data[0] === 1) {
        $.get("/api/loginInfo", User,
          function(response) {
            console.log(response);
            // direct to profile page
            window.localStorage.setItem("token", response.token);
            window.localStorage.setItem("profileID", response.id);
            window.location = "/user";
            M.toast({html: 'Login Successful'});
          })

      }
      // If login failed
      if (data.code === 400) {
        // direct to homepage
        alert(data.failed);
      }

      // Clear the form when submitting
      $("#login-email").val("");
      $("#login-password").val("");

    });

});

$(document).ready(function(){


  $.get("/api/register", function(data){

    console.log(data);
      $(".name").html(data.first_name + " " + data.last_name)
      $(".email").html(data.email)
    })
  })