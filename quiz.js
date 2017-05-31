/**
 * Created by meghna on 21/05/17.
 */
var questionArray = [
    {
        srNo: 1,
        question: "What is your name",
        answers: ['prakash', 'meghna', 'sam', 'pam'],
        correctAnswer: [1],
        typeOfChoice: "radio"
    },
    {
        srNo: 2,
        question: "Where do u stay",
        answers: ['bangalore', 'pune', 'mahableshwar'],
        correctAnswer: [0],
        typeOfChoice: "radio"
    },
    {
        srNo: 3,
        question: "Where do your parents stay",
        answers: ['poduru', 'mumbai', 'pune'],
        correctAnswer: [0],
        typeOfChoice: "radio"

    },
    {
        srNo: 4,
        question: "What is your favourite animal",
        answers: ['ele', 'dog', 'hippo'],
        correctAnswer: [0],
        typeOfChoice: "radio"
    },
    {
        srNo: 5,
        question: "What is your favourite flower",
        answers: ['rose', 'lily', 'jasmine'],
        correctAnswer: [1],
        typeOfChoice: "radio"
    },
    {
        srNo: 6,
        question: "What is your favourite genre of book",
        answers: ['motivational', 'fiction', 'food'],
        correctAnswer: [2],
        typeOfChoice: "radio"
    },
    {
        srNo: 7,
        question: "What is your favourite place",
        answers: ['nepal', 'bangalore', 'pune'],
        correctAnswer: [2],
        typeOfChoice: "radio"
    }

];
var selectedAnswerArray = [];


var questionArrayLength = questionArray.length;

$('#quiz-heading').html($('#quiz-heading').html() + 'TEST - ' + questionArrayLength + ' Questions');

var currentQuestionIndex = 0;


function displayQuestion() {

    $('body').addClass('question-mode');
    // console.log(currentQuestionIndex);
    setupQuestion(questionArray[currentQuestionIndex]);
}

function setupQuestion(questionObject) {

    var questionSection = $('#question-section');
    var question = '';
    question = 'Q' + questionObject.srNo + '.  ' + questionObject.question;
    questionSection.find('.question').html(question);

    var answersHtml = '';
    questionObject.answers.forEach(function (answer, index) {
        answersHtml += '<div><label><input type="radio" name="radios" value=' + index + ' class="answerRadios">' + answer + '</label></div>';
    });
    questionSection.find('.answers').html(answersHtml);
    $('#submit-button').hide();
}


function displayPreviousQuestion() {
    if (currentQuestionIndex == 0) {
        $('body').removeClass('question-mode');
        currentQuestionIndex = 0;
    }
    else {
        // currentQuestionIndex = currentQuestionIndex - 2;
        currentQuestionIndex--;
        setupQuestion(questionArray[currentQuestionIndex]);
        var radios = document.querySelectorAll('#question-section .answers .answerRadios');
        radios[selectedAnswerArray[currentQuestionIndex]].checked = 'true';


    }
}
function displayNextQuestion() {
    collectAnswersNew();
    currentQuestionIndex++;
    if (currentQuestionIndex == questionArray.length) {
        return;

    }
    else {
        setupQuestion(questionArray[currentQuestionIndex]);

        if (currentQuestionIndex == questionArray.length - 1) {
            $('#next-button').hide();
            $('#submit-button').show();

        }

    }

}

function collectAnswersNew() {
    if (questionArray[currentQuestionIndex].typeOfChoice == 'radio') {
        try {
            var radioSelected = document.querySelector('#question-section .answers .answerRadios:checked');
            if (radioSelected.checked == true) {
                var radioValue = radioSelected.attributes.getNamedItem('value').value;
                console.log(radioValue);
                selectedAnswerArray[currentQuestionIndex] = radioValue;
                console.log(selectedAnswerArray);
            }
        }
        catch (err) {


            // console.log('did not select any answer');

            selectedAnswerArray[currentQuestionIndex] = 'no answer selected';
            console.log(selectedAnswerArray);

        }
    }
}

function submitQuiz() {

    console.log('you have submitted the quiz');
    collectAnswersNew();
    var result = getFigures();

    $('#result').html('<div id="jqChart" style="width: 500px; height: 300px;"></div>');

    var background = {
        type: 'linearGradient',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 1,
        colorStops: [{ offset: 0, color: '#d2e6c9' },
            { offset: 1, color: 'white' }]
    };

    $('#jqChart').jqChart({
        title: { text: 'Pie Chart' },
        legend: { title: 'Result' },
        border: { strokeStyle: '#6ba851' },
        background: background,
        animation: { duration: 1 },
        shadows: {
            enabled: true
        },
        series: [
            {
                type: 'pie',
                fillStyles: ['#418CF0', '#FCB441', '#E0400A'],
                labels: {
                    stringFormat: '%.1f%%',
                    valueType: 'percentage',
                    font: '15px sans-serif',
                    fillStyle: 'white'
                },
                explodedRadius: 10,
                explodedSlices: [5],
                data: [['Correct',result.correctCount ], ['Wrong', result.wrongCount], ['Not answered', result.noAnswerCount]]
            }
        ]
    });

    $('#jqChart').bind('tooltipFormat', function (e, data) {
        var percentage = data.series.getPercentage(data.value);
        percentage = data.chart.stringFormat(percentage, '%.2f%%');

        return '<b>' + data.dataItem[0] + '</b><br />' +
            data.value + ' (' + percentage + ')';
    });
}


function getFigures() {
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var notAnswered = 0;
    var resultArray = {};
    for (var i = 0; i < selectedAnswerArray.length; i++) {

        if (selectedAnswerArray[i] == questionArray[i].correctAnswer[0]) {
            correctAnswers = correctAnswers + 1;
            resultArray.correctCount = correctAnswers;
        }

        else if (selectedAnswerArray[i] == 'no answer selected') {
            notAnswered++;
            resultArray.noAnswerCount = notAnswered;
        }
        else {
            console.log('reached else');
            wrongAnswers++;
            resultArray.wrongCount = wrongAnswers;
        }
    }

    console.log('correct:' + resultArray.correctCount + 'wrong:' + resultArray.wrongCount + 'notAnswered:' + resultArray.noAnswerCount);

    return resultArray;
}



$(document).ready(function () {

    var background = {
        type: 'linearGradient',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 1,
        colorStops: [{ offset: 0, color: '#d2e6c9' },
            { offset: 1, color: 'white' }]
    };

    $('#jqChart').jqChart({
        title: { text: 'Pie Chart' },
        legend: { title: 'Result' },
        border: { strokeStyle: '#6ba851' },
        background: background,
        animation: { duration: 1 },
        shadows: {
            enabled: true
        },
        series: [
            {
                type: 'pie',
                fillStyles: ['#418CF0', '#FCB441', '#E0400A'],
                labels: {
                    stringFormat: '%.1f%%',
                    valueType: 'percentage',
                    font: '15px sans-serif',
                    fillStyle: 'white'
                },
                explodedRadius: 10,
                explodedSlices: [5],
                data: [['Correct', 65], ['Wrong', 58], ['Not answered', 30]]
            }
        ]
    });

    $('#jqChart').bind('tooltipFormat', function (e, data) {
        var percentage = data.series.getPercentage(data.value);
        percentage = data.chart.stringFormat(percentage, '%.2f%%');

        return '<b>' + data.dataItem[0] + '</b><br />' +
            data.value + ' (' + percentage + ')';
    });
});

//main

$('#start-button').on('click', displayQuestion);

$('.next-question').on('click', displayNextQuestion);

$('#back-button').on('click', displayPreviousQuestion);

$('#submit-button').on('click', submitQuiz);


