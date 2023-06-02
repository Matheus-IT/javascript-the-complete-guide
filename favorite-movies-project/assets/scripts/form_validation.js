export function validateTitle(title) {
    if (!title) return ['title', 'Title is required'];
    return null;
}

export function validateImageUrl(url) {
    if (!url) return ['image_url', 'Url is required'];
    return null;
}

export function validateRating(input) {
    if (input === undefined || input === null) return ['rating', 'Rating is required'];

    const minVal = 1;
    const maxVal = 5;
    if (input < minVal || input > maxVal) {
        return ['rating', `Rating must be between ${minVal} and ${maxVal}`];
    }
    return null;
}