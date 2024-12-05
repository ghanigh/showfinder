import React, { useState } from 'react';
import NetflixLogo from '../assets/img/logo_netflix.webp';
import DisneyPlusLogo from '../assets/img/logo_disney_2.png';
import PrimeVideoLogo from '../assets/img/logo_amazon.webp';
import Footer from '../components/Footer';
import logo from '../assets/img/logo512.png';
import '../styles/HomePage.css';
import '../styles/Navbar.css';

const HomePage = ({ onSelectPlatform }) => {
    const [showFooter, setShowFooter] = useState(false); // État pour contrôler la visibilité du footer
    const [showButton, setShowButton] = useState(true); // État pour contrôler la visibilité du bouton

    const platforms = [
        { name: 'Netflix', logo: NetflixLogo, size: 70 },
        { name: 'Disney+', logo: DisneyPlusLogo, size: 70 },
        { name: 'Prime Video', logo: PrimeVideoLogo, size: 70 },
    ];

    const handlePlatformSelect = (platform) => {
        onSelectPlatform(platform);
    };

    // Fonction pour afficher le footer et cacher le bouton
    const handleShowFooter = () => {
        setShowFooter(true);
        setShowButton(false);
    };

    return (
        <div className="HomePage">
            <header className="hero-section">
                <img src={logo} alt="Logo" className="logo" />
             
                <h1>Découvrez des films selon votre humeur et vos préférences de plateforme.</h1>
                <h2>Choisissez votre plateforme préférée</h2>
            </header>

            <div className="platforms">
                {platforms.map(platform => (
                    <button key={platform.name} onClick={() => handlePlatformSelect(platform.name)}>
                        <img src={platform.logo} alt={platform.name} style={{ width: platform.size, height: platform.size }} />
                    </button>
                ))}
            </div>
            
            {showFooter && <Footer isVisible={true} />} {/* Affiche le footer si showFooter est true */}
            {showButton && (
                <button onClick={handleShowFooter} className="show-footer-button">
                    Afficher le footer
                </button>
            )}
        </div>
    );
};

export default HomePage;
