// 1. Créer un tableau d'objets pour les cartes du jeu
// 2. Créer un composant Cards
import React, { useEffect, useState } from 'react';
import '../../pages/App.css';

interface CardProps {
    id: number;
    name: string;
    image: string;
    backImage: string;
    onFlip: (id: number) => void;
    flippedCards: number[];
    matchedCards: number[];
}

const Cards: React.FC<CardProps> = ({ id, name, image, onFlip, flippedCards, backImage, matchedCards }) => {
    const [isMismatched, setIsMismatched] = useState(false);
    const isFlipped = flippedCards.includes(id) || matchedCards.includes(id);
    const isSelected = matchedCards.includes(id);
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCardId, secondCardId] = flippedCards;
            if (firstCardId !== secondCardId && (id === firstCardId || id === secondCardId)) {
                setIsMismatched(true);
            } else {
                setIsMismatched(false);
            }
        } else {
            setIsMismatched(false);
        }
    }, [flippedCards, id]);
    const handleFlip = () => {
        if (flippedCards.length < 2 && !isSelected) {
            onFlip(id);
        }
    };
    const backgroundColor = isSelected ? '#CAFFCC' : isMismatched ? '#FFCACA' : '#2e3d49';
    return (
        <div onClick={handleFlip} style={{ backgroundColor }}>
            {isFlipped
                ? <img className="card-image" src={image} alt="card"/>
                : <img className="card-image" src={backImage} alt="card"/>}
        </div>
    );
};
export default Cards;
