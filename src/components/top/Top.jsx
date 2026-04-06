import { useEffect, useState } from "react";
import "./top.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";


const Top = ({ title, fetchData, onMovieClick }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadTop = async () => {
            const data = await fetchData();
            setMovies(data.slice(0, 10)); // 🔥 solo top 10
        };

        loadTop();
    }, [fetchData]);

    return (
        <div className="top-section">
            <h2>{title}</h2>

            <div className="top-container">
                {movies.map((movie, index) => (
                    <button
                        key={movie.id}
                        className="top-card"
                        onClick={() => onMovieClick(movie)}
                        aria-label={`Ver detalles de ${movie.title}`}
                    >
                        <div className="top-card__rank-wrapper">
                            <span className="top-rank">{index + 1}</span>
                        </div>

                        <div className="top-card__image-wrapper">
                            <img
                                src={`${IMAGE_BASE}${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};


export default Top;