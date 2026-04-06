import { useEffect } from "react";
import "./MovieModal.scss";

/*
  MovieModal Component
  ---------------------
  Recibe:
  - movie: objeto de la película seleccionada
  - onClose: función para cerrar el modal

  No modifica ninguna lógica existente.
  Solo se renderiza cuando movie !== null
*/

export default function MovieModal({ movie, onClose }) {
    // Evita que el body haga scroll cuando el modal está abierto
    useEffect(() => {
        if (movie) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [movie]);

    if (!movie) return null;

    // Convertimos rating (0-10) a escala de 5 estrellas
    const rating = Math.round(movie.vote_average / 2);

    return (
        <div className="modal_overlay" onClick={onClose}>
            {/* 
        Detenemos propagación para que al hacer click dentro
        no se cierre el modal
      */}
            <div className="modal_container" onClick={(e) => e.stopPropagation()}>

                {/* Botón cerrar */}
                <button className="modal_close" onClick={onClose}>
                    ✕
                </button>

                {/* Video trailer */}
                <div className="modal_video">
                    {movie.trailerKey ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>No trailer disponible</p>
                    )}
                </div>

                {/* Contenido */}
                <div className="modal_content">
                    <h2>{movie.title}</h2>

                    {/* Estrellas */}
                    <div className="modal_stars">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>
                                {i < rating ? "⭐" : "☆"}
                            </span>
                        ))}
                        <span className="modal_score">
                            {movie.vote_average.toFixed(1)} / 10
                        </span>
                    </div>

                    <p>{movie.overview}</p>

                    <button className="modal_watch">
                        ▶ Ver ahora
                    </button>
                </div>
            </div>
        </div>
    );
}