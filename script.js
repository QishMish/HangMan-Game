const wordElements = document.querySelector('.words');
const wrongLettersElement = document.getElementById('wrong');
const playAgainBtn = document.querySelector('.button-restart');
const modal = document.querySelector('.modal');
const notification = document.querySelector('.notification');
const finalMessage = document.querySelector('.final-message');
const figureParts = document.querySelectorAll('.parts');



const words = ['javascript','offside','cricket','tiebreak','london','amsterdam','kilimanjaro'];



let randomWord = Math.floor(Math.random()*words.length);

let selectedWord = words[randomWord];

const correctLetters = [];

const wrongLetters = [];


const displayWord = () =>{

    wordElements.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter =>
         `<div class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
          </div>
          `).join('')

    }`
    const innerWord = wordElements.innerText.replace(/\n/g, '');
    console.log(innerWord);

    if(innerWord.toLowerCase() === selectedWord){
        modal.classList.add('show');
        finalMessage.textContent = `Congrats  The Secret Word Was ${selectedWord }`

    }
    console.log(selectedWord);
}



window.addEventListener('keydown', (e)=>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        let letter = e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord();
            }else{
                alertNotification()
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                displayWrongLetters();
            }else{
                alertNotification()
            }
        }
    }
});


function alertNotification(){
    notification.classList.add('notification-show');
        setTimeout(()=>{
            notification.classList.remove('notification-show');
        }, 1800);
}


function displayWrongLetters() {


    if(wrongLetters.length > 0){
        wrongLettersElement.innerHTML = `
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
        `  
    }

    if(wrongLetters.length > 0){
        wrongLetters.map((item)=>{
            console.log(item)
        })
    }
      

    figureParts.forEach((part, index) =>{
        let wrongWords = wrongLetters.length;

        if(wrongWords > index){
            part.style.display = 'block';
        }
        if(wrongWords === figureParts.length){
            modal.classList.add('show');
            finalMessage.textContent = `You Loose The Game`
        }
        
    })

    playAgainBtn.addEventListener('click',() =>{
        location.reload();
    })

}



displayWord();

