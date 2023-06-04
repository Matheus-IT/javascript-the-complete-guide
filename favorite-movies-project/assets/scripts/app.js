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

    const newMovie = { id: crypto.randomUUID(), title, rating, imageUrl };
    movies.push(newMovie);

    dismissAddMovie();
    clearFields(addMovieForm);

    console.log('movies', movies);

    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.imageUrl,
        newMovie.rating,
    );

    showEntryTextIfNeeded();
});

function clearFields(form) {
    Array.from(form.elements).forEach(e => e.value = '');
}

function renderNewMovieElement(id, title, imageUrl, rating) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.id = id;
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" />
        </div>

        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', () => handleDeleteMovie(id));
    document.getElementById('movie-list').append(newMovieElement);
}

function handleDeleteMovie(id) {
    const index = movies.findIndex(m => m.id === id);
    if (index !== -1) {
        // remove from array
        movies.splice(index, 1);
        // remove from dom
        const movieElement = document.getElementById(id);
        movieElement.remove();

        showEntryTextIfNeeded();
    }
}

function showEntryTextIfNeeded() {
    const entryPresentation = document.getElementById('entry-text');
    if (movies.length) {
        entryPresentation.style.display = 'none';
    } else {
        entryPresentation.style.display = 'block';
    }
}
