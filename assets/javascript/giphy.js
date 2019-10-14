// CREATE THE ARRAY FOR THE BUTTONS TO BE DISPLAYED ON PAGE LOAD
// ASK THE API FOR TEN GIFs WHEN A BUTTON IS CLICKED
// CREATE THE FORM FOR THE USER TO REQUEST GIFs AND ADD IT TO A BUTTON
// DISPLAY THOSE GIFs IN A DIV AND REMOVE THE PREVIOUS TEN 
// CHANGE THE STATE OF THE GIF WHEN CLICKED

// ========== ARRAY FOR THE ORIGINAL TEN BUTTONS ==========
var topics = ["Burgers", "Hot Dogs", "Sausage", "Pancakes", "Waffles",
    "Soup", "Cereal", "Steak", "Chicken", "Lamb",
    "Chocolate", "Bacon", "Beans", "Ice Cream", "Cake",
    "Pie", "Cookies", "Lettuce", "Tomatoes", "Bananas"];

// ========== START PAGE LOAD ==========
$(document).ready(function () {

    renderButtons();

    // ========== FUNCTION FOR DISPLAYING BUTTONS ==========
    function renderButtons() {

        // Keeps the buttons from repeating
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
    $("#add-food").on("click", function (event) {
        event.preventDefault();
        var foodData = $("#food-input").val().trim();

        // Prevents an empty button
        if (foodData.length === 0) {
            return;
        }
        // Displays alert if user requests a food button that is already created
        if (topics.includes(foodData)) {
            alert("BUTTON ALREADY CREATED");
            return;
        }

        topics.push(foodData);
        renderButtons();
    });

    // ========== CLICK HANDLER FOR DISPLAYING THE GIFs WHEN A BUTTON IS PRESSED ==========
    $(document).on("click", ".food-item", displayFood);

    // ========== FUNCTION FOR DISPLAYING GIFs ==========
    function displayFood() {

        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=qLz4BS0h7ZXsh5Lq9ntDAp7gGYCENIDA";

        $("#food-gif").empty();


        // AJAX call to the API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            // Setting the data retrieved from the API to a variable 
            var results = response.data;

            for (var i = 0; i < 10; i++) {
                // Adding the data-still/animation attribute to the GIFs 
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url)
                image.attr("data-animation", results[i].images.fixed_height.url)
                image.addClass("food-image");
                image.attr("data-state", "still");

                // Adding additional metadata to each GIF
                var newDiv = $('<div class="new-item">');
                var rating = results[i].rating;
                var gifRating = $("<p>").text("Rating: " + rating);
                var title = results[i].title;
                var gifTitle = $("<p>").text("Title: " + title);

                newDiv.append(gifRating);
                newDiv.append(gifTitle);
                newDiv.prepend(image);

                $("#food-gif").prepend(newDiv);
            }
        })
    };

    // ========== CLICK HANDLER FOR CHANGING THE STATE OF THE GIF ==========
    $("#food-gif").on("click", ".food-image", function () {
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















