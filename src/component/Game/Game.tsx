import React, { useState, useEffect, useMemo } from 'react';
import Card from '../Cards/Cards';
import '../../pages/App.css';
import useApi from '../../Api/api';

interface GameProps {
    theme: string;
}

// Créer un tableau d'objets pour les cartes du jeu
interface CardType {
    id: number;
    name: string;
    image: string;
    backimage: string;
}

const Game: React.FC<GameProps> = () => {
    const [isGameStarted, setIsGameStarted] = useState(false); // Détermine si le jeu a commencé
    const [isGameOver, setIsGameOver] = useState(false); // Détermine si le jeu est terminé
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // Cartes retournées
    const [matchedCards, setMatchedCards] = useState<number[]>([]); // Cartes correspondantes
    const [seconds, setSeconds] = useState<number>(0); // Temps écoulé
    const [moves, setMoves] = useState<number>(0); // Nombre de mouvements
    // const [cards, setCards] = useState<CardType[]>([]); // Cartes du jeu
    const [errors, setErrors] = useState<number>(0);// Nombre d'erreurs

    const { data: cards, error } = useApi<any>('cards/football');

    console.log(error);

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

    // Lorsque isGameStarted passe de true à false, vous pouvez mélanger à nouveau les cartes.
    useEffect(() => {
        if (!isGameStarted) {
            // Mélangez les cartes et affichez-les
            const newCards = cards.sort(() => Math.random() - 0.5);
            // setCards(newCards);
        }
    }, [isGameStarted]);

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
        setSeconds(0); // Réinitialise les valeurs
        setMoves(0); // Réinitialise les valeurs
        setErrors(0); // Réinitialise les valeurs
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
            setMoves(moves + 1); // Comptabilise un mouvement lorsque deux cartes sont retournées
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);

            if (firstCard && secondCard && firstCard.name === secondCard.name && firstCardId !== secondCardId) {
                setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            } else {
                setErrors(errors + 1)// Comptabilise une erreur lorsque deux cartes ne correspondent pas
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
                                    <section className="score-panel"> {/* Affiche le score */}
                                        <p><span id="moves">{moves}</span> Moves
                                        </p> {/* Affiche le nombre de mouvements */}
                                        <p><span id="errors">{errors}</span> Errors
                                        </p> {/* Affiche le nombre d'erreurs */}
                                        <div id="timer">Temps : {seconds} s</div>
                                        {/* Affiche le temps écoulé */}
                                        <button className="restart-button"
                                                id="restartClick"> {/* Bouton pour redémarrer le jeu */}
                                            <button className="restart-button"
                                                    onClick={restartGame}> {/* Bouton pour redémarrer le jeu */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" // Icone de redémarrage
                                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                                </svg>
                                            </button>
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
                                                                    matchedCards={matchedCards}/>
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
