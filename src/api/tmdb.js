const API_KEY = "a3901052ce9ff87a9b36b58b7c0071b9";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchFromAPI = async (endpoint) => {

    try {

        const res = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-MX`
        );

        const data = await res.json();

        // 🧠 Detecta si es lista o detalle
        if (data.results) {
            return data.results;
        }

        return data; // 👈 para detalles de película

    } catch (error) {

        console.error("TMDB API ERROR:", error);

        return [];

    }

};



export const getMovieTrailer = async (movieId) => {
    const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await res.json();

    const trailer = data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? trailer.key : null;
};

export const getTrending = () => fetchFromAPI("/trending/movie/week");

export const getPopular = () => fetchFromAPI("/movie/popular");

export const getTopMovies = () => fetchFromAPI("/movie/top_rated");