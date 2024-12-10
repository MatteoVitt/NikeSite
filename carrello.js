const cestini = document.querySelectorAll('.bin');

// funzione per aggiornare il totale
function aggiornaTotale() {
    let totale = 0;
    //inizializza per partire da 0
    const prezzi = document.querySelectorAll('.prezzo h5');
    
    prezzi.forEach(prezzo => {
        const valore = parseFloat(prezzo.textContent.replace('€', '').replace(',', '.'));
        totale += valore;
    });
    //parsefloat per il numero decimale
    //levo simbolo euro per il calcolo (ritorna dopo)
    
    // aggiorno totale
    const elementoTotaleRiepilogo = document.querySelector('#riepilogo .right:last-child p');
    elementoTotaleRiepilogo.textContent = totale.toFixed(2).replace('.', ',') + '€';

   
    const elementoTotale = document.querySelector('#totale p');
    elementoTotale.textContent = totale.toFixed(2).replace('.', ',') + '€';
}

//  carrello vuoto
function verificaCarrelloVuoto() {
    const elementiScarpe = document.querySelectorAll('.scarpas');
    if (elementiScarpe.length === 0) {
        const tuocarrello = document.querySelector('#tuocarrello');
        //controllo del carrello se e 0
        
        // aggiungere carrello vuoto
        tuocarrello.innerHTML = '<h3>NON CI SONO ARTICOLI NEL TUO CARRELLO :(</h3>';
    }
}

//evento clic su ogni icona bin
cestini.forEach(cestino => {
    cestino.addEventListener('click', function() {
        
        const scarpa = this.closest('.scarpas');
        
        
        scarpa.classList.add('fade-out');

        
        setTimeout(() => {
            scarpa.remove();
            
            //  totale
            aggiornaTotale();
            
            // carrello vuoto
            verificaCarrelloVuoto();
        }, 500); // Tempo durata della transizione in ms
    });
});

// totale aggiornato SEMPRE
aggiornaTotale();
