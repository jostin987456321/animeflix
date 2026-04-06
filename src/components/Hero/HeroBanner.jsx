import { useEffect, useState, useRef } from "react";
import "./Hero.scss";
import HeroRating from "./HeroRating";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const HeroBanner = ({ movies }) => {
    /* ----------------------------------
       ESTADOS PRINCIPALES
    ---------------------------------- */

    // índice actual del slider
    const [currentIndex, setCurrentIndex] = useState(0);

    // estado para pausar el autoplay
    const [isPaused, setIsPaused] = useState(false);

    // referencia para controlar el intervalo
    const intervalRef = useRef(null);

    // posición inicial para detectar swipe
    const startX = useRef(0);

    /* ----------------------------------
       FUNCIÓN PARA AVANZAR SLIDER
    ---------------------------------- */
    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === movies.length - 1 ? 0 : prev + 1
        );
    };

    /* ----------------------------------
       FUNCIÓN PARA RETROCEDER SLIDER
    ---------------------------------- */
    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? movies.length - 1 : prev - 1
        );
    };

    /* ----------------------------------
       AUTOPLAY CADA 5 SEGUNDOS
    ---------------------------------- */
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPaused, currentIndex]);

    /* ----------------------------------
       DETECCIÓN DE SWIPE (MOUSE + TOUCH)
    ---------------------------------- */

    const handleStart = (e) => {
        setIsPaused(true); // pausa autoplay
        startX.current = e.touches
            ? e.touches[0].clientX
            : e.clientX;
    };

    const handleEnd = (e) => {
        const endX = e.changedTouches
            ? e.changedTouches[0].clientX
            : e.clientX;

        const diff = startX.current - endX;

        // si se movió más de 50px detectamos swipe
        if (diff > 50) nextSlide();
        if (diff < -50) prevSlide();

        setIsPaused(false); // reanuda autoplay
    };

    /* ----------------------------------
       PELÍCULA ACTUAL
    ---------------------------------- */
    const currentMovie = movies[currentIndex];

    if (!currentMovie) return null;

    return (
        <section
            className="hero"
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
        >
            {/* Fondo dinámico */}
            <div
                className="hero__background"
                style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${currentMovie.backdrop_path})`,
                }}
            />

            <div className="hero__overlay" />

            <div className="hero__content">
                <h1 className="hero__title">
                    {currentMovie.title || currentMovie.name}
                </h1>

                <HeroRating rating={currentMovie.vote_average} />

                <p className="hero__overview">
                    {currentMovie.overview}
                </p>
            </div>
        </section>
    );
};

export default HeroBanner;