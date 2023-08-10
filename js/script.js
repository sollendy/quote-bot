// voglio che al click su un riquadro di un personaggio:
// spunti un caricamento con una icona personalizzata
// dopo il caricamento venga renderizzato un modale che mostra una frase presa da una chiamata API

// VARIABILI
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "";

const loader = document.querySelector('.carico');
const modal = document.querySelector(".modale");
const modalContent = document.querySelector('.nel-modale');
const modalClose = document.querySelector('.chiudi-modale');

// FUNZIONI
async function faiPersonaggio(nomePersonaggio) {
    loader.classList.remove("no-carico");
    // prepariamo la chiamata API
    const action = azioniIstantanee();
    const temperature = 0.7;
    // prepariamo il recupero della risposta
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${nomePersonaggio}, ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio.`
                }
            ],
            temperature: temperature
        })
    })
    // converto la risposta in json
    const data = await response.json();

    // vedere cosa mi restituisce 
    console.log(data.choices[0].message.content);
    // console.log(nomePersonaggio);

    // compilare la modale con la risposta
    const message = data.choices[0].message.content;
    modalContent.innerHTML = `
    <div class="chiudi-modale">
        <img src="./images/close.svg" />
    </div>
    <h2>${nomePersonaggio}</h2>
    <p>${message}</p>
    <code>Personaggio: ${nomePersonaggio}, azione: ${action}, temperatura: ${temperature}.</code>
    `;

    //togliere caricamento e mostrare modale
    loader.classList.add("no-carico");
    modal.classList.remove("no-modale");

};

function azioniIstantanee() {
    const actions = [
        'salutare nel tuo modo più iconico',
        'dare un consiglio di stile in base ai tuoi gusti',
        'raccontare la tua ultima avventura',
        'svelarmi i tuoi sogni',
        'dirmi chi è il tuo migliore amico',
        'scrivere la tua bio di linkedin'
    ];

    const indexAzioni = Math.floor(Math.random() * actions.length); // da 0 a 5

    return actions[indexAzioni];
}

// PRIMA PARTE
const personaggi = document.querySelectorAll(".personaggio");

personaggi.forEach(function(element) {
    element.addEventListener("click", function() {
        faiPersonaggio(element.dataset.personaggio);
        // console.log(element.dataset.personaggio);
    });
});

modal.addEventListener("click", function() {
    modal.classList.add("no-modale");
});