// 1. Créer un tableau d'objets pour les cartes du jeu
// 2. Créer un composant Cards
import React from 'react';
import '../pages/App.css';

interface CardProps {
    id: number;
    name: string;
    image: string;
    backImage: string;
    onFlip: (id: number) => void;
    flippedCards: number[];
    matchedCards: number[];
}

const Cards: React.FC<CardProps> = ({ id, image, onFlip, flippedCards, backImage, matchedCards }) => {
    const isFlipped = flippedCards.includes(id) || matchedCards.includes(id);
    const isSelected = matchedCards.includes(id);

    const handleFlip = () => {
        if (flippedCards.length < 2 && !isSelected) {
            onFlip(id);
        }
    };

    return (
        <div onClick={handleFlip}>
            {isFlipped
                ? <img className="card-image" src={image} alt="card"/>
                : <img className="card-image" src={backImage} alt="card"/>}
        </div>
    );
};
export default Cards;
