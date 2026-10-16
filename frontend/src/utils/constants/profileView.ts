const MAX_FAME_RATING = 100

export const showPopularityRatingText = (fameRating : number) => {
    const popularityRatingPercent = fameRating / MAX_FAME_RATING * 100
    if(popularityRatingPercent < 25){
        return "Not popular"
    }else if (25 <=popularityRatingPercent && popularityRatingPercent < 50){
        return "few popular"
    }else if (50 <= popularityRatingPercent && popularityRatingPercent < 75){
        return "Popular"
    }else {
        return "Very popular"
    }
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const isRecentlyActive = (lastConnectionISO?: string) => {
  if (!lastConnectionISO) return false;
  const time = new Date(lastConnectionISO).getTime();
  return !Number.isNaN(time) && Date.now() - time < DAY_MS;
};


export default MAX_FAME_RATING