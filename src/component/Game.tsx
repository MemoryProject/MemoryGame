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
        { id: 1, name: 'card1', image: './MemoryGame/images/book.png', backimage: './MemoryGame/images/card_back.png' },
        { id: 2, name: 'card2', image: './MemoryGame/images/bow_02.png', backimage: './MemoryGame/images/card_back.png' },
        {
            id: 3,
            name: 'card3',
            image: './MemoryGame/images/green_mushroom.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 4,
            name: 'card4',
            image: './MemoryGame/images/ring_02.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 5,
            name: 'card5',
            image: './MemoryGame/images/sword_01.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 6,
            name: 'card6',
            image: './MemoryGame/images/wand_01.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 7,
            name: 'card7',
            image: './MemoryGame/images/wooden_box.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 8,
            name: 'card8',
            image: './MemoryGame/images/wooden_shield.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        { id: 9, name: 'card1', image: './MemoryGame/images/book.png', backimage: './MemoryGame/images/card_back.png' },
        {
            id: 10,
            name: 'card2',
            image: './MemoryGame/images/bow_02.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 11,
            name: 'card3',
            image: './MemoryGame/images/green_mushroom.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 12,
            name: 'card4',
            image: './MemoryGame/images/ring_02.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 13,
            name: 'card5',
            image: './MemoryGame/images/sword_01.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 14,
            name: 'card6',
            image: './MemoryGame/images/wand_01.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 15,
            name: 'card7',
            image: './MemoryGame/images/wooden_box.png',
            backimage: './MemoryGame/images/card_back.png'
        },
        {
            id: 16,
            name: 'card8',
            image: './MemoryGame/images/wooden_shield.png',
            backimage: './MemoryGame/images/card_back.png'
        }

    ].sort(() => Math.random() - 0.5)), []);

    const rows = useMemo(() => {
        const rowSize = 4; // Nombre de cartes par ligne
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

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleFlip = (id: number) => {
        const newFlippedCards = [...flippedCards, id];
        if (newFlippedCards.length > 2) {
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);

            if (firstCard && secondCard && firstCard.name === secondCard.name && firstCardId !== secondCardId) {
                return;
            }
        }

        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);

            if (firstCard && secondCard && firstCard.name === secondCard.name && firstCardId !== secondCardId) {
                setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                alert('Vous avez gagné !');
            }, 1000);
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
                                    <section className="memory-box">
                                        <table>
                                            <tbody>
                                            {rows.map((row, i) => (
                                                <tr key={i}>
                                                    {row.map((card) => (

                                                        <td key={card.id}>
                                                            <div className="card">
                                                                <div className="card__content">
                                                                    <div className="blob">
                                                                        <div className="blob">
                                                                            <div className="blob">
                                                                                <div className="blob">
                                                                                    <Card id={card.id} name={card.name}
                                                                                          image={card.image}
                                                                                          backImage={card.backimage}
                                                                                          onFlip={handleFlip}
                                                                                          flippedCards={flippedCards}
                                                                                          matchedCards={matchedCards}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </section>
                                </>
                            )}
                    </>
                )}
        </div>
    );
};
export default Game;
