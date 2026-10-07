import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import SwipeCard, { type SwipeCardHandle } from "./SwipeCard";
import type { SortedUser } from "../../types/discover";
import type { CardStackProps } from "./types";

export type CardStackHandle = {
  triggerTopSwipe: (direction: 1 | -1) => void;
};

const CardStack = forwardRef<CardStackHandle, CardStackProps>(
  ({ people, onChangeCurrentIndex }, ref) => {
    const [cards, setCards] = useState(people);
    const showSwipeCardRef = useRef<SwipeCardHandle>(null);

    useImperativeHandle(ref, () => ({
      triggerTopSwipe: (direction: 1 | -1) =>
        showSwipeCardRef.current?.triggerSwipe(direction),
    }));

    const handleSwipeCard = (status: string) => {
      console.log(status);
      setCards((prev) => prev.slice(1));
      onChangeCurrentIndex();
    };

    return (
      <div className="relative mx-auto w-full max-w-95 aspect-2/3">
        {cards
          .map((card: SortedUser, index: number) => (
            <SwipeCard
              key={card.id}
              ref={index === 0 ? showSwipeCardRef : undefined}
              person={card}
              index={index}
              isTop={index === 0}
              onSwipe={handleSwipeCard}
            />
          ))
          .reverse()}
      </div>
    );
  },
);

export default CardStack;
