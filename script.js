const filmModel = [
  {id: 455784, title: "Film bellissimo", price: 0 }, // proprieta' oggetti
  {id: 455785, title: "Film per maniaci", price: 50  },
  {id: 455786, title: "Film noioso", price: 1  },
  {id: 455787, title: "Film orrido", price: 1089  },
  {id: 455788, title: "Film per adulti maniaci", price: 187  }
]
const movieSelect = document.getElementById('movie');
//salva il modello dei posti selezionati nel local st.
function saveSeatsModelToLocalStorage() {
    const seatsModel = {
      455784: {seats: [1, 2, 3, 4]}, 
      455785: {seats: [5, 6, 7, 8]}, 
      455786: {seats: [9, 10, 11, 12]},
      455787: {seats: [13, 14, 15, 16]},
      455788: {seats: [17]}
    }
    localStorage.setItem('seatsModel',JSON.stringify(seatsModel));
  }
  
  // funzione che dal localst. acquisisce i posti selezionati
function getSeatsModelFromLocalStorage() {
    const modelString = localStorage.getItem('seatsModel');
    if (modelString) { // e' true quando non è vuoto
        let modelFromLocalStorage = JSON.parse(modelString);
        return modelFromLocalStorage;
    }
    return {}; // oggetto vuoto

}
// salvo nel localSt. l'id dell'ultimo film seleionato
function saveFilmIdToLocalStorage() {
    localStorage.setItem('selectedFilmId',selectedFilmId); 
  }
  
//prendo dal localst. l'id del film selezionato  
function getSelectedFilmIdFromLocalStorage() { // devo prendere dal local storage l'id dell'ultimo film che e' stato selezionato, se non è stato selezionato nessun film allora di default il pprim film
    // l'uscita deve essere il numero dell'id qundi usare il +
    //per verificare che funziona bene devo aprire la console e scrivere selectefilmid e deve corripondere

    const modelString = localStorage.getItem('selectedFilmId');
    if (modelString) {
        return +modelString;
    }
    return filmModel[0].id;

}

// riempire il selector dei film (mettere id come valore devono essere oggetti option) e come testo nome e prezzo del //film
function populateFilmSelector() {
    filmModel.forEach(film => {
        const choice = document.createElement("option");
        choice.innerText = film.title + " " + film.price + " €";
        movieSelect.append(choice);
        choice.value = film.id; 
        
    });
}
// funzione che tramite l'id trova il prezzo del film
function findFilmPriceById(filmId) { 
    for (i = 0; i < filmModel.length; i++) {
        if (filmModel[i].id === filmId) {
        return filmModel[i].price;
        }
    }

} 
function showTotalInfo(filmId) {
    const selectedSeats = seatsModel[filmId].seats;
    document.getElementById("count").innerText = selectedSeats.length;
    const totalCost = findFilmPriceById(filmId) * selectedSeats.length;
    document.getElementById("total").innerText = totalCost;
}

function selectFilm(filmId) {
    movieSelect.value = filmId;
    markSeats(filmId);

    
}

function resetSeats() {
    for (i = 0; i < availableSeats.length; i ++) {
        availableSeats[i].classList.remove("selected");
    }
}   

function markSeats(filmId) { // funzione che mette i posti selezionati
    resetSeats();
    if (seatsModel[filmId]) { // seasModel non e' vuoto allora procedi
        const selectedSeats = seatsModel[filmId].seats; // è possibile che seatsModel sia vuoto!! (bisogna supportare questo caso)
        for (i= 0; i < selectedSeats.length; i++ ) {
            availableSeats[selectedSeats[i]].classList.add("selected"); // rivedi seleziona gli oggetti in base alle classi
        }
    } 
}
// inizio 
let selectedFilmId = getSelectedFilmIdFromLocalStorage();
const seatsModel = getSeatsModelFromLocalStorage();
populateFilmSelector();
const availableSeats =  document.querySelectorAll(".container .seat"); // prendiamo tutti gli elementi di classe seat che sono contenuti in oggetti di classe container
selectFilm(selectedFilmId);

movieSelect.onchange = function() {
    
    selectedFilmId = +movieSelect.value;
    saveFilmIdToLocalStorage();
    markSeats();
}