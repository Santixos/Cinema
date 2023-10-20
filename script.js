const container = document.querySelector('.container'); // qui prende il primo elemento che corrisponde
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // costituisce un array di elementi che corrispondono (lo spazio: se non lo metto significa che cerco gli elementi che hanno tutte queste classi, se invece c'è lo spazio subito dopo individuo degli elmenti che sono contenuti dentro un elemento che ha classe  .row) il not scritto prima della classe significa che non deve avere questa classe
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); // elemento html
// prevedere la possibilità di scelta film vietati ai minori di 18 anni
const model = [
	{seats: [1, 2, 3, 4], id: 455784, title: "Film bellissimo", price: 0 }, // proprieta' oggetti
	{seats: [5, 6, 7, 8], id: 455785, title: "Film per maniaci", price: 50  },
	{seats: [9, 10, 11, 12], id: 455786, title: "Film noioso", price: 1  },
	{seats: [13, 14, 15, 16], id: 455787, title: "Film orrido", price: 1089  },
  {seats: [17], id: 455788, title: "Film per adulti maniaci", price: 187  }
]

// creare funzione che salva nel local storage saveModelToLocalStorage
// creare funzione che riempie il modello presi dal local storage populateModelFromLocalStorage (se vuoto modello vuoto)
// riempire il selector dei film (mettere id come valore devono essere oggetti option) e come testo nome e prezzo del //film
// creare funzione populateSeats deve prendere i dati che corrispondono al film selezionato (proprieta' seats del modello) e marcare a videoi posti come selezionati
populateUI();

let ticketPrice = +movieSelect.value; // significato del +? movieSelect.value è una stringa

// Save selected movie index and price
function saveMovieDataInLocalStorage(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex); // setIrem memorizza il paramentro movieIndex nel localstorage sotto la chiave selectedMovieIndex
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


function saveSelectedSeatsInLocalStorage() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));// con i tre punti e parentesi quadre convertono la collezione in un array.[seat è il parametro della funzione definita e serve a scorrere gli elementi dell'array "[...selectedSeats]" ]

  console.log({selectedSeatsIndexes});
  localStorage.setItem('indexOfSelectedSeats', JSON.stringify(selectedSeatsIndexes));
}

  

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('indexOfSelectedSeats')); // con parse da stringa ottengo un array

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => { // il primo parametro è l'elemento div e poi abbiamo l'indice
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex; // .selectedIndex è una chiave predefinita del linguaggio js utilizzata per consideare l'indice dell'oggeto select
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  console.log({m:'movie Select Is Changed', e: e, equality: movieSelect === e.target});
  ticketPrice = +movieSelect.value;
  saveMovieDataInLocalStorage(movieSelect.selectedIndex, movieSelect.value);
  updateSelectedCount();
 
});

// Seat click event
container.addEventListener('click', e => {
  
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied') // qui sto verificando se sto cliccando su un elemento che ha classe seat e non ha clsasse occupato
  ) {
    e.target.classList.toggle('selected'); // verifica che c sia la classe selected: se c'è la toglie se non c'è l'aggiunge

    updateSelectedCount();
  
    saveSelectedSeatsInLocalStorage();
  }
});

// Initial count and total set
updateSelectedCount();