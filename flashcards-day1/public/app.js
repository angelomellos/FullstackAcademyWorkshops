var app = angular.module('FlashCards', []);

// app.controller('FlashCardController', function($scope) {
//     //putting $scope as a parameter to the callback function gives you access to it
//     $scope.flashCard = {
//         question: 'What is Angular?',
//         answers: [{
//             text: 'A front-end framework for great power!',
//             correct: true
//         }, {
//             text: 'Something lame, who cares, whatever.',
//             correct: false
//         }, {
//             text: 'Some kind of fish, right?',
//             correct: false
//         }]
//     };
//     $scope.answered = false;
//     $scope.answeredCorrectly = false;
//     $scope.answerQuestion = function(answer) {
//         $scope.answered = true;
//         if (answer.correct) $scope.answeredCorrectly = true;
//     };
// });

app.controller('MainController', function($scope) {

    $scope.flashCards = [{
        question: 'What is Angular?',
        answers: [{
            text: 'A front-end framework for great power!',
            correct: true
        }, {
            text: 'Something lame, who cares, whatever.',
            correct: false
        }, {
            text: 'Some kind of fish, right?',
            correct: false
        }],
        answered: false,
        answeredCorrectly: false
    }, {
        question: 'What is a controller?',
        answers: [{
            text: 'Something that manages my front-end routes',
            correct: false
        }, {
            text: 'A function that allows me to manage a scope',
            correct: true
        }, {
            text: 'An Angular template',
            correct: false
        }],
        answered: false,
        answeredCorrectly: false
    }, {
        question: 'What does {{ }} do?',
        answers: [{
            text: 'It runs some Javascript',
            correct: false
        }, {
            text: 'It looks for variables in HTML',
            correct: false
        }, {
            text: 'It runs an Angular expression that accesses my $scope',
            correct: true
        }],
        answered: false,
        answeredCorrectly: false
    }];


    $scope.answerQuestion = function(flashCard, answer) {
        console.log("flashCard: " , flashCard);
        console.log("answer: ", answer);
        if (!flashCard.answered){
          flashCard.answered = true;
          if (answer.correct) flashCard.answeredCorrectly = true;
        }
    };

});
