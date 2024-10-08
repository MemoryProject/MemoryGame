import React, { useState, useEffect, useMemo } from 'react';
import Card from '../Cards/Cards';
import '../../pages/App.css';

interface CardType {
    id: number;
    name: string;
    image: string;
    backimage: string;
}

const Game: React.FC = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [seconds, setSeconds] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [cards, setCards] = useState<CardType[]>([]);
    const [errors, setErrors] = useState<number>(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isGameStarted) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isGameStarted]);

    useEffect(() => {
        if (!isGameStarted) {
            const newCards = [
                { id: 1, name: 'card1', image: '/images/book.png', backimage: '/images/card_back.png' },
                { id: 2, name: 'card2', image: '/images/bow_02.png', backimage: '/images/card_back.png' },
                { id: 3, name: 'card3', image: '/images/green_mushroom.png', backimage: '/images/card_back.png' },
                { id: 4, name: 'card4', image: '/images/ring_02.png', backimage: '/images/card_back.png' },
                { id: 5, name: 'card5', image: '/images/sword_01.png', backimage: '/images/card_back.png' },
                { id: 6, name: 'card6', image: '/images/wand_01.png', backimage: '/images/card_back.png' },
                { id: 7, name: 'card7', image: '/images/wooden_box.png', backimage: '/images/card_back.png' },
                { id: 8, name: 'card8', image: '/images/wooden_shield.png', backimage: '/images/card_back.png' },
                { id: 9, name: 'card1', image: '/images/book.png', backimage: '/images/card_back.png' },
                { id: 10, name: 'card2', image: '/images/bow_02.png', backimage: '/images/card_back.png' },
                { id: 11, name: 'card3', image: '/images/green_mushroom.png', backimage: '/images/card_back.png' },
                { id: 12, name: 'card4', image: '/images/ring_02.png', backimage: '/images/card_back.png' },
                { id: 13, name: 'card5', image: '/images/sword_01.png', backimage: '/images/card_back.png' },
                { id: 14, name: 'card6', image: '/images/wand_01.png', backimage: '/images/card_back.png' },
                { id: 15, name: 'card7', image: '/images/wooden_box.png', backimage: '/images/card_back.png' },
                { id: 16, name: 'card8', image: '/images/wooden_shield.png', backimage: '/images/card_back.png' }
            ].sort(() => Math.random() - 0.5);
            setCards(newCards);
        }
    }, [isGameStarted]);

    const rows = useMemo(() => {
        const rowSize = 4;
        return Array.from({ length: Math.ceil(cards.length / rowSize) }, (_, i) => cards.slice(i * rowSize, i * rowSize + rowSize));
    }, [cards]);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const restartGame = () => {
        setIsGameStarted(false);
        setIsGameOver(false);
        setFlippedCards([]);
        setMatchedCards([]);
        setSeconds(0);
        setMoves(0);
        setErrors(0);
    };

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
            setMoves(moves + 1);
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);

            if (firstCard && secondCard && firstCard.name === secondCard.name && firstCardId !== secondCardId) {
                setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            } else {
                setErrors(errors + 1);
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }

    return (
        <div className="game-frame">
            {!isGameStarted
                ? (
                    <button onClick={startGame}>Commence le jeu</button>
                )
                : (
                    <>
                        {isGameOver
                            ? (
                                <>
                                    <div>Le jeu est terminé !</div>
                                </>
                            )
                            : (
                                <>
                                    <header>
                                        <h1>Memory</h1>
                                    </header>
                                    <section className="score-panel">
                                        <p><span id="moves">{moves}</span> Moves</p>
                                        <p><span id="errors">{errors}</span> Errors</p>
                                        <div id="timer">Temps : {seconds} s</div>
                                        <button className="restart-button" onClick={restartGame}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                            </svg>
                                        </button>
                                    </section>
                                    <section className="memory-box">
                                        <table>
                                            <tbody>
                                            {rows.map((row, i) => (
                                                <tr key={i}>
                                                    {row.map((card) => (
                                                        <td key={card.id}>
                                                            <div className="card">
                                                                <Card
                                                                    id={card.id}
                                                                    name={card.name}
                                                                    image={card.image}
                                                                    backImage={card.backimage}
                                                                    onFlip={handleFlip}
                                                                    flippedCards={flippedCards}
                                                                    matchedCards={matchedCards}
                                                                />
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
