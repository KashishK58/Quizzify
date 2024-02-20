const questionText = document.getElementById('questionText');
const container = document.querySelector('.container');
const Next = document.querySelector('.next');
const count = document.getElementById('count');
const optionsContainer = document.getElementById('optionsContainer');

const questionDes = [
    {
        question: 'Javascript is an _______ language?',
        options: ['Object-oriented', 'Object Based', 'Procedural', 'None of the above'],
        correctOption : 'Object-oriented',
        correctIndex: null,
    },
    {
        question:'Which of the following keywords is used to define a variable in Javascript?',
        options: ['let', 'var', 'Both 1 and 2', 'None of the above'],
        correctOption : 'Both 1 and 2',
        correctIndex: null,
    },
    {
        question:'Which of the following methods is used to access HTML elements using Javascript?',
        options:['getElementById()', 'getElementsByClassName','Both 1 and 2', 'None of the above'],
        correctOption : 'Both 1 and 2',
        correctIndex: null,
    },
    {
        question:'Which of the following methods can be used to display data in some form using Javascript?',
        options:['document.write()','console.log()','window.alert()','All of the above'],
        correctOption : 'All of the above',
        correctIndex: null,
    },
    {
        question:'What keyword is used to declare an asynchronous function in Javascript?',
        options:['async','await','setTimeout','None of the above'],
        correctOption : 'async',
        correctIndex: null,
    },
    {
        question:'How to stop an interval timer in Javascript?',
        options:['clearInterval','clearTimer','IntervalOver','None of the above'],
        correctOption : 'clearInterval',
        correctIndex: null,
    },
    {
        question:'How do we write a comment in javascript?',
        options:['/**/','//','#','$$'],
        correctOption : '/**/',
        correctIndex: null,
    },
    {
        question:'When interpreter encounters an empty statements, what it will do?',
        options:['Shows a warning','Prompts to complete the statement','Throws an error','Ignores the statements'],
        correctOption : 'Ignores the statements',
        correctIndex: null,
    },
    {
        question:'In JavaScript the x===y statement implies that:',
        options:['Both x and y are equal in value, type and reference address as well.','Both are x and y are equal in value only.','Both are equal in the value and data type.','Both are not same at all.'],
        correctOption : 'Both are equal in the value and data type.',
        correctIndex: null,
    },
    {
        question:'A set of unordered properties that, has a name and value is called______.',
        options:['String','Array','Object','Variable'],
        correctOption : 'Object',
        correctIndex: null,
    }
];

let questionNo = 0;
let marks = 0;
let quizStarted = false;
let answerSelected = false;
Next.addEventListener('click', function() {
    if (!quizStarted) {
        container.style.height = '400px';
        container.style.width = '45%';
        container.style.padding = '30px';
        quizStarted = true;
    }

    if (questionNo > 0) {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const selectedValue = parseInt(selectedOption.value);
        const currentQuestion = questionDes[questionNo - 1];
        
        if (selectedValue === currentQuestion.correctIndex) {
            marks++;
        }
        answerSelected = true; 
    questionNo++;
    Next.textContent = "Next";

    if (questionNo <= questionDes.length) {
        count.textContent = "Question No: " + questionNo ;
        showQuestion();
        answerSelected = false;
    } 
    else 
    {
        alert('Quiz completed!');
        container.textContent = 'Your Total Score: ' + marks;
        container.style = 'padding:10px';
    }
    }
    else{
        alert('Please select an option before proceeding.');

    }
} else {
    questionNo++;
    Next.textContent = "Next";
    count.textContent = "Question No: " + questionNo;
    showQuestion();
}
});

function showQuestion() {
    const currentQuestion = questionDes[questionNo-1];
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'option';
        radioInput.value = i;
        optionElement.appendChild(radioInput);
        
        const optionText = document.createElement('span');
        optionText.textContent = i + ':  ' + currentQuestion.options[i - 1];
        optionElement.appendChild(optionText);

        optionsContainer.appendChild(optionElement);
        
        optionElement.addEventListener('click', function () {
            if (!answerSelected) {
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected','correct','incorrect');
            });
            optionElement.classList.add('selected');
            radioInput.checked = true;
            const selectedValue = parseInt(radioInput.value);

            if (selectedValue === currentQuestion.correctIndex) {
                optionElement.classList.add('correct');
            } else {
                optionElement.classList.add('incorrect');
            }
            answerSelected = true; // Flag that an answer has been selected
        }
        });

        if (currentQuestion.options[i-1] === currentQuestion.correctOption) {
            currentQuestion.correctIndex = i;
        }
    }
};
