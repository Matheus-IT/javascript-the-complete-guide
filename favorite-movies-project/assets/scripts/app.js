const addMovieModal = document.getElementById('add-modal');

document.getElementById('startAddMovieButton').onclick = handleStartAddMovieClicked;

const backdrop = document.getElementById('backdrop');
backdrop.onclick = dismissAddMovie;

function handleStartAddMovieClicked(e) {
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
}

function dismissAddMovie() {
    addMovieModal.classList.remove('visible');
    backdrop.classList.remove('visible');
}

const addMovieForm = addMovieModal.querySelector('#addMovieForm');

addMovieForm.cancelAddMovie.onclick = dismissAddMovie;

addMovieForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // study best practices to validate form fields
    console.log(addMovieForm.elements);
});