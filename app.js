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

function calculateExpression(expression) {
    try {
        if (/^[0-9+\-*/().\s]+$/.test(expression)) {
            const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
            const calculateFunction = new Function(`return ${sanitizedExpression}`);
            return calculateFunction();
        } else {
            throw new Error('Invalid expression');
        }
    } catch (error) {
        console.error('Error evaluating expression:', error);
        throw new Error('Failed to calculate expression');
    }
}

function findRoots(equation) {
    try {
        if (/^[0-9xX^+\-*/().\s]+$/.test(equation)) {
            const quadraticPattern = /([+-]?\d*)\s*[xX]\s*?\^2\s*([+-]?\d*)\s*[xX]\s*([+-]?\d*)\s*=\s*0/i;
            const cubicPattern = /([+-]?\d*)\s*[xX]\s*?\^3\s*([+-]?\d*)\s*[xX]\s*?\^2\s*([+-]?\d*)\s*[xX]\s*([+-]?\d*)\s*=\s*0/i;

            let coefficients;

            if (quadraticPattern.test(equation)) {
                coefficients = equation.match(quadraticPattern).slice(1).map(Number);
                const [a, b, c] = coefficients;
                const discriminant = b ** 2 - 4 * a * c;
                const roots = [];
                
                if (discriminant >= 0) {
                    roots.push((-b + Math.sqrt(discriminant)) / (2 * a));
                    roots.push((-b - Math.sqrt(discriminant)) / (2 * a));
                }

                return roots;
            } else if (cubicPattern.test(equation)) {
                coefficients = equation.match(cubicPattern).slice(1).map(Number);
                const [a, b, c, d] = coefficients;
                const roots = findCubicRoots(a, b, c, d);
                return roots;
            } else {
                throw new Error('Unsupported equation type');
            }
        } else {
            throw new Error('Invalid equation');
        }
    } catch (error) {
        console.error('Error finding roots:', error);
        throw new Error('Failed to find roots');
    }
}

function findCubicRoots(a, b, c, d) {
    const roots = [];

    const delta0 = c / a - (b ** 2) / (3 * a ** 2);
    const delta1 = 2 * (b ** 3) / (27 * a ** 3) - b * c / (3 * a ** 2) + d / a;

    const Q = Math.cbrt(delta1 / 2 + Math.sqrt((delta1 / 2) ** 2 + (delta0 / 3) ** 3));
    const S = Math.cbrt(delta1 / 2 - Math.sqrt((delta1 / 2) ** 2 + (delta0 / 3) ** 3));

    const rootsSum = -b / (3 * a);

    roots.push(Q + S + rootsSum);
    roots.push(-((Q + S) / 2) + rootsSum + ((Q - S) * Math.sqrt(3)) / 2);
    roots.push(-((Q + S) / 2) + rootsSum - ((Q - S) * Math.sqrt(3)) / 2);

    return roots;
}

function solveTrigonometricEquation(equation) {
    try {
        if (/^[0-9xX^+\-*/().\s\sintancosecloglnsqrt]+$/.test(equation)) {
            const trigonometricPattern = /(sin|cos|tan|cot|sec|cosec)\s*\(\s*([+-]?\d*\.*\d*)\s*\)/i;

            let match;
            let result = equation;
            while ((match = trigonometricPattern.exec(result)) !== null) {
                const [, func, value] = match;
                const angle = parseFloat(value);
                let trigResult;

                switch (func.toLowerCase()) {
                    case 'sin':
                        trigResult = Math.sin(angle);
                        break;
                    case 'cos':
                        trigResult = Math.cos(angle);
                        break;
                    case 'tan':
                        trigResult = Math.tan(angle);
                        break;
                    case 'cot':
                        trigResult = 1 / Math.tan(angle);
                        break;
                    case 'sec':
                        trigResult = 1 / Math.cos(angle);
                        break;
                    case 'cosec':
                        trigResult = 1 / Math.sin(angle);
                        break;
                    default:
                        throw new Error('Unsupported trigonometric function');
                }
                result = result.replace(match[0], trigResult);
            }
            return result;
        } else {
            throw new Error('Invalid equation');
        }
    } catch (error) {
        console.error('Error solving trigonometric equation:', error);
        throw new Error('Failed to solve trigonometric equation');
    }
}
function getCapital(country) {
    const capitals = {
        'Afghanistan': 'Kabul',
        'Albania': 'Tirana',
        'Algeria': 'Algiers',
        'Andorra': 'Andorra la Vella',
        'Angola': 'Luanda',
        'Antigua and Barbuda': 'Saint Johns',
        'Argentina': 'Buenos Aires',
        'Armenia': 'Yerevan',
        'Australia': 'Canberra',
        'Austria': 'Vienna',
        'Azerbaijan': 'Baku',
        'Bahamas': 'Nassau',
        'Bahrain': 'Manama',
        'Bangladesh': 'Dhaka',
        'Barbados': 'Bridgetown',
        'Belarus': 'Minsk',
        'Belgium': 'Brussels',
        'Belize': 'Belmopan',
        'Benin': 'Porto-Novo',
        'Bhutan': 'Thimphu',
        'Bolivia': 'Sucre',
        'Bosnia and Herzegovina': 'Sarajevo',
        'Botswana': 'Gaborone',
        'Brazil': 'Brasília',
        'Brunei': 'Bandar Seri Begawan',
        'Bulgaria': 'Sofia',
        'Burkina Faso': 'Ouagadougou',
        'Burundi': 'Bujumbura',
        'Cabo Verde': 'Praia',
        'Cambodia': 'Phnom Penh',
        'Cameroon': 'Yaoundé',
        'Canada': 'Ottawa',
        'Central African Republic': 'Bangui',
        'Chad': 'NDjamena',
        'Chile': 'Santiago',
        'China': 'Beijing',
        'Colombia': 'Bogotá',
        'Comoros': 'Moroni',
        'Congo': 'Brazzaville',
        'Costa Rica': 'San José',
        'Croatia': 'Zagreb',
        'Cuba': 'Havana',
        'Cyprus': 'Nicosia',
        'Czech Republic': 'Prague',
        'Denmark': 'Copenhagen',
        'Djibouti': 'Djibouti',
        'Dominica': 'Roseau',
        'Dominican Republic': 'Santo Domingo',
        'East Timor': 'Dili',
        'Ecuador': 'Quito',
        'Egypt': 'Cairo',
        'El Salvador': 'San Salvador',
        'Equatorial Guinea': 'Malabo',
        'Eritrea': 'Asmara',
        'Estonia': 'Tallinn',
        'Eswatini': 'Mbabane',
        'Ethiopia': 'Addis Ababa',
        'Fiji': 'Suva',
        'Finland': 'Helsinki',
        'France': 'Paris',
        'Gabon': 'Libreville',
        'Gambia': 'Banjul',
        'Georgia': 'Tbilisi',
        'Germany': 'Berlin',
        'Ghana': 'Accra',
        'Greece': 'Athens',
        'Grenada': 'St. Georges',
        'Guatemala': 'Guatemala City',
        'Guinea': 'Conakry',
        'Guinea-Bissau': 'Bissau',
        'Guyana': 'Georgetown',
        'Haiti': 'Port-au-Prince',
        'Honduras': 'Tegucigalpa',
        'Hungary': 'Budapest',
        'Iceland': 'Reykjavik',
        'India': 'New Delhi',
        'Indonesia': 'Jakarta',
        'Iran': 'Tehran',
        'Iraq': 'Baghdad',
        'Ireland': 'Dublin',
        'Israel': 'Jerusalem',
        'Italy': 'Rome',
        'Ivory Coast': 'Yamoussoukro (official), Abidjan (economic)',
        'Jamaica': 'Kingston',
        'Japan': 'Tokyo',
        'Jordan': 'Amman',
        'Kazakhstan': 'Nur-Sultan',
        'Kenya': 'Nairobi',
        'Kiribati': 'Tarawa Atoll',
        'Kosovo': 'Pristina',
        'Kuwait': 'Kuwait City',
        'Kyrgyzstan': 'Bishkek',
        'Laos': 'Vientiane',
        'Latvia': 'Riga',
        'Lebanon': 'Beirut',
        'Lesotho': 'Maseru',
        'Liberia': 'Monrovia',
        'Libya': 'Tripoli',
        'Liechtenstein': 'Vaduz',
        'Lithuania': 'Vilnius',
        'Luxembourg': 'Luxembourg City',
        'North Macedonia': 'Skopje',
        'Madagascar': 'Antananarivo',
        'Malawi': 'Lilongwe',
        'Malaysia': 'Kuala Lumpur',
        'Maldives': 'Malé',
        'Mali': 'Bamako',
        'Malta': 'Valletta',
        'Marshall Islands': 'Majuro',
        'Mauritania': 'Nouakchott',
        'Mauritius': 'Port Louis',
        'Mexico': 'Mexico City',
        'Micronesia': 'Palikir',
        'Moldova': 'Chisinau',
        'Monaco': 'Monaco',
        'Mongolia': 'Ulaanbaatar',
        'Montenegro': 'Podgorica',
        'Morocco': 'Rabat',
        'Mozambique': 'Maputo',
        'Myanmar': 'Naypyidaw',
        'Namibia': 'Windhoek',
        'Nauru': 'Yaren',
        'Nepal': 'Kathmandu',
        'Netherlands': 'Amsterdam',
        'New Zealand': 'Wellington',
        'Nicaragua': 'Managua',
        'Niger': 'Niamey',
        'Nigeria': 'Abuja',
        'North Korea': 'Pyongyang',
        'Norway': 'Oslo',
        'Oman': 'Muscat',
        'Pakistan': 'Islamabad',
        'Palau': 'Ngerulmud',
        'Panama': 'Panama City',
        'Papua New Guinea': 'Port Moresby',
        'Paraguay': 'Asunción',
        'Peru': 'Lima',
        'Philippines': 'Manila',
        'Poland': 'Warsaw',
        'Portugal': 'Lisbon',
        'Qatar': 'Doha',
        'Romania': 'Bucharest',
        'Russia': 'Moscow',
        'Rwanda': 'Kigali',
        'Saint Kitts and Nevis': 'Basseterre',
        'Saint Lucia': 'Castries',
        'Saint Vincent and the Grenadines': 'Kingstown',
        'Samoa': 'Apia',
        'San Marino': 'San Marino',
        'Sao Tome and Principe': 'São Tomé',
        'Saudi Arabia': 'Riyadh',
        'Senegal': 'Dakar',
        'Serbia': 'Belgrade',
        'Seychelles': 'Victoria',
        'Sierra Leone': 'Freetown',
        'Singapore': 'Singapore',
        'Slovakia': 'Bratislava',
        'Slovenia': 'Ljubljana',
        'Solomon Islands': 'Honiara',
        'Somalia': 'Mogadishu',
        'South Africa': 'Pretoria (administrative), Bloemfontein (judicial), Cape Town (legislative)',
        'South Korea': 'Seoul',
        'South Sudan': 'Juba',
        'Spain': 'Madrid',
        'Sri Lanka': 'Colombo (executive), Sri Jayawardenepura Kotte (legislative)',
        'Sudan': 'Khartoum',
        'Suriname': 'Paramaribo',
        'Sweden': 'Stockholm',
        'Switzerland': 'Bern',
        'Syria': 'Damascus',
        'Taiwan': 'Taipei',
        'Tajikistan': 'Dushanbe',
        'Tanzania': 'Dodoma (official), Dar es Salaam (commercial)',
        'Thailand': 'Bangkok',
        'Togo': 'Lome',
        'Tonga': 'Nuku alofa',
        'Trinidad and Tobago': 'Port of Spain',
        'Tunisia': 'Tunis',
        'Turkey': 'Ankara',
        'Turkmenistan': 'Ashgabat',
        'Tuvalu': 'Funafuti',
        'Uganda': 'Kampala',
        'Ukraine': 'Kyiv',
        'United Arab Emirates': 'Abu Dhabi',
        'United Kingdom': 'London',
        'United States': 'Washington, D.C.',
        'Uruguay': 'Montevideo',
        'Uzbekistan': 'Tashkent',
        'Vanuatu': 'Port Vila',
        'Vatican City': 'Vatican City',
        'Venezuela': 'Caracas',
        'Vietnam': 'Hanoi',
        'Yemen': 'Sanaa',
        'Zambia': 'Lusaka',
        'Zimbabwe': 'Harare',
        'Abkhazia': 'Sukhumi',
        'Artsakh (Nagorno-Karabakh)': 'Stepanakert',
        'South Ossetia': 'Tskhinvali',
        'Cook Islands': 'Avarua',
        'Niue': 'Alofi',
        'Sahrawi Arab Democratic Republic': 'El Aaiún',
        'Somaliland': 'Hargeisa',
        'Taiwan': 'Taipei',
    };

    const formattedCountry = country.toLowerCase();

    if (capitals.hasOwnProperty(formattedCountry)) {
        return capitals[formattedCountry];
    } else {
        return 'Unknown capital';
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

const math = require('mathjs');

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Uday Sir, How May I Help You?");
    }
    else if(message.includes('what can you do')){
        speak("I will do the most complex tasks for you without you using your hands. Just command what you want sir");
    }
    else if(message.includes('are you a male or a female')){
        speak("Sir, I am a Virtual Artificial Intelligence. I have a voice whose tone depends on where you are using me");
    }
    else if(message.includes('are you a male or a female')){
        speak("Sir, I am a Virtual Artificial Intelligence. I have a voice whose tone depends on where you are using me");
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
    else if (message.includes('what is the capital of')) {
        const countryToCheck = message.replace('capital of', '').trim();
        const capital = getCapital(countryToCheck);
    
        if (capital !== 'Unknown capital') {
            speak(`The capital of ${countryToCheck} is: ${capital}`);
        } else {
            speak(`I'm sorry, I don't know the capital of ${countryToCheck}`);
        }
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
    else if(message.includes("what is the full form of your name")){
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
    else if (message.includes('solve trigonometric equation')) {
        const equation = message.replace('solve trigonometric equation', '').trim();
    
        try {
            const solution = solveTrigonometricEquation(equation);
            console.log(`The solution of ${equation} is: ${solution}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
    
    else if (message.includes('calculate')) {
        const expression = message.replace('calculate', '').trim();
    
        try {
            const result = calculateExpression(expression);
            speak(`The result of ${expression} is: ${result}`);
        } catch (error) {
            speak('Sorry, I couldn\'t calculate that expression.');
        }
    }

    else if (message.includes('find roots')) {
        const equation = message.replace('find roots', '').trim();
    
        try {
            const roots = findRoots(equation);
    
            if (roots.length > 0) {
                console.log(`The roots of ${equation} are: ${roots.join(', ')}`);
            } else {
                console.log(`The equation ${equation} has no real roots.`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
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
