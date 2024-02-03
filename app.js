const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1.1;
    text_speak.volume = 1;
    text_speak.pitch = 2;

    window.speechSynthesis.speak(text_speak);
}
async function fetchJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();

        if (data.type === 'single') {
            return data.joke;
        } else {
            return `${data.setup} ${data.delivery}`;
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        return "I'm sorry, I couldn't fetch a joke at the moment.";
    }
}

async function fetchFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const data = await response.json();

        return data.text;
    } catch (error) {
        console.error('Error fetching fact:', error);
        return "I'm sorry, I couldn't fetch a fact at the moment.";
    }
}
async function fetchAndSpeakNews() {
    const apiKey = '39b796fb27f049de8ae1afd30b7eaa9b';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(newsApiUrl);
        const data = await response.json();

        const articles = data.articles.slice(0, 3);
        const firstArticleTitle = articles[0].title;
        speak(firstArticleTitle);
        return articles[0];
    } catch (error) {
        handleNewsError(error);
        return null;
    }
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing EDITH..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Uday Sir, How May I Help You?");
    }
    if(message.includes('what can you do for me')){
        speak("I will do the most complex tasks for you without you using your hands. Just command what you want sir");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if (message.includes('joke') || message.includes('tell me another joke')) {
        fetchJoke().then(joke => speak(joke));
    }

    else if (message.includes('tell me a fact') || message.includes('tell me another fact')) {
        fetchFact().then(fact => speak(fact));
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }
    else if(message.includes("what is your name")){
        speak("Allow me to introduce myself, I am EDITH, The virtual Artificial Intelligence, And I am here to assist you with a variety of task as best I can. 24 hours a day and 7 days a week, No I am fully operational. ")
    }
    else if (message.includes('timer')) {
        const time = parseInt(message.match(/\d+/)[0]);
        if (!isNaN(time)) {
            setTimeout(() => speak(`Timer for ${time} minutes is complete!`), time * 60 * 1000);
            speak(`Setting a timer for ${time} minutes.`);
        } else {
            speak("I couldn't understand the timer duration.");
        }
    }
    else if(message.includes("what is the full form of E.D.I.T.H")){
        speak("It is Even Dead I AM The Hero")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
    else if (message.includes('news') || message.includes('tell me another news')) {
        fetchAndSpeakNews().then(article => {
            if (article) {
                speak(`So today's news is: ${article.title}`);
            } else {
                speak("Sorry, I couldn't fetch the news at the moment.");
            }
        });
    }
    else if (message.includes('calculate')) {
        
        const expression = message.replace('calculate', '').trim();
        const result = eval(expression); 
        speak(`The result of ${expression} is: ${result}`);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if (message.includes('stop listening')) {
        recognition.stop();
        speak("I'll stop listening now sir. If you need assistance again, click the 'Talk' button.");
    }
    else if (randomCondition) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    
    }
    else {
        speak("I'm sorry Sir, I didn't understand your command. Can you please repeat again for me?");
    }
}
