import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Header.scss";


const Header = () => {
    const [abrir, noAbrir] = useState(false);
    const [search, setArch] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    const abrirMenu = () => {
        noAbrir(!abrir);
    }

    const handleSearch = (i) => {
        setArch(i.target.value);
    }

    // SCROLL
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
                console.log(window.scrollY);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
            <div className="header__container">
                {/* logo */}
                <div className="header__logo">
                    AnimeFlix
                </div>
                {/* menu amburguesa */}
                <button
                    className={`header__toggle ${abrir ? "active" : ""}`}
                    onClick={abrirMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* menu */}
                <nav className={`header__nav ${abrir ? "open" : ""}`}>
                    <ul className="header__menu">
                        <li>
                            <NavLink to="/" end>
                                Inicio
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/popular" className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }>
                                Populares
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/favorites">
                                Favoritos
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/my-list">
                                Mi Lista
                            </NavLink>
                        </li>
                    </ul>

                    <div className="header__search">
                        <input
                            type="text"
                            placeholder="Buscar anime..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;