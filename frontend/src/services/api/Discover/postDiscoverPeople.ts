import customFetch from "../../../lib/axios/customFetch"

const defaultFilters = {
  min_age: 18,
  max_age: 99,
  min_fame: 0,
  max_fame: 100, 
  min_distance: 0,
  max_distance: 20000 
}


const postDiscoverPeople = async (filters = defaultFilters) => {
    const response = await customFetch.post("browsing/sorted" , filters)
    return response.data
}

export default postDiscoverPeople