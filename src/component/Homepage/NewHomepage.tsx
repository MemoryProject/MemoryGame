// src/component/Homepage/NewHomepage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewHomepage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigez vers la page du jeu avec un thème par défaut
        navigate('/game/defaultTheme');
    }, [navigate]);

    return null; // Ne rien rendre car nous redirigeons immédiatement
};

export default NewHomepage;
