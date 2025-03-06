import { useEffect, useState, useMemo } from "react";
import ScoreBar from "../components/ScoreBar";
import { fetchAnimalImages } from "../api/getImages";
import Modal from "../components/Modal";

interface Card {
  id: string;
  url: string;
  matched: boolean;
}

const Game = ({ username }: { username: string }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState({ fail: 0, win: 0 });
  const [isGameFinished, setIsGameFinished] = useState(false);

  const shuffleCards = (cards: Card[]) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const loadCards = async () => {
    const images = await fetchAnimalImages();

    if (images.length === 0) return;

    const selectedImages = images.slice(0, 8);

    const pairedCards = selectedImages.flatMap((img) => [
      { ...img, id: img.id + "-1", matched: false },
      { ...img, id: img.id + "-2", matched: false },
    ]);

    pairedCards.forEach((card) => {
      const img = new Image();
      img.src = card.url;
    });

    setCards(shuffleCards(pairedCards));
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || flippedCards.includes(index) || cards[index].matched)
      return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setTimeout(() => checkForMatch(newFlipped), 1000);
    }
  };

  const checkForMatch = ([firstIndex, secondIndex]: number[]) => {
    const newCards = [...cards];
    if (newCards[firstIndex].url === newCards[secondIndex].url) {
      newCards[firstIndex].matched = true;
      newCards[secondIndex].matched = true;
      setScore((prev) => ({
        ...prev,
        win: prev.win + 1,
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        fail: prev.fail + 1,
      }));
    }

    setCards(newCards);
    setFlippedCards([]);
    setIsLocked(false);

    if (newCards.every((card) => card.matched)) {
      setIsGameFinished(true);
    }
  };

  const restartGame = () => {
    setFlippedCards([]);
    setIsLocked(false);
    setScore({ fail: 0, win: 0 });
    setIsGameFinished(false);
    setCards([]);
    loadCards();
  };

  const memoizedCards = useMemo(() => cards, [cards]);

  return (
    <>
      {showInstructions && (
        <Modal setShowModal={setShowInstructions} buttonText="Start!">
          <div className="congratulation__container text-dark">
            <h1 className="congratulation__title text-lg font-bold font-pixel text-neonGreen animate-blink text-center my-6">
              Welcome, {username}!
            </h1>

            <h2 className="congratulation__subtitle text-lg font-bold text-red-400">
              Instructions:
            </h2>
            <ul className="congratulation__list list-disc list-inside">
              <li className="congratulation__list-item">
                The player must click on a card to flip it and reveal the image.
              </li>
              <li className="congratulation__list-item">
                Each card has one identical pair on the board.
              </li>
              <li className="congratulation__list-item">
                On each turn, the player must flip two cards.
              </li>
              <li className="congratulation__list-item">
                If the cards do <b className="text-red-300">not match</b>, 1
                error point is added to the score.
              </li>
              <li className="congratulation__list-item">
                If the cards <b className="text-green-200">match</b>, 1 correct
                point is added to the score.
              </li>
            </ul>
          </div>
        </Modal>
      )}

      <ScoreBar username={username} score={score} />

      {isGameFinished ? (
        <Modal setShowModal={restartGame} buttonText="Yes!">
          <h1 className="congratulation__title font-pixel font-xl text-green-400 text-center m-6">
            Congratulations {username}!
          </h1>
          <h2 className="congratulation__subtitle font-lg text-dark">
            Do you want to play again?
          </h2>
        </Modal>
      ) : (
        <div className="game__container m-auto max-w-screen-lg">
          <div className="game__grid grid grid-cols-4 gap-2 md:gap-4">
            {memoizedCards.map((card, index) => (
              <div
                key={card.id}
                className={`game__card w-full h-28 sm:w-36 sm:h-40 md:w-40 md:h-48 m-auto flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer ${
                  flippedCards.includes(index) || card.matched
                    ? "bg-white"
                    : "bg-gray-500"
                }`}
                onClick={() => handleCardClick(index)}
                aria-label={`Card ${index + 1}`}
                role="button"
              >
                {(flippedCards.includes(index) || card.matched) && (
                  <img
                    src={card.url}
                    alt={`Animal ${index + 1}`}
                    className="game__card-image w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
