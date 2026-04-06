import "./Row.scss";
import MovieCard from "../MovieCard/MovieCard";

const Row = ({ title, movies, onMovieClick = () => {} }) => {

    if (!movies || movies.length === 0) return null;

    return (
        <section className="row">
            <h2 className="row__title">{title}</h2>

            <div className="row__movies">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => onMovieClick(movie)}
                    />
                ))}
            </div>
        </section>

        
    );
};

export default Row;