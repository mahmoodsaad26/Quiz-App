export class Quiz {
    constructor(questions) {
        this.questions = questions
        this.currentIndex = 0
        this.score = 0;
        console.log(questions);
        this.showQuestion()
        document.getElementById('next').addEventListener('click', this.nextQuestion.bind(this))
        document.getElementById('tryBtn').addEventListener('click',this.tryAgain)
    }


    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    showQuestion() {
        document.getElementById('question').innerHTML = this.questions[this.currentIndex].question
        document.getElementById('currentQuestion').innerHTML = this.currentIndex + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.questions.length
        let answers = [this.questions[this.currentIndex].correct_answer, ...this.questions[this.currentIndex].incorrect_answers]
       answers=this.shuffle(answers)
        let cartona = ``
        for (let i = 0; i < answers.length; i++) {
            cartona += `<label class="form-check-label mx-4 pt-1">
            <input type="radio" class="form-check-input ms-2" name="answers" id="" value="${answers[i]}"
                >
            ${answers[i]}
        </label>
        </br>`
        }
        document.getElementById('rowAnswer').innerHTML = cartona
    }

    nextQuestion() {
        let userAnswer = Array.from(document.getElementsByName('answers')).filter(ele => ele.checked)[0]
        let correctAnswer = this.questions[this.currentIndex].correct_answer
        if (userAnswer) {
            this.checkAnswer(userAnswer.value, correctAnswer)
            console.log(correctAnswer);
            this.currentIndex++;
            if (this.currentIndex < this.questions.length) {
                this.showQuestion()

            } else {
                $('#quiz').fadeOut(500, () => {
                    $('#finish').fadeIn(500)
                })
                document.getElementById('score').innerHTML = this.score
                document.getElementById('total').innerHTML = this.questions.length
            }
        } else {
            $('#alert').fadeIn(500).fadeOut(500)
        }

    }

    checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer == correctAnswer) {
            this.score++;
            $('#Correct').fadeIn(500).fadeOut(500);
        } else {
            $('#inCorrect').fadeIn(500).fadeOut(500);
        }

    }

    tryAgain(){
       $('#finish').fadeOut(500,()=>{
        $('#setting').fadeIn(500)
       })
       $('#numberOfQuestions').val(null);
    }
}