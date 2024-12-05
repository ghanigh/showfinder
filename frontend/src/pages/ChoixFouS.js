import React from 'react';
import '../styles/ChoixFouS.css'
const ChoixFouS = ({ onSelectType }) => {
    const handleTypeSelect = (type) => {
        onSelectType(type);
    };

    return (
        <div>
            <h1>Choisissez le type de contenu :</h1>
            <div>
                <button onClick={() => handleTypeSelect('Films')}>Films</button>
                <button onClick={() => handleTypeSelect('Séries')}>Séries</button>
            </div>
        </div>
    );
};

export default ChoixFouS;
