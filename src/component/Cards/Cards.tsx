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
                ? <img className="card-image" src={image} alt="card" onError={(e) => (e.currentTarget.src = '/images/default.png')} />
                : <img className="card-image" src={backImage} alt="card" onError={(e) => (e.currentTarget.src = '/images/default.png')} />}
        </div>
    );
};

export default Cards;
