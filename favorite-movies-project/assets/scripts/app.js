const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.getElementById('addMovieButton');
startAddMovieButton.onclick = function (e) {
    addMovieModal.classList.toggle('visible');
};