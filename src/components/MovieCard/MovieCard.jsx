import "./MovieCard.scss";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onClick }) => {
    if (!movie.poster_path) return null;
    return (
        <div className="movie-card" onClick={onClick}>
            <img
                src={
                    movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : "https://via.placeholder.com/500x750"
                }
                alt={movie.title}
            />
        </div>
    );
};

export default MovieCard;
