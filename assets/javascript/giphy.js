// CREATE THE ARRAY FOR THE BUTTONS TO BE DISPLAYED ON PAGE LOAD
// CREATE THE FORM FOR THE USER TO REQUEST GIFs AND ADD IT TO A BUTTON
// ASK THE API FOR TEN GIFs WHEN A BUTTON IS CLICKED
// DISPLAY THOSE GIFs IN A DIV AND REMOVE THE PREVIOUS TEN 

// ========== ARRAY FOR THE ORIGINAL TEN BUTTONS ==========
var topics = ["Burgers", "Hot Dogs", "Sausage", "Pancakes", "Waffles", 
"Soup", "Cereal", "Steak", "Chicken", "Lamb", 
"Chocolate", "Pork", "Beans", "Ice Cream", "Cake",
"Pie", "Cookies", "Lettuce", "Tomatoes", "Bananas"];

// ========== START PAGE LOAD ==========
$(document).ready(function() {

    renderButtons();

    // ========== FUNCTION FOR DISPLAYING BUTTONS ==========
    function renderButtons() {

        // Clears out the current gifs displayed
        $("#food-buttons").empty();
        
        // DOM Manipulation for the buttons 
        for (var i = 0; i < topics.length; i++) {

            var newFood = $("<button>");
            newFood.addClass("food-item");
            newFood.attr("data-name", topics[i]);
            newFood.text(topics[i]);
            $("#food-buttons").append(newFood);
        }
    }

    // ========== CLICK HANDLER FOR ADDING BUTTONS ==========
    $("#add-food").on("click", function(event) {
        event.preventDefault();
        var foodData = $("#food-input").val().trim();
        
        if (foodData != "") {
            topics.push(foodData);
            renderButtons();
            $("#food-input").val();
        }
    });

    // ========== CLICK HANDLER FOR DISPLAYING THE GIFs WHEN A BUTTON IS PRESSED ==========
    $(document).on("click", "button", displayFood);

    // ========== FUNCTION FOR DISPLAYING GIFs ==========
    function displayFood() {
    
        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="  + food + "&api_key=qLz4BS0h7ZXsh5Lq9ntDAp7gGYCENIDA";
        $("#food-gif").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            var results = response.data;
            for (var i = 0; i < 10; i++) {     
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url)
                image.attr("data-animation", results[i].images.fixed_height.url)
                image.addClass("food-image");
                image.attr("data-state", "still");
                
                var newDiv = $('<div class="new-item">');
                var rating = results[i].rating;
                var gifRating = $("<p>").text("Rating: " + rating);
                
                newDiv.append(gifRating);
                newDiv.append(image);
    
                $("#food-gif").prepend(newDiv);
            }
        })
    };

    // ========== CLICK HANDLER FOR CHANGING THE STATE OF THE GIF ==========
    $("#food-gif").on("click", ".food-image", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animation"));
            $(this).attr("data-state", "animation");
        } else if (state === "animation") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});



    

        

       







