"use strict";

// Nimetään Add Note- painike, Clear Notes- painike ja contents-div
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const content = document.getElementById("contents");
// Muuttuja notNotes- tekstille
const notNotes = document.getElementById("notNotes");
// Nimetään laskuri, joka laittaa numeron jokaiseen noteen järjestysnumeron
let count = 1;

// Luodaan funktio, joka luo contents-diviin Note-divin
function makeNote() {
    let data = [];

    // Luodaan muuttuja textarea:sta
    let input = document.getElementById("textarea").value;

    // Luodaan Note-div
    let note_div = document.createElement("div");
    // Edelliselle diville class-arvo: noteDiv
    note_div.classList.add("noteDiv");
    // Luodaan Note-otsikkoelementti
    let note_h3 = document.createElement("h3");
    // Luodaan Note-otsikkoelementille teksti
    let note_h3_txt = document.createTextNode("Note " + count);

    // Luodaan Note-paragraph elementti
    let note_p = document.createElement("p");
    // Luodaan teksti Noteen textarean tuotoksesta
    let note_p_txt = document.createTextNode(input);

    // Luodaan painike Note-diviin
    let note_button = document.createElement("button");
    note_button.setAttribute("value", count)
    // Painikkeeseen teksti
    let note_button_txt = document.createTextNode("View Detail");

    // Luodaan note_buttoniin eventlistener, joka avaa modalin + syöttää tiedot
    note_button.addEventListener("click", function() {
        let modal = document.getElementById("modal");
        document.getElementById("modal-title").innerHTML = data[0].title
        document.getElementById("modal-para").innerHTML = data[0].txt
        modal.style.display = "block";
    });

    // Luodaan painike Note-divin poistoa varten
    let note_delete = document.createElement("button");
    // Painikkeeseen teksti + hiukan muotoilua
    // Huom! Tämän napin teksti tehty innerHTML tavalla; eli ei tarvitse tehdä erillistä textNodea ja yhdistelyä (Hiukan lyhyempi tapa)
    note_delete.innerHTML = "X";
    note_delete.style.marginLeft = "0.5em";

    // Sitten yhdistellään paloja

    data.push({"title": note_h3_txt.textContent, "txt": input})

    // Ensin Note diviin otsikko
    note_h3.appendChild(note_h3_txt);
    note_div.appendChild(note_h3);

    // Sitten textarean teksti
    note_p.appendChild(note_p_txt);
    note_div.appendChild(note_p);

    // Ja vielä painikkeet
    note_button.appendChild(note_button_txt);
    note_div.appendChild(note_button);
    note_div.appendChild(note_delete);

    // Lisätään note_deleteen eventListener
    note_delete.addEventListener("click", function() {
        // Poistaa parent-elementin, eli tässä tapauksessa kyseisen divin, jossa tämä nappi on
        this.parentNode.remove();
        // Haetaan kaikki aiemmin luodut divit yhtenn arrayhyn nimellä noteDiv
        let noteDivs = document.getElementsByClassName("noteDiv");
        // Jos arrayssa ei ole enää objekteja, niin näytetään noNotes, joka on hiukan alempana koodattuna, sekä resetoidaan laskuri (count)
        // Muussa tapauksessa laskuria ei nollata ja noNotes pysyy piilossa
        if(!noteDivs[0]) {
            notNotes.style.display = "block";
            count = 1;
        }
        else {
            notNotes.style.display = "none";
        }
    });

    // Sitten yhdistetään Note-div html:stä löytyvään contents-diviin
    content.appendChild(note_div);

    // Lisätään aina yksi laskuriin funktion päättyessä, niin seuraava note on aina järjestysnumeroltaan yhden suurempi
    count++;

    // Piilotetaan alkuteksti notNotes
    notNotes.style.display = "none";
}

// Luodaan addListener Add Note- painikkeeseen
add.addEventListener("click", function() {
    // Textarea:n kenttä
    let input = document.getElementById("textarea");

    // Jos textarea on tyhjä, niin alert-toiminto. Jos textareassa tekstiä, niin lisää noten
    (input.value === "") ? alert("Textfield is empty!") : makeNote();

    // Tyhjennetän edellinen teksti ja fokusoidaan takaisin textareaan
    input.value = "";
    input.focus();
});

clear.addEventListener("click", function() {
    // Nimetään taas muuttujia
    let input = document.getElementById("textarea");
    let noteDivs = document.getElementsByClassName("noteDiv");

    // Niin kauan kuin noteDivs-arrayssa on array[0], poistetaan noteDiveja
    while(noteDivs[0]) {
        noteDivs[0].parentNode.removeChild(noteDivs[0]);
    }

    // notNotes näkyviin, textarean tyhjennys ja fokusointi textareaan... Niin ja count takaisin ykköseen!!!
    notNotes.style.display = "block";
    input.value = "";
    input.focus();
    count = 1;
});



// Haetaan <span> elementti, joka sisältää ruksin
let span = document.getElementsByClassName("close")[0];

// Lisätään edelliseen elementtiin eventListener, joka suorittaa funktion -> sulkee modalin
span.addEventListener("click", function() {
  modal.style.display = "none";
});

// Tämä sen sijaan sulkee modalin, jos käyttäjä klikkaa modalin ulkopuolelle
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
