import { validateImageUrl, validateRating, validateTitle } from './form_validation.js';

const movies = [];
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
    const { title, image_url: imageUrl, rating } = Object.fromEntries(formDataEntries);

    const validationErrors = [
        validateImageUrl(imageUrl),
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

    movies.push({ title, rating, imageUrl });

    dismissAddMovie();
    clearFields(addMovieForm);

    console.log('movies', movies);

    renderNewMovieElement(title, imageUrl, rating);

    showEntryTextIfNeeded();
});

function clearFields(form) {
    Array.from(form.elements).forEach(e => e.value = '');
}

function renderNewMovieElement(title, imageUrl, rating) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" />
        </div>

        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    document.getElementById('movie-list').append(newMovieElement);
}

function showEntryTextIfNeeded() {
    const entryPresentation = document.getElementById('entry-text');
    if (movies.length) {
        entryPresentation.style.display = 'none';
    } else {
        entryPresentation.style.display = 'none';
    }
}
