import { validateImageUrl, validateRating, validateTitle } from './form_validation.js';


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

    const formDataEntries = new FormData(addMovieForm).entries();
    const { title, image_url, rating } = Object.fromEntries(formDataEntries);

    const validationErrors = [
        validateImageUrl(image_url),
        validateRating(rating),
        validateTitle(title),
    ];

    const anyErrors = validationErrors.some(e => e !== null);

    if (anyErrors) {
        for (const e of validationErrors) {
            if (!e) continue;
            const [controlId, errorMessage] = e;
            document.querySelector(`#${controlId}-error`).innerHTML = errorMessage;
        }
        return;
    }
});


