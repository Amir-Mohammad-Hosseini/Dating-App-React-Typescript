export default interface SwipeCardType {
    text : string
    isTop : boolean
    index : number
    onSwipe : (status : string) => void
}