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
  /*
  1) all'inzio di showtotalinfo definisco le variabili totalSEats e totalprice e le setto = 0
  2) definisco un if che verifica se seatsModel[filmId] esiste 
        se sesite riempio lo "show total" e se e' vuoto non faccio niente (0 posti 0 euro)
  */

  } 

  function showTotalInfo(filmId) { 
    let totalSeats = 0;
    let totalPrice = 0;
  
    if (seatsModel[filmId]) {
        totalSeats = seatsModel[filmId].seats.length;
        totalPrice = totalSeats * findFilmPriceById(filmId);
    }
    document.getElementById("count").innerText = totalSeats;
    document.getElementById("total").innerText = totalPrice;

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
  showTotalInfo(selectedFilmId);
  markSeats(selectedFilmId);
  
  movieSelect.onchange = function() { // utilizzare le funzioni richiamate piu' volte in diversi posti dello script
      
      selectedFilmId = +movieSelect.value;
      saveFilmIdToLocalStorage();
      showTotalInfo(selectedFilmId);
      markSeats(selectedFilmId);
  }

  // Seat click event
  
  document.querySelector(".container").addEventListener('click', e => {
  
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied') // qui sto verificando se sto cliccando su un elemento che ha classe seat e non ha clsasse occupato
    ) {
        const numberOfSeat = findSeatIndex(e.target);  // in questo if: if(seastModel[numero]) la condizione è vera se nell'oggetto è presente un elemento di numero scitto in parentesi quadre!!!!
       
        if (seatsModel[selectedFilmId]) // verifica che esita l'id del film nel seatsmodel se c'è aggiungi il posto, se non c'è aggiungi l'id film
        // cambiare il modello e salvare nel local st
        {
            console.log(numberOfSeat);
            seatsModel[selectedFilmId].seats.push(numberOfSeat);
        } else {
            seatsModel[selectedFilmId] = {seats: [numberOfSeat]};
        }
        showTotalInfo(selectedFilmId);
        markSeats(selectedFilmId);
        saveSeatsModelToLocalStorage();
      
    }
  });
 // funzione che mi dice qual e' l 'indice dell'elemento dato

  function findSeatIndex(seat) {
    for (i = 0; i< availableSeats.length; i++) {
      
        if (seat === availableSeats[i]) {
            return i;
        }
     }

  }
  //seatsModel = {78899: [], 7575757: []} quando ho un oggetto così individuo con seatsModel[numero] l'elemento dell'oggetto seatsModel. Per assegnare un valore bisogna scrivere seatsModel[numero] = [valori array]. in questo if: if(seastModel[numero]) la condizione è vera se nell'oggetto è presente un elemento di numero scitto in parentesi quadre!!!!