const addMovieModal = document.getElementById('add-modal');

const startAddMovieButton = document.getElementById('addMovieButton');
startAddMovieButton.onclick = handleAddMovieClicked;

const cancelAddMovie = document.getElementById('cancelAddMovie');
cancelAddMovie.onclick = handleAddMovieClicked;

const backdrop = document.getElementById('backdrop');
backdrop.onclick = handleAddMovieClicked;

function handleAddMovieClicked(e) {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
}

function toggleBackdrop() {
    backdrop.classList.toggle('visible');
}