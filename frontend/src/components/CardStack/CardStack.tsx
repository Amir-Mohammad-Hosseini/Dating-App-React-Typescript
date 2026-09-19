import { useState } from "react";
import SwipeCard from "./SwipeCard";

const CARDS = ["A", "B", "C", "D", "E", "F"];

const CardStack = () => {
  const [cards, setCards] = useState(CARDS);

  const handleSwipeCard = (status: string) => {
    console.log(status);
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className="relative mx-auto w-full max-w-95 aspect-[2/3]">
      {cards
        .slice(0, 3)
        .map((card, index) => (
          <SwipeCard
            key={card}
            text={card}
            index={index}
            isTop={index === 0}
            onSwipe={handleSwipeCard}
          />
        ))
        .reverse()}
    </div>
  );
};

export default CardStack;