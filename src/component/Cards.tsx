// 1. Créer un tableau d'objets pour les cartes du jeu
// 2. Créer un composant Cards
import React, { useState } from 'react';
import '../pages/App.css';
interface CardProps {
    id: number;
    name: string;
    image: string;
    backimage: string;
    onFlip: (id: number) => void;
    flipBack: () => void;
}

const Cards: React.FC<CardProps> = ({ id, image, onFlip }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        setIsSelected(true);
        onFlip(id);
    };

    const flipBack = () => {
        setIsFlipped(false);
    };

    return (
        <div onClick={isSelected ? undefined : handleFlip}>
            {isFlipped ? <img src={image} alt="card" /> : 'back'}
        </div>
    );
};

export default Cards;
