const HeroRating = ({ rating = 0 }) => {

    // TMDB viene sobre 10 → lo convertimos a 5 estrellas
    const stars = rating / 2;

    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="hero__rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="star star--full">★</span>
            ))}

            {hasHalfStar && <span className="star star--half">★</span>}

            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="star star--empty">★</span>
            ))}

            <span className="hero__rating-value">
                {rating.toFixed(1)} / 10
            </span>
        </div>
    );
};

export default HeroRating;