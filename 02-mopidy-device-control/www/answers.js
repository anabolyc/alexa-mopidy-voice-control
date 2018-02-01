/* eslint-disable  func-names */
/* eslint-disable max-len */
/* eslint quote-props: ['error', 'consistent']*/
 
module.exports = {
    
    answers: {
        positive: [
            "OK",
            "Consider it done",
            "Done",
            "Got it",
            "Yep",
            "I'm on it",
            "No problem",
            "Sure",
            "Sure buddy",
            "Sure thing",
            "Affirmative"
        ],
        negative: [
            "Sorry, but no",
            "Error, sorry",
            "Can't be done",
            "Negative",
            "Ups!",
            "It is not working"
        ]
    },

    getRandomAnswer: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    getNegativeResponse: function() {
        return this.getRandomAnswer(this.answers.negative);
    },

    getPositiveResponse: function() {
        return this.getRandomAnswer(this.answers.positive);
    }
   
};
