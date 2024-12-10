document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carico');

    // tutte le constanti
    const consegna = document.getElementById('consegna');
    const ritiro = document.getElementById('ritiro');
    const nomeInput = document.getElementById('nome');
    const cognomeInput = document.getElementById('cognome');
    const indirizzoInput = document.getElementById('indirizzo');
    const capInput = document.getElementById('cap');
    const cittaInput = document.getElementById('citta');
    const paeseInput = document.getElementById('paese');
    const emailInput = document.getElementById('email');
    const cellulareInput = document.getElementById('cellulare');
    const salvaButton = document.getElementById('salvaButton');
    const modal = document.getElementById('modal');
    const acquistaButton = document.getElementById('acquistaButton');
    const errorMessage = document.getElementById('error-message');
    const cartaInput = document.getElementById('carta');
    const cvvInput = document.getElementById('cvv');
    const cartaCreditoCheckbox = document.getElementById('cartaCredito');
    const paypalCheckbox = document.getElementById('paypal');
    const googleCheckbox = document.getElementById('google');
    const borderBoxDiv = document.querySelector('.border-box');
    const emailPaypalGoogleDiv = document.getElementById('paypal-google-email');
    const emailPaypalGoogleInput = document.getElementById('emailPaypalGoogle');

    console.log('Elemento salvaButton trovato:', salvaButton);
    console.log('Elemento modal trovato:', modal);
    console.log('Elemento acquistaButton trovato:', acquistaButton);

    // funzione per selezionare opzione di consegna o ritiro
    const selezionaOpzione = (opzione) => {
        consegna.classList.remove('selezionato');
        ritiro.classList.remove('selezionato');
        opzione.classList.add('selezionato');
    };

    consegna.addEventListener('click', () => selezionaOpzione(consegna));
    ritiro.addEventListener('click', () => selezionaOpzione(ritiro));

    // funzione per mostrare messaggi di errore
    const mostraErrore = (elemento, messaggio) => {
        const erroreEsistente = elemento.nextElementSibling;
        if (!erroreEsistente || !erroreEsistente.classList.contains('errore')) {
            const errore = document.createElement('div');
            errore.className = 'errore';
            errore.style.color = 'red';
            errore.textContent = messaggio;
            elemento.parentElement.appendChild(errore);
        }
    };

    // funzione per validare un campo
    const validaCampo = (elemento) => {
        let valido = true;
        let messaggio = '';

        switch (elemento.id) {
            case 'nome':
                if (elemento.value.length < 3) {
                    valido = false;
                    messaggio = 'Il nome deve essere lungo almeno tre caratteri';
                }
                break;
            case 'cognome':
                if (elemento.value.length < 2) {
                    valido = false;
                    messaggio = 'Il cognome deve essere lungo almeno due caratteri';
                }
                break;
            case 'indirizzo':
                const indirizzoValido = /[0-9]/.test(elemento.value) && elemento.value.length > 0;
                if (!indirizzoValido) {
                    valido = false;
                    messaggio = 'Inserisci un indirizzo valido con numero civico';
                }
                break;
            case 'cap':
                if (!/^\d{5}$/.test(elemento.value)) {
                    valido = false;
                    messaggio = 'CAP non valido';
                }
                break;
            case 'citta':
                if (elemento.value.length < 3) {
                    valido = false;
                    messaggio = 'Il nome della città deve essere lungo almeno tre caratteri';
                }
                break;
            case 'paese':
                if (elemento.value.length < 3) {
                    valido = false;
                    messaggio = 'Il nome del paese/regione deve essere lungo almeno tre caratteri';
                }
                break;
            case 'email':
                const emailValida = /^[^\s@]+@[^\s@]+\.(com|it|eu)$/.test(elemento.value) && elemento.value.length >= 6;
                if (!emailValida) {
                    valido = false;
                    messaggio = 'Email non corretta';
                }
                break;
            case 'cellulare':
                if (!/^\d{10}$/.test(elemento.value)) {
                    valido = false;
                    messaggio = 'Numero di telefono non corretto';
                }
                break;
            default:
                valido = false;
                messaggio = 'Campo non valido';
                break;
        }

        if (valido) {
            const erroreEsistente = elemento.nextElementSibling;
            if (erroreEsistente && erroreEsistente.classList.contains('errore')) {
                erroreEsistente.remove();
            }
        } else {
            mostraErrore(elemento, messaggio);
        }

        verificaCampi(); // verifica di nuovo dei campi campi
    };

    // funzione per verificare tutti i campi
    const verificaCampi = () => {
        const campiValidi = [
            nomeInput, cognomeInput, indirizzoInput, capInput,
            cittaInput, paeseInput, emailInput, cellulareInput
        ].every(campo => !campo.nextElementSibling || !campo.nextElementSibling.classList.contains('errore'));

        // verifica se ci sono opzioni (consegna ritiro) selezionate e abilita/disabilita il salvaButton
        if (campiValidi && document.querySelector('.opzione.selezionato')) {
            salvaButton.classList.remove('disabilitato');
            salvaButton.disabled = false;
        } else {
            salvaButton.classList.add('disabilitato');
            salvaButton.disabled = true;
        }

        return campiValidi; // Ritorna il risultato della validazione
    };

    // verifica dei campi al blur
    [nomeInput, cognomeInput, indirizzoInput, capInput, cittaInput, paeseInput, emailInput, cellulareInput]
        .forEach(input => input.addEventListener('blur', () => validaCampo(input)));

    // aggiungo eventi per carta e cvv
    cartaInput.addEventListener('input', verificaCampi);
    cvvInput.addEventListener('input', verificaCampi);

    // verifica iniziale dei campi
    verificaCampi();

    // mostro modal e controllo
    salvaButton.addEventListener('click', () => {
        console.log('Salva e Continua cliccato');
        modal.style.display = 'flex'; // mostra  modal
    });

    // funzione gestione errori
    const gestisciErrori = () => {
        const messaggiErrore = [];

        // controllo carta e CVV
        const cartaValida = /^\d{13,16}$/.test(cartaInput.value.trim());
        const cvvValido = /^\d{3}$/.test(cvvInput.value.trim());

        if (!cartaValida) {
            messaggiErrore.push('Errore: la carta non è valida');
        }
        if (!cvvValido) {
            messaggiErrore.push('Errore: il CVV non è valido');
        }

        // controllo campi
        const campiValidi = verificaCampi();
        if (!campiValidi) {
            messaggiErrore.push('Errore: ci sono campi non validi');
        }

        if (messaggiErrore.length > 0) {
            errorMessage.textContent = messaggiErrore.join(', ');
            errorMessage.style.display = 'block'; // mostra  errore
            acquistaButton.classList.add('disabilitato');
            acquistaButton.disabled = true; // Disabilita bottone se errori
        } else {
            errorMessage.style.display = 'none'; // Nascondi  errore
            modal.style.display = 'none'; // Nascondi  modal
            window.location.href = "Ringraziamento.html"; // go to pagina  ringraziamento
        }
    };

    // aggiungo un controllo quando si clicca sul bottone acquista
    acquistaButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        console.log('Acquista cliccato');
        gestisciErrori(); // funzione per gestire gli errori
    });

    // chiusura modal click ext
    window.addEventListener('click', (event) => {
        console.log('Click detected');
        if (event.target === modal) {
            modal.style.display = 'none';
            verificaCampi(); 
        }
    });

    const checkboxes = document.querySelectorAll('.checkbox'); // CONST CHECKBOX

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== checkbox) cb.checked = false;
                });

                if (checkbox.id === 'cartaCredito') {
                    borderBoxDiv.style.display = 'flex';
                    emailPaypalGoogleDiv.style.display = 'none';
                } else {
                    borderBoxDiv.style.display = 'none';
                    emailPaypalGoogleDiv.style.display = 'block';
                    emailPaypalGoogleInput.value = ''; // Resetto campo email
                }

                verificaEmailPaypalGoogle(); // Verifico subito l'email
            }
        });
    });

    emailPaypalGoogleInput.addEventListener('input', verificaEmailPaypalGoogle);

    function verificaEmailPaypalGoogle() {
        if (paypalCheckbox.checked || googleCheckbox.checked) {
            const emailValida = /^[^\s@]+@[^\s@]+$/.test(emailPaypalGoogleInput.value);

            acquistaButton.disabled = !emailValida; // Abilito
        } else {
            acquistaButton.disabled = false; 
            messaggiErrore.push('Errore: ci sono campi non validi');
        }
    }
});
