// listener per ogni elemento con classe "schedine" nel div con id "schedine"
document.querySelectorAll('#schedine .schedine').forEach(item => {
    item.addEventListener('mouseenter', function() {
        
        const schedone = document.getElementById('schedone');
        schedone.innerHTML = ''; 
        
        
        const mediaElement = this.querySelector('img') || this.querySelector('video');

        // clono elemento e lo aggiungo a schedone
        if (mediaElement) {
            const clone = mediaElement.cloneNode(true);
            schedone.appendChild(clone);

            // start video automatico
            if (clone.tagName.toLowerCase() === 'video') {
                clone.play();
            }
        }
    });
});

// mostro div fisso con info
document.querySelectorAll('.n').forEach(item => {
    item.addEventListener('click', function() {
        // recupero taglia
        const selectedSize = this.textContent;

        
        const fixedInfoDiv = document.getElementById('fixedInfo');
        const overlay = document.getElementById('overlay');

        // inserisco info nel div
        fixedInfoDiv.innerHTML = `
            <h3>NIKE AIR FORCE 1</h3>
            <h5>Scarpa Uomo</h5>
            <h5>Prezzo: 119,00 €</h5>
            <p>Taglia selezionata: ${selectedSize}</p>
            <img src="Immagini/AIR+FORCE+1+'07.png-2.jpeg" alt="Scarpa Nike">
            <div class="aggiungi">Aggiungi al carrello</div>
            <div class="salva">Aggiungi ai preferiti <img src="Loghi/heart.png" alt="Icona cuore"></div>`;

        //  visibile il div fisso 
        fixedInfoDiv.style.display = 'block';
        overlay.style.display = 'block';
    });
});

// chiudere div con click esterno
document.addEventListener('click', function(event) {
    const fixedInfoDiv = document.getElementById('fixedInfo');
    const overlay = document.getElementById('overlay');

    // if per la chiusura
    if (!fixedInfoDiv.contains(event.target) && !event.target.classList.contains('n')) {
        fixedInfoDiv.style.display = 'none';
        overlay.style.display = 'none';
    }
});

//  popup di conferma -Aggiunto al carrello
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    //  popup out dopo 2 secondi
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}

// listener per il click sul div aggiungi per mostrare il popup
document.addEventListener('click', function(event) {
    
    if (event.target.classList.contains('aggiungi')) {
        showPopup();
    }
});
