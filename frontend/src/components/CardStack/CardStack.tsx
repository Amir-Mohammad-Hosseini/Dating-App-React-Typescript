import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import SwipeCard, { type SwipeCardHandle } from "./SwipeCard";
import type { SortedUser } from "../../types/discover";
import type { CardStackProps } from "./types";
import { useMutation } from "@tanstack/react-query";
import likeProfileMutation from "../../lib/tanstack-query/Discover/likeProfileMutation";
import unLikeProfileMutation from "../../lib/tanstack-query/Discover/unLikeProfileMutation";
import LoadingOverlay from "../Loader/LoadingOverlay";

export type CardStackHandle = {
  triggerTopSwipe: (direction: 1 | -1) => void;
};

const CardStack = forwardRef<CardStackHandle, CardStackProps>(
  ({ people, onChangeCurrentIndex }, ref) => {
    const [cards, setCards] = useState(people);
    const showSwipeCardRef = useRef<SwipeCardHandle>(null);

    const { mutate: likeProfileMutate, isPending: isLikeProfilePending } =
      useMutation(likeProfileMutation());
    const { mutate: unLikeProfileMutate, isPending: isUnLikeProfilePending } =
      useMutation(unLikeProfileMutation());

      const isPending = isLikeProfilePending || isUnLikeProfilePending

    useImperativeHandle(ref, () => ({
      triggerTopSwipe: (direction: 1 | -1) =>
        showSwipeCardRef.current?.triggerSwipe(direction),
    }));

    const handleSwipeCard = (status: string , person : SortedUser) => {
      console.log(status, "STATUS" , person);
      if(status === "like"){
        likeProfileMutate(person)
      }else if(status === "nope"){
        unLikeProfileMutate(person)
      }
      setCards((prev) => prev.slice(1));
      onChangeCurrentIndex();
    };

    if(isPending){
      return < LoadingOverlay show />
    }


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
