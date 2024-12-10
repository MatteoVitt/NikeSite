document.addEventListener('DOMContentLoaded', function () {
    
    
    const immagini = document.querySelectorAll('.immagine-carosello');
    let imm = 0;

    function cambiaImmagine() {
        
        immagini[imm].classList.remove('attiva');

        
        imm = (imm + 1) % immagini.length;

        
        immagini[imm].classList.add('attiva');
    }

    // immagine tempo
    setInterval(cambiaImmagine, 5000);
});
