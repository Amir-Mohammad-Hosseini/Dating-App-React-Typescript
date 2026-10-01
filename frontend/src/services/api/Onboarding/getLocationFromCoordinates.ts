import axios from "axios"

const getLocationFromCoordinates = async (latitude : number , longitude : number) => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    return response.data
}

export default getLocationFromCoordinates