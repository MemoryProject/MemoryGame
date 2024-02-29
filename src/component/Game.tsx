import React, { useState, useEffect, useMemo } from 'react';
import Card from './Cards';
import '../pages/App.css';

const Game: React.FC = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [seconds, setSeconds] = useState<number>(0);

    // Mélangez les cartes et affichez-les
    const cards = useMemo(() => ([
        { id: 1, name: 'card1', image: './MemoryGame/images/book.png', backimage: '../MemoryGame/images/back.png' },
        { id: 2, name: 'card2', image: './MemoryGame/images/bow_02.png', backimage: '../MemoryGame/images/back.png' },
        { id: 3, name: 'card3', image: './MemoryGame/images/green_mushroom.png', backimage: '../MemoryGame/images/back.png' },
        { id: 4, name: 'card4', image: './MemoryGame/images/ring_02.png', backimage: '../MemoryGame/images/back.png' },
        { id: 5, name: 'card5', image: './MemoryGame/images/sword_01.png', backimage: '../MemoryGame/images/back.png' },
        { id: 6, name: 'card6', image: './MemoryGame/images/wand_01.png', backimage: '../MemoryGame/images/back.png' },
        { id: 7, name: 'card7', image: './MemoryGame/images/wooden_box.png', backimage: '../MemoryGame/images/back.png' },
        { id: 8, name: 'card8', image: './MemoryGame/images/wooden_shield.png', backimage: '../MemoryGame/images/back.png' },
        { id: 9, name: 'card9', image: './MemoryGame/images/book.png', backimage: '../MemoryGame/images/back.png' },
        { id: 10, name: 'card10', image: './MemoryGame/images/bow_02.png', backimage: '../MemoryGame/images/back.png' },
        { id: 11, name: 'card11', image: './MemoryGame/images/green_mushroom.png', backimage: '../MemoryGame/images/back.png' },
        { id: 12, name: 'card12', image: './MemoryGame/images/ring_02.png', backimage: '../MemoryGame/images/back.png' },
        { id: 13, name: 'card13', image: './MemoryGame/images/sword_01.png', backimage: '../MemoryGame/images/back.png' },
        { id: 14, name: 'card14', image: './MemoryGame/images/wand_01.png', backimage: '../MemoryGame/images/back.png' },
        { id: 15, name: 'card15', image: './MemoryGame/images/wooden_box.png', backimage: '../MemoryGame/images/back.png' },
        { id: 16, name: 'card16', image: './MemoryGame/images/wooden_shield.png', backimage: '../MemoryGame/images/back.png' }

    ].sort(() => Math.random() - 0.5)), []);

    const rows = useMemo(() => {
        const rowSize = 8; // Nombre de cartes par ligne
        return Array.from({ length: Math.ceil(cards.length / rowSize) }, (_, i) => cards.slice(i * rowSize, i * rowSize + rowSize));
    }, [cards]);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const endGame = () => {
        setIsGameOver(true);
    };

    const restartGame = () => {
        setIsGameStarted(false);
        setIsGameOver(false);
        setFlippedCards([]);
        setMatchedCards([]);
        setSeconds(0);
    };

    const flipBack = () => {
        // Votre logique pour retourner la carte ici...
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleFlip = (id: number) => {
        setFlippedCards((prev) => [...prev, id]);

        if (flippedCards.length === 1) {
            // Si les deux cartes correspondent
            if (flippedCards[0] === id) {
                setMatchedCards((prev) => [...prev, id]);
            }
            // Réinitialisez l'état après un court délai
            setTimeout(() => {
                setFlippedCards([]);
            }, 1000);
        }
    }

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            alert('Vous avez gagné !');
        }
    }, [matchedCards, cards]);

    return (
        <div className="game-frame">
            {!isGameStarted
                ? (
                    <button onClick={startGame}>Commencer le jeu</button>
                )
                : (
                    <>
                        <button onClick={endGame}>Terminer le jeu</button>
                        {isGameOver
                            ? (
                                <>
                                    <div>Le jeu est terminé !</div>
                                    <button onClick={restartGame}>Recommencer le jeu</button>
                                </>
                            )
                            : (
                                <>
                                    <p>Temps écoulé : {seconds} secondes</p>
                                    <table>
                                        <tbody>
                                        {rows.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((card) => (
                                                    <td key={card.id}>
                                                        <Card id={card.id} name={card.name} image={card.image} backimage={card.backimage} onFlip={handleFlip} flipBack={flipBack}/>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                    </>
                )}
        </div>
    );
};
export default Game;
