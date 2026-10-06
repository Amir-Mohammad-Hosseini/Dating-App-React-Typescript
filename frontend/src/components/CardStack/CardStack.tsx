import { useState } from "react";
import SwipeCard from "./SwipeCard";
import type { SortedUser } from "../../types/discover";
import type { CardStackProps } from "./types";

const CardStack = ({people , onChangeCurrentIndex} : CardStackProps) => {
  const [cards, setCards] = useState(people);


  const handleSwipeCard = (status: string) => {
    console.log(status);
    setCards((prev) => prev.slice(1));
    onChangeCurrentIndex()
  };

  return (
    <div className="relative mx-auto w-full max-w-95 aspect-2/3">
      {cards
        .map((card : SortedUser, index : number) => (
          <SwipeCard
            key={card.id}
            person={card}
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