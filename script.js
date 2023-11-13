const filmModel = [
    {id: 455784, title: "Film bellissimo", price: 0 }, // array di  oggetti che hanno proprieta'
    {id: 455785, title: "Film per maniaci", price: 50  },
    {id: 455786, title: "Film noioso", price: 1  },
    {id: 455787, title: "Film orrido", price: 1089  },
    {id: 455788, title: "Film per adulti maniaci", price: 187  }
  ]
  const movieSelect = document.getElementById('movie');
  //salva il modello dei posti selezionati nel local st.
  const showtimeInput = document.getElementById("time");
  const dateInput = document.getElementById("datepicker");  
  
  
  function saveSeatsModelToLocalStorage() {
      localStorage.setItem('seatsModel',JSON.stringify(seatsModel));
    }
    
    // funzione che dal localst. acquisisce i posti selezionati e occupati
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
      localStorage.setItem('selectedFilmId', selectedFilmId); 
    }
    
  //prendo dal localst. l'id del film selezionato  
  function getSelectedFilmIdFromLocalStorage() { // devo prendere dal local storage l'id dell'ultimo film che e' stato selezionato, se non è stato selezionato nessun film allora di default il pprim film
      // l'uscita deve essere il numero dell'id qundi usare il +
      //per verificare che funziona bene devo aprire la console e scrivere selectefilmid e deve corripondere
  
      const selectedFilmIdString = localStorage.getItem('selectedFilmId');
      if (selectedFilmIdString) {
          return +selectedFilmIdString;
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

  // visualizzare l'ultima data selezionata o la data attuale (in mancanza di una precedente scelta memorizzata)
  function populateDateSelector() {
    const actualDayFormatted = (new Date()).toISOString().substring(0, 10);
    dateInput.setAttribute("min", actualDayFormatted);
    if(localStorage.getItem("dateChoice")) {
        dateInput.value = localStorage.getItem("dateChoice");
    } else {
        dateInput.value = actualDayFormatted;
    }/// contollo data minima
    
  }

  function populateTimeSelector() {
    if(localStorage.getItem("timeChoice")) {
        showtimeInput.value = localStorage.getItem("timeChoice");
    }
  }
  
  // funzione che tramite l'id trova il prezzo del film
  function findFilmPriceById(filmId) { 
      for (i = 0; i < filmModel.length; i++) {
          if (filmModel[i].id === filmId) {
          return filmModel[i].price;
          }
         
      }
      return "not available";
  /*
  1) all'inzio di showtotalinfo definisco le variabili totalSEats e totalprice e le setto = 0
  2) definisco un if che verifica se seatsModel[filmId] esiste 
        se sesite riempio lo "show total" e se e' vuoto non faccio niente (0 posti 0 euro)
        fondi funzioni 
        controllo sulla data
  */

  } 

  function showTotalInfo(filmId) { 
    let totalSeats = 0;
    let totalPrice = 0;
  
    if (seatsModel[filmId] && seatsModel[filmId][showDateTime]) {
        totalSeats = seatsModel[filmId][showDateTime].selectedSeats.length;
        totalPrice = totalSeats * findFilmPriceById(filmId);
    }
    document.getElementById("count").innerText = totalSeats;
    document.getElementById("total").innerText = totalPrice;

  }
  
  function selectFilm(filmId) {
      movieSelect.value = filmId;
  }
  
  function resetSeats() {
      for (i = 0; i < hallSeats.length; i ++) {
          hallSeats[i].classList.remove("occupied");
          hallSeats[i].classList.remove("selected");
      }
  }   
  
  function markSeats(filmId) { // funzione che mette i posti selezionati e occupati a seconda delle scelte memrizzate nel localstorage
      resetSeats();
      if (seatsModel[filmId] && seatsModel[filmId][showDateTime]) { // seasModel non e' vuoto allora procedi
          const selectedSeats = seatsModel[filmId][showDateTime].selectedSeats; // è possibile che seatsModel sia vuoto!! (bisogna supportare questo caso)
          for (i= 0; i < selectedSeats.length; i++ ) {
              hallSeats[selectedSeats[i]].classList.add("selected"); // rivedi seleziona gli oggetti in base alle classi
          }
          const occupiedSeats = seatsModel[filmId][showDateTime].occupiedSeats;
          if(occupiedSeats) {
           
            for (i= 0; i < occupiedSeats.length; i++ ) {
                hallSeats[occupiedSeats[i]].classList.add("occupied"); 
            }
          }
      } 
  }
  
  // inizio 
  let showDateTime =  dateInput.value + showtimeInput.value;
  let selectedFilmId = getSelectedFilmIdFromLocalStorage();
  const seatsModel = getSeatsModelFromLocalStorage();
  populateTimeSelector()
  populateFilmSelector();
  const hallSeats =  document.querySelectorAll(".container .seat"); // prendiamo tutti gli elementi di classe seat che sono contenuti in oggetti di classe container
  selectFilm(selectedFilmId);
  
  populateDateSelector();
  markSeats(selectedFilmId); // unificare queste funzioni
  showTotalInfo(selectedFilmId);
  updateShowDateTime();
  
  movieSelect.onchange = function() { // utilizzare le funzioni richiamate piu' volte in diversi posti dello script
      
      selectedFilmId = +movieSelect.value;
      saveFilmIdToLocalStorage();
      showTotalInfo(selectedFilmId);
      markSeats(selectedFilmId);
  }

  // Seat click event
  
  document.querySelector(".container").addEventListener('click', e => {
    console.log(e);
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied') // qui sto verificando se sto cliccando su un elemento che ha classe seat e non ha clsasse occupato
    ) {
        const numberOfSeat = findSeatIndex(e.target);  // in questo if: if(seastModel[numero]) la condizione è vera se nell'oggetto è presente un elemento di numero scitto in parentesi quadre!!!!
         
         
        if (seatsModel[selectedFilmId]) // verifica che esita l'id del film nel seatsmodel se c'è aggiungi il posto, se non c'è aggiungi l'id film
        // cambiare il modello e salvare nel local st
        {
            if(seatsModel[selectedFilmId][showDateTime]) {
                if(!seatsModel[selectedFilmId][showDateTime].selectedSeats.includes(numberOfSeat)) {
                    seatsModel[selectedFilmId][showDateTime].selectedSeats.push(numberOfSeat);
                } else {
                    
                    const indexToRemove = seatsModel[selectedFilmId][showDateTime].selectedSeats.indexOf(numberOfSeat); // Trova l'indice dell'elemento 27

                        if (indexToRemove !== -1) {
                        // Verifica se l'elemento è stato trovato nell'array
                        seatsModel[selectedFilmId][showDateTime].selectedSeats.splice(indexToRemove, 1); // Rimuovi 1 elemento a partire dall'indice indexToRemove
                    }   

                }
            } else {
                seatsModel[selectedFilmId][showDateTime] = {selectedSeats: [numberOfSeat]}; // qui nasce laproprietà selectedseats

            }
        
        } else {
            seatsModel[selectedFilmId] = {};
            seatsModel[selectedFilmId][showDateTime] = {selectedSeats: [numberOfSeat]};
        }
        showTotalInfo(selectedFilmId);
        markSeats(selectedFilmId);
        saveSeatsModelToLocalStorage();
        
    }
  });
 // funzione che mi dice qual e' l 'indice dell'elemento dato

  function findSeatIndex(seat) {
    for (i = 0; i< hallSeats.length; i++) {
      
        if (seat === hallSeats[i]) {
            return i;
        }
     }

  } 

  showtimeInput.onchange = updateShowDateTime;
  dateInput.onchange = updateShowDateTime;
  function updateShowDateTime() {
    localStorage.setItem("dateChoice", dateInput.value );
    localStorage.setItem("timeChoice", showtimeInput.value );

    showDateTime =  dateInput.value + showtimeInput.value;
    markSeats(selectedFilmId);
    showTotalInfo(selectedFilmId);
  }
  /*
   quando ho un oggetto così individuo con seatsModel[numero] l'elemento dell'oggetto seatsModel. Per assegnare un valore bisogna scrivere seatsModel[numero] = [valori array]. in questo if: if(seastModel[numero]) la condizione è vera se nell'oggetto è presente un elemento di numero scitto in parentesi quadre!!!!*/

   // devo cercare i posti "selezionati" nel modello e aggiungere la proprietà occupied e poi svuotare la proprieta' selected 
const buyTicketsButton = document.getElementById("buyTickets");  
buyTicketsButton.addEventListener("click", function() {
   
    const selectedSeats = seatsModel[selectedFilmId][showDateTime].selectedSeats;
    if(selectedSeats) {
        let occupiedSeats = seatsModel[selectedFilmId][showDateTime].occupiedSeats;
        
        if(occupiedSeats) { // se esistono già posti occupati allora rendi i posti occupati uguali alla concatenzione fra i posti occupati e quelli selezionati
            seatsModel[selectedFilmId][showDateTime].occupiedSeats = selectedSeats.concat(occupiedSeats);
        
        } else {
            seatsModel[selectedFilmId][showDateTime].occupiedSeats = selectedSeats;

        }
        seatsModel[selectedFilmId][showDateTime].selectedSeats =[];
        saveSeatsModelToLocalStorage();
        
    }
    
    markSeats(selectedFilmId);
    showTotalInfo(selectedFilmId);
  });
 
  
  