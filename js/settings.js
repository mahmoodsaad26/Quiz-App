import {Quiz} from './quiz.js'
export class Setting{
    constructor(){
       this.categoryInput=document.getElementById('category')
       this.diffcultyInput=document.getElementsByName('difficulty')
       this.numOfQuestionsInput=document.getElementById('numberOfQuestions')
       document.getElementById('startBtn').addEventListener('click',this.startQuiz.bind(this))
    //    console.log(this.numOfQuestionsInput);
    }

    async startQuiz(){
        let category=this.categoryInput.value;
        let difficulty=Array.from(this.diffcultyInput).filter(ele=> ele.checked)[0].value
        let numberOfQuestions=this.numOfQuestionsInput.value
        let api=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questions=await this.fetchApi(api);
        if(numberOfQuestions>0){
            $('#setting').fadeOut(500,function () {
                $('#quiz').fadeIn(500)
                let quiz= new Quiz(questions)
            })
        }else{
            $('#alert1').fadeIn(500)
        }
    }

    async fetchApi(api){
        let https=await fetch(api)
        let response= await https.json()
        return response.results
        
    }
}