export interface DiscoverFilters {
  min_age: number;
  max_age: number;
  min_fame: number;
  max_fame: number;
  min_distance: number;
  max_distance: number;
}

const DEFAULT_DISCOVER_FILTERS: DiscoverFilters = {
  min_age: 18,
  max_age: 99,
  min_fame: 0,
  max_fame: 100,
  min_distance: 0,
  max_distance: 20000,
};

export const DISCOVER_QUICK_FILTERS = [
    {label : "Nearby" , value : {max_distance : 10}},
    {label : "22-29" , value : {min_age : 22 , max_age : 29}},
]

export default DEFAULT_DISCOVER_FILTERS;
