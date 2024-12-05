import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo512.png';
import '../styles/AgeSelection.css';

const AgeSelection = ({ onAgeSelect, onBackButtonClick }) => {
    const navigate = useNavigate();

    const handleAgeSelect = (age) => {
        onAgeSelect(age);
        navigate('/');
    };

    const handleBackButtonClick = () => {
        onBackButtonClick();
        navigate('/');
    };

    return (
        <div className="CombienDeTemps">
            <img src={logo} alt="Logo" /> {/* Affichage du logo */}
            <h1>QUEL ÂGE AVEZ-VOUS ?</h1>
            <div>
{/*                 <button onClick={() => handleAgeSelect(7)}>7 ANS</button>
 */}                <button onClick={() => handleAgeSelect(12)}>-12 ANS</button>
                <button onClick={() => handleAgeSelect(16)}>16 ANS</button>
                <button onClick={() => handleAgeSelect(18)}>+18 ANS</button>
            </div>
            <button className="back-button" onClick={handleBackButtonClick}>RECOMMENCER</button>
        </div>
    );
};

export default AgeSelection;
