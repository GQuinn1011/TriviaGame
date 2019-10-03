//variables with questions
$(document).ready(function() {
    $("#new").hide();
    var correctCount = 0;
    var wrongCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess = "";
    var runTime = false;
    var ask;
    var index;
    var newArray = [];
    var gameQuestions = [{
            question: "What year did the iPhone first release to the public?",
            choices: ["2010", "2004", "2007", "1999"],
            answer: 2
        },
        {
            question: "Android is a mobile operating system created by which company?",
            choices: ["Apple", "Droid", "Google", "Samsung"],
            answer: 2

        },
        {
            question: "Bill Gates is the founder of which company?",
            choices: ["Microsoft", "Pixar", "Google", "IBM"],
            answer: 0

        },
        {
            question: "IBM is an acronym that means?",
            choices: ["International Business Model", "Intergalactic Battle Mode", "International Business Machines", "Intergrated Business Machines"],
            answer: 2

        },
        {
            question: "When 'burn-in' occurs on a screen, it's caused by the non-uniform use of _____?",
            choices: ["pixels", "pixies", "mobile device", "none of the above"],
            answer: 0

        }
    ];
    $(".lead").hide();
    $("#cancel").hide();
    $("#start").click(function() {
        $("#start").hide();
        $(".directions").hide();
        $(".lead").show();
        askGameQuestions();
        startTimer();
        $("#cancel").show();
    })
    $("#cancel").click(function() {
        location.reload();
    })

    function startTimer() {
        if (!runTime) {
            intervalId = setInterval(decrement, 1000);
            runTime = true;
        }
    }

    function decrement() {
        $("#timer").text("Time Left: " + timer);
        timer--;

        if (timer === 0) {
            wrongCount++;
            stopTime();
            $("#ans").text("Wrong! The answer is: " + ask.choices[ask.answer]);
            nextQuestion();
        }
    }

    function stopTime() {
        runTime = false;
        clearInterval(intervalId);
    }

    function askGameQuestions() {
        $("#cancel").show();
        index = Math.floor(Math.random() * gameQuestions.length)
        ask = gameQuestions[index];
        $("#question-asked").text(ask.question);
        for (var i = 0; i < ask.choices.length; i++) {
            var userAnswers = $("<div>");
            userAnswers.addClass("answer");
            userAnswers.html(ask.choices[i]);
            userAnswers.attr("guess", i);
            $("#ans").append(userAnswers);
        }
        $(".answer").click(function() {
            userAnswers = parseInt($(this).attr("guess"));

            if (userAnswers === ask.answer) {
                stopTime();
                correctCount++;
                userAnswers = "";
                $("#ans").text("Correct");
                nextQuestion();
            } else {
                stopTime();
                wrongCount++;
                userAnswers = "";
                $("#ans").text("Wrong! The answer is: " + ask.choices[ask.answer]);
                nextQuestion();
            }
        })
    }

    function nextQuestion() {
        newArray.push(ask);
        gameQuestions.splice(index, 1);
        var newQues = setTimeout(function() {
            $("#ans").empty();
            timer = 10;

            if ((wrongCount + correctCount) === 5) {
                $("#cancel").hide();
                $("#question-asked").empty();
                $("#question-asked").text("Game Over!  Here's how you did: ");
                $("#ans").append("Correct: " + correctCount + " ");
                $("#ans").append("Incorrect: " + wrongCount + " ");
                $("#new").show();
                correctCount = 0;
                wrongCount = 0;

            } else {
                startTimer();
                askGameQuestions();
            }
        }, 1000);

    }
    //new game function 
    $("#new").click(function() {
        $("#cancel").show();
        $("#new").hide();
        $("#ans").empty();
        $("#question-asked").empty();
        for (var i = 0; i < newArray.length; i++) {
            gameQuestions.push(newArray[i]);
        }
        startTimer();
        askGameQuestions();
    })

});

//timer

//function to select true or false
//if else statement to see if answer correct and or if time runs out
//have questions answered correctly and incorrectly displayed
//have questions not answered counted as incorrect