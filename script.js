use strict";

const URL_JSON = "prodotti.json";

async function caricaProdotti() {
    const contenitore = document.getElementById("contenitore");

    try {
        
        const risposta = await fetch(URL_JSON);

        if (!risposta.ok) {
            throw new Error("Errore nella lettura del file JSON");
        }

        const dati = await risposta.json();

        const prodotti = dati.prodotti;

        contenitore.replaceChildren();

        prodotti.forEach(function(prodotto) {

            const dettagli = prodotto.dettagli;

            
            const scheda = document.createElement("article");
            scheda.className = "prodotto";

            const immagine = document.createElement("img");
            immagine.src = prodotto.immagine;
            immagine.alt = prodotto.nome;

            const titolo = document.createElement("h2");
            titolo.textContent = prodotto.nome;

            const categoria = document.createElement("p");
            categoria.textContent = "Categoria: " + prodotto.categoria;

            const prezzo = document.createElement("p");
            prezzo.className = "prezzo";
            prezzo.textContent = prodotto.prezzo.toLocaleString(
                "it-IT",
                {
                    style: "currency",
                    currency: "EUR"
                }
            );

            const marca = document.createElement("p");
            marca.textContent = "Marca: " + dettagli.marca;

            const colore = document.createElement("p");
            colore.textContent = "Colore: " + dettagli.colore;

            const memoria = document.createElement("p");
            memoria.textContent = "Caratteristiche: " + dettagli.memoria;

            const disponibilita = document.createElement("p");

            if (dettagli.disponibilita) {
                disponibilita.textContent = "Disponibile";
                disponibilita.className = "disponibile";
            } else {
                disponibilita.textContent = "Non disponibile";
                disponibilita.className = "esaurito";
            }

            scheda.append(
                immagine,
                titolo,
                categoria,
                prezzo,
                marca,
                colore,
                memoria,
                disponibilita
            );

            contenitore.appendChild(scheda);
        });

    } catch (errore) {
        contenitore.textContent =
            "Impossibile caricare i prodotti: " + errore.message;

        contenitore.className = "errore";

        console.error(errore);
    }
}


caricaProdotti();
