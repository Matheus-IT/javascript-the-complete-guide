import { validateImageUrl, validateRating, validateTitle } from './form_validation.js';

const movies = [
    {
        id: "2fa59dd6-bd10-411b-9ac0-ccd184a7a9c6",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZ5pdPcQ6LCKMk_JWiK0UfHViF5afN7VLWYfB8A1BkOXNrvC6",
        rating: "5",
        title: "Jurassic World Dominion",
    },

    {
        id: "fa177756-860f-4f1c-b58a-6adcc03d4701",
        imageUrl: "https://movies.universalpictures.com/media/fstx-montage1sheet2-rgb-1-64108e93e63dd-1.jpg",
        rating: "3",
        title: "Fast X",
    },

    {
        id: "a0e69cfe-ec0c-4cc4-8731-2b9ed66ed190",
        imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ17XGATi5V_xrlBKORLKAc6kVh-Kejj6CwnbknLkVxO3N_Gb3m",
        rating: "4",
        title: "The Last Kingdom: Seven Kings Must Die"
    }
];

// load initial movies
for (const m of movies) {
    renderNewMovieElement(
        m.id,
        m.title,
        m.imageUrl,
        m.rating,
    );
}
showEntryTextIfNeeded();

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
