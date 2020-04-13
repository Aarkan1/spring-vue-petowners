console.log('Hello from main script')

/*
    Nästa sak vi vill göra nu är att skapa
    en metod som frågar vår backend om en sak.

    Vi vill se om det går att hämta alla husdjur
    från databasen.

    När vår frontend kommunicerar med backenden så
    kan det ta lite tid.. så vi måste berätta för koden
    att den måste vänta på ett svar innan den fortsätter.

    Detta gör man med något man kallar async/await..

    Bra förklaring i denna länk:
    https://javascript.info/async-await

    Metoden vi använder för att kommunicera med vår backend
    heter "fetch()", och i parametern till metoden skickar
    man den "endpoint" vi vill komma åt i controllern.
    T ex i vårt fall: fetch("/rest/pets")
*/

/*
    Kommer här skapa funktionen som hämtar husdjuren.

    När vi får ett svar från backenden, så får vi den i variabeln
    "response".

    MEN! Vi får inte svar direkt, utan vi måste vänta på att
    servern ska svara. Detta gör vi genom att skriva "await"
    framför fetch.

    Detta kommer ge ett error, för att få använda "await"
    i en metod, så måste metoden taggas med "async".
*/
async function getAllPets() { // function must be async
    let response = await fetch('/rest/pets') // for await to work
    // för att omvandla denna response till det objekt
    // vi förväntar oss, så behöver vi göra följande:
    response = await response.json()

    /*
        Detta kommer extrahera det objekt som skickas från
        servern, och vi kan nu se resultatet :D :D
    */

    console.log(response) // låt oss titta på hur responsen ser ut
}

// glöm inte anropa metoden ;)
getAllPets()

/*
    Responsen ser inte ut som förväntat.
    Vi ville ha tillbaka alla husdjur i en array,
    men vi fick ett konstigt objekt som innehåller
    status-koder osv...

    Ingenstans hittar vi vår array!!?!?!?!?

    Detta är för att vi måste konvertera detta response-objekt
    till ett vanligt JavaScript-objekt(eller iaf hämta ut den
    data vi tänkte vi skulle få)
*/

/*
    Nu kanske vi ska prova att skapa en metod som hämtar
    en Owner, och ser hur det fungerar..

    Denna kommer också behöva async/await för att funka,
    för vi frågar servern efter något som vi måste vänta på.

    Denna funktion gick lite fortare, men den är exakt samma
    som den vi gjorde precis, fast allt på en gång!

    Notera att denna fetch ger oss en lista av owners,
    men dessa owners lista med husdjur är null..

    Detta är medvetet, vi skapade endast logiken för att
    fylla på denna lista när vi hämtar en owner på ID..
*/
async function getAllOwners() {
    let response = await fetch('/rest/owners')
    response = await response.json()

    console.log(response)
}

/*
    Skulle man få ett error här med:
    "unexpected token<in JSON at position 0"
    så brukar det bero på att servern inte hittar
    entiteten i databasen, och då får vi "null" tillbaka.

    null går inte att omvandla med .json(), då får vi error.

    Bara data vi får som är en array eller object går att
    konvertera med .json().

    Skickar vi en String ifrån servern så får vi samma fel som
    med null.

    Då måste vi konvertera med .text() istället.
*/

getAllOwners()


/*
    För att vi ska kunna hämta en owner vars pets-array
    är fylld med rätt husdjur, så måste vi anropa en
    rest-route där vi skickar med ett ID

    Jag tänker skapa en funktion som vi kan återanvända
    för att hämta olika owners på olika ID:n

    variabeln som vi får svar från servern behöver
    inte heta "response", utan det var bara förklarande
    vad det är vi får.

    Oftast kallar man variabeln man kopplar med fetch till
    den förväntade datan..

    int id... så kan det gå när man hoppar
    mellan Java och JavaScript inom en timme...
*/
async function getOneOwner(id) { // vi är inte i Java här...
    // skickar med id från parametern till fetch-routen
    let owner = await fetch('/rest/owners/' + id)
    owner = await owner.json()

    console.log(owner)
}

getOneOwner(1)

/*
    För att kunna skapa en ny entitet i databasen,
    så måste där finnas en rest-route som lyssnar på
    en POST-request.

    Om vi tittar på våra olika mappings i PetControllern,
    så har vi flera stycken @GetMapping-metoder.

    Dessa lyssnar på alla requests som görs med GET.
    Detta gör fetch() automatiskt om vi inte skriver explicit
    att den ska göra annorlunda.
*/

/*
    Vi behöver först skapa det objekt vi vill skicka
    till server, så den kan sparas i databasen.

    Den bör ha ett name, species och en owner.

    Denna funktion får ett hårdkodad objekt,
    vilket vi sällan vill. För att funktionen ska bli
    dynamisk, så vi kan använda den till mer än bara detta,
    så borde vi göra den mer generell genom att den tar emot
    ett objekt som inparameter, och att den använder det objektet
    när den anropar servern.

    Svaret vi får från servern när vi skickar detta, är samma
    objekt tillbaka, fast nu med det nya ID:et som databasen
    lägger till med autoincrement.

    Vill jag göra något annat med fetch än att bara hämta data,
    så måste jag även(utöver url:en) lägga till ett options-objekt.

    Har kan jag nu skriva vilken sorts fetch-request jag vill göra,
    samt lägga till objektet som ska skickas.

    Ska vi skicka ett objekt till servern, så måste detta skickas
    som JSON. Det är så frontend-backend kommunicerar, och det
    ser ut ungefär såhär mellan alla språk.

    För att servern ska veta att det är ett json-objekt, så måste
    vi lägga till en header, där vi just specificerar att det är det
    med Content-Type: application/json

    JavaScript har en inbyggd funktion för att konvertera ett
    vanligt objekt till ett json-objekt. Detta gör man med
    JSON.stringify.

    (Likadant kan vi konvertera ett json-objekt till vanligt
    objekt med JSON.parse(object))
*/
async function createNewPet(pet) {
    let petFromServer = await fetch('/rest/pets', {
        // CRUD: alla olika metoder funkar med fetch
        // C: POST
        // R: GET (default)
        // U: PUT
        // D: DELETE
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    })
    petFromServer = await petFromServer.json() // nu är jag lite snabb

    console.log(petFromServer)
}

const pet = {
    name: 'Sweet eyes',
    species: 'Lamb',
    owner: 1
}

/*
    Vi kunde med detta skapa en ny entitet i databasen.
    Vi skapar ett nytt objekt i ren JavaScript,
    sedan skickar vi med det när vi anropar metoden som ska
    skicka det vidare till servern.

    Tillbaka får vi samma objekt, fast med det nya ID:et.

    Jag kommenterar ut så vi inte skapar en ny pet varje
    gång vi laddar om hemsidan.

    Vi kan också se att i med att vi lade till vilket ID ägaren
    hade, så gjorde även databasen kopplingen.
*/

//createNewPet(pet)


