import { useEffect, useState } from "react";
import HeroBanner from "../components/Hero/HeroBanner";
import Row from "../components/row/Row";
import MovieModal from "../components/MovieModal";
import Top from "../components/top/Top";

import { getTrending, getPopular, getMovieTrailer, getTopMovies } from "../api/tmdb";

export default function Home() {


  // Película seleccionada para el popup
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const trendingData = await getTrending();
      const popularData = await getPopular();

      console.log("TRENDING:", trendingData);
      console.log("POPULAR:", popularData);

      setTrending(trendingData || []);
      setPopular(popularData || []);
    };

    loadData();
  }, []);

  const onMovieClick = async (movie) => {
    try {
      const trailerKey = await getMovieTrailer(movie.id);

      setSelectedMovie({
        ...movie,
        trailerKey: trailerKey || null,
      });

    } catch (error) {
      console.error("Error al obtener trailer", error);
    }
  };

  return (
    <>
      {trending?.length > 0 && (
        <HeroBanner movies={trending.slice(0, 5)} />
      )}

      <Top title="Top en Perú" fetchData={getTopMovies} onMovieClick={onMovieClick} />

      <Row title="Trending Now" movies={trending} onMovieClick={onMovieClick} />

      <Row title="Popular" movies={popular} onMovieClick={onMovieClick} />

      

      {/* 🔥 MODAL SE RENDERIZA AQUÍ */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
