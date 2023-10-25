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
    if (modelString) {
        let modelFromLocalStorage = JSON.parse(modelString);
        return modelFromLocalStorage;
    }
    return {};

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

function findFilmPriceById(filmId) {
    for (i = 0; i < filmModel.length; i++) {
        if (filmModel[i].id === filmId) {
        return filmModel[i].price;
        }
    }

} 
// inizio 
let selectedFilmId = getSelectedFilmIdFromLocalStorage();
const seatsModel = getSeatsModelFromLocalStorage();
populateFilmSelector();
