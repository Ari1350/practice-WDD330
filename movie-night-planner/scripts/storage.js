export function saveLastSearch(query) {
    localStorage.setItem('lastMovieSearch', JSON.stringify({
        term: query,
        date: new Date().toLocaleString()
    }));
}

export function getLastSearch() {
    return JSON.parse(localStorage.getItem('lastMovieSearch'));
}
