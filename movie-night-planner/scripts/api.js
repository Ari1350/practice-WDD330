const API_KEY = 'b9a27ad'; 

export async function searchMovies(query) {
    const url = `https://omdbapi.com{apiKey}&i=${movieID}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search || [];
}

export async function getMovieDetails(id) {
    const url = `https://omdbapi.com{apiKey}&i=${movieID}`;
    const response = await fetch(url);
    return await response.json();
}

export async function getMockComments() {
    const response = await fetch('https://typicode.com');
    return await response.json();
}
