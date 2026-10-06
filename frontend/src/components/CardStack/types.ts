import type { SortedUser } from "../../types/discover"

export default interface SwipeCardType {
    person : SortedUser
    isTop : boolean
    index : number
    onSwipe : (status : string) => void
}

export interface CardStackProps {
  people: SortedUser[];
  onChangeCurrentIndex : () => void
};