// Constants and arrays

/*const flags = [
    { country: "India", src: "images/india..jpeg" },
    { country: "Sweden", src: "images/sweden.png" },
    { country: "Japan", src: "images/japan.png" },
    { country: "Brazil", src: "images/brazil.jpeg" },
    { country: "Australia", src: "images/australia.jpeg" }
];*/

$(document).ready(function () {
    const flags = [
        { country: "India", src: "images/download india..png" },
        { country: "Sweden", src: "images/sweden.png" },
        { country: "Japan", src: "images/japan flag.jpg" },
        { country: "Brazil", src: "images/brazilimages.jpg" },
        { country: "Australia", src: "images/WhatsApp Image 2025-01-05 at 12.43.31_f493bfa0.jpg" }
    ];

    let gamesPlayed = 0;
    let wins = 0;
    let losses = 0;

    let chosenFlag = {};
    let attempts = 3;
    let isGameOver = false;

    const startBtn_el = document.querySelector('.start-btn');
    const startWindow_el = document.querySelector('.start-window');
    const gameWindow_el = document.querySelector('.game-window');

    startBtn_el.addEventListener('click', () => {
        gameWindow_el.classList.remove('hidden');
        startWindow_el.classList.add('hidden');
    })

    // Function to start a new game
    function startGame() {
        isGameOver = false;
        attempts = 3;

        const randomIndex = Math.floor(Math.random() * flags.length);
        chosenFlag = flags[randomIndex];

        $("#flag-image")
            .fadeOut(5, function () {
                $(this).attr("src", chosenFlag.src).fadeIn(5);
            });

        $("#feedback, #result").text("").hide();
        $("#attempts-remaining").text(`Attempts remaining: ${attempts}`);
        $("#guess-input").val("").prop("disabled", false);
        $("#submit-btn").prop("disabled", false);
        $("#replay-btn").fadeOut();
    }

    // Function to handle guess submission
    function submitGuess() {
        if (isGameOver) return;

        const userGuess = $("#guess-input").val().trim();

        if (!userGuess) {
            $("#feedback")
                .text("Please enter a valid country name.")
                .css("color", "red")
                .fadeIn();
            return;
        }

        if (userGuess.toLowerCase() === chosenFlag.country.toLowerCase()) {
            $("#feedback")
                .text("Congratulations! You guessed it right! 🎉")
                .css("color", "black")
                .slideDown();
            wins++;
            isGameOver = true;
        } else {
            attempts--;
            if (attempts > 0) {
                $("#feedback")
                    .text("Wrong guess! Try again.")
                    .css("color", "black")
                    .slideDown();
            } else {
                $("#feedback")
                    .text(`Game Over! The correct answer was: ${chosenFlag.country}.`)
                    .css("color", "black")
                    .slideDown();
                losses++;
                isGameOver = true;
            }
        }

        $("#attempts-remaining").text(`Attempts remaining: ${attempts}`);
        if (isGameOver) endGame();
    }

    // Function to end the game
    function endGame() {
        gamesPlayed++;

        $("#games-played").text(gamesPlayed);
        $("#wins").text(wins);
        $("#losses").text(losses);

        $("#guess-input").prop("disabled", true);
        $("#submit-btn").prop("disabled", true);

        $("#replay-btn").fadeIn(3500);
    }

    // Event listenersa
    $("#submit-btn").click(submitGuess);
    $("#replay-btn").click(startGame);

    // Start the first game
    startGame();
});





