const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
let inputWord = document.getElementById('input-word');

btn.addEventListener('click', function(){
    inputWordValue = document.getElementById('input-word').value;
    getdata()
})


async function getdata(){
    try {
        result.innerHTML = `
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster mx-auto">
            <div class="wheel"></div>
            <div class="hamster">
                <div class="hamster__body">
                    <div class="hamster__head">
                        <div class="hamster__ear"></div>
                        <div class="hamster__eye"></div>
                        <div class="hamster__nose"></div>
                    </div>
                    <div class="hamster__limb hamster__limb--fr"></div>
                    <div class="hamster__limb hamster__limb--fl"></div>
                    <div class="hamster__limb hamster__limb--br"></div>
                    <div class="hamster__limb hamster__limb--bl"></div>
                    <div class="hamster__tail"></div>
                </div>
            </div>
            <div class="spoke"></div>
        </div>
        `
        let response = await fetch(`${url}${inputWordValue}`);
        let data = await response.json()
        console.log(data);
        display(data)

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please ensure the input is correct.",
        });
        inputWord.value = '';
        result.innerHTML =''
    }
}

function display(data){
    document.querySelector('.result').innerHTML = `
                    <div class="word d-flex justify-content-between">
                        <h3>${inputWordValue}</h3>
                        <button onclick='playSound()'>
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div class="details d-flex gap-2">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>${data[0].phonetic}</p>
                    </div>
                    <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
                    <p class="word-example ps-3">${data[0].meanings[0].definitions[0].example || ''}</p>`;
        
    let audioValue = null; 

    for (let i = 0; i < 4; i++) {
        if (data[0].phonetics[i] && data[0].phonetics[i].audio) {
            audioValue = data[0].phonetics[i].audio;
            break; 
        }
    }
    
    if (audioValue) {
        sound.setAttribute('src', audioValue); 
    } else {
        sound.removeAttribute('src'); 
    }
    
    console.log(sound);
}

function playSound(){
    sound.play()
}