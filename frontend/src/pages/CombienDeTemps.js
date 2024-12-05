import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo512.png';
import '../styles/CombienDeTemps.css';

const CombienDeTemps = ({ onDurationSelect, onBackButtonClick }) => {
    const navigate = useNavigate();

    const handleDurationSelect = (duration) => {
        onDurationSelect(duration);
        navigate('/ageSelection'); // Redirection vers la page de sélection de l'âge
    };

    const handleBackButtonClick = () => {
        onBackButtonClick();
        navigate('/'); // Retourne à la page d'accueil
    };

    return (
        <div className="CombienDeTemps">
            <img src={logo} alt="Logo" /> {/* Affichage du logo */}
            <h1>COMBIEN DE TEMPS AVEZ-VOUS?</h1>
            <div>
                <button onClick={() => handleDurationSelect(1)}>30 MINUTES</button>
                <button onClick={() => handleDurationSelect(2)}>1 HEURE</button>
                <button onClick={() => handleDurationSelect(3)}>2 HEURES</button>
            </div>
            <button className="back-button" onClick={handleBackButtonClick}>RECOMMENCER</button>
        </div>
    );
};

export default CombienDeTemps;
